/**
 * Created by Gaben on 2/04/2016.
 */
var laserAttacks = [];

function LaserAttack(tower, target){
    this.tower = tower;
    this.target = target;
}

LaserAttack.prototype.draw = function(){
    var context = game.context;
    context.lineWidth = 5;
    context.fillStyle = 'black';
    console.log(this.tower.locX + " " + this.tower.locY + " " + this.target.locX);
    context.moveTo(this.tower.locX, this.tower.locY);
    context.lineTo(this.target.locX, this.target.locY);
    context.stroke();
};