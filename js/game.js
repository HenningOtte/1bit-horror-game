let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

const bgMusic = new Audio('./audio/Horror_Music_8bit.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.4;

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    bgMusic.play();

    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37:
            keyboard.LEFT = true;
            break;
        case 39:
            keyboard.RIGHT = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 40:
            keyboard.DOWN = true;
            break;
        case 32:
            keyboard.SPACE = true;
            break;
        case 68:
            keyboard.D = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37:
            keyboard.LEFT = false;
            break;
        case 39:
            keyboard.RIGHT = false;
            break;
        case 38:
            keyboard.UP = false;
            break;
        case 40:
            keyboard.DOWN = false;
            break;
        case 32:
            keyboard.SPACE = false;
            break;
        case 68:
            keyboard.D = false;
            break;
    }
});