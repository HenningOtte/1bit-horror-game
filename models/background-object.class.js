/**
 * @class BackgroundObject
 * @classdesc Represents a static background layer element in the game world.
 * Used to create parallax scrolling and layered scenery.
 * Inherits image loading and drawing behavior from {@link MoveableObject}.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
    /** 
     * Width of the background image in pixels.
     * @type {number} 
     */
    width = 720;

    /** 
     * Height of the background image in pixels.
     * @type {number} 
     */
    height = 480;

    /**
     * Creates a new background object and positions it at the bottom of the canvas.
     * @constructor
     * @param {string} imagePatch - Path to the background image file.
     * @param {number} x - Horizontal position of the background segment.
     */
    constructor(imagePatch, x) {
        super();
        this.loadImage(imagePatch);
        this.x = x;
        this.y = 480 - this.height;
    }
}