class SoundManager {
    constructor() {
        this.enabled = localStorage.getItem("sound-enabled") === "true";
        this.sounds = {
            hover: new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"),
            click: new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"),
            transition: new Audio("https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3"),
        };

        // Preload and set volume
        Object.values(this.sounds).forEach(s => {
            s.volume = 0.15;
            s.load();
        });
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem("sound-enabled", this.enabled);
        return this.enabled;
    }

    play(soundName) {
        if (!this.enabled || !this.sounds[soundName]) return;
        
        // Clone to allow rapid playback
        const s = this.sounds[soundName].cloneNode();
        s.volume = 0.15;
        s.play().catch(() => {
            // Browsers block autoplay until first interaction
        });
    }
}

export const soundManager = new SoundManager();
