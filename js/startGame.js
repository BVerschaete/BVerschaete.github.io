/**
 * Created by Bastien on 3/12/2015.
 */

/**basiswaarden om een game te starten
 * Uitleg variabelen:
 * currentWave: nummer van de wave we aan zitten
 * currentWaveSpawning: object van wave die bezig is met spawnen
 * timeLastWaveSpawnends: tijd wanneer de currentWaveSpawning stopt met de spawn
 * timePauseStart: nodig om de verstreken tijd tijdens de pauze te weten
 * currentTower: het type tower om te plaatsen
 * selectedTower: de geselecteerde tower op het veld
 */
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
    pushedScore: false,
    mouse: {
        canPlaceTowerHere: false,
        inCanvas: false,
        x: 0,
        y: 0
    },
    currentTower: -1,
    selectedTower: -1
};

/**
 *Deze functie voegt eventListeners toe aan alle knoppen en stelt alle
 * basiswaarden in voor een spel te starten.
 */
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
            game.currentTower = -1;
            game.selectedTower = -1;
            $("input:radio").prop("checked", false);
            displayInfo();
        });

        //Map moet al 1x getekend worden voor er op start wordt geklikt, zodat het spel mooi lijkt
        drawMap();

        //startknop
        //de .one() zorgt ervoor dat deze functie maar 1x uitgevoerd wordt
        //functie start de gameLoop en voegt eventlisteners aan het document toe om het spel te pauzeren en opnieuw te starten
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
    }
    else {
        window.location.href = "index.html";
        alert("Please select a name and a level before going to the game.html page");
    }
}

/**
 * zorgt ervoor dat de tekst en functie van de pauze/herstart knop omgewisselt wordt
 */
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

/**
 * kijkt iedere loop of de levens op 0 staan, zoja, toon het dimmer scherm met een highscores en herstart knop
 */
function checkGameOver() {
    if (game.lives <= 0) {
        var $dimmer = $('#dimmer');
        var $stop = $('#startStop');
        var $gameOverTitle = $dimmer.find('span');
        $gameOverTitle.css('display', 'inline-block');
        $stop.css("background", "rgba(255, 0, 0, 1");

        //als het een customLevel is, moeten highscores niet gepushed worden naar de database
        //tekst aanpassen naargeling het moet gepushed worden ofnie
        if(game.selectedLevel.customLevel) {
            $stop.text("Go to highscores");
            $stop.one('click', function(){
                window.location.href = "highscores.html";
            });
        } else {
            $stop.text("Submit score");
            $stop.one('click', pushScore);
        }

        //speel opnieuw en verwijder event listeners
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

/**
 * Verwijder alle towers, attackers en kogels, zet daarna de game variabelen op hun beginwaarden.
 * TODO Het opstellen van de globale variabele game kan desnoods nog in een aparte functie gezet worden
 */
function restartGame(){
    attackers=[];
    towers=[];
    attacks=[];
    game.currentWaveSpawning = null;
    game.selectedTower = -1;
    game.currentTower = -1;
    game.money = 400;
    game.currentWave = 0;
    game.attackersScore = 0;
    game.lives = 10;
    game.timeLastWaveSpawnEnds = Date.now();
    game.paused = false;
    game.timePauseStart = undefined;

    //deselect alle knoppen en start de loop opnieuw
    if($('#btnSpawnWave').prop('data-disabled')){
        toggleSpawn();
    }
    $("input:radio").prop("checked", false);

    gameLoop();
}

/**
 * verkrijgt de referentie naar het database object op de server d.m.v. firebase library
 * maakt daarna nieuw player object en pusht het naar de server waarna de pagina veranderd
 */
function pushScore() {
    var myFirebaseRef = new Firebase("https://popping-fire-3131.firebaseio.com/");
    var playerTable = myFirebaseRef.child('Highscores');

    var level = playerTable.child(levels.indexOf(game.selectedLevel));
    var selectedHighscoreList = level.child('Players');

    var player = {
        name: game.playerName,
        score: game.currentWave
    };
    
    //Extra veiligheid zodat highscre maximaal 1x gepushed wordt
    if (!game.pushedScore) {
        selectedHighscoreList.push(player, function () {
            window.location.href = "highscores.html";
        });
        game.pushedScore = true;
    }
}

$(window).load(setup);