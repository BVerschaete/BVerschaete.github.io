/**
 * Created by basti on 24/03/2016.
 */
var directions = {
    boven: 0,
    rechts: 1,
    onder: 2,
    links: 3
};

var debugDirections = {
    0: "boven",
    1: "rechts",
    2: "onder",
    3: "links"
};

var attackerCodes = {
    normalAttacker: 0,
    tankAttacker: 1,
    speedAttacker: 2
};

//all different tiles, add to tiles object afterwards
var grass = new Image();
grass.src = "img/tiles/0.png";
var horizontal = new Image();
horizontal.src = "img/tiles/1.png";
var vertical = new Image();
vertical.src = "img/tiles/2.png";
var cornerLeftDown = new Image();
cornerLeftDown.src = "img/tiles/3.png";
var cornerLeftUp = new Image();
cornerLeftUp.src = "img/tiles/4.png";
var cornerRightUp = new Image();
cornerRightUp.src = "img/tiles/5.png";
var cornerRightDown = new Image();
cornerRightDown.src = "img/tiles/6.png";
var waterCornerRightUp = new Image();
waterCornerRightUp.src = "img/tiles/7.png";
var waterRight = new Image();
waterRight.src = "img/tiles/8.png";
var waterCornerRightDown = new Image();
waterCornerRightDown.src = "img/tiles/9.png";
var waterDown = new Image();
waterDown.src = "img/tiles/10.png";
var waterCornerLeftDown = new Image();
waterCornerLeftDown.src = "img/tiles/11.png";
var waterLeft = new Image();
waterLeft.src = "img/tiles/12.png";
var waterCornerLeftTop = new Image();
waterCornerLeftTop.src = "img/tiles/13.png";
var waterUp = new Image();
waterUp.src = "img/tiles/14.png";
var waterMiddle = new Image();
waterMiddle.src = "img/tiles/15.png";
var waterSingleVertical = new Image();
waterSingleVertical.src = "img/tiles/16.png";
var waterSingleHorizontal = new Image();
waterSingleHorizontal.src = "img/tiles/17.png";
var waterSingleBottom = new Image();
waterSingleBottom.src = "img/tiles/18.png";
var waterSingleTop = new Image();
waterSingleTop.src = "img/tiles/19.png";
var waterSingleRight = new Image();
waterSingleRight.src = "img/tiles/20.png";
var waterSingleLeft = new Image();
waterSingleLeft.src = "img/tiles/21.png";

var tiles = {
    0: grass,
    1: horizontal,
    2: vertical,
    3: cornerLeftDown,
    4: cornerLeftUp,
    5: cornerRightUp,
    6: cornerRightDown,
    7: waterCornerRightUp,
    8: waterRight,
    9: waterCornerRightDown,
    10: waterDown,
    11: waterCornerLeftDown,
    12: waterLeft,
    13: waterCornerLeftTop,
    14: waterUp,
    15: waterMiddle,
    16: waterSingleVertical,
    17: waterSingleHorizontal,
    18: waterSingleBottom,
    19: waterSingleTop,
    20: waterSingleRight,
    21: waterSingleLeft
};