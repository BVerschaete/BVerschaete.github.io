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
}

Tower.prototype.image = "tower1.png";
Tower.prototype.range = (game.tileSize/2) + (game.tileSize*1.5); //40*1.875 = 75, in functie van tileSize stellen om gemakkelijk spel te resizen-
Tower.prototype.fireRate = 500; // 1 keer per 1000 milliseconden
Tower.prototype.damage = 10;
Tower.prototype.cost = 60;

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

function Tower3(x,y) {
    Tower.call(this,x,y);
}

Tower3.prototype = Object.create(Tower.prototype);
Tower3.prototype.image = "tower3.png";
Tower3.prototype.range = (game.tileSize*3.125); //125
Tower3.prototype.fireRate = Tower.prototype.fireRate * 3;
Tower3.prototype.damage = Tower.prototype.damage * 3;
Tower3.prototype.cost = Tower.prototype.cost * 1.4;

//array met constructors van alle verschillende towers, door towerClasses[n](x, y) te callen kunnen we zo gemakkelijk towers
//maken
var towerClasses = [Tower,Tower2,Tower3];

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
    document.getElementById("towerInfo").style.visibility = "visible";
    document.getElementById("towerDamage").innerHTML = this.damage.toString();
    document.getElementById("towerRange").innerHTML = this.range.toString();
    document.getElementById("towerLevel").innerHTML = this.level.toString();
    document.getElementById("towerImg").src = "./img/" + this.image;
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

function selectTower(event){
    //custom attribuut van iedere button die zegt welke soort tower er moet geplaatst worden
    event.stopPropagation();
    selectedTower = -1;
    currentTower = event.target.getAttribute("data-type");
}

//kijkt of toren op deze plaats staat, met een dubbel zo grote straal, zodat omtrek van geplaatste tower ook meegerekend wordt
function towerOnLocationPlace(x1, y1){
    var r = game.tileSize/2;
    for (var i = 0; i < towers.length; i++) {
        var x0 = towers[i].locX;
        var y0 = towers[i].locY;
        if(Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < r){
            return false;
        }
    }
    return true;
}

//kijkt of toren op deze plaats staat, en zoja welkeen, met een gewone straal
function towerOnLocationSelect(x1, y1){
    var r = game.tileSize/4;
    for (var i = 0; i < towers.length; i++) {
        var x0 = towers[i].locX;
        var y0 = towers[i].locY;
        if(Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < r){
            return i;
        }
    }
    return -1;
}
