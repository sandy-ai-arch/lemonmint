/* ============================================================
   LEMON MINT - PAYMENT GATEWAY & CHECKOUT ENGINE
   ============================================================ */

class CheckoutEngine {
  constructor() {
    this.modal = null;
    this.currentItem = {
      id: 'bootcamp-deposit',
      title: 'Full-Stack Web & AI - Token Seat Deposit',
      priceINR: 4999,
      priceUSD: 59,
      category: 'bootcamp'
    };
    this.currency = 'INR'; // 'INR' or 'USD'
    this.discountAmount = 0;
    this.appliedPromo = '';
    this.activeTab = 'upi';
    this.initUI();
  }

  initUI() {
    const modal = document.createElement('div');
    modal.className = 'checkout-modal-overlay';
    modal.id = 'checkout-modal';
    modal.innerHTML = `
      <div class="checkout-box">
        <!-- Header -->
        <div class="checkout-header">
          <div class="checkout-header-left">
            <span style="font-size:1.6rem;">💳</span>
            <div>
              <div class="checkout-header-title">Lemon Mint Secure Checkout</div>
              <div class="checkout-header-subtitle">
                <span>🔒 256-Bit SSL Encrypted</span> • <span>Instant Confirmation</span>
              </div>
            </div>
          </div>
          <button class="checkout-close-btn" onclick="window.checkout.close()">&times;</button>
        </div>

        <!-- Body -->
        <div class="checkout-body" id="checkout-main-body">
          <!-- Order Summary -->
          <div class="checkout-order-summary">
            <div class="checkout-summary-row">
              <span class="checkout-item-title" id="checkout-item-title">${this.currentItem.title}</span>
              <span style="font-weight:700; color:#FFFFFF;" id="checkout-item-base-price">₹${this.currentItem.priceINR.toLocaleString()}</span>
            </div>
            <div class="checkout-summary-row" id="checkout-discount-row" style="display:none; color:var(--color-mint-light);">
              <span>🍌 Promo Discount (<span id="checkout-promo-label"></span>)</span>
              <span id="checkout-discount-val">-₹0</span>
            </div>
            
            <div class="checkout-promo-wrap">
              <input type="text" id="checkout-promo-input" class="checkout-promo-input" placeholder="Promo code (e.g. BANANA20)">
              <button class="game-btn game-btn-banana game-btn-sm" style="padding:6px 14px;" onclick="window.checkout.applyPromo()">
                APPLY
              </button>
            </div>

            <div class="checkout-total-row">
              <span>Total Payable:</span>
              <span id="checkout-total-val">₹${this.currentItem.priceINR.toLocaleString()}</span>
            </div>
          </div>

          <!-- Gateway Selector Tabs -->
          <div>
            <label class="checkout-label">Select Payment Method:</label>
            <div class="gateway-tabs-row">
              <button class="gateway-tab-btn active" data-tab="upi" onclick="window.checkout.switchTab('upi', this)">
                <span class="gateway-icon">📱</span>
                <span>UPI / QR</span>
              </button>
              <button class="gateway-tab-btn" data-tab="card" onclick="window.checkout.switchTab('card', this)">
                <span class="gateway-icon">💳</span>
                <span>Cards</span>
              </button>
              <button class="gateway-tab-btn" data-tab="netbanking" onclick="window.checkout.switchTab('netbanking', this)">
                <span class="gateway-icon">🏦</span>
                <span>NetBanking</span>
              </button>
              <button class="gateway-tab-btn" data-tab="whatsapp" onclick="window.checkout.switchTab('whatsapp', this)">
                <span class="gateway-icon">💬</span>
                <span>WhatsApp Pay</span>
              </button>
            </div>
          </div>

          <!-- Gateway Panes -->
          <!-- 1. UPI Pane -->
          <div class="gateway-content-pane active" id="pane-upi">
            <div class="upi-qr-area">
              <p style="font-size:0.85rem; color:#CBD5E1;">
                Scan with any UPI App (Google Pay, PhonePe, Paytm, BHIM):
              </p>
              <div class="qr-code-frame" id="upi-qr-code">
                <!-- Dynamic SVG QR Code -->
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <rect width="100" height="100" fill="#FFFFFF"/>
                  <!-- QR Patterns (Stylized authentic look) -->
                  <rect x="10" y="10" width="25" height="25" fill="#0F172A"/>
                  <rect x="15" y="15" width="15" height="15" fill="#FFFFFF"/>
                  <rect x="18" y="18" width="9" height="9" fill="#0F172A"/>

                  <rect x="65" y="10" width="25" height="25" fill="#0F172A"/>
                  <rect x="70" y="15" width="15" height="15" fill="#FFFFFF"/>
                  <rect x="73" y="18" width="9" height="9" fill="#0F172A"/>

                  <rect x="10" y="65" width="25" height="25" fill="#0F172A"/>
                  <rect x="15" y="70" width="15" height="15" fill="#FFFFFF"/>
                  <rect x="18" y="73" width="9" height="9" fill="#0F172A"/>

                  <!-- Data dots -->
                  <rect x="42" y="15" width="6" height="6" fill="#0F172A"/>
                  <rect x="52" y="22" width="6" height="6" fill="#0F172A"/>
                  <rect x="42" y="32" width="16" height="6" fill="#0F172A"/>
                  <rect x="20" y="42" width="12" height="6" fill="#0F172A"/>
                  <rect x="42" y="48" width="16" height="6" fill="#0F172A"/>
                  <rect x="65" y="45" width="20" height="6" fill="#0F172A"/>
                  <rect x="70" y="65" width="15" height="15" fill="#0F172A"/>
                  <rect x="42" y="65" width="8" height="18" fill="#0F172A"/>
                  <circle cx="50" cy="50" r="7" fill="#FFD200"/>
                </svg>
              </div>

              <div class="upi-apps-row">
                <span class="upi-app-badge">🟢 Google Pay</span>
                <span class="upi-app-badge">🟣 PhonePe</span>
                <span class="upi-app-badge">🔵 Paytm</span>
                <span class="upi-app-badge">🇮🇳 BHIM UPI</span>
              </div>

              <div style="width:100%; max-width:320px; display:flex; gap:8px;">
                <input type="text" class="checkout-input" id="upi-vpa-input" placeholder="Or enter UPI ID (e.g. name@upi)">
              </div>

              <button class="game-btn game-btn-banana" style="width:100%; max-width:320px;" onclick="window.checkout.simulatePaymentSuccess('UPI')">
                ⚡ VERIFY & PAY NOW
              </button>
            </div>
          </div>

          <!-- 2. Card Pane -->
          <div class="gateway-content-pane" id="pane-card">
            <div class="card-form-grid">
              <div class="card-input-full">
                <label class="checkout-label">Card Number</label>
                <input type="text" class="checkout-input" id="card-num" placeholder="4532 •••• •••• 8892" maxlength="19">
              </div>
              <div class="card-input-full">
                <label class="checkout-label">Cardholder Name</label>
                <input type="text" class="checkout-input" id="card-name" placeholder="John Doe">
              </div>
              <div>
                <label class="checkout-label">Expiry Date</label>
                <input type="text" class="checkout-input" id="card-exp" placeholder="MM / YY" maxlength="5">
              </div>
              <div>
                <label class="checkout-label">CVV / CVC</label>
                <input type="password" class="checkout-input" id="card-cvv" placeholder="•••" maxlength="4">
              </div>
            </div>

            <button class="game-btn game-btn-banana" style="width:100%; margin-top:16px;" onclick="window.checkout.simulatePaymentSuccess('Card')">
              🔒 PAY SECURELY VIA CARD
            </button>
          </div>

          <!-- 3. NetBanking Pane -->
          <div class="gateway-content-pane" id="pane-netbanking">
            <label class="checkout-label">Select Your Bank:</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px;">
              <button class="stage-pill-btn" onclick="this.classList.toggle('selected')">🏛️ HDFC Bank</button>
              <button class="stage-pill-btn" onclick="this.classList.toggle('selected')">🏛️ ICICI Bank</button>
              <button class="stage-pill-btn" onclick="this.classList.toggle('selected')">🏛️ State Bank of India</button>
              <button class="stage-pill-btn" onclick="this.classList.toggle('selected')">🏛️ Axis Bank</button>
            </div>
            <button class="game-btn game-btn-banana" style="width:100%;" onclick="window.checkout.simulatePaymentSuccess('NetBanking')">
              CONTINUE TO NETBANKING ➔
            </button>
          </div>

          <!-- 4. WhatsApp Pay Pane -->
          <div class="gateway-content-pane" id="pane-whatsapp">
            <div class="wa-pay-card">
              <h4>💬 Pay via WhatsApp Direct Invoice</h4>
              <p>
                Get an instant payment link sent directly to your WhatsApp. Complete payment with 1-tap in WhatsApp or UPI!
              </p>
              <div style="margin-bottom:16px;">
                <input type="text" class="checkout-input" id="wa-pay-phone" placeholder="Enter your WhatsApp number (e.g. +91 9876543210)">
              </div>
              <button class="game-btn game-btn-whatsapp" style="width:100%;" onclick="window.checkout.triggerWhatsAppPayment()">
                💬 SEND PAYMENT LINK ON WHATSAPP
              </button>
            </div>
          </div>
        </div>

        <!-- Success Receipt View -->
        <div class="checkout-success-pane" id="checkout-success-pane">
          <div class="success-badge-icon">✓</div>
          <h3 style="font-family:var(--font-fun); font-size:1.8rem; color:#FFFFFF; margin-bottom:6px;">
            Payment Successful! 🎉
          </h3>
          <p style="color:var(--color-banana); font-weight:700;">
            +500 🍌 Banana XP Awarded to your Minion Profile!
          </p>

          <div class="receipt-card" id="receipt-details">
            <!-- Injected dynamically -->
          </div>

          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="game-btn game-btn-whatsapp game-btn-sm" id="receipt-wa-btn">
              💬 Send Receipt to WhatsApp
            </button>
            <button class="game-btn game-btn-blue game-btn-sm" onclick="window.checkout.close()">
              DONE ✕
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    this.modal = modal;
  }

  open(itemData = null) {
    if (itemData) {
      this.currentItem = Object.assign({}, this.currentItem, itemData);
    }
    this.discountAmount = 0;
    this.appliedPromo = '';

    // Reset views
    document.getElementById('checkout-main-body').style.display = 'flex';
    document.getElementById('checkout-success-pane').classList.remove('active');
    document.getElementById('checkout-discount-row').style.display = 'none';

    this.updatePriceDisplay();
    this.modal.classList.add('active');

    if (window.sound) window.sound.playClick();
  }

  close() {
    this.modal.classList.remove('active');
  }

  updatePriceDisplay() {
    const basePrice = this.currency === 'INR' ? this.currentItem.priceINR : this.currentItem.priceUSD;
    const symbol = this.currency === 'INR' ? '₹' : '$';
    const finalPrice = Math.max(0, basePrice - this.discountAmount);

    document.getElementById('checkout-item-title').textContent = this.currentItem.title;
    document.getElementById('checkout-item-base-price').textContent = `${symbol}${basePrice.toLocaleString()}`;
    document.getElementById('checkout-total-val').textContent = `${symbol}${finalPrice.toLocaleString()}`;

    if (this.discountAmount > 0) {
      document.getElementById('checkout-discount-row').style.display = 'flex';
      document.getElementById('checkout-promo-label').textContent = this.appliedPromo;
      document.getElementById('checkout-discount-val').textContent = `-${symbol}${this.discountAmount.toLocaleString()}`;
    }
  }

  applyPromo() {
    const input = document.getElementById('checkout-promo-input');
    const code = input.value.trim().toUpperCase();
    const basePrice = this.currency === 'INR' ? this.currentItem.priceINR : this.currentItem.priceUSD;

    if (code === 'BANANA20') {
      this.discountAmount = Math.round(basePrice * 0.20);
      this.appliedPromo = 'BANANA20 (20% OFF)';
    } else if (code === 'LEMONMINT') {
      this.discountAmount = this.currency === 'INR' ? 1000 : 15;
      this.appliedPromo = 'LEMONMINT';
    } else if (code === 'FRESHSTART') {
      this.discountAmount = Math.round(basePrice * 0.15);
      this.appliedPromo = 'FRESHSTART (15% OFF)';
    } else {
      alert('Invalid promo code. Try BANANA20 for 20% off!');
      return;
    }

    if (window.sound) window.sound.playCoin();
    this.updatePriceDisplay();
  }

  switchTab(tabId, btn) {
    document.querySelectorAll('.gateway-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.gateway-content-pane').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`pane-${tabId}`).classList.add('active');

    if (window.sound) window.sound.playClick();
  }

  simulatePaymentSuccess(method) {
    const txnId = `TXN_LM_${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toLocaleString();
    const symbol = this.currency === 'INR' ? '₹' : '$';
    const basePrice = this.currency === 'INR' ? this.currentItem.priceINR : this.currentItem.priceUSD;
    const finalPrice = Math.max(0, basePrice - this.discountAmount);

    // Audio and game reward
    if (window.sound) window.sound.playPowerup();
    if (window.game) {
      window.game.addBananas(500);
      window.game.unlockAchievement('paid_customer', '👑 VIP Lemon Mint Patron!', 'Completed enrollment/purchase with +500 Bananas!');
    }

    // Populate receipt
    const receiptBox = document.getElementById('receipt-details');
    receiptBox.innerHTML = `
      ========================================<br>
      🍋 LEMON MINT OFFICIAL PAYMENT RECEIPT<br>
      ========================================<br>
      TRANSACTION ID: <strong>${txnId}</strong><br>
      DATE & TIME   : ${now}<br>
      PACKAGE       : ${this.currentItem.title}<br>
      PAYMENT METHOD: ${method}<br>
      TOTAL PAID    : <strong>${symbol}${finalPrice.toLocaleString()}</strong><br>
      STATUS        : <span style="color:#34D399;">CONFIRMED & COMPLETED</span><br>
      ========================================<br>
      A confirmation has also been scheduled with Lemon Mint support.
    `;

    // WhatsApp receipt link
    const waBtn = document.getElementById('receipt-wa-btn');
    waBtn.onclick = () => {
      const msg = `Hi Lemon Mint Support! 🎉\nI just completed a payment:\n• Txn ID: ${txnId}\n• Item: ${this.currentItem.title}\n• Amount: ${symbol}${finalPrice.toLocaleString()}\n\nPlease verify and share my onboarding credentials.`;
      if (window.whatsapp) {
        window.whatsapp.sendToWhatsApp(msg);
      }
    };

    // Swap view
    document.getElementById('checkout-main-body').style.display = 'none';
    document.getElementById('checkout-success-pane').classList.add('active');
  }

  triggerWhatsAppPayment() {
    const phoneInput = document.getElementById('wa-pay-phone');
    const userPhone = phoneInput.value.trim() || 'my registered phone';
    const symbol = this.currency === 'INR' ? '₹' : '$';
    const basePrice = this.currency === 'INR' ? this.currentItem.priceINR : this.currentItem.priceUSD;
    const finalPrice = Math.max(0, basePrice - this.discountAmount);

    const msg = `Hi Lemon Mint Finance! 💳\nI want to pay via WhatsApp Pay / Direct Link:\n• Item: ${this.currentItem.title}\n• Amount: ${symbol}${finalPrice.toLocaleString()}\n• Phone: ${userPhone}\n\nPlease generate my direct payment link.`;

    if (window.whatsapp) {
      window.whatsapp.sendToWhatsApp(msg);
    }
    this.close();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.checkout = new CheckoutEngine();
});

// Helper for quick checkout
window.openCheckout = function(itemData) {
  if (window.checkout) {
    window.checkout.open(itemData);
  }
};
