class Rat extends MoveableObject {
    y = 303
    height = 27*3;
    width = 24*3;
    IMAGES_WALKING = [
        '../img/3_enemies_robot/1_walk/1.png',
        '../img/3_enemies_robot/1_walk/2.png',
        '../img/3_enemies_robot/1_walk/3.png',
        '../img/3_enemies_robot/1_walk/4.png',
    ];
    
    currentImage = 0;

    constructor() {
        super();
        this.loadImage('../img/3_enemies_robot/1_walk/1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500;
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
}