/**
 * @class FireballItem
 * @classdesc Represents a collectible fireball item that grants ammo to the player.
 * 
 * The fireball item continuously animates by cycling through sprite frames.
 * When collected, it increases the player’s fireball ammunition.
 * Inherits rendering and animation functionality from {@link MoveableObject}.
 * @extends MoveableObject
 */
class FireballItem extends MoveableObject {
    /**
     * The vertical position of the fireball item in pixels.
     * @type {number}
     */
    y = 330;

    /**
     * The width of the fireball sprite in pixels.
     * @type {number}
     */
    width = 16 * 2;

    /**
     * The height of the fireball sprite in pixels.
     * @type {number}
     */
    height = 16 * 2;

    /**
     * Array of file paths representing the fireball animation frames.
     * @type {string[]}
     */
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

    /**
     * Creates a new FireballItem instance with a random horizontal position.
     * Loads the animation frames and starts the animation loop.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('./img/6_fireball/1.png');
        this.loadImages(this.IMAGES_FIREBALL);
        this.x = 400 + Math.random() * 2000;
        this.animate();
    }

    /**
     * Starts the fireball item animation loop.
     * Cycles through sprite frames at 10 frames per second.
     * @method animate
     */
    animate() {
        Game.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_FIREBALL);
        }, 1000 / 10);
    }
}
