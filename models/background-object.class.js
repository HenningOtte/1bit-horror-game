class BackgroundObject extends MoveableObject {
    width = 720;
    height = 480;
    constructor(imagePatch, x, y) {
        super();
        this.loadImage(imagePatch);
        this.x = x;
        this.y = 480 - this.height;
    }
}