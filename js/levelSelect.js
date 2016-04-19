/**
 * Created by Bastien on 20/03/2016.
 */
//kleine code bij het level select scherm om button te deactiveren en select kleuren aan te passen
function setup() {
    var startButton = $("#startSelectedLevel");
    var naam;
    var button;
    var label;
    startButton.addClass("disabled");

    for(var i = 0; i < standardLevels.length; i++){
        naam = "standardLevel" + i;
        button = $('<input>');
        label = $('<label>');
        button.attr({id: naam, type: "radio", class: 'levelSelectButton', 'data-level': i, name: "level"});
        label.text(i+1);
        label.attr({for: naam});
        $("#standardLevelContainer").append(button, label);
    }

    if(customLevels.length != 0) {
        for (var j = 0; j < customLevels.length; j++) {
            naam = "customLevel" + i;
            button = $('<input>');
            label = $('<label>');
            button.attr({id: naam, type: "radio", class: 'levelSelectButton', 'data-level': standardLevels.length + j, name: "level"});
            label.text(j+1);
            label.attr({for: naam});
            $('#customLevelContainer').append(button, label);
        }
    } else {
        $('#customLevelContainer').hide();
    }
    var selectedButton;

    $('.levelSelectButton').click(function (event) {
        selectedButton = $(event.target);
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

