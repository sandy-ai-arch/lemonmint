/* ============================================================
   LEMONMINT - INTERACTIVE MINION MASCOT & EYE-TRACKING ENGINE
   ============================================================ */

class MinionMascot {
  constructor() {
    this.phrases = [
      "Bello! 👋 Welcome!",
      "Banana! 🍌",
      "Poopaye! Let's build!",
      "Tulaliloo ti amo! ❤️",
      "Need help? WhatsApp us!",
      "Bee-do-bee-do! 🚨",
      "Level Up! 🎮",
      "Supertech! 🚀",
      "Tank yu! 🍌"
    ];
    this.speechTimeout = null;
    this.init();
  }

  init() {
    this.renderMinionSVGs();
    this.setupEyeTracking();
    this.setupBlinking();
    this.setupInteractivity();
  }

  // Generate Bob (2-eyed) Minion SVG
  getBobSVG(id = "minion-bob") {
    return `
      <svg id="${id}" class="interactive-minion-svg" viewBox="0 0 200 240" width="100%" height="100%" style="overflow: visible;">
        <defs>
          <filter id="drop-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/>
          </filter>
          <linearGradient id="yellow-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE44D"/>
            <stop offset="60%" stop-color="#FFD200"/>
            <stop offset="100%" stop-color="#D4A700"/>
          </linearGradient>
          <linearGradient id="denim-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#2563EB"/>
            <stop offset="100%" stop-color="#1D4ED8"/>
          </linearGradient>
          <linearGradient id="goggle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#CBD5E1"/>
            <stop offset="50%" stop-color="#94A3B8"/>
            <stop offset="100%" stop-color="#64748B"/>
          </linearGradient>
        </defs>

        <!-- Shadow under feet -->
        <ellipse cx="100" cy="232" rx="60" ry="8" fill="rgba(0,0,0,0.3)"/>

        <!-- Feet / Shoes -->
        <g class="minion-feet">
          <ellipse cx="76" cy="226" rx="18" ry="10" fill="#1E293B"/>
          <ellipse cx="124" cy="226" rx="18" ry="10" fill="#1E293B"/>
        </g>

        <!-- Arms -->
        <g class="minion-arms">
          <!-- Left Arm -->
          <path d="M 45 125 C 20 145 25 170 38 185" fill="none" stroke="#FFD200" stroke-width="14" stroke-linecap="round"/>
          <circle cx="38" cy="186" r="10" fill="#1E293B"/> <!-- glove -->
          <!-- Right Arm (Waving) -->
          <path class="waving-arm" d="M 155 125 C 180 120 185 95 175 75" fill="none" stroke="#FFD200" stroke-width="14" stroke-linecap="round"/>
          <circle class="waving-hand" cx="173" cy="73" r="10" fill="#1E293B"/> <!-- glove -->
        </g>

        <!-- Main Body -->
        <rect class="minion-body-shape" x="42" y="30" width="116" height="175" rx="58" fill="url(#yellow-body-grad)" filter="url(#drop-shadow)"/>

        <!-- Sprouts / Hair -->
        <g class="minion-hair" stroke="#1E293B" stroke-width="3" stroke-linecap="round">
          <path d="M 94 30 Q 92 14 86 16"/>
          <path d="M 100 28 Q 100 10 102 12"/>
          <path d="M 106 30 Q 110 14 116 18"/>
        </g>

        <!-- Denim Overalls -->
        <g class="minion-overalls">
          <!-- Overalls base -->
          <path d="M 42 165 C 42 195 58 205 100 205 C 142 205 158 195 158 165 L 158 152 L 42 152 Z" fill="url(#denim-grad)"/>
          <!-- Front Pocket / Bib -->
          <path d="M 68 132 L 132 132 L 132 170 L 68 170 Z" fill="url(#denim-grad)"/>
          <!-- Straps -->
          <line x1="44" y1="135" x2="72" y2="148" stroke="#1D4ED8" stroke-width="10" stroke-linecap="round"/>
          <line x1="156" y1="135" x2="128" y2="148" stroke="#1D4ED8" stroke-width="10" stroke-linecap="round"/>
          <!-- Buttons -->
          <circle cx="70" cy="148" r="4.5" fill="#1E293B"/>
          <circle cx="130" cy="148" r="4.5" fill="#1E293B"/>
          <!-- Center Logo (LemonMint 'M' / Gru Emblem) -->
          <circle cx="100" cy="158" r="12" fill="#1E293B"/>
          <path d="M 94 162 L 97 153 L 100 159 L 103 153 L 106 162" fill="none" stroke="#FFD200" stroke-width="2.5" stroke-linecap="round"/>
        </g>

        <!-- Goggle Strap -->
        <rect x="42" y="72" width="116" height="15" fill="#334155"/>

        <!-- Goggle Rings -->
        <g class="goggle-frames">
          <!-- Left Eye Goggle -->
          <circle cx="78" cy="79" r="25" fill="none" stroke="url(#goggle-grad)" stroke-width="8" filter="url(#drop-shadow)"/>
          <!-- Right Eye Goggle -->
          <circle cx="122" cy="79" r="25" fill="none" stroke="url(#goggle-grad)" stroke-width="8" filter="url(#drop-shadow)"/>
        </g>

        <!-- Left Eye -->
        <g class="minion-eye left-eye">
          <circle cx="78" cy="79" r="19" fill="#FFFFFF"/>
          <g class="eye-pupil" id="${id}-pupil-left">
            <circle cx="78" cy="79" r="9" fill="#78350F"/> <!-- Iris Brown/Hazel -->
            <circle cx="78" cy="79" r="5" fill="#0F172A"/> <!-- Pupil -->
            <circle cx="80" cy="76" r="2.5" fill="#FFFFFF"/> <!-- Catchlight -->
          </g>
          <!-- Eyelid for blinking -->
          <path class="eyelid-top" d="M 59 79 A 19 19 0 0 1 97 79 Z" fill="#FFD200" style="display: none;"/>
        </g>

        <!-- Right Eye -->
        <g class="minion-eye right-eye">
          <circle cx="122" cy="79" r="19" fill="#FFFFFF"/>
          <g class="eye-pupil" id="${id}-pupil-right">
            <circle cx="122" cy="79" r="9" fill="#2563EB"/> <!-- Blue/Green Heterochromia eye! -->
            <circle cx="122" cy="79" r="5" fill="#0F172A"/> <!-- Pupil -->
            <circle cx="124" cy="76" r="2.5" fill="#FFFFFF"/> <!-- Catchlight -->
          </g>
          <!-- Eyelid for blinking -->
          <path class="eyelid-top" d="M 103 79 A 19 19 0 0 1 141 79 Z" fill="#FFD200" style="display: none;"/>
        </g>

        <!-- Cheerful Smile -->
        <path class="minion-smile" d="M 85 110 Q 100 124 115 110" fill="none" stroke="#1E293B" stroke-width="4.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  // Generate Stuart (1-eyed) Minion SVG
  getStuartSVG(id = "minion-stuart") {
    return `
      <svg id="${id}" class="interactive-minion-svg" viewBox="0 0 200 240" width="100%" height="100%" style="overflow: visible;">
        <defs>
          <filter id="stuart-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/>
          </filter>
          <linearGradient id="stuart-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE44D"/>
            <stop offset="70%" stop-color="#FFD200"/>
            <stop offset="100%" stop-color="#D4A700"/>
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="232" rx="60" ry="8" fill="rgba(0,0,0,0.3)"/>

        <!-- Feet -->
        <ellipse cx="76" cy="226" rx="18" ry="10" fill="#1E293B"/>
        <ellipse cx="124" cy="226" rx="18" ry="10" fill="#1E293B"/>

        <!-- Body -->
        <rect x="46" y="32" width="108" height="175" rx="54" fill="url(#stuart-yellow)" filter="url(#stuart-shadow)"/>

        <!-- Center parted sleek hair -->
        <g stroke="#1E293B" stroke-width="2.5" stroke-linecap="round">
          <path d="M 100 32 Q 85 28 65 42"/>
          <path d="M 100 32 Q 115 28 135 42"/>
        </g>

        <!-- Overalls -->
        <path d="M 46 165 C 46 195 62 205 100 205 C 138 205 154 195 154 165 L 154 150 L 46 150 Z" fill="#1E4ED8"/>
        <path d="M 70 134 L 130 134 L 130 170 L 70 170 Z" fill="#1E4ED8"/>
        <line x1="48" y1="135" x2="74" y2="148" stroke="#1D4ED8" stroke-width="10" stroke-linecap="round"/>
        <line x1="152" y1="135" x2="126" y2="148" stroke="#1D4ED8" stroke-width="10" stroke-linecap="round"/>
        <circle cx="73" cy="148" r="4" fill="#1E293B"/>
        <circle cx="127" cy="148" r="4" fill="#1E293B"/>

        <!-- Single Big Goggle Strap -->
        <rect x="46" y="74" width="108" height="15" fill="#334155"/>

        <!-- Big Center Goggle Frame -->
        <circle cx="100" cy="82" r="32" fill="none" stroke="#94A3B8" stroke-width="9" filter="url(#stuart-shadow)"/>

        <!-- Big Center Eye -->
        <g class="minion-eye single-eye">
          <circle cx="100" cy="82" r="26" fill="#FFFFFF"/>
          <g class="eye-pupil" id="${id}-pupil">
            <circle cx="100" cy="82" r="12" fill="#854D0E"/>
            <circle cx="100" cy="82" r="7" fill="#0F172A"/>
            <circle cx="103" cy="78" r="3" fill="#FFFFFF"/>
          </g>
          <path class="eyelid-top" d="M 74 82 A 26 26 0 0 1 126 82 Z" fill="#FFD200" style="display: none;"/>
        </g>

        <!-- Smirking mouth -->
        <path class="minion-smile" d="M 90 122 Q 106 128 116 116" fill="none" stroke="#1E293B" stroke-width="4.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  renderMinionSVGs() {
    // Fill any designated container with Minion SVGs
    document.querySelectorAll('[data-minion-type]').forEach(el => {
      const type = el.getAttribute('data-minion-type');
      const id = el.id || `minion-${Math.random().toString(36).substring(2, 7)}`;
      if (type === 'stuart') {
        el.innerHTML = this.getStuartSVG(id);
      } else {
        el.innerHTML = this.getBobSVG(id);
      }
    });
  }

  setupEyeTracking() {
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      document.querySelectorAll('.eye-pupil').forEach(pupil => {
        const rect = pupil.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;

        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(6.5, Math.hypot(deltaX, deltaY) / 25);

        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    });
  }

  setupBlinking() {
    const doBlink = () => {
      document.querySelectorAll('.eyelid-top').forEach(lid => {
        lid.style.display = 'block';
      });

      setTimeout(() => {
        document.querySelectorAll('.eyelid-top').forEach(lid => {
          lid.style.display = 'none';
        });
      }, 140);

      const nextBlink = Math.random() * 3500 + 2000; // 2 to 5.5 seconds
      setTimeout(doBlink, nextBlink);
    };

    setTimeout(doBlink, 2000);
  }

  setupInteractivity() {
    document.addEventListener('click', (e) => {
      const mascotCard = e.target.closest('.interactive-minion-svg, .mascot-canvas, .hero-minion-target');
      if (mascotCard) {
        this.triggerMinionReaction(mascotCard, e);
      }
    });
  }

  triggerMinionReaction(targetElem, event) {
    if (window.sound) {
      window.sound.playMinionGiggle();
      window.sound.playJump();
    }

    if (window.game) {
      window.game.addBananas(10, event ? event.clientX : null, event ? event.clientY : null);
    }

    // Animation bounce
    targetElem.style.transition = 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)';
    targetElem.style.transform = 'scale(1.15) translateY(-14px)';

    setTimeout(() => {
      targetElem.style.transform = 'scale(1) translateY(0)';
    }, 220);

    // Show Speech Bubble
    this.showSpeechBubble(targetElem);
  }

  showSpeechBubble(targetElem) {
    const container = targetElem.closest('.mascot-canvas') || targetElem.parentElement;
    if (!container) return;

    let bubble = container.querySelector('.minion-speech-bubble');
    if (!bubble) {
      bubble = document.createElement('div');
      bubble.className = 'minion-speech-bubble';
      container.appendChild(bubble);
    }

    const randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
    bubble.textContent = randomPhrase;
    bubble.style.display = 'block';

    if (this.speechTimeout) clearTimeout(this.speechTimeout);
    this.speechTimeout = setTimeout(() => {
      bubble.style.display = 'none';
    }, 2500);
  }
}

window.minions = new MinionMascot();
