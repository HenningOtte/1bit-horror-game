class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    level_end_x = 720 * 3 + 90;

    constructor(enemies, clouds, backgroundObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusbar = statusbar;
        this.coins = coins;
    };
}