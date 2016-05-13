/**
 * Created by Gaben on 16/03/2016.
 */

/**
 * waarde van element in board[][] teruggeven voor corresponderende x en y waarde
 * null teruggeven als we buiten het canvas gaan
 */
function getValueFromPos(x, y){
    var indexHeight = Math.floor(y / game.tileSize);
    var indexWidth = Math.floor(x / game.tileSize);

    if(y < $("canvas").prop("height") && y >= 0){
        return game.selectedLevel.board[indexHeight][indexWidth];
    }
    
    return null;
}

/**
 * Kijkt wanneer een gegeven attacker het midden van een tile gepasseerd is
 */
function isInMiddleOfSquare(attacker){
    var centerTileX = attacker.posX*game.tileSize + game.tileSize/2;
    var centerTileY = attacker.posY*game.tileSize + game.tileSize/2;

    var borderUp = centerTileY - game.tileSize/2;
    var borderRight = centerTileX + game.tileSize/2;
    var borderDown = centerTileY + game.tileSize/2;
    var borderLeft = centerTileX - game.tileSize/2;
    
    if (attacker.direction == directions.up) {
        if (attacker.locY - game.tileSize / 2 <= borderUp) {
            return true;
        }
    } else if (attacker.direction == directions.right) {
        if (attacker.locX + game.tileSize / 2 >= borderRight) {
            return true;
        }
    } else if (attacker.direction == directions.down) {
        if (attacker.locY + game.tileSize / 2 >= borderDown) {
            return true;
        }
    } else if (attacker.direction == directions.left) {
        if (attacker.locX - game.tileSize / 2 <= borderLeft) {
            return true;
        }
    }

    return false;
}

/**
 * tekent de achtergrond adhv schema in levels.js
 */
function drawMap(){
    var board = game.selectedLevel.board;
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++) {
            game.context.drawImage(tiles[board[i][j]].image, j * game.tileSize, i * game.tileSize, game.tileSize, game.tileSize);
        }
    }
}

/**
 * voegt het canvas toe aan de html pagina en update de margins en canvasgrootte naar de grootte van het geselecteerde level
 */
function addCanvas(){
    var board = game.selectedLevel.board;
    var width = game.tileSize * board[0].length;
    var height =  game.tileSize * board.length;
    var canvas = $('<canvas/>').prop({width: width, height: height});
    canvas.mouseover(toggleMouseInCanvas);
    canvas.mouseout(toggleMouseInCanvas);
    canvas.mousemove(getMousePosition);
    canvas.click(canvasClicked);
    
    
    //geen vragen bij stellen, het werkt, zorgt ervoor dat het canvas gecentreerd wordt
    var gameInfo = $('#gameInfo');
    var marginLeftPercentage = 100*(((window.innerWidth - canvas.prop('width'))/2) - gameInfo.width() - parseInt(gameInfo.css('marginRight')))/window.innerWidth;

    gameInfo.css("margin-left",  marginLeftPercentage + "%");
    $('#container').find('div:eq(0)').after(canvas);


    game.canvas = $("canvas")[0];
    game.context = game.canvas.getContext("2d");
}

/**
 * Voegt voor ieder toren een button toe met juiste tekst
 */
function addTowerButtons(){
    for(var i = 0; i < towerTypes.length; i ++){
        var buttonid = "towerButton" + i;
        var $button = $("<input>", {id: buttonid, type: "radio", class: "towerbutton", "data-type": i, name: "towerButton"});
        var $label = $("<label>" , {for: buttonid});
        $label.text(towerTypes[i].prototype.displayName);
        $button.click(selectTowerToBuild);
        $("#controls").append($button, $label);
    }
}

/**
 * Zorgt ervoor dat de waarden in game info geupdate worden
 */
function displayGameInfo(){
    $("#lives").text(game.lives); // toont score attackers
    $("#money").text(Math.floor(game.money)); // toont het geld op het scherm
    $("#currentWave").text(game.currentWave); // toont het nummer van de huidige wave

    displayTime();
}

/**
 * toont timer voor volgende wave
 * Zet timer op 0 als timer kleiner zou worden dan 0 (vooral belangrijk voor latere waves)
 */
function displayTime(){
    var timeField = $("#nextWaveTime");
    if(game.timeLastWaveSpawnEnds < Date.now()) {
        var time = Math.ceil(game.selectedLevel.spawnSpeed - (Date.now() - game.timeLastWaveSpawnEnds) / 1000);
        if(time < 0){
            time = 0;
        }
        timeField.text(time);
    } else {
        timeField.text(game.selectedLevel.spawnSpeed);

    }
}