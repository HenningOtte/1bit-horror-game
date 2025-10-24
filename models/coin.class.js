/**
 * @class Coin
 * @classdesc Represents a collectible coin that rotates continuously.
 * 
 * Coins are randomly positioned within the level and increase the player's score
 * or coin counter when collected.
 * Inherits animation and rendering logic from {@link MoveableObject}.
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
    /**
     * The vertical position of the coin in pixels.
     * @type {number}
     */
    y = 320;

    /**
     * The height of the coin sprite in pixels.
     * @type {number}
     */
    height = 24 * 2;

    /**
     * The width of the coin sprite in pixels.
     * @type {number}
     */
    width = 24 * 2;

    /**
     * Array of file paths representing the coin’s rotation animation frames.
     * @type {string[]}
     */
    IMAGES_ROTATING = [
        './img/8_coin/1.png',
        './img/8_coin/2.png',
        './img/8_coin/3.png',
        './img/8_coin/4.png',
        './img/8_coin/5.png',
        './img/8_coin/6.png',
        './img/8_coin/7.png'
    ];

    /**
     * Creates a new Coin instance with random horizontal position.
     * Loads rotation images and starts the animation loop.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('./img/8_coin/1.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.x = 200 + Math.random() * 2000;
        this.animate();
    }

    /**
     * Starts the coin’s rotation animation loop.
     * Updates the displayed frame roughly ten times per second.
     * @method animate
     */
    animate() {
        Game.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_ROTATING);
        }, 1000 / 10);
    }
}
