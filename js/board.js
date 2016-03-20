/**
 * Created by Gaben on 16/03/2016.
 */
// waarde van element in board[][] teruggeven voor corresponderende x en y waarde
function getValueFromPos(x, y){
    var indexHeight = Math.floor(y / game.tileSize);
    var indexWidth = Math.floor(x / game.tileSize);

    if(y < $("canvas").attr("height") && y >= 0){
        return selectedLevel.board[indexHeight][indexWidth];
    }else{
        return null;
    }
}