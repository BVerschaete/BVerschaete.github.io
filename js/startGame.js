/**
 * Created by Bastien on 3/12/2015.
 */
//basiswaarden om een game te starten
var game = {
    playerName: sessionStorage.playerName,
    selectedLevel: levels[sessionStorage.selectedLevel],
    canvas: null,
    context: null,
    tileSize: 60,
    attackersScore: 0,
    money: 400,
    currentWave: 0,
    timeLastWaveSpawnEnds: null,
    lives: 10
};

function setup() {
    //kijken of speler naam en level ingevoerd heeft
    if(game.playerName != null && game.selectedLevel) {
        addCanvas();
        addTowerButtons();

        $(game.canvas).mouseover(toggleMouseInCanvas);
        $(game.canvas).mouseout(toggleMouseInCanvas);
        $(game.canvas).mousemove(getMousePosition);
        $(game.canvas).click(displayInfo);
        $(game.canvas).click(placeTower);
        $(".towerbutton").click(selectTowerToBuild);
        $("#btnSpawnWave").click(spawnWaveNow);

        var upgradeTower = $("#upgradeTower");
        upgradeTower.click(upgradeSelectedTower);
        upgradeTower.hover(showUpgradeInfo, hideUpgradeInfo);

        $("#sellTower").click(sellSelectedTower);

        //als buiten het canvas geklikt wordt, worden alle selecties en info bladen verwijderd
        $("body").click(function () {
            currentTower = -1;
            selectedTower = -1;
            displayInfo();
        });

        drawMap();

        $('#dimmer').find('> div').click(function(){
            game.timeLastWaveSpawnEnds = Date.now();
            var $dimmer = $('#dimmer');
            $dimmer.hide();
            $dimmer.find('> div').off();
            gameLoop();
        })
    } else {
        window.location.href = "index.html";
        alert("Please select a name and a level before going to the game.html page");
    }
}

function checkGameOver() {
    if (game.attackersScore >= 4) {
        var $dimmer = $('#dimmer');
        var $button = $dimmer.find('>div');
        $button.css("background", "rgba(255, 0, 0, 1");
        $button.text("Game Over");
        $dimmer.show();
        return true;
    }
}

$(window).load(setup);