class Character extends MoveableObject {
    height = 108;
    y = 276;
    speed = 10;
    IMAGES_WALKING = [
        '../img/2_character_jimmy/2_walk/1.png',
        '../img/2_character_jimmy/2_walk/2.png',
        '../img/2_character_jimmy/2_walk/3.png',
        '../img/2_character_jimmy/2_walk/4.png',
        '../img/2_character_jimmy/2_walk/5.png',
        '../img/2_character_jimmy/2_walk/6.png',
    ];
    world;

    constructor() {
        super();
        this.loadImage('../img/2_character_jimmy/2_walk/1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    jump() {
    }
}