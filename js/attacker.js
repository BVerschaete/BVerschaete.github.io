/**
 * Created by Bastien on 16/03/2016.
 */
var attackers = [];

function Attacker(naam){
    this.naam = naam;
    this.life = this.maxLife;
}

Attacker.prototype.maxLife = 5;

function checkDead(){
    for(var i = 0; i < attackers.length; i++){
        if(attackers[i].life <= 0){
            attackers.splice(i, 1);
            i--;
        }
    }
}

function addAttacker(name){
    attackers.push(new Attacker(name));
}