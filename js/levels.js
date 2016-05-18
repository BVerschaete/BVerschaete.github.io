/**
 * Created by Bastien on 10/02/1014.
 */
//Level Template, CTRL-/ to uncomment, directions: 0=boven, 1 = right, 2 = beneden, 3 = left, zie ook "var levels" hieronder, spawnspeed in seconden
// var levelName = {
//     name: "customName",
//     difficulty: 0,
//     spawnSpeed: 0,
//     board:  [
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//     ],
//     startDirection: 0,
//     startX: 0,
//     startY: 0
// };

var standardLevels = [];
var customLevels = [];
var levels = [];

/**
 * Maakt standaardlevels aan en vult de arrays
 */
function createLevels() {
    var level0 = {
        name: "Learning the ropes",
        difficulty: 1,
        spawnSpeed: 30,
        board: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 3, 0, 19, 0, 0, 6, 1, 3, 0],
            [0, 2, 0, 16, 0, 6, 4, 0, 2, 0],
            [0, 2, 0, 16, 0, 2, 0, 0, 2, 0],
            [6, 4, 0, 18, 0, 2, 0, 0, 2, 0],
            [2, 0, 0, 0, 0, 2, 0, 0, 2, 0],
            [5, 3, 0, 0, 0, 2, 0, 6, 4, 0],
            [0, 5, 3, 0, 6, 4, 0, 2, 0, 0],
            [0, 0, 5, 1, 4, 0, 0, 5, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        startDirection: directions.right,
        startX: 0,
        startY: 1,
        customLevel: false
    };

    var level1 = {
        name: "Choices... And Water!",
        difficulty: 1,
        spawnSpeed: 25,
        board: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 19, 0, 6, 1, 1, 1, 1, 1, 1],
            [0, 16, 0, 2, 0, 0, 0, 0, 0, 0],
            [0, 16, 0, 23, 1, 1, 1, 3, 0, 0],
            [0, 16, 0, 2, 13, 14, 7, 2, 0, 0],
            [0, 16, 0, 2, 12, 15, 8, 2, 0, 0],
            [0, 18, 0, 2, 12, 15, 8, 2, 0, 0],
            [0, 0, 0, 2, 12, 15, 8, 2, 0, 0],
            [0, 0, 0, 2, 12, 15, 8, 2, 0, 0],
            [0, 0, 0, 2, 11, 10, 9, 2, 0, 0]
        ],
        startDirection: 3,
        startX: 9,
        startY: 1
    };

    var level2 = {
        name: "Symmetry is a challenge",
        difficulty: 2,
        spawnSpeed: 20,
        board: [[0,0,0,0,0,2,0,0,0,0,0],
                [6,1,1,1,1,26,1,1,1,1,3],
                [2,0,0,0,0,2,0,0,0,0,2],
                [2,0,0,0,0,2,0,0,0,0,2],
                [2,0,13,7,0,2,0,13,7,0,2],
                [2,0,11,9,0,2,0,11,9,0,2],
                [2,0,0,0,0,2,0,0,0,0,2],
                [2,0,0,0,0,2,0,0,0,0,2],
                [5,1,1,1,3,2,6,1,1,1,4],
                [0,0,0,0,2,2,2,0,0,0,0],
                [0,0,0,0,2,2,2,0,0,0,0]],
        startDirection: 2,
        startX: 5,
        startY: 0
    };

    var level3 = {
        name: "A spiral with a splash",
        difficulty: 3,
        spawnSpeed: 10,
        board: [[6,1,1,1,1,1,1,1,1,1],
                [2,0,0,0,0,0,0,0,0,0],
                [2,0,6,1,1,1,1,1,1,3],
                [2,19,2,0,0,0,0,0,0,2],
                [2,16,2,0,6,1,1,3,0,2],
                [2,16,2,0,2,13,7,2,0,2],
                [2,18,2,0,0,11,9,2,0,2],
                [2,0,5,1,1,1,1,4,0,2],
                [2,0,0,0,0,0,0,0,0,2],
                [5,1,1,1,1,1,1,1,1,4]],
        startDirection: 0,
        startX: 4,
        startY: 5
    };

    var level4 = {
        name: "Stairway to heaven",
        difficulty: 3,
        spawnSpeed: 20,
        board: [[13,14,14,7,0,0,0,0,0,6],
                [12,15,10,9,0,0,0,0,6,4],
                [12,8,0,0,0,0,0,6,4,0],
                [11,9,0,0,0,0,6,4,0,0],
                [0,0,0,0,0,6,4,0,0,0],
                [0,0,0,0,6,4,0,0,0,0],
                [0,0,0,6,4,0,0,0,13,7],
                [0,0,6,4,0,0,0,0,12,8],
                [0,6,4,0,0,0,13,14,15,8],
                [1,4,0,0,0,0,11,10,10,9]],
        startDirection: 1,
        startX: 0,
        startY: 9
    };

    //NA HET MAKEN VAN EEN LEVEL VERPLICHT TOEVOEGEN AAN ARRAY!!
    standardLevels.push(level0, level1, level2, level3, level4);

    //als er custom levels gemaakt zijn (deze staan in cookie) dan moeten ze geladen worden
    if(checkCookie("customLevels")){
        customLevels = JSON.parse(getCookie("customLevels"));
    }

    levels = standardLevels.concat(customLevels);
}

createLevels();