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
FreezeTower.prototype.damage = 0;
FreezeTower.prototype.cost = Tower.prototype.cost * 2;
FreezeTower.prototype.maxUpgradeLevel = 1;
FreezeTower.prototype.displayName = "Freeze Tower";
FreezeTower.prototype.attackType = FreezeBullet;

FreezeTower.prototype.findTarget = function(){
    this.target = null;

    for (var i = 0; i < attackers.length; i++) {
        var distance = Math.sqrt(Math.pow((attackers[i].locX - this.locX),2) + Math.pow((attackers[i].locY - this.locY), 2));

        if (distance < this.range && !attackers[i].hasCondition(this.attackType.prototype.condition)) {
            this.target = attackers[i];
            return;
        }
    }
};