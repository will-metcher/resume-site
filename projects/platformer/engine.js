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
        this.update();
        context.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    }
}