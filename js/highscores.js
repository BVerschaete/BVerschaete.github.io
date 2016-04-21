/**
 * Created by Gaben on 24/03/2016.
 */
var players = [],
    tableFilled = false;
function setup(){
    for(var i = 0; i < standardLevels.length; i++){
        var naam = "standardLevel" + i;
        var button = $('<input>');
        var label = $('<label>');
        button.attr({id: naam, type: "radio", class: 'levelSelectButton', 'data-level': i, naam: "level"});
        button.click(changeTable);
        label.text(i+1);
        label.attr({for: naam});
        label.css('text-align', 'center');
        $("#levels").append(button, label);
    }

    setupTable(0);
    
    if(sessionStorage.playedLevel != undefined || sessionStorage.playedLevel != null){
        setupTable(sessionStorage.playedLevel);
        sessionStorage.playedLevel = undefined;
    }
}

function changeTable(event){
    var level = $(event.target).attr('data-level');
    setupTable(level);
}

function setupTable(levelNumber){
    players = [];
    tableFilled = false;
    $('.hovered').prop('checked', false);
    $('.levelSelectButton[data-level=' + levelNumber +']').prop('checked', true);
    $('tbody').empty();
    var level = parseInt(levelNumber);
    $('#title').text("Highscores (Level " + (level+1) + ")");
    var myFirebaseRef = new Firebase("https://popping-fire-3131.firebaseio.com/");
    var playerTable = myFirebaseRef.child('Highscores').child(level).child('Players');

    playerTable.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            players.push(childSnapshot.val());
        });

        fillTable();
    });
}

function fillTable(){
    if(!tableFilled) {
        tableFilled = true;
        players.sort(comparator);

        if (players.length > 0) {

            var aantal = players.length > 10 ? 10 : players.length;

            for (var i = 0; i < aantal; i++) {
                var $player = $('<tr>');
                var $playerName = $('<td>');
                var $playerScore = $('<td>');
                var $playerPlace = $('<td>');

                $playerPlace.text(i + 1);
                $playerName.text(players[i]["name"]);
                $playerScore.text(players[i]["score"]);

                $player.append($playerPlace);
                $player.append($playerName);
                $player.append($playerScore);
                $('tbody').append($player);
            }
        } else {
            var $messageRow = $('<tr>');
            var $message = $('<td>');
            $message.attr('colspan', 3);
            $message.text("Be the first to play this level!");

            $messageRow.append($message);
            $('tbody').append($messageRow);
        }
    }
}

function comparator(a, b){
    return parseInt(b.score) - parseInt(a.score);
}


$(window).load(setup);