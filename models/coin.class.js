/**
 * Represents a collectible coin that rotates continuously.
 * 
 * Coins are randomly positioned within the level and increase the player's score
 * or coin counter when collected.
 * Inherits animation and rendering logic from {@link MoveableObject}.
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
    y = 320;
    height = 24 * 2;
    width = 24 * 2;

    IMAGES_ROTATING = [
        './img/8_coin/1.png',
        './img/8_coin/2.png',
        './img/8_coin/3.png',
        './img/8_coin/4.png',
        './img/8_coin/5.png',
        './img/8_coin/6.png',
        './img/8_coin/7.png'
    ];

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
