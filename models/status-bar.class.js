class StatusBar extends DrawableObject {
    BAR_VARIANTS = {
        health: [
            '../img/7_statusbars/1_statusbar/2_statusbar_health/0.png',
            '../img/7_statusbars/1_statusbar/2_statusbar_health/20.png',
            '../img/7_statusbars/1_statusbar/2_statusbar_health/40.png',
            '../img/7_statusbars/1_statusbar/2_statusbar_health/60.png',
            '../img/7_statusbars/1_statusbar/2_statusbar_health/80.png',
            '../img/7_statusbars/1_statusbar/2_statusbar_health/100.png',
        ],
        coin: [
            '../img/7_statusbars/1_statusbar/1_statusbar_coin/0.png',
            '../img/7_statusbars/1_statusbar/1_statusbar_coin/20.png',
            '../img/7_statusbars/1_statusbar/1_statusbar_coin/40.png',
            '../img/7_statusbars/1_statusbar/1_statusbar_coin/60.png',
            '../img/7_statusbars/1_statusbar/1_statusbar_coin/80.png',
            '../img/7_statusbars/1_statusbar/1_statusbar_coin/100.png'
        ]
    };
    
    width = 49 * 3;
    height = 13 * 3;
    percentage = 100;

    constructor(x, y, percent = 100, variant = 'health') {
        super();
        this.x = x;
        this.y = y;
        this.variant = variant;
        this.setVariant();
        this.setPercentage(percent);
    }

    setVariant() {
        let images = this.BAR_VARIANTS[this.variant];
        this.loadImages(images);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.BAR_VARIANTS[this.variant][this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}