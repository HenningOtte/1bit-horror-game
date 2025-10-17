class MoveableObject extends DrawableObject {
    x = 100;
    y = 244;
    img;
    height = 105;
    width = 78;
    imageCache = {};
    currentImage = 0;
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    energy = 100;
    lastHit = 0;
    lastThrow = 0;
    ammo = 5;
    attack = false;
    moving = true;


    hit(damage) {
        this.energy -= damage;
        this.energy < 0 ? this.energy = 0 : this.lastHit = new Date().getTime();
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    recordThrow() {
        this.lastThrow = new Date().getTime();
    }

    canThrow() {
        let timepassed = new Date().getTime() - this.lastThrow;
        timepassed = timepassed / 1000;
        return timepassed > 0.5 && this.ammo > 0;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 244;
                this.speedY = 0;
            }
        }, 1000 / 30);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 244;
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    isJumpingOn(mo) {
        return this.y + this.height >= mo.y &&
            this.y + this.height <= mo.y + 20 &&
            this.speedY < 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(imgs, loop = true) {
        let i = this.currentImage % imgs.length;
        let path = imgs[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        if (this.currentImage >= imgs.length) {
            if (loop) {
                this.currentImage = 0;
            } else {
                this.currentImage = imgs.length - 1;
            }
        }
    }

    jump() {
        this.speedY = 30;
    }
}