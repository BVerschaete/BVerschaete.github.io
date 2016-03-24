/**
 * Created by basti on 24/03/2016.
 */
//spawnt X aantal monsters
function spawnWave(){
    event.stopPropagation();
    toggleSpawn();

    var waitTime = 1800 * game.tileSize / (new Attacker()).speedX;
    var aantalMonsters = 5;
    var loop = setInterval(addAttacker,waitTime);

    setTimeout(function(){
        clearInterval(loop);
        toggleSpawn();
        game.waveStarted = true;
    }, aantalMonsters * waitTime);
}

//update de spawnbutton zodat hij gedisabled moet worden of niet
function toggleSpawn(){
    var btnSpawn = $("#btnSpawnWave")[0];
    btnSpawn.disabled = !btnSpawn.disabled;
}