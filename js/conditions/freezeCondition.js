/**
 * Created by Gaben on 15/04/2016.
 */
function FreezeCondition(attacker) {
    this.startTime = Date.now();
    this.duration = 2000; // 2 seconde
    this.target = attacker;
    this.applyCondition();
}

FreezeCondition.prototype.speedMultiplier = 0.5;

FreezeCondition.prototype.applyCondition = function () {
    this.target.speed *= this.speedMultiplier;
};

FreezeCondition.prototype.checkStop = function () {
    return (Date.now() >= this.startTime + this.duration);
};

FreezeCondition.prototype.stop = function () {
    this.target.speed *= (1 / this.speedMultiplier);
};