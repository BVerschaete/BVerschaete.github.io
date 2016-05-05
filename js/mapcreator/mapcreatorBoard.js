/**
 * Created by Bastien on 31/03/2016.
 */
var map = {
    tileSize: 50,
    canvas: null,
    context: null
};

/**
 * Maakt een array aan met aantal rijen en kolommen
 */
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

/**
 * Backup bord als men geen vooruitgang wil kwijtgraken bij het veranderen van de tilesize
 * als er al iets op het bord staat
 */
function backupBoard() {
    level.backupBoard = level.board;
}

/**
 * Herstelt het bord naar de vorige versie
 */
function restoreBoard() {
    if (confirm("The board will be restored. Are you sure?")) {
        level.board = level.backupBoard;
        addCanvas();
        $("#sldRows").val(level.board.length);
        $("#sldCols").val(level.board[0].length);
        displaySliderValues();
    }
}

/**
 * Update het scherm met waarden van de sliders
 */
function displaySliderValues() {
    $("#atlRows").html($("#sldRows").val());
    $("#atlCols").html($("#sldCols").val());
    $("#tileSize").html(map.tileSize);
}

/**
 * Update de grootte van het bord naar de waarde van de sliders
 */
function changeBoardSize(){
    level.board = generateBoard($("#sldRows").val(), $("#sldCols").val());
    displaySliderValues();
    addCanvas();
}

/**
 * Update de grootte van de tiles
 */
function changeTileSize(event){
    map.tileSize = event.target.value;
    displaySliderValues();
    addCanvas();
}

/**
 * Verandert het cijfer in de array adhv de waarde van de geselecteerde afbeelding
 * en de positie van de muis
 */
function placeTile(){
    level.board[getMouseTileY()][getMouseTileX()] = parseInt(selectedImage.getAttribute("data-id"));
}

/**
 * Selecteer een image
 */
function selectTile(event){
    selectedImage = event.target;
    changeSelectedImage();
}

/**
 * Verwijder alle geplaatste tiles van het bord
 */
function clearBoard(){
    changeBoardSize();
    drawMap();
}

/**
 * Idem als functie in het gewone spel
 */
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