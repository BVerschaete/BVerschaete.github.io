/**
 * Created by Bastien on 20/03/2016.
 */
//kleine code bij het level select scherm om button te deactiveren en select kleuren aan te passen
function setup() {
    var startButton = $("#startSelectedLevel");
    startButton.addClass("disabled");

    for(var i = 0; i < standardLevels.length; i++){
        var button = $('<a/>');
        button.attr({class: 'btn levelSelectButton', 'data-level': i});
        button.text(i+1);
        $("#standardLevelContainer").append(button);
    }

    if(customLevels.length != 0) {
        for (var j = 0; j < customLevels.length; j++) {
            var button2 = $('<a/>');
            button2.attr({class: 'btn levelSelectButton', 'data-level': standardLevels.length + j});
            button2.text(standardLevels.length + j + 1);
            $('#customLevelContainer').append(button2);
        }
    } else {
        $('#customLevelContainer').hide();
    }

    var selectedButton;

    $('.levelSelectButton').click(function (event) {
        $('.hovered').removeClass("hovered");
        selectedButton = $(event.target);
        selectedButton.toggleClass("hovered");
        var id = selectedButton.attr('data-level');
        var levelName = levels[id].name;
        var levelInfo = $('#levelInfo');
        levelInfo.text(levelName);
        levelInfo.css('visibility', 'visible');
        sessionStorage.selectedLevel = id;
        startButton.removeClass("disabled");
    });
}

$(window).load(setup);

