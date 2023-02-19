const TILES = [];

const CONNECTIONS = [
    [0,0,0,0],
    [1,1,0,1],
    [1,1,1,0],
    [0,1,1,1],
    [1,0,1,1]
];

const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

const DIM = 40;
const SIZE = 25;
let grid = [];

class Tile {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.collapsed = false;
        this.options = [BLANK, UP, RIGHT, DOWN, LEFT];
    }
}

function getTileById(id) {
    return grid.find((a) => a.id == id);
}

function getTileByPosition(x, y) {
    return grid.find((a) => a.x == x && a.y == y);
}


function preload() {
    var url = 'https://raw.githubusercontent.com/will-metcher/will-metcher.github.io/501d21cf4e1d1706a83cca8db08fe572f1d7ee36/pages/wfc/imgs/'
    TILES[BLANK] = loadImage(url+'blank.svg');
    TILES[UP] = loadImage(url+'up.svg');
    TILES[RIGHT] = loadImage(url+'right.svg');
    TILES[DOWN] = loadImage(url+'down.svg');
    TILES[LEFT] = loadImage(url+'left.svg');
}

function setup() {
    createCanvas(1000, 1000);
    for(let i = 0; i < DIM * DIM; i++) {
        grid[i] = new Tile(i, i % DIM, floor(i / DIM));
    }
}

function draw() {
    background(255);

    //draw checkerboard with rects
    for(let i = 0; i < grid.length; i++) {
        //rect(i % DIM * SIZE, floor(i / DIM) * SIZE, SIZE, SIZE);


        if(grid[i].collapsed) {
            image(TILES[grid[i].options[0]], grid[i].x*SIZE, grid[i].y*SIZE, SIZE, SIZE);
        }
    }

    let gridCopy = grid.filter((a) => !a.collapsed).sort((a,b) => a.options.length - b.options.length);
    if(gridCopy.length == 0) {
        return;
    }
    console.log(gridCopy);

    getTileById(gridCopy[0].id).options = [random(gridCopy[0].options)];
    getTileById(gridCopy[0].id).collapsed = true;

    // update connections
    //up
    if(gridCopy[0].y > 0) {
        var above = getTileByPosition(gridCopy[0].x, gridCopy[0].y - 1);
        if(!above.collapsed) {
            above.options = [];
            var match = CONNECTIONS[gridCopy[0].options[0]][0];
            for(let i = 0; i < CONNECTIONS.length; i++) {
                if(CONNECTIONS[i][2] == match) {
                    above.options.push(i);
                }
            }
        }
    }

    //down
    if(gridCopy[0].y < DIM - 1) {
        var below = getTileByPosition(gridCopy[0].x, gridCopy[0].y + 1);
        if(!below.collapsed) {
            below.options = [];
            var match = CONNECTIONS[gridCopy[0].options[0]][2];
            console.log("right: " + match);
            for(let i = 0; i < CONNECTIONS.length; i++) {
                if(CONNECTIONS[i][0] == match) {
                    below.options.push(i);
                }
            }
        }
    }

    //left
    if(gridCopy[0].x > 0) {
        var left = getTileByPosition(gridCopy[0].x - 1, gridCopy[0].y);
        if(!left.collapsed) {
            left.options = [];
            var match = CONNECTIONS[gridCopy[0].options[0]][3];
            for(let i = 0; i < CONNECTIONS.length; i++) {
                if(CONNECTIONS[i][1] == match) {
                    left.options.push(i);
                }
            }
        }
    }

    //right
    if(gridCopy[0].x < DIM - 1) {
        var right = getTileByPosition(gridCopy[0].x + 1, gridCopy[0].y);
        if(!right.collapsed) {
            right.options = [];
            var match = CONNECTIONS[gridCopy[0].options[0]][1];
            for(let i = 0; i < CONNECTIONS.length; i++) {
                if(CONNECTIONS[i][3] == match) {
                    right.options.push(i);
                }
            }
        }
    }
}