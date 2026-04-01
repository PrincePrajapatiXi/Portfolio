class SoundManager {
    constructor() {
        this.enabled = localStorage.getItem("sound-enabled") === "true";
        this.volume = parseFloat(localStorage.getItem("sound-volume") || "0.15");
        this._initialized = false;

        // Better, more satisfying sound effects
        this.sounds = {
            // UI interactions
            hover:      this._make("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"),
            click:      this._make("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"),
            transition: this._make("https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3"),

            // Extra feedback sounds
            success:    this._make("https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3"),  // form submit, copy
            error:      this._make("https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3"),  // validation fail
            pop:        this._make("https://assets.mixkit.co/active_storage/sfx/2576/2576-preview.mp3"),  // modal open
            whoosh:     this._make("https://assets.mixkit.co/active_storage/sfx/2580/2580-preview.mp3"),  // page scroll
            toggle:     this._make("https://assets.mixkit.co/active_storage/sfx/2575/2575-preview.mp3"),  // toggle on/off
        };

        // Per-sound volume overrides
        this._volumes = {
            hover:      0.08,   // subtle
            click:      0.18,
            transition: 0.12,
            success:    0.25,
            error:      0.20,
            pop:        0.15,
            whoosh:     0.10,
            toggle:     0.20,
        };

        // Cooldown map — prevents rapid-fire same sound spam
        this._lastPlayed = {};
        this._cooldowns = {
            hover:  80,   // ms
            click:  50,
            whoosh: 300,
            toggle: 200,
        };

        // Preload on first user interaction (browser policy)
        window.addEventListener("click", () => this._init(), { once: true });
        window.addEventListener("keydown", () => this._init(), { once: true });
    }

    // ─── Private helpers ───────────────────────────────────────────

    _make(url) {
        const a = new Audio(url);
        a.preload = "none"; // lazy — load only on first play
        return a;
    }

    _init() {
        if (this._initialized) return;
        this._initialized = true;
        // Trigger a silent load so sounds are buffered
        Object.values(this.sounds).forEach(s => {
            s.volume = 0;
            s.load();
        });
    }

    _isOnCooldown(name) {
        const cooldown = this._cooldowns[name];
        if (!cooldown) return false;
        const last = this._lastPlayed[name] || 0;
        return Date.now() - last < cooldown;
    }

    // ─── Public API ────────────────────────────────────────────────

    /** Toggle sound on/off. Returns new state. */
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem("sound-enabled", this.enabled);
        // Play toggle sound using raw Audio so it works even when disabling
        if (this.sounds.toggle) {
            const s = this.sounds.toggle.cloneNode();
            s.volume = this._volumes.toggle;
            s.play().catch(() => {});
        }
        return this.enabled;
    }

    /** Set master volume (0–1). */
    setVolume(v) {
        this.volume = Math.min(1, Math.max(0, v));
        localStorage.setItem("sound-volume", this.volume);
    }

    /** Play a named sound. */
    play(soundName) {
        if (!this.enabled) return;
        if (!this.sounds[soundName]) return;
        if (this._isOnCooldown(soundName)) return;

        this._lastPlayed[soundName] = Date.now();

        const s = this.sounds[soundName].cloneNode();
        // Per-sound volume × master volume
        s.volume = (this._volumes[soundName] ?? 0.15) * (this.volume / 0.15);
        s.play().catch(() => {});
    }

    /** Attach hover & click sounds to a DOM element. */
    attachTo(el, { hoverSound = "hover", clickSound = "click" } = {}) {
        if (!el) return;
        const onHover = () => this.play(hoverSound);
        const onClick = () => this.play(clickSound);
        el.addEventListener("mouseenter", onHover);
        el.addEventListener("click", onClick);
        // Return cleanup fn
        return () => {
            el.removeEventListener("mouseenter", onHover);
            el.removeEventListener("click", onClick);
        };
    }

    get isEnabled() {
        return this.enabled;
    }
}

export const soundManager = new SoundManager();