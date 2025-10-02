class Endboss extends MoveableObject {
    y = 282;
    x = 2200;
    height = 102;
    width = 90;

    IMAGES_WALKING = [
        'img/4_enemie_boss_neuron/2_alert/G1.png',
        'img/4_enemie_boss_neuron/2_alert/G2.png',
        'img/4_enemie_boss_neuron/2_alert/G3.png',
        'img/4_enemie_boss_neuron/2_alert/G4.png',
        'img/4_enemie_boss_neuron/2_alert/G5.png',
        'img/4_enemie_boss_neuron/2_alert/G6.png',
        'img/4_enemie_boss_neuron/2_alert/G7.png',
        'img/4_enemie_boss_neuron/2_alert/G8.png',
        'img/4_enemie_boss_neuron/2_alert/G9.png',
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