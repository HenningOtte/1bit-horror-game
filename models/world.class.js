class World {
    character = new Character();
    statusHealth = new StatusBar(10, 10, 100, 'health');
    statusCoin = new StatusBar(10, 53, 0, 'coin');
    statusFire = new StatusBar(10, 96, 0, 'fire');
    statusEndboss = new StatusBar(268, 53, 100, 'endboss', 188, 60);
    throwableObjects = [];
    intervalIDs = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    gameOver = false;

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
        Game.setStoppableInterval(() => {
            this.checkCollisions();
            this.chechTrowObjects();
            this.checkPlayerPosition();
            this.checkGameOver();
        }, 1000 / 30);
    }

    checkGameOver() {
        if (this.gameOver) return;
        if (this.character.isDead()) this.playerLost();
        if (this.getEndboss().isDead()) this.playerWon();
    }

    playerLost() {
        this.gameOver = true;
        setTimeout(async () => {
            Game.stopGame();
            Game.handleGameResult(false);
        }, 2000);

    }

    playerWon() {
        Game.playSoundEffect(Game.sounds.dying, false);
        this.gameOver = true;
        setTimeout(async () => {
            Game.stopGame();
            Game.handleGameResult(true);
        }, 2000);
    }

    checkPlayerPosition() {
        const boss = this.getEndboss();
        if (boss.firstContact) return;
        if (this.character.x >= boss.triggerX) {
            boss.firstContact = true;
        }
    }

    chechTrowObjects() {
        if (this.keyboard.D && this.character.canThrow()) {
            const direction = this.character.otherDirection ? -1 : 1;
            let fireball = new ThrowableObject(this.character.x + 100, this.character.y + 50, direction);
            this.throwableObjects.push(fireball);
            this.character.recordThrow();
            this.updateFireAmmoStatus(-1);
            Game.playSoundEffect(Game.sounds.shoot);
        }
    }

    updateFireAmmoStatus(ammount = 1) {
        this.character.ammo += ammount;
        this.statusFire.percentage += ammount * 20;
        this.statusFire.setPercentage(this.statusFire.percentage);
    }

    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkFireballItemCollisions();
        this.checkFireballCollisions();
        this.startEndbossAi();
    }

    getEndboss() {
        return this.level.enemies.find(enemy => enemy instanceof Endboss);
    }

    startEndbossAi() {
        this.getEndboss().updateEndbossBehavior(this.character);
    }

    checkFireballCollisions() {
        this.throwableObjects.forEach((fireball, index) => {
            let enemy = this.findCollidingEnemy(fireball);
            if (enemy) this.resolveFireballHit(index, enemy);
        });
    }

    resolveFireballHit(fireballIndex, enemy) {
        this.throwableObjects.splice(fireballIndex, 1);
        enemy.hit(20);

        if (enemy instanceof Endboss) {
            if (!enemy.isDead()) Game.playSoundEffect(Game.sounds.hurt);
            this.updateEndbossStatus();
        }
        if (enemy.isDead() && enemy instanceof Skeleton) {
            Game.playSoundEffect(Game.sounds.skeleton_dead);
        }
    }

    updateEndbossStatus() {
        this.statusEndboss.percentage -= 20;
        this.statusEndboss.setPercentage(this.statusEndboss.percentage);
    }

    findCollidingEnemy(fireball) {
        return this.level.enemies.find(e => !e.isDead() && e.isColliding(fireball)) || null;
    }

    checkFireballItemCollisions() {
        if (this.character.ammo >= 5) return

        this.level.fireballs.forEach((fireball, index) => {
            if (this.character.isColliding(fireball)) {
                this.updateFireAmmoStatus(1);
                this.level.fireballs.splice(index, 1);
                Game.playSoundEffect(Game.sounds.coinSound);
            }
        });
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.statusCoin.percentage += 10;
                this.statusCoin.setPercentage(this.statusCoin.percentage);
                this.level.coins.splice(index, 1);
                Game.playSoundEffect(Game.sounds.coinSound);
            }
        });
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (enemy.isDead()) return;

                if (this.character.isJumpingOn(enemy)) {
                    this.character.jump(15);
                    enemy.hit(20);
                    Game.playSoundEffect(Game.sounds.jumpOn);
                } else {
                    this.character.hit(1);
                    Game.playSoundEffect(Game.sounds.playerHurt, false);
                    this.statusHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed objects -----
        this.addToMap(this.statusHealth);
        this.addToMap(this.statusCoin);
        this.addToMap(this.statusFire);
        if (this.getEndboss().firstContact) this.addToMap(this.statusEndboss);
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