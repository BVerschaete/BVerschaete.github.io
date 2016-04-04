/**
 * Created by Gaben on 2/04/2016.
 */
function LaserTower(x,y) {
    Tower.call(this,x,y);
}

LaserTower.prototype = Object.create(Tower.prototype);
LaserTower.prototype.image = "laserTower.png";
LaserTower.prototype.range = (game.tileSize * 1.5);
LaserTower.prototype.damage = 50; // damage per second
LaserTower.prototype.cost = Tower.prototype.cost * 3;
LaserTower.prototype.maxUpgradeLevel = 6;
LaserTower.prototype.displayName = "Laser";

LaserTower.prototype.attack = function() {
    if(this.target !== null) {
        attacks.push(new LaserAttack(this, this.target));
    }
};

LaserTower.prototype.findTarget = function(){
    var newTarget = null;

    for (var i = 0; i < attackers.length; i++) {
        var distance = (attackers[i].locX - this.locX) * (attackers[i].locX - this.locX + game.tileSize) + (attackers[i].locY - this.locY) * (attackers[i].locY - this.locY + game.tileSize);

        if (distance < this.range * this.range) {
            newTarget = attackers[i];
            i = attackers.length;
        }
    }

    if(this.target !== newTarget && newTarget !== null){
        this.target = newTarget;
        this.oldNow = Date.now();

    }else if(newTarget === null){
        this.target = null;
    }
};