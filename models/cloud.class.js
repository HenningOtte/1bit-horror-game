class Cloud extends MoveableObject {
    y = 20;
    width = 201;
    height = 75;
    speed = 0.6;

    constructor() {
        super();
        this.loadImage(`../img/5_background/layers/4_clouds/Cloud_3.png`);
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);
    }
}