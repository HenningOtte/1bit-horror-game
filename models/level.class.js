/**
 * Represents a game level containing all entities and environment objects.
 * 
 * Holds references to enemies, clouds, background objects, and collectibles.
 * Used to build and manage the state of the current level.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    level_end_x = 720 * 4 + 90;

    /**
     * Creates a new Level instance with the given game elements.
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
        this.statusbar = statusbar;
        this.coins = coins;
        this.fireballs = fireballs;
    };
}
