class Character extends MoveableObject {
    height = 108;
    y = 276;
    IMAGES_WALKING = [
        '../img/2_character_jimmy/2_walk/1.png',
        '../img/2_character_jimmy/2_walk/2.png',
        '../img/2_character_jimmy/2_walk/3.png',
        '../img/2_character_jimmy/2_walk/4.png',
        '../img/2_character_jimmy/2_walk/5.png',
        '../img/2_character_jimmy/2_walk/6.png',
    ];

    currentImage = 0;

    constructor() {
        super();
        this.loadImage('../img/2_character_jimmy/2_walk/1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();        
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }

    jump() {
    }
}