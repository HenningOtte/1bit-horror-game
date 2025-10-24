/**
 * @class Level
 * @classdesc Represents a game level containing all entities and environment objects.
 * 
 * Holds references to enemies, clouds, background objects, and collectibles.
 * Used to build and manage the state of the current level.
 */
class Level {
    /**
     * All enemies present in the level (e.g., {@link Skeleton}, {@link Endboss}).
     * @type {MoveableObject[]}
     */
    enemies;

    /**
     * Cloud objects used for parallax background movement.
     * @type {Cloud[]}
     */
    clouds;

    /**
     * Static background layers and scenery objects.
     * @type {DrawableObject[]}
     */
    backgroundObjects;

    /**
     * Collectible coins placed throughout the level.
     * @type {Coin[]}
     */
    coins;

    /**
     * Fireball collectibles that replenish the player's ammo.
     * @type {ThrowableObject[]}
     */
    fireballs;

    /**
     * The horizontal end boundary of the level.
     * Determines when the player reaches the end.
     * @type {number}
     */
    level_end_x = 720 * 4 + 90;

    /**
     * Creates a new Level instance with the given game elements.
     * 
     * @constructor
     * @param {MoveableObject[]} enemies - Array of enemy objects.
     * @param {Cloud[]} clouds - Array of cloud objects.
     * @param {DrawableObject[]} backgroundObjects - Array of background layers or scenery.
     * @param {Coin[]} coins - Array of collectible coins.
     * @param {ThrowableObject[]} fireballs - Array of throwable fireball items.
     */
    constructor(enemies, clouds, backgroundObjects, coins, fireballs) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.fireballs = fireballs;
    }
}
