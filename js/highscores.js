/**
 * Created by Gaben on 24/03/2016.
 */
var players = [];

function setup(){
    for(var i = 0; i < standardLevels.length; i++){
        var button = $('<a>');
        button.attr({class: 'btn levelSelectButton', 'data-level': i});
        button.text(i+1);
        button.click(changeTable);
        $("#levels").append(button);
    }

    if(sessionStorage.playedLevel === undefined){
        setupTable(sessionStorage.playedLevel);
        $('a[data-level=' + sessionStorage.playedLevel + ']').addClass("hovered");
        sessionStorage.playedLevel = undefined;
    } else {
        setupTable(0);
        $('a[data-level=0]').addClass("hovered");
    }
}

function changeTable(event){
    $('.hovered').removeClass("hovered");
    $(event.target).addClass("hovered");
    var level = $(event.target).attr('data-level');
    setupTable(level);
}

function setupTable(levelNumber){
    players = [];
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
    players.sort(comparator);

    if(players.length > 0) {
        for (var i = 0; i < players.length; i++) {
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

function comparator(a, b){
    return parseInt(b.score) - parseInt(a.score);
}


$(window).load(setup);