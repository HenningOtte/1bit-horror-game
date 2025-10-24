/**
 * @class DrawableObject
 * @classdesc Base class for all drawable game objects.
 * Handles loading, caching, and drawing of images on the canvas.
 * Other visual objects (e.g. {@link Character}, {@link Skeleton}, {@link Endboss})
 * extend from this class to gain rendering functionality.
 */
class DrawableObject {
    /**
     * The image currently assigned to this drawable object.
     * @type {HTMLImageElement | null}
     */
    img;

    /**
     * A cache storing preloaded images, mapped by their file paths.
     * Used to quickly access animation frames.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * The index of the currently displayed animation frame.
     * @type {number}
     */
    currentImage = 0;

    /**
     * The horizontal position of the object in the game world.
     * @type {number}
     */
    x = 0;

    /**
     * The vertical position of the object in the game world.
     * @type {number}
     */
    y = 0;

    /**
     * The height of the object in pixels.
     * @type {number}
     */
    height = 105;

    /**
     * The width of the object in pixels.
     * @type {number}
     */
    width = 78;

    /**
     * Loads a single image and assigns it to this object.
     * @param {string} path - File path to the image.
     * @example
     * this.loadImage('./img/character.png');
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object's current image onto the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a blue collision/debug frame around the object
     * (only if it is a {@link Character}, {@link Skeleton}, or {@link Endboss}).
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Skeleton || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }

    /**
     * Preloads multiple images and stores them in {@link imageCache}.
     * Used for animation sequences.
     * @param {string[]} arr - Array of image file paths.
     * @example
     * this.loadImages(['walk1.png', 'walk2.png', 'walk3.png']);
     */
    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
