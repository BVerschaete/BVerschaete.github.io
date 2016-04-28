/**
 * Created by Bastien on 31/03/2016.
 */
function renderingStep(){
    drawMap();
    highlightTile();
    colorStartingTile();
    drawAttackers();
}

function updateLogic() {
    for (var i = 0; i < attackers.length; i++) {
        attackers[i].updatePosition();
    }
}

function gameLoop() {
    updateLogic();
    renderingStep();
    window.requestAnimationFrame(gameLoop);
}