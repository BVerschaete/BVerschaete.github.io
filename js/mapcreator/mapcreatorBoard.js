/**
 * Created by Bastien on 31/03/2016.
 */
var map = { tileSize: 50,
    canvas: null,
    context: null
};

function generateBoard(rows, cols){
    var b = [];

    for(var i = 0; i < rows; i++){
        b[i] = [];
        for(var j = 0; j < cols; j++){
            b[i][j] = 0;
        }
    }

    return b;
}

function backupBoard() {
    level.backupBoard = level.board;
}

function restoreBoard() {
    if (confirm("The board will be restored. Are you sure?")) {
        level.board = level.backupBoard;
        addCanvas();
        $("#sldRows").val(level.board.length);
        $("#sldCols").val(level.board[0].length);
        displaySliderValues();
    }
}

function displaySliderValues() {
    $("#atlRows").html($("#sldRows").val());
    $("#atlCols").html($("#sldCols").val());
    $("#tileSize").html(map.tileSize);
}

function changeBoardSize(){
    level.board = generateBoard($("#sldRows").val(), $("#sldCols").val());
    displaySliderValues();
    addCanvas();
    console.log("changing board size")
}

function changeTileSize(event){
    map.tileSize = event.target.value;
    displaySliderValues();
    addCanvas();
}

function placeTile(){
    level.board[getMouseTileY()][getMouseTileX()] = parseInt(selectedImage.getAttribute("data-id"));
}

function selectTile(event){
    selectedImage = event.target;
    changeSelectedImage();
}

function clearBoard(){
    changeBoardSize();
    drawMap();
}

function isInMiddleOfSquare(attacker) {
    var centerTileX = attacker.posX * map.tileSize + map.tileSize / 2;
    var centerTileY = attacker.posY * map.tileSize + map.tileSize / 2;

    var borderUp = centerTileY - map.tileSize / 2;
    var borderRight = centerTileX + map.tileSize / 2;
    var borderDown = centerTileY + map.tileSize / 2;
    var borderLeft = centerTileX - map.tileSize / 2;

    if (attacker.direction == directions.up) {
        if (attacker.locY - map.tileSize / 2 <= borderUp) {
            return true;
        }
    } else if (attacker.direction == directions.right) {
        if (attacker.locX + map.tileSize / 2 >= borderRight) {
            return true;
        }
    } else if (attacker.direction == directions.down) {
        if (attacker.locY + map.tileSize / 2 >= borderDown) {
            return true;
        }
    } else if (attacker.direction == directions.left) {
        if (attacker.locX - map.tileSize / 2 <= borderLeft) {
            return true;
        }
    }

    return false;
}