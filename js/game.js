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

function init() {
    Game.loadIds();
    mobileBtns();
    Game.systems.keyboard = new Keyboard();
}

function replay() {
    const resultWrapper = document.querySelector('.game-result_wrapper');
    resultWrapper.classList.add('hidden');
    Game.state.gameStarted = false;
    startGame();
}

function home() {
    const resultWrapper = document.querySelector('.game-result_wrapper');
    resultWrapper.classList.add('hidden');
    Game.state.gameStarted = false;
    Game.refs.ids.menu.classList.remove('hidden');
}

function startGame() {
    if (Game.state.gameStarted) return;
    Game.state.gameStarted = true;
    Game.refs.ids.menu.classList.add('hidden');
    toggleMobileBtns();
    initLevel();
    Game.systems.world = new World(Game.refs.canvas, Game.systems.keyboard);
}

function toggleMobileBtns() {
    Game.refs.ids.hud.classList.toggle('hidden');
}

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

function canEnterFullscreen() {
    return window.innerWidth > window.innerHeight;
}

function openElement(id) {
    const el = document.getElementById(id);
    el.classList.remove('hidden');
    setTimeout(() => {
        el.style.opacity = 1;
    }, 100);
}

function closeElement(id) {
    const el = document.getElementById(id);
    el.style.opacity = 0;
    setTimeout(() => {
        el.classList.add('hidden')
    }, 100);
}

function exitFullscreen() {
    const active = document.fullscreenElement || document.webkitFullscreenElement;
    if (!active) return;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

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

function mobileBtns() {
    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        Game.systems.keyboard.LEFT = true;
    });
    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        Game.systems.keyboard.LEFT = false;
    });
    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        Game.systems.keyboard.RIGHT = true;
    });
    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        Game.systems.keyboard.RIGHT = false;
    });
    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        Game.systems.keyboard.SPACE = true;
    });
    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        Game.systems.keyboard.SPACE = false;
    });
    document.getElementById('btn-shoot').addEventListener('touchstart', (e) => {
        e.preventDefault();
        Game.systems.keyboard.D = true;
    });
    document.getElementById('btn-shoot').addEventListener('touchend', (e) => {
        e.preventDefault();
        Game.systems.keyboard.D = false;
    });
};