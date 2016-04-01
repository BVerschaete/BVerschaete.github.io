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
    if($('#levelName').val().trim() && $('#levelDifficulty').val().trim() && $('#levelSpawnSpeed').val().trim() && level.startX != null && level.startY != null) {
        createLevel();
        if(selectedCustomLevel == -1) {
            customLevels.push(level);
        } else {
            customLevels[selectedCustomLevel] = level;
        }
        setCookie("customLevels", JSON.stringify(customLevels), 7);
        location.reload();
    } else {
        alert("invalid level settings");
    }
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