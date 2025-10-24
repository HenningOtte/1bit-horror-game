/**
 * @class Character
 * @classdesc Represents the main controllable character of the game.
 * Handles movement, animation states, and gravity.
 * Inherits core movement and physics from {@link MoveableObject}.
 * @extends MoveableObject
 */
class Character extends MoveableObject {
    /** 
     * Character height in pixels. 
     * @type {number} 
     */
    height = 72 * 2;

    /** 
     * Character width in pixels. 
     * @type {number} 
     */
    width = 64 * 2;

    /** 
     * Initial vertical position (Y-axis). 
     * @type {number} 
     */
    y = 244;

    /** 
     * Horizontal movement speed of the character. 
     * @type {number} 
     */
    speed = 10;

    /**
     * Collision offset boundaries for hit detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 5,
        left: 30,
        right: 30,
        bottom: 5
    };

    /** 
     * Image paths for walking animation frames. 
     * @type {string[]} 
     */
    IMAGES_WALKING = [
        './img/2_character_jimmy/2_walk/1.png',
        './img/2_character_jimmy/2_walk/2.png',
        './img/2_character_jimmy/2_walk/3.png',
        './img/2_character_jimmy/2_walk/4.png',
        './img/2_character_jimmy/2_walk/5.png',
        './img/2_character_jimmy/2_walk/6.png'
    ];

    /** 
     * Image paths for jumping animation frames. 
     * @type {string[]} 
     */
    IMAGES_JUMPING = [
        './img/2_character_jimmy/3_jump/1.png',
        './img/2_character_jimmy/3_jump/2.png',
        './img/2_character_jimmy/3_jump/3.png',
        './img/2_character_jimmy/3_jump/4.png'
    ];

    /** 
     * Image paths for hurt animation frames. 
     * @type {string[]} 
     */
    IMAGES_HURT = [
        './img/2_character_jimmy/4_hurt/1.png',
        './img/2_character_jimmy/4_hurt/2.png',
        './img/2_character_jimmy/4_hurt/3.png',
        './img/2_character_jimmy/4_hurt/4.png',
        './img/2_character_jimmy/4_hurt/5.png'
    ];

    /** 
     * Image paths for death animation frames. 
     * @type {string[]} 
     */
    IMAGES_DEAD = [
        './img/2_character_jimmy/5_dead/1.png',
        './img/2_character_jimmy/5_dead/2.png',
        './img/2_character_jimmy/5_dead/3.png',
        './img/2_character_jimmy/5_dead/4.png',
        './img/2_character_jimmy/5_dead/5.png'
    ];

    /** 
     * Image paths for idle animation frames. 
     * @type {string[]} 
     */
    IMAGES_IDLE = [
        './img/2_character_jimmy/1_idle/1.png',
        './img/2_character_jimmy/1_idle/2.png',
        './img/2_character_jimmy/1_idle/3.png',
        './img/2_character_jimmy/1_idle/4.png',
        './img/2_character_jimmy/1_idle/5.png'
    ];

    /** 
     * Reference to the active {@link World} instance. 
     * @type {World} 
     */
    world;

    /**
     * Creates a new Character instance, loads all animations,
     * applies gravity, and starts the animation loops.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('./img/2_character_jimmy/2_walk/1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Handles keyboard input and character movement logic.
     * Moves left/right and triggers jump if applicable.
     * Updates the camera position based on the character’s X-position.
     * @method startControlLoop
     */
    startControlLoop() {
        if (this.shouldMoveRight()) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.shouldMoveLeft()) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.shouldJump()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
    * Checks if the character should move right.
    * @returns {boolean}
    */
    shouldMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead();
    }

    /**
    * Checks if the character should move left.
    * @returns {boolean}
    */
    shouldMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0 && !this.isDead();
    }

    /**
    * Checks if the character should jump.
    * @returns {boolean}
    */
    shouldJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDead();
    }

    /**
     * Handles character sprite animation frames depending on state:
     * idle, walking, jumping, hurt, or dead.
     * @method startSpriteLoop
     */
    startSpriteLoop() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD, false);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING, false);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
    }

    /**
     * Initializes the animation and control loops.
     * - Control loop runs at 60 FPS.
     * - Sprite loop updates every 100 ms.
     * @method animate
     */
    animate() {
        Game.setStoppableInterval(() => this.startControlLoop(), 1000 / 60);
        Game.setStoppableInterval(() => this.startSpriteLoop(), 100);
    }
}