class ThrowableObject extends MoveableObject {
    speedX = 0;
    dragX = 0.55;
    width = 16 * 2;
    height = 16 * 2;

    IMAGES_FIREBALL = [
        '../img/6_fireball/1.png',
        '../img/6_fireball/2.png',
        '../img/6_fireball/3.png',
        '../img/6_fireball/4.png',
        '../img/6_fireball/5.png',
        '../img/6_fireball/6.png',
        '../img/6_fireball/7.png',
        '../img/6_fireball/8.png'
    ];

    constructor(x, y, direction) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('../img/6_fireball/2.png');
        this.loadImages(this.IMAGES_FIREBALL);
        this.throw(x, y, direction);
    }

    throw(x, y, direction) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10 * direction;
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