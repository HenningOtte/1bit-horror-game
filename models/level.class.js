class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    level_end_x = 720 * 4 + 90;

    constructor(enemies, clouds, backgroundObjects, coins, fireballs) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusbar = statusbar;
        this.coins = coins;
        this.fireballs = fireballs;
    };
}