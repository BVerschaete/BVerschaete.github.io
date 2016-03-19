/**
 * Created by Bastien on 16/03/2016.
 */
var attackers = [];

function Attacker(){
    this.speedX= 100;
    this.speedY= 100;
    this.image= "dragon.png";
    this.posX= startX;
    this.posY= startY;
    this.locX= (this.posX * game.tileWidth);
    this.locY= (this.posY * game.tileHeight);
    this.oldNow = Date.now();
    this.direction = startDirection;
    this.health = 10;
}

Attacker.prototype.move = function() {
    // board[this.posY-1] != null is nodig want dit zal null zijn als de sprite in de bovenste rij is
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
        game.attackersScore += 1;
        displayAttScore();
    }
};

Attacker.prototype.updatePosOnBoard = function(){
    this.posX = Math.floor(this.locX / game.tileWidth);
    this.posY = Math.floor(this.locY / game.tileHeight);
};

Attacker.prototype.updatePosition = function(){
    this.updatePosOnBoard();
    var now = Date.now();
    var timeDelta = now - this.oldNow;
    this.oldNow = now;

    if(this.direction === 0){
        if(getValueFromPos(Math.floor(this.locX), Math.floor(this.locY - (this.speedY * timeDelta / 1000))) !== 1){
            this.move();
            this.locY = this.posY * game.tileHeight;
            this.locX = Math.floor(this.locX);
        }else{
            this.locY -= this.speedY * timeDelta / 1000;
        }
    }else if(this.direction === 1){
        if(getValueFromPos(Math.floor(this.locX) + game.tileWidth, Math.floor(this.locY)) !== 1){
            this.move();
            this.locX = this.posX * game.tileWidth;
            this.locY = Math.floor(this.locY);
        }else{
            this.locX += this.speedX * timeDelta / 1000;
        }
    }else if(this.direction === 2){
        if(getValueFromPos(Math.floor(this.locX), Math.floor(this.locY  + game.tileHeight)) !== 1){
            this.move();
            this.locY = this.posY * game.tileHeight;
            this.locX = Math.floor(this.locX);
        }else{
            this.locY += this.speedY * timeDelta / 1000;
        }
    }else if(this.direction === 3){
        if(getValueFromPos(Math.floor(this.locX - (this.speedY * timeDelta / 1000)), Math.floor(this.locY)) !== 1){
            this.move();
            this.locX = this.posX * game.tileWidth;
            this.locY = Math.floor(this.locY);
        }else{
            this.locX -= this.speedX * timeDelta / 1000;
        }
    }
};

Attacker.prototype.draw = function(){
    var sprite = new Image();
    sprite.src = "img/" + this.image;
    game.context.drawImage(sprite, this.locX, this.locY, game.tileWidth, game.tileHeight);
};

function drawAttackers(){
    for(var i = 0; i < attackers.length; i++){
        attackers[i].draw();
    }
}

function deleteAttacker(attacker){
    var index = attackers.indexOf(attacker);
    attackers.splice(index, 1);
}

//nog niet in gebruik
function checkDead(){
    for(var i = 0; i < attackers.length; i++){
        if(attackers[i].health <= 0){
            attackers.splice(i, 1);
            i--;
        }
    }
}

function addAttacker(){
    console.log("spawned");
    attackers.push(new Attacker());
}
