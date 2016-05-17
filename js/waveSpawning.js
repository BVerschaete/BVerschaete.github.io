/**
 * Created by basti on 24/03/2016.
 */

/**
 * Wave object
 * Uitleg variabelen:
 * attackers: een array die attacker objecten bevat, deze worden uiteindelijk gepusht naar de globale attacker array
 * speedFactor: wordt gebruikt om de attackers sneller te maken naarmate je een hogere wave bereikt
 * maxHealthFactor: laat de attackers meer maximum health hebben naarmate je een hogere wave bereikt
 * timeLastSpawned: het tijdstip waarop de laatste nieuwe attacker gespawnd werd
 * waitTime: de wachttijd tussen elke attacker spawn
 */
function Wave(){
    this.attackers = [];
    this.speedFactor = 1;
    this.maxHealthFactor = 1;
    this.timeLastSpawned = undefined;
    this.waitTime = undefined;
}

/**
 * kiest adhv de hoeveelste wave het is, welke wave moet gespawned worden
 */
function chooseWave(){
    var aantalMonsters;
    var typeMonster;
    var speedFactor;
    var maxHealthFactor;

    //moeilijkheid per level hier aanpassen
    if(game.currentWave%10 == 0 && game.currentWave != 0){
        aantalMonsters = 1;
        speedFactor = 1;
        maxHealthFactor = game.currentWave/10;
        
        typeMonster = attackerCodes.bossAttacker;
    } else if(game.currentWave%5 == 0 && game.currentWave != 0){
        //tankAttackers iedere 5 waves
        aantalMonsters = 4 + game.currentWave/5 * game.selectedLevel.difficulty;
        speedFactor = Math.pow(1.05, game.currentWave/5);
        maxHealthFactor = Math.pow(1.25, game.currentWave/5);

        typeMonster = attackerCodes.tankAttacker;
    } else if(game.currentWave%3 == 0 && game.currentWave != 0){
        //speedAttackers iedere 3 waves
        aantalMonsters = 4 + game.currentWave/3 * game.selectedLevel.difficulty;
        speedFactor = Math.pow(1.10, game.currentWave/3);
        maxHealthFactor = Math.pow(1.07, game.currentWave/3);

        typeMonster = attackerCodes.speedAttacker;
    } else{
        //normalAttackers rest van de waves
        aantalMonsters = 4 + Math.floor(game.currentWave/2) * game.selectedLevel.difficulty;
        speedFactor = Math.pow(1.05, game.currentWave);
        maxHealthFactor = Math.pow(1.07, game.currentWave);

        typeMonster = attackerCodes.normalAttacker;
    }

    //maximaalsnelheid van * 2, voorkomt overdreven snelheid in latere levels
    if(speedFactor >=2){
        speedFactor = 2;
    }

    return createWave(aantalMonsters, typeMonster, speedFactor, maxHealthFactor);
}

/**
 * stelt een wave op met gegeven parameters
 */
function createWave(aantalMonsters, typeMonster, speedFactor, maxHealthFactor){
    var wave = new Wave();
    for(var i = 0; i < aantalMonsters; i++){
        wave.attackers.push(typeMonster);
    }
    game.currentWave += 1;
    wave.waitTime = 1800 * game.tileSize / (attackerTypes[typeMonster].prototype.speed * speedFactor);
    wave.speedFactor = speedFactor;
    wave.maxHealthFactor = maxHealthFactor;
    wave.timeLastSpawned = Date.now();
    
    return wave;
}

/**
 * spawnt een wave als er op de timer wordt geklikt
 */
function spawnWaveNow(event){
    event.stopPropagation();
    spawnWave();
}

/**
 * zet de spawnende wave van de game op een nieuwe wave, speelt het geluid af en toggled de klikbaarheid van de timer
 */
function spawnWave(){
    game.currentWaveSpawning = chooseWave();
    toggleSpawn();

    $('#startWave')[0].play();
}

/**
 * als de verstreken tijd tussen het spawnen van het vorige monster groter is dan de wachttijd tussen attackers en er monsters moeten gespawned worden
 * moeten het volgende monster gespawned worden
 */
function spawnNextMonster(){
    var wave = game.currentWaveSpawning;
    
    if(wave != null){
        game.timeLastWaveSpawnEnds = Date.now();
        if(Date.now() - wave.timeLastSpawned > wave.waitTime){
            wave.timeLastSpawned = Date.now();
            var attacker = createAttacker(wave.attackers[0]);
            attacker.speed *= wave.speedFactor;
            attacker.maxHealth *= wave.maxHealthFactor;
            attacker.health = attacker.maxHealth;
            addAttacker(attacker);
            wave.attackers.splice(0, 1);
        }
        
        if(wave.attackers.length == 0){
            toggleSpawn();
            game.currentWaveSpawning = undefined;
        }
    }
}

/**
 * update de spawnbutton zodat hij gedisabled moet worden of niet
 */
function toggleSpawn(){
    var btnSpawn = $("#btnSpawnWave");
    if(btnSpawn.prop('data-disabled')) {
        btnSpawn.prop('data-disabled', false);
        btnSpawn.css({color: "green", cursor: "pointer"});
        btnSpawn.click(spawnWaveNow);
    } else {
        btnSpawn.prop('data-disabled', true);
        btnSpawn.css({color: "red", cursor: "default"});
        btnSpawn.off();
    }
}