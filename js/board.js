/**
 * Created by Gaben on 16/03/2016.
 */
// waarde van element in board[][] teruggeven voor corresponderende x en y waarde
function getValueFromPos(x, y){
    var indexHeight = Math.floor(y / game.tileSize);
    var indexWidth = Math.floor(x / game.tileSize);

    if(y < $("canvas").prop("height") && y >= 0){
        return game.selectedLevel.board[indexHeight][indexWidth];
    }
    
    return null;
    
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

function addTowerButtons(){
    for(var i = 0; i < towerTypes.length; i ++){
        var $button = $("<input>", {type: "button", class: "btn towerbutton", value: towerTypes[i].prototype.displayName + " (" + towerTypes[i].prototype.cost + " coins)"});
        $button.attr("data-type", i);
        $("#controls").append($button);
    }
}

function displayGameInfo(){
    $("#attackersScore").text(game.attackersScore); // toont score attackers
    $("#money").text(Math.floor(game.money)); // toont het geld op het scherm
    $("#currentWave").text(game.currentWave); // toont het nummer van de huidige wave

    displayTime();
}

//toont timer voor volgende wave
function displayTime(){
    var timeField = $("#nextWaveTime");
    if(game.timeLastWaveSpawnEnds < Date.now()) {
        var time = Math.ceil(game.selectedLevel.spawnSpeed - (Date.now() - game.timeLastWaveSpawnEnds) / 1000);
        timeField.text(time);

        //spawnt wave iedere 20 seconden
        if((Date.now() - game.timeLastWaveSpawnEnds) > game.selectedLevel.spawnSpeed * 1000) {
            spawnWave();
        }
    } else {
        timeField.text(game.selectedLevel.spawnSpeed);

    }
}