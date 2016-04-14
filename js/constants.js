/**
 * Created by basti on 24/03/2016.
 */
var directions = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
};

var attackerCodes = {
    normalAttacker: 0,
    tankAttacker: 1,
    speedAttacker: 2
};

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
    21: waterSingleLeft,
    22: splitDown,
    23: splitLeft,
    24: splitUp,
    25: splitRight,
    26: allDirections
};