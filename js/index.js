/**
 * Created by Bastien on 3/12/2015.
 */
var game = {
    playerName: sessionStorage.playerName,
    canvas: null,
    context: null,
    tileSize: 40,
    attackersScore: 0,
    attackersStopped: 0,
    money: 400
};

function setup() {
    //useDisqus();
    console.log(game.playerName);
    addCanvas();
    
    $(game.canvas).mouseover(toggleMouseInCanvas);
    $(game.canvas).mouseout(toggleMouseInCanvas);
    $(game.canvas).mousemove(getMousePosition);
    $(game.canvas).click(placeTower);
    $(".towerbutton").click(selectTower);
    $("#btnSpawnWave").click(spawnWave);

    //cleart het plaatsen van een tower
    $("body").click(function(){
        currentTower = -1;
        selectedTower = -1;
    });
    
    gameLoop();
}


function addCanvas(){
    var board = selectedLevel.board;
    var width = game.tileSize * board[0].length;
    var height =  game.tileSize * board.length;
    $("#container").css({ 'width': width });
    $('<canvas/>').attr({width: width, height: height, id: 'canvas'}).appendTo('#container');

    game.canvas = $("canvas")[0];
    game.context = game.canvas.getContext("2d");
}

function displayMoney(){
    $("#money").text(game.money);
}

function spawnWave(){
    toggleSpawn();

    var waitTime = 1800 * game.tileSize / (new Attacker()).speedX;
    var aantalMonsters = 5;
    var loop = setInterval(addAttacker,waitTime);
    setTimeout(function( ) { clearInterval(loop); toggleSpawn(); }, aantalMonsters * waitTime);
}

function toggleSpawn(){
    var btnSpawn = $("#btnSpawnWave")[0];
    btnSpawn.disabled = !btnSpawn.disabled;
}

function drawMap(){
    game.context.fillStyle = 'white';
    game.context.fillRect(0, 0, $(game.canvas).attr("width"), $(game.canvas).attr("height"));

    var path = new Image();
    path.src = "img/grasstile.png";
    var build = new Image();
    build.src = "img/background.png";
    var water = new Image();
    water.src = "img/watertile.jpg";

    var board = selectedLevel.board;
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++) {
            if(board[i][j] === 0){
                game.context.drawImage(build, j * game.tileSize, i * game.tileSize, game.tileSize, game.tileSize);
            }else if(board[i][j] === 1) {
                game.context.drawImage(path, j * game.tileSize, i * game.tileSize, game.tileSize, game.tileSize);
            }else if(board[i][j] === 2) {
                game.context.drawImage(water, j * game.tileSize, i * game.tileSize, game.tileSize, game.tileSize);
            }
        }
    }
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