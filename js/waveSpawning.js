/**
 * Created by basti on 24/03/2016.
 */
//spawnt X aantal monsters
function Wave(){
    this.attackers = [];
}

function createWave(){
    var aantalMonsters = 4 + game.currentWave * selectedLevel.difficulty;
    var wave = new Wave();
    for(var i = 0; i < aantalMonsters; i++){
        if(i == aantalMonsters - 1){
            wave.attackers.push(1);
        } else if (i == aantalMonsters-2){
            wave.attackers.push(2);
        } else {
            wave.attackers.push(0);
        }
    }
    game.currentWave += 1;
    return wave;
}

function spawnWaveNow(){
    event.stopPropagation();
    spawnWave();
}

function spawnWave(){
    var wave = createWave();
    toggleSpawn();
    game.timeLastWaveSpawned = Date.now();

    var waitTime = 1800 * game.tileSize / (new Attacker().speed);

    //pushes every attacker from wave to real attackers
    var loop = setInterval(function(){
        addAttacker(wave.attackers[0]);
        wave.attackers.splice(0, 1);
    },waitTime);

    //stops the spawning after all attackers are removed from wave
    setTimeout(function(){
        clearInterval(loop);
        toggleSpawn();
    }, wave.attackers.length * waitTime);
}

//update de spawnbutton zodat hij gedisabled moet worden of niet
function toggleSpawn(){
    var btnSpawn = $("#btnSpawnWave")[0];
    btnSpawn.disabled = !btnSpawn.disabled;
}