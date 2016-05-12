/**
 * Created by Gaben on 3/04/2016.
 */
//tekent alle attacks
var attacks = [];

//tekent alle attacks in de array
function drawAttacks(){
    for(var i = 0; i < attacks.length; i++){
        attacks[i].draw();
    }
}

function updateAttacks(){
    for(var i = 0; i < attacks.length; i++){
        attacks[i].update();
    }
    
    //Kijkt of er attacks een attacker geraakt hebben
    removeAttacks();
}

//verwijdert een attack als hij botst met een attacker of attacker dood is
function removeAttacks(){
    for(var i = 0; i < attacks.length; i++)
    {
        if (attacks[i].checkCollision() || attacks[i].target.health <= 0) {
            attacks.splice(i, 1);
            i--;
        }
    }
}