/**
 * Created by Bastien on 20/03/2016.
 */
//Level Template, CTRL-/ to uncomment, directions: 0=boven, 1 = rechts, 2 = beneden, 3 = links, zie ook "var levels" hieronder
// var levelName = {
//     name: "customName",
//     difficulty: 0,
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
    board:  [
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [1, 1, 0, 2, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 2, 0, 1, 1, 0, 1, 0],
        [0, 1, 0, 2, 0, 1, 0, 0, 1, 0],
        [1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 1, 1, 1]
    ],
    startDirection: directions.rechts,
    startX: 0,
    startY: 1
};

// var level1 = {
//     name: "One step at a time",
//     difficulty: 2,
//     board:  [
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [1, 1, 1, 1, 1, 1, 1, 0, 2, 2],
//         [0, 0, 0, 0, 0, 0, 1, 0, 2, 2],
//         [0, 2, 2, 2, 0, 0, 1, 0, 0, 0],
//         [0, 2, 2, 2, 0, 0, 1, 1, 1, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
//         [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//         [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 1, 1, 1, 0, 2, 2, 2, 2, 0],
//         [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
//     ],
//     startDirection: 1,
//     startX: 0,
//     startY: 1
// };

//NA HET MAKEN VAN EEN LEVEL VERPLICHT TOEVOEGEN AAN ARRAY!!
var levels = [level0];

var selectedLevel = levels[sessionStorage.selectedLevel];