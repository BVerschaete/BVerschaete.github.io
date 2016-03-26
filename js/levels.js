/**
 * Created by Bastien on 10/02/1014.
 */
//Level Template, CTRL-/ to uncomment, directions: 0=boven, 1 = rechts, 2 = beneden, 3 = links, zie ook "var levels" hieronder, spawnspeed in seconden
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
        [0, 0, 0, 0, 0, 0, 7, 2, 4, 0],
        [2, 4, 0, 1, 0, 0, 3, 0, 3, 0],
        [0, 3, 0, 1, 0, 7, 5, 0, 3, 0],
        [0, 3, 0, 1, 0, 3, 0, 0, 3, 0],
        [7, 5, 0, 0, 0, 3, 0, 0, 3, 0],
        [3, 0, 0, 0, 0, 3, 0, 0, 3, 0],
        [6, 4, 0, 0, 0, 3, 0, 0, 3, 0],
        [0, 6, 4, 0, 7, 5, 0, 7, 5, 0],
        [0, 0, 3, 0, 3, 0, 0, 3, 0, 0],
        [0, 0, 6, 2, 5, 0, 0, 6, 2, 2]
    ],
    startDirection: directions.rechts,
    startX: 0,
    startY: 1
};

//NA HET MAKEN VAN EEN LEVEL VERPLICHT TOEVOEGEN AAN ARRAY!!
var levels = [level0];

var selectedLevel = levels[sessionStorage.selectedLevel];