class MoveableObject {
    x = 100;
    y = 276;
    img;
    height = 108;
    width = 72;
    imageCache = {};    
    currentImage = 0;
    speed = 0.3;
    velocityX = 0;
    right = false;

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

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    //////////////////////////////////////

    moveRight() {
        if (this.velocityX < 5) {
            this.velocityX = (this.velocityX * 1.05) + 0.08;
            this.x += this.velocityX;
        } else {
            this.x += this.velocityX;
        }
    }

    stopMoveRight() {
        if (this.velocityX > 0) {
            this.velocityX = this.velocityX - 0.3;
            this.x += this.velocityX;
        } else {
            this.velocityX = 0;
        }
    }
}