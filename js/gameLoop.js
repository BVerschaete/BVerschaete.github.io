/**
 * Created by Gaben on 18/03/2016.
 */

function processUserInput(){

}

function renderingStep(){
    drawMap();
    drawAttackers();
    drawTowers();
    drawRadius();
    drawBullets();
}

function updateLogic(){
    for(var i = 0; i < attackers.length; i++) {
        attackers[i].updatePosition();
    }

    for(var i = 0; i < towers.length; i++) {
        towers[i].findTarget();
        towers[i].findUnitVector();
        towers[i].attack();
    }

    for(var i = 0; i < bullets.length; i++)
    {
        bullets[i].move();

        if (bullets[i].checkCollision()) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

function gameLoop() {
    processUserInput();
    updateLogic();
    renderingStep();
    checkDead();
    window.requestAnimationFrame(gameLoop);
}