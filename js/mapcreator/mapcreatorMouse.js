/**
 * Created by Bastien on 31/03/2016.
 */
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

function toggleMouseInCanvas(){
    mouse.inCanvas = !mouse.inCanvas;
}