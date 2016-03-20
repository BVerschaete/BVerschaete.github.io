/**
 * Created by Gaben on 18/03/2016.
 */

function processUserInput(){

}

function renderingStep(){
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
    
    displayAttScore();
    displayAttStopped();
    displayMoney();

    checkDead();
}

function gameLoop() {
    processUserInput();
    updateLogic();
    renderingStep();
    window.requestAnimationFrame(gameLoop);
}