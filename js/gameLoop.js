/**
 * Created by Gaben on 18/03/2016.
 */

function processUserInput(){

}

function renderingStep(){
    drawMap();
    drawAttackers();
    drawRadius();
}

function gameLoop() {
    processUserInput();

    for(var i = 0; i < attackers.length; i++) {
        attackers[i].updatePosition();
    }

    renderingStep();
    window.requestAnimationFrame(gameLoop);
}