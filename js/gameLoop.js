/**
 * Created by Gaben on 18/03/2016.
 */
//update alles van het canvas en de GUI
function renderingStep(){
    //gui updates
    displayGameInfo();
    
    //canvas updates
    drawMap();
    drawAttackers();
    drawTowers();
    
    if (currentTower != -1) {
        drawRadius();
    }else if(selectedTower != -1){
        towers[selectedTower].drawRange();
    }
    
    drawAttacks();
}

//update alle game variabelen
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
    
    if((Date.now() - game.timeLastWaveSpawnEnds) > game.selectedLevel.spawnSpeed * 1000 && game.currentWaveSpawning == null) {
        spawnWave();
    }
    
    spawnNextMonster();
    checkDead();
}

//loop van de volledige game
function gameLoop() {
    updateLogic();
    renderingStep();
    removeAttacks(); // als dit in de updateLogic gebeurt worden de laserattacks niet getoond want ze worden meteen verwijdert
    if(!(checkGameOver() || game.paused)) {
        window.requestAnimationFrame(gameLoop);
    }
}

function pauseGame(){
    game.paused = true;
    game.timePauseStart = Date.now();
}

function resumeGame(){
    game.paused = false;
    var timePaused = Date.now() - game.timePauseStart;
    game.timeLastWaveSpawnEnds += timePaused;

    for(var i = 0; i < attackers.length; i++){
        attackers[i].oldNow += timePaused;
    }

    if(game.currentWaveSpawning != null){
        game.currentWaveSpawning.timeLastSpawned += timePaused;
    }

    for(i = 0; i < towers.length; i++){
        towers[i].oldNow += timePaused;
    }
    
    gameLoop();
}