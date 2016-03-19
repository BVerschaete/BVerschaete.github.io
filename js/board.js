/**
 * Created by Gaben on 16/03/2016.
 */

//Level Template, CTRL-/ to uncomment, directions: 0=boven, 1 = rechts, 2 = beneden, 3 = links
// var levelName = {
//     board:  [
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//     ],
    //     startDirection: 0,
//     startX: 0,
//     startY: 0
// };

var level1 = {
    board:  [
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
            ],
    startDirection: 1,
    startX: 0,
    startY: 1
};

var board = level1.board;

var startX = level1.startX;
var startY = level1.startY;
var startDirection = level1.startDirection;

// waarde van element in board[][] teruggeven voor corresponderende x en y waarde
function getValueFromPos(x, y){
    var indexHeight = Math.floor(y / game.tileSize);
    var indexWidth = Math.floor(x / game.tileSize);

    if(y < game.canvasHeight && y >= 0){
        return board[indexHeight][indexWidth];
    }else{
        return null;
    }
}