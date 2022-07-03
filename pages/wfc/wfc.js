const TILES = [];

function preload() {
    TILES[0] = loadImage('imgs/blank.svg');
}

function setup() {

}

function draw() {
    image(TILES[0], 0, 0, 200,200);
}