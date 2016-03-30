/**
 * Created by Bastien on 20/03/2016.
 */
//kleine code bij het level select scherm om button te deactiveren en select kleuren aan te passen
$(function() {
    var startButton = $("#startSelectedLevel");
    startButton.addClass("disabled");

    for(var i = 0; i < levels.length; i++){
        var button = $('<a/>');
        button.attr({class: 'btn levelSelectButton', 'data-level': i});
        button.text(i+1);
        $("#buttonContainer").append(button);
    }

    var selectedButton;

    $('.levelSelectButton').click(function (event) {
        $('.hovered').removeClass("hovered");
        selectedButton = $(event.target);
        selectedButton.toggleClass("hovered");
        var id = selectedButton.attr('data-level');
        var levelName = levels[id].name;
        $('#levelInfo').text(levelName);
        sessionStorage.selectedLevel = id;
        startButton.removeClass("disabled");
    });
});

