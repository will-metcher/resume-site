const densityString = "Ñ@#W$9876543210?!abc;:+=-,._                    ";

let video;
let container;
let radius = 10;

function setup() {
    var cnv = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    video = createCapture(VIDEO);
    video.size(128, 128);
    video.hide();
    container = createDiv();
    container.id("ascii");
}

function draw() {
    mosaicFilter();
}

function mosaicFilter() {
    video.loadPixels();
    for (let j = 0; j < video.height; j++) {
        for (let i = 0; i < video.width; i++) {
            const pixelIndex = (i + j * video.width) * 4;
            const r = video.pixels[pixelIndex + 0];
            const g = video.pixels[pixelIndex + 1];
            const b = video.pixels[pixelIndex + 2];
            fill(r, g, b);
            rect(i * radius, j * radius, radius, radius);
        }
    }
}

function asciiFilter() {
    video.loadPixels();
    let img = "";
    for (let y = 0; y < video.height; y++) {
        for (let x = 0; x < video.width; x++) {
            let index = (x + y * video.width) * 4;
            let r = video.pixels[index + 0];
            let g = video.pixels[index + 1];
            let b = video.pixels[index + 2];
            let brightness = (r + g + b) / 3;
            let densityIndex = floor(map(brightness, 0, 255, 0, densityString.length - 1));
            let c = densityString[densityIndex] == " " ? "&nbsp;" : densityString[densityIndex];
            img += c;
        }
        img += "<br>";
    }
    container.html(img);
}