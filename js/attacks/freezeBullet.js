/**
 * Created by Gaben on 14/04/2016.
 */
function FreezeBullet(tower) {
    Bullet.call(this, tower);
}

FreezeBullet.prototype = Object.create(Bullet.prototype);
FreezeBullet.prototype.color = "#0000FF";

FreezeBullet.prototype.update = function () {
    this.move();
    if (this.checkCollision()) this.target.addCondition(new FreezeCondition(this.target));
};

