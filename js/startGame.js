/**
 * Created by Bastien on 3/12/2015.
 */
//basiswaarden om een game te starten
var game = {
    playerName: sessionStorage.playerName,
    selectedLevel: levels[sessionStorage.selectedLevel],
    canvas: null,
    context: null,
    tileSize: 60,
    money: 400,
    currentWave: 0,
    lives: 10,
    timeLastWaveSpawnEnds: null,
    paused: false,
    timePauseStart: undefined
};

function setup() {
    //kijken of speler naam en level ingevoerd heeft
    if(game.playerName != null && game.selectedLevel) {
        addCanvas();
        addTowerButtons();

        $(game.canvas).mouseover(toggleMouseInCanvas);
        $(game.canvas).mouseout(toggleMouseInCanvas);
        $(game.canvas).mousemove(getMousePosition);
        $(game.canvas).click(displayInfo);
        $(game.canvas).click(placeTower);
        $(".towerbutton").click(selectTowerToBuild);
        $("#btnSpawnWave").click(spawnWaveNow);

        var upgradeTower = $("#upgradeTower");
        upgradeTower.click(upgradeSelectedTower);
        upgradeTower.hover(showUpgradeInfo, hideUpgradeInfo);

        $("#sellTower").click(sellSelectedTower);

        //als buiten het canvas geklikt wordt, worden alle selecties en info bladen verwijderd
        $("body").click(function () {
            currentTower = -1;
            selectedTower = -1;
            displayInfo();
        });

        drawMap();

        //startknop
        var $button = $('#dimmer').find('> div');
        $button.click(function(){
            game.timeLastWaveSpawnEnds = Date.now();
            var $dimmer = $('#dimmer');
            $dimmer.hide();
            $button.off();
            gameLoop();
            document.addEventListener("visibilitychange", function() {
                if(document.visibilityState == "hidden"){
                    pauseGame();
                } else {
                    resumeGame();
                }
            });
        });
    } else {
        window.location.href = "index.html";
        alert("Please select a name and a level before going to the game.html page");
    }
}

function checkGameOver() {
    if (game.lives <= 0) {
        var $dimmer = $('#dimmer');
        var $stop = $('#startStop');
        $stop.css("background", "rgba(255, 0, 0, 1");
        $stop.text("Game Over");
        $stop.click(function(){
            if(game.selectedLevel.customLevel) {
                window.location.href = "highscores.html";
            } else {
                sessionStorage.playedLevel = standardLevels.indexOf(game.selectedLevel);
                pushScore();
            }
        });

        var $playAgain = $('#playAgain');
        $playAgain.css('display', 'inline-block');
        $playAgain.click(function(){
            $stop.off();
            restartGame();
            $dimmer.hide();
        });


        $dimmer.show();
        return true;
    }
}

function restartGame(){
    attackers=[];
    towers=[];
    attacks=[];
    currentWaveSpawning = null;
    game.money = 400;
    game.currentWave = 0;
    game.attackersScore = 0;
    game.lives = 10;
    game.timeLastWaveSpawnEnds = Date.now();
    game.paused = false;
    game.timePauseStart = undefined;

    if($('#btnSpawnWave')[0].disabled){
        toggleSpawn();
    }

    gameLoop();
}

function pushScore(){
    var myFirebaseRef = new Firebase("https://popping-fire-3131.firebaseio.com/");
    var playerTable = myFirebaseRef.child('Highscores');

    if(playerTable.hasChild(levels.indexOf(game.selectedLevel))) {

        var level = playerTable.child(levels.indexOf(game.selectedLevel));
        var selectedHighscoreList = level.child('Players');

        var player = {
            name: game.playerName,
            score: game.currentWave
        };

        selectedHighscoreList.push(player);
    }
    window.location.href = "highscores.html";
}

$(window).load(setup);