class Endboss extends MoveableObject {
    y = 134;
    x = 3200;
    height = 130 * 2;
    width = 160 * 2;
    speed = 4;
    firstContact = false;
    energy = 100;
    triggerX = 2700;

    offset = {
        top: 68,
        left: 70,
        right: 70,
        bottom: 10
    };

    IMAGES_WALKING = [
        './img/4_enemie_boss_neuron/1_walk/G1.png',
        './img/4_enemie_boss_neuron/1_walk/G2.png',
        './img/4_enemie_boss_neuron/1_walk/G3.png',
        './img/4_enemie_boss_neuron/1_walk/G4.png',
        './img/4_enemie_boss_neuron/1_walk/G5.png',
        './img/4_enemie_boss_neuron/1_walk/G6.png',
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_neuron/5_dead/G1.png',
        './img/4_enemie_boss_neuron/5_dead/G2.png',
        './img/4_enemie_boss_neuron/5_dead/G3.png',
        './img/4_enemie_boss_neuron/5_dead/G4.png',
        './img/4_enemie_boss_neuron/5_dead/G5.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_neuron/4_hurt/G1.png',
        './img/4_enemie_boss_neuron/4_hurt/G2.png'
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_neuron/3_attack/G1.png',
        './img/4_enemie_boss_neuron/3_attack/G2.png',
        './img/4_enemie_boss_neuron/3_attack/G3.png',
        './img/4_enemie_boss_neuron/3_attack/G4.png'
    ];

    IMAGES_IDLE = [
        './img/4_enemie_boss_neuron/6_idle/G1.png',
        './img/4_enemie_boss_neuron/6_idle/G2.png',
        './img/4_enemie_boss_neuron/6_idle/G3.png',
        './img/4_enemie_boss_neuron/6_idle/G4.png'
    ];

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

    animate() {
        Game.setStoppableInterval(() => {
            this.startSpriteLoop();
        }, 240)
    }

    updateEndbossBehavior(target) {
        if (!this.firstContact) return;

        if (this.isDead() || target.isDead()) {
            this.attack = false;
            this.moving = false;
            this.active = false;
            return;
        }

        if (this.isColliding(target)) {
            this.attack = true;
            this.moving = false;
            return;
        }

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
}