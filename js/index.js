/**
 * Created by Bastien on 3/12/2015.
 */
var game = {};

function setup() {
    //useDisqus();
    
    game = {
        canvas: null,
        context: null,
        tileWidth: 40,
        tileHeight: 40,
        canvasWidth: 0,
        canvasHeight: 0
    };

    addCanvas();
    
    game.canvas.addEventListener('mouseover', toggleMouseInCanvas, false);
    game.canvas.addEventListener('mouseout', toggleMouseInCanvas, false);
    game.canvas.addEventListener('mousemove', getMousePosition, false);
    game.canvas.addEventListener('mousedown', placeTower, false);
    $(".towerbutton").click(selectTower);
    document.getElementById("btnSpawnWave").addEventListener("click", spawnWave);

    gameLoop();
}

function spawnWave(){
    var waitTime = 1000;
    var loop = setInterval(addAttacker,waitTime);
    var aantalMonsters = 5;
    setTimeout(function( ) { clearInterval(loop); }, aantalMonsters * waitTime);
}

function addCanvas(){
    var width = game.tileWidth * board[0].length;
    var height =  game.tileHeight * board.length;
    $("#container").css({ 'width': width });
    var canvas = $('<canvas/>').attr({width: width, height: height, id: 'canvas'}).appendTo('#container');

    game.canvas = document.getElementById("canvas");
    game.context = game.canvas.getContext("2d");
    game.canvasWidth = $(game.canvas).width();
    game.canvasHeight = $(game.canvas).height();
}

function drawMap(){
    game.context.fillStyle = 'white';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    var path = new Image();
    path.src = "img/grasstile.png";
    var build = new Image();
    build.src = "img/background.png";
    var water = new Image();
    water.src = "img/watertile.jpg";

    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++) {
            if(board[i][j] === 0){
                game.context.drawImage(build, j * game.tileWidth, i * game.tileHeight, game.tileWidth, game.tileHeight);
            }else if(board[i][j] === 1) {
                game.context.drawImage(path, j * game.tileWidth, i * game.tileHeight, game.tileWidth, game.tileHeight);
            }else if(board[i][j] === 2) {
                game.context.drawImage(water, j * game.tileWidth, i * game.tileHeight, game.tileWidth, game.tileHeight);
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

    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}

window.addEventListener("load", setup);