// ========================
// ANIMATED CANVAS BACKGROUND
// ========================

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let w, h, nodes = [], time = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Create floating data nodes
for (let i = 0; i < 60; i++) {
  nodes.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.4 + 0.1,
    color: Math.random() > 0.5 ? '#a8ff78' : '#34e89e'
  });
}

function drawBackground() {
  ctx.clearRect(0, 0, w, h);

  // Mesh gradient base
  const grad = ctx.createRadialGradient(w * 0.3, h * 0.3, 0, w * 0.3, h * 0.3, Math.max(w, h) * 0.8);
  grad.addColorStop(0, 'rgba(26,158,74,0.04)');
  grad.addColorStop(0.5, 'rgba(5,13,10,0)');
  grad.addColorStop(1, 'rgba(52,232,158,0.02)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Second orb
  const grad2 = ctx.createRadialGradient(w * 0.8, h * 0.7, 0, w * 0.8, h * 0.7, w * 0.5);
  grad2.addColorStop(0, 'rgba(116,185,255,0.04)');
  grad2.addColorStop(1, 'rgba(5,13,10,0)');
  ctx.fillStyle = grad2;
  ctx.fillRect(0, 0, w, h);

  // Moving nodes
  nodes.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > w) n.vx *= -1;
    if (n.y < 0 || n.y > h) n.vy *= -1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = n.color;
    ctx.globalAlpha = n.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  // Draw connections
  ctx.globalAlpha = 0.04;
  ctx.strokeStyle = '#a8ff78';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.globalAlpha = (1 - dist / 120) * 0.06;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;

  // Animated sine wave at bottom
  time += 0.005;
  ctx.beginPath();
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += 3) {
    const y = h - 100 + Math.sin(x * 0.008 + time) * 30 + Math.sin(x * 0.015 + time * 1.3) * 15;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  const waveGrad = ctx.createLinearGradient(0, 0, w, 0);
  waveGrad.addColorStop(0, 'rgba(168,255,120,0)');
  waveGrad.addColorStop(0.5, 'rgba(168,255,120,0.08)');
  waveGrad.addColorStop(1, 'rgba(168,255,120,0)');
  ctx.strokeStyle = waveGrad;
  ctx.stroke();

  // Second wave
  ctx.beginPath();
  for (let x = 0; x <= w; x += 3) {
    const y = h - 60 + Math.sin(x * 0.01 + time * 0.8 + 1) * 20 + Math.sin(x * 0.02 + time) * 10;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'rgba(52,232,158,0.05)';
  ctx.stroke();

  requestAnimationFrame(drawBackground);
}
drawBackground();

// Floating particles
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    const colors = ['#a8ff78', '#34e89e', '#74b9ff', '#ffd93d', '#78ffd6'];
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      filter: blur(${Math.random() > 0.7 ? 1 : 0}px);
    `;
    container.appendChild(p);
  }
}
createParticles();
