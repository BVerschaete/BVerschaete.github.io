/**
 * Created by Bastien on 31/03/2016.
 */
function renderingStep(){
    drawMap();
    highlightTile();
    colorStartingTile();
}

function gameLoop() {
    renderingStep();
    window.requestAnimationFrame(gameLoop);
}