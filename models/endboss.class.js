/**
 * @class Endboss
 * @classdesc Represents the final boss enemy in the game.
 * Handles sprite animation, attack behavior, and movement toward the player.
 * Inherits movement and collision logic from {@link MoveableObject}.
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {
    /**
     * Vertical position of the boss in the world (pixels).
     * @type {number}
     */
    y = 134;

    /**
     * Horizontal position of the boss in the world (pixels).
     * @type {number}
     */
    x = 3200;

    /**
     * Height of the boss sprite in pixels.
     * @type {number}
     */
    height = 130 * 2;

    /**
     * Width of the boss sprite in pixels.
     * @type {number}
     */
    width = 160 * 2;

    /**
     * Movement speed of the boss.
     * @type {number}
     */
    speed = 4;

    /**
     * Indicates whether the player has reached the boss area and triggered combat.
     * @type {boolean}
     */
    firstContact = false;

    /**
     * Current health or energy level of the boss (0–100).
     * @type {number}
     */
    energy = 100;

    /**
     * X-coordinate at which the boss battle is triggered.
     * @type {number}
     */
    triggerX = 2700;

    /**
     * Collision offset for hitbox detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 68,
        left: 70,
        right: 70,
        bottom: 10
    };

    /**
     * Image paths for the boss walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/4_enemie_boss_neuron/1_walk/G1.png',
        './img/4_enemie_boss_neuron/1_walk/G2.png',
        './img/4_enemie_boss_neuron/1_walk/G3.png',
        './img/4_enemie_boss_neuron/1_walk/G4.png',
        './img/4_enemie_boss_neuron/1_walk/G5.png',
        './img/4_enemie_boss_neuron/1_walk/G6.png',
    ];

    /**
     * Image paths for the boss death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './img/4_enemie_boss_neuron/5_dead/G1.png',
        './img/4_enemie_boss_neuron/5_dead/G2.png',
        './img/4_enemie_boss_neuron/5_dead/G3.png',
        './img/4_enemie_boss_neuron/5_dead/G4.png',
        './img/4_enemie_boss_neuron/5_dead/G5.png'
    ];

    /**
     * Image paths for the boss hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        './img/4_enemie_boss_neuron/4_hurt/G1.png',
        './img/4_enemie_boss_neuron/4_hurt/G2.png',
        './img/4_enemie_boss_neuron/4_hurt/G3.png'
    ];

    /**
     * Image paths for the boss attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        './img/4_enemie_boss_neuron/3_attack/G1.png',
        './img/4_enemie_boss_neuron/3_attack/G2.png',
        './img/4_enemie_boss_neuron/3_attack/G3.png',
        './img/4_enemie_boss_neuron/3_attack/G4.png'
    ];

    /**
     * Image paths for the boss idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        './img/4_enemie_boss_neuron/6_idle/G1.png',
        './img/4_enemie_boss_neuron/6_idle/G2.png',
        './img/4_enemie_boss_neuron/6_idle/G3.png',
        './img/4_enemie_boss_neuron/6_idle/G4.png'
    ];

    /**
     * Creates a new Endboss instance and preloads all related animations.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
    };

    /**
     * Determines and plays the correct animation sequence based on
     * the boss's current state (dead, hurt, attacking, idle, or walking).
     * @method startSpriteLoop
     */
    startSpriteLoop() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD, false);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT, false);
        } else if (this.attack) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (!this.moving) {
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    };

    /**
     * Starts the sprite animation loop for the boss.
     * Updates animation frames approximately every 240 ms.
     * @method animate
     */
    animate() {
        Game.setStoppableInterval(() => {
            this.startSpriteLoop();
        }, 240);
    }

    /**
    * Updates the boss's movement and behavior based on the target (player) position.
    * Handles attacking, chasing, and stopping logic.
    *
    * @method updateEndbossBehavior
    * @param {MoveableObject} target - The player or target entity to chase or attack.
    * @returns {void}
    */
    updateEndbossBehavior(target) {
        if (!this.firstContact) return;

        if (this.isDead() || target.isDead()) {
            this.stopBehavior();
            return;
        }

        if (this.isColliding(target)) {
            this.enterAttackState();
            return;
        }

        this.updateDirektion(target);
    }

    /**
     * Sets the boss into attack mode and stops its movement.
     *
     * @method enterAttackState
     * @returns {void}
     */
    enterAttackState() {
        this.attack = true;
        this.moving = false;
    }

    /**
     * Updates the boss's horizontal movement direction relative to the target.
     * Moves left or right based on target position and updates facing direction and state flags.
     *
     * @method updateDirektion
     * @param {MoveableObject} target - The target to follow or move towards.
     * @returns {void}
     */
    updateDirektion(target) {
        const directionX = Math.sign(target.x - this.x);

        if (directionX < 0) {
            this.moveLeft();
            this.otherDirection = false;
        } else if (directionX > 0) {
            this.moveRight();
            this.otherDirection = true;
        }

        this.attack = false;
        this.moving = directionX !== 0;
    }

    /**
     * Stops all boss actions (attack and movement) and sets it inactive.
     * Typically used after death or player defeat.
     * @method stopBehavior
     */
    stopBehavior() {
        this.attack = false;
        this.moving = false;
        this.active = false;
    }
}