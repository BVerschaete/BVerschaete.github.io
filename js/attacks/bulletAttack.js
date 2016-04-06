/**
 * Created by Gaben on 19/03/2016.
 */
var standaardAttackerSnelheid = new Attacker(1, 1).speed;

function Bullet(x,y,target,damage) {
    this.locX = x;
    this.locY = y;
    this.target = target;
    this.damage = damage;
    this.speed = 1.5 * (game.tileSize / 40) * target.speed / standaardAttackerSnelheid;
}

Bullet.prototype.r = game.tileSize / 10;

//beweegt bullet naar zijn locX en locY
Bullet.prototype.move = function() {
    //find unit vector
    var xDist = this.target.locX - this.locX; //"+rectWidth/2" because we want bullet to go for center of enemy no top left corner
    var yDist = this.target.locY - this.locY;
    var dist = Math.sqrt(xDist * xDist + yDist * yDist);
    this.locX += this.speed * xDist / dist;
    this.locY += this.speed * yDist / dist;

};

//tekent bullet
Bullet.prototype.draw = function() {
    var context = game.context;

    context.fillStyle = 'red';
    context.beginPath();
    context.arc(this.locX, this.locY, this.r, 0, 2 * Math.PI);
    context.fill();
};

//checkt wanneer bullet een attacker raakt
Bullet.prototype.checkCollision = function() {
    if(this.locX - this.r <= this.target.locX &&
        this.locX + this.r >= this.target.locX &&
        this.locY - this.r <= this.target.locY &&
        this.locY + this.r >= this.target.locY) {

        this.target.health -= this.damage;
        return true;
    }
    return false;
};

Bullet.prototype.update = function(){
    this.move();
};