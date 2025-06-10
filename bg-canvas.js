// Fond dynamique : espace stylisé avec étoiles, planètes animées et couleurs du site

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let w = window.innerWidth, h = window.innerHeight;

let stars = [];
let planets = [];

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  createStars();
  createPlanets();
}
window.addEventListener('resize', resize);

function createStars() {
  stars = [];
  const count = Math.floor((w * h) / 1600);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.1 + 0.5,
      alpha: Math.random() * 0.5 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.08 + Math.random() * 0.08
    });
  }
}

function createPlanets() {
  planets = [
    // Planète principale (bleue)
    {
      baseX: 0.18, baseY: 0.72,
      r: Math.max(60, Math.min(w, h) * 0.09),
      color: "#5b8def",
      shadow: "#a3c4f3",
      ring: true,
      orbitR: Math.max(30, Math.min(w, h) * 0.04),
      orbitSpeed: 0.07,
      orbitPhase: 0
    },
    // Planète secondaire (violette)
    {
      baseX: 0.82, baseY: 0.23,
      r: Math.max(32, Math.min(w, h) * 0.045),
      color: "#a3c4f3",
      shadow: "#5b8def",
      ring: false,
      orbitR: Math.max(18, Math.min(w, h) * 0.025),
      orbitSpeed: -0.09,
      orbitPhase: Math.PI / 2
    },
    // Petite planète blanche
    {
      baseX: 0.65, baseY: 0.8,
      r: Math.max(18, Math.min(w, h) * 0.025),
      color: "#fff",
      shadow: "#cfd8dc",
      ring: false,
      orbitR: Math.max(12, Math.min(w, h) * 0.018),
      orbitSpeed: 0.13,
      orbitPhase: Math.PI
    }
  ];
}

resize();

function drawStars(t) {
  for (let s of stars) {
    s.twinkle += s.speed;
    let tw = Math.abs(Math.sin(s.twinkle + t * 0.2));
    ctx.globalAlpha = s.alpha * (0.7 + 0.3 * tw);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * (0.7 + 0.6 * tw), 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#a3c4f3";
    ctx.shadowBlur = 6 * tw;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function drawPlanets(t) {
  for (let p of planets) {
    // Animation d'orbite
    const angle = t * p.orbitSpeed + p.orbitPhase;
    const px = w * p.baseX + Math.cos(angle) * p.orbitR * 2;
    const py = h * p.baseY + Math.sin(angle) * p.orbitR * 1.2;

    // Glow
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.arc(px, py, p.r * 1.7, 0, Math.PI * 2);
    ctx.fillStyle = p.shadow;
    ctx.shadowColor = p.shadow;
    ctx.shadowBlur = p.r * 1.2;
    ctx.fill();
    ctx.restore();

    // Planet
    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.beginPath();
    ctx.arc(px, py, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.shadow;
    ctx.shadowBlur = p.r * 0.7;
    ctx.fill();
    ctx.restore();

    // Ring (optionnel)
    if (p.ring) {
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = p.r * 0.23;
      ctx.beginPath();
      ctx.ellipse(
        px,
        py,
        p.r * 1.5,
        p.r * 0.45,
        Math.PI / 6 + Math.sin(t * 0.3) * 0.1,
        0,
        Math.PI * 2
      );
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  const t = performance.now() * 0.001;
  drawStars(t);
  drawPlanets(t);
  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}
animate();
