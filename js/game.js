const Game = {
    state: {
        gameStarted: false,
        isFullscreen: false,
        isMuted: true,
    },
    refs: {
        canvas: null,
        ids: {
            fs: null,
            menu: null,
            start: null,
            controls: null,
            btnFs: null,
            sound: null,
            result: null
        }
    },
    systems: {
        world: null,
        intervalIDs: [],
        keyboard: null,
    },
    music: {
        bgMusic: new Audio('../audio/Horror_Music_8bit.mp3'),
    },
    sounds: {
        coinSound: new Audio('../audio/coin.mp3'),
        jumpOn: new Audio('../audio/jump_on.mp3'),
        shoot: new Audio('../audio/shoot.mp3'),
        hurt: new Audio('../audio/hurt.mp3'),
        dying: new Audio('../audio/dying.mp3'),
    },

    playMusic() {
        this.music.bgMusic.loop = true;
        this.music.bgMusic.volume = 0.6;
        this.music.bgMusic.play();
    },

    pauseMusic() {
        this.music.bgMusic.pause();
    },

    playSoundEffect(sound) {
        if (this.state.isMuted) return;

        for (const key in this.sounds) {
            const a = this.sounds[key];
            if (!a.paused) {
                a.currentTime = 0;
                a.pause();
            }
        }
        sound.play();
    },

    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.systems.intervalIDs.push(id);
    },

    stopGame() {
        this.systems.intervalIDs.forEach(clearInterval);
    },

    gameover() {
        Game.systems.world = null;
        this.refs.ids.result.classList.remove('bg-won');
        setTimeout(() => {
            this.refs.ids.result.classList.add('bg-gameover');
        }, 500);
    },

    won() {
        this.systems.world = null;
        this.refs.ids.result.classList.remove('bg-gameover');
        setTimeout(() => {
            this.refs.ids.result.classList.add('bg-won');
        }, 500);
    },

    handleGameResult(result) {
        result == true ? this.won() : this.gameover();
        this.refs.ids.result.classList.toggle('hidden');
    },

    loadIds() {
        this.refs.ids.fs = document.getElementById('fs');
        this.refs.ids.menu = document.getElementById('menu');
        this.refs.ids.start = document.getElementById('start-btn');
        this.refs.ids.controls = document.getElementById('controls-btn');
        this.refs.ids.btnFs = document.getElementById('btn-fs');
        this.refs.ids.sound = document.getElementById('sound-btn');
        this.refs.ids.result = document.getElementById('result');
        this.refs.canvas = document.getElementById('canvas');
    }
}

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
    initLevel();
    Game.systems.world = new World(Game.refs.canvas, Game.systems.keyboard);
}

function fullscreen() {
    Game.refs.ids.controls
    if (!Game.state.isFullscreen) {
        Game.state.isFullscreen = true;
        enterFullscreen(Game.refs.ids.fs);
    } else {
        Game.state.isFullscreen = false;
        exitFullscreen()
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
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