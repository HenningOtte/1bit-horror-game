let level1;

function initLevel() {
    level1 = new Level(
        [
            new Skeleton(),
            new Skeleton(),
            new Skeleton(),
            new Skeleton(),
            new Skeleton(),
            new Skeleton(),
            new Skeleton(),
            new Skeleton(),
            new Skeleton(),
            new Endboss()
        ],
        [
            new Cloud(130, 32, 0),
            new Cloud(206, 54, 1),
            new Cloud(380, 92, 2),
            new Cloud(130, 32, 0),
            new Cloud(206, 54, 1),
            new Cloud(380, 92, 2),
            new Cloud(130, 32, 0),
            new Cloud(206, 54, 1),
            new Cloud(380, 92, 2),
            new Cloud(130, 32, 0),
            new Cloud(206, 54, 1),
            new Cloud(380, 92, 2),
            new Cloud(130, 32, 0),
            new Cloud(206, 54, 1),
            new Cloud(380, 92, 2),
            new Cloud(130, 32, 0),
            new Cloud(206, 54, 1),
            new Cloud(380, 92, 2),
        ],
        [
            new BackgroundObject(`../img/5_background/layers/3_third_Layer/1.png`, -719),
            new BackgroundObject(`../img/5_background/layers/2_second_Layer/1.png`, -719),
            new BackgroundObject(`../img/5_background/layers/1_first_Layer/2.png`, -719),

            new BackgroundObject(`../img/5_background/layers/3_third_Layer/2.png`, 0),
            new BackgroundObject(`../img/5_background/layers/2_second_Layer/2.png`, 0),
            new BackgroundObject(`../img/5_background/layers/1_first_Layer/2.png`, 0),

            new BackgroundObject(`../img/5_background/layers/3_third_Layer/1.png`, 719),
            new BackgroundObject(`../img/5_background/layers/2_second_Layer/1.png`, 719),
            new BackgroundObject(`../img/5_background/layers/1_first_Layer/1.png`, 719),

            new BackgroundObject(`../img/5_background/layers/3_third_Layer/2.png`, 719 * 2),
            new BackgroundObject(`../img/5_background/layers/2_second_Layer/2.png`, 719 * 2),
            new BackgroundObject(`../img/5_background/layers/1_first_Layer/2.png`, 719 * 2),

            new BackgroundObject(`../img/5_background/layers/3_third_Layer/1.png`, 719 * 3),
            new BackgroundObject(`../img/5_background/layers/2_second_Layer/1.png`, 719 * 3),
            new BackgroundObject(`../img/5_background/layers/1_first_Layer/1.png`, 719 * 3),

            new BackgroundObject(`../img/5_background/layers/3_third_Layer/2.png`, 719 * 4),
            new BackgroundObject(`../img/5_background/layers/2_second_Layer/2.png`, 719 * 4),
            new BackgroundObject(`../img/5_background/layers/1_first_Layer/2.png`, 719 * 4),
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        [
            new FireballItem(),
            new FireballItem(),
            new FireballItem(),
            new FireballItem(),
            new FireballItem(),
            new FireballItem(),
            new FireballItem(),            
            new FireballItem(),            
            new FireballItem(),
            new FireballItem(),
        ]
    );

}