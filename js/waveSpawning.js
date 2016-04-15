/**
 * Created by basti on 24/03/2016.
 */
//spawnt X aantal monsters
function Wave(){
    this.attackers = [];
    this.spawnSpeed = 0;
    this.speedFactor = 1;
    this.maxHealthFactor = 1;
    this.timeLastSpawned = undefined;
    this.waitTime = undefined;
}

var currentWaveSpawning = null;

//kiest adhv de hoeveelste wave het is, welke wave moet gespawned worden
function chooseWave(){
    var aantalMonsters;
    var typeMonster;
    var speedFactor;
    var maxHealthFactor;

    //moeilijkheid per level hier aanpassen
    if(game.currentWave%5 == 0 && game.currentWave != 0){
        //tankAttackers iedere 5 waves
        aantalMonsters = 4 + game.currentWave/5 * game.selectedLevel.difficulty;
        speedFactor = Math.pow(1.05, game.currentWave/5);
        maxHealthFactor = Math.pow(1.25, game.currentWave/5);

        typeMonster = attackerCodes.tankAttacker;
    } else if(game.currentWave%3 == 0 && game.currentWave != 0){
        //speedAttackers iedere 3 waves
        aantalMonsters = 4 + game.currentWave/3 * game.selectedLevel.difficulty;
        speedFactor = Math.pow(1.10, game.currentWave/3);
        maxHealthFactor = Math.pow(1.05, game.currentWave/3);

        typeMonster = attackerCodes.speedAttacker;
    } else{
        //normalAttackers rest van de waves
        aantalMonsters = 4 + Math.floor(game.currentWave/2) * game.selectedLevel.difficulty;
        speedFactor = Math.pow(1.05, game.currentWave);
        maxHealthFactor = Math.pow(1.05, game.currentWave);

        typeMonster = attackerCodes.normalAttacker;
    }
    
    speedFactor *= game.selectedLevel.difficulty;
    maxHealthFactor *= game.selectedLevel.difficulty;

    return createWave(aantalMonsters, typeMonster, speedFactor, maxHealthFactor);
}

//stelt een wave op met gegeven parameters
function createWave(aantalMonsters, typeMonster, speedFactor, maxHealthFactor){
    var wave = new Wave();
    for(var i = 0; i < aantalMonsters; i++){
        wave.attackers.push(typeMonster);
    }
    game.currentWave += 1;
    wave.spawnSpeed = createAttacker(typeMonster, speedFactor, 1).speed;
    wave.waitTime = 1800 * game.tileSize / wave.spawnSpeed;
    wave.speedFactor = speedFactor;
    wave.maxHealthFactor = maxHealthFactor;
    wave.timeLastSpawned = Date.now();
    return wave;
}

function spawnWaveNow(event){
    event.stopPropagation();
    spawnWave();
}

function spawnWave(){
    currentWaveSpawning = chooseWave();
    toggleSpawn();
    
    $('#startWave')[0].play();
}

function spawnNextMonster(){
    if(currentWaveSpawning != null){
        game.timeLastWaveSpawnEnds = Date.now();
        if(Date.now() - currentWaveSpawning.timeLastSpawned > currentWaveSpawning.waitTime){
            currentWaveSpawning.timeLastSpawned = Date.now();
            var attacker = createAttacker(currentWaveSpawning.attackers[0]);
            attacker.speed *= currentWaveSpawning.speedFactor;
            attacker.maxHealth *= currentWaveSpawning.maxHealthFactor;
            addAttacker(attacker);
            currentWaveSpawning.attackers.splice(0, 1);
        }
        
        if(currentWaveSpawning.attackers.length == 0){
            toggleSpawn();
            currentWaveSpawning = null;
        }
    }
}

//update de spawnbutton zodat hij gedisabled moet worden of niet
function toggleSpawn(){
    var btnSpawn = $("#btnSpawnWave")[0];
    btnSpawn.disabled = !btnSpawn.disabled;
}