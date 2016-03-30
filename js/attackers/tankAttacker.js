/**
 * Created by basti on 24/03/2016.
 */
function TankAttacker(){
    //Attacker.call(this);
    this.speed= 30 * (game.tileSize / 40); // snelheid relatief aan de snelheid bij een tileSize van 40
    this.posX= game.selectedLevel.startX;
    this.posY= game.selectedLevel.startY;
    this.locX= (this.posX * game.tileSize);
    this.locY= (this.posY * game.tileSize);
    this.oldNow = Date.now();
    this.direction = game.selectedLevel.startDirection;
    this.health = this.maxHealth;
    this.scale = 0.8;
}

TankAttacker.prototype = Object.create(Attacker.prototype);
TankAttacker.prototype.maxHealth = 300;
TankAttacker.prototype.image = "dragonTank.png";
TankAttacker.prototype.reward = 40;