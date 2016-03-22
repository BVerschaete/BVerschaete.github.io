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
    Tower.prototype.upgradeCost = this.cost/2;
}

//basisfuncties van alle towers
//gemeenschappelijke draw-functie
Tower.prototype.draw = function(){
    var sprite = new Image();
    sprite.src = "img/" + this.image;
    game.context.drawImage(sprite, this.locX - game.tileSize/4, this.locY - game.tileSize/4, game.tileSize/2, game.tileSize/2);
};

Tower.prototype.findTarget = function(){
    this.target = null;

    for (var i = 0; i < attackers.length; i++) {
        var distance = (attackers[i].locX - this.locX) * (attackers[i].locX - this.locX + game.tileSize) + (attackers[i].locY - this.locY) * (attackers[i].locY - this.locY + game.tileSize);

        if (distance < this.range * this.range) {
            this.target = attackers[i];
            return;
        }
    }
};

Tower.prototype.findUnitVector = function() {
    if (!this.target) return false; //if there is no target, dont bother calculating unit vector
    this.xFire = this.locX; //+ game.tileSize * xDist / dist; //where turret ends and bullets start
    this.yFire = this.locY; //+ game.tileSize * yDist / dist;
};


Tower.prototype.attack = function(){
    var now = Date.now();
    var delta = now - this.oldNow;

    if(this.target != null && delta >= this.fireRate){
        this.oldNow = now - (delta - this.fireRate);
        bullets.push(new Bullet(this.xFire, this.yFire, this.target, this.damage));
    }else if(this.target == null){
        this.oldNow = now - this.fireRate;
    }
};

Tower.prototype.displayInfo = function(){
    $("#towerInfo").show();
    $("#towerImg").attr("src", "./img/" + this.image);
    $("#towerLevel").text(this.level);
    $("#towerDamage").text(this.damage);
    $("#towerRange").text(this.range);

    var upgradeCost = $('#upgradeCost');
    var upgradeButton = $('#upgradeTower');
    if(this.level < this.maxUpgradeLevel && this.upgradeCost <= game.money) {
        upgradeCost.text(this.upgradeCost);
        upgradeButton.show();
    } else {
        upgradeButton.hide();
        if(this.upgradeCost > game.money){
            upgradeCost.text(this.upgradeCost);
        } else {
            upgradeCost.text("This tower is fully upgraded.");
        }
    }
};

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

Tower.prototype.upgrade = function(){
    this.level += 1;
    this.range = Math.floor(this.range * 1.125);
    this.damage = Math.floor(this.damage * 1.4);
    this.upgradeCost *= 2;
};

//verschillen per tower functies komen hier;
Tower.prototype.image = "tower1.png";
Tower.prototype.range = (game.tileSize/2) + (game.tileSize*1.5); //40*1.875 = 75, in functie van tileSize stellen om gemakkelijk spel te resizen-
Tower.prototype.fireRate = 500; // 1 keer per 1000 milliseconden
Tower.prototype.damage = 10;
Tower.prototype.cost = 60;
Tower.prototype.maxUpgradeLevel = 5;

//child object van Tower, zodat we verschillende torens kunnen maken en gewoon de
//variabelen per tower moeten aanpassen voor verschillende functionaliteit
function Tower2(x,y) {
    Tower.call(this,x,y);
}

Tower2.prototype = Object.create(Tower.prototype);
Tower2.prototype.image = "tower2.png";
Tower2.prototype.range = (game.tileSize*2.5); //100
Tower2.prototype.fireRate = Tower.prototype.fireRate * 2;
Tower2.prototype.damage = Tower.prototype.damage * 2;
Tower2.prototype.cost = Tower.prototype.cost * 1.2;
Tower2.prototype.maxUpgradeLevel = 6;

function Tower3(x,y) {
    Tower.call(this,x,y);
}

Tower3.prototype = Object.create(Tower.prototype);
Tower3.prototype.image = "tower3.png";
Tower3.prototype.range = (game.tileSize*3.125); //125
Tower3.prototype.fireRate = Tower.prototype.fireRate * 3;
Tower3.prototype.damage = Tower.prototype.damage * 3;
Tower3.prototype.cost = Tower.prototype.cost * 1.4;
Tower2.prototype.maxUpgradeLevel = 7;

//array met constructors van alle verschillende towers, door towerClasses[n](x, y) te callen kunnen we zo gemakkelijk towers
//maken
var towerClasses = [Tower,Tower2,Tower3];

function drawTowers(){
    for(var i = 0; i < towers.length; i++){
        towers[i].draw();
    }
}

function addTower(){
    if(currentTower != -1) {
        towers.push(new towerClasses[currentTower](mouse.x, mouse.y));
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

function upgradeCurrentTower(){
    event.stopPropagation();
    var tower = towers[selectedTower];
    if(tower){
        if(tower.level < tower.maxUpgradeLevel && tower.upgradeCost <= game.money) {
            game.money -= tower.upgradeCost;
            tower.upgrade();
            tower.displayInfo();
        }
    }
}