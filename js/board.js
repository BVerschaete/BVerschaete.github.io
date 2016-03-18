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

var posX = 0;
var posY = 1;



// waarde van element in board[][] teruggeven voor corresponderende x en y waarde
function getValueFromPos(x, y){
    var canvas = document.getElementById("canvas");
    var width = $(canvas).width();
    var height = $(canvas).height();
    var tileHeight = height / board.length;
    var tileWidth = width / board[0].length;
    var indexHeight = Math.floor(y / tileHeight);
    var indexWidth = Math.floor(x / tileWidth);

    if(y < height && y >= 0){
        return board[indexHeight][indexWidth];
    }else{
        return null;
    }
}