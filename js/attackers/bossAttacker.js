/**
 * Created by basti on 24/03/2016.
 */
function BossAttacker(){
    Attacker.call(this);
    this.scale = 1.5;
    this.maxHealth = 1000;
    this.health = this.maxHealth;
    this.image = "dragonBoss.png";
    this.reward = 200;
}

BossAttacker.prototype = Object.create(Attacker.prototype);
BossAttacker.prototype.speed = 30 * (game.tileSize / 40);