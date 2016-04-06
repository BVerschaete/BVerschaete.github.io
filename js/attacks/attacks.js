/**
 * Created by Gaben on 3/04/2016.
 */
//tekent alle attacks
var attacks = [];

function drawAttacks(){
    for(var i = 0; i < attacks.length; i++){
        attacks[i].draw();
    }
}

function removeAttacks(){
    for(var i = 0; i < attacks.length; i++)
    {
        attacks[i].update();
        if (attacks[i].checkCollision() || attacks[i].target.health <= 0) {
            attacks.splice(i, 1);
            i--;
        }
    }
}