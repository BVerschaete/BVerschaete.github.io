/**
 * Created by Bastien on 3/12/2015.
 */
//basiswaarden om een game te starten
var game = {
    playerName: sessionStorage.playerName,
    canvas: null,
    context: null,
    tileSize: 50,
    attackersScore: 0,
    attackersStopped: 0,
    money: 400,
    waveStarted: false
};

function setup() {
    //kijken of speler naam en level ingevoerd heeft
    if(game.playerName && selectedLevel) {
//useDisqus();

        addCanvas();

        $(game.canvas).mouseover(toggleMouseInCanvas);
        $(game.canvas).mouseout(toggleMouseInCanvas);
        $(game.canvas).mousemove(getMousePosition);
        $(game.canvas).click(displayInfo);
        $(game.canvas).click(placeTower);
        $(".towerbutton").click(selectTowerToBuild);
        $("#btnSpawnWave").click(spawnWave);
        var upgradeTower = $("#upgradeTower");
        upgradeTower.click(upgradeSelectedTower);
        upgradeTower.hover(showUpgradeInfo, hideUpgradeInfo);
        

        //clear placing and selecting tower, displayInfo here makes sure the towerInfo div isn't shown
        $("body").click(function () {
            currentTower = -1;
            selectedTower = -1;
            displayInfo();
        });

        gameLoop();
    } else {
        window.location.href = "index.html";
        window.alert("Please select a name and a level before going to the game.html page");
    }

    jQuery.get('./test leaderboard.txt', function(data) {
        alert(data);
    });
}

//alles voor disqus staat hier
var disqus_config = function () {
    this.page.url = "http://bverschaete.github.io/";  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = ""; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

function useDisqus() {  // REQUIRED CONFIGURATION VARIABLE: EDIT THE SHORTNAME BELOW
    var d = document, s = d.createElement('script');

    s.src = '//webdesigngame.disqus.com/embed.js';  // IMPORTANT: Replace EXAMPLE with your forum shortname!

    s.setAttribute('data-timestamp', + new Date());
    (d.head || d.body).appendChild(s);
}

$(window).load(setup);