/**
 * Created by Gaben on 25/03/2016.
 */
var selectedImage;
var map = { tileSize: 50,
            canvas: null,
            context: null
};

var level = {
    name: "Custom Level",
    difficulty: 0,
    spawnSpeed: 0,
    board: [],
    startDirection: directions.rechts,
    startX: null,
    startY: null
};

function setup(){
    level.board = generateBoard($("#sldRows").val(), $("#sldCols").val());
    addImages();
    addCanvas();
    $("#sldTilesize").on("input", changeTileSize);
    $("#sldRows, #sldCols").on("input", changeBoardSize);
    $('#levelStartCoords').click(selectStartTile);
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
    level.board[getMouseTileY()][getMouseTileX()] = selectedImage.getAttribute("data-id");
}

function selectTile(event){
    selectedImage = event.target;
    changeSelectedImage();
}

function addImages(){
    // voorlopig zelf instellen hoeveel images er in zitten :(
    var images = $('#availableImages');
    for(var i = 1; i <= 22; i++){
        var $img = $(tiles[i]);
        $img.attr("data-id", i); // het lukt niet met prop
        $img.click(selectTile);
        images.append($img);
    }

    selectedImage = images.find("img")[0];
    changeSelectedImage();
}

function changeSelectedImage(){
    $("#selectedImage").find("img")[0].src = selectedImage.src;
}

function toggleMouseInCanvas(){
    mouse.inCanvas = !mouse.inCanvas;
}

function addCanvas(){
    $("canvas").remove();
    var width = map.tileSize * level.board[0].length;
    var height = map.tileSize * level.board.length;
    var $canvas = $('<canvas/>').prop({width: width, height: height});

    $('#canvasContainer').append($canvas);

    map.canvas = $("canvas")[0];
    map.context = map.canvas.getContext("2d");

    map.context.fillStyle = 'white';
    map.context.fillRect(0, 0, $(map.canvas).prop("width"), $(map.canvas).prop("height"));

    $(map.canvas).mouseover(toggleMouseInCanvas);
    $(map.canvas).mouseout(toggleMouseInCanvas);
    $(map.canvas).mousemove(getMousePosition);

    addCanvasPlaceTileEventListeners();
}

function addCanvasPlaceTileEventListeners(){
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
        return level.board[indexHeight][indexWidth];
    }else{
        return null;
    }
}

function getMouseTileX(){
    return parseInt(mouse.x / map.tileSize);
}

function getMouseTileY(){
    return parseInt(mouse.y / map.tileSize);
}

var mouse = {
    inCanvas: false,
    color: "white",
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
    for(var i = 0; i < level.board.length; i++){
        for(var j = 0; j < level.board[i].length; j++) {
            map.context.drawImage(tiles[level.board[i][j]], j * map.tileSize, i * map.tileSize, map.tileSize, map.tileSize);
        }
    }
}

function highlightTile(){
    if(mouse.inCanvas){
        map.context.globalAlpha = 0.4;
        map.context.fillStyle = mouse.color;
        map.context.fillRect(getMouseTileX() * map.tileSize, getMouseTileY() * map.tileSize, map.tileSize, map.tileSize);
        map.context.globalAlpha  = 1;
    }
}

function selectStartTile(){
    var $canvas = $(map.canvas);
    $canvas.off('mousedown');
    $canvas.off('mouseup');
    mouse.color = "green";
    $canvas.on('click', function(){
        level.startX = getMouseTileX();
        $('#levelStartX').text(level.startX);
        level.startY = getMouseTileY();
        $('#levelStartY').text(level.startY);
        $canvas.off('click');
        addCanvasPlaceTileEventListeners();
        mouse.color = "white";
    });
}

function colorStartingTile(){
    if(level.startX != null && level.startY != null) {
        map.context.globalAlpha = 0.4;
        map.context.fillStyle = "green";
        map.context.fillRect(level.startX * map.tileSize, level.startY * map.tileSize, map.tileSize, map.tileSize);
        map.context.globalAlpha  = 1;
    }
}

function renderingStep(){
    drawMap();
    highlightTile();
    colorStartingTile();
}

function gameLoop() {
    renderingStep();
    window.requestAnimationFrame(gameLoop);
}

function createLevel(){
    level.name = $('#levelName').val();
    level.difficulty = $('#levelDifficulty').val();
    level.spawnSpeed = $('#levelSpawnSpeed').val();
    level.direction = directions[$('#levelStartDirection').find(":selected").text()];
}

function saveLevel(){
    
}

$(setup);