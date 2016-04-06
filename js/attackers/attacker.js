/**
 * Created by Bastien on 16/03/2016.
 */
var attackers = [];

function Attacker(speedFactor, maxHealthFactor){
    this.speed= 50 * (game.tileSize / 40) * speedFactor; // snelheid relatief aan de snelheid bij een tileSize van 40
    this.posX= game.selectedLevel.startX;
    this.posY= game.selectedLevel.startY;
    this.locX= (this.posX * game.tileSize);
    this.locY= (this.posY * game.tileSize);
    this.oldNow = Date.now();
    this.direction = game.selectedLevel.startDirection;
    this.maxHealth = 100 * maxHealthFactor;
    this.health = this.maxHealth;
    this.scale = 0.8;
}

Attacker.prototype.image = "dragon.png";
Attacker.prototype.reward = 10;
Attacker.prototype.passableTiles = [1, 2, 3, 4, 5, 6];

//beweegt een attacker volgens zijn pad
//voor iedere tile andere move functionaliteit
Attacker.prototype.move = function() {
    var board = game.selectedLevel.board;
    var tile = this.passableTiles.indexOf(board[this.posY][this.posX]);
    if(tile == 0){
        if(this.direction == directions.rechts) {
            this.posX += 1;
            this.direction = directions.rechts;
        } else {
            this.posX -= 1;
            this.direction = directions.links;
        }
    }else if(tile == 1) {
        if (this.direction == directions.boven) {
            this.posY -= 1;
            this.direction = directions.boven;
        } else {
            this.posY += 1;
            this.direction = directions.onder;
        }
    }else if(tile == 2) {
        if (this.direction == directions.boven) {
            this.posX -= 1;
            this.direction = directions.links;
        } else {
            this.posY += 1;
            this.direction = directions.onder;
        }
    } else if(tile == 3) {
        if (this.direction == directions.rechts) {
            this.posY -= 1;
            this.direction = directions.boven;
        } else {
            this.posX -= 1;
            this.direction = directions.links;
        }
    } else if(tile == 4) {
        if (this.direction == directions.onder) {
            this.posX += 1;
            this.direction = directions.rechts;
        } else {
            this.posY -= 1;
            this.direction = directions.boven;
        }
    } else if(tile == 5) {
        if (this.direction == directions.boven) {
            this.posX += 1;
            this.direction = directions.rechts;
        } else {
            this.posY += 1;
            this.direction = directions.onder;
        }
    } else {
        deleteAttacker(this);
        game.attackersScore++;
    }
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

    if(this.direction === directions.boven){
        if(this.locY - (this.speed * timeDelta / 1000) <= (this.posY -1) * game.tileSize) return;
        if((this.locY - (this.speed * timeDelta / 1000) <= (this.posY -1) * game.tileSize && this.passableTiles.indexOf(getValueFromPos(this.locX, this.locY - (this.speed * timeDelta / 1000) )) !== this.passableTiles.indexOf(getValueFromPos(this.locX, this.locY))) || this.passableTiles.indexOf(getValueFromPos(this.locX, this.locY - (this.speed * timeDelta / 1000))) == -1){
            this.locY = (this.posY) * game.tileSize;
            this.locX = Math.floor(this.locX);
            this.updatePosOnBoard();
            this.move();
        }else{
            this.locY -= this.speed * timeDelta / 1000;
        }
    }else if(this.direction === directions.rechts){
        if(this.passableTiles.indexOf(getValueFromPos(this.locX + this.speed * timeDelta / 1000, Math.floor(this.locY))) !== this.passableTiles.indexOf(getValueFromPos(this.locX, this.locY)) || this.passableTiles.indexOf(getValueFromPos(Math.floor(this.locX + this.speed * timeDelta / 1000), Math.floor(this.locY))) == -1){
            this.locX += this.speed * timeDelta / 1000;
            this.locY = Math.floor(this.locY);
            this.updatePosOnBoard();
            this.locX = this.posX * game.tileSize;
            this.move();
        }else{
            this.locX += this.speed * timeDelta / 1000;
        }
    }else if(this.direction === directions.onder){
        if(this.passableTiles.indexOf(getValueFromPos(Math.floor(this.locX), Math.floor(this.locY + this.speed * timeDelta / 1000))) !== this.passableTiles.indexOf(getValueFromPos(this.locX, this.locY)) || this.passableTiles.indexOf(getValueFromPos(Math.floor(this.locX), Math.floor(this.locY + this.speed * timeDelta / 1000))) == -1){
            this.locY += this.speed * timeDelta / 1000;
            this.locX = Math.floor(this.locX);
            this.updatePosOnBoard();
            this.locY = this.posY * game.tileSize;
            this.move();
        }else{
            this.locY += this.speed * timeDelta / 1000;
        }
    }else if(this.direction === directions.links){
        if((this.locX - (this.speed * timeDelta / 1000) <= (this.posX - 1) * game.tileSize && this.passableTiles.indexOf(getValueFromPos(this.locX - (this.speed * timeDelta / 1000) + game.tileSize, this.locY)) !== this.passableTiles.indexOf(getValueFromPos(this.locX, this.locY))) || this.passableTiles.indexOf(getValueFromPos(this.locX - (this.speed * timeDelta / 1000), this.locY)) == -1){
            this.locX = (this.posX) * game.tileSize;
            this.locY = Math.floor(this.locY);
            this.updatePosOnBoard();
            this.move();
        }else{
            this.locX -= this.speed * timeDelta / 1000;
        }
    }
};

//tekent zijn afbeelding
Attacker.prototype.drawImage = function(){
    var sprite = new Image();
    sprite.src = "img/attackers/" + this.image;
    game.context.drawImage(sprite, (this.locX + game.tileSize * (1-this.scale) / 2), (this.locY + game.tileSize * (1-this.scale) / 2), (game.tileSize * this.scale), (game.tileSize * this.scale));
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
    context.fillRect(this.locX - verschil + spriteSize / 8, this.locY - verschil - barHeight - spriteSize / 10, ((spriteSize - spriteSize / 4) * this.health / this.maxHealth), barHeight);
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