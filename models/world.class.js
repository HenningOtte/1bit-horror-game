class World {
    character = new Character();
    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ];
    backgroundObjects = [
        new BackgroundObject('../img/5_background/layers/air.png', 0), 
        new BackgroundObject('../img/5_background/layers/3_third_Layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_Layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_Layer/1.png', 0),
    ];
    enemies = [
        new Rat(),
        new Rat(),
        new Rat(),
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas = canvas;
        this.draw();
    }

    draw() {        
        if (this.character.right == true) {
            this.character.moveRight();
        }
        if (this.character.right == false) {
            this.character.stopMoveRight();
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}