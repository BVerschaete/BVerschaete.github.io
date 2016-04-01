/**
 * Created by Bastien on 31/03/2016.
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