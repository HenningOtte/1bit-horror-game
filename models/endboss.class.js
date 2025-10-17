class Endboss extends MoveableObject {
    y = 170;
    // x = 2200;
    x = 300;
    height = 112 * 2;
    width = 140 * 2;

    offset = {
        top: 36,
        left: 50,
        right: 50,
        bottom: 5
    };

    IMAGES_WALKING = [
        '../img/4_enemie_boss_neuron/1_walk/G1.png',
        '../img/4_enemie_boss_neuron/1_walk/G2.png',
        '../img/4_enemie_boss_neuron/1_walk/G3.png',
        '../img/4_enemie_boss_neuron/1_walk/G4.png',
        '../img/4_enemie_boss_neuron/1_walk/G5.png',
        '../img/4_enemie_boss_neuron/1_walk/G6.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 240);
    }
}