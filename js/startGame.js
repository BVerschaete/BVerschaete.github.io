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
    currentWaveSpawning: null,
    lives: 10,
    timeLastWaveSpawnEnds: null,
    paused: false,
    manualPaused: false,
    timePauseStart: undefined,
    pushedScore: false
};

function setup() {
    //kijken of speler naam en level ingevoerd heeft
    if(game.playerName != null && game.selectedLevel) {
        addCanvas();
        addTowerButtons();
        $("#btnSpawnWave").click(spawnWaveNow);

        var upgradeTower = $("#upgradeTower");
        upgradeTower.click(upgradeSelectedTower);
        upgradeTower.hover(showUpgradeInfo, hideUpgradeInfo);

        $("#sellTower").click(sellSelectedTower);

        //als buiten het canvas geklikt wordt, worden alle selecties en info bladen verwijderd
        $("body").click(function () {
            currentTower = -1;
            selectedTower = -1;
            $("input:radio").prop("checked", false);
            displayInfo();
        });
        
        drawMap();

        //startknop
        var $start = $('#dimmer').find('div');
        $start.one('click', function(){
            game.timeLastWaveSpawnEnds = Date.now();
            var $dimmer = $('#dimmer');
            $dimmer.hide();
            gameLoop();
            document.addEventListener("visibilitychange", function() {
                if (!game.manualPaused) {
                    if (document.visibilityState == "hidden") {
                        pauseGame();
                    } else {
                        resumeGame();
                    }
                }
            });
        });
        
        $('#pauseResume').click(pauseResume);
    } else {
        window.location.href = "index.html";
        alert("Please select a name and a level before going to the game.html page");
    }
}

function pauseResume(event){
    var $button = $(event.target);
    if(game.paused){
        $button.text("Pause Game");
        game.manualPaused = false;
        resumeGame();
    } else {
        $button.text("Resume Game");
        game.manualPaused = true;
        pauseGame();
    }
}

function checkGameOver() {
    if (game.lives <= 0) {
        var $dimmer = $('#dimmer');
        var $stop = $('#startStop');
        var $gameOverTitle = $dimmer.find('span');
        $gameOverTitle.css('display', 'inline-block');
        $stop.css("background", "rgba(255, 0, 0, 1");
        
        if(game.selectedLevel.customLevel) {
            $stop.text("Go to highscores");
            $stop.one('click', function(){
                window.location.href = "highscores.html";
            });
        } else {
            $stop.text("Submit score");
            $stop.one('click', pushScore);
        }

        var $playAgain = $('#playAgain');
        $playAgain.css('display', 'inline-block');
        $playAgain.one('click', function(){
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
    selectedTower = -1;
    currentTower = -1;
    game.money = 400;
    game.currentWave = 0;
    game.attackersScore = 0;
    game.lives = 10;
    game.timeLastWaveSpawnEnds = Date.now();
    game.paused = false;
    game.timePauseStart = undefined;

    if($('#btnSpawnWave').prop('data-disabled')){
        toggleSpawn();
    }
    $("input:radio").prop("checked", false);

    gameLoop();
}

function pushScore() {
    var myFirebaseRef = new Firebase("https://popping-fire-3131.firebaseio.com/");
    var playerTable = myFirebaseRef.child('Highscores');

    var level = playerTable.child(levels.indexOf(game.selectedLevel));
    var selectedHighscoreList = level.child('Players');

    var player = {
        name: game.playerName,
        score: game.currentWave
    };
    if (!game.pushedScore) {
        selectedHighscoreList.push(player, function () {
            window.location.href = "highscores.html";
        });
        game.pushedScore = true;
    }
}

$(window).load(setup);