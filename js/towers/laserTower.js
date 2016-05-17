/**
 * Created by Gaben on 2/04/2016.
 */
function LaserTower(x,y) {
    Tower.call(this,x,y);
    this.changedTarget = true;
}

LaserTower.prototype = Object.create(Tower.prototype);
LaserTower.prototype.image = "laserTower.png";
LaserTower.prototype.range = (game.tileSize * 1.5);
LaserTower.prototype.damage = 50; // damage per second
LaserTower.prototype.cost = Tower.prototype.cost * 3;
LaserTower.prototype.maxUpgradeLevel = 6;
LaserTower.prototype.displayName = "Laser";
LaserTower.prototype.attackType = LaserAttack;

LaserTower.prototype.attack = function() {
    if(this.target !== null && this.changedTarget) {
        attacks.push(new this.attackType(this));
        this.changedTarget = false;
    }
};

/**
 * Aangepaste findTarget code zodat hij op hetzelfde target zou blijven zolang dat target in range is
 */
LaserTower.prototype.findTarget = function(){
    var newTarget = null;

    for (var i = 0; i < attackers.length; i++) {
        var distance = Math.sqrt(Math.pow((attackers[i].locX - this.locX),2) + Math.pow((attackers[i].locY - this.locY), 2));

        if (distance < this.range) {
            newTarget = attackers[i];
            i = attackers.length;
        }
    }

    if(this.target !== null && this.target.health > 0){
        if(distanceToTarget(this.target, this) > this.range && newTarget !== null){
            this.setTarget(newTarget);
        }
        else if(newTarget === null){
            this.target = null;
        }
    }else{
        if(newTarget !== null){
            this.setTarget(newTarget);

        }
    }
};

/**
 * Stelt een target in voor de tower
 */
LaserTower.prototype.setTarget = function(target){
    this.target = target;
    this.changedTarget = true;
    this.oldNow = Date.now();
};