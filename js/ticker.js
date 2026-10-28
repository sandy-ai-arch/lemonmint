/* ============================================================
   LEMON MINT - LIVE SOCIAL PROOF ACTIVITY TICKER (FOMO ENGINE)
   ============================================================ */

class SocialProofTicker {
  constructor() {
    this.events = [
      {
        avatar: "👨‍💻",
        title: "Rahul S. from Bengaluru",
        desc: "Just enrolled in Full-Stack Web & AI Track!",
        time: "2 mins ago"
      },
      {
        avatar: "⚡",
        title: "Apex Logistics Global",
        desc: "Booked a live enterprise demo of MintFlow AI™",
        time: "5 mins ago"
      },
      {
        avatar: "👩‍🎓",
        title: "Sneha K. from Hyderabad",
        desc: "Unlocked a 25% Early Bird Banana Scholarship 🍌",
        time: "11 mins ago"
      },
      {
        avatar: "🏢",
        title: "CloudScale Systems",
        desc: "Hired 3 Lemon Mint graduates for backend engineering!",
        time: "18 mins ago"
      },
      {
        avatar: "🚀",
        title: "FinTech Nexus",
        desc: "Deployed BananaBots RPA into live production!",
        time: "27 mins ago"
      },
      {
        avatar: "💳",
        title: "Priya R. from Pune",
        desc: "Reserved seat in Data Science & AI Bootcamp (₹4,999)",
        time: "34 mins ago"
      },
      {
        avatar: "🎮",
        title: "Karthik V. from Chennai",
        desc: "Scored 180 🍌 in Catch the Banana Arcade!",
        time: "42 mins ago"
      }
    ];
    this.currentIndex = 0;
    this.container = null;
    this.isPaused = false;
    this.timer = null;
    this.init();
  }

  init() {
    const wrap = document.createElement('div');
    wrap.className = 'social-proof-ticker';
    wrap.id = 'social-proof-ticker';
    document.body.appendChild(wrap);
    this.container = wrap;

    // Start rotation
    setTimeout(() => {
      this.showNextEvent();
      this.startLoop();
    }, 4000);
  }

  startLoop() {
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.showNextEvent();
      }
    }, 11000); // New toast every 11s
  }

  showNextEvent() {
    const ev = this.events[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.events.length;

    this.container.innerHTML = `
      <div class="proof-card" id="active-proof-card">
        <button class="proof-close-btn" onclick="this.parentElement.remove()">&times;</button>
        <div class="proof-avatar">${ev.avatar}</div>
        <div class="proof-info">
          <h5>${ev.title}</h5>
          <p>${ev.desc}</p>
          <span class="proof-time">⏱️ ${ev.time} • Verified Activity</span>
        </div>
      </div>
    `;

    const card = document.getElementById('active-proof-card');
    card.addEventListener('mouseenter', () => this.isPaused = true);
    card.addEventListener('mouseleave', () => this.isPaused = false);

    // Slide in
    setTimeout(() => {
      if (card) card.classList.add('visible');
    }, 50);

    // Slide out after 6.5s
    setTimeout(() => {
      if (card && card.classList.contains('visible') && !this.isPaused) {
        card.classList.remove('visible');
      }
    }, 6500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.socialTicker = new SocialProofTicker();
});
