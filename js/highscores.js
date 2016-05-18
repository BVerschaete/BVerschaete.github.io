/**
 * Created by Gaben on 24/03/2016.
 */
var players = [];

/**
 * Maakt knoppen aan voor ieder standaard level en zet de table inhoud op het eerste level
 */
function setup(){
    for(var i = 0; i < standardLevels.length; i++){
        var naam = "standardLevel" + i;
        var button = $('<input>');
        var label = $('<label>');
        button.attr({id: naam, type: "radio", class: 'levelSelectButton', 'data-level': i, name: "level"});
        button.click(changeTable);
        label.text(i+1);
        label.attr({for: naam});
        label.css('text-align', 'center');
        $("#levels").append(button, label);
    }

    //als naar deze pagina verwezen wordt nadat er een level gespeeld is en de highscures gepushed worden, dan moet je dat level tonen
    var ifLevelPlayed = sessionStorage.getItem('playedLevel');

    if(ifLevelPlayed == null){
        setupTable(0);
    } else {
        setupTable(ifLevelPlayed);
    }
}

/**
 * functie voor het opzetten table bij een klik op een level knop
 */
function changeTable(event){
    var level = $(event.target).attr('data-level');
    setupTable(level);
}

/**
 * Verandert titel van de table en vult de playerArray met spelers vanuit de Firebase database
 * met behulp van Firebase library
 * 
 * Players moeten in tabel zitten zodat ze gemakkelijk te sorteren zijn
 */
function setupTable(levelNumber){
    $('.hovered').prop('checked', false);
    $('.levelSelectButton[data-level=' + levelNumber +']').prop('checked', true);
    $('tbody').empty();
    players = [];

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

/**
 * Sorteer tabel en maak een rij voor iedere speler in de tabel
 */
function fillTable(){
    players.sort(comparator);

    if (players.length > 0) {
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

/**
 * wordt als argument meegegeven bij de array.sort functie om de highscores te sorteren op score
 * a en b zijn player objecten, de scores van objecten a en b worden vergeleken
 * aan iedere twee objecten a en b wordt een waarde meegegeven (in dit geval het verschil tussen de scores)
 * zodat de sort functie weet welke speler waar moet adhv alle objecten met elkaar te vergelijken
 */
function comparator(a, b){
    return parseInt(b.score) - parseInt(a.score);
}


$(window).load(setup);