/**
 * Global game controller object containing state, systems, references,
 * audio, and helper methods for managing gameplay, sound, and persistence.
 * @namespace Game
 */
const Game = {
    /**
     * Current runtime and system states.
     * @property {boolean} gameStarted - Indicates if the game has started.
     * @property {boolean} isFullscreen - Fullscreen mode status.
     * @property {boolean} isMuted - Whether all sounds are muted.
     * @property {boolean} autoSave - Whether autosave is currently active.
     */
    state: {
        gameStarted: false,
        isFullscreen: false,
        isMuted: true,
        autoSave: false,
    },

    /**
     * Cached DOM element references for UI and canvas.
     * @property {?HTMLCanvasElement} canvas - Main game canvas.
     * @property {Object} ids - Elements referenced by ID.
     */
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

    /**
     * Internal game systems and timers.
     * @property {?Object} world - The current game world instance.
     * @property {number[]} intervalIDs - List of interval IDs used in the game loop.
     * @property {?number} intervalAutoSave - Interval ID for autosave.
     * @property {?Object} keyboard - Keyboard input handler instance.
     */
    systems: {
        world: null,
        intervalIDs: [],
        intervalAutoSave: null,
        keyboard: null,
    },

    /**
     * Background music files.
     * @property {HTMLAudioElement} bgMusic - The looping background track.
     */
    music: {
        bgMusic: new Audio('./audio/Horror_Music_8bit.mp3'),
    },

    /**
     * Sound effect library used by the game.
     * @property {HTMLAudioElement} coinSound
     * @property {HTMLAudioElement} jumpOn
     * @property {HTMLAudioElement} shoot
     * @property {HTMLAudioElement} hurt
     * @property {HTMLAudioElement} dying
     * @property {HTMLAudioElement} playerHurt
     * @property {HTMLAudioElement} skeleton_dead
     */
    sounds: {
        coinSound: new Audio('./audio/coin.mp3'),
        jumpOn: new Audio('./audio/jump_on.mp3'),
        shoot: new Audio('./audio/shoot.mp3'),
        hurt: new Audio('./audio/hurt.mp3'),
        dying: new Audio('./audio/dying.mp3'),
        playerHurt: new Audio('./audio/player_hurt.mp3'),
        skeleton_dead: new Audio('./audio/skeleton_dead.mp3'),
    },

    /**
     * Starts the background music and loads the last playback position
     * from localStorage if available.
     * @function
     */
    playMusic() {
        this.music.bgMusic.loop = true;
        this.music.bgMusic.volume = 0.6;
        this.music.bgMusic.play();

        if (this.checkLocalStorage() == false) {
            this.saveToLocal();
            return;
        } else {
            this.updateBgMusicTime();
            this.autoLocalStorageUpdate();
        }
    },

    /**
     * Updates the background music's playback position
     * using saved state data from localStorage.
     * @function
     */
    updateBgMusicTime() {
        let myState = this.importLocalState();
        this.music.bgMusic.currentTime = myState.audio.bg.currentTime;
    },

    /**
     * Starts the autosave interval which periodically saves
     * the current playback time to localStorage.
     * @function
     */
    autoLocalStorageUpdate() {
        if (this.state.autoSave) return;
        this.systems.intervalAutoSave = setInterval(() => {
            this.saveToLocal();
        }, 2000);
        this.state.autoSave = true;
    },

    /**
     * Pauses the background music and stops autosave.
     * @function
     */
    pauseMusic() {
        this.music.bgMusic.pause();
        this.saveToLocal();
        this.stopAutosave();
    },

    /**
     * Stops the autosave interval and resets the autosave state flag.
     * @function
     */
    stopAutosave() {
        if (this.systems.intervalAutoSave != null) {
            clearInterval(this.systems.intervalAutoSave);
            this.systems.intervalAutoSave = null;
        }
        this.state.autoSave = false;
        console.log(this.systems.intervalAutoSave);
    },

    /**
     * Plays a given sound effect if sound is enabled.
     * Optionally stops any other sounds currently playing.
     * @function
     * @param {HTMLAudioElement} sound - The sound effect to play.
     * @param {boolean} [replay=true] - Whether to stop all other sounds before playing.
     */
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

    /**
     * Saves the current background music playback time
     * to localStorage using the State class.
     * @function
     */
    saveToLocal() {
        let time = this.music.bgMusic.currentTime;
        let saveLocal = localStorage.setItem("myState", JSON.stringify(new State(time)));
    },

    /**
     * Loads and parses the saved state object from localStorage.
     * @function
     * @returns {Object|null} Parsed state data or null if not available.
     */
    importLocalState() {
        let myState = JSON.parse(localStorage.getItem('myState'));
        return myState;
    },

    /**
     * Checks if a valid save object exists in localStorage.
     * @function
     * @returns {boolean} True if a valid save exists, otherwise false.
     */
    checkLocalStorage() {
        let myState = JSON.parse(localStorage.getItem('myState'));
        let validate = myState == null || myState.length == 0 ? false : true;
        return validate;
    },

    /**
     * Starts a stoppable interval and stores its ID in the systems array.
     * @function
     * @param {Function} fn - The function to execute.
     * @param {number} time - Interval duration in milliseconds.
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.systems.intervalIDs.push(id);
    },

    /**
     * Clears all active intervals and stops the game loop.
     * @function
     */
    stopGame() {
        this.systems.intervalIDs.forEach(clearInterval);
        toggleMobileBtns();
    },

    /**
     * Handles the game-over sequence and UI updates.
     * @function
     */
    gameover() {
        Game.systems.world = null;
        this.refs.ids.result.classList.remove('bg-won');
        setTimeout(() => {
            this.refs.ids.result.classList.add('bg-gameover');
        }, 500);
    },

    /**
     * Handles the win sequence and UI updates.
     * @function
     */
    won() {
        this.systems.world = null;
        this.refs.ids.result.classList.remove('bg-gameover');
        setTimeout(() => {
            this.refs.ids.result.classList.add('bg-won');
        }, 500);
    },

    /**
     * Displays the result screen depending on the game outcome.
     * @function
     * @param {boolean} result - True if player won, false if lost.
     */
    handleGameResult(result) {
        result == true ? this.won() : this.gameover();
        this.refs.ids.result.classList.toggle('hidden');
    },

    /**
     * Loads and caches all DOM element references by ID for later use.
     * @function
     */
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
};