/**
 * Created by basti on 24/03/2016.
 */
function SpeedAttacker(){
    Attacker.call(this);
    this.speed= 90 * (game.tileSize / 40); // snelheid relatief aan de snelheid bij een tileSize van 40
    this.posX= selectedLevel.startX;
    this.posY= selectedLevel.startY;
    this.locX= (this.posX * game.tileSize);
    this.locY= (this.posY * game.tileSize);
    this.oldNow = Date.now();
    this.direction = selectedLevel.startDirection;
    this.health = this.maxHealth;
    this.scale = 0.8;
}

SpeedAttacker.prototype = Object.create(Attacker.prototype);
SpeedAttacker.prototype.maxHealth = 50;
SpeedAttacker.prototype.image = "dragonSpeed.png";
SpeedAttacker.prototype.reward = 20;