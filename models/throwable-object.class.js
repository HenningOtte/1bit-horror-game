class ThrowableObject extends MoveableObject {
    speedX = 0;
    dragX = 0.55;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('../img/6_grenade/1.png');
        this.width = 8 * 3;
        this.height = 8 * 3;
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    applyFriction() {
        setInterval(() => {
            this.x += this.speedX;
            if (this.speedX > 0) this.speedX = this.speedX - this.dragX;
            if (this.speedX <= 0) this.speedX = 0;
        }, 1000 / 60);
    }
}