# 🍋 Lemon Mint - Gamified Tech & Placement Web Experience

> **"Where Serious Tech Meets Playful Genius!"**

A modern, high-engagement website for **Lemon Mint**, crafted with a Minion arcade game theme, interactive SVG characters, sound effects, gamified quest mechanics, and integrated WhatsApp customer chat.

---

## 🌟 Pages Overview

1. **Page 1: Landing Page (`index.html`)**
   - **Hero Arena**: Features an interactive SVG Minion mascot whose eyes track your cursor in real time. Click him for funny speech bubbles, giggle sounds, and bonus banana XP.
   - **The 4 Superpowers**: Enterprise AI agents, cloud architectures, gamified bootcamps, and instant WhatsApp support.
   - **Interactive Quest Center**: Complete missions like inspecting products, clicking mascots, and testing WhatsApp to rank up.
   - **Rapid Banana Clicker Station**: Tap the giant banana to rack up XP and trigger arcade soundwaves.
   - **Hall of Fame**: Client and alumni success reviews.

2. **Page 2: Products and Solutions (`products.html`)**
   - **Minion Inventor Arsenal**: Interactive filter tabs for AI, RPA, Cloud, and WhatsApp engines.
   - **6 Flagship Solutions**:
     - *MintFlow AI™* (Mythic Tier) - Multimodal autonomous agent workflow orchestrator.
     - *BananaBots RPA™* (Legendary Tier) - 24/7 financial reconciliation & data pipeline automation.
     - *OmniSphere Cloud Hub™* (Epic Tier) - Elastic Kubernetes microservices & edge caching.
     - *LemonChat WhatsApp AI Engine™* (Mythic Tier) - Official WhatsApp commerce, catalog & smart qualification.
     - *SentinelShield Cyber Armor™* (Legendary Tier) - Zero-Trust security & SOC2 compliance.
     - *PixelCraft Gamified UI/UX™* (Epic Tier) - Dopamine loops & gamification engine.
   - **Live Interactive Simulators**: Test workflows with real-time simulated diagnostics.
   - **Custom Quest Estimator**: Pick solution type, scale, and timeline to calculate specs and export directly to a pre-filled WhatsApp message.

3. **Page 3: Skill Development & Placement (`skills.html`)**
   - **The Minion Academy**: 4 industry-aligned career tracks:
     - *Full-Stack Web & AI Engineering* (16 Weeks)
     - *Data Science & Autonomous AI Agents* (14 Weeks)
     - *Cloud DevOps & Kubernetes Hero* (12 Weeks)
     - *Gamified UI/UX & Design Systems* (10 Weeks)
   - **Placement Arena**: 96.8% placement rate, ₹8.5 LPA average fresher CTC, 350+ hiring partners.
   - **The 4-Stage Boss Fight Roadmap**: Foundation Forge ➔ Project Arena ➔ Mock Boss Battles ➔ Placement Raid.
   - **1-Minute Skill Evaluator Quiz**: 3 interactive questions matching the user with their highest ROI career track and early bird scholarship, linked to 1-click WhatsApp admissions counseling.

---

## 💬 WhatsApp Integration

- **Floating Minion WhatsApp Launcher**: Located at the bottom-right of every page with pulsing rings and a minion badge.
- **Interactive Chat Drawer**:
  - Official WhatsApp styled modal with online status and verified badge.
  - Quick query chips (*Product Demo*, *Skill Training & Placement*, *Hire Engineers*, *Custom Tech*).
  - Custom text input that formats queries into official `https://wa.me/<number>?text=...` links.
  - **Configurable WhatsApp Number**: Click the ⚙️ gear icon in the chat header to change the destination phone number anytime.
- **Contextual Inquiries**: Every product card, course track, and estimator includes direct WhatsApp buttons with tailored pre-filled queries.

---

## 🎮 Game & Minion Features

- **Web Audio API Synth Engine (`js/audio.js`)**: 8-bit retro arcade sounds (coin pickups, jump sweeps, power-ups, minion giggles, laser zaps) generated directly in code without external audio downloads.
- **Sound Toggle**: Toggle sound ON/OFF anytime from the top Game HUD.
- **Banana XP & Level System (`js/game.js`)**: Gain bananas to level up from *Rookie Minion (Lvl 1)* to *Chief Banana Officer (Lvl 5)*.
- **Pupil Eye Tracking (`js/minion.js`)**: Minion eyes dynamically look toward your cursor anywhere on screen.
- **"Catch the Banana" Arcade Mini-Game**: 20-second arcade game accessible from the top HUD button. Tap falling bananas to beat the high score!

---

## 🚀 How to Run the Website

### Option 1: Direct in Browser
Simply double-click `index.html` (or open `file:///c:/Users/einsrek/Downloads/lemonmint/index.html` in Google Chrome, Microsoft Edge, or Firefox).

### Option 2: Local HTTP Server (Python)
Open a terminal in this directory and run:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`
