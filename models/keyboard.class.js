/**
 * @class Keyboard
 * @classdesc Handles keyboard input state for the game.
 * 
 * Each property represents a key currently pressed or released.
 * The flags are updated via global keyboard event listeners.
 */
class Keyboard {
    /**
     * Whether the left arrow key is currently pressed.
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Whether the right arrow key is currently pressed.
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Whether the up arrow key is currently pressed.
     * @type {boolean}
     */
    UP = false;

    /**
     * Whether the down arrow key is currently pressed.
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Whether the spacebar key (used for jumping) is currently pressed.
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Whether the “D” key (used for shooting) is currently pressed.
     * @type {boolean}
     */
    D = false;
}