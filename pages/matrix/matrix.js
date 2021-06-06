let streams = [];

const FONT_SIZE = 30;
const STREAM_MIN_SIZE = 8;
const STREAM_MAX_SIZE = 30;
const BLUR = 115;
const WHITE_TIP_CHANCE = 3; // 1 in x

function setup() {
    var main = document.getElementsByTagName("main")[0];
    var nav = document.getElementsByTagName("nav")[0];
    var cnv = createCanvas(windowWidth, windowHeight - nav.clientHeight);
    cnv.position(0, main.y);
    frameRate(60);
    textSize(FONT_SIZE);

    for (let i = 0; i < windowWidth; i += FONT_SIZE) {
        stream = new Stream(i);
        stream.generateCharacters();
        streams.push(stream);
    }
}

function draw() {
    background(0, BLUR);
    streams.forEach(function (stream) {
        stream.draw();
    })
}

function Character(x, y, speed, isFirstChar, index) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.index = index;
    this.char;
    this.switchChance = round(random(0, 60));
    this.isFirstChar = isFirstChar;

    this.randomiseChar = function () {
        this.char = String.fromCharCode(0x30A0 + round(random(0, 96)));
    }

    this.draw = function () {
        var opacity = 255 - map(this.index, STREAM_MIN_SIZE, STREAM_MAX_SIZE, 100, 255);
        (isFirstChar) ? fill(200, 255, 200, opacity) : fill(0,255,65, opacity);
        text(this.char, this.x, this.y);
        this.y += this.speed;

        if (this.y > windowHeight) {
            this.y = -10;
        }

        if (frameCount % this.switchChance == 0) {
            this.randomiseChar();
        }
    }
}

function Stream(x) {
    this.chars = [];
    this.x = x;
    this.speed = random(2, 10);

    this.generateCharacters = function () {
        var y = -10;
        var isFirst = round(random(0, WHITE_TIP_CHANCE)) == 1;
        for (let i = 0; i < round(random(STREAM_MIN_SIZE, STREAM_MAX_SIZE)); i++) {
            c = new Character(this.x, y, this.speed, isFirst, i);
            c.randomiseChar();
            this.chars.push(c);
            y -= FONT_SIZE;
            isFirst = false;
        }
    }

    this.draw = function () {
        this.chars.forEach(function (c) {
            c.draw();
        });
    }
}