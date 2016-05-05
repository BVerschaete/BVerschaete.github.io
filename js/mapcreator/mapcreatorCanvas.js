/**
 * Created by Bastien on 31/03/2016.
 */

/**
 * Bij het updaten van de grootte van het canvas
 * moet het vorige canvas verwijderd worden
 * en een groter of kleiner canvas geplaatst worden
 */
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

/**
 * Functie om tiles te plaatsen als de muis ingedrukt blijft gehouden worden
 */
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

/**
 * Tekent de map
 */
function drawMap(){
    for(var i = 0; i < level.board.length; i++){
        for(var j = 0; j < level.board[i].length; j++) {
            map.context.drawImage(tiles[level.board[i][j]].image, j * map.tileSize, i * map.tileSize, map.tileSize, map.tileSize);
        }
    }
}

/**
 * Toont met een witte schemering op welke tile de muis staat
 */
function highlightTile(){
    map.context.globalAlpha = 0.4;
    if(mouse.inCanvas) {
        if (mouse.color == null) {
            map.context.drawImage(selectedImage, getMouseTileX() * map.tileSize, getMouseTileY() * map.tileSize, map.tileSize, map.tileSize);
        } else {
            map.context.fillStyle = mouse.color;
            map.context.fillRect(getMouseTileX() * map.tileSize, getMouseTileY() * map.tileSize, map.tileSize, map.tileSize);
        }
    }
    map.context.globalAlpha  = 1;
}

/**
 * Selecteren van een start tile zodat het level weet waar de attackers moeten beginnen met spawnen
 */
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
        mouse.color = null;
    });
}

/**
 * Toont met groene scherming op welke tile de attackers starten
 */
function colorStartingTile(){
    if(level.startX != null && level.startY != null) {
        map.context.globalAlpha = 0.4;
        map.context.fillStyle = "green";
        map.context.fillRect(level.startX * map.tileSize, level.startY * map.tileSize, map.tileSize, map.tileSize);
        map.context.globalAlpha  = 1;
    }
}