/**
 * Created by Gaben on 25/03/2016.
 */
var selectedImage;

function setup(){
    level.board = generateBoard($("#sldRows").val(), $("#sldCols").val());
    addImages();
    addCanvas();
    $("#sldTilesize").on("input", changeTileSize);
    $("#sldRows, #sldCols").on("input", changeBoardSize);
    $('#levelStartCoords').click(selectStartTile);
    $('#save').click(saveLevel);
    $('#load').click(loadLevels);
    $('#clear').click(clearBoard);
    gameLoop();

    if(checkCookie("customLevels")) {
        customLevels = JSON.parse(getCookie("customLevels"));
    }

    $("[data-toggle=tooltip]").tooltip();
}

function addImages(){
    // voorlopig zelf instellen hoeveel images er in zitten :(
    var images = $('#availableImages');
    for(var i = 0; i < 22; i++){
        var $img = $(tiles[i].image);
        $img.attr("data-id", i); // het lukt niet met prop
        $img.click(selectTile);
        images.append($img);
    }

    selectedImage = images.find("img")[0];
    changeSelectedImage();
}

function changeSelectedImage(){
    $("#selectedImage").find("img")[0].src = selectedImage.src;
}

$(setup);