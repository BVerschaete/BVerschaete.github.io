/**
 * Created by basti on 24/03/2016.
 */
//spawnt X aantal monsters
function Wave(){
    this.attackers = [];
    this.spawnSpeed = 0;
}
//kiest adhv de hoeveelste wave het is, welke wave moet gespawned worden
function chooseWave(){
    if(game.currentWave%5 == 0 && game.currentWave != 0){
        return createSpeedWave();
    } else if(game.currentWave%3 == 0 && game.currentWave != 0){
        return createTankWave();
    } else{
        return createNormalWave();
    }
}

function createNormalWave(){
    var aantalMonsters = 4 + game.currentWave * game.selectedLevel.difficulty;
    var wave = new Wave();
    for(var i = 0; i < aantalMonsters; i++){
        wave.attackers.push(attackerCodes.normalAttacker);
    }
    game.currentWave += 1;
    wave.spawnSpeed = new Attacker().speed;
    return wave;
}

function createTankWave(){
    var aantalMonsters = 4 + Math.floor(game.currentWave/3) * game.selectedLevel.difficulty;
    var wave = new Wave();
    for(var i = 0; i < aantalMonsters; i++){
        wave.attackers.push(attackerCodes.strongAttacker);
    }
    game.currentWave += 1;
    wave.spawnSpeed = new TankAttacker().speed;
    return wave;
}

function createSpeedWave(){
    var aantalMonsters = 4 + Math.floor(game.currentWave/3) * game.selectedLevel.difficulty;
    var wave = new Wave();
    for(var i = 0; i < aantalMonsters; i++){
        wave.attackers.push(attackerCodes.speedAttacker);
    }
    game.currentWave += 1;
    wave.spawnSpeed = new SpeedAttacker().speed;
    return wave;
}

function spawnWaveNow(event){
    event.stopPropagation();
    spawnWave();
}

function spawnWave(){
    var wave = chooseWave();
    toggleSpawn();
    
    //time between attackers
    var waitTime = 1800 * game.tileSize / wave.spawnSpeed;
    
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