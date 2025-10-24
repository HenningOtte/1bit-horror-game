/**
 * @class Skeleton
 * @classdesc Represents a walking skeleton enemy in the game.
 *
 * The skeleton moves continuously to the left until defeated,
 * using walking and death animations inherited from {@link MoveableObject}.
 * @extends MoveableObject
 */
class Skeleton extends MoveableObject {
    /** Vertical position in the world (px). @type {number} */
    y = 244;

    /** Sprite height (px). @type {number} */
    height = 78 * 2;

    /** Sprite width (px). @type {number} */
    width = 80 * 2;

    /**
     * Collision hitbox offsets.
     * @type {{top:number,left:number,right:number,bottom:number}}
     */
    offset = {
        top: 10,
        left: 44,
        right: 44,
        bottom: 10
    };

    /** Current health/energy (0–100). @type {number} */
    energy = 20;

    /** Walking animation frames. @type {string[]} */
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

    /** Death animation frames. @type {string[]} */
    IMAGES_DEAD = [
        './img/3_enemie_skeleton/2_dead/1.png',
        './img/3_enemie_skeleton/2_dead/2.png',
        './img/3_enemie_skeleton/2_dead/3.png'
    ];

    /**
     * Creates a new Skeleton with random X position and speed,
     * preloads animations and starts the loops.
     * @constructor
     */
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
     * - Movement loop at 60 FPS (moves left while alive)
     * - Sprite loop switching between walking/dead animations
     * @method animate
     */
    animate() {
        Game.setStoppableInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        Game.setStoppableInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD, false);
            }
        }, 60);
    }
}