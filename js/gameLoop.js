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
}

function gameLoop() {
    processUserInput();

    for(var i = 0; i < attackers.length; i++) {
        attackers[i].updatePosition();
        checkDead();
    }

    for(var i = 0; i < towers.length; i++) {
        towers[i].findTarget();
        towers[i].attack();
    }

    renderingStep();
    window.requestAnimationFrame(gameLoop);
}