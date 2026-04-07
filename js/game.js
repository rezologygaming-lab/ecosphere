// ========================
// ECOBALANCE GAME
// ========================

const EVENTS = [
  {
    icon: '⚡',
    text: 'A major energy company offers to build a coal power plant that will boost the economy significantly, but increase CO₂ emissions.',
    choices: [
      { label: 'Allow Coal Plant', desc: 'Boosts economy +20, but CO₂ +25 and happiness -5', co2: 25, eco: 20, happy: -5, log: '🏭 Coal plant built. Economy booms, but air quality drops.' },
      { label: 'Build Solar Farm', desc: 'Economy +8, CO₂ -15, happiness +10 (cleaner air)', co2: -15, eco: 8, happy: 10, log: '☀️ Solar farm launched. Clean energy future begins.' },
      { label: 'Invest in Wind', desc: 'Economy +5, CO₂ -10, happiness +8', co2: -10, eco: 5, happy: 8, log: '💨 Wind turbines installed. Steady green progress.' },
      { label: 'Do Nothing', desc: 'No change this round', co2: 2, eco: 0, happy: -3, log: '😴 City stagnates. Residents grow frustrated.' }
    ]
  },
  {
    icon: '🌳',
    text: 'Developers want to clear 500 hectares of forest for a new shopping district. Environmental groups are protesting.',
    choices: [
      { label: 'Allow Deforestation', desc: 'Economy +25, CO₂ +20, happiness +5 (jobs)', co2: 20, eco: 25, happy: 5, log: '🪓 Forest cleared. Short-term jobs, long-term damage.' },
      { label: 'Protect Forest', desc: 'Economy -5, CO₂ -20, happiness +15 (nature lovers)', co2: -20, eco: -5, happy: 15, log: '🌿 Forest protected. Biodiversity preserved!' },
      { label: 'Compromise: Mixed Zone', desc: 'Economy +10, CO₂ +5, happiness +5', co2: 5, eco: 10, happy: 5, log: '🤝 Mixed-use zone approved. Partial win.' },
      { label: 'Plant Urban Gardens', desc: 'Economy -2, CO₂ -8, happiness +12', co2: -8, eco: -2, happy: 12, log: '🌻 Urban gardens bloom. Residents love it.' }
    ]
  },
  {
    icon: '🚗',
    text: 'The city's transport system is overwhelmed. You must choose a mobility upgrade.',
    choices: [
      { label: 'Expand Highways', desc: 'Economy +15, CO₂ +20, happiness +5 (short term)', co2: 20, eco: 15, happy: 5, log: '🛣️ Highways expanded. Traffic improved briefly.' },
      { label: 'Electric Metro', desc: 'Economy +10, CO₂ -25, happiness +20', co2: -25, eco: 10, happy: 20, log: '🚇 Metro launched! Massive transport revolution.' },
      { label: 'Cycling Network', desc: 'Economy +3, CO₂ -10, happiness +15', co2: -10, eco: 3, happy: 15, log: '🚲 Cycling paths built. City becomes more liveable.' },
      { label: 'EV Incentives', desc: 'Economy +5, CO₂ -8, happiness +10', co2: -8, eco: 5, happy: 10, log: '⚡ EV subsidies announced. Uptake begins slowly.' }
    ]
  },
  {
    icon: '🌊',
    text: 'Flooding threatens a low-lying district. Scientists warn of climate-related sea level rise.',
    choices: [
      { label: 'Build Concrete Walls', desc: 'Economy -10, CO₂ +8 (construction), happiness +5', co2: 8, eco: -10, happy: 5, log: '🧱 Sea walls built. Short-term protection secured.' },
      { label: 'Restore Mangroves', desc: 'Economy -5, CO₂ -20, happiness +18', co2: -20, eco: -5, happy: 18, log: '🌴 Mangroves restored. Natural flood barrier + carbon sink!' },
      { label: 'Relocate Residents', desc: 'Economy -15, CO₂ 0, happiness -10 (upheaval)', co2: 0, eco: -15, happy: -10, log: '🏘️ Residents relocated. Difficult but necessary.' },
      { label: 'Ignore the Warning', desc: 'Economy +5 short term, CO₂ +5, happiness -15 next round', co2: 5, eco: 5, happy: -15, log: '🙈 Flooding ignored. Disaster looms.' }
    ]
  },
  {
    icon: '🏭',
    text: 'A tech factory wants to relocate to your city. High employment but significant chemical waste.',
    choices: [
      { label: 'Accept Without Rules', desc: 'Economy +30, CO₂ +15, happiness -10 (pollution)', co2: 15, eco: 30, happy: -10, log: '☠️ Factory opens unchecked. Pollution rises.' },
      { label: 'Strict Green Standards', desc: 'Economy +15, CO₂ -5, happiness +10', co2: -5, eco: 15, happy: 10, log: '✅ Factory opens with green standards. Win-win!' },
      { label: 'Reject and Support SMEs', desc: 'Economy +5, CO₂ -5, happiness +5', co2: -5, eco: 5, happy: 5, log: '🏪 Local businesses supported instead.' },
      { label: 'Negotiate Hybrid Deal', desc: 'Economy +20, CO₂ +5, happiness +5', co2: 5, eco: 20, happy: 5, log: '🤝 Compromise reached with factory owners.' }
    ]
  },
  {
    icon: '🥩',
    text: 'The city\'s food system relies heavily on meat. A coalition pushes for sustainable food policies.',
    choices: [
      { label: 'Meat Tax', desc: 'Economy -5, CO₂ -18, happiness -8 (unpopular)', co2: -18, eco: -5, happy: -8, log: '💸 Meat tax implemented. Emissions drop.' },
      { label: 'Plant-Based Subsidies', desc: 'Economy -3, CO₂ -12, happiness +5', co2: -12, eco: -3, happy: 5, log: '🥦 Plant-based food gets cheaper. Diets shift.' },
      { label: 'School Food Programs', desc: 'Economy -8, CO₂ -8, happiness +15', co2: -8, eco: -8, happy: 15, log: '🍎 Kids learn sustainable eating habits.' },
      { label: 'Status Quo', desc: 'Economy +3, CO₂ +8, happiness 0', co2: 8, eco: 3, happy: 0, log: '🍔 No change. Emissions from food continue.' }
    ]
  },
  {
    icon: '🌤️',
    text: 'A heatwave strikes! Citizens demand action. The city faces its hottest summer on record.',
    choices: [
      { label: 'Plant 10,000 Trees', desc: 'Economy -10, CO₂ -15, happiness +20', co2: -15, eco: -10, happy: 20, log: '🌳 Trees planted citywide. Future shade secured.' },
      { label: 'Cool Roof Program', desc: 'Economy -8, CO₂ -5, happiness +12', co2: -5, eco: -8, happy: 12, log: '🏠 White roofs reduce urban heat island.' },
      { label: 'Air Conditioning Push', desc: 'Economy +5, CO₂ +18, happiness +15', co2: 18, eco: 5, happy: 15, log: '❄️ AC units spread. More power demand.' },
      { label: 'Emergency Green Spaces', desc: 'Economy -5, CO₂ -10, happiness +18', co2: -10, eco: -5, happy: 18, log: '🌿 Parks expanded rapidly. City cools.' }
    ]
  },
  {
    icon: '⚗️',
    text: 'Scientists propose a direct air capture plant to remove CO₂ from the atmosphere. It\'s expensive.',
    choices: [
      { label: 'Full Funding', desc: 'Economy -20, CO₂ -30, happiness +10 (pride)', co2: -30, eco: -20, happy: 10, log: '🔬 DAC plant built! Cutting-edge climate tech.' },
      { label: 'Partial Funding + Research', desc: 'Economy -10, CO₂ -12, happiness +8', co2: -12, eco: -10, happy: 8, log: '🧪 Research funded. Slower but steady.' },
      { label: 'Private Partnership', desc: 'Economy -5, CO₂ -15, happiness +5', co2: -15, eco: -5, happy: 5, log: '🤝 Private sector co-funds the project.' },
      { label: 'Reject — Too Expensive', desc: 'Economy +10, CO₂ 0, happiness 0', co2: 0, eco: 10, happy: 0, log: '💰 Budget saved. Opportunity missed.' }
    ]
  },
  {
    icon: '🎓',
    text: 'Final year! How do you want to conclude your decade of climate leadership?',
    choices: [
      { label: 'Climate Education Blitz', desc: 'Economy -5, CO₂ -5, happiness +25 (legacy)', co2: -5, eco: -5, happy: 25, log: '📚 Future generations educated on climate.' },
      { label: 'International Climate Pact', desc: 'Economy +10, CO₂ -20, happiness +15', co2: -20, eco: 10, happy: 15, log: '🌏 Global cooperation secured.' },
      { label: 'Massive Rewilding', desc: 'Economy -8, CO₂ -25, happiness +20', co2: -25, eco: -8, happy: 20, log: '🦋 30% of land rewilded. Biodiversity soars!' },
      { label: 'Declare Climate Emergency', desc: 'Economy -3, CO₂ -15, happiness +10', co2: -15, eco: -3, happy: 10, log: '🚨 Official climate emergency declared. Action accelerated.' }
    ]
  }
];

let gameState = {
  year: 2025,
  co2: 50,
  economy: 70,
  happiness: 60,
  ecoScore: 100,
  round: 0,
  log: []
};

function updateHUD() {
  document.getElementById('g-year').textContent = gameState.year;
  document.getElementById('g-co2').textContent = Math.max(0, Math.round(gameState.co2));
  document.getElementById('g-eco').textContent = Math.max(0, Math.round(gameState.economy));
  document.getElementById('g-happy').textContent = Math.max(0, Math.round(gameState.happiness));
  document.getElementById('g-eco-score').textContent = Math.max(0, Math.round(gameState.ecoScore));
}

function makeChoice(choice) {
  gameState.co2 = Math.max(0, gameState.co2 + choice.co2);
  gameState.economy = Math.max(0, Math.min(100, gameState.economy + choice.eco));
  gameState.happiness = Math.max(0, Math.min(100, gameState.happiness + choice.happy));

  // EcoScore = happiness + (100 - co2 capped at 100) + economy
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

  if (gameState.round >= EVENTS.length || gameState.co2 >= 150 || gameState.happiness <= 0) {
    showResult();
  } else {
    loadRound();
  }
}

function updateLog() {
  const log = document.getElementById('game-log');
  log.innerHTML = gameState.log.slice(0, 6).map(l => `<div>${l}</div>`).join('');
}

function loadRound() {
  const event = EVENTS[gameState.round];
  document.getElementById('event-icon').textContent = event.icon;
  document.getElementById('event-text').textContent = event.text;

  const choicesEl = document.getElementById('game-choices');
  choicesEl.innerHTML = event.choices.map((c, i) => `
    <button class="choice-btn" onclick="makeChoice(window.GAME_CHOICES[${i}])">
      <span class="choice-label">${c.label}</span>
      ${c.desc}
    </button>
  `).join('');

  // Store choices globally for onclick access
  window.GAME_CHOICES = event.choices;
}

function showResult() {
  document.getElementById('game-event').style.display = 'none';
  document.getElementById('game-choices').style.display = 'none';
  document.getElementById('game-result').style.display = 'block';

  const score = gameState.ecoScore;
  let icon, title, text;

  if (gameState.co2 >= 150) {
    icon = '💀'; title = 'Environmental Collapse';
    text = `CO₂ levels reached critical mass. Extreme weather events, mass migration, and ecological breakdown define EcoCity's final years. Score: ${score}/100. Climate science teaches us: ignoring emissions has catastrophic consequences.`;
  } else if (gameState.happiness <= 0) {
    icon = '😔'; title = 'Social Breakdown';
    text = `Residents abandoned EcoCity. A greener city means nothing without liveable communities. Score: ${score}/100. True sustainability balances ecology AND human wellbeing.`;
  } else if (score >= 75) {
    icon = '🌍'; title = 'EcoCity Champions!';
    text = `Incredible work! EcoCity became a global model for sustainable urban living. CO₂ dropped, people thrived, and the economy stayed strong. Final EcoScore: ${score}/100. This is what real climate leadership looks like.`;
  } else if (score >= 50) {
    icon = '🌱'; title = 'Decent Progress';
    text = `EcoCity made meaningful strides but faced difficult trade-offs. Score: ${score}/100. The path to sustainability requires bold decisions — don't compromise the environment for short-term gains.`;
  } else {
    icon = '⚠️'; title = 'Mixed Results';
    text = `EcoCity survived but didn't flourish. Score: ${score}/100. Climate science shows us that half-measures delay disaster — they don't prevent it. Try again with bolder green choices.`;
  }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-text').textContent = text;
}

function resetGame() {
  gameState = { year: 2025, co2: 50, economy: 70, happiness: 60, ecoScore: 100, round: 0, log: [] };
  document.getElementById('game-event').style.display = 'flex';
  document.getElementById('game-choices').style.display = 'grid';
  document.getElementById('game-result').style.display = 'none';
  document.getElementById('game-log').innerHTML = '';
  updateHUD();
  // Reset to welcome screen
  document.getElementById('event-icon').textContent = '🌆';
  document.getElementById('event-text').textContent = 'You are the new Mayor of EcoCity. The city runs on coal and has a growing population. Your choices over the next 10 years will determine the planet\'s fate.';
  document.getElementById('game-choices').innerHTML = `<button class="choice-btn" style="grid-column:span 2" onclick="loadRound()"><span class="choice-label">Begin Your Term →</span>Press to start making decisions</button>`;
  window.GAME_CHOICES = [];
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  updateHUD();
  // Set up the initial start button
  document.getElementById('game-choices').innerHTML = `
    <button class="choice-btn" style="grid-column:span 2" onclick="loadRound()">
      <span class="choice-label">Begin Your Term as Mayor →</span>
      Press to start making decisions for EcoCity. 10 years, 9 critical decisions.
    </button>
  `;
});

window.resetGame = resetGame;
window.makeChoice = makeChoice;
