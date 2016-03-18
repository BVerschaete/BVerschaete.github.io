/**
 * Created by Bastien on 3/12/2015.
 */
//grid width and height
var bw = 400;
var bh = 400;
//padding around grid
var p = 10;

function setup() {
    addCanvas();
    drawGrid();
    //useDisqus();
    document.getElementById("moveIets").addEventListener("click", displayMove);
    document.getElementById("canvas").addEventListener('mouseover', toggleMouseInCanvas, false);
    document.getElementById("canvas").addEventListener('mouseout', toggleMouseInCanvas, false);
    document.getElementById("canvas").addEventListener('mousemove', getMousePosition, false);
    gameLoop();
}

function addCanvas(){

    //size of canvas
    var cw = bw + (p*2) + 1;
    var ch = bh + (p*2) + 1;

    var canvas = $('<canvas/>').attr({width: cw, height: ch, id: 'canvas'}).appendTo('body');
}

function displayMove(){
    document.getElementById("outputMove").innerHTML = "";

    for(var i = 0; i < board.length; i++) {
        var s = "";
        for (var j = 0; j < board[i].length; j++) {
            if(posY == i && posX == j){
                s += "X\t";
            }else{
                s += board[i][j] + "\t";
            }
        }
        document.getElementById("outputMove").innerHTML += s + "<br />";
    }

    move();
}

function drawMap(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width, canvas.height);
    var a;

    var path = new Image();
    path.src = "img/grasstile.png";
    var build = new Image();
    build.src = "img/background.png";
    var water = new Image();
    water.src = "img/watertile.jpg";

    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++) {
            if(board[i][j] == 0){
                context.drawImage(build, 11 + j * 40, 11 + i * 40, 40, 40);
            }else if(board[i][j] == 1) {
                context.drawImage(path, 11 + j * 40, 11 + i * 40, 40, 40);
            }else if(board[i][j] == 2) {
                context.drawImage(water, 11 + j * 40, 11 + i * 40, 40, 40);
            }
        }
    }
/*
    path.onload = function (){
        for(var i = 0; i < board.length; i++){
            for(var j = 0; j < board[i].length; j++){
                if(board[i][j] == 1) {
                    context.drawImage(path, 11 + j * 40, 11 + i * 40, 40, 40);
                } else {

                }
            }
        }
    };

    var build = new Image();
    build.src = "img/background.png";
    build.onload = function (){
        for(var i = 0; i < board.length; i++){
            for(var j = 0; j < board[i].length; j++){
                if(board[i][j] == 0) {
                    context.drawImage(build, 11 + j * 40, 11 + i * 40, 40, 40);
                } else {

                }
            }
        }
    };*/
}

function drawGrid(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width, canvas.height);

    for (var x = 0; x <= bw; x += 40) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }


    for (x = 0; x <= bh; x += 40) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }

    context.strokeStyle = "black";
    context.stroke();
}

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