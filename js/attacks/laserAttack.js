/**
 * Created by Gaben on 2/04/2016.
 */
function LaserAttack(tower, target){
    this.tower = tower;
    this.target = target;
}

/* ik denk dat het best is als een attack altijd een draw, checkCollision en update functie heeft
    dit zijn dan ook de methodes die worden opgeroepen in de gameloop
    hier is checkCollision altijd true omdat het een continu laser is, bij een schiet laser zou dit anders zijn
    de laserattack wordt iedere keer verwijdert doordat een tower elke gameloop opnieuw een laserattack pusht wanneer een attacker binnen range is
 */

LaserAttack.prototype.draw = function(){
    var context = game.context;
    context.lineWidth = 5;
    context.strokeStyle = 'red';
    context.beginPath();
    context.moveTo(this.tower.locX, this.tower.locY);
    context.lineTo(this.target.locX + game.tileSize / 2, this.target.locY + game.tileSize / 2);
    context.stroke();
    context.lineWidth = 0;
};

LaserAttack.prototype.checkCollision = function(){
    return true;
};

LaserAttack.prototype.update = function(){
    // hier damage doen (of aparte methode)
    this.target.health -= this.tower.damage;
};