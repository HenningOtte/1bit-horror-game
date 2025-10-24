/**
 * Toggles the game's background music on and off.
 * Updates button icons and the muted state accordingly.
 * @function toggleMusic
 */
function toggleMusic() {
    if (Game.state.isMuted) {
        Game.refs.ids.sound.classList.remove('mute');
        Game.refs.ids.sound.classList.add('unmute');
        Game.state.isMuted = false;
        Game.playMusic();
    } else {
        Game.refs.ids.sound.classList.remove('unmute');
        Game.refs.ids.sound.classList.add('mute');
        Game.state.isMuted = true;
        Game.pauseMusic();
    }
}

/**
 * Initializes core game components and sets up input controls.
 * Called on window load.
 * @function init
 */
function init() {
    Game.loadIds();
    mobileBtns();
    Game.systems.keyboard = new Keyboard();
}

/**
 * Restarts the game from the result screen.
 * @function replay
 */
function replay() {
    const resultWrapper = document.querySelector('.game-result_wrapper');
    resultWrapper.classList.add('hidden');
    Game.state.gameStarted = false;
    startGame();
}

/**
 * Returns to the home menu from the result screen.
 * @function home
 */
function home() {
    const resultWrapper = document.querySelector('.game-result_wrapper');
    resultWrapper.classList.add('hidden');
    Game.state.gameStarted = false;
    Game.refs.ids.menu.classList.remove('hidden');
}

/**
 * Starts the game loop if not already running.
 * Initializes the world, keyboard, and level.
 * @function startGame
 */
function startGame() {
    if (Game.state.gameStarted) return;
    Game.initializeMusicFromStorage();
    Game.state.gameStarted = true;
    Game.refs.ids.menu.classList.add('hidden');
    toggleMobileBtns();
    initLevel();
    Game.systems.world = new World(Game.refs.canvas, Game.systems.keyboard);
}

/**
 * Toggles the visibility of mobile HUD buttons.
 * @function toggleMobileBtns
 */
function toggleMobileBtns() {
    Game.refs.ids.hud.classList.toggle('hidden');
}

/**
 * Handles entering or exiting fullscreen mode,
 * depending on the current fullscreen state.
 * @function fullscreen
 */
function fullscreen() {
    const active = document.fullscreenElement || document.webkitFullscreenElement;
    if (active) {
        exitFullscreen();
        return;
    }
    if (!canEnterFullscreen()) {
        openElement('landscape-warning');
        return;
    }
    closeElement('landscape-warning');
    enterFullscreen(Game.refs.ids.fs);
}

/**
 * Checks if the device can enter fullscreen (landscape orientation).
 * @function canEnterFullscreen
 * @returns {boolean} True if the screen is wider than tall.
 */
function canEnterFullscreen() {
    return window.innerWidth > window.innerHeight;
}

/**
 * Makes an HTML element visible with a fade-in effect.
 * @function openElement
 * @param {string} id - ID of the element to open.
 */
function openElement(id) {
    Game.initializeMusicFromStorage();
    const el = document.getElementById(id);
    el.classList.remove('hidden');
    setTimeout(() => {
        el.style.opacity = 1;
    }, 100);
}

/**
 * Hides an HTML element with a fade-out effect.
 * @function closeElement
 * @param {string} id - ID of the element to hide.
 */
function closeElement(id) {
    const el = document.getElementById(id);
    el.style.opacity = 0;
    setTimeout(() => {
        el.classList.add('hidden');
    }, 100);
}

/**
 * Exits fullscreen mode, supporting vendor-specific APIs.
 * @function exitFullscreen
 */
function exitFullscreen() {
    const active = document.fullscreenElement || document.webkitFullscreenElement;
    if (!active) return;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Requests fullscreen mode for a given element.
 * @function enterFullscreen
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
    if (!element) return;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Keyboard control handling: sets movement keys to active on keydown.
 * @event window#keydown
 * @param {KeyboardEvent} e - The keydown event.
 */
window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37:
            Game.systems.keyboard.LEFT = true;
            break;
        case 39:
            Game.systems.keyboard.RIGHT = true;
            break;
        case 38:
            Game.systems.keyboard.UP = true;
            break;
        case 40:
            Game.systems.keyboard.DOWN = true;
            break;
        case 32:
            e.preventDefault();
            Game.systems.keyboard.SPACE = true;
            break;
        case 68:
            Game.systems.keyboard.D = true;
            break;
    }
});

/**
 * Keyboard control handling: resets movement keys on keyup.
 * @event window#keyup
 * @param {KeyboardEvent} e - The keyup event.
 */
window.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37:
            Game.systems.keyboard.LEFT = false;
            break;
        case 39:
            Game.systems.keyboard.RIGHT = false;
            break;
        case 38:
            Game.systems.keyboard.UP = false;
            break;
        case 40:
            Game.systems.keyboard.DOWN = false;
            break;
        case 32:
            e.preventDefault();
            Game.systems.keyboard.SPACE = false;
            break;
        case 68:
            Game.systems.keyboard.D = false;
            break;
    }
});

/**
* Sets up mobile touch controls for movement, jump, and shoot actions.
* Maps touch events to the keyboard control flags used by the game.
* @function mobileBtns
* @returns {void}
*/
function mobileBtns() {
    setupTouchControl('btn-left', 'LEFT');
    setupTouchControl('btn-right', 'RIGHT');
    setupTouchControl('btn-jump', 'SPACE');
    setupTouchControl('btn-shoot', 'D');
}

/**
 * Attaches touch event listeners to a button element to toggle a keyboard control flag.
 * Simulates keyboard input by setting the corresponding key state in `Game.systems.keyboard`.
 *
 * @function setupTouchControl
 * @param {string} btnId - The HTML element ID of the button (e.g., 'btn-left').
 * @param {string} keyFlag - The keyboard flag to toggle (e.g., 'LEFT', 'SPACE').
 * @returns {void}
 */

function setupTouchControl(btnId, keyFlag) {
    const btn = document.getElementById(btnId);
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        Game.systems.keyboard[keyFlag] = true;
    });
    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        Game.systems.keyboard[keyFlag] = false;
    });
}