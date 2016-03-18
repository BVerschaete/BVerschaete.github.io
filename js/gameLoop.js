/**
 * Created by Gaben on 18/03/2016.
 */

function processUserInput(){

}

function renderingStep(){
    drawMap();
    drawRadius();
}

function updateAttackerPositions(){

}

function gameLoop() {
    processUserInput();
    updateAttackerPositions();
    renderingStep();
    window.requestAnimationFrame(gameLoop);
}