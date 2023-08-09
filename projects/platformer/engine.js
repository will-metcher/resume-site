class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static add(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static sub(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    static mul(a, b) {
        return new Vector2(a.x * b.x, a.y * b.y);
    }

    static div(a, b) {
        return new Vector2(a.x / b.x, a.y / b.y);
    }

    static normalize(a) {
        const length = Math.pow(a.x, 2) + Math.pow(a.y, 2);
        // discard div by zero
        if (length === 0) {
            return new Vector2(0, 0);
        }
        return new Vector2(a.x / length, a.y / length);
    }

    static scale(a, b) {
        return new Vector2(a.x * b, a.y * b);
    }

    static distance(a, b) {
        return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    }
}

class Bounds {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    static changePosition(bounds, x, y) {
        return new Bounds(bounds.x + x, bounds.y + y, bounds.width, bounds.height);
    }

    static isColliding(a, b) {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }
}

class Sprite {
    constructor(x, y) {
        this.bounds = new Bounds(x, y, 50, 50);
        this.velocity = new Vector2(0, 0);
    }

    update() {
        this.bounds = Bounds.changePosition(this.bounds, this.velocity.x, this.velocity.y);
    }

    draw(context) {
        context.fillStyle = 'white';
        context.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    }
}

class GameObject extends Sprite {
    constructor(x, y) {
        super(x, y);
    }

    update() {
        //gravity
        this.velocity.y += GRAVITY;

        // check for collisions with borders
        if (this.bounds.y + this.bounds.height > canvas.height) {
            this.bounds.y = canvas.height - this.bounds.height;
            this.velocity.y = 0;
        } else if (this.bounds.y < 0) {
            this.bounds.y = 0;
            this.velocity.y = 0;
        }

        if (this.bounds.x < 0) {
            this.bounds.x = 0;
            this.velocity.x = 0;
        } else if (this.bounds.x + this.bounds.width > canvas.width) {
            this.bounds.x = canvas.width - this.bounds.width;
            this.velocity.x = 0;
        }

        super.update();
    }

    draw(context) {
        super.draw(context);
    }
}

class KeyInput {
    constructor() {
        this.keys = [];
    }

    addKey(keycode) {
        // check if key already exists
        if (this.keys.find(key => key.keycode === keycode)) {
            // update key
            this.keys.find(key => key.keycode === keycode).held = true;
        } else {
            // add key
            this.keys.push(new Key(keycode));
            // set pressed
            this.keys.find(key => key.keycode === keycode).pressed = true;
        }
    }

    removeKey(keycode) {
        // remove from keys
        this.keys = this.keys.filter(key => key.keycode !== keycode);
    }

    isPressed(keycode) {
        // check if key exists
        if (!this.keys.find(key => key.keycode === keycode)) {
            return false;
        }
        return this.keys.find(key => key.keycode === keycode).pressed;
    }

    isHeld(keycode) {
        // check if key exists
        if (!this.keys.find(key => key.keycode === keycode)) {
            return false;
        }
        return this.keys.find(key => key.keycode === keycode).held;
    }
}

class Key {
    constructor(keycode) {
        this.keycode = keycode;
        this.pressed = false;
        this.held = false;
    }
}