class Character extends MoveableObject {
    height = 105;
    y = 279;
    speed = 10;
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
        '../img/2_character_jimmy/3_jump/4.png',
    ];
    world;

    constructor() {
        super();
        this.loadImage('../img/2_character_jimmy/2_walk/1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 100);
    }
}