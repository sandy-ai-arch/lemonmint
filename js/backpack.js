/* ============================================================
   LEMON MINT - MINION BACKPACK (GAMIFIED CART & INVENTORY)
   ============================================================ */

class MinionBackpack {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('lemonmint_backpack') || '[]');
    this.modal = null;
    this.floatingTrigger = null;
    this.initUI();
    this.updateCountBadge();
  }

  initUI() {
    // 1. Floating Backpack Trigger
    const trigger = document.createElement('div');
    trigger.className = 'backpack-floating-trigger';
    trigger.id = 'backpack-floating-trigger';
    trigger.innerHTML = `
      <button class="backpack-btn" onclick="window.backpack.open()" title="Open Minion Inventory Backpack">
        🎒
        <span class="backpack-count-badge" id="backpack-count-badge">0</span>
      </button>
    `;
    document.body.appendChild(trigger);
    this.floatingTrigger = trigger;

    // 2. Backpack Modal
    const modal = document.createElement('div');
    modal.className = 'extras-modal-overlay';
    modal.id = 'backpack-modal';
    modal.innerHTML = `
      <div class="extras-modal-card">
        <div class="extras-modal-header">
          <h3>🎒 Your Minion Quest Backpack</h3>
          <button class="checkout-close-btn" onclick="window.backpack.close()">&times;</button>
        </div>

        <div class="extras-modal-body">
          <p style="font-size:0.85rem; color:#94A3B8; margin-bottom:14px;">
            Items collected for your company solutions & career upgrades:
          </p>

          <div id="backpack-items-list">
            <!-- Dynamic items -->
          </div>

          <div style="background:rgba(0,0,0,0.35); border-top:1px solid rgba(255,255,255,0.1); padding:16px 0; margin-top:16px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:1.1rem; color:#FFFFFF; font-weight:700;">Backpack Total:</span>
            <span style="font-family:var(--font-fun); font-size:1.4rem; color:var(--color-banana); font-weight:700;" id="backpack-total-val">₹0</span>
          </div>

          <div style="display:flex; gap:12px; margin-top:16px;">
            <button class="game-btn game-btn-banana" style="flex:1;" onclick="window.backpack.checkoutAll()">
              💳 PROCEED TO PAYMENT
            </button>
            <button class="game-btn game-btn-whatsapp game-btn-sm" onclick="window.backpack.sendBackpackToWhatsApp()">
              💬 WhatsApp Order
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    this.modal = modal;

    // Seed default item if empty
    if (this.items.length === 0) {
      this.addItem({
        id: 'fullstack-bootcamp-seat',
        title: 'Full-Stack Web & AI - Token Seat Deposit',
        priceINR: 4999,
        priceUSD: 59,
        category: 'Academy'
      }, false);
    }
  }

  addItem(item, notify = true) {
    // Avoid duplicates
    if (!this.items.some(i => i.id === item.id)) {
      this.items.push(item);
      localStorage.setItem('lemonmint_backpack', JSON.stringify(this.items));
      this.updateCountBadge();

      if (notify) {
        if (window.sound) window.sound.playCoin();
        if (window.game) window.game.addBananas(20);
        alert(`🎒 Added "${item.title}" to your Minion Backpack!`);
      }
    } else if (notify) {
      alert(`Item is already in your backpack!`);
    }
  }

  removeItem(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
    localStorage.setItem('lemonmint_backpack', JSON.stringify(this.items));
    this.updateCountBadge();
    this.renderItemsList();
    if (window.sound) window.sound.playClick();
  }

  updateCountBadge() {
    const badge = document.getElementById('backpack-count-badge');
    if (badge) {
      badge.textContent = this.items.length.toString();
      badge.style.display = this.items.length > 0 ? 'flex' : 'none';
    }
  }

  open() {
    this.renderItemsList();
    this.modal.classList.add('active');
    if (window.sound) window.sound.playClick();
  }

  close() {
    this.modal.classList.remove('active');
  }

  renderItemsList() {
    const listEl = document.getElementById('backpack-items-list');
    const totalEl = document.getElementById('backpack-total-val');

    if (this.items.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding:30px; color:#94A3B8;">
          <span style="font-size:2.5rem;">🎒</span><br>
          Your backpack is empty! Explore Products or Career Tracks to add quest items.
        </div>
      `;
      totalEl.textContent = '₹0';
      return;
    }

    let totalINR = 0;
    listEl.innerHTML = this.items.map(item => {
      totalINR += item.priceINR;
      return `
        <div class="backpack-item-row">
          <div class="backpack-item-left">
            <h5>${item.title}</h5>
            <p>Category: ${item.category} • Price: ₹${item.priceINR.toLocaleString()}</p>
          </div>
          <button class="backpack-item-remove" onclick="window.backpack.removeItem('${item.id}')" title="Remove item">&times;</button>
        </div>
      `;
    }).join('');

    totalEl.textContent = `₹${totalINR.toLocaleString()}`;
  }

  checkoutAll() {
    if (this.items.length === 0) {
      alert('Backpack is empty!');
      return;
    }
    const firstItem = this.items[0];
    let totalINR = 0;
    this.items.forEach(i => totalINR += i.priceINR);

    this.close();
    if (window.openCheckout) {
      window.openCheckout({
        id: 'backpack-bundle',
        title: this.items.length === 1 ? firstItem.title : `Backpack Quest Bundle (${this.items.length} items)`,
        priceINR: totalINR,
        priceUSD: Math.round(totalINR / 83),
        category: 'Bundle'
      });
    }
  }

  sendBackpackToWhatsApp() {
    if (this.items.length === 0) return;
    const titles = this.items.map(i => `• ${i.title} (₹${i.priceINR})`).join('\n');
    const msg = `Hi Lemon Mint! 🎒\nI have items in my Minion Backpack:\n${titles}\n\nCan you help me complete the booking and share payment options?`;
    if (window.whatsapp) window.whatsapp.sendToWhatsApp(msg);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.backpack = new MinionBackpack();
});

window.addToBackpack = function(item) {
  if (window.backpack) window.backpack.addItem(item);
};
