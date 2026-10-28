/* ============================================================
   LEMONMINT - GAMEPLAY, XP SYSTEM & ARCADE MINI-GAME
   ============================================================ */

class GameEngine {
  constructor() {
    this.bananas = parseInt(localStorage.getItem('lemonmint_bananas') || '350', 10);
    this.level = 1;
    this.levelNames = [
      "Rookie Minion",
      "Tech Tinkerer",
      "Code Banana",
      "Master Architect",
      "Chief Banana Officer"
    ];
    this.unlockedAchievements = JSON.parse(localStorage.getItem('lemonmint_achievements') || '[]');
    this.initHUD();
    this.setupQuestTracker();
  }

  initHUD() {
    this.updateHUD();
  }

  addBananas(amount, clickX = null, clickY = null) {
    this.bananas += amount;
    localStorage.setItem('lemonmint_bananas', this.bananas.toString());

    if (clickX && clickY) {
      this.spawnBananaParticle(amount, clickX, clickY);
    }

    if (window.sound) {
      window.sound.playCoin();
    }

    this.checkLevelProgression();
    this.updateHUD();

    // Check Banana milestone achievements
    if (this.bananas >= 500 && !this.hasAchievement('banana_500')) {
      this.unlockAchievement('banana_500', '🍌 Banana Millionaire', 'Collected 500+ Bananas in the Minion Lab!');
    }
  }

  spawnBananaParticle(amount, x, y) {
    const particle = document.createElement('div');
    particle.className = 'banana-particle';
    particle.innerHTML = `+${amount} 🍌`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 950);
  }

  checkLevelProgression() {
    let newLevel = 1;
    if (this.bananas >= 1500) newLevel = 5;
    else if (this.bananas >= 800) newLevel = 4;
    else if (this.bananas >= 400) newLevel = 3;
    else if (this.bananas >= 150) newLevel = 2;

    if (newLevel > this.level) {
      this.level = newLevel;
      if (window.sound) window.sound.playPowerup();
      this.unlockAchievement(`lvl_${newLevel}`, `⭐ LEVEL UP!`, `Promoted to ${this.levelNames[this.level - 1]}!`);
    } else {
      this.level = newLevel;
    }
  }

  updateHUD() {
    this.checkLevelProgression();

    const bananaCounters = document.querySelectorAll('.banana-score-val');
    bananaCounters.forEach(el => {
      el.textContent = this.bananas.toLocaleString();
    });

    const levelBadge = document.querySelector('.player-level-badge');
    if (levelBadge) {
      levelBadge.textContent = `LVL ${this.level}: ${this.levelNames[this.level - 1]}`;
    }

    const progressFill = document.querySelector('.hud-progress-fill');
    if (progressFill) {
      const thresholds = [150, 400, 800, 1500, 3000];
      const prev = this.level > 1 ? thresholds[this.level - 2] : 0;
      const target = thresholds[this.level - 1];
      const pct = Math.min(100, Math.max(10, ((this.bananas - prev) / (target - prev)) * 100));
      progressFill.style.width = `${pct}%`;
    }
  }

  hasAchievement(id) {
    return this.unlockedAchievements.includes(id);
  }

  unlockAchievement(id, title, desc) {
    if (this.hasAchievement(id)) return;

    this.unlockedAchievements.push(id);
    localStorage.setItem('lemonmint_achievements', JSON.stringify(this.unlockedAchievements));

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="toast-trophy">🏆</div>
      <div class="toast-info">
        <h4>${title}</h4>
        <p>${desc}</p>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  setupQuestTracker() {
    document.querySelectorAll('.quest-item').forEach(item => {
      item.addEventListener('click', () => {
        const reward = parseInt(item.getAttribute('data-reward') || '50', 10);
        if (!item.classList.contains('completed')) {
          item.classList.add('completed');
          const check = item.querySelector('.quest-checkbox');
          if (check) check.textContent = '✓';
          this.addBananas(reward, window.innerWidth / 2, 100);
          this.unlockAchievement('quest_' + Date.now(), '🎯 Quest Completed!', `Earned +${reward} Bananas!`);
        }
      });
    });
  }
}

// ============================================================
// "CATCH THE BANANA" MINI-ARCADE GAME
// ============================================================

class BananaMiniGame {
  constructor() {
    this.modal = null;
    this.canvasArea = null;
    this.scoreValEl = null;
    this.timerValEl = null;
    this.gameInterval = null;
    this.timerInterval = null;
    this.score = 0;
    this.timeLeft = 20;
    this.isPlaying = false;
    this.initModal();
  }

  initModal() {
    const modalWrap = document.createElement('div');
    modalWrap.className = 'minigame-modal-overlay';
    modalWrap.id = 'minigame-modal';
    modalWrap.innerHTML = `
      <div class="minigame-box">
        <div class="minigame-header">
          <h3>🎮 BANANA BLASTER ARCADE</h3>
          <button class="minigame-close-btn" onclick="window.bananaGame.close()">&times;</button>
        </div>
        <div class="minigame-hud">
          <div class="minigame-hud-score">SCORE: <span id="mg-score">0</span> 🍌</div>
          <div class="minigame-hud-timer">TIME: <span id="mg-timer">20s</span></div>
        </div>
        <div class="minigame-canvas-area" id="mg-canvas">
          <div class="minigame-start-screen" id="mg-start-screen">
            <h2>🍌 CATCH THE BANANAS!</h2>
            <p>Tap as many falling bananas as you can before the 20-second timer runs out!</p>
            <button class="game-btn game-btn-banana" onclick="window.bananaGame.start()">START GAME 🚀</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalWrap);

    this.modal = modalWrap;
    this.canvasArea = document.getElementById('mg-canvas');
    this.scoreValEl = document.getElementById('mg-score');
    this.timerValEl = document.getElementById('mg-timer');
  }

  open() {
    this.modal.classList.add('active');
    if (window.sound) window.sound.playPowerup();
  }

  close() {
    this.modal.classList.remove('active');
    this.stop();
  }

  start() {
    const startScreen = document.getElementById('mg-start-screen');
    startScreen.style.display = 'none';

    this.score = 0;
    this.timeLeft = 20;
    this.isPlaying = true;
    this.scoreValEl.textContent = '0';
    this.timerValEl.textContent = '20s';

    if (window.sound) window.sound.playJump();

    // Clear any leftover targets
    this.canvasArea.querySelectorAll('.falling-target').forEach(e => e.remove());

    // Timer interval
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.timerValEl.textContent = `${this.timeLeft}s`;

      if (this.timeLeft <= 0) {
        this.gameOver();
      }
    }, 1000);

    // Spawner interval
    this.gameInterval = setInterval(() => {
      if (this.isPlaying) this.spawnTarget();
    }, 550);
  }

  spawnTarget() {
    const target = document.createElement('div');
    target.className = 'falling-target';

    // 80% Banana, 20% Super Golden Banana
    const isSuper = Math.random() > 0.8;
    target.textContent = isSuper ? '🍌✨' : '🍌';
    const points = isSuper ? 50 : 20;

    const maxX = this.canvasArea.clientWidth - 50;
    const startX = Math.floor(Math.random() * maxX);

    target.style.left = `${startX}px`;
    target.style.top = '-50px';
    target.style.transition = 'top 2.2s linear';

    target.addEventListener('click', (e) => {
      e.stopPropagation();
      this.score += points;
      this.scoreValEl.textContent = this.score;

      if (window.sound) window.sound.playCoin();
      if (window.game) window.game.addBananas(points, e.clientX, e.clientY);

      target.remove();
    });

    this.canvasArea.appendChild(target);

    // Start falling animation
    setTimeout(() => {
      target.style.top = `${this.canvasArea.clientHeight + 20}px`;
    }, 20);

    // Remove if reached bottom
    setTimeout(() => {
      if (target.parentElement) target.remove();
    }, 2300);
  }

  gameOver() {
    this.stop();
    const startScreen = document.getElementById('mg-start-screen');
    startScreen.style.display = 'flex';
    startScreen.innerHTML = `
      <h2>🎉 GAME OVER!</h2>
      <p>Awesome reflexes! You collected <strong>${this.score} 🍌</strong>!</p>
      <div style="display:flex; gap:10px; margin-top:12px;">
        <button class="game-btn game-btn-banana game-btn-sm" onclick="window.bananaGame.start()">PLAY AGAIN 🔄</button>
        <button class="game-btn game-btn-blue game-btn-sm" onclick="window.bananaGame.close()">CLOSE ✕</button>
      </div>
    `;

    if (window.sound) window.sound.playPowerup();
    if (window.game) {
      window.game.unlockAchievement('arcade_champ', '🕹️ Arcade Champion!', `Scored ${this.score} Bananas in the arcade!`);
    }
  }

  stop() {
    this.isPlaying = false;
    clearInterval(this.gameInterval);
    clearInterval(this.timerInterval);
    this.canvasArea.querySelectorAll('.falling-target').forEach(e => e.remove());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.game = new GameEngine();
  window.bananaGame = new BananaMiniGame();
});
