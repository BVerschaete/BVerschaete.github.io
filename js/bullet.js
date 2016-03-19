/**
 * Created by Gaben on 19/03/2016.
 */
var bullets = [];

function Bullet(x,y,target,damage) {
    this.locX = x;
    this.locY = y;
    this.target = target;
    this.damage = damage;
}

Bullet.prototype.r = game.tileWidth / 10;
Bullet.prototype.speed = 2 * (game.tileWidth / 40);

Bullet.prototype.move = function() {
    //find unit vector
    var xDist = this.target.locX + game.tileWidth / 2 - this.locX; //"+rectWidth/2" because we want bullet to go for center of enemy no top left corner
    var yDist = this.target.locY + game.tileWidth / 2 - this.locY;
    var dist = Math.sqrt(xDist * xDist + yDist * yDist);
    this.locX += + this.speed * xDist / dist;
    this.locY += + this.speed * yDist / dist;

};

Bullet.prototype.draw = function() {
    var context = game.context;

    context.fillStyle = 'red';
    context.beginPath();
    context.arc(this.locX, this.locY, this.r, 0, 2 * Math.PI);
    context.fill();
};

Bullet.prototype.checkCollision = function() {
    if(this.locX <= this.target.locX + game.tileWidth * 0.8 &&
        this.locX + this.r >= this.target.locX &&
        this.locY <= this.target.locY + game.tileWidth * 0.8 &&
        this.locY + this.r >= this.target.locY + game.tileWidth * 0.2) {

        this.target.health -= this.damage;
        return true;
    }
    return false;
};

function drawBullets(){
    for(var i = 0; i < bullets.length; i++){
        bullets[i].draw();
    }
}