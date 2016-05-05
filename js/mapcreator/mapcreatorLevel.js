/**
 * Created by Bastien on 02/04/2016.
 */
/**
 * Created by Bastien on 31/03/2016.
 */


var customLevels = [];
var selectedCustomLevel = -1;

/**
 * Variabelen van het customLevel
 */
var level = {
    name: "Custom Level",
    difficulty: 0,
    spawnSpeed: 0,
    board: [],
    backupBoard: [],
    startDirection: directions.up, // dezelfde richting als het eerste element in de select
    startX: null,
    startY: null,
    customLevel: true,
    attackers: []
};

/**
 * Zet de waarden van de inputs in de level variabele
 */
function createLevel(){
    level.name = $('#levelName').val();
    level.difficulty = parseInt($('#levelDifficulty').val());
    level.spawnSpeed = parseInt($('#levelSpawnSpeed').val());
    changeStartDirection();
}

/**
 * Verandert de startdirection, aparte functie omdat dit moet aangepast
 * worden wanneer er geklikt wordt in de lijst
 */
function changeStartDirection() {
    level.startDirection = parseInt($('#levelStartDirection').find(":selected").val());
}

/**
 * Als alle inputs in orde zijn, sla het level op in de cookie
 */
function saveLevel(){
    if(checkInputs()) {
        createLevel();
        if (selectedCustomLevel == -1) {
            customLevels.push(level);
        } else {
            customLevels[selectedCustomLevel] = level;
        }
        setCookie("customLevels", JSON.stringify(customLevels), 7);
        
        //Herlaad de pagina zodat bij het laden van een level alles is aangepast
        //En er geen spam-levels kunnen worden aangemaakt
        location.reload();
    }
}

/**
 * Kijkt of alle inputs in orde zijn, toon anders een error message
 */
function checkInputs(){
    var i = 0;
    $('#errorMessage').text("");
    if(!$('#levelName').val().trim()){
        displayErrorMessage("*Name can not be empty");
        i++;
    }

    var levelDifficulty = $('#levelDifficulty').val();
    if(levelDifficulty < 1 || levelDifficulty > 3){
        displayErrorMessage("*Difficulty must be 1-3");
        i++;
    }

    var levelSpawnSpeed = $('#levelSpawnSpeed').val();
    if(levelSpawnSpeed < 10 || levelSpawnSpeed > 50){
        displayErrorMessage("*Spawnspeed must be 10-50");
        i++;
    }

    if(level.startX == null || level.startY == null){
        displayErrorMessage("*No start tile detected.");
        i++;
    }

    return i == 0;
}

/**
 * Algemene functie om error berichten te tonen
 */
function displayErrorMessage(message){
    var errorMessage = $('#errorMessage');
    errorMessage.html(errorMessage.html() + '<br>' + message);
}

/**
 * Laad alle custom levels om een level te editen
 */
function loadLevels(){
    var customLevelDiv = $('#customLevels');
    customLevelDiv.empty();
    customLevelDiv.show();
    for(var i = 0; i < customLevels.length; i++){
        var div = $('<div/>');
        div.addClass("customLevelButtonDiv");

        var button = $('<a/>');
        button.attr({class: 'btn customLevelButton', 'data-level': i});
        button.text(i+1);
        button.click(loadLevel);
        div.append(button);

        var name = $('<p/>');
        name.text(customLevels[i].name);
        div.append(name);
        customLevelDiv.append(div);

        var deleteButton = $('<button/>').text('Delete Level');
        deleteButton.click(deleteLevel);
        deleteButton.addClass("btn btn-danger");
        deleteButton.css('font-size', '10px');
        div.append(deleteButton);
    }
}

/**
 * Laad de waarden van het geselecteerde level in de level variabele
 */
function loadLevel(event){
    $('#customLevels').hide();
    var index = parseInt($(event.target).attr('data-level'));
    level = customLevels[index];
    selectedCustomLevel = index;

    $("#atlRows").html(level.board.length);
    $("#atlCols").html(level.board[0].length);
    $('#levelName').val(level.name);
    $('#levelDifficulty').val(level.difficulty);
    $('#levelSpawnSpeed').val(level.spawnSpeed);
    $('#levelStartDirection').find('option[value=' + level.startDirection + ']').prop('selected', true);
    $('#levelStartX').text(level.startX);
    $('#levelStartY').text(level.startY);

    addCanvas();
    drawMap();
}

/**
 * Verwijder een custom level
 */
function deleteLevel(event){
    customLevels.splice(parseInt($(event.target).parent().attr('data-level')), 1);
    setCookie("customLevels", JSON.stringify(customLevels), 7);
    loadLevels();
}