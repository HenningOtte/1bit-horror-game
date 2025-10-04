class MoveableObject {
    x = 100;
    y = 279;
    img;
    height = 105;
    width = 78;
    imageCache = {};
    currentImage = 0;
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    velocityX = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y >= 279) {
                this.y = 279;
                this.speedY = 0;
            };
        }, 1000 / 30);
    }

    isAboveGround() {
        return this.y < 279;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Robot) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;       
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(imgs) {
        let i = this.currentImage % imgs.length;
        let path = imgs[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }

    //////////////////////////////////////

    // moveRight() {
    //     if (this.velocityX < 5) {
    //         this.velocityX = (this.velocityX * 1.05) + 0.08;
    //         this.x += this.velocityX;
    //     } else {
    //         this.x += this.velocityX;
    //     }
    // }

    // stopMoveRight() {
    //     if (this.velocityX > 0) {
    //         this.velocityX = this.velocityX - 0.3;
    //         this.x += this.velocityX;
    //     } else {
    //         this.velocityX = 0;
    //     }
    // }
}