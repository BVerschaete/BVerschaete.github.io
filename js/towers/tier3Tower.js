/**
 * Created by basti on 24/03/2016.
 */
function Tower3(x,y) {
    Tower.call(this,x,y);
}

Tower3.prototype = Object.create(Tower.prototype);
Tower3.prototype.image = "tower3.png";
Tower3.prototype.range = (game.tileSize*3.125); //125
Tower3.prototype.fireRate = Tower.prototype.fireRate * 0.8;
Tower3.prototype.damage = Tower.prototype.damage * 3;
Tower3.prototype.cost = Tower.prototype.cost * 3.5;
Tower3.prototype.maxUpgradeLevel = 7;
Tower3.prototype.displayName = "Tower Tier 3"; 