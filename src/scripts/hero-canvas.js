// Fondo del hero: una red de puntos que se mueve despacio y reacciona al puntero.
// Se pausa cuando el hero no está a la vista y queda quieta si el usuario pidió "reducir movimiento".
const canvas = document.querySelector('[data-hero-canvas]');

if (canvas) {
  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LINK = 130; // distancia máxima para unir dos puntos
  const POINTER = 170; // radio de influencia del puntero
  let width = 0;
  let height = 0;
  let points = [];
  let visible = true;
  let frame = 0;
  const pointer = { x: -9999, y: -9999 };

  const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--color-accent-2').trim();

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(90, (width * height) / 13000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
    draw();
  }

  function step() {
    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const d = Math.hypot(dx, dy);
      if (d > 0 && d < 90) {
        p.x += (dx / d) * 0.8;
        p.y += (dy / d) * 0.8;
      }
    }
  }

  function draw() {
    const color = accent();
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;

    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx.globalAlpha = (1 - d / LINK) * 0.28;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const dp = Math.hypot(a.x - pointer.x, a.y - pointer.y);
      if (dp < POINTER) {
        ctx.globalAlpha = (1 - dp / POINTER) * 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    if (!visible) return;
    step();
    draw();
    frame = requestAnimationFrame(loop);
  }

  const host = canvas.parentElement;
  host.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    if (reduce) draw();
  });
  host.addEventListener('pointerleave', () => {
    pointer.x = pointer.y = -9999;
    if (reduce) draw();
  });

  new ResizeObserver(resize).observe(canvas);

  // Redibuja con el color nuevo cuando cambia el tema.
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  if (!reduce) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) loop();
    }).observe(canvas);
  }
}
