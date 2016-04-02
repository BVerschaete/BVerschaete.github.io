/**
 * Created by Gaben on 2/04/2016.
 */
function laserTower(x,y) {
    Tower.call(this,x,y);
}

laserTower.prototype = Object.create(Tower.prototype);
laserTower.prototype.image = "laserTower.png";
laserTower.prototype.range = (game.tileSize * 1.5);
laserTower.prototype.damage = Tower.prototype.damage * 0.2;
laserTower.prototype.cost = Tower.prototype.cost * 3;
laserTower.prototype.maxUpgradeLevel = 6;
laserTower.prototype.displayName = "Laser";

laserTower.prototype.attack = function() {
    console.log(1 + 1);
};