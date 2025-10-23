/**
 * Represents any object that can move within the game world.
 * 
 * Extends {@link DrawableObject} to add movement, gravity, physics,
 * collision detection, and animation capabilities.
 * 
 * This class is the base for entities like the player, enemies, and throwable objects.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
    x = 100;
    y = 244;
    img;
    height = 105;
    width = 78;
    imageCache = {};
    currentImage = 0;
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    energy = 100;
    lastHit = 0;
    lastThrow = 0;
    ammo = 0;
    attack = false;
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

    /**
     * Moves the object to the right based on its current speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left based on its current speed.
     */
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