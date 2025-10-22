class FireballItem extends MoveableObject {
    y = 330;
    width = 16 * 2;
    height = 16 * 2;

    IMAGES_FIREBALL = [
        './img/6_fireball/1.png',
        './img/6_fireball/2.png',
        './img/6_fireball/3.png',
        './img/6_fireball/4.png',
        './img/6_fireball/5.png',
        './img/6_fireball/6.png',
        './img/6_fireball/7.png',
        './img/6_fireball/8.png'
    ];

    constructor() {
        super();
        this.loadImage('./img/6_fireball/1.png');
        this.loadImages(this.IMAGES_FIREBALL);
        this.x = 400 + Math.random() * 2000;
        this.animate();
    }

    animate() {
        Game.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_FIREBALL);
        }, 1000 / 10);
    }
}