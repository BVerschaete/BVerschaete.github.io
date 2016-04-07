/**
 * Created by basti on 24/03/2016.
 */
function TankAttacker(speedFactor, maxHealthFactor){
    Attacker.call(this, speedFactor, maxHealthFactor);
    this.speed = 30 * (game.tileSize / 40) * speedFactor; // snelheid relatief aan de snelheid bij een tileSize van 40
    this.maxHealth = 300 * maxHealthFactor;
    this.health = this.maxHealth;
    this.image = "dragonTank.png";
    this.reward = 40;
}

TankAttacker.prototype = Object.create(Attacker.prototype);