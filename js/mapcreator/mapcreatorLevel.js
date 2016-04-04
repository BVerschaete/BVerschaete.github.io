/**
 * Created by Bastien on 02/04/2016.
 */
/**
 * Created by Bastien on 31/03/2016.
 */
var level = {
    name: "Custom Level",
    difficulty: 0,
    spawnSpeed: 0,
    board: [],
    startDirection: directions.rechts,
    startX: null,
    startY: null
};

var customLevels = [];
var selectedCustomLevel = -1;

function createLevel(){
    level.name = $('#levelName').val();
    level.difficulty = parseInt($('#levelDifficulty').val());
    level.spawnSpeed = parseInt($('#levelSpawnSpeed').val());
    level.direction = $('#levelStartDirection').find(":selected").val();
}

function saveLevel(){
    if(checkInputs()) {
        createLevel();
        if (selectedCustomLevel == -1) {
            customLevels.push(level);
        } else {
            customLevels[selectedCustomLevel] = level;
        }
        setCookie("customLevels", JSON.stringify(customLevels), 7);
        location.reload();
    }
}

function checkInputs(){
    var i = 0;
    $('#errorMessage').text("");
    if(!$('#levelName').val().trim()){
        displayErrorMessage("Name can not be empty");
        i++;
    }

    var levelDifficulty = $('#levelDifficulty').val();
    if(levelDifficulty < 1 || levelDifficulty > 3){
        displayErrorMessage("Difficulty must be 1-3");
        i++;
    }

    var levelSpawnSpeed = $('#levelSpawnSpeed').val();
    if(levelSpawnSpeed < 10 || levelSpawnSpeed > 50){
        displayErrorMessage("Spawnspeed must be 10-50");
        i++;
    }

    if(level.startX == null || level.startY == null){
        displayErrorMessage("No start tile detected.");
        i++;
    }

    return i == 0;
}

function displayErrorMessage(message){
    var errorMessage = $('#errorMessage');
    errorMessage.html(errorMessage.html() + '<br>' + message);
}

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

function loadLevel(event){
    $('#customLevels').hide();
    var index = parseInt($(event.target).attr('data-level'));
    level = customLevels[index];
    selectedCustomLevel = index;

    $('#levelName').val(level.name);
    $('#levelDifficulty').val(level.difficulty);
    $('#levelSpawnSpeed').val(level.spawnSpeed);
    $('#levelStartDirection').find('option[value=' + level.startDirection + ']').prop('selected', true);
    $('#levelStartX').text(level.startX);
    $('#levelStartY').text(level.startY);

    drawMap();
}

function deleteLevel(event){
    customLevels.splice(parseInt($(event.target).parent().attr('data-level')), 1);
    setCookie("customLevels", JSON.stringify(customLevels), 7);
    loadLevels();
}