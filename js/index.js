/**
 * Created by Bastien on 02/04/2016.
 */

//zorgt ervoor dat spelernaam wordt doorgegeven aan gamepagina
function setup() {
    var start = $('#startGame');
    var input = $('#usernameInput');
    start.addClass("disabled");

    input.on('input', function () {
        if (isValidName()) {
            start.removeClass("disabled");
        } else {
            start.addClass("disabled");
        }
    });

    start.click(function () {
        sessionStorage.playerName = input.val();
    });

    input.keyup(function (event) {
        console.log("ok");
        if (event.keyCode == 13) {
            console.log("yay");
            window.location.href = "levelselect.html";
        }
    });

    setPictures();
}

function isValidName(){
    var input = $('#usernameInput');
    return input.val().trim() != "";
}

function setPictures(){
    var screenshots = [];
    for(var i = 1; i <= 3; i++){
        var img = new Image();
        img.src = "img/site/front" + i + ".png";
        screenshots.push(img);
    }
    setPictureLoop(screenshots);
}

function setPictureLoop(screenshots){
    var i = 0;
    setInterval(function() {
        if(i > screenshots.length - 1){
            i = 0;
        }
        $("#screenshotLarge")
            .fadeOut(800, function () {
                $("#screenshotLarge").attr('src', screenshots[i-1].src);
            })
            .fadeIn(600);

        i++;
    }, 4000);
}

$(window).load(setup);