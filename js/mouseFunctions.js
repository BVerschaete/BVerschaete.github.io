/**
 * Created by Gaben on 17/03/2016.
 */
var mouse = {};
var mouseInCanvas =false;

function getMousePosition(event) {
    var rect = game.canvas.getBoundingClientRect();

    mouse = {
        x: event.clientX - rect.left - parseInt($(game.canvas).css("padding-left")),
        y: event.clientY - rect.top - parseInt($(game.canvas).css("padding-top"))
    };
    console.log("X: " + mouse.x + ", Y: " + mouse.y);
}

function drawRadius(){
    if(mouse && mouseInCanvas) {
        var context = game.context;
        var boardValue = getValueFromPos(mouse.x, mouse.y);

        if(boardValue === 0 && boardValue !== null){
            context.fillStyle = 'Yellow';
        }else{
            context.fillStyle = 'red';
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
    mouseInCanvas = !mouseInCanvas;
}
