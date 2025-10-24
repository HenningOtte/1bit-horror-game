/**
 * Represents the current game state to be saved or loaded.
 * 
 * Currently stores the background music’s playback position,
 * but can be extended later for saving additional data (e.g. progress, score, checkpoints).
 */
class State {
    /**
     * Creates a new State instance.
     * @param {number} [time=0] - The current playback time of the background music in seconds.
     */
    constructor(time = 0, muted = true) {
        this.audio = {
            bg: {
                currentTime: time,
                isMuted: muted,
            }
        };
    }
}
