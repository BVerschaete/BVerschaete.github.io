/**
 * Created by basti on 24/03/2016.
 */
function Tower3(x,y) {
    Tower.call(this,x,y);
    this.image = "tower3.png";
    this.range = (game.tileSize*3.125); //125
    this.fireRate = Tower.prototype.fireRate * 3;
    this.damage = Tower.prototype.damage * 3;
    this.cost = Tower.prototype.cost * 1.4;
    this.maxUpgradeLevel = 7;
    this.displayName = "Tower Tier 3";
}

Tower3.prototype = Object.create(Tower.prototype);