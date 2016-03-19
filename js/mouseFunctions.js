/**
 * Created by Gaben on 17/03/2016.
 */
var mouse = {
    canPlaceTowerHere: false,
    inCanvas: false,
    x: 0,
    y: 0
};

function getMousePosition(event) {
    var rect = game.canvas.getBoundingClientRect();

    mouse.x = event.clientX - rect.left - parseInt($(game.canvas).css("padding-left"));
    mouse.y = event.clientY - rect.top - parseInt($(game.canvas).css("padding-top"));
}

function drawRadius(){
    if(mouse.inCanvas) {
        var context = game.context;
        var boardValue = getValueFromPos(mouse.x, mouse.y);

        if(boardValue === 0 && boardValue !== null){
            context.fillStyle = 'Yellow';
            mouse.placeTower = true;
        }else{
            context.fillStyle = 'red';
            mouse.placeTower = false;
        }

        context.beginPath();
        context.arc(mouse.x, mouse.y, 50, 0, 2 * Math.PI);
        // globalAlpha = transparancy
        context.globalAlpha = 0.4;
        context.fill();
        context.globalAlpha = 1;
    }
}

function toggleMouseInCanvas(){
    mouse.inCanvas = !mouse.inCanvas;
}

function placeTower() {
    if (mouse.placeTower) {
        addTower(mouse.x, mouse.y);
    }
}

