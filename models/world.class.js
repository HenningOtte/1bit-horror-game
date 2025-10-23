/**
 * Manages the active game world: entities, rendering, collisions, AI and game flow.
 * Coordinates character, enemies, items, camera, status bars and result screens.
 */
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

    /**
     * Creates a new world instance, binds canvas/context, sets references
     * and starts the render & update loops.
     * @param {HTMLCanvasElement} canvas - The target canvas element.
     * @param {Keyboard} keyboard - Keyboard input state reference.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Injects a back-reference so the character can access the world.
     * @method setWorld
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the fixed-update loop for gameplay checks (collisions, AI, etc.).
     * @method run
     */
    run() {
        Game.setStoppableInterval(() => {
            this.checkCollisions();
            this.chechTrowObjects();
            this.checkPlayerPosition();
            this.checkGameOver();
        }, 1000 / 30);
    }

    /**
     * Evaluates win/lose conditions and triggers end screens.
     * @method checkGameOver
     */
    checkGameOver() {
        if (this.gameOver) return;
        if (this.character.isDead()) this.playerLost();
        if (this.getEndboss().isDead()) this.playerWon();
    }

    /**
     * Handles player defeat flow (sound/stop/result screen).
     * @method playerLost
     */
    playerLost() {
        this.gameOver = true;
        setTimeout(async () => {
            Game.stopGame();
            Game.handleGameResult(false);
        }, 2000);

    }

    /**
     * Handles player victory flow (sound/stop/result screen).
     * @method playerWon
     */
    playerWon() {
        Game.playSoundEffect(Game.sounds.dying, false);
        this.gameOver = true;
        setTimeout(async () => {
            Game.stopGame();
            Game.handleGameResult(true);
        }, 2000);
    }

    /**
     * Starts the boss encounter once the player crosses the trigger X.
     * @method checkPlayerPosition
     */
    checkPlayerPosition() {
        const boss = this.getEndboss();
        if (boss.firstContact) return;
        if (this.character.x >= boss.triggerX) {
            boss.firstContact = true;
        }
    }

    /**
     * Spawns a fireball if input/conditions allow and updates ammo/status.
     * @method chechTrowObjects
     */
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

    /**
     * Adjusts character fire ammo and updates the fire status bar.
     * @method updateFireAmmoStatus
     * @param {number} [ammount=1] - Positive/negative change to ammo (1 step = 20% bar).
     */
    updateFireAmmoStatus(ammount = 1) {
        this.character.ammo += ammount;
        this.statusFire.percentage += ammount * 20;
        this.statusFire.setPercentage(this.statusFire.percentage);
    }

    /**
     * Runs all collision/interaction checks for this frame.
     * @method checkCollisions
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkFireballItemCollisions();
        this.checkFireballCollisions();
        this.startEndbossAi();
    }

    /**
     * Returns the single Endboss instance from the level.
     * @method getEndboss
     * @returns {Endboss} The endboss entity.
     */
    getEndboss() {
        return this.level.enemies.find(enemy => enemy instanceof Endboss);
    }

    /**
     * Updates the boss AI against the player character.
     * @method startEndbossAi
     */
    startEndbossAi() {
        this.getEndboss().updateEndbossBehavior(this.character);
    }

    /**
     * Resolves projectile (fireball) collisions with enemies.
     * @method checkFireballCollisions
     */
    checkFireballCollisions() {
        this.throwableObjects.forEach((fireball, index) => {
            let enemy = this.findCollidingEnemy(fireball);
            if (enemy) this.resolveFireballHit(index, enemy);
        });
    }

    /**
     * Applies damage/effects when a fireball hits an enemy and removes the projectile.
     * @method resolveFireballHit
     * @param {number} fireballIndex - Index of the fireball to remove.
     * @param {MoveableObject} enemy - The enemy that was hit.
     */
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

    /**
     * Decreases endboss status bar by one step after a hit.
     * @method updateEndbossStatus
     */
    updateEndbossStatus() {
        this.statusEndboss.percentage -= 20;
        this.statusEndboss.setPercentage(this.statusEndboss.percentage);
    }

    /**
     * Finds the first living enemy colliding with the given fireball.
     * @method findCollidingEnemy
     * @param {ThrowableObject} fireball - The projectile to test.
     * @returns {MoveableObject|null} The colliding enemy or null.
     */
    findCollidingEnemy(fireball) {
        return this.level.enemies.find(e => !e.isDead() && e.isColliding(fireball)) || null;
    }

    /**
     * Collects fireball items to increase ammo (up to cap) and plays SFX.
     * @method checkFireballItemCollisions
     */
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

    /**
     * Handles coin pickups, status updates and SFX.
     * @method checkCoinCollisions
     */
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

    /**
     * Resolves collisions between player and enemies (stomp/hurt logic).
     * @method checkEnemyCollisions
     */
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

    /**
 * Main render loop for the game world.
 * 
 * Clears the canvas, applies the camera transformation, renders
 * background layers, status bars, entities, and projectiles,
 * then schedules the next animation frame.
 * 
 * @method draw
 */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.renderBackground();
        this.ctx.translate(-this.camera_x, 0);
        this.renderStatusbars();
        if (this.getEndboss().firstContact) this.addToMap(this.statusEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.renderInteractiveObjects();

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    /**
     * Renders background layers such as clouds and distant scenery.
     * @method renderBackground
     */
    renderBackground() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    /**
     * Renders all status bars (health, coins, fire, and optionally endboss bar).
     * Keeps the HUD fixed to the screen position (not camera-relative).
     * @method renderStatusbars
     */
    renderStatusbars() {
        this.addToMap(this.statusHealth);
        this.addToMap(this.statusCoin);
        this.addToMap(this.statusFire);
    }

    /**
     * Renders all active, interactive game objects such as the player,
     * collectibles, enemies, and projectiles.
     * @method renderInteractiveObjects
     */
    renderInteractiveObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.fireballs);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * Adds multiple drawable/moveable objects to the render map.
     * @method addObjectsToMap
     * @param {Array<DrawableObject|MoveableObject>} objects - Objects to render.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single object, handling horizontal mirroring if needed.
     * @method addToMap
     * @param {DrawableObject|MoveableObject} mo - The object to draw.
     */
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

    /**
     * Flips the drawing context horizontally for rendering mirrored sprites.
     * @method flipImage
     * @param {DrawableObject|MoveableObject} mo - The object to mirror.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original drawing context after a flip.
     * @method flipImageBack
     * @param {DrawableObject|MoveableObject} mo - The mirrored object.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}