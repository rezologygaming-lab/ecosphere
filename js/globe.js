// ========================
// 3D WEBGL GLOBE — Three.js
// ========================

(function () {
  const canvas = document.getElementById('globe-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // ---- Renderer ----
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(320, 320);
  renderer.setClearColor(0x000000, 0);

  // ---- Scene & Camera ----
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 2.5;

  // ---- Procedural Earth Texture ----
  function makeEarthTexture() {
    const size = 1024;
    const offscreen = document.createElement('canvas');
    offscreen.width = size;
    offscreen.height = size / 2;
    const ctx = offscreen.getContext('2d');

    // Deep ocean gradient
    const ocean = ctx.createLinearGradient(0, 0, size, size / 2);
    ocean.addColorStop(0, '#0a2a6e');
    ocean.addColorStop(0.3, '#0d3b8e');
    ocean.addColorStop(0.6, '#0a2f75');
    ocean.addColorStop(1, '#071e52');
    ctx.fillStyle = ocean;
    ctx.fillRect(0, 0, size, size / 2);

    // Land masses — simplified continents as filled polygons
    ctx.fillStyle = '#1c6e2e';

    // --- North America ---
    ctx.beginPath();
    ctx.moveTo(size * 0.08, size * 0.18);
    ctx.lineTo(size * 0.18, size * 0.10);
    ctx.lineTo(size * 0.28, size * 0.12);
    ctx.lineTo(size * 0.30, size * 0.22);
    ctx.lineTo(size * 0.27, size * 0.32);
    ctx.lineTo(size * 0.23, size * 0.42);
    ctx.lineTo(size * 0.18, size * 0.48);
    ctx.lineTo(size * 0.13, size * 0.45);
    ctx.lineTo(size * 0.10, size * 0.35);
    ctx.closePath();
    ctx.fill();

    // --- Greenland ---
    ctx.beginPath();
    ctx.moveTo(size * 0.20, size * 0.04);
    ctx.lineTo(size * 0.28, size * 0.02);
    ctx.lineTo(size * 0.32, size * 0.08);
    ctx.lineTo(size * 0.26, size * 0.14);
    ctx.lineTo(size * 0.18, size * 0.12);
    ctx.closePath();
    ctx.fill();

    // --- South America ---
    ctx.beginPath();
    ctx.moveTo(size * 0.20, size * 0.50);
    ctx.lineTo(size * 0.28, size * 0.48);
    ctx.lineTo(size * 0.30, size * 0.55);
    ctx.lineTo(size * 0.28, size * 0.70);
    ctx.lineTo(size * 0.22, size * 0.82);
    ctx.lineTo(size * 0.18, size * 0.80);
    ctx.lineTo(size * 0.16, size * 0.65);
    ctx.lineTo(size * 0.17, size * 0.53);
    ctx.closePath();
    ctx.fill();

    // --- Europe ---
    ctx.beginPath();
    ctx.moveTo(size * 0.43, size * 0.15);
    ctx.lineTo(size * 0.50, size * 0.12);
    ctx.lineTo(size * 0.54, size * 0.16);
    ctx.lineTo(size * 0.52, size * 0.26);
    ctx.lineTo(size * 0.47, size * 0.28);
    ctx.lineTo(size * 0.43, size * 0.24);
    ctx.closePath();
    ctx.fill();

    // --- Africa ---
    ctx.beginPath();
    ctx.moveTo(size * 0.43, size * 0.30);
    ctx.lineTo(size * 0.53, size * 0.28);
    ctx.lineTo(size * 0.57, size * 0.35);
    ctx.lineTo(size * 0.56, size * 0.50);
    ctx.lineTo(size * 0.52, size * 0.60);
    ctx.lineTo(size * 0.48, size * 0.70);
    ctx.lineTo(size * 0.47, size * 0.65);
    ctx.lineTo(size * 0.44, size * 0.55);
    ctx.lineTo(size * 0.41, size * 0.42);
    ctx.closePath();
    ctx.fill();

    // --- Asia ---
    ctx.beginPath();
    ctx.moveTo(size * 0.53, size * 0.10);
    ctx.lineTo(size * 0.75, size * 0.08);
    ctx.lineTo(size * 0.85, size * 0.14);
    ctx.lineTo(size * 0.88, size * 0.22);
    ctx.lineTo(size * 0.82, size * 0.32);
    ctx.lineTo(size * 0.72, size * 0.36);
    ctx.lineTo(size * 0.64, size * 0.40);
    ctx.lineTo(size * 0.58, size * 0.36);
    ctx.lineTo(size * 0.54, size * 0.26);
    ctx.closePath();
    ctx.fill();

    // --- India ---
    ctx.beginPath();
    ctx.moveTo(size * 0.62, size * 0.38);
    ctx.lineTo(size * 0.67, size * 0.37);
    ctx.lineTo(size * 0.66, size * 0.50);
    ctx.lineTo(size * 0.63, size * 0.54);
    ctx.lineTo(size * 0.60, size * 0.46);
    ctx.closePath();
    ctx.fill();

    // --- Southeast Asia / Indonesia ---
    ctx.beginPath();
    ctx.moveTo(size * 0.70, size * 0.42);
    ctx.lineTo(size * 0.78, size * 0.40);
    ctx.lineTo(size * 0.82, size * 0.46);
    ctx.lineTo(size * 0.80, size * 0.52);
    ctx.lineTo(size * 0.74, size * 0.50);
    ctx.closePath();
    ctx.fill();

    // --- Australia ---
    ctx.beginPath();
    ctx.moveTo(size * 0.73, size * 0.58);
    ctx.lineTo(size * 0.83, size * 0.55);
    ctx.lineTo(size * 0.88, size * 0.62);
    ctx.lineTo(size * 0.85, size * 0.72);
    ctx.lineTo(size * 0.76, size * 0.74);
    ctx.lineTo(size * 0.70, size * 0.67);
    ctx.closePath();
    ctx.fill();

    // --- Antarctica ---
    const polar = ctx.createLinearGradient(0, size * 0.88, 0, size * 1.0);
    polar.addColorStop(0, 'rgba(220,240,255,0)');
    polar.addColorStop(1, 'rgba(220,240,255,0.85)');
    ctx.fillStyle = polar;
    ctx.fillRect(0, size * 0.88, size, size * 0.12);

    // Arctic ice cap
    const arcticGrad = ctx.createLinearGradient(0, 0, 0, size * 0.08);
    arcticGrad.addColorStop(0, 'rgba(220,240,255,0.8)');
    arcticGrad.addColorStop(1, 'rgba(220,240,255,0)');
    ctx.fillStyle = arcticGrad;
    ctx.fillRect(0, 0, size, size * 0.08);

    // Subtle terrain shading on land
    ctx.fillStyle = 'rgba(30,100,40,0.3)';
    // Mountain highlights — random noise patches
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * size;
      const y = Math.random() * (size / 2);
      const r = Math.random() * 8 + 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ocean depth variation
    ctx.fillStyle = 'rgba(10,50,120,0.2)';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * size;
      const y = Math.random() * (size / 2);
      const rx = Math.random() * 30 + 10;
      const ry = Math.random() * 20 + 5;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(offscreen);
  }

  // ---- Cloud texture ----
  function makeCloudTexture() {
    const size = 512;
    const offscreen = document.createElement('canvas');
    offscreen.width = size;
    offscreen.height = size / 2;
    const ctx = offscreen.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, size, size / 2);

    for (let i = 0; i < 180; i++) {
      const x = Math.random() * size;
      const y = Math.random() * (size / 2);
      const rx = Math.random() * 40 + 10;
      const ry = Math.random() * 15 + 4;
      const alpha = Math.random() * 0.35 + 0.05;
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    return new THREE.CanvasTexture(offscreen);
  }

  // ---- Globe sphere ----
  const earthGeo = new THREE.SphereGeometry(1, 64, 64);
  const earthMat = new THREE.MeshPhongMaterial({
    map: makeEarthTexture(),
    specular: new THREE.Color(0x114477),
    shininess: 18,
  });
  const earth = new THREE.Mesh(earthGeo, earthMat);
  scene.add(earth);

  // ---- Cloud layer ----
  const cloudGeo = new THREE.SphereGeometry(1.015, 48, 48);
  const cloudMat = new THREE.MeshPhongMaterial({
    map: makeCloudTexture(),
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const clouds = new THREE.Mesh(cloudGeo, cloudMat);
  scene.add(clouds);

  // ---- Atmosphere glow ----
  const atmGeo = new THREE.SphereGeometry(1.08, 48, 48);
  const atmMat = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0x00ff88),
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.08,
  });
  scene.add(new THREE.Mesh(atmGeo, atmMat));

  // Second atmosphere rim (blue-ish)
  const atmGeo2 = new THREE.SphereGeometry(1.12, 48, 48);
  const atmMat2 = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0x74b9ff),
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.04,
  });
  scene.add(new THREE.Mesh(atmGeo2, atmMat2));

  // ---- Lights ----
  // Sunlight (from upper-left)
  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(3, 2, 4);
  scene.add(sun);

  // Subtle fill light from right
  const fill = new THREE.DirectionalLight(0x88ccff, 0.18);
  fill.position.set(-3, -1, -2);
  scene.add(fill);

  // Ambient
  scene.add(new THREE.AmbientLight(0x111122, 0.6));

  // ---- Mouse drag interaction ----
  let isDragging = false;
  let prevMouseX = 0, prevMouseY = 0;
  let rotX = 0.3, rotY = 0;              // current tilt & rotation
  let velX = 0, velY = 0.0025;           // velocity for inertia

  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    velX = 0; velY = 0;
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouseX;
    const dy = e.clientY - prevMouseY;
    velY = dx * 0.005;
    velX = dy * 0.005;
    rotY += velY;
    rotX += velX;
    rotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotX));
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  // Touch support
  canvas.addEventListener('touchstart', e => {
    isDragging = true;
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
    velX = 0; velY = 0;
  });

  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!isDragging) return;
    const dx = e.touches[0].clientX - prevMouseX;
    const dy = e.touches[0].clientY - prevMouseY;
    velY = dx * 0.005;
    velX = dy * 0.005;
    rotY += velY;
    rotX += velX;
    rotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotX));
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
  }, { passive: false });

  canvas.addEventListener('touchend', () => { isDragging = false; });

  // ---- Animate ----
  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      // Auto-rotate with inertia
      velY += (0.0022 - velY) * 0.02;
      velX += (0 - velX) * 0.05;
    }

    rotY += velY;
    rotX += velX;
    rotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotX));

    earth.rotation.y = rotY;
    earth.rotation.x = rotX;
    clouds.rotation.y = rotY + (Date.now() * 0.00004);
    clouds.rotation.x = rotX;

    renderer.render(scene, camera);
  }
  animate();
})();
