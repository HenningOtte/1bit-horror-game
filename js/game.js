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
            result: null,
            hud: null
        }
    },
    systems: {
        world: null,
        intervalIDs: [],
        keyboard: null,
    },
    music: {
        bgMusic: new Audio('./audio/Horror_Music_8bit.mp3'),
    },
    sounds: {
        coinSound: new Audio('./audio/coin.mp3'),
        jumpOn: new Audio('./audio/jump_on.mp3'),
        shoot: new Audio('./audio/shoot.mp3'),
        hurt: new Audio('./audio/hurt.mp3'),
        dying: new Audio('./audio/dying.mp3'),
        playerHurt: new Audio('./audio/player_hurt.mp3'),
        skeleton_dead: new Audio('./audio/skeleton_dead.mp3'),
    },

    playMusic() {
        this.music.bgMusic.loop = true;
        this.music.bgMusic.volume = 0.6;
        this.music.bgMusic.play();
        
        if (this.checkLocalStorage() == false) return;
        let myState = this.importLocalState();
        this.music.bgMusic.currentTime = myState.audio.bg.currentTime;
    },

    pauseMusic() {
        this.music.bgMusic.pause();
        this.saveToLocal();
    },

    playSoundEffect(sound, replay = true) {
        if (this.state.isMuted) return;

        if (replay) {
            for (const key in this.sounds) {
                const a = this.sounds[key];
                if (!a.paused) {
                    a.currentTime = 0;
                    a.pause();
                }
            }
        }
        sound.play();
    },

    saveToLocal() {
        let time = this.music.bgMusic.currentTime;
        let saveLocal = localStorage.setItem("myState", JSON.stringify(new State(time)));
    },

    importLocalState() {     
        let myState = JSON.parse(localStorage.getItem('myState'));
        return myState
    },

    checkLocalStorage() {
        let myState = JSON.parse(localStorage.getItem('myState'));
        let validate = myState == null || myState.length == 0 ? false : true;
        return validate;
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
        this.refs.ids.hud = document.getElementById('hud');
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
    initLevel();
    Game.systems.world = new World(Game.refs.canvas, Game.systems.keyboard);
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