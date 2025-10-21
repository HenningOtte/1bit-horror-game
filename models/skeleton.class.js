class Skeleton extends MoveableObject {
    y = 244
    height = 78 * 2;
    width = 58 * 2;
    offset = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
    };
    IMAGES_WALKING = [
        '../img/3_enemie_skeleton/1_walk/1.png',
        '../img/3_enemie_skeleton/1_walk/2.png',
        '../img/3_enemie_skeleton/1_walk/3.png',
        '../img/3_enemie_skeleton/1_walk/4.png',
        '../img/3_enemie_skeleton/1_walk/5.png',
        '../img/3_enemie_skeleton/1_walk/6.png',
        '../img/3_enemie_skeleton/1_walk/7.png',
        '../img/3_enemie_skeleton/1_walk/8.png'
    ];

    constructor() {
        super();
        this.loadImage('../img/3_enemie_skeleton/1_walk/1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        Game.setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        Game.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 60);
    }
}