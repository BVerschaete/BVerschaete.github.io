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

//tekent de achtergrond adhv schema in levels.js
function drawMap(){
    game.context.fillStyle = 'white';
    game.context.fillRect(0, 0, $(game.canvas).attr("width"), $(game.canvas).attr("height"));

    //all different tiles, add to tiles object afterwards
    var grass = new Image();
    grass.src = "img/background.png";
    var path = new Image();
    path.src = "img/grasstile.png";
    var water = new Image();
    water.src = "img/watertile.jpg";
    
    var tiles = {
        0: grass,
        1: path,
        2: water
    };

    var board = selectedLevel.board;
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++) {
            game.context.drawImage(tiles[board[i][j]], j * game.tileSize, i * game.tileSize, game.tileSize, game.tileSize);
        }
    }
}

//voegt het canvas toe aan de html pagina en update de margins en canvasgrootte naar de grootte van het geselecteerde level
function addCanvas(){
    var board = selectedLevel.board;
    var width = game.tileSize * board[0].length;
    var height =  game.tileSize * board.length;
    var canvas = $('<canvas/>').attr({width: width, height: height});

    //geen vragen bij stellen, het werkt
    var gameInfo = $('#gameInfo');
    var marginLeftPercentage = 100*(((window.innerWidth - canvas.attr('width'))/2) - gameInfo.width() - parseInt(gameInfo.css('marginRight')))/window.innerWidth;

    gameInfo.css("margin-left",  marginLeftPercentage + "%");
    $('#container').find('div:eq(0)').after(canvas);


    game.canvas = $("canvas")[0];
    game.context = game.canvas.getContext("2d");
}

//toont het geld op het scherm
function displayMoney(){
    $("#money").text(game.money);
}

//spawnt X aantal monsters
function spawnWave(){
    event.stopPropagation();
    toggleSpawn();

    var waitTime = 1800 * game.tileSize / (new Attacker()).speedX;
    var aantalMonsters = 5;
    var loop = setInterval(addAttacker,waitTime);
    
    setTimeout(function(){ 
        clearInterval(loop); 
        toggleSpawn();
        game.waveStarted = true;
    }, aantalMonsters * waitTime);
}

//update de spawnbutton zodat hij gedisabled moet worden of niet
function toggleSpawn(){
    var btnSpawn = $("#btnSpawnWave")[0];
    btnSpawn.disabled = !btnSpawn.disabled;
}