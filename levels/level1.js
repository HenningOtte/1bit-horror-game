const level1 = new Level(
    [
        new Skeleton(),
        new Skeleton(),
        new Skeleton(),
        new Endboss()
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ],
    [
        new BackgroundObject(`../img/5_background/layers/air.png`, -719),
        new BackgroundObject(`../img/5_background/layers/3_third_Layer/1.png`, -719),
        new BackgroundObject(`../img/5_background/layers/2_second_Layer/1.png`, -719),
        new BackgroundObject(`../img/5_background/layers/1_first_Layer/2.png`, -719),

        new BackgroundObject(`../img/5_background/layers/air.png`, 0),
        new BackgroundObject(`../img/5_background/layers/3_third_Layer/2.png`, 0),
        new BackgroundObject(`../img/5_background/layers/2_second_Layer/2.png`, 0),
        new BackgroundObject(`../img/5_background/layers/1_first_Layer/2.png`, 0),

        new BackgroundObject(`../img/5_background/layers/air.png`, 719),
        new BackgroundObject(`../img/5_background/layers/3_third_Layer/1.png`, 719),
        new BackgroundObject(`../img/5_background/layers/2_second_Layer/1.png`, 719),
        new BackgroundObject(`../img/5_background/layers/1_first_Layer/1.png`, 719),

        new BackgroundObject(`../img/5_background/layers/air.png`, 719 * 2),
        new BackgroundObject(`../img/5_background/layers/3_third_Layer/2.png`, 719 * 2),
        new BackgroundObject(`../img/5_background/layers/2_second_Layer/2.png`, 719 * 2),
        new BackgroundObject(`../img/5_background/layers/1_first_Layer/2.png`, 719 * 2),

        new BackgroundObject(`../img/5_background/layers/air.png`, 719 * 3),
        new BackgroundObject(`../img/5_background/layers/3_third_Layer/1.png`, 719 * 3),
        new BackgroundObject(`../img/5_background/layers/2_second_Layer/1.png`, 719 * 3),
        new BackgroundObject(`../img/5_background/layers/1_first_Layer/1.png`, 719 * 3),
    ],
    [
        new Coin(),
        new Coin(),
        new Coin()
    ]
);