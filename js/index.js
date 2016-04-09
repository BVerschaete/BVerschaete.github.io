/**
 * Created by Bastien on 02/04/2016.
 */

//zorgt ervoor dat spelernaam wordt doorgegeven aan gamepagina
function setup() {
    //voor de cookie pop up
    window.cookieconsent_options = {"message":"This website uses cookies to ensure you get the best experience on our website","dismiss":"Got it!","learnMore":"More info","link":null,"theme":"dark-floating"};
    
    scroll();
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
        if (event.keyCode == 13) {
            sessionStorage.playerName = input.val();
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


//speciale scroll/click-functionaliteit voor welkom-pagina, gebruikt van https://css-tricks.com/
function scroll() {
    $('a[href*="#"]:not([href="#"])').click(function(event) {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                setTimeout(function() {
                    if($(event.target).prop("id") == "usernameLink") {
                        $('#usernameInput').focus();
                    }
                }, 1005);
                return false;
            }
        }
    });

}

$(window).load(setup);