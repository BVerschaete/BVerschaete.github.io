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
var waterCornerRightUp = new Image();
waterCornerRightUp.src = "img/tiles/8.png";
var waterRight = new Image();
waterRight.src = "img/tiles/9.png";
var waterCornerRightDown = new Image();
waterCornerRightDown.src = "img/tiles/10.png";
var waterDown = new Image();
waterDown.src = "img/tiles/11.png";
var waterCornerLeftDown = new Image();
waterCornerLeftDown.src = "img/tiles/12.png";
var waterLeft = new Image();
waterLeft.src = "img/tiles/13.png";
var waterCornerLeftTop = new Image();
waterCornerLeftTop.src = "img/tiles/14.png";
var waterUp = new Image();
waterUp.src = "img/tiles/15.png";
var waterMiddle = new Image();
waterMiddle.src = "img/tiles/16.png";

var tiles = {
    0: grass,
    1: water,
    2: horizontal,
    3: vertical,
    4: cornerLeftDown,
    5: cornerLeftUp,
    6: cornerRightUp,
    7: cornerRightDown,
    8: waterCornerRightUp,
    9: waterRight,
    10: waterCornerRightDown,
    11: waterDown,
    12: waterCornerLeftDown,
    13: waterLeft,
    14: waterCornerLeftTop,
    15: waterUp,
    16: waterMiddle
};