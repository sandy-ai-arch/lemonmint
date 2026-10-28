/* ============================================================
   LEMON MINT - CERTIFICATE & PLACEMENT VERIFICATION PORTAL
   ============================================================ */

class CertificateVerifier {
  constructor() {
    this.modal = null;
    this.records = {
      'LM-2026-AI88': {
        name: 'Rahul Sharma',
        track: 'Full-Stack Web & AI Engineering',
        gradDate: 'March 2026',
        placedAt: 'FinTech Nexus (SDE II - ₹14.5 LPA)',
        skills: ['React / Next.js', 'Python 3.13', 'FastAPI', 'LangChain', 'PostgreSQL'],
        capstone: 'Autonomous Customer Triage Agent',
        status: 'VERIFIED GRADUATE'
      },
      'LM-2026-FS42': {
        name: 'Sneha Kulkarni',
        track: 'Data Science & Autonomous AI Agents',
        gradDate: 'February 2026',
        placedAt: 'CloudScale Systems (AI Engineer - ₹12.0 LPA)',
        skills: ['PyTorch', 'Vector Databases', 'RAG Embeddings', 'Docker', 'MLOps'],
        capstone: 'Enterprise Financial Document Parser',
        status: 'VERIFIED GRADUATE'
      },
      'LM-2026-DO19': {
        name: 'Amit Patel',
        track: 'Cloud DevOps & Kubernetes Hero',
        gradDate: 'January 2026',
        placedAt: 'Apex Global Logistics (DevOps Lead - ₹11.2 LPA)',
        skills: ['Kubernetes', 'Terraform', 'AWS Multi-Region', 'CI/CD Pipelines'],
        capstone: 'Zero-Downtime Microservices Failover',
        status: 'VERIFIED GRADUATE'
      }
    };
    this.initUI();
  }

  initUI() {
    const modal = document.createElement('div');
    modal.className = 'extras-modal-overlay';
    modal.id = 'cert-modal';
    modal.innerHTML = `
      <div class="extras-modal-card">
        <div class="extras-modal-header">
          <h3>📜 Official Certificate & Placement Verification</h3>
          <button class="checkout-close-btn" onclick="window.certVerifier.close()">&times;</button>
        </div>

        <div class="extras-modal-body">
          <p style="font-size:0.9rem; color:#CBD5E1; margin-bottom:14px;">
            Recruiters & partners can verify official Lemon Mint credentials in real-time. Try sample IDs:
            <strong style="color:var(--color-banana); cursor:pointer;" onclick="document.getElementById('cert-input-id').value='LM-2026-AI88'">LM-2026-AI88</strong>,
            <strong style="color:var(--color-banana); cursor:pointer;" onclick="document.getElementById('cert-input-id').value='LM-2026-FS42'">LM-2026-FS42</strong>, or
            <strong style="color:var(--color-banana); cursor:pointer;" onclick="document.getElementById('cert-input-id').value='LM-2026-DO19'">LM-2026-DO19</strong>.
          </p>

          <div class="cert-verify-box">
            <input type="text" id="cert-input-id" class="cert-input" placeholder="Enter Certificate ID (e.g. LM-2026-AI88)" value="LM-2026-AI88">
            <button class="game-btn game-btn-banana game-btn-sm" onclick="window.certVerifier.verify()">
              🔍 VERIFY ID
            </button>
          </div>

          <div class="cert-card-result" id="cert-result-card">
            <div class="cert-badge-stamp">✓</div>
            <div style="font-family:var(--font-arcade); font-size:0.7rem; color:#10B981; margin-bottom:6px;">
              OFFICIAL VERIFIED CREDENTIAL
            </div>
            <h3 style="font-size:1.4rem; color:#0F172A; margin-bottom:4px;" id="cert-res-name">Rahul Sharma</h3>
            <p style="color:#64748B; font-size:0.9rem; margin-bottom:12px;" id="cert-res-track">Full-Stack Web & AI Engineering</p>

            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px; margin-bottom:14px; font-size:0.85rem; line-height:1.5;">
              <div><strong>Placement:</strong> <span id="cert-res-placed" style="color:#1D4ED8;">FinTech Nexus (₹14.5 LPA)</span></div>
              <div><strong>Graduation:</strong> <span id="cert-res-date">March 2026</span></div>
              <div><strong>Capstone Project:</strong> <span id="cert-res-capstone">Autonomous Customer Triage Agent</span></div>
              <div style="margin-top:6px;">
                <strong>Verified Skills:</strong>
                <div id="cert-res-skills" style="display:flex; flex-wrap:wrap; gap:4px; margin-top:4px;"></div>
              </div>
            </div>

            <button class="game-btn game-btn-whatsapp game-btn-sm" style="width:100%;" onclick="window.certVerifier.connectHiring()">
              💼 Request Candidate Interview via WhatsApp
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
    this.verify();
    if (window.sound) window.sound.playClick();
  }

  close() {
    this.modal.classList.remove('active');
  }

  verify() {
    const input = document.getElementById('cert-input-id');
    const val = input.value.trim().toUpperCase();
    const resultCard = document.getElementById('cert-result-card');

    if (this.records[val]) {
      const rec = this.records[val];
      document.getElementById('cert-res-name').textContent = rec.name;
      document.getElementById('cert-res-track').textContent = rec.track;
      document.getElementById('cert-res-placed').textContent = rec.placedAt;
      document.getElementById('cert-res-date').textContent = rec.gradDate;
      document.getElementById('cert-res-capstone').textContent = rec.capstone;

      const skillsBox = document.getElementById('cert-res-skills');
      skillsBox.innerHTML = rec.skills.map(s => `
        <span style="background:#E2E8F0; color:#334155; font-size:0.75rem; padding:2px 8px; border-radius:4px; font-weight:600;">${s}</span>
      `).join('');

      resultCard.classList.add('show');
      if (window.sound) window.sound.playCoin();
    } else {
      alert(`Certificate ID '${val}' not found in dummy ledger. Try LM-2026-AI88, LM-2026-FS42, or LM-2026-DO19!`);
    }
  }

  connectHiring() {
    const name = document.getElementById('cert-res-name').textContent;
    const id = document.getElementById('cert-input-id').value;
    const msg = `Hi Lemon Mint Placement Cell! 💼\nI verified candidate credential:\n• Candidate: ${name}\n• ID: ${id}\n\nOur company would like to review this candidate profile for hiring.`;
    if (window.whatsapp) window.whatsapp.sendToWhatsApp(msg);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.certVerifier = new CertificateVerifier();
});

window.openVerification = function() {
  if (window.certVerifier) window.certVerifier.open();
};
