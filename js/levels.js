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

var level0 = {
    name: "Learning the ropes",
    difficulty: 1,
    spawnSpeed: 20,
    board:  [
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
    spawnSpeed: 20,
    board:  [
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

//NA HET MAKEN VAN EEN LEVEL VERPLICHT TOEVOEGEN AAN ARRAY!!
var standardLevels = [level0, level1];
var customLevels = [];

if(checkCookie("customLevels")){
    customLevels = JSON.parse(getCookie("customLevels"));
}

var levels = standardLevels.concat(customLevels);

