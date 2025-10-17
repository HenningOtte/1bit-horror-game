class Character extends MoveableObject {
    height = 72 * 2;
    width = 64 * 2;
    y = 244;
    speed = 10;
    offset = {
        top: 5,
        left: 30,
        right: 30,
        bottom: 5
    };
    IMAGES_WALKING = [
        '../img/2_character_jimmy/2_walk/1.png',
        '../img/2_character_jimmy/2_walk/2.png',
        '../img/2_character_jimmy/2_walk/3.png',
        '../img/2_character_jimmy/2_walk/4.png',
        '../img/2_character_jimmy/2_walk/5.png',
        '../img/2_character_jimmy/2_walk/6.png'
    ];
    IMAGES_JUMPING = [
        '../img/2_character_jimmy/3_jump/1.png',
        '../img/2_character_jimmy/3_jump/2.png',
        '../img/2_character_jimmy/3_jump/3.png',
        '../img/2_character_jimmy/3_jump/4.png'
    ];
    IMAGES_HURT = [
        '../img/2_character_jimmy/4_hurt/1.png',
        '../img/2_character_jimmy/4_hurt/2.png'
    ];
    IMAGES_DEAD = [
        '../img/2_character_jimmy/5_dead/1.png',
        '../img/2_character_jimmy/5_dead/2.png',
        '../img/2_character_jimmy/5_dead/3.png',
        '../img/2_character_jimmy/5_dead/4.png',
        '../img/2_character_jimmy/5_dead/5.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_jimmy/1_idle/1.png',
        'img/2_character_jimmy/1_idle/2.png',
        'img/2_character_jimmy/1_idle/3.png',
        'img/2_character_jimmy/1_idle/4.png',
        'img/2_character_jimmy/1_idle/5.png'
    ];
    world;

    constructor() {
        super();
        this.loadImage('../img/2_character_jimmy/2_walk/1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x &&
                !this.isDead()
            ) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT &&
                this.x > 0 &&
                !this.isDead()
            ) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.SPACE &&
                !this.isAboveGround() &&
                !this.isDead()
            ) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD, false);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 100);
    }
}