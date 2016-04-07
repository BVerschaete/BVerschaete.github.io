/**
 * Created by Bastien on 16/03/2016.
 */
var attackers = [];

function Attacker(speedFactor, maxHealthFactor){
    this.speed = 50 * (game.tileSize / 40) * speedFactor; // snelheid relatief aan de snelheid bij een tileSize van 40
    this.posX = game.selectedLevel.startX;
    this.posY = game.selectedLevel.startY;
    this.locX = (this.posX * game.tileSize) + game.tileSize/2;
    this.locY = (this.posY * game.tileSize) + game.tileSize/2;
    this.oldNow = Date.now();
    this.maxHealth = 100 * maxHealthFactor;
    this.health = this.maxHealth;
    this.image = "dragon.png";
    this.reward = 10;
}

Attacker.prototype.scale = 0.8;
Attacker.prototype.direction = game.selectedLevel.startDirection;

//beweegt een attacker volgens zijn pad
//voor iedere tile andere changeDirection functionaliteit
Attacker.prototype.changeDirection = function() {
    var board = game.selectedLevel.board;
    var tile = tiles[board[this.posY][this.posX]];
    tile.changeDirection(this);
};

//update zijn positie op het bord
Attacker.prototype.updatePosOnBoard = function(){
    this.posX = Math.floor(this.locX / game.tileSize);
    this.posY = Math.floor(this.locY / game.tileSize);
};

//update zijn werkelijke positie
Attacker.prototype.updatePosition = function(){
    this.updatePosOnBoard(); // dit moet zeker gebeuren !!!!
    var now = Date.now();
    var timeDelta = now - this.oldNow;
    this.oldNow = now;
    var checkTiles;

    if(getValueFromPos(this.locX, this.locY) == null){
        deleteAttacker(this);
        game.attackersScore++;
    } else {
        if (this.direction === directions.boven) {
            checkTiles = [2, 4, 5];
            if (getValueFromPos(this.locX, this.locY + game.tileSize / 2) == getValueFromPos(this.locX, this.locY) && getValueFromPos(this.locX, this.locY + game.tileSize) != getValueFromPos(this.locX, this.locY) && checkTiles.indexOf(getValueFromPos(this.locX, this.locY)) == -1 && getValueFromPos(this.locX, this.locY + game.tileSize) != null) {
                this.changeDirection();
            } else {
                this.locY -= this.speed * timeDelta / 1000;
            }
        } else if (this.direction === directions.rechts) {
            checkTiles = [1, 5, 6];
            if (getValueFromPos(this.locX - game.tileSize / 2, this.locY) == getValueFromPos(this.locX, this.locY) && getValueFromPos(this.locX - game.tileSize, this.locY) != getValueFromPos(this.locX, this.locY) && checkTiles.indexOf(getValueFromPos(this.locX, this.locY)) == -1 && getValueFromPos(this.locX - game.tileSize, this.locY) != null) {
                this.changeDirection();
            } else {
                this.locX += this.speed * timeDelta / 1000;
            }
        } else if (this.direction === directions.onder) {
            checkTiles = [2, 3, 6];
            if (getValueFromPos(this.locX, this.locY - game.tileSize / 2) == getValueFromPos(this.locX, this.locY) && getValueFromPos(this.locX, this.locY - game.tileSize) != getValueFromPos(this.locX, this.locY) && checkTiles.indexOf(getValueFromPos(this.locX, this.locY)) == -1 && getValueFromPos(this.locX, this.locY - game.tileSize) != null) {
                this.changeDirection();
            } else {
                this.locY += this.speed * timeDelta / 1000;
            }
        } else if (this.direction === directions.links) {
            checkTiles = [1, 3, 4];
            if (getValueFromPos(this.locX + game.tileSize / 2, this.locY) == getValueFromPos(this.locX, this.locY) && getValueFromPos(this.locX + game.tileSize, this.locY) != getValueFromPos(this.locX, this.locY) && checkTiles.indexOf(getValueFromPos(this.locX, this.locY)) == -1 && getValueFromPos(this.locX + game.tileSize, this.locY) != null) {
                this.changeDirection();
            } else {
                this.locX -= this.speed * timeDelta / 1000;
            }
        }

    }
};

//tekent zijn afbeelding
Attacker.prototype.drawImage = function(){
    var sprite = new Image();
    sprite.src = "img/attackers/" + this.image;
    game.context.drawImage(sprite, (this.locX - game.tileSize/2 + game.tileSize * (1-this.scale) / 2), (this.locY - game.tileSize/2 + game.tileSize * (1-this.scale) / 2), (game.tileSize * this.scale), (game.tileSize * this.scale));
};

//tekent zijn health bar
Attacker.prototype.drawHealthBar = function(){
    var context = game.context;
    var spriteSize = (game.tileSize * this.scale);
    var barHeight = game.tileSize / 4;
    var verschil = (spriteSize - game.tileSize) / 2; // het verschil van de locatie volgens het programma en de werkelijke locatie

    if(this.health > (50/100)*this.maxHealth) {
        context.fillStyle = '#9fff80';
    } else if (this.health > (25/100)*this.maxHealth){
        context.fillStyle = '#ffff80';
    } else {
        context.fillStyle = '#ff8080';
    }

    // de lengte en hoogt van de healthbar is relatief aan de grootte van de attacker en tilegrootte
    context.fillRect(this.locX - game.tileSize/2 - verschil + spriteSize / 8, this.locY - game.tileSize/2 - verschil - barHeight - spriteSize / 10, ((spriteSize - spriteSize / 4) * this.health / this.maxHealth), barHeight);
};

//tekent een attacker op z'n geheel
function drawAttackers(){
    for(var i = 0; i < attackers.length; i++){
        attackers[i].drawImage();
        attackers[i].drawHealthBar();
    }
}

//voegt een attacker toe aan de array
function addAttacker(attacker){
    attackers.push(attacker);
}

function createAttacker(attackerCode, speedFactor, maxHealthFactor){
    return new attackerTypes[attackerCode](speedFactor, maxHealthFactor);
}

//verwijdert een attacker uit de array
function deleteAttacker(attacker){
    var index = attackers.indexOf(attacker);
    attackers.splice(index, 1);
}

//overloopt iedere gameloop of er attackers gestorven zijn, zoja, update game variabelen
function checkDead(){
    for(var i = 0; i < attackers.length; i++){
        if(attackers[i].health <= 0){
            game.money += attackers[i].reward;
            deleteAttacker(attackers[i]);
            enableUpgradeButton();
            i--;
        }
    }
}