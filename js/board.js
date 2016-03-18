/**
 * Created by Gaben on 16/03/2016.
 */
var board = [
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

var startX = 0;
var startY = 1;
var startDirection = 1;

var posX = 0;
var posY = 1;
var direction = 1; // top = 0, right = 1, down = 2, left = 3



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