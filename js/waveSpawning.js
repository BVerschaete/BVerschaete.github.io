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
        if(i%3 == 0 && i != 0){
            wave.attackers.push(attackerCodes.strongAttacker);
        } else if (i%5 == 0 && i != 0){
            wave.attackers.push(attackerCodes.speedAttacker);
        } else {
            wave.attackers.push(attackerCodes.normalAttacker);
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
    
    //time between attackers
    var waitTime = 1800 * game.tileSize / (new Attacker().speed);
    
    //time when to stop spawning attackers
    var stopSpawnTime = wave.attackers.length * waitTime;
    
    game.timeLastWaveSpawnEnds = Date.now() + stopSpawnTime;

    //pushes every attacker from wave to real attackers
    var loop = setInterval(function(){
        addAttacker(wave.attackers[0]);
        wave.attackers.splice(0, 1);
    },waitTime);

    //stops the spawning after all attackers are removed from wave
    setTimeout(function(){
        clearInterval(loop);
        toggleSpawn();
    }, stopSpawnTime);
}

//update de spawnbutton zodat hij gedisabled moet worden of niet
function toggleSpawn(){
    var btnSpawn = $("#btnSpawnWave")[0];
    btnSpawn.disabled = !btnSpawn.disabled;
}