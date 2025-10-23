/**
 * Represents a walking skeleton enemy in the game.
 * 
 * The skeleton moves continuously to the left until defeated,
 * using walking and death animations inherited from {@link MoveableObject}.
 * @extends MoveableObject
 */
class Skeleton extends MoveableObject {
    y = 244;
    height = 78 * 2;
    width = 80 * 2;
    offset = {
        top: 10,
        left: 44,
        right: 44,
        bottom: 10
    };
    energy = 20;

    IMAGES_WALKING = [
        './img/3_enemie_skeleton/1_walk/1.png',
        './img/3_enemie_skeleton/1_walk/2.png',
        './img/3_enemie_skeleton/1_walk/3.png',
        './img/3_enemie_skeleton/1_walk/4.png',
        './img/3_enemie_skeleton/1_walk/5.png',
        './img/3_enemie_skeleton/1_walk/6.png',
        './img/3_enemie_skeleton/1_walk/7.png',
        './img/3_enemie_skeleton/1_walk/8.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemie_skeleton/2_dead/1.png',
        './img/3_enemie_skeleton/2_dead/2.png',
        './img/3_enemie_skeleton/2_dead/3.png'
    ];

    constructor() {
        super();
        this.loadImage('./img/3_enemie_skeleton/1_walk/1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 2300;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    /**
     * Starts the skeleton's animation loops.
     * 
     * - Moves continuously to the left while alive.
     * - Switches between walking and dead animations based on state.
     * 
     * @method animate
     */
    animate() {
        // Movement loop (60 FPS)
        Game.setStoppableInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        // Animation loop
        Game.setStoppableInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD, false);
            }
        }, 60);
    }
}
