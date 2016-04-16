/**
 * Created by Gaben on 24/03/2016.
 */
var players = [];

function setup(){
    var myFirebaseRef = new Firebase("https://popping-fire-3131.firebaseio.com/");
    var playerTable = myFirebaseRef.child('Players');

    playerTable.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            players.push(childSnapshot.val());
        });

        fillTable();
    });
}

function fillTable(){
    players.sort(comparator);
    
    for(var i = 0; i < players.length; i++) {
        var $player = $('<tr>');
        var $playerName = $('<td>');
        var $playerScore = $('<td>');
        var $playerPlace = $('<td>');

        $playerPlace.text(i+1);
        $playerName.text(players[i]["name"]);
        $playerScore.text(players[i]["score"]);

        $player.append($playerPlace);
        $player.append($playerName);
        $player.append($playerScore);

        $('tbody').append($player);
    }
}

function comparator(a, b){
    return parseInt(b.score) - parseInt(a.score);
}


$(window).load(setup);