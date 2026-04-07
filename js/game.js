// ========================
// ECOBALANCE GAME — FULLY PLAYABLE
// ========================

const EVENTS = [
  {
    icon: '⚡',
    text: 'A major energy company offers to build a coal power plant that will boost the economy significantly, but increase CO₂ emissions.',
    choices: [
      { label: 'Allow Coal Plant',    desc: 'Economy +20 · CO₂ +25 · Happiness -5',  co2: 25,  eco: 20,  happy: -5,  log: '🏭 Coal plant built. Economy booms, but air quality drops.' },
      { label: 'Build Solar Farm',    desc: 'Economy +8 · CO₂ -15 · Happiness +10',  co2: -15, eco: 8,   happy: 10,  log: '☀️ Solar farm launched. Clean energy future begins.' },
      { label: 'Invest in Wind',      desc: 'Economy +5 · CO₂ -10 · Happiness +8',   co2: -10, eco: 5,   happy: 8,   log: '💨 Wind turbines installed. Steady green progress.' },
      { label: 'Do Nothing',          desc: 'Economy 0 · CO₂ +2 · Happiness -3',     co2: 2,   eco: 0,   happy: -3,  log: '😴 City stagnates. Residents grow frustrated.' }
    ]
  },
  {
    icon: '🌳',
    text: 'Developers want to clear 500 hectares of forest for a new shopping district. Environmental groups are protesting loudly.',
    choices: [
      { label: 'Allow Deforestation', desc: 'Economy +25 · CO₂ +20 · Happiness +5',  co2: 20,  eco: 25,  happy: 5,   log: '🪓 Forest cleared. Short-term jobs, long-term damage.' },
      { label: 'Protect the Forest',  desc: 'Economy -5 · CO₂ -20 · Happiness +15',  co2: -20, eco: -5,  happy: 15,  log: '🌿 Forest protected. Biodiversity preserved!' },
      { label: 'Mixed Zone',          desc: 'Economy +10 · CO₂ +5 · Happiness +5',   co2: 5,   eco: 10,  happy: 5,   log: '🤝 Mixed-use zone approved. Partial win.' },
      { label: 'Plant Urban Gardens', desc: 'Economy -2 · CO₂ -8 · Happiness +12',   co2: -8,  eco: -2,  happy: 12,  log: '🌻 Urban gardens bloom. Residents love it.' }
    ]
  },
  {
    icon: '🚗',
    text: "The city's transport system is overwhelmed. Gridlock is costing millions. You must choose a mobility upgrade.",
    choices: [
      { label: 'Expand Highways',     desc: 'Economy +15 · CO₂ +20 · Happiness +5',  co2: 20,  eco: 15,  happy: 5,   log: '🛣️ Highways expanded. Traffic improved briefly.' },
      { label: 'Electric Metro',      desc: 'Economy +10 · CO₂ -25 · Happiness +20', co2: -25, eco: 10,  happy: 20,  log: '🚇 Metro launched! Massive transport revolution.' },
      { label: 'Cycling Network',     desc: 'Economy +3 · CO₂ -10 · Happiness +15',  co2: -10, eco: 3,   happy: 15,  log: '🚲 Cycling paths built. City becomes more liveable.' },
      { label: 'EV Incentives',       desc: 'Economy +5 · CO₂ -8 · Happiness +10',   co2: -8,  eco: 5,   happy: 10,  log: '⚡ EV subsidies announced. Uptake begins slowly.' }
    ]
  },
  {
    icon: '🌊',
    text: 'Flooding threatens a low-lying district. Scientists warn of climate-related sea level rise accelerating.',
    choices: [
      { label: 'Build Concrete Walls',  desc: 'Economy -10 · CO₂ +8 · Happiness +5',   co2: 8,   eco: -10, happy: 5,   log: '🧱 Sea walls built. Short-term protection secured.' },
      { label: 'Restore Mangroves',     desc: 'Economy -5 · CO₂ -20 · Happiness +18',  co2: -20, eco: -5,  happy: 18,  log: '🌴 Mangroves restored. Natural flood barrier + carbon sink!' },
      { label: 'Relocate Residents',    desc: 'Economy -15 · CO₂ 0 · Happiness -10',   co2: 0,   eco: -15, happy: -10, log: '🏘️ Residents relocated. Difficult but necessary.' },
      { label: 'Ignore the Warning',    desc: 'Economy +5 · CO₂ +5 · Happiness -15',   co2: 5,   eco: 5,   happy: -15, log: '🙈 Flooding ignored. Disaster looms.' }
    ]
  },
  {
    icon: '🏭',
    text: 'A global tech factory wants to relocate to your city. High employment promised, but significant chemical waste risk.',
    choices: [
      { label: 'Accept Without Rules',    desc: 'Economy +30 · CO₂ +15 · Happiness -10', co2: 15,  eco: 30,  happy: -10, log: '☠️ Factory opens unchecked. Pollution rises.' },
      { label: 'Strict Green Standards',  desc: 'Economy +15 · CO₂ -5 · Happiness +10',  co2: -5,  eco: 15,  happy: 10,  log: '✅ Factory opens with green standards. Win-win!' },
      { label: 'Reject, Support SMEs',    desc: 'Economy +5 · CO₂ -5 · Happiness +5',    co2: -5,  eco: 5,   happy: 5,   log: '🏪 Local businesses supported instead.' },
      { label: 'Negotiate Hybrid Deal',   desc: 'Economy +20 · CO₂ +5 · Happiness +5',   co2: 5,   eco: 20,  happy: 5,   log: '🤝 Compromise reached with factory owners.' }
    ]
  },
  {
    icon: '🥩',
    text: "The city's food system relies heavily on meat. A coalition pushes for sustainable food policies.",
    choices: [
      { label: 'Meat Tax',              desc: 'Economy -5 · CO₂ -18 · Happiness -8',  co2: -18, eco: -5,  happy: -8,  log: '💸 Meat tax implemented. Emissions drop.' },
      { label: 'Plant-Based Subsidies', desc: 'Economy -3 · CO₂ -12 · Happiness +5',  co2: -12, eco: -3,  happy: 5,   log: '🥦 Plant-based food gets cheaper. Diets shift.' },
      { label: 'School Food Programs',  desc: 'Economy -8 · CO₂ -8 · Happiness +15',  co2: -8,  eco: -8,  happy: 15,  log: '🍎 Kids learn sustainable eating habits.' },
      { label: 'Status Quo',            desc: 'Economy +3 · CO₂ +8 · Happiness 0',    co2: 8,   eco: 3,   happy: 0,   log: '🍔 No change. Emissions from food continue.' }
    ]
  },
  {
    icon: '🌤️',
    text: "A brutal heatwave strikes! Citizens demand action. The city faces its hottest summer on record — 47°C.",
    choices: [
      { label: 'Plant 10,000 Trees',      desc: 'Economy -10 · CO₂ -15 · Happiness +20', co2: -15, eco: -10, happy: 20,  log: '🌳 Trees planted citywide. Future shade secured.' },
      { label: 'Cool Roof Program',        desc: 'Economy -8 · CO₂ -5 · Happiness +12',  co2: -5,  eco: -8,  happy: 12,  log: '🏠 White roofs reduce urban heat island.' },
      { label: 'Air Conditioning Push',    desc: 'Economy +5 · CO₂ +18 · Happiness +15', co2: 18,  eco: 5,   happy: 15,  log: '❄️ AC units spread. More power demand.' },
      { label: 'Emergency Green Spaces',   desc: 'Economy -5 · CO₂ -10 · Happiness +18', co2: -10, eco: -5,  happy: 18,  log: '🌿 Parks expanded rapidly. City cools.' }
    ]
  },
  {
    icon: '⚗️',
    text: "Scientists propose a Direct Air Capture plant to remove CO₂ from the atmosphere. It's expensive but groundbreaking.",
    choices: [
      { label: 'Full Funding',           desc: 'Economy -20 · CO₂ -30 · Happiness +10', co2: -30, eco: -20, happy: 10,  log: '🔬 DAC plant built! Cutting-edge climate tech.' },
      { label: 'Partial + Research',     desc: 'Economy -10 · CO₂ -12 · Happiness +8',  co2: -12, eco: -10, happy: 8,   log: '🧪 Research funded. Slower but steady.' },
      { label: 'Private Partnership',    desc: 'Economy -5 · CO₂ -15 · Happiness +5',   co2: -15, eco: -5,  happy: 5,   log: '🤝 Private sector co-funds the project.' },
      { label: 'Reject — Too Expensive', desc: 'Economy +10 · CO₂ 0 · Happiness 0',     co2: 0,   eco: 10,  happy: 0,   log: '💰 Budget saved. Opportunity missed.' }
    ]
  },
  {
    icon: '🎓',
    text: 'Final year! A decade of decisions comes to its conclusion. How will you cement your climate legacy?',
    choices: [
      { label: 'Climate Education Blitz',   desc: 'Economy -5 · CO₂ -5 · Happiness +25',  co2: -5,  eco: -5,  happy: 25,  log: '📚 Future generations educated on climate.' },
      { label: 'International Climate Pact',desc: 'Economy +10 · CO₂ -20 · Happiness +15', co2: -20, eco: 10,  happy: 15,  log: '🌏 Global cooperation secured.' },
      { label: 'Massive Rewilding',         desc: 'Economy -8 · CO₂ -25 · Happiness +20',  co2: -25, eco: -8,  happy: 20,  log: '🦋 30% of land rewilded. Biodiversity soars!' },
      { label: 'Declare Climate Emergency', desc: 'Economy -3 · CO₂ -15 · Happiness +10',  co2: -15, eco: -3,  happy: 10,  log: '🚨 Climate emergency declared. Action accelerated.' }
    ]
  }
];

// ---- Game State ----
let gameState = {
  year: 2025,
  co2: 50,
  economy: 70,
  happiness: 60,
  ecoScore: 100,
  round: 0,
  log: [],
  started: false
};

// ---- Update HUD ----
function updateHUD() {
  document.getElementById('g-year').textContent = gameState.year;
  document.getElementById('g-co2').textContent = Math.max(0, Math.round(gameState.co2));
  document.getElementById('g-eco').textContent = Math.max(0, Math.round(gameState.economy));
  document.getElementById('g-happy').textContent = Math.max(0, Math.round(gameState.happiness));
  document.getElementById('g-eco-score').textContent = Math.max(0, Math.round(gameState.ecoScore));

  // Colour-code CO2
  const co2El = document.getElementById('g-co2');
  if (gameState.co2 >= 100) co2El.style.color = '#ff6b6b';
  else if (gameState.co2 >= 70) co2El.style.color = '#ffd93d';
  else co2El.style.color = 'var(--green)';
}

// ---- Make a Choice ----
function makeChoice(idx) {
  const choice = window.GAME_CHOICES[idx];
  if (!choice) return;

  // Disable all buttons briefly for feedback
  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

  gameState.co2       = Math.max(0, gameState.co2 + choice.co2);
  gameState.economy   = Math.max(0, Math.min(100, gameState.economy + choice.eco));
  gameState.happiness = Math.max(0, Math.min(100, gameState.happiness + choice.happy));

  // EcoScore composite
  gameState.ecoScore = Math.max(0, Math.round(
    (gameState.happiness * 0.35) +
    (Math.max(0, 100 - gameState.co2) * 0.4) +
    (gameState.economy * 0.25)
  ));

  gameState.year++;
  gameState.round++;
  gameState.log.unshift(choice.log);

  updateHUD();
  updateLog();

  // Progress bar animation
  updateProgress();

  setTimeout(() => {
    if (gameState.round >= EVENTS.length || gameState.co2 >= 150 || gameState.happiness <= 0) {
      showResult();
    } else {
      loadRound();
    }
  }, 300);
}

// ---- Update Log ----
function updateLog() {
  const log = document.getElementById('game-log');
  log.innerHTML = gameState.log.slice(0, 5).map(l =>
    `<div class="log-entry">${l}</div>`
  ).join('');
}

// ---- Progress bar ----
function updateProgress() {
  const pct = (gameState.round / EVENTS.length) * 100;
  const bar = document.getElementById('g-progress-fill');
  if (bar) bar.style.width = pct + '%';
  const label = document.getElementById('g-round-label');
  if (label) label.textContent = `Round ${gameState.round} / ${EVENTS.length}`;
}

// ---- Load a Round ----
function loadRound() {
  const event = EVENTS[gameState.round];
  if (!event) return;

  const eventEl    = document.getElementById('game-event');
  const choicesEl  = document.getElementById('game-choices');
  const resultEl   = document.getElementById('game-result');

  eventEl.style.display   = 'flex';
  choicesEl.style.display = 'grid';
  resultEl.style.display  = 'none';

  document.getElementById('event-icon').textContent = event.icon;
  document.getElementById('event-text').textContent = event.text;

  window.GAME_CHOICES = event.choices;

  choicesEl.innerHTML = event.choices.map((c, i) => `
    <button class="choice-btn" onclick="makeChoice(${i})" id="choice-${i}">
      <span class="choice-label">${c.label}</span>
      <span class="choice-desc">${c.desc}</span>
    </button>
  `).join('');
}

// ---- Show Result ----
function showResult() {
  document.getElementById('game-event').style.display   = 'none';
  document.getElementById('game-choices').style.display = 'none';
  document.getElementById('game-result').style.display  = 'flex';

  const score = gameState.ecoScore;
  let icon, title, text;

  if (gameState.co2 >= 150) {
    icon = '💀'; title = 'Environmental Collapse';
    text = `CO₂ levels reached critical mass. Extreme weather, mass migration, and ecological breakdown define EcoCity's final years. Final EcoScore: ${score}/100.`;
  } else if (gameState.happiness <= 0) {
    icon = '😔'; title = 'Social Breakdown';
    text = `Residents abandoned EcoCity. A greener city means nothing without liveable communities. Final EcoScore: ${score}/100.`;
  } else if (score >= 80) {
    icon = '🌍'; title = 'EcoCity Champion!';
    text = `Incredible work! EcoCity became a global model for sustainable living. CO₂ dropped, people thrived, and the economy stayed strong. Final EcoScore: ${score}/100!`;
  } else if (score >= 60) {
    icon = '🌱'; title = 'Decent Progress';
    text = `EcoCity made meaningful strides but faced difficult trade-offs. Score: ${score}/100. The path to sustainability requires bolder decisions.`;
  } else if (score >= 40) {
    icon = '⚠️'; title = 'Mixed Results';
    text = `EcoCity survived but didn't flourish. Score: ${score}/100. Climate science shows that half-measures delay disaster — they don't prevent it.`;
  } else {
    icon = '🌫️'; title = 'Struggling City';
    text = `EcoCity limped through the decade with poor scores on all fronts. Score: ${score}/100. Try again with greener, bolder policies!`;
  }

  document.getElementById('result-icon').textContent  = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-text').textContent  = text;

  // Show final log
  updateLog();
}

// ---- Reset Game ----
function resetGame() {
  gameState = { year: 2025, co2: 50, economy: 70, happiness: 60, ecoScore: 100, round: 0, log: [], started: false };
  updateHUD();
  updateProgress();
  document.getElementById('game-log').innerHTML = '';
  showStartScreen();
}

// ---- Start Screen ----
function showStartScreen() {
  document.getElementById('game-event').style.display   = 'flex';
  document.getElementById('game-choices').style.display = 'grid';
  document.getElementById('game-result').style.display  = 'none';

  document.getElementById('event-icon').textContent = '🌆';
  document.getElementById('event-text').textContent =
    'You are the new Mayor of EcoCity. The city runs on coal and has a growing population. Your choices over the next 10 years will determine the planet\'s fate. Are you ready?';

  document.getElementById('game-choices').innerHTML = `
    <button class="choice-btn start-btn" style="grid-column: span 2" onclick="startGame()">
      <span class="choice-label">▶ Begin Your Term as Mayor</span>
      <span class="choice-desc">10 years · 9 critical decisions · Every choice matters</span>
    </button>
  `;
  window.GAME_CHOICES = [];
}

// ---- Start Game (called by the start button) ----
function startGame() {
  gameState.started = true;
  loadRound();
}

// ---- Expose globals ----
window.makeChoice  = makeChoice;
window.resetGame   = resetGame;
window.startGame   = startGame;
window.loadRound   = loadRound;
window.GAME_CHOICES = [];

// ---- INIT — runs immediately since script is at bottom of body ----
(function init() {
  // Build the progress bar into the HUD
  const hud = document.querySelector('.game-hud');
  if (hud) {
    const prog = document.createElement('div');
    prog.style.cssText = 'grid-column:span 5; margin-top:-0.5rem;';
    prog.innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="font-size:0.7rem;color:var(--text-muted);letter-spacing:0.05em;" id="g-round-label">Round 0 / 9</span>
        <span style="font-size:0.7rem;color:var(--green);">Progress</span>
      </div>
      <div style="height:3px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;">
        <div id="g-progress-fill" style="height:100%;width:0%;background:linear-gradient(90deg,var(--green-dark),var(--green));border-radius:3px;transition:width 0.5s ease;"></div>
      </div>
    `;
    hud.parentNode.insertBefore(prog, hud.nextSibling);
  }

  updateHUD();
  showStartScreen();
})();
