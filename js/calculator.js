/* ============================================================
   LEMON MINT - DUAL INTERACTIVE ROI & SALARY CALCULATOR
   ============================================================ */

class ROICalculator {
  constructor() {
    this.modal = null;
    this.initUI();
  }

  initUI() {
    const modal = document.createElement('div');
    modal.className = 'extras-modal-overlay';
    modal.id = 'roi-modal';
    modal.innerHTML = `
      <div class="extras-modal-card">
        <div class="extras-modal-header">
          <h3>🧮 Interactive Impact & ROI Calculator</h3>
          <button class="checkout-close-btn" onclick="window.roiCalc.close()">&times;</button>
        </div>

        <div class="extras-modal-body">
          <!-- Mode Tabs -->
          <div class="calc-tabs">
            <button class="calc-tab-btn active" id="tab-ent-btn" onclick="window.roiCalc.switchTab('enterprise')">
              🏢 Enterprise Software ROI
            </button>
            <button class="calc-tab-btn" id="tab-career-btn" onclick="window.roiCalc.switchTab('career')">
              🎓 Student Salary Multiplier
            </button>
          </div>

          <!-- Enterprise ROI Pane -->
          <div class="calc-pane active" id="pane-calc-enterprise">
            <div class="slider-group">
              <div class="slider-label-row">
                <span>Team Members on Repetitive Workflows:</span>
                <strong id="ent-team-val">10 Engineers / Ops</strong>
              </div>
              <input type="range" class="calc-range-slider" id="ent-team-range" min="1" max="50" value="10" oninput="window.roiCalc.calculateEnterprise()">
            </div>

            <div class="slider-group">
              <div class="slider-label-row">
                <span>Manual Hours per Person / Week:</span>
                <strong id="ent-hours-val">15 Hours/wk</strong>
              </div>
              <input type="range" class="calc-range-slider" id="ent-hours-range" min="5" max="35" value="15" oninput="window.roiCalc.calculateEnterprise()">
            </div>

            <div class="slider-group">
              <div class="slider-label-row">
                <span>Estimated Hourly Rate (USD):</span>
                <strong id="ent-rate-val">$45 / Hour</strong>
              </div>
              <input type="range" class="calc-range-slider" id="ent-rate-range" min="20" max="150" value="45" oninput="window.roiCalc.calculateEnterprise()">
            </div>

            <div class="calc-results-grid">
              <div class="calc-result-box">
                <h5>Monthly Hours Saved</h5>
                <div class="result-val" id="ent-res-hours">450 Hrs</div>
              </div>
              <div class="calc-result-box">
                <h5>Monthly Cost Savings</h5>
                <div class="result-val" id="ent-res-savings">$20,250</div>
              </div>
              <div class="calc-result-box">
                <h5>Annual Net Value</h5>
                <div class="result-val" id="ent-res-annual">$243,000</div>
              </div>
              <div class="calc-result-box">
                <h5>Efficiency Multiplier</h5>
                <div class="result-val" style="color:var(--color-banana);">4.8x ROI</div>
              </div>
            </div>

            <button class="game-btn game-btn-whatsapp" style="width:100%;" onclick="window.roiCalc.sendEnterpriseToWhatsApp()">
              💬 Send Custom ROI Report to WhatsApp
            </button>
          </div>

          <!-- Student Career Multiplier Pane -->
          <div class="calc-pane" id="pane-calc-career">
            <div class="slider-group">
              <div class="slider-label-row">
                <span>Your Current Annual CTC:</span>
                <strong id="career-cur-val">₹3.0 LPA (or Fresher)</strong>
              </div>
              <input type="range" class="calc-range-slider" id="career-cur-range" min="0" max="10" step="0.5" value="3" oninput="window.roiCalc.calculateCareer()">
            </div>

            <div class="slider-group">
              <div class="slider-label-row">
                <span>Select Target Track:</span>
                <strong id="career-track-val" style="color:var(--color-banana);">Full-Stack Web & AI (₹8.5 LPA)</strong>
              </div>
              <select id="career-track-select" class="checkout-input" style="background:#0F172A;" onchange="window.roiCalc.calculateCareer()">
                <option value="8.5">Full-Stack Web & AI Engineering (₹8.5 LPA Avg)</option>
                <option value="10.5">Data Science & Autonomous AI Agents (₹10.5 LPA Avg)</option>
                <option value="9.0">Cloud DevOps & Kubernetes Hero (₹9.0 LPA Avg)</option>
                <option value="7.8">Gamified UI/UX Design Systems (₹7.8 LPA Avg)</option>
              </select>
            </div>

            <div class="calc-results-grid">
              <div class="calc-result-box">
                <h5>Expected Placement CTC</h5>
                <div class="result-val" id="career-res-ctc">₹8.5 LPA</div>
              </div>
              <div class="calc-result-box">
                <h5>Salary Increase</h5>
                <div class="result-val" id="career-res-boost">+183%</div>
              </div>
              <div class="calc-result-box">
                <h5>Bootcamp Payback Period</h5>
                <div class="result-val" id="career-res-payback">1.8 Months</div>
              </div>
              <div class="calc-result-box">
                <h5>Early Bird Scholarship</h5>
                <div class="result-val" style="color:var(--color-banana);">Up to ₹15,000</div>
              </div>
            </div>

            <button class="game-btn game-btn-whatsapp" style="width:100%;" onclick="window.roiCalc.sendCareerToWhatsApp()">
              💬 Claim Career Roadmap & Scholarship on WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    this.modal = modal;
  }

  open(mode = 'enterprise') {
    this.switchTab(mode);
    this.calculateEnterprise();
    this.calculateCareer();
    this.modal.classList.add('active');
    if (window.sound) window.sound.playClick();
  }

  close() {
    this.modal.classList.remove('active');
  }

  switchTab(tab) {
    const entBtn = document.getElementById('tab-ent-btn');
    const carBtn = document.getElementById('tab-career-btn');
    const entPane = document.getElementById('pane-calc-enterprise');
    const carPane = document.getElementById('pane-calc-career');

    if (tab === 'enterprise') {
      entBtn.classList.add('active');
      carBtn.classList.remove('active');
      entPane.classList.add('active');
      carPane.classList.remove('active');
    } else {
      carBtn.classList.add('active');
      entBtn.classList.remove('active');
      carPane.classList.add('active');
      entPane.classList.remove('active');
    }
  }

  calculateEnterprise() {
    const team = parseInt(document.getElementById('ent-team-range').value, 10);
    const hours = parseInt(document.getElementById('ent-hours-range').value, 10);
    const rate = parseInt(document.getElementById('ent-rate-range').value, 10);

    document.getElementById('ent-team-val').textContent = `${team} Engineers / Ops`;
    document.getElementById('ent-hours-val').textContent = `${hours} Hours/wk`;
    document.getElementById('ent-rate-val').textContent = `$${rate} / Hour`;

    // 75% automation by Lemon Mint autonomous bots
    const monthlyHours = Math.round(team * hours * 4 * 0.75);
    const monthlySavings = monthlyHours * rate;
    const annualSavings = monthlySavings * 12;

    document.getElementById('ent-res-hours').textContent = `${monthlyHours.toLocaleString()} Hrs`;
    document.getElementById('ent-res-savings').textContent = `$${monthlySavings.toLocaleString()}`;
    document.getElementById('ent-res-annual').textContent = `$${annualSavings.toLocaleString()}`;
  }

  calculateCareer() {
    const curCTC = parseFloat(document.getElementById('career-cur-range').value);
    const targetCTC = parseFloat(document.getElementById('career-track-select').value);

    document.getElementById('career-cur-val').textContent = curCTC === 0 ? 'Fresher (₹0 LPA)' : `₹${curCTC.toFixed(1)} LPA`;
    document.getElementById('career-res-ctc').textContent = `₹${targetCTC.toFixed(1)} LPA`;

    const jumpPct = curCTC === 0 ? '+350%' : `+${Math.round(((targetCTC - curCTC) / Math.max(1, curCTC)) * 100)}%`;
    document.getElementById('career-res-boost').textContent = jumpPct;

    const monthlyDiff = ((targetCTC - curCTC) * 100000) / 12;
    const paybackMonths = Math.max(1.1, (65000 / Math.max(25000, monthlyDiff))).toFixed(1);
    document.getElementById('career-res-payback').textContent = `${paybackMonths} Months`;
  }

  sendEnterpriseToWhatsApp() {
    const hours = document.getElementById('ent-res-hours').textContent;
    const savings = document.getElementById('ent-res-savings').textContent;
    const annual = document.getElementById('ent-res-annual').textContent;

    const msg = `Hi Lemon Mint Solutions! 📊\nI ran your Enterprise ROI Calculator:\n• Estimated Monthly Savings: ${savings}\n• Monthly Hours Automated: ${hours}\n• Annual Net Impact: ${annual}\n\nCould we review our infrastructure and get a proposal for autonomous automation?`;
    if (window.whatsapp) window.whatsapp.sendToWhatsApp(msg);
  }

  sendCareerToWhatsApp() {
    const cur = document.getElementById('career-cur-val').textContent;
    const target = document.getElementById('career-res-ctc').textContent;
    const hike = document.getElementById('career-res-boost').textContent;

    const msg = `Hi Lemon Mint Academy! 🎓\nI calculated my Career Salary Jump:\n• Current: ${cur}\n• Target CTC: ${target}\n• Projected Hike: ${hike}\n\nPlease share batch dates and my early-bird scholarship confirmation!`;
    if (window.whatsapp) window.whatsapp.sendToWhatsApp(msg);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.roiCalc = new ROICalculator();
});

window.openCalculator = function(mode = 'enterprise') {
  if (window.roiCalc) window.roiCalc.open(mode);
};
