const GRAVITY = 0.5;

class Game {
    constructor(context) {
        this.context = context;
        this.gameObjects = [];
        this.player = new Player(100, 100);
        this.addGameObject(this.player);
        this.keys = new KeyInput();
        this.draw();
    }

    addGameObject(object) {
        this.gameObjects.push(object);
    }

    handleInput() {
        let xVel = 0;
        if (this.keys.isPressed('ArrowLeft')) {
            xVel -= 5;
        }
        if (this.keys.isPressed('ArrowRight')) {
            xVel += 5;
        }

        if (this.keys.isPressed('Space') && !this.keys.isHeld('Space')) {
            if (!this.player.isJumping && this.player.onGround) {
                this.player.velocity.y = -10;
                this.player.isJumping = true;
                this.player.onGround = false;
                this.player.canDoubleJump = true;
                console.log('jump');
            } else if (this.player.canDoubleJump && this.player.isJumping) {
                this.player.velocity.y = -10;
                this.player.canDoubleJump = false;
                console.log('double jump');
            }
        }

        this.player.velocity.x = xVel;
    }

    draw() {
        this.handleInput();
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, canvas.width, canvas.height);

        this.gameObjects.forEach(object => {
            object.draw(this.context);
            object.update();
        });

        window.requestAnimationFrame(() => this.draw());
    }
}

class Player extends GameObject {
    constructor(x, y) {
        super(x, y);
        this.isJumping = false;
        this.onGround = false;
        this.canDoubleJump = false;
    }

    update() {
        super.update();
        // check ground collision
        if (this.bounds.y + this.bounds.height >= canvas.height) {
            this.isJumping = false;
            this.onGround = true;
            this.canDoubleJump = false;
        }
    }
}

const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d');
const game = new Game(context);

window.addEventListener('keydown', event => {
    game.keys.addKey(event.code);
});

window.addEventListener('keyup', event => {
    game.keys.removeKey(event.code);
});