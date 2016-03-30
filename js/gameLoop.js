/**
 * Created by Gaben on 18/03/2016.
 */
//update alles van het canvas en de GUI
function renderingStep(){
    //gui updates
    displayAttScore();
    displayMoney();
    displayTime();
    
    //canvas updates
    drawMap();
    drawAttackers();
    drawTowers();
    
    if (currentTower != -1) {
        drawRadius();
    }else if(selectedTower != -1){
        towers[selectedTower].drawRange();
    }
    
    drawBullets();
}

//update alle game variabelen
function updateLogic(){
    for(var i = 0; i < attackers.length; i++) {
        attackers[i].updatePosition();
    }

    for(i = 0; i < towers.length; i++) {
        towers[i].findTarget();
        towers[i].findUnitVector();
        towers[i].attack();
    }

    for(i = 0; i < bullets.length; i++)
    {
        bullets[i].move();

        if (bullets[i].checkCollision()) {
            bullets.splice(i, 1);
            i--;
        }else if(bullets[i].target.health <= 0){
            bullets.splice(i, 1);
            i--;
        }
    }

    //spawnt wave iedere 10 seconden
    if((Date.now() - game.timeLastWaveSpawnEnds) > game.selectedLevel.spawnSpeed * 1000){
        spawnWave();
    }

    checkDead();
}

//loop van de volledige game
function gameLoop() {
    updateLogic();
    renderingStep();
    window.requestAnimationFrame(gameLoop);
}