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
        var boardValueLinksBoven = getValueFromPos(mouse.x-(game.tileSize/4), mouse.y-(game.tileSize/4));
        var boardValueRechtsBoven = getValueFromPos(mouse.x+(game.tileSize/4), mouse.y-(game.tileSize/4));
        var boardValueLinksOnder = getValueFromPos(mouse.x-(game.tileSize/4), mouse.y+(game.tileSize/4));
        var boardValueRechtsOnder = getValueFromPos(mouse.x+(game.tileSize/4), mouse.y+(game.tileSize/4));

        var canPlace =( (game.money >= towerClasses[currentTower].prototype.cost) &&
                        (boardValueLinksBoven === 0 && boardValueLinksBoven !== null) &&
                        (boardValueRechtsBoven === 0 && boardValueRechtsBoven !== null) &&
                        (boardValueLinksOnder === 0 && boardValueLinksOnder !== null) &&
                        (boardValueRechtsOnder === 0 && boardValueRechtsOnder !== null) &&
                        (towerOnLocation(mouse.x, mouse.y) === -1));

        if(canPlace){
            context.fillStyle = 'Yellow';
            mouse.canPlaceTowerHere = true;
        }else{
            context.fillStyle = 'red';
            mouse.canPlaceTowerHere = false;
        }

        function drawCircle() {
            context.beginPath();
            var range = towerClasses[currentTower].prototype.range;
            context.arc(mouse.x, mouse.y, range, 0, 2 * Math.PI);
            // globalAlpha = transparancy
            context.globalAlpha = 0.4;
            context.fill();
            context.globalAlpha = 1;
        }

        function drawTower(){
            var sprite = new Image();
            sprite.src = "img/" + towerClasses[currentTower].prototype.image;
            context.globalAlpha = 0.4;
            context.drawImage(sprite, mouse.x - game.tileSize/4, mouse.y - game.tileSize/4, game.tileSize/2, game.tileSize/2);
            context.globalAlpha = 1;
        }
        
        drawCircle();
        drawTower();
    }
}

function toggleMouseInCanvas(){
    mouse.inCanvas = !mouse.inCanvas;
}

//plaatst tower bij muisklik
function placeTower(event) {
    event.stopPropagation();
    selectedTower = towerOnLocation(mouse.x, mouse.y);
    var tower = towers[selectedTower];

    if (mouse.canPlaceTowerHere) {
        addTower(mouse.x, mouse.y);
        game.money -= towerClasses[currentTower].prototype.cost;
    }else if(tower !== null && currentTower === -1) {
        tower.displayInfo();
    }
}

