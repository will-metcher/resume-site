let boids = [];
let cnv;

function Boid(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(randomInt(5), randomInt(5));

    this.update = function() {
        this.pos = p5.Vector.add(this.pos, this.vel);
        if(this.pos.x < 0) {
            this.pos.x = cnv.width;
        } else if(this.pos.x > cnv.width) {
            this.pos.x = 0;
        }

        if(this.pos.y < 0) {
            this.pos.y = cnv.height;
        } else if(this.pos.y > cnv.height) {
            this.pos.y = 0;
        }
    }
}

function setup() {
    cnv = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    frameRate(60);

    for(let i = 0; i < 10; i++) {
        boids.push(new Boid(randomInt(cnv.width), randomInt(cnv.height)));
    }
}

function draw() {
    background(0);

    boids.forEach(boid => {
        boid.update();
        rect(boid.pos.x, boid.pos.y, 32, 32);
        boid.pos = p5.Vector.add(boid.pos, cohesion(boid));
    });
}

function flocking() {

}

function avoidance(boid) {
    let avoidanceForce = createVector(0,0);

    for(let i = 0; i < boids.length; i++) {
        if(boid == boids.length) {
            continue;
        }

        absVector();
    }
}

function cohesion(boid) {
    var cohesiveForce = createVector(0,0);

    for(let i = 0; i < boids.length; i++) {
        if(boid == boids[i]) {
            continue;
        }

        cohesiveForce = p5.Vector.add(cohesiveForce, boids[i].pos);
    }

    cohesiveForce = p5.Vector.div(cohesiveForce, boids.length - 1);

    return p5.Vector.div(p5.Vector.sub(cohesiveForce, boid.pos), 100); 
}