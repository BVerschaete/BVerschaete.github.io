/**
 * Created by Gaben on 15/04/2016.
 */

/**
 * Constructor voor een freezecondition
 */
function FreezeCondition(attacker) {
    this.startTime = Date.now();
    this.duration = 2000; // in milliseconden
    this.target = attacker;
    this.applyCondition();
}

FreezeCondition.prototype.speedMultiplier = 0.5;

/**
 * Voegt condition toe aan target
 */
FreezeCondition.prototype.applyCondition = function () {
    this.target.speed *= this.speedMultiplier;
};

/**
 * Kijkt of de condition moet stopgezet worden
 */
FreezeCondition.prototype.checkStop = function () {
    return (Date.now() >= this.startTime + this.duration);
};

/**
 * Verander de speed van de het target terug naar normaal
 */
FreezeCondition.prototype.stop = function () {
    this.target.speed *= (1 / this.speedMultiplier);
};