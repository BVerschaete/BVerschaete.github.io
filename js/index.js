/**
 * Created by Bastien on 3/12/2015.
 */
//grid width and height
var bw = 400;
var bh = 400;
var game = {};

function setup() {
    addCanvas();
    //useDisqus();
    game = {
        canvas: document.getElementById("canvas"),
        context: this.canvas.getContext("2d")
    };
    
    game.canvas.addEventListener('mouseover', toggleMouseInCanvas, false);
    game.canvas.addEventListener('mouseout', toggleMouseInCanvas, false);
    game.canvas.addEventListener('mousemove', getMousePosition, false);
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
    var canvas = $('<canvas/>').attr({width: bw, height: bh, id: 'canvas'}).appendTo('body');
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
                game.context.drawImage(build, j * 40, i * 40, 40, 40);
            }else if(board[i][j] === 1) {
                game.context.drawImage(path, j * 40, i * 40, 40, 40);
            }else if(board[i][j] === 2) {
                game.context.drawImage(water, j * 40, i * 40, 40, 40);
            }
        }
    }
}

function drawGrid(){
    game.context.fillStyle = 'white';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    for (var x = 0; x <= bw; x += 40) {
        game.context.moveTo(0.5 + x, 0);
        game.context.lineTo(0.5 + x, bh);
    }


    for (x = 0; x <= bh; x += 40) {
        game.context.moveTo(0, 0.5 + x);
        game.context.lineTo(bw, 0.5 + x);
    }

    game.context.strokeStyle = "black";
    game.context.stroke();
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

//vanaf hier code voor game
function startGame(){
    $("#createAttacker")[0].addEventListener('click', createAttacker);
}

function createAttacker(){
    addAttacker("Bob");
    var attackerDisplay = $('<div></div>').append([ $('<p></p>').text(attackers[attackers.length - 1].naam),
                                                    $('<span></span>').text(attackers[attackers.length - 1].life)]
                                                );
    $("#demo").append(attackerDisplay)
}


window.addEventListener("load", setup);