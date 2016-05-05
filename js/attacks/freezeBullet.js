/**
 * Created by Gaben on 14/04/2016.
 */
function FreezeBullet(tower) {
    Bullet.call(this, tower);
}

FreezeBullet.prototype = Object.create(Bullet.prototype);
FreezeBullet.prototype.condition = FreezeCondition;
FreezeBullet.prototype.color = "#0000FF";

/**
 * Beweegt een bullet en voegt condition toe aan target
 * van de tower die bullet heeft afgevuurt
 */
FreezeBullet.prototype.update = function () {
    this.move();
    if (this.checkCollision()) this.target.addCondition(new this.condition(this.target));
};

