/**
 * Created by basti on 24/03/2016.
 */
function TankAttacker(){
    Attacker.call(this);
    this.speed = 30 * (game.tileSize / 40);
    this.maxHealth = 300;
    this.health = this.maxHealth;
    this.image = "dragonTank.png";
    this.reward = 40;
}

TankAttacker.prototype = Object.create(Attacker.prototype);