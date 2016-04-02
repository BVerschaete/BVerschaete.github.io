/**
 * Created by Bastien on 02/04/2016.
 */

//zorgt ervoor dat spelernaam wordt doorgegeven aan gamepagina
function setup() {
    var start = $('#startGame');
    var input = $('#usernameInput');
    start.addClass("disabled");
    input.on('input', function () {
        if (input.val().trim()) {
            start.removeClass("disabled");
        } else {
            start.addClass("disabled");
        }
    });

    start.click(function () {
        sessionStorage.playerName = input.val();
    });
    placePictures();
}

function placePictures(){
    var screenshots = $('#screenshots');
    for(var i = 1; i <= 3; i++){
        var img = new Image();
        img.src = "img/site/front" + i + ".png";
        img.width = "300";
        img.height = "300";
        $(img).click(changeImages);
        screenshots.append(img);
    }
}

function changeImages(event){
    $("#screenshotLarge")
        .fadeOut(400, function() {
            $("#screenshotLarge").attr('src', event.target.src);
        })
        .fadeIn(400);
}

$(window).load(setup);