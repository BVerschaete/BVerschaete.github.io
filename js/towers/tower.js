/**
 * Created by Bastien on 19/03/2016.
 */
var towers = [];
var currentTower = -1; //het type tower om te plaatsen
var selectedTower = -1; // de index van de geselecteerde toren in de towers array

//basis toren
function Tower(x, y){
    this.locX= x;
    this.locY= y;
    this.oldNow = Date.now(); // tijdstip van laatste aanval
    this.level = 1;
    this.target = null;
    this.upgradeCost = this.cost/2;
    this.sellRate = 0.75;
    this.value = this.cost * this.sellRate;
}

//verschillen per tower functies komen hier
Tower.prototype.image = "tower1.png";
Tower.prototype.range = (game.tileSize/2) + (game.tileSize*1.5); //40*1.875 = 75, in functie van tileSize stellen om gemakkelijk spel te resizen-
Tower.prototype.fireRate = 500; // 1 keer per 1000 milliseconden
Tower.prototype.damage = 10;
Tower.prototype.cost = 60;
Tower.prototype.maxUpgradeLevel = 5;
Tower.prototype.displayName = "Tower Tier 1";
Tower.prototype.attackType = Bullet;

//basisfuncties van alle towers
//gemeenschappelijke draw-functie
Tower.prototype.draw = function(){
    var sprite = new Image();
    sprite.src = "img/towers/" + this.image;
    game.context.drawImage(sprite, this.locX - game.tileSize/4, this.locY - game.tileSize/4, game.tileSize/2, game.tileSize/2);
};

//returnt de eerste attacker in de array (dus het verst op de map) die binnen de range van de toren is
Tower.prototype.findTarget = function(){
    this.target = null;

    for (var i = 0; i < attackers.length; i++) {
        var distance = Math.sqrt(Math.pow((attackers[i].locX - this.locX),2) + Math.pow((attackers[i].locY - this.locY), 2));

        if (distance < this.range) {
            this.target = attackers[i];
            return;
        }
    }
};

//berekent de +x en +y die een bullet-object moet optellen bij zijn huidige waarden om richting de aanvaller te gaan.
Tower.prototype.findUnitVector = function() {
    if (!this.target) return false; //if there is no target, dont bother calculating unit vector
    this.xFire = this.locX; //+ game.tileSize * xDist / dist; //where turret ends and bullets start
    this.yFire = this.locY; //+ game.tileSize * yDist / dist;
};

//valt het huidig target aan met een bullet
Tower.prototype.attack = function(){
    var now = Date.now();
    var delta = now - this.oldNow;

    if(this.target != null && delta >= this.fireRate){
        this.oldNow = now - (delta - this.fireRate);
        attacks.push(new this.attackType(this));
    }else if(this.target == null){
        this.oldNow = now - this.fireRate;
    }
};

//tekent de range van de tower op het canvas
Tower.prototype.drawRange = function(){
    var context = game.context;
    var range = this.range;

    context.fillStyle = 'white';
    context.beginPath();
    context.arc(this.locX, this.locY, range, 0, 2 * Math.PI);
    // globalAlpha = transparancy
    context.globalAlpha = 0.4;
    context.fill();
    context.globalAlpha = 1;
};

//upgrade de waarden van deze tower
Tower.prototype.upgrade = function(){
    this.level += 1;
    this.range = Math.floor(this.range * 1.125);
    this.damage = Math.floor(this.damage * 1.4);
    this.value += this.upgradeCost * this.sellRate;
    this.upgradeCost *= 2;
};

//voert draw functie uit bij alle torens
function drawTowers(){
    for(var i = 0; i < towers.length; i++){
        towers[i].draw();
    }
}

//voegt toren toe aan toren-array
function addTower(){
    if(currentTower != -1) {
        towers.push(new towerTypes[currentTower](mouse.x, mouse.y));
    }
}

//door op knop te klikken, selecteren welke toren er gebouwd moet worden
function selectTowerToBuild(event){
    event.stopPropagation();
    //verandert de geselecteerde toren terug op 1 zodat de towerInfo en select cirkel worden uitgeschakeld
    selectedTower = -1;
    //custom attribuut van iedere button die zegt welke soort tower er moet geplaatst worden
    currentTower = event.target.getAttribute("data-type");
}

//kijkt of toren op deze plaats staat, met een dubbel zo grote straal, zodat omtrek van geplaatste tower ook meegerekend wordt
function towerOnLocationPlace(x1, y1){
    return towerOnLocation(x1, y1, game.tileSize/2);
}

//kijkt of toren op deze plaats staat, en zoja welkeen, met een gewone straal
function towerOnLocationSelect(x1, y1){
    return towerOnLocation(x1, y1, game.tileSize/4);
}

//bij klik, kijkt functie of er op de plaats van de coordinaten een toren staat
function towerOnLocation(x1, y1, r){
    for (var i = 0; i < towers.length; i++) {
        var x0 = towers[i].locX;
        var y0 = towers[i].locY;
        if(Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < r){
            return i;
        }
    }
    return -1;
}

//upgrade de geselecteerde toren en past towerinfo aan
function upgradeSelectedTower(){
    event.stopPropagation();
    var tower = towers[selectedTower];
    if(tower){
        if(tower.level < tower.maxUpgradeLevel && tower.upgradeCost <= game.money) {
            game.money -= tower.upgradeCost;
            tower.upgrade();
            displaySelectedTowerInfo();
            showUpgradeInfo();
        }
    }
}

function sellSelectedTower(){
    event.stopPropagation();
    var tower = towers[selectedTower];
    game.money += tower.value;
    towers.splice(selectedTower, 1);
    selectedTower = -1;
    displayInfo();
}

//toont info over geselecteerde toren
function displaySelectedTowerInfo(){
    var tower = towers[selectedTower];
    if(tower) {
        $("#towerInfo").css('visibility', 'visible');
        $("#towerImg").attr("src", "img/towers/" + tower.image);
        $("#towerLevel").text(tower.level);
        $("#towerDamage").text(Math.floor(tower.damage));
        $("#towerRange").text(Math.floor(tower.range));
        enableUpgradeButton();
        enableSellButton();
    }
}

//kijkt wanneer upgrade mogelijk is en activeert button.
function enableUpgradeButton(){
    var tower = towers[selectedTower];
    if(tower) {
        var upgradeButton = $('#upgradeTower');
        var upgradeCost = $('#upgradeCost');
        if (tower.level < tower.maxUpgradeLevel && tower.upgradeCost <= game.money) {
            upgradeCost.text(tower.upgradeCost + " coins");
            upgradeButton.removeClass("disabled");
        } else {
            upgradeButton.addClass("disabled");
            if (tower.level >= tower.maxUpgradeLevel) {
                upgradeCost.text("This tower is fully upgraded.");
            } else {
                upgradeCost.text(tower.upgradeCost);
            }
        }
    }
}

function enableSellButton(){
    var tower = towers[selectedTower];
    var $sellButton = $('#sellTower');
    $('#sellPrice').text(Math.floor(tower.value) + " coins");
    $sellButton.removeClass("disabled");
}

//toont de waarden van de volgende upgrade van de geselecteerde toren
function showUpgradeInfo(){
    var tower = towers[selectedTower];
    if(tower) {
        if(tower.level < tower.maxUpgradeLevel) {
            $("#towerLevel").text(tower.level + " --> " + (tower.level + 1));
            $("#towerDamage").text(tower.damage + " --> " + Math.floor(tower.damage * 1.4));
            $("#towerRange").text(tower.range + " --> " + Math.floor(tower.range * 1.125));
        }
    }
}

//toont terug de gewone waarden van de geselecteerde toren
function hideUpgradeInfo(){
    var tower = towers[selectedTower];
    if(tower) {
        $("#towerLevel").text(tower.level);
        $("#towerDamage").text(tower.damage);
        $("#towerRange").text(tower.range);
    }
}