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

function changeBoardSize(){
    level.board = generateBoard($("#sldRows").val(), $("#sldCols").val());
    $("#atlRows").html(level.board.length);
    $("#atlCols").html(level.board[0].length);

    addCanvas();
}

function changeTileSize(event){
    map.tileSize = event.target.value;
    $("#tileSize").html(map.tileSize);
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