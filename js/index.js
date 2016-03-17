/**
 * Created by Bastien on 3/12/2015.
 */

var disqus_config = function () {
    this.page.url = "http://bverschaete.github.io/";  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = ""; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

function setup() {
    drawGrid();
    //useDisqus();
    console.log(board);
    document.getElementById("moveIets").addEventListener("click", displayMove);
}

var displayMove = function(){
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
};

function drawGrid(){
    //grid width and height
    var bw = 400;
    var bh = 400;
    //padding around grid
    var p = 10;
    //size of canvas
    var cw = bw + (p*2) + 1;
    var ch = bh + (p*2) + 1;

    var canvas = $('<canvas/>').attr({width: cw, height: ch}).appendTo('body');

    var context = canvas.get(0).getContext("2d");

    function drawBoard(){
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

    function fillBoard(){
        for(var i = 0; i < board.length; i++){
            for(var j = 0; j < board[i].length; j++){
                if(board[i][j] == 1){
                    context.fillStyle = "red";
                } else {
                    context.fillStyle = "green";
                }
                context.fillRect(11 + i*40, 11 + j*40, 39, 39)
            }
        }
    }

    drawBoard();
    fillBoard();

}

function useDisqus() {  // REQUIRED CONFIGURATION VARIABLE: EDIT THE SHORTNAME BELOW
    var d = document, s = d.createElement('script');

    s.src = '//webdesigngame.disqus.com/embed.js';  // IMPORTANT: Replace EXAMPLE with your forum shortname!

    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}


window.addEventListener("load", setup);