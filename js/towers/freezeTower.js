/**
 * Created by Gaben on 14/04/2016.
 */
function FreezeTower(x, y) {
    Tower.call(this, x, y);
}

FreezeTower.prototype = Object.create(Tower.prototype);
FreezeTower.prototype.image = "freezetower.png";
FreezeTower.prototype.range = (game.tileSize * 2); //100
FreezeTower.prototype.fireRate = Tower.prototype.fireRate * 2;
FreezeTower.prototype.damage = Tower.prototype.damage * 0.5;
FreezeTower.prototype.cost = Tower.prototype.cost * 2;
FreezeTower.prototype.maxUpgradeLevel = 6;
FreezeTower.prototype.displayName = "Freeze Tower";
FreezeTower.prototype.attackType = FreezeBullet;