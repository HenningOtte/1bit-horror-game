class World {
    character = new Character();
    enemies = [
        new Robot(),
        new Robot(),
        new Robot(),
    ];
    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ];
    backgroundObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.createBackgorund();
        this.draw();
        this.setWorld();
    }

    createBackgorund() {
        let x = -719;
        let imgNumber = 1;
        let maxImages = 2;
        for (let i = 0; i < 5; i++) {
            this.backgroundObjects.push(new BackgroundObject(`../img/5_background/layers/air.png`, x));
            this.backgroundObjects.push(new BackgroundObject(`../img/5_background/layers/3_third_Layer/${imgNumber}.png`, x));
            this.backgroundObjects.push(new BackgroundObject(`../img/5_background/layers/2_second_Layer/${imgNumber}.png`, x));
            this.backgroundObjects.push(new BackgroundObject(`../img/5_background/layers/1_first_Layer/${imgNumber}.png`, x));
            x += 719;
            imgNumber++;
            if (imgNumber > maxImages) imgNumber = 1;
        }
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() called again and again
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}