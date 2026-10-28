/* ============================================================
   LEMON MINT - INTERACTIVE DEVELOPER TERMINAL / CLI PLAYGROUND
   ============================================================ */

class DeveloperTerminal {
  constructor() {
    this.modal = null;
    this.logsEl = null;
    this.inputEl = null;
    this.initUI();
  }

  initUI() {
    const modal = document.createElement('div');
    modal.className = 'extras-modal-overlay';
    modal.id = 'terminal-modal';
    modal.innerHTML = `
      <div class="extras-modal-card" style="max-width:760px; background:#0B1120;">
        <div class="extras-modal-header" style="background:#070C16;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div class="terminal-buttons">
              <span class="term-dot term-dot-red" onclick="window.devTerminal.close()"></span>
              <span class="term-dot term-dot-yellow"></span>
              <span class="term-dot term-dot-green"></span>
            </div>
            <span style="font-family:monospace; color:#94A3B8; font-size:0.85rem; margin-left:8px;">
              lemonmint-cli v2.6.4 (bash)
            </span>
          </div>
          <button class="checkout-close-btn" onclick="window.devTerminal.close()">&times;</button>
        </div>

        <div style="padding:0;">
          <div class="terminal-logs" id="terminal-logs-body">
            <span style="color:#FFD200;">🍋 Welcome to Lemon Mint Interactive CLI!</span><br>
            <span style="color:#94A3B8;">Type <strong style="color:#34D399;">'help'</strong> to see available commands or tap the quick pills below:</span><br><br>
          </div>

          <div class="terminal-cmd-input-row">
            <span class="terminal-prompt">minion@lemonmint:~$</span>
            <input type="text" id="terminal-text-input" class="terminal-input" placeholder="Type command here..." autofocus>
          </div>

          <div class="terminal-shortcuts-bar">
            <span style="font-size:0.75rem; color:#64748B;">Quick commands:</span>
            <button class="term-shortcut-btn" onclick="window.devTerminal.execute('help')">help</button>
            <button class="term-shortcut-btn" onclick="window.devTerminal.execute('products')">products</button>
            <button class="term-shortcut-btn" onclick="window.devTerminal.execute('skills')">skills</button>
            <button class="term-shortcut-btn" onclick="window.devTerminal.execute('roi')">roi</button>
            <button class="term-shortcut-btn" onclick="window.devTerminal.execute('checkout')">checkout</button>
            <button class="term-shortcut-btn" onclick="window.devTerminal.execute('banana')">banana</button>
            <button class="term-shortcut-btn" onclick="window.devTerminal.execute('whatsapp')">whatsapp</button>
            <button class="term-shortcut-btn" onclick="window.devTerminal.execute('clear')">clear</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    this.modal = modal;
    this.logsEl = document.getElementById('terminal-logs-body');
    this.inputEl = document.getElementById('terminal-text-input');

    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = this.inputEl.value.trim();
        if (val) {
          this.execute(val);
          this.inputEl.value = '';
        }
      }
    });
  }

  open() {
    this.modal.classList.add('active');
    setTimeout(() => this.inputEl.focus(), 150);
    if (window.sound) window.sound.playLaser();
  }

  close() {
    this.modal.classList.remove('active');
  }

  execute(cmd) {
    const cleanCmd = cmd.toLowerCase().trim();
    this.printLine(`<span style="color:#FFD200;">minion@lemonmint:~$</span> ${cmd}`);

    if (window.sound) window.sound.playClick();

    switch (cleanCmd) {
      case 'help':
        this.printLine(`
Available Lemon Mint commands:
  • <strong style="color:#34D399;">products</strong>   - List active enterprise AI & SaaS arsenal
  • <strong style="color:#34D399;">skills</strong>     - Inspect bootcamp tracks & placement stats
  • <strong style="color:#34D399;">roi</strong>        - Launch interactive Enterprise ROI Calculator
  • <strong style="color:#34D399;">checkout</strong>   - Open multi-gateway payment & enrollment portal
  • <strong style="color:#34D399;">soundboard</strong> - Open Minion voice audio soundboard
  • <strong style="color:#34D399;">banana</strong>     - Harvest +25 bonus Banana XP
  • <strong style="color:#34D399;">whatsapp</strong>   - Connect with live Lemon Mint support
  • <strong style="color:#34D399;">clear</strong>      - Clear the terminal console
        `);
        break;

      case 'products':
        this.printLine(`
[ARSENAL REPORT]
1. MintFlow AI™ (Mythic Tier) - Multimodal Agent Orchestration
2. BananaBots RPA™ (Legendary) - 24/7 Financial & Pipeline Automation
3. OmniSphere Cloud Hub™ (Epic) - Multi-region Kubernetes Engine
4. LemonChat Engine™ (Mythic) - Official WhatsApp Conversational Commerce
5. SentinelShield™ (Legendary) - Zero-Trust API Armor & SOC2
6. PixelCraft UI/UX™ (Epic) - Gamified User Retention System
        `);
        break;

      case 'skills':
        this.printLine(`
[LEMON MINT ACADEMY PLACEMENT STATS]
• Placement Success: 96.8% | Avg Fresher Package: ₹8.5 LPA
1. Full-Stack Web & AI Engineering (16 Wks, ₹8.2 LPA Avg)
2. Data Science & Autonomous AI Agents (14 Wks, ₹10.5 LPA Avg)
3. Cloud DevOps & Kubernetes Hero (12 Wks, ₹9.0 LPA Avg)
4. Gamified UI/UX Design Systems (10 Wks, ₹7.8 LPA Avg)
        `);
        break;

      case 'roi':
        this.printLine(`Opening interactive ROI Calculator...`);
        this.close();
        if (window.openCalculator) window.openCalculator('enterprise');
        break;

      case 'checkout':
        this.printLine(`Opening secure payment gateway modal...`);
        this.close();
        if (window.openCheckout) window.openCheckout({ title: 'MintFlow AI - Enterprise License', priceINR: 24999, priceUSD: 299 });
        break;

      case 'soundboard':
        this.close();
        if (window.openSoundboard) window.openSoundboard();
        break;

      case 'banana':
        this.printLine(`<span style="color:#FFD200;">🍌 Harvested +25 Bananas! Banana power increased!</span>`);
        if (window.game) window.game.addBananas(25);
        break;

      case 'whatsapp':
        this.printLine(`Opening official WhatsApp support channel...`);
        if (window.whatsapp) window.whatsapp.open('Hi Lemon Mint! I am chatting from the developer terminal.');
        break;

      case 'clear':
        this.logsEl.innerHTML = '';
        break;

      default:
        this.printLine(`<span style="color:#EF4444;">Command not recognized: '${cmd}'. Type 'help' for valid commands.</span>`);
        break;
    }

    this.logsEl.scrollTop = this.logsEl.scrollHeight;
  }

  printLine(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    this.logsEl.appendChild(div);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.devTerminal = new DeveloperTerminal();
});

window.openTerminal = function() {
  if (window.devTerminal) window.devTerminal.open();
};
