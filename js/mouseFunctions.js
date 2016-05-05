/**
 * Created by Gaben on 17/03/2016.
 */

/**
 * zoekt x en y coordinaten van muis op het canvas
 */
function getMousePosition(event) {
    var rect = game.canvas.getBoundingClientRect();

    game.mouse.x = event.clientX - rect.left - parseInt($(game.canvas).css("padding-left"));
    game.mouse.y = event.clientY - rect.top - parseInt($(game.canvas).css("padding-top"));
}

/**
 * tekent 'ghost' tower en als er een tower geselecteerd is om te bouwen
 * verandert de cirkel in het rood als de toren op een plaats komt die niet mag
 */
function drawRadius(){
    var mouse = game.mouse;
    if(mouse.inCanvas) {
        var context = game.context;
        var boardValueLinksBoven = getValueFromPos(mouse.x-(game.tileSize/4), mouse.y-(game.tileSize/4));
        var boardValueRechtsBoven = getValueFromPos(mouse.x+(game.tileSize/4), mouse.y-(game.tileSize/4));
        var boardValueLinksOnder = getValueFromPos(mouse.x-(game.tileSize/4), mouse.y+(game.tileSize/4));
        var boardValueRechtsOnder = getValueFromPos(mouse.x+(game.tileSize/4), mouse.y+(game.tileSize/4));

        var canPlace =( (game.money >= towerTypes[game.currentTower].prototype.cost) &&
                        (boardValueLinksBoven === 0 && boardValueLinksBoven !== null) &&
                        (boardValueRechtsBoven === 0 && boardValueRechtsBoven !== null) &&
                        (boardValueLinksOnder === 0 && boardValueLinksOnder !== null) &&
                        (boardValueRechtsOnder === 0 && boardValueRechtsOnder !== null) &&
                        (towerOnLocationPlace(mouse.x, mouse.y) == -1));

        if(canPlace){
            context.fillStyle = 'yellow';
            mouse.canPlaceTowerHere = true;
        }else{
            context.fillStyle = 'red';
            mouse.canPlaceTowerHere = false;
        }

        function drawCircle() {
            context.beginPath();
            var range = towerTypes[game.currentTower].prototype.range;
            context.arc(mouse.x, mouse.y, range, 0, 2 * Math.PI);
            context.globalAlpha = 0.4;
            context.fill();
            context.globalAlpha = 1;
        }

        function drawTower(){
            var sprite = new Image();
            sprite.src = "img/towers/" + towerTypes[game.currentTower].prototype.image;
            context.globalAlpha = 0.4;
            context.drawImage(sprite, mouse.x - game.tileSize/4, mouse.y - game.tileSize/4, game.tileSize/2, game.tileSize/2);
            context.globalAlpha = 1;
        }
        
        drawCircle();
        drawTower();
    }
}

/**
 * toggled wannner muis in en uit het canvas gaat, nodig om te kijken wanneer er moet getekend worden rond de muis
 */
function toggleMouseInCanvas(){
    var mouse = game.mouse;
    mouse.inCanvas = !mouse.inCanvas;
}

/**
 * plaatst tower bij muisklik
 */
function placeTower(event) {
    event.stopPropagation();
    var mouse = game.mouse;

    if (mouse.canPlaceTowerHere && game.currentTower != -1) {
        addTower(mouse.x, mouse.y);
        game.money -= towerTypes[game.currentTower].prototype.cost;
    }
}

/**
 * toont info als er tower geselecteert wordt, cleart de doorzichtige tower placement als je bezig bent met towers plaatsen d.m.v. currentTower = -1
 */
function displayInfo() {
    event.stopPropagation();
    var mouse = game.mouse;
    var i = towerOnLocationSelect(mouse.x, mouse.y);
    var tower = towers[i];
    var towerInfo = $('#towerInfo');
    if(tower){
        //zorgt ervoor dat de button van de geselecteerde tower wordt uitgeschakeld
        game.currentTower = -1;
        $("input:radio").prop("checked", false);
        game.selectedTower = i;
        displaySelectedTowerInfo();
        towerInfo.css('visibility', 'visible');
    } else {
        game.selectedTower = -1;
        towerInfo.css('visibility', 'hidden');
    }
}

