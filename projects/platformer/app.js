const GRAVITY = 0.5;

class Game {
    constructor(context) {
        this.context = context;
        this.sprites = [];
        this.player = new Player(10, 500);
        this.addSprite(this.player);
        this.draw();
    }

    addSprite(sprite) {
        this.sprites.push(sprite);
    }

    handleInput(keycode, pressed, held) {
        if (keycode === 'ArrowLeft') {
            if (pressed) {
                this.player.velocity.x = -this.player.moveSpeed;
            } else {
                this.player.velocity.x = 0;
            }
        } else if (keycode === 'ArrowRight') {
            if (pressed) {
                this.player.velocity.x = this.player.moveSpeed;
            } else {
                this.player.velocity.x = 0;
            }
        }

        if (keycode === 'Space') {
            if (pressed && !held) {
                if (!this.player.isJumping) {
                    this.player.velocity.y = -this.player.jumpPower;
                    this.player.isJumping = true;
                    this.canDoubleJump = true;
                } else if (this.player.isJumping && this.canDoubleJump) {
                    this.player.velocity.y = -this.player.jumpPower;
                    this.canDoubleJump = false;
                }
            }
        }
    }

    draw() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, canvas.width, canvas.height);

        this.sprites.forEach(sprite => sprite.draw(this.context));

        window.requestAnimationFrame(() => this.draw());
    }
}

class Player extends Sprite {
    constructor(x, y) {
        super(x, y, 50, 50);
        this.isJumping = false;
        this.moveSpeed = 3;
        this.canDoubleJump = false;
        this.jumpPower = 10;
        this.wallSlide = 0;
    }

    update() {
        if (this.bounds.y + this.bounds.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
            this.isJumping = false;
        } else {
            this.velocity.y += GRAVITY - this.wallSlide;
        }

        if (this.bounds.x + this.velocity.x <= 0) {
            this.velocity.x = 0;
            this.wallSlide = 0.2;
        } else if (this.bounds.x + this.bounds.width + this.velocity.x >= canvas.width) {
            this.velocity.x = 0;
            this.wallSlide = 0.2;
        } else {
            this.wallSlide = 0;
        }
        console.log(this.wallSlide)
        super.update();
    }

    draw(context) {
        context.fillStyle = 'white';
        super.draw(context);
    }
}

const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d');
const game = new Game(context);

window.addEventListener('keydown', event => {
    game.handleInput(event.code, true, event.repeat);
});

window.addEventListener('keyup', event => {
    game.handleInput(event.code, false);
});