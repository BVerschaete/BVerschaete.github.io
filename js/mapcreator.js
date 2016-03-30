/**
 * Created by Gaben on 25/03/2016.
 */
var selectedImage;
var map = { tileSize: 50,
            canvas: null,
            context: null
};
var board;

function setup(){
    board = generateBoard($("#sldRows").val(), $("#sldCols").val());
    addImages();
    addCanvas();
    $("#sldTilesize").on("input", changeTileSize);
    $("#sldRows, #sldCols").on("input", changeBoardSize);
    gameLoop();
}

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
    board = generateBoard($("#sldRows").val(), $("#sldCols").val());
    $("#atlRows").html(board.length);
    $("#atlCols").html(board[0].length);

    addCanvas();
}

function changeTileSize(event){
    map.tileSize = event.target.value;
    $("#tileSize").html(map.tileSize);
    addCanvas();
}

function placeTile(){
    board[getYIndexFromPos(mouse.x, mouse.y)][getXIndexFromPos(mouse.x, mouse.y)] = selectedImage.getAttribute("data-id");
}

function selectTile(event){
    selectedImage = event.target;
    changeSelectedImage();
}

function addImages(){
    // voorlopig zelf instellen hoeveel images er in zitten :(
    for(var i = 1; i <= 22; i++){
        var $img = $(tiles[i]);
        $img.attr("data-id", i); // het lukt niet met prop
        $img.click(selectTile);
        $("#availableImages").append($img);
    }

    selectedImage = $("#availableImages img")[0];
    changeSelectedImage();
}

function changeSelectedImage(){
    $("#selectedImage img")[0].src = selectedImage.src;
}

function toggleMouseInCanvas(){
    mouse.inCanvas = !mouse.inCanvas;
}

function addCanvas(){
    var canvas = $("canvs");
    canvas.remove();
    var width = map.tileSize * board[0].length;
    var height = map.tileSize * board.length;
    var $canvas = $('<canvas/>').prop({width: width, height: height});

    $('#canvasContainer').append($canvas);

    map.canvas = canvas[0];
    map.context = map.canvas.getContext("2d");

    map.context.fillStyle = 'white';
    map.context.fillRect(0, 0, $(map.canvas).prop("width"), $(map.canvas).prop("height"));

    $(map.canvas).mouseover(toggleMouseInCanvas);
    $(map.canvas).mouseout(toggleMouseInCanvas);
    $(map.canvas).mousemove(getMousePosition);
    
    var interval;
    $(map.canvas).on('mousedown',function(event) {
        event.stopPropagation();
        interval = setInterval(function() {
            placeTile();
        },25);
    });
    
    $(map.canvas).on('mouseup',function() {
        clearInterval(interval);
    });

}

function getValueFromPos(x, y){
    var indexHeight = Math.floor(y / map.tileSize);
    var indexWidth = Math.floor(x / map.tileSize);

    if(y < $("canvas").prop("height") && y >= 0){
        return board[indexHeight][indexWidth];
    }else{
        return null;
    }
}

function getXIndexFromPos(x, y){
    return parseInt(mouse.x / map.tileSize);
}

function getYIndexFromPos(x, y){
    return parseInt(mouse.y / map.tileSize);
}

var mouse = {
    inCanvas: false,
    x: 0,
    y: 0
};

//zoekt x en y coordinaten van muis
function getMousePosition(event) {
    var rect = map.canvas.getBoundingClientRect();

    mouse.x = event.clientX - rect.left - parseInt($(map.canvas).css("padding-left"));
    mouse.y = event.clientY - rect.top - parseInt($(map.canvas).css("padding-top"));
}

function drawMap(){
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++) {
            map.context.drawImage(tiles[board[i][j]], j * map.tileSize, i * map.tileSize, map.tileSize, map.tileSize);
        }
    }
}

function highlightTile(){
    if(mouse.inCanvas){
        map.context.globalAlpha = 0.4;
        map.context.fillStyle = "white";
        map.context.fillRect(getXIndexFromPos(mouse.x, mouse.y) * map.tileSize, getYIndexFromPos(mouse.x, mouse.y) * map.tileSize, map.tileSize, map.tileSize);
        map.context.globalAlpha  = 1;
    }
}

function renderingStep(){
    drawMap();
    highlightTile();
}

function gameLoop() {
    //updateLogic();
    renderingStep();
    window.requestAnimationFrame(gameLoop);
}

$(setup);