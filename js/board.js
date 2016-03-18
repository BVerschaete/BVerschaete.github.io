/**
 * Created by Gaben on 16/03/2016.
 */

//Level Template, CTRL-/ to uncomment
// var levelName = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];

var level1 = [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [1, 1, 0, 2, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 2, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 2, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 1]
];

var board = level1;

var startX = 0;
var startY = 1;
var startDirection = 1;

// waarde van element in board[][] teruggeven voor corresponderende x en y waarde
function getValueFromPos(x, y){
    var indexHeight = Math.floor(y / game.tileHeight);
    var indexWidth = Math.floor(x / game.tileWidth);

    if(y < game.canvasHeight && y >= 0){
        return board[indexHeight][indexWidth];
    }else{
        return null;
    }
}