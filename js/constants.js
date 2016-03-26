/**
 * Created by basti on 24/03/2016.
 */
var directions = {
    boven: 0,
    rechts: 1,
    onder: 2,
    links: 3
};

var attackerCodes = {
    normalAttacker: 0,
    strongAttacker: 1,
    speedAttacker: 2
};

//all different tiles, add to tiles object afterwards
var grass = new Image();
grass.src = "img/tiles/0.png";
var water = new Image();
water.src = "img/tiles/1.png";
var horizontal = new Image();
horizontal.src = "img/tiles/2.png";
var vertical = new Image();
vertical.src = "img/tiles/3.png";
var cornerLeftDown = new Image();
cornerLeftDown.src = "img/tiles/4.png";
var cornerLeftUp = new Image();
cornerLeftUp.src = "img/tiles/5.png";
var cornerRightUp = new Image();
cornerRightUp.src = "img/tiles/6.png";
var cornerRightDown = new Image();
cornerRightDown.src = "img/tiles/7.png";

var tiles = {
    0: grass,
    1: water,
    2: horizontal,
    3: vertical,
    4: cornerLeftDown,
    5: cornerLeftUp,
    6: cornerRightUp,
    7: cornerRightDown
};