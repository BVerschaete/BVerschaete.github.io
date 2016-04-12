/**
 * Created by basti on 24/03/2016.
 */
//spawnt X aantal monsters
function Wave(){
    this.attackers = [];
    this.spawnSpeed = 0;
    this.speedFactor = 1;
    this.maxHealthFactor = 1;
    this.loop = undefined;
    this.timer = undefined;
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
    wave.speedFactor = speedFactor;
    wave.maxHealthFactor = maxHealthFactor;
    return wave;
}

function spawnWaveNow(event){
    event.stopPropagation();
    spawnWave();
}

function spawnWave(){
    currentWaveSpawning = chooseWave();
    toggleSpawn();
    
    //time between attackers
    var waitTime = 1800 * game.tileSize / currentWaveSpawning.spawnSpeed;
    
    //time when to stop spawning attackers
    var stopSpawnTime = currentWaveSpawning.attackers.length * waitTime;
    
    game.timeLastWaveSpawnEnds = Date.now() + stopSpawnTime;

    //pushes every attacker from wave to real attackers
    currentWaveSpawning.loop = new IntervalTimer(function(){
        var attacker = createAttacker(currentWaveSpawning.attackers[0], currentWaveSpawning.speedFactor, currentWaveSpawning.maxHealthFactor);
        addAttacker(attacker);
        currentWaveSpawning.attackers.splice(0, 1);
    }, waitTime);

    $('#startWave')[0].play();

    //stops the spawning after all attackers are removed from wave
    currentWaveSpawning.timer = new Timer(function(){
        currentWaveSpawning.loop.stop();
        toggleSpawn();
        currentWaveSpawning = null;
    }, stopSpawnTime);
}

//hulpfunctie voor het spawnen van attackers na een pause
function IntervalTimer(callback, interval) {
    var timerId, startTime, remaining = 0;
    var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

    this.pause = function () {
        if (state != 1) return;

        remaining = interval - (Date.now() - startTime);
        clearInterval(timerId);
        state = 2;
    };

    this.resume = function () {
        if (state != 2) return;

        state = 3;
        setTimeout(this.timeoutCallback, remaining);
    };

    this.timeoutCallback = function () {
        if (state != 3) return;

        callback();

        startTime = Date.now();
        timerId = setInterval(callback, interval);
        state = 1;
    };

    this.stop = function(){
        clearInterval(timerId);
    };

    startTime = new Date();
    timerId = setInterval(callback, interval);
    state = 1;
}

//hulpfunctie voor het stoppen van spawnen van attackers na een pause
function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= Date.now() - start;
    };

    this.resume = function() {
        start = Date.now();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}


//update de spawnbutton zodat hij gedisabled moet worden of niet
function toggleSpawn(){
    var btnSpawn = $("#btnSpawnWave")[0];
    btnSpawn.disabled = !btnSpawn.disabled;
}