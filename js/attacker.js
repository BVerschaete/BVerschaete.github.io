/**
 * Created by Bastien on 16/03/2016.
 */
var attackers = [];

// var attacker = {
//     speedX: 100,
//     speedY: 100,
//     image: "Dragon.png",
//     posX: startX,
//     posY: startY,
//     locX: posX * 40,
//     locY: posY * 40,
//     direction: startDirection
// };

function Attacker(){
    this.speedX= 100,
        this.speedY= 100,
        this.image= "Dragon.png",
        this.posX= startX,
        this.posY= startY,
        this.locX= (posX * 40),
        this.locY= (posY * 40),
        this.oldNow = Date.now(),
        this.direction= startDirection
}

Attacker.prototype.move = function() {
    console.log("moved");

    // board[this.posY-1] != null is nodig want dit zal null zijn als de sprite in de bovenste rij is
    if(this.direction != 2  && board[this.posY-1] != null && board[this.posY-1][this.posX] == 1 ){
        this.posY -= 1;
        this.direction = 0;
        console.log("naar boven");
    }else if(this.direction != 3 && board[this.posY][this.posX+1] == 1 ){
        this.posX += 1;
        this.direction = 1;
        console.log("naar rechts");
    }else if(this.direction != 0 && board[this.posY+1] != null && board[this.posY+1][this.posX] == 1 ){
        this.posY += 1;
        this.direction = 2;
        console.log("naar beneden");
    }else if(this.direction != 1 && board[this.posY][this.posX-1] == 1 ){
        this.posX -= 1;
        this.direction = 3;
        console.log("naar links");
    } else {
        deleteAttacker(this);
    }
};

Attacker.prototype.updatePosOnBoard = function(){
    this.posX = Math.floor(this.locX / 40);
    this.posY = Math.floor(this.locY / 40);
};

Attacker.prototype.updatePosition = function(){
    this.updatePosOnBoard();
    var now = Date.now();
    var timeDelta = now - this.oldNow;
    this.oldNow = now;
    //console.log(this.direction);
    if(this.direction === 0){
        if(getValueFromPos(Math.floor(this.locX), Math.floor(this.locY - (this.speedY * timeDelta / 1000))) !== 1){
            this.move();
            this.locY = this.posY * 40;
            this.locX = Math.floor(this.locX);
        }else{
            this.locY -= this.speedY * timeDelta / 1000;
        }
    }else if(this.direction === 1){
        if(getValueFromPos(Math.floor(this.locX) + 40, Math.floor(this.locY)) !== 1){
            this.move();
            this.locX = this.posX * 40;
            this.locY = Math.floor(this.locY);
        }else{
            this.locX += this.speedX * timeDelta / 1000;
        }
    }else if(this.direction === 2){
        if(getValueFromPos(Math.floor(this.locX), Math.floor(this.locY  + 40)) !== 1){
            this.move();
            this.locY = this.posY * 40;
            this.locX = Math.floor(this.locX);
        }else{
            this.locY += this.speedY * timeDelta / 1000;
        }
    }else if(this.direction === 3){
        if(getValueFromPos(Math.floor(this.locX - (this.speedY * timeDelta / 1000)), Math.floor(this.locY)) !== 1){
            this.move();
            this.locX = this.posX * 40;
            this.locY = Math.floor(this.locY);
        }else{
            this.locX -= this.speedX * timeDelta / 1000;
        }
    }
};

Attacker.prototype.draw = function(){
    var sprite = new Image();
    sprite.src = "img/" + this.image;
    game.context.drawImage(sprite, this.locX, this.locY, 40, 40);
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
        if(attackers[i].life <= 0){
            attackers.splice(i, 1);
            i--;
        }
    }
}

function addAttacker(){
    console.log("spawned");
    attackers.push(new Attacker());
}
