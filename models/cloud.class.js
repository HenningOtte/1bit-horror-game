/**
 * Represents a single cloud object in the background layer.
 * Clouds continuously move from right to left and loop across the level.
 * Inherits movement logic from {@link MoveableObject}.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
    speed = 0.6;
    
    IMAGES_CLOUDS = [
        './img/5_background/layers/4_clouds/Cloud_1.png',
        './img/5_background/layers/4_clouds/Cloud_2.png',
        './img/5_background/layers/4_clouds/Cloud_3.png',
    ];

    /**
     * Creates a new Cloud instance with random position and size.
     * Loads a random cloud image and starts its movement animation.
     *
     * @constructor
     * @param {number} [width=380] - The width of the cloud in pixels.
     * @param {number} [height=92] - The height of the cloud in pixels.
     * @param {number} [index=1] - Index of the image to load from {@link IMAGES_CLOUDS}.
     */
    constructor(width = 380, height = 92, index = 1) {
        super();
        this.loadImage(this.IMAGES_CLOUDS[index]);
        this.x = Math.random() * 3000;
        this.y = Math.random() * 40;
        this.animate();
        this.width = width;
        this.height = height;
    }

    /**
     * Starts the movement animation for the cloud.
     * Moves the cloud left continuously at a fixed frame rate.
     * @method animate
     */
    animate() {
        this.moveLeft();
        Game.setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 30);
    }
}
