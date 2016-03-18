/**
 * Created by Gaben on 16/03/2016.
 */
var board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 2, 0, 0, 1, 1, 1, 0],
    [0, 1, 0, 2, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 2, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
];

var posX = 0;
var posY = 1;
var direction = 1; // top = 0, right = 1, down = 2, left = 3

var move = function() {
    if(direction != 2 && board[posY-1][posX] != null && board[posY-1][posX] == 1 ){
        posY -= 1;
        direction = 0;
    }else if(direction != 3 && board[posY][posX+1] != null && board[posY][posX+1] == 1 ){
        posX += 1;
        direction = 1;
    }else if(direction != 0 && board[posY+1][posX] != null && board[posY+1][posX] == 1 ){
        posY += 1;
        direction = 2;
    }else if(direction != 1 && board[posY][posX-1] != null && board[posY][posX-1] == 1 ){
        posX -= 1;
        direction = 3;
    }
};