/**
 * Created by Gaben on 2/04/2016.
 */
function LaserAttack(tower){
    this.tower = tower;
    this.target = tower.target;
}

/**
 * attack heeft altijd een draw, checkCollision en update functie
 * dit zijn dan ook de methodes die worden opgeroepen in de gameloop
 * hier is checkCollision altijd true omdat het een continu laser is, bij een schiet laser zou dit anders zijn
 * de laserattack wordt iedere keer verwijdert doordat een tower elke gameloop opnieuw een laserattack pusht wanneer een attacker binnen range is
 */
LaserAttack.prototype.draw = function(){
    var context = game.context;
    context.lineWidth = 5;
    context.strokeStyle = 'red';
    context.beginPath();
    context.moveTo(this.tower.locX, this.tower.locY);
    context.lineTo(this.target.locX, this.target.locY);
    context.stroke();
    context.lineWidth = 0;
};

LaserAttack.prototype.checkCollision = function(){
    //doet hier functie als checkOutOfRange
    return distanceToTarget(this.target, this.tower) > this.tower.range;

};

LaserAttack.prototype.update = function(){
    this.doDamage();
};

LaserAttack.prototype.doDamage = function(){
    var now = Date.now();
    var delta = now - this.tower.oldNow;

    this.target.health -= (delta / 1000) * this.tower.damage;
    this.tower.oldNow = now;
};

function distanceToTarget(target, tower){
    var xDist = target.locX - tower.locX;
    var yDist = target.locY - tower.locY;
    return Math.sqrt(xDist * xDist + yDist * yDist);
}