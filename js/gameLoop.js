/**
 * Created by Gaben on 18/03/2016.
 */
//update alles van het canvas en de GUI
function renderingStep(){
    //gui updates
    displayAttScore();
    displayAttStopped();
    displayMoney();
    
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
        }
    }

    if(game.waveStarted == true && attackers.length == 0){
        game.waveStarted = false;
        $('#wonWave')[0].play();
    }

    checkDead();
}

//loop van de volledige game
function gameLoop() {
    updateLogic();
    renderingStep();
    window.requestAnimationFrame(gameLoop);
}