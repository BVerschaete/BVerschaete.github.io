/**
 * Created by Gaben on 2/04/2016.
 */
function laserTower(x,y) {
    Tower.call(this,x,y);
}

laserTower.prototype = Object.create(Tower.prototype);
laserTower.prototype.image = "laserTower.png";
laserTower.prototype.range = (game.tileSize * 1.5);
laserTower.prototype.damage = 1;
laserTower.prototype.cost = Tower.prototype.cost * 3;
laserTower.prototype.maxUpgradeLevel = 6;
laserTower.prototype.displayName = "Laser";

laserTower.prototype.attack = function() {
    if(this.target !== null) {
        attacks.push(new LaserAttack(this, this.target));
    }
};

// toevoegen dat hij DPS doet, dus met oldNow enzo... zal voor in attack functie zijn