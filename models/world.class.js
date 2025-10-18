class World {
    character = new Character();
    statusHealth = new StatusBar(10, 10, 100, 'health');
    statusCoin = new StatusBar(10, 53, 0, 'coin');
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.chechTrowObjects();
        }, 1000 / 30);
    }

    chechTrowObjects() {
        if (this.keyboard.D && this.character.canThrow()) {
            let fireball = new ThrowableObject(this.character.x + 100, this.character.y + 50);
            this.throwableObjects.push(fireball);
            this.character.recordThrow();
            this.character.ammo -= 1;
        }
    }

    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkFireballItemCollisions();
        this.checkFireballCollisions();
        this.updateEndbossBehavior();
    }

    getEndboss() {
        return this.level.enemies.find(enemy => enemy instanceof Endboss);
    }

    updateEndbossBehavior() {
        const boss = this.getEndboss();

        if (!boss || !this.character) return;

        if (boss.isDead() || this.character.isDead()) {
            boss.attack = false;
            boss.moving = false;
            return;
        }

        if (boss.isColliding(this.character)) {
            boss.attack = true;
            boss.moving = false;
            return;
        }

        const directionX = Math.sign(this.character.x - boss.x);

        if (directionX < 0) {
            boss.moveLeft();
            boss.otherDirection = false;
        } else if (directionX > 0) {
            boss.moveRight();
            boss.otherDirection = true;
        }

        boss.attack = false;
        boss.moving = directionX !== 0;
    }

    checkFireballCollisions() {
        const boss = this.getEndboss();
        if (!boss) return;

        this.throwableObjects.forEach((fireball, index) => {
            if (boss.isColliding(fireball)) {
                this.throwableObjects.splice(index, 1);
                boss.hit(20);
            }
        });
    }

    checkFireballItemCollisions() {
        this.level.fireballs.forEach((fireball, index) => {
            if (this.character.isColliding(fireball)) {
                this.character.ammo += 1;
                this.level.fireballs.splice(index, 1);
            }
        });
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isJumpingOn(enemy)) {
                    this.character.jump(15);
                    this.level.enemies.splice(index, 1);
                } else {
                    if (enemy.isDead()) return;
                    this.character.hit(1);
                    this.statusHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.statusCoin.percentage += 10;
                this.statusCoin.setPercentage(this.statusCoin.percentage);
                this.level.coins.splice(index, 1);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed objects -----
        this.addToMap(this.statusHealth);
        this.addToMap(this.statusCoin);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.fireballs);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() called again and again
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        try {
            mo.draw(this.ctx);
            // mo.drawFrame(this.ctx, this.x, this.y, this.width, this.height)

        } catch (error) {
            console.error(error);
        }

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}