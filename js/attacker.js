/**
 * Created by Bastien on 16/03/2016.
 */
var attackers = [];

function Attacker(){
    this.speedX= 30 * (game.tileSize / 40); // snelheid relatief aan de snelheid bij een tileSize van 40
    this.speedY= 30 * (game.tileSize / 40);
    this.image= "dragon.png";
    this.posX= selectedLevel.startX;
    this.posY= selectedLevel.startY;
    this.locX= (this.posX * game.tileSize);
    this.locY= (this.posY * game.tileSize);
    this.oldNow = Date.now();
    this.direction = selectedLevel.startDirection;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.reward = 10;
    this.scale = 0.8;
}

Attacker.prototype.move = function() {
    // board[this.posY-1] != null is nodig want dit zal null zijn als de sprite in de bovenste rij is
    var board = selectedLevel.board;
    if(this.direction != 2  && board[this.posY-1] != null && board[this.posY-1][this.posX] == 1 ){
        this.posY -= 1;
        this.direction = 0;
    }else if(this.direction != 3 && board[this.posY][this.posX+1] == 1 ){
        this.posX += 1;
        this.direction = 1;
    }else if(this.direction != 0 && board[this.posY+1] != null && board[this.posY+1][this.posX] == 1 ){
        this.posY += 1;
        this.direction = 2;
    }else if(this.direction != 1 && board[this.posY][this.posX-1] == 1 ){
        this.posX -= 1;
        this.direction = 3;
    } else {
        deleteAttacker(this);
        game.attackersScore++;
    }
};

Attacker.prototype.updatePosOnBoard = function(){
    this.posX = Math.floor(this.locX / game.tileSize);
    this.posY = Math.floor(this.locY / game.tileSize);
};

Attacker.prototype.updatePosition = function(){
    this.updatePosOnBoard();
    var now = Date.now();
    var timeDelta = now - this.oldNow;
    this.oldNow = now;

    if(this.direction === 0){
        if(getValueFromPos(Math.floor(this.locX), Math.floor(this.locY - (this.speedY * timeDelta / 1000))) !== 1){
            this.move();
            this.locY = this.posY * game.tileSize;
            this.locX = Math.floor(this.locX);
        }else{
            this.locY -= this.speedY * timeDelta / 1000;
        }
    }else if(this.direction === 1){
        if(getValueFromPos(Math.floor(this.locX) + game.tileSize, Math.floor(this.locY)) !== 1){
            this.move();
            this.locX = this.posX * game.tileSize;
            this.locY = Math.floor(this.locY);
        }else{
            this.locX += this.speedX * timeDelta / 1000;
        }
    }else if(this.direction === 2){
        if(getValueFromPos(Math.floor(this.locX), Math.floor(this.locY  + game.tileSize)) !== 1){
            this.move();
            this.locY = this.posY * game.tileSize;
            this.locX = Math.floor(this.locX);
        }else{
            this.locY += this.speedY * timeDelta / 1000;
        }
    }else if(this.direction === 3){
        if(getValueFromPos(Math.floor(this.locX - (this.speedY * timeDelta / 1000)), Math.floor(this.locY)) !== 1){
            this.move();
            this.locX = this.posX * game.tileSize;
            this.locY = Math.floor(this.locY);
        }else{
            this.locX -= this.speedX * timeDelta / 1000;
        }
    }
};

Attacker.prototype.drawImage = function(){
    var sprite = new Image();
    sprite.src = "img/" + this.image;
    game.context.drawImage(sprite, (this.locX + game.tileSize * (1-this.scale) / 2), (this.locY + game.tileSize * (1-this.scale) / 2), (game.tileSize * this.scale), (game.tileSize * this.scale));
};

Attacker.prototype.drawHealthBar = function(){
    var context = game.context;

    if(this.health > (50/100)*this.maxHealth) {
        context.fillStyle = '#9fff80';
    } else if (this.health > (25/100)*this.maxHealth){
        context.fillStyle = '#ffff80';
    } else {
        context.fillStyle = '#ff8080';
    }
    context.fillRect((this.locX + game.tileSize / 8), (this.locY - game.tileSize / 3), ((game.tileSize - game.tileSize / 4) * this.health / this.maxHealth), (game.tileSize / 4));
};

function drawAttackers(){
    for(var i = 0; i < attackers.length; i++){
        attackers[i].drawImage();
        attackers[i].drawHealthBar();
    }
}

function deleteAttacker(attacker){
    var index = attackers.indexOf(attacker);
    attackers.splice(index, 1);
}

function checkDead(){
    for(var i = 0; i < attackers.length; i++){
        if(attackers[i].health <= 0){
            game.money += attackers[i].reward;
            deleteAttacker(attackers[i]);
            enableUpgradeButton();
            game.attackersStopped++;
            i--;
        }
    }
}

function addAttacker(){
    attackers.push(new Attacker());
}

// attackers score of game health of whatever
function displayAttScore(){
    $("#attackersScore").text(game.attackersScore);
}

function displayAttStopped(){
    $("#attackersStopped").text(game.attackersStopped);
}
