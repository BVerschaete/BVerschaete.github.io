/**
 * Created by Gaben on 19/03/2016.
 */

/**
 * Constructor voor Bullet object
 * snelheid aanpassen aan het target als het target
 * sneller gaat dan de standaard snelheid
 */
function Bullet(tower) {
    this.locX = tower.locX;
    this.locY = tower.locY;
    this.target = tower.target;
    this.damage = tower.damage;
    this.speed = 0;

    this.setSpeed = function(){
        var standaardAttackerSnelheid = Attacker.prototype.speed;
        if(tower.target.speed > standaardAttackerSnelheid) {
            this.speed = 1.5 * (game.tileSize / 40) * tower.target.speed / standaardAttackerSnelheid;
        } else {
            this.speed = 1.5 * (game.tileSize / 40);
        }
    };

    this.setSpeed();
}

Bullet.prototype.r = game.tileSize / 10;
Bullet.prototype.color = "#FF0000";

/**
 * beweegt bullet naar zijn locX en locY
 */
Bullet.prototype.move = function() {
    //find unit vector
    var xDist = this.target.locX - this.locX;
    var yDist = this.target.locY - this.locY;
    var dist = Math.sqrt(xDist * xDist + yDist * yDist);
    this.locX += this.speed * xDist / dist;
    this.locY += this.speed * yDist / dist;
};

/**
 * tekent bullet
 */
Bullet.prototype.draw = function() {
    var context = game.context;

    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.locX, this.locY, this.r, 0, 2 * Math.PI);
    context.fill();
};

/**
 * checkt wanneer bullet een attacker raakt
 */
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

/**
 * Update functie voor alle soorten attacks die dan gemeenschappelijk kunnen uitgevoerd worden
 */
Bullet.prototype.update = function(){
    this.move();
};