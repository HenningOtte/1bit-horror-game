/**
 * @class MoveableObject
 * @classdesc Represents any object that can move within the game world.
 *
 * Extends {@link DrawableObject} to add movement, gravity, physics,
 * collision detection, and animation capabilities.
 *
 * This class is the base for entities like the player, enemies, and throwable objects.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
    /** Horizontal position in the world (px). @type {number} */
    x = 100;

    /** Vertical position in the world (px). @type {number} */
    y = 244;

    /** Currently assigned image element. @type {HTMLImageElement|undefined} */
    img;

    /** Render height (px). @type {number} */
    height = 105;

    /** Render width (px). @type {number} */
    width = 78;

    /** Cache of preloaded images by path. @type {Object.<string,HTMLImageElement>} */
    imageCache = {};

    /** Current animation frame index. @type {number} */
    currentImage = 0;

    /** Horizontal movement speed (px/tick). @type {number} */
    speed = 0.3;

    /** Facing flag for horizontal mirroring. @type {boolean} */
    otherDirection = false;

    /** Current vertical velocity. @type {number} */
    speedY = 0;

    /** Gravity/acceleration applied each tick. @type {number} */
    acceleration = 2.5;

    /**
     * Collision hitbox offsets (shrink/grow bounding box).
     * @type {{top:number,left:number,right:number,bottom:number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /** Remaining health/energy (0–100). @type {number} */
    energy = 100;

    /** Timestamp (ms) of the last hit. @type {number} */
    lastHit = 0;

    /** Timestamp (ms) of the last throw. @type {number} */
    lastThrow = 0;

    /** Current ammo count. @type {number} */
    ammo = 0;

    /** Whether the entity is currently attacking. @type {boolean} */
    attack = false;

    /** Whether the entity is currently moving. @type {boolean} */
    moving = false;

    /**
     * Applies damage to the object and updates its last hit timestamp.
     * @param {number} damage - Amount of energy to subtract.
     */
    hit(damage) {
        this.energy -= damage;
        this.energy < 0 ? this.energy = 0 : this.lastHit = new Date().getTime();
    }

    /**
     * Determines if the object is currently in a "hurt" state.
     * @returns {boolean} True if recently hit, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Records the timestamp of the last thrown projectile.
     */
    recordThrow() {
        this.lastThrow = new Date().getTime();
    }

    /**
     * Checks whether the object can throw again.
     * @returns {boolean} True if enough time has passed and ammo is available.
     */
    canThrow() {
        let timepassed = new Date().getTime() - this.lastThrow;
        timepassed = timepassed / 1000;
        return timepassed > 0.5 && this.ammo > 0;
    }

    /**
     * Checks if the object is dead (energy depleted).
     * @returns {boolean} True if energy is 0.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Applies gravity to the object, affecting its vertical movement over time.
     * Continuously updates position based on current vertical speed and acceleration.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y >= 244 && this instanceof Character) {
                this.y = 244;
                this.speedY = 0;
            }
        }, 1000 / 30);
    }

    /**
     * Determines whether the object is above ground level.
     * @returns {boolean} True if above the base ground position.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 244;
        }
    }

    /**
     * Checks if this object collides with another moveable object.
     * @param {MoveableObject} mo - The object to check collision against.
     * @returns {boolean} True if bounding boxes overlap.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks if this object is jumping on top of another (for attacks or bounces).
     * @param {MoveableObject} mo - The object being jumped on.
     * @returns {boolean} True if the jump contact conditions are met.
     */
    isJumpingOn(mo) {
        return this.y + this.height >= mo.y &&
            this.y + this.height <= mo.y + 20 &&
            this.speedY < 0 &&
            !mo.isDead();
    }

    /** Moves the object to the right based on its current speed. */
    moveRight() {
        this.x += this.speed;
    }

    /** Moves the object to the left based on its current speed. */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation from a list of image paths.
     * Can loop or stop at the last frame depending on the `loop` flag.
     * @param {string[]} imgs - Array of image paths for the animation sequence.
     * @param {boolean} [loop=true] - Whether the animation should loop.
     */
    playAnimation(imgs, loop = true) {
        let i = this.currentImage % imgs.length;
        let path = imgs[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        if (this.currentImage >= imgs.length) {
            loop == true ? this.currentImage = 0 : this.currentImage = imgs.length - 1;
        }
    }

    /**
     * Makes the object jump by applying an upward force.
     * @param {number} [jumpForce=30] - Initial upward velocity.
     */
    jump(jumpForce = 30) {
        this.speedY = jumpForce;
    }
}
