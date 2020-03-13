// map constructor function to create map tile board with obstacles
const Map = function(mapSize) {
    this.mapSize = mapSize;

    this.create  = function() {
        for (let i = 0; i <= mapSize; i += 1) {
        mapContainer.append('<div class="box" data-index="' + i + '"></div>');
        let numTiles = $('.box').length;
        tiles.push(numTiles);
        }
    }
    this.obstacles = function(itemClass) {
        addComponents(itemClass)
    }
}

// create game map object
let game = new Map(mapSize);

// randomize the boxes on the map to randomize position of game's components
function random(num) {
    return Math.floor(Math.random() * num);
}

/* add components to the map function like obstacles, weapon, players, 
which is used by 'add' function by their function constructor */
function addComponents(itemClass, player) {
    let restOfTiles = tiles;
    let boxes = $('.box');
    let empty = true;
    while (empty) {
        let item = random(mapSize);
        if (player === 1) {
            positionRules = (item % 10 === 0);
        } else if (player === 2) {
            positionRules = (item % 10 === 9);
        } else {
            positionRules = (item % 10 !== 0 && item % 10 !== 9);
        }
        if (positionRules && restOfTiles.includes(item)) {
            boxes.eq(item).addClass(itemClass);
            let index = restOfTiles.indexOf(item);
            restOfTiles.splice(index, 1);
            empty = false;
        }
    }
}
