/**
 * @class ThrowableObject
 * @classdesc Represents a throwable fireball object.
 *
 * Inherits physics, gravity, and animation behavior from {@link MoveableObject}.
 * The fireball can be thrown in a given direction and moves with simple drag-based deceleration.
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {
    /** Horizontal velocity in pixels per frame. @type {number} */
    speedX = 0;

    /** Horizontal drag applied each frame (reduces speed over time). @type {number} */
    dragX = 0.55;

    /** Render width of the fireball (px). @type {number} */
    width = 16 * 2;

    /** Render height of the fireball (px). @type {number} */
    height = 16 * 2;

    /** Animation frames for the fireball. @type {string[]} */
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
     * Creates a new throwable fireball at a given position and direction.
     *
     * @constructor
     * @param {number} x - Initial X position of the fireball.
     * @param {number} y - Initial Y position of the fireball.
     * @param {number} direction - Direction multiplier (1 for right, -1 for left).
     */
    constructor(x, y, direction) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('./img/6_fireball/2.png');
        this.loadImages(this.IMAGES_FIREBALL);
        this.throw(x, y, direction);
    }

    /**
     * Throws the fireball in the given direction.
     * Applies gravity and horizontal motion.
     *
     * @method throw
     * @param {number} x - Initial X position of the fireball.
     * @param {number} y - Initial Y position of the fireball.
     * @param {number} direction - Direction multiplier (1 for right, -1 for left).
     */
    throw(x, y, direction) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();

        Game.setStoppableInterval(() => {
            this.x += 10 * direction;
        }, 25);
    }

    /**
     * Applies horizontal friction (drag) to gradually slow down the fireball.
     * @method applyFriction
     */
    applyFriction() {
        Game.setStoppableInterval(() => {
            this.x += this.speedX;
            if (this.speedX > 0) this.speedX -= this.dragX;
            if (this.speedX <= 0) this.speedX = 0;
        }, 1000 / 60);
    }
}
