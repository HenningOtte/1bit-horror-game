/**
 * @class StatusBar
 * @classdesc Represents a status bar element (health, coins, fire, or endboss).
 * 
 * The status bar displays a percentage value visually using
 * pre-defined image variants based on its type.
 * 
 * Extends {@link DrawableObject} to draw the correct image on the canvas.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * Contains file paths for each status bar variant and percentage level.
     * @type {Object.<string, string[]>}
     */
    BAR_VARIANTS = {
        health: [
            './img/7_statusbars/2_statusbar_health/0.png',
            './img/7_statusbars/2_statusbar_health/20.png',
            './img/7_statusbars/2_statusbar_health/40.png',
            './img/7_statusbars/2_statusbar_health/60.png',
            './img/7_statusbars/2_statusbar_health/80.png',
            './img/7_statusbars/2_statusbar_health/100.png',
        ],
        coin: [
            './img/7_statusbars/1_statusbar_coin/0.png',
            './img/7_statusbars/1_statusbar_coin/20.png',
            './img/7_statusbars/1_statusbar_coin/40.png',
            './img/7_statusbars/1_statusbar_coin/60.png',
            './img/7_statusbars/1_statusbar_coin/80.png',
            './img/7_statusbars/1_statusbar_coin/100.png'
        ],
        fire: [
            './img/7_statusbars/3_statusbar_fire/0.png',
            './img/7_statusbars/3_statusbar_fire/20.png',
            './img/7_statusbars/3_statusbar_fire/40.png',
            './img/7_statusbars/3_statusbar_fire/60.png',
            './img/7_statusbars/3_statusbar_fire/80.png',
            './img/7_statusbars/3_statusbar_fire/100.png'
        ],
        endboss: [
            './img/7_statusbars/4_endboss/0.png',
            './img/7_statusbars/4_endboss/20.png',
            './img/7_statusbars/4_endboss/40.png',
            './img/7_statusbars/4_endboss/60.png',
            './img/7_statusbars/4_endboss/80.png',
            './img/7_statusbars/4_endboss/100.png'
        ]
    };

    /** Current percentage value represented by the bar (0–100). @type {number} */
    percentage = 100;

    /** Type of status bar ('health', 'coin', 'fire', or 'endboss'). @type {string} */
    variant;

    /**
     * Creates a new status bar element and initializes its appearance.
     * 
     * @constructor
     * @param {number} x - X position on the canvas.
     * @param {number} y - Y position on the canvas.
     * @param {number} [percent=100] - Initial fill percentage (0–100).
     * @param {'health'|'coin'|'fire'|'endboss'} [variant='health'] - Type of the bar.
     * @param {number} [width=124] - Bar width in pixels.
     * @param {number} [height=32] - Bar height in pixels.
     */
    constructor(x, y, percent = 100, variant = 'health', width = 124, height = 32) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.variant = variant;
        this.percentage = percent;
        this.setVariant();
        this.setPercentage(percent);
    }

    /**
     * Loads the correct image set for the selected variant
     * (health, coin, fire, or endboss).
     * @method setVariant
     */
    setVariant() {
        const images = this.BAR_VARIANTS[this.variant];
        this.loadImages(images);
    }

    /**
     * Updates the displayed bar image based on the given percentage.
     * @method setPercentage
     * @param {number} percent - The new percentage value (0–100).
     */
    setPercentage(percent) {
        this.percentage = percent;
        const path = this.BAR_VARIANTS[this.variant][this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves which image index corresponds to the current percentage.
     * @method resolveImageIndex
     * @returns {number} The index of the correct image variant.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}
