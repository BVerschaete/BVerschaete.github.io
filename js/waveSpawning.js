/**
 * Created by basti on 24/03/2016.
 */
//spawnt X aantal monsters
var wave = {
    waveLvl: 1,
    attackers: []
};

function createWave(){
    var aantalMonsters = 4 + wave.waveLvl * selectedLevel.difficulty;
    console.log(aantalMonsters);
    for(var i = 0; i < aantalMonsters; i++){
        if(i == aantalMonsters - 1){
            wave.attackers.push(1);
        } else if (i == aantalMonsters-2){
            wave.attackers.push(2);
        } else {
            wave.attackers.push(0);
        }
    }
}

function spawnWave(){
    event.stopPropagation();
    toggleSpawn();
    createWave();

    var waitTime = 1800 * game.tileSize / (new Attacker().speed);
    var loop = setInterval(createAttacker,waitTime);
    setTimeout(function(){
        clearInterval(loop);
        toggleSpawn();
        game.waveStarted = true;
    }, wave.attackers.length * waitTime);
    wave.waveLvl += 1;
}

function createAttacker(){
    addAttacker(wave.attackers[0]);
    wave.attackers.splice(0, 1);
}

//update de spawnbutton zodat hij gedisabled moet worden of niet
function toggleSpawn(){
    var btnSpawn = $("#btnSpawnWave")[0];
    btnSpawn.disabled = !btnSpawn.disabled;
}