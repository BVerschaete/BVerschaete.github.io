/**
 * Created by basti on 24/03/2016.
 */
function Tower2(x,y) {
    Tower.call(this,x,y);
    this.image = "tower2.png";
    this.range = (game.tileSize*2.5); //100
    this.fireRate = Tower.prototype.fireRate * 2;
    this.damage = Tower.prototype.damage * 2;
    this.cost = Tower.prototype.cost * 1.2;
    this.maxUpgradeLevel = 6;
    this.displayName = "Tower Tier 2";
}

Tower2.prototype = Object.create(Tower.prototype);