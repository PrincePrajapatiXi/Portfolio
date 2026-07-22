/**
 * SoundManager — Uses Web Audio API for procedural sounds.
 * No external CDN dependencies. Works fully offline.
 */
class SoundManager {
    constructor() {
        this.enabled = localStorage.getItem("sound-enabled") === "true";
        this.volume = parseFloat(localStorage.getItem("sound-volume") || "0.15");
        this._ctx = null;
        this._lastPlayed = {};
        this._cooldowns = {
            hover: 80,
            click: 50,
            transition: 300,
            toggle: 200,
            success: 200,
        };
    }

    _getContext() {
        if (!this._ctx || this._ctx.state === "closed") {
            this._ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this._ctx.state === "suspended") {
            this._ctx.resume();
        }
        return this._ctx;
    }

    _isOnCooldown(name) {
        const cooldown = this._cooldowns[name];
        if (!cooldown) return false;
        const last = this._lastPlayed[name] || 0;
        return Date.now() - last < cooldown;
    }

    // ─── Sound Generators ─────────────────────────────────────────

    _playTone(freq, duration, vol = 0.1, type = "sine") {
        try {
            const ctx = this._getContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(vol * this.volume * 6, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            // Silently fail
        }
    }

    _generateHover() {
        this._playTone(1200, 0.06, 0.06, "sine");
    }

    _generateClick() {
        this._playTone(800, 0.08, 0.12, "sine");
        setTimeout(() => this._playTone(1000, 0.05, 0.08, "sine"), 30);
    }

    _generateTransition() {
        this._playTone(400, 0.15, 0.08, "sine");
        setTimeout(() => this._playTone(600, 0.12, 0.06, "sine"), 60);
        setTimeout(() => this._playTone(800, 0.1, 0.04, "sine"), 120);
    }

    _generateSuccess() {
        this._playTone(523, 0.15, 0.1, "sine");
        setTimeout(() => this._playTone(659, 0.15, 0.1, "sine"), 100);
        setTimeout(() => this._playTone(784, 0.2, 0.12, "sine"), 200);
    }

    _generateError() {
        this._playTone(300, 0.2, 0.1, "sawtooth");
        setTimeout(() => this._playTone(250, 0.3, 0.08, "sawtooth"), 150);
    }

    _generateToggle() {
        this._playTone(600, 0.08, 0.1, "sine");
        setTimeout(() => this._playTone(900, 0.06, 0.08, "sine"), 50);
    }

    // ─── Public API ────────────────────────────────────────────────

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem("sound-enabled", this.enabled);
        // Always play toggle sound as feedback
        this._generateToggle();
        return this.enabled;
    }

    setVolume(v) {
        this.volume = Math.min(1, Math.max(0, v));
        localStorage.setItem("sound-volume", this.volume);
    }

    play(soundName) {
        if (!this.enabled) return;
        if (this._isOnCooldown(soundName)) return;

        this._lastPlayed[soundName] = Date.now();

        const generators = {
            hover: () => this._generateHover(),
            click: () => this._generateClick(),
            transition: () => this._generateTransition(),
            success: () => this._generateSuccess(),
            error: () => this._generateError(),
            toggle: () => this._generateToggle(),
            pop: () => this._playTone(1000, 0.05, 0.1, "sine"),
            whoosh: () => this._playTone(200, 0.2, 0.06, "sine"),
        };

        const gen = generators[soundName];
        if (gen) gen();
    }

    get isEnabled() {
        return this.enabled;
    }
}

export const soundManager = new SoundManager();