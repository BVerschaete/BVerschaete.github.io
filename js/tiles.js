/**
 * Created by Bastien on 07/04/2016.
 */
//tile objecten, veranderen de richting van een attacker als hij erover passeert
function Tile(src){
    var temp = new Image();
    temp.src = "img/tiles/" + src;
    this.image = temp;
    this.changeDirection = null;
}

var grass = new Tile("0.png");

var horizontal = new Tile("1.png");

horizontal.changeDirection = function(attacker){
    if(attacker.direction == directions.rechts) {
        attacker.direction = directions.rechts;
    } else {
        attacker.direction = directions.links;
    }
};

var vertical = new Tile("2.png");

vertical.changeDirection = function(attacker){
    if(attacker.direction == directions.boven) {
        attacker.direction = directions.boven;
    } else {
        attacker.direction = directions.onder;
    }
};

var cornerLeftDown = new Tile("3.png");

cornerLeftDown.changeDirection = function(attacker){
    if(attacker.direction == directions.boven) {
        attacker.direction = directions.links;
    } else {
        attacker.direction = directions.onder;
    }
};

var cornerLeftUp = new Tile("4.png");

cornerLeftUp.changeDirection = function(attacker){
    if(attacker.direction == directions.rechts) {
        attacker.direction = directions.boven;
    } else {
        attacker.direction = directions.links;
    }
};

var cornerRightUp = new Tile("5.png");

cornerRightUp.changeDirection = function(attacker){
    if(attacker.direction == directions.onder) {
        attacker.direction = directions.rechts;
    } else {
        attacker.direction = directions.boven;
    }
};

var cornerRightDown = new Tile("6.png");

cornerRightDown.changeDirection = function(attacker){
    if(attacker.direction == directions.boven) {
        attacker.direction = directions.rechts;
    } else {
        attacker.direction = directions.onder;
    }
};

var waterCornerRightUp = new Tile("7.png");

var waterRight = new Tile("8.png");

var waterCornerRightDown = new Tile("9.png");

var waterDown = new Tile("10.png");

var waterCornerLeftDown = new Tile("11.png");

var waterLeft = new Tile("12.png");

var waterCornerLeftTop = new Tile("12.png");

var waterUp = new Tile("14.png");

var waterMiddle = new Tile("15.png");

var waterSingleVertical = new Tile("16.png");

var waterSingleHorizontal = new Tile("17.png");

var waterSingleBottom = new Tile("18.png");

var waterSingleTop = new Tile("19.png");

var waterSingleRight = new Tile("20.png");

var waterSingleLeft = new Tile("21.png");
