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
        attackers[i].updatePosition();
    }

    for(i = 0; i < towers.length; i++) {
        towers[i].findTarget();
        towers[i].findUnitVector();
        towers[i].attack();
    }

    checkDead();
}

//loop van de volledige game
function gameLoop() {
    updateLogic();
    renderingStep();
    removeAttacks(); // als dit in de updateLogic gebeurt worden de laserattacks niet getoond want ze worden meteen verwijdert
    if(!checkGameOver()) {
        window.requestAnimationFrame(gameLoop);
    }
}