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

function drawMap(){
    game.context.fillStyle = 'white';
    game.context.fillRect(0, 0, $(game.canvas).attr("width"), $(game.canvas).attr("height"));

    var path = new Image();
    path.src = "img/grasstile.png";
    var build = new Image();
    build.src = "img/background.png";
    var water = new Image();
    water.src = "img/watertile.jpg";

    var board = selectedLevel.board;
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++) {
            if(board[i][j] === 0){
                game.context.drawImage(build, j * game.tileSize, i * game.tileSize, game.tileSize, game.tileSize);
            }else if(board[i][j] === 1) {
                game.context.drawImage(path, j * game.tileSize, i * game.tileSize, game.tileSize, game.tileSize);
            }else if(board[i][j] === 2) {
                game.context.drawImage(water, j * game.tileSize, i * game.tileSize, game.tileSize, game.tileSize);
            }
        }
    }
}

function addCanvas(){
    var board = selectedLevel.board;
    var width = game.tileSize * board[0].length;
    var height =  game.tileSize * board.length;
    $("#container").css({ 'width': width });
    $('<canvas/>').attr({width: width, height: height, id: 'canvas'}).appendTo('#container');

    game.canvas = $("canvas")[0];
    game.context = game.canvas.getContext("2d");
}

function displayMoney(){
    $("#money").text(game.money);
}

function spawnWave(){
    toggleSpawn();

    var waitTime = 1800 * game.tileSize / (new Attacker()).speedX;
    var aantalMonsters = 5;
    var loop = setInterval(addAttacker,waitTime);
    setTimeout(function( ) { clearInterval(loop); toggleSpawn(); }, aantalMonsters * waitTime);
}

function toggleSpawn(){
    var btnSpawn = $("#btnSpawnWave")[0];
    btnSpawn.disabled = !btnSpawn.disabled;
}