/**
 * Created by basti on 24/03/2016.
 */
function Tower2(x,y) {
    Tower.call(this,x,y);
}

Tower2.prototype = Object.create(Tower.prototype);
Tower2.prototype.image = "tower2.png";
Tower2.prototype.range = (game.tileSize*2.5); //100
Tower2.prototype.fireRate = Tower.prototype.fireRate * 2;
Tower2.prototype.damage = Tower.prototype.damage * 2;
Tower2.prototype.cost = Tower.prototype.cost * 1.2;
Tower2.prototype.maxUpgradeLevel = 6;
Tower.prototype.displayName = "Tower Tier 2";