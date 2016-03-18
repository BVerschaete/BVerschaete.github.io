/**
 * Created by Gaben on 17/03/2016.
 */
var mouse;
var mouseInCanvas =false;

function getMousePosition(event) {
    var rect = document.getElementById("canvas").getBoundingClientRect();
    mouse = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
    console.log("moving");
}

function drawRadius(){
    if(mouse && mouseInCanvas) {
        console.log("drawing");
        var context = document.getElementById("canvas").getContext('2d');
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(mouse.x, mouse.y, 50, 0, 2 * Math.PI);
        // globalAlpha = transparancy
        context.globalAlpha = 0.2;
        context.fill();
        context.globalAlpha = 1;
    }
}

function toggleMouseInCanvas(){
    if(!mouseInCanvas){
        mouseInCanvas = true;
    }else{
        mouseInCanvas = false;
    }

    console.log(mouseInCanvas);
}
