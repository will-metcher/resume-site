let penSize = 1;
let strokeColor = 0;

function setup() {
    var main = document.getElementsByTagName("main")[0];
    var nav = document.getElementsByTagName("nav")[0];
    var cnv = createCanvas(windowWidth, windowHeight - nav.clientHeight);
    cnv.position(0, main.y);
    background(255);
    document.getElementById("pen-size").addEventListener("change", function() {
        penSize = this.value;
    });

    document.getElementById("pen-color").addEventListener("change", function() {
        strokeColor = this.value;
    });
}

function draw() {
    strokeWeight(penSize);
    stroke(strokeColor);
    if (mouseIsPressed) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}