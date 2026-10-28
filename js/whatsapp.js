/* ============================================================
   LEMONMINT - WHATSAPP INTEGRATION & INTERACTIVE CHAT ENGINE
   ============================================================ */

class WhatsAppEngine {
  constructor() {
    this.defaultPhone = "919876543210"; // Placeholder default (can be updated dynamically)
    this.phone = localStorage.getItem('lemonmint_wa_phone') || this.defaultPhone;
    this.isOpen = false;
    this.initUI();
  }

  getPhoneNumber() {
    return this.phone;
  }

  setPhoneNumber(newPhone) {
    const cleaned = newPhone.replace(/[^0-9]/g, '');
    if (cleaned.length >= 10) {
      this.phone = cleaned;
      localStorage.setItem('lemonmint_wa_phone', this.phone);
      return true;
    }
    return false;
  }

  initUI() {
    // 1. Floating WhatsApp Launcher
    const launcher = document.createElement('div');
    launcher.className = 'whatsapp-floating-wrap';
    launcher.id = 'wa-floating-launcher';
    launcher.innerHTML = `
      <div class="whatsapp-tooltip">
        <span>💬 Have a Query? Chat with Us!</span>
      </div>
      <button class="whatsapp-trigger-btn" id="wa-trigger-btn" aria-label="Open WhatsApp Chat">
        <div class="wa-pulse-ring"></div>
        <svg class="wa-icon-svg" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.99.588 1.95.897 3.029.897 3.182 0 5.768-2.586 5.769-5.766.001-3.182-2.585-5.784-5.993-6.084zm3.626 7.914c-.15.422-.867.781-1.205.828-.337.047-.781.07-2.257-.547-1.745-.73-2.871-2.508-2.958-2.625-.087-.117-.708-.942-.708-1.797 0-.855.449-1.275.608-1.45.16-.175.348-.219.464-.219.116 0 .232.001.333.006.107.006.25.04.385.367.14.339.479 1.168.522 1.254.043.087.072.189.014.304-.058.117-.087.189-.174.292-.087.103-.183.23-.261.309-.088.087-.18.181-.077.357.103.176.458.756.983 1.224.675.602 1.244.788 1.42.875.176.087.279.073.382-.044.103-.117.442-.514.56-.69.117-.176.234-.147.394-.088.16.059 1.015.478 1.19.565.174.088.291.132.334.205.043.073.043.424-.107.846z"/>
        </svg>
        <span class="wa-minion-badge">🍌</span>
      </button>
    `;
    document.body.appendChild(launcher);

    // 2. WhatsApp Interactive Chat Drawer Modal
    const modal = document.createElement('div');
    modal.className = 'wa-chat-modal';
    modal.id = 'wa-chat-modal';
    modal.innerHTML = `
      <div class="wa-chat-header">
        <div class="wa-header-profile">
          <div class="wa-avatar">
            🍌
            <span class="wa-online-dot"></span>
          </div>
          <div class="wa-header-info">
            <h4>Lemon Mint Assistant <span class="wa-verified-badge">✓</span></h4>
            <p>Typically replies instantly on WhatsApp</p>
          </div>
        </div>
        <div class="wa-header-actions">
          <button class="wa-config-btn" id="wa-toggle-config-btn" title="Configure WhatsApp Number">⚙️</button>
          <button class="wa-close-btn" id="wa-modal-close-btn" title="Close">&times;</button>
        </div>
      </div>

      <!-- Config number box (Collapsible) -->
      <div class="wa-phone-config-box" id="wa-phone-config-box">
        <label>Set Target WhatsApp Number (with country code):</label>
        <input type="text" class="wa-phone-input" id="wa-custom-phone-input" value="${this.phone}" placeholder="e.g. 919876543210">
        <button class="game-btn game-btn-banana game-btn-sm" style="width:100%; padding:6px;" id="wa-save-phone-btn">Save Number</button>
      </div>

      <div class="wa-chat-body" id="wa-chat-body">
        <div class="wa-msg-bubble wa-msg-incoming">
          <strong>Bello! 👋 Welcome to Lemon Mint!</strong><br>
          We're here to help you power up your tech solutions & fast-track your tech career! 
          <br><br>
          Select a quick query or write your own to chat directly with our team on WhatsApp:
          <span class="wa-msg-time">Just now</span>
        </div>

        <div class="wa-quick-options">
          <button class="wa-quick-chip" data-msg="Hi Lemon Mint! 🚀 I would like to get a live demo & pricing for your Products & Solutions.">
            🚀 Product Demo & Pricing
          </button>
          <button class="wa-quick-chip" data-msg="Hi Lemon Mint! 🎓 I am interested in your Skill Development & Guaranteed Placement Programs. Please share details.">
            🎓 Skill Training & Placement Query
          </button>
          <button class="wa-quick-chip" data-msg="Hi Lemon Mint! 💼 We are looking to hire high-performing tech talent & engineers. Let's discuss requirements.">
            💼 Hire Trained Talent / Engineers
          </button>
          <button class="wa-quick-chip" data-msg="Hi Lemon Mint! 🛠️ We need a custom web, mobile, or AI product built for our business. Can we get an estimate?">
            🛠️ Custom Tech Development Query
          </button>
        </div>
      </div>

      <div class="wa-chat-footer">
        <div class="wa-input-row">
          <input type="text" id="wa-custom-msg-input" class="wa-input-field" placeholder="Type your question here...">
          <button class="wa-send-btn" id="wa-send-action-btn" title="Send to WhatsApp">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
        <div class="wa-disclaimer">
          🔒 Secure 1-click redirect to official WhatsApp
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    this.bindEvents();
  }

  bindEvents() {
    const triggerBtn = document.getElementById('wa-trigger-btn');
    const closeBtn = document.getElementById('wa-modal-close-btn');
    const modal = document.getElementById('wa-chat-modal');
    const configBtn = document.getElementById('wa-toggle-config-btn');
    const configBox = document.getElementById('wa-phone-config-box');
    const savePhoneBtn = document.getElementById('wa-save-phone-btn');
    const phoneInput = document.getElementById('wa-custom-phone-input');

    triggerBtn.addEventListener('click', () => {
      this.toggle();
    });

    closeBtn.addEventListener('click', () => {
      this.close();
    });

    configBtn.addEventListener('click', () => {
      configBox.classList.toggle('open');
    });

    savePhoneBtn.addEventListener('click', () => {
      if (this.setPhoneNumber(phoneInput.value)) {
        configBox.classList.remove('open');
        alert(`WhatsApp number updated to +${this.phone}!`);
      } else {
        alert('Please enter a valid phone number with country code (e.g. 919876543210).');
      }
    });

    // Quick chip buttons
    modal.querySelectorAll('.wa-quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const msg = chip.getAttribute('data-msg');
        this.sendToWhatsApp(msg);
      });
    });

    // Send custom message
    const sendBtn = document.getElementById('wa-send-action-btn');
    const inputField = document.getElementById('wa-custom-msg-input');

    const handleSend = () => {
      const text = inputField.value.trim();
      if (text) {
        this.sendToWhatsApp(text);
        inputField.value = '';
      } else {
        this.sendToWhatsApp("Hi Lemon Mint! I have a question about your products and services.");
      }
    };

    sendBtn.addEventListener('click', handleSend);
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open(prefilledText = null) {
    const modal = document.getElementById('wa-chat-modal');
    modal.classList.add('active');
    this.isOpen = true;

    if (window.sound) window.sound.playCoin();

    if (prefilledText) {
      const inputField = document.getElementById('wa-custom-msg-input');
      inputField.value = prefilledText;
      inputField.focus();
    }
  }

  close() {
    const modal = document.getElementById('wa-chat-modal');
    modal.classList.remove('active');
    this.isOpen = false;
  }

  sendToWhatsApp(text) {
    if (window.sound) window.sound.playPowerup();
    if (window.game) {
      window.game.addBananas(50);
      window.game.unlockAchievement('wa_query', '💬 WhatsApp Connected!', 'Successfully initiated a quest on WhatsApp!');
    }

    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${this.phone}?text=${encoded}`;
    window.open(url, '_blank');
  }
}

// Global WhatsApp Instance & Helper
window.whatsapp = new WhatsAppEngine();

window.openWhatsAppQuery = function(text) {
  if (window.whatsapp) {
    window.whatsapp.sendToWhatsApp(text);
  }
};
