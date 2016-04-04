/**
 * Created by basti on 24/03/2016.
 */
//spawnt X aantal monsters
function Wave(){
    this.attackers = [];
    this.spawnSpeed = 0;
    this.speedFactor = 1;
    this.maxHealthFactor = 1;
}
//kiest adhv de hoeveelste wave het is, welke wave moet gespawned worden
function chooseWave(){
    var aantalMonsters;
    var typeMonster;
    var speedFactor;
    var maxHealthFactor;

    //moeilijkheid per level hier aanpassen
    if(game.currentWave%5 == 0 && game.currentWave != 0){
        aantalMonsters = 4 + game.currentWave/5 * game.selectedLevel.difficulty;
        speedFactor = Math.pow(1.10, game.currentWave/2.5 - 1);
        maxHealthFactor = Math.pow(1.10, game.currentWave/2.5 - 1);

        typeMonster = attackerCodes.speedAttacker;
    } else if(game.currentWave%3 == 0 && game.currentWave != 0){
        aantalMonsters = 4 + game.currentWave/3 * game.selectedLevel.difficulty;
        speedFactor = Math.pow(1.10, game.currentWave/1.5 - 1);
        maxHealthFactor = Math.pow(1.10, game.currentWave/1.5 - 1);

        typeMonster = attackerCodes.tankAttacker;
    } else{
        aantalMonsters = 4 + game.currentWave * game.selectedLevel.difficulty;
        speedFactor = Math.pow(1.10, game.currentWave - 1);
        maxHealthFactor = Math.pow(1.10, game.currentWave - 1);

        typeMonster = attackerCodes.normalAttacker;
    }

    return createWave(aantalMonsters, typeMonster, speedFactor, maxHealthFactor);
}

function createWave(aantalMonsters, typeMonster, speedFactor, maxHealthFactor){
    var wave = new Wave();
    for(var i = 0; i < aantalMonsters; i++){
        wave.attackers.push(typeMonster);
    }
    game.currentWave += 1;
    wave.spawnSpeed = createAttacker(typeMonster, speedFactor, 1).speed;
    wave.speedFactor = speedFactor;
    wave.maxHealthFactor = maxHealthFactor;
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
        var attacker = createAttacker(wave.attackers[0], wave.speedFactor, wave.maxHealthFactor);
        addAttacker(attacker);
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