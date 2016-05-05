/**
 * Created by basti on 24/03/2016.
 */
function SpeedAttacker(){
    Attacker.call(this);
    this.maxHealth = 125;
    this.health = this.maxHealth;
    this.image = "dragonSpeed.png";
    this.reward = 20;
}

SpeedAttacker.prototype = Object.create(Attacker.prototype);
SpeedAttacker.prototype.speed = 90 * (game.tileSize / 40);