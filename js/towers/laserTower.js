/**
 * Created by Gaben on 2/04/2016.
 */
function LaserTower(x,y) {
    Tower.call(this,x,y);
}

LaserTower.prototype = Object.create(Tower.prototype);
LaserTower.prototype.image = "laserTower.png";
LaserTower.prototype.range = (game.tileSize * 1.5);
LaserTower.prototype.damage = 1;
LaserTower.prototype.cost = Tower.prototype.cost * 3;
LaserTower.prototype.maxUpgradeLevel = 6;
LaserTower.prototype.displayName = "Laser";

LaserTower.prototype.attack = function() {
    var self = this;
    if(self.target !== null) {
        attacks.push(new LaserAttack(this, self.target));
    }
};

// toevoegen dat hij DPS doet, dus met oldNow enzo... zal voor in attack functie zijn