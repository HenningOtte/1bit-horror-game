class Coin extends MoveableObject {
    y = 320;
    height = 24 * 2;
    width = 24 * 2;
    IMAGES_ROTATING = [
        '../img/8_coin/1.png',
        '../img/8_coin/2.png',
        '../img/8_coin/3.png',
        '../img/8_coin/4.png',
        '../img/8_coin/5.png',
        '../img/8_coin/6.png',
        '../img/8_coin/7.png'
    ];
    constructor() {
        super();
        this.loadImage('../img/8_coin/1.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.x = 400 + Math.random() * 600;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATING);
        }, 1000 / 10);
    }
}