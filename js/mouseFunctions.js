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
        var boardValueLinksBoven = getValueFromPos(mouse.x-10, mouse.y-10);
        var boardValueRechtsBoven = getValueFromPos(mouse.x+10, mouse.y-10);
        var boardValueLinksOnder = getValueFromPos(mouse.x-10, mouse.y+10);
        var boardValueRechtsOnder = getValueFromPos(mouse.x+10, mouse.y+10);

        var canPlace =(boardValueLinksBoven === 0 && boardValueLinksBoven !== null) &&
                        (boardValueRechtsBoven === 0 && boardValueRechtsBoven !== null) &&
                        (boardValueLinksOnder === 0 && boardValueLinksOnder !== null) &&
                        (boardValueRechtsOnder === 0 && boardValueRechtsOnder !== null);

        if(canPlace){
            context.fillStyle = 'Yellow';
            mouse.canPlaceTowerHere = true;
        }else{
            context.fillStyle = 'red';
            mouse.canPlaceTowerHere = false;
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

//plaatst tower bij muisklik
function placeTower() {
    if (mouse.canPlaceTowerHere) {
        addTower(mouse.x, mouse.y);
    }
}

