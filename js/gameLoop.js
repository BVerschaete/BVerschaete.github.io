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

function updateAttackerPositions(){
    updatePosOnBoard();
    var now = Date.now();
    var timeDelta = now - game.oldNow;
    game.oldNow = now;
    //console.log(attacker.direction);
    if(attacker.direction === 0){
        if(getValueFromPos(Math.floor(attacker.locX), Math.floor(attacker.locY - (attacker.speedY * timeDelta / 1000))) !== 1){
            move(attacker);
            attacker.locY = attacker.posY * 40;
            attacker.locX = Math.floor(attacker.locX);
        }else{
            attacker.locY -= attacker.speedY * timeDelta / 1000;
        }
    }else if(attacker.direction === 1){
        if(getValueFromPos(Math.floor(attacker.locX) + 40, Math.floor(attacker.locY)) !== 1){
            move(attacker);
            attacker.locX = attacker.posX * 40;
            attacker.locY = Math.floor(attacker.locY);
        }else{
            attacker.locX += attacker.speedX * timeDelta / 1000;
        }
    }else if(attacker.direction === 2){
        if(getValueFromPos(Math.floor(attacker.locX), Math.floor(attacker.locY  + 40)) !== 1){
            move(attacker);
            attacker.locY = attacker.posY * 40;
            attacker.locX = Math.floor(attacker.locX);
        }else{
            attacker.locY += attacker.speedY * timeDelta / 1000;
        }
    }else if(attacker.direction === 3){
        if(getValueFromPos(Math.floor(attacker.locX - (attacker.speedY * timeDelta / 1000)), Math.floor(attacker.locY)) !== 1){
            move(attacker);
            attacker.locX = attacker.posX * 40;
            attacker.locY = Math.floor(attacker.locY);
        }else{
            attacker.locX -= attacker.speedX * timeDelta / 1000;
        }
    }
}

function gameLoop() {
    processUserInput();
    updateAttackerPositions();
    renderingStep();
    window.requestAnimationFrame(gameLoop);
}