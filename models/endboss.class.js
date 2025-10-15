class Endboss extends MoveableObject {
    y = 170;
    x = 2200;
    height = 112*2;
    width = 140*2;

    IMAGES_WALKING = [
        '../img/4_enemie_boss_neuron/1_walk/G1.png'
    ];
        
    constructor () {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}