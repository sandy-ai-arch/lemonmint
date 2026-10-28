/* ============================================================
   LEMON MINT - MINION SOUNDBOARD & MASCOT CUSTOMIZER
   ============================================================ */

class SoundboardAndMascots {
  constructor() {
    this.modal = null;
    this.activeMascot = localStorage.getItem('lemonmint_mascot') || 'bob';
    this.initUI();
  }

  initUI() {
    const modal = document.createElement('div');
    modal.className = 'extras-modal-overlay';
    modal.id = 'soundboard-modal';
    modal.innerHTML = `
      <div class="extras-modal-card">
        <div class="extras-modal-header">
          <h3>🍌 Minion Voice Soundboard & Mascot Lab</h3>
          <button class="checkout-close-btn" onclick="window.soundboard.close()">&times;</button>
        </div>

        <div class="extras-modal-body">
          <label class="checkout-label" style="font-size:0.9rem; margin-bottom:12px; color:var(--color-banana);">
            🔊 1. Interactive Minion Soundboard (Tap to Play):
          </label>
          <div class="soundboard-grid">
            <button class="soundboard-btn" onclick="window.soundboard.playSound('bello')">
              <span style="font-size:1.8rem;">👋</span>
              <span>"Bello!"</span>
            </button>
            <button class="soundboard-btn" onclick="window.soundboard.playSound('banana')">
              <span style="font-size:1.8rem;">🍌</span>
              <span>"Banana!"</span>
            </button>
            <button class="soundboard-btn" onclick="window.soundboard.playSound('beedo')">
              <span style="font-size:1.8rem;">🚨</span>
              <span>"Bee-Do!"</span>
            </button>
            <button class="soundboard-btn" onclick="window.soundboard.playSound('tada')">
              <span style="font-size:1.8rem;">🎉</span>
              <span>"Ta-Da!"</span>
            </button>
            <button class="soundboard-btn" onclick="window.soundboard.playSound('papaya')">
              <span style="font-size:1.8rem;">🥭</span>
              <span>"Papaya!"</span>
            </button>
            <button class="soundboard-btn" onclick="window.soundboard.playSound('tulaliloo')">
              <span style="font-size:1.8rem;">❤️</span>
              <span>"Tulaliloo!"</span>
            </button>
          </div>

          <label class="checkout-label" style="font-size:0.9rem; margin-bottom:8px; color:var(--color-banana); margin-top:20px;">
            👾 2. Choose Your Primary Minion Guide:
          </label>
          <div class="mascot-select-row">
            <div class="mascot-opt-card ${this.activeMascot === 'bob' ? 'active' : ''}" onclick="window.soundboard.selectMascot('bob', this)">
              <div style="font-size:2rem; margin-bottom:4px;">👀</div>
              <h5 style="color:#FFFFFF;">Bob</h5>
              <p style="font-size:0.75rem; color:#94A3B8;">Two-eyed cutie with heterochromia</p>
            </div>

            <div class="mascot-opt-card ${this.activeMascot === 'stuart' ? 'active' : ''}" onclick="window.soundboard.selectMascot('stuart', this)">
              <div style="font-size:2rem; margin-bottom:4px;">👁️</div>
              <h5 style="color:#FFFFFF;">Stuart</h5>
              <p style="font-size:0.75rem; color:#94A3B8;">One-eyed rocker & lead inventor</p>
            </div>

            <div class="mascot-opt-card ${this.activeMascot === 'kevin' ? 'active' : ''}" onclick="window.soundboard.selectMascot('kevin', this)">
              <div style="font-size:2rem; margin-bottom:4px;">👑</div>
              <h5 style="color:#FFFFFF;">Kevin</h5>
              <p style="font-size:0.75rem; color:#94A3B8;">Tall chief banana architect</p>
            </div>
          </div>

          <div style="margin-top:20px; text-align:center;">
            <button class="game-btn game-btn-banana game-btn-sm" onclick="window.soundboard.close()">
              ✨ APPLY & CONTINUE QUEST
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    this.modal = modal;
  }

  open() {
    this.modal.classList.add('active');
    if (window.sound) window.sound.playClick();
  }

  close() {
    this.modal.classList.remove('active');
  }

  playSound(type) {
    if (!window.sound) return;
    const ctx = window.sound.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'bello') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'banana') {
      window.sound.playPowerup();
    } else if (type === 'beedo') {
      // Siren
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.linearRampToValueAtTime(1100, now + 0.15);
      osc.frequency.linearRampToValueAtTime(700, now + 0.3);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'tada') {
      window.sound.playCoin();
      setTimeout(() => window.sound.playCoin(), 120);
    } else if (type === 'papaya') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'tulaliloo') {
      window.sound.playMinionGiggle();
    }

    if (window.game) {
      window.game.addBananas(5);
    }
  }

  selectMascot(name, el) {
    this.activeMascot = name;
    localStorage.setItem('lemonmint_mascot', name);

    document.querySelectorAll('.mascot-opt-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');

    // Update mascots on page
    document.querySelectorAll('[data-minion-type]').forEach(container => {
      container.setAttribute('data-minion-type', name === 'kevin' ? 'bob' : name);
    });
    if (window.minions) window.minions.renderMinionSVGs();

    if (window.sound) window.sound.playPowerup();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.soundboard = new SoundboardAndMascots();
});

window.openSoundboard = function() {
  if (window.soundboard) window.soundboard.open();
};
