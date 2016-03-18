/**
 * Created by Bastien on 16/03/2016.
 */
var attackers = [];

var attacker = {
    speedX: 100,
    speedY: 100,
    image: "Dragon.png",
    posX: startX,
    posY: startY,
    locX: posX * 40,
    locY: posY * 40,
    direction: startDirection
};

function move(attacker) {
    console.log("moved");
    if(attacker.direction != 2 && board[attacker.posY-1] != null && board[attacker.posY-1][attacker.posX] == 1 ){
        attacker.posY -= 1;
        attacker.direction = 0;
        console.log("naar boven");
    }else if(attacker.direction != 3 && board[attacker.posY][attacker.posX+1] == 1 ){
        attacker.posX += 1;
        attacker.direction = 1;
        console.log("naar rechts");
    }else if(attacker.direction != 0 && board[attacker.posY+1] != null && board[attacker.posY+1][attacker.posX] == 1 ){
        attacker.posY += 1;
        attacker.direction = 2;
        console.log("naar beneden");
    }else if(attacker.direction != 1 && board[attacker.posY][attacker.posX-1] == 1 ){
        attacker.posX -= 1;
        attacker.direction = 3;
        console.log("naar links");
    }
};

function updatePosOnBoard(){
    attacker.posX = Math.floor(attacker.locX / 40);
    attacker.posY = Math.floor(attacker.locY / 40);
    console.log("X: " + attacker.posX + " - " + attacker.locX);
    console.log("Y: " + attacker.posY + " - " + attacker.locY);
}

function Attacker(naam){
    this.naam = naam;
    this.life = this.maxLife;
}

Attacker.prototype.maxLife = 5;

function checkDead(){
    for(var i = 0; i < attackers.length; i++){
        if(attackers[i].life <= 0){
            attackers.splice(i, 1);
            i--;
        }
    }
}

function addEnemy(){
    //attackers.push(new Attacker("Bob"));
    attackers.push(attacker);
}

function addAttacker(name){
    attackers.push(new Attacker(name));
}
