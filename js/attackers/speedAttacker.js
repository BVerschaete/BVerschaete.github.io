/**
 * Created by basti on 24/03/2016.
 */
function SpeedAttacker(speedFactor, maxHealthFactor){
    Attacker.call(this, speedFactor, maxHealthFactor);
    this.speed= 90 * (game.tileSize / 40); // snelheid relatief aan de snelheid bij een tileSize van 40
    this.posX= game.selectedLevel.startX;
    this.posY= game.selectedLevel.startY;
    this.locX= (this.posX * game.tileSize);
    this.locY= (this.posY * game.tileSize);
    this.oldNow = Date.now();
    this.direction = game.selectedLevel.startDirection;
    this.maxHealth = 50 * maxHealthFactor;
    this.health = this.maxHealth;
    this.scale = 0.8;
}

SpeedAttacker.prototype = Object.create(Attacker.prototype);
SpeedAttacker.prototype.image = "dragonSpeed.png";
SpeedAttacker.prototype.reward = 20;