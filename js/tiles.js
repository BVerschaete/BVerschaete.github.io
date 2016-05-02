/**
 * Created by Bastien on 07/04/2016.
 */

var tiles;

/**
 * tile objecten, veranderen de richting van een attacker als hij erover passeert
 */
function Tile(src){
    var temp = new Image();
    temp.src = "img/tiles/" + src;
    this.image = temp;
    this.changeDirection = null;
}

/**
 * Alle mogelijke tile objecten worden hierin aangemaakt en aan het tiles-object toegevoegd
 * iedere tile heeft een functie om de richting van een attacker aan te passen als hij erover passeert
 */
function createTiles() {
    var grass = new Tile("0.png");

    var horizontal = new Tile("1.png");

    horizontal.changeDirection = function (attacker) {
        return false;
    };

    var vertical = new Tile("2.png");

    vertical.changeDirection = function (attacker) {
        return false;
    };

    var cornerLeftDown = new Tile("3.png");

    cornerLeftDown.changeDirection = function (attacker) {
        if (attacker.direction == directions.up) {
            attacker.direction = directions.left;
        } else {
            attacker.direction = directions.down;
        }
    };

    var cornerLeftUp = new Tile("4.png");

    cornerLeftUp.changeDirection = function (attacker) {
        if (attacker.direction == directions.right) {
            attacker.direction = directions.up;
        } else {
            attacker.direction = directions.left;
        }
    };

    var cornerRightUp = new Tile("5.png");

    cornerRightUp.changeDirection = function (attacker) {
        if (attacker.direction == directions.down) {
            attacker.direction = directions.right;
        } else {
            attacker.direction = directions.up;
        }
    };

    var cornerRightDown = new Tile("6.png");

    cornerRightDown.changeDirection = function (attacker) {
        if (attacker.direction == directions.up) {
            attacker.direction = directions.right;
        } else {
            attacker.direction = directions.down;
        }
    };

    var waterCornerRightUp = new Tile("7.png");

    var waterRight = new Tile("8.png");

    var waterCornerRightDown = new Tile("9.png");

    var waterDown = new Tile("10.png");

    var waterCornerLeftDown = new Tile("11.png");

    var waterLeft = new Tile("12.png");

    var waterCornerLeftTop = new Tile("13.png");

    var waterUp = new Tile("14.png");

    var waterMiddle = new Tile("15.png");

    var waterSingleVertical = new Tile("16.png");

    var waterSingleHorizontal = new Tile("17.png");

    var waterSingleBottom = new Tile("18.png");

    var waterSingleTop = new Tile("19.png");

    var waterSingleRight = new Tile("20.png");

    var waterSingleLeft = new Tile("21.png");

    var splitDown = new Tile("22.png");

    splitDown.changeDirection = function (attacker) {
        var kies = Math.random();
        if (attacker.direction == directions.down) {
            if (kies < 0.5) {
                attacker.direction = directions.right;
            } else {
                attacker.direction = directions.left;
            }
        } else if (attacker.direction == directions.left || attacker.direction == directions.right) {
            if (kies < 0.5) {
                attacker.direction = directions.up;
            }
        }
    };

    var splitLeft = new Tile("23.png");

    splitLeft.changeDirection = function (attacker) {
        var kies = Math.random();
        if (attacker.direction == directions.left) {
            if (kies < 0.5) {
                attacker.direction = directions.up;
            } else {
                attacker.direction = directions.down;
            }
        } else if (attacker.direction == directions.up || attacker.direction == directions.down) {
            if (kies < 0.5) {
                attacker.direction = directions.right;
            }
        }
    };

    var splitUp = new Tile("24.png");

    splitUp.changeDirection = function (attacker) {
        var kies = Math.random();
        if (attacker.direction == directions.up) {
            if (kies < 0.5) {
                attacker.direction = directions.right;
            } else {
                attacker.direction = directions.left;
            }
        } else if (attacker.direction == directions.left || attacker.direction == directions.right) {
            if (kies < 0.5) {
                attacker.direction = directions.down;
            }
        }
    };

    var splitRight = new Tile("25.png");

    splitRight.changeDirection = function (attacker) {
        var kies = Math.random();
        if (attacker.direction == directions.right) {
            if (kies < 0.5) {
                attacker.direction = directions.up;
            } else {
                attacker.direction = directions.down;
            }
        } else if (attacker.direction == directions.up || attacker.direction == directions.down) {
            if (kies < 0.5) {
                attacker.direction = directions.left;
            }
        }
    };

    var allDirections = new Tile("26.png");

    allDirections.changeDirection = function (attacker) {
        var kies = Math.random();
        if (attacker.direction == directions.up) {
            if (kies < 0.33) {
                attacker.direction = directions.right;
            } else if (kies < 0.66) {
                attacker.direction = directions.left;
            }
        } else if (attacker.direction == directions.right) {
            if (kies < 0.33) {
                attacker.direction = directions.up;
            } else if (kies < 0.66) {
                attacker.direction = directions.down;
            }
        } else if (attacker.direction == directions.down) {
            if (kies < 0.33) {
                attacker.direction = directions.right;
            } else if (kies < 0.66) {
                attacker.direction = directions.left;
            }
        } else if (attacker.direction == directions.left) {
            if (kies < 0.33) {
                attacker.direction = directions.up;
            } else if (kies < 0.66) {
                attacker.direction = directions.down;
            }
        }
    };

    tiles = [
        grass,
        horizontal,
        vertical,
        cornerLeftDown,
        cornerLeftUp,
        cornerRightUp,
        cornerRightDown,
        waterCornerRightUp,
        waterRight,
        waterCornerRightDown,
        waterDown,
        waterCornerLeftDown,
        waterLeft,
        waterCornerLeftTop,
        waterUp,
        waterMiddle,
        waterSingleVertical,
        waterSingleHorizontal,
        waterSingleBottom,
        waterSingleTop,
        waterSingleRight,
        waterSingleLeft,
        splitDown,
        splitLeft,
        splitUp,
        splitRight,
        allDirections
    ];
}

createTiles();