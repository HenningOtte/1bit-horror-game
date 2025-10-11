class Endboss extends MoveableObject {
    y = 195;
    x = 2200;
    height = 96*2;
    width = 84*2;

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