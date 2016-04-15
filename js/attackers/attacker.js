/**
 * Created by Bastien on 16/03/2016.
 */
var attackers = [];

function Attacker(){
    this.speed = 50 * (game.tileSize / 40); // snelheid relatief aan de snelheid bij een tileSize van 40
    this.posX = game.selectedLevel.startX;
    this.posY = game.selectedLevel.startY;
    this.locX = (this.posX * game.tileSize) + game.tileSize/2;
    this.locY = (this.posY * game.tileSize) + game.tileSize/2;
    this.oldNow = Date.now();
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.image = "dragon.png";
    this.reward = 10;
    this.scale = 0.8;
    this.direction = game.selectedLevel.startDirection;
    this.hasChangedDirection = false;
    this.conditions = [];
}

//beweegt een attacker volgens zijn pad
//verandert zijn direction via de huidige tile
Attacker.prototype.changeDirection = function() {
    var board = game.selectedLevel.board;
    var tile = tiles[board[this.posY][this.posX]];
    this.hasChangedDirection = true;
    tile.changeDirection(this);
};

//update zijn positie op het bord (in de 'array')
Attacker.prototype.updatePosOnBoard = function(){
    var newPosX = Math.floor(this.locX / game.tileSize);
    var newPosY = Math.floor(this.locY / game.tileSize);
    if(newPosX != this.posX || newPosY != this.posY){
        this.hasChangedDirection = false;
        this.posX = newPosX;
        this.posY = newPosY;
    }
};

//update zijn werkelijke positie en kijkt wanneer hij moet veranderen van richting
Attacker.prototype.updatePosition = function(){
    this.updatePosOnBoard(); // dit moet zeker gebeuren !!!!
    var now = Date.now();
    var timeDelta = now - this.oldNow;
    this.oldNow = now;

    var speed = this.speed * timeDelta / 1000;

    if(getValueFromPos(this.locX, this.locY) == null || getValueFromPos(this.locX, this.locY) == 0){
        deleteAttacker(this);
        game.attackersScore++;
    } else {
        if(isInMiddleOfSquare(this)) {
            if(!this.hasChangedDirection) {
                this.changeDirection();
            }
        }
        this.move(speed);
    }
};

Attacker.prototype.move = function(speed){
    if (this.direction === directions.up) {
        this.locY -= speed;
    } else if (this.direction === directions.right) {
        this.locX += speed;
    } else if (this.direction === directions.down) {
        this.locY += speed;
    } else if (this.direction === directions.left) {
        this.locX -= speed;
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

Attacker.prototype.addCondition = function (condition) {
    for (var i = 0; i < this.conditions.length; i++) {
        if (this.conditions[i].constructor.name == condition.constructor.name) {
            this.conditions[i].stop();
            this.conditions.splice(i, 1);
            i--;
        }
    }
    this.conditions.push(condition);
};

Attacker.prototype.updateConditions = function () {
    for (var i = 0; i < this.conditions.length; i++) {
        if (this.conditions[i].checkStop()) {
            this.conditions[i].stop();
            this.conditions.splice(i, 1);
            i--;
        }
    }
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

//maakt een nieuw attacker object aan met gegeven parameters
function createAttacker(attackerCode){
    return new attackerTypes[attackerCode]();
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