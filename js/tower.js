/**
 * Created by Bastien on 19/03/2016.
 */
var towers = [];
var currentTower = 0;

//basis toren
function Tower(x, y){
    this.posX= x;
    this.posY= y;
}

Tower.prototype.image = "tower1.png";
Tower.prototype.range = (game.tileHeight*1.875); //40*1.875 = 75, in functie van tileheight stellen om gemakkelijk spel te resizen

//child object van Tower, zodat we verschillende torens kunnen maken en gewoon de
//variabelen per tower moeten aanpassen voor verschillende functionaliteit
function Tower2(x,y) {
    Tower.call(this,x,y);
}

Tower2.prototype = Object.create(Tower.prototype);
Tower2.prototype.image = "tower2.png";
Tower2.prototype.range = (game.tileHeight*2.5); //100

function Tower3(x,y) {
    Tower.call(this,x,y);
}

Tower3.prototype = Object.create(Tower.prototype);
Tower3.prototype.image = "tower3.png";
Tower3.prototype.range = (game.tileHeight*3.125); //125

//array met constructors van alle verschillende towers, door towerClasses[n](x, y) te callen kunnen we zo gemakkelijk towers
//maken
var towerClasses = [Tower,Tower2,Tower3];

//gemeenschappelijke draw-functie
Tower.prototype.draw = function(){
    var sprite = new Image();
    sprite.src = "img/" + this.image;
    game.context.drawImage(sprite, this.posX - game.tileWidth/4, this.posY - game.tileHeight/4, game.tileWidth/2, game.tileHeight/2);
};

function drawTowers(){
    for(var i = 0; i < towers.length; i++){
        towers[i].draw();
    }
}

function addTower(){
    towers.push(new towerClasses[currentTower](mouse.x,mouse.y));
}

function selectTower(event){
    //custom attribuut van iedere button die zegt welke soort tower er moet geplaatst worden
    currentTower = event.target.getAttribute("data-type");
}

