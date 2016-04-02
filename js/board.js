/**
 * Created by Gaben on 16/03/2016.
 */
// waarde van element in board[][] teruggeven voor corresponderende x en y waarde
function getValueFromPos(x, y){
    var indexHeight = Math.floor(y / game.tileSize);
    var indexWidth = Math.floor(x / game.tileSize);

    if(y < $("canvas").prop("height") && y >= 0){
        return game.selectedLevel.board[indexHeight][indexWidth];
    }else{
        return null;
    }
}

//tekent de achtergrond adhv schema in levels.js
function drawMap(){
    var board = game.selectedLevel.board;
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++) {
            game.context.drawImage(tiles[board[i][j]], j * game.tileSize, i * game.tileSize, game.tileSize, game.tileSize);
        }
    }
}

//voegt het canvas toe aan de html pagina en update de margins en canvasgrootte naar de grootte van het geselecteerde level
function addCanvas(){
    var board = game.selectedLevel.board;
    var width = game.tileSize * board[0].length;
    var height =  game.tileSize * board.length;
    var canvas = $('<canvas/>').prop({width: width, height: height});

    //geen vragen bij stellen, het werkt
    var gameInfo = $('#gameInfo');
    var marginLeftPercentage = 100*(((window.innerWidth - canvas.prop('width'))/2) - gameInfo.width() - parseInt(gameInfo.css('marginRight')))/window.innerWidth;

    gameInfo.css("margin-left",  marginLeftPercentage + "%");
    $('#container').find('div:eq(0)').after(canvas);


    game.canvas = $("canvas")[0];
    game.context = game.canvas.getContext("2d");
}

//toont het geld op het scherm
function displayMoney() {
    $("#money").text(game.money);
}

//toont timer voor volgende wave
function displayTime(){
    var timeField = $("#nextWaveTime");
    if(game.timeLastWaveSpawnEnds < Date.now()) {
        var time = Math.ceil(game.selectedLevel.spawnSpeed - (Date.now() - game.timeLastWaveSpawnEnds) / 1000);
        timeField.text(time);
    } else {
        timeField.text(game.selectedLevel.spawnSpeed);
    }
}

function displayCurrWave(){
    $("#currentWave").text(game.currentWave);
}