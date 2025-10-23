const Game = {
    state: {
        gameStarted: false,
        isFullscreen: false,
        isMuted: true,
        autoSave: false,
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
        intervalAutoSave: null,
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
        this.updateBgMusicTime();
        this.autoLocalStorageUpdate();
    },

    updateBgMusicTime() {
        let myState = this.importLocalState();
        this.music.bgMusic.currentTime = myState.audio.bg.currentTime;
    },

    autoLocalStorageUpdate() {
        if (this.state.autoSave) return
        this.systems.intervalAutoSave = setInterval(() => {
            this.saveToLocal();
        }, 2000)
        this.state.autoSave = true;
    },

    pauseMusic() {
        this.music.bgMusic.pause();
        this.saveToLocal();
        this.stopAutosave();
    },

    stopAutosave() {
        if (this.systems.intervalAutoSave != null) {
            clearInterval(this.systems.intervalAutoSave);
            this.systems.intervalAutoSave = null;
        }
        this.state.autoSave = false;
        console.log(this.systems.intervalAutoSave);
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
        toggleMobileBtns();
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