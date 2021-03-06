/**
 * Created by Gaben on 25/03/2016.
 */
var selectedImage;

/**
 * Voeg images en canvas toe, samen met eventlisteners
 */
function setup(){
    level.board = generateBoard($("#sldRows").val(), $("#sldCols").val());
    addImages();
    addCanvas();
    $("#sldTilesize").on("input", changeTileSize);
    $("#sldRows, #sldCols").on("input", changeBoardSize);
    $("#sldRows, #sldCols").on("mousedown", backupBoard);
    $('#levelStartCoords').click(selectStartTile);
    $('#save').click(saveLevel);
    $('#load').click(loadLevels);
    $('#clear').click(clearBoard);
    $("#restoreBoard").click(restoreBoard);
    $("#spawnAttacker").click(addAttacker);
    $("#levelStartDirection").on("change", changeStartDirection);
    gameLoop();

    if(checkCookie("customLevels")) {
        customLevels = JSON.parse(getCookie("customLevels"));
    }

    $("[data-toggle=tooltip]").tooltip();
}

/**
 * Voor iedere tile een image maken
 */
function addImages(){
    var images = $('#availableImages');
    for(var i = 0; i <= 26; i++){
        var $img = $(tiles[i].image);
        $img.attr("data-id", i);
        $img.click(selectTile);
        images.append($img);
    }

    selectedImage = images.find("img")[0];
    changeSelectedImage();
}

/**
 * Update de vergrootte versie met de geselecteerde image
 */
function changeSelectedImage(){
    $("#selectedImage").find("img")[0].src = selectedImage.src;
}

$(window).load(setup);