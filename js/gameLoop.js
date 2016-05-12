/**
 * Created by Gaben on 18/03/2016.
 */

/**
 * update alles van het canvas en de GUI
 */
function renderingStep(){
    //gui updates
    displayGameInfo();
    
    //canvas updates
    drawMap();
    drawAttackers();
    drawTowers();
    
    if (game.currentTower != -1) {
        drawRadius();
    }else if(game.selectedTower != -1){
        towers[game.selectedTower].drawRange();
    }
    
    drawAttacks();
}

/**
 * update alle game variabelen
 */
function updateLogic(){
    for(var i = 0; i < attackers.length; i++) {
        attackers[i].updateConditions();
        attackers[i].updatePosition();
    }

    for(i = 0; i < towers.length; i++) {
        towers[i].findTarget();
        towers[i].findUnitVector();
        towers[i].attack();
    }

    updateAttacks();
    
    //spawnt een wave als de verstreken tijd tussen het eindigen van spawnen van de vorige wave groter is dan de wachttijd van het level
    //en als de vorige wave al gedaan is met spawnen (vooral voor latere levels belangrijk)
    if((Date.now() - game.timeLastWaveSpawnEnds) > game.selectedLevel.spawnSpeed * 1000 && game.currentWaveSpawning == undefined) {
        spawnWave();
    }
    
    spawnNextMonster();
    checkDead();
}

/**
 * loop van de volledige game
 */
function gameLoop() {
    if(!(game.gameOver || game.paused)) {
        updateLogic();
        renderingStep();
        checkGameOver();
        window.requestAnimationFrame(gameLoop);
    }
}

/**
 * Pauzeert het spel en houd bij op welk moment het spel gepauzeerd is
 * op deze manier weten we hoelang er gepauzeerd is en adhv daarvan
 * kunnen we onze variabelen die werken met Date.now() updaten
 */
function pauseGame(){
    game.paused = true;
    game.timePauseStart = Date.now();
    $('#btnSpawnWave').off();
    $("#upgradeTower").off();
    $("#sellTower").off();
    $("body").off();
}

/**
 * Hervat het spel en update de variabelen adhv de gepauzeerde tijd
 */
function resumeGame(){
    game.paused = false;
    var timePaused = Date.now() - game.timePauseStart;
    game.timeLastWaveSpawnEnds += timePaused;

    for(var i = 0; i < attackers.length; i++){
        attackers[i].oldNow += timePaused;

        for (var j = 0; j < attackers[i].conditions.length; j++) {
            attackers[i].conditions[j].startTime += timePaused;
        }
    }

    if(game.currentWaveSpawning != null){
        game.currentWaveSpawning.timeLastSpawned += timePaused;
    }

    for(i = 0; i < towers.length; i++){
        towers[i].oldNow += timePaused;
    }

    addControlEventListeners();
    gameLoop();
}