class Cloud extends MoveableObject {
    speed = 0.6;

    IMAGES_CLOUDS = [
        `../img/5_background/layers/4_clouds/Cloud_1.png`,
        `../img/5_background/layers/4_clouds/Cloud_2.png`,
        `../img/5_background/layers/4_clouds/Cloud_3.png`,
    ];

    constructor(width = 380, height = 92, index = 1) {
        super();
        this.loadImage(this.IMAGES_CLOUDS[index]);
        this.x = Math.random() * 3000;
        this.y = Math.random() * 40;
        this.animate();
        this.width = width;
        this.height = height;
    }

    animate() {
        this.moveLeft();
        Game.setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 30);
    }
}