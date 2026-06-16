/* =====================================================
   MAINDUSA – Animaciones Premium · JavaScript Nativo
   ===================================================== */

/* ---- Estado global ---- */
let heroAnimated = false;

/* ============================================================
   LOADER PREMIUM
   ============================================================ */
(function initLoader() {
  const loader = document.getElementById('page-loader');
  const bar    = document.getElementById('loaderBar');
  if (!loader) return;

  // Congela las animaciones CSS del hero mientras el loader está activo
  document.body.classList.add('loader-active');

  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 13 + 5;
    if (progress >= 90) { progress = 90; clearInterval(progressInterval); }
    if (bar) bar.style.width = progress + '%';
  }, 140);

  function hideLoader() {
    clearInterval(progressInterval);
    if (bar) bar.style.width = '100%';

    setTimeout(() => {
      loader.classList.add('loader-hidden');
      document.body.classList.remove('loader-active');

      setTimeout(() => {
        loader.style.display = 'none';
        if (!heroAnimated) runHeroAnimations();
      }, 650);
    }, 380);
  }

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 900);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 700));
    setTimeout(hideLoader, 3200); // máximo 3.2s por si acaso
  }
})();

/* ============================================================
   NAVBAR SCROLL
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ============================================================
   MENÚ MÓVIL
   ============================================================ */
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
document.querySelectorAll('.mobile-nav-link, .mobile-menu .btn-primary').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

/* ============================================================
   CANVAS BOKEH PREMIUM
   ============================================================ */
(function initBokehCanvas() {
  const canvas = document.getElementById('sparkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const PALETTE = [
    { r:255, g:140, b:0   },
    { r:255, g:179, b:0   },
    { r:255, g:107, b:0   },
    { r:255, g:210, b:80  },
    { r:255, g:230, b:160 },
  ];

  class BokehParticle {
    constructor() { this.reset(true); }
    reset(initial) {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      this.r = c.r; this.g = c.g; this.b = c.b;
      const tier = Math.random();
      if (tier < 0.5)      { this.size = Math.random() * 2.5 + 0.8;  this.glow = 6;  }
      else if (tier < 0.8) { this.size = Math.random() * 5   + 3;    this.glow = 14; }
      else                 { this.size = Math.random() * 10  + 7;    this.glow = 28; }
      this.x    = Math.random() * W;
      this.y    = initial ? Math.random() * H : H + this.size + 10;
      this.vx   = (Math.random() - 0.5) * 0.7;
      this.vy   = -(Math.random() * 0.9 + 0.25);
      this.life = initial ? Math.random() : 0;
      this.maxLife = Math.random() * 0.4 + 0.6;
      this.speed = Math.random() * 0.004 + 0.002;
      this.twinkle = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.04 + 0.01;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life += this.speed;
      this.twinkle += this.twinkleSpeed;
      if (this.y < -this.size * 2 || this.life > 1) this.reset(false);
    }
    draw() {
      let alpha;
      if (this.life < 0.1)      alpha = this.life / 0.1;
      else if (this.life < 0.8) alpha = 1;
      else                      alpha = (1 - this.life) / 0.2;
      alpha = Math.min(1, Math.max(0, alpha)) * this.maxLife;
      alpha *= (0.7 + 0.3 * Math.sin(this.twinkle));

      ctx.save();
      ctx.globalAlpha = alpha * 0.35;
      ctx.shadowColor = `rgb(${this.r},${this.g},${this.b})`;
      ctx.shadowBlur  = this.glow * 2.5;
      ctx.fillStyle   = `rgb(${this.r},${this.g},${this.b})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 1.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = alpha;
      ctx.shadowBlur  = this.glow;
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grad.addColorStop(0,   `rgba(255,240,200,${alpha})`);
      grad.addColorStop(0.4, `rgba(${this.r},${this.g},${this.b},${alpha * 0.9})`);
      grad.addColorStop(1,   `rgba(${this.r},${this.g},${this.b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 130; i++) particles.push(new BokehParticle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ============================================================
   ORBS BOKEH CSS GRANDES
   ============================================================ */
(function createCSSBokehOrbs() {
  const wrap = document.getElementById('heroBokeh');
  if (!wrap) return;
  const configs = [
    ['large',  'c-orange', 8,   0, 14, 0,    '20px',  '1.2'],
    ['large',  'c-gold',   18,  0, 18, 2,    '-15px', '1.4'],
    ['large',  'c-white',  32,  0, 12, 4,    '10px',  '1.1'],
    ['large',  'c-orange', 50,  0, 16, 1,    '-22px', '1.3'],
    ['large',  'c-gold',   68,  0, 20, 3,    '18px',  '1.0'],
    ['large',  'c-white',  80,  0, 15, 5,    '-12px', '1.5'],
    ['large',  'c-orange', 92,  0, 17, 0.5,  '25px',  '1.2'],
    ['medium', 'c-gold',   5,   0, 10, 1.5,  '12px',  '1.0'],
    ['medium', 'c-orange', 22,  0, 9,  3,    '-8px',  '1.3'],
    ['medium', 'c-white',  38,  0, 11, 0,    '16px',  '0.9'],
    ['medium', 'c-gold',   55,  0, 13, 2.5,  '-10px', '1.1'],
    ['medium', 'c-orange', 72,  0, 8,  4,    '20px',  '1.4'],
    ['medium', 'c-white',  88,  0, 12, 1,    '-18px', '1.0'],
    ['medium', 'c-gold',   12,  0, 14, 6,    '8px',   '1.2'],
    ['medium', 'c-orange', 44,  0, 10, 2,    '-14px', '0.8'],
    ['medium', 'c-white',  62,  0, 11, 5,    '12px',  '1.3'],
    ['medium', 'c-gold',   78,  0, 9,  0.5,  '-6px',  '1.1'],
    ['medium', 'c-orange', 95,  0, 13, 3.5,  '22px',  '1.0'],
    ['small',  'c-gold',   3,   0, 7,  0,    '6px',   '1.0'],
    ['small',  'c-orange', 15,  0, 8,  1,    '-4px',  '1.1'],
    ['small',  'c-white',  28,  0, 6,  2,    '10px',  '0.9'],
    ['small',  'c-gold',   42,  0, 9,  3,    '-8px',  '1.2'],
    ['small',  'c-orange', 58,  0, 7,  4,    '5px',   '1.0'],
    ['small',  'c-white',  74,  0, 8,  1.5,  '-12px', '1.1'],
    ['small',  'c-gold',   85,  0, 6,  2.5,  '7px',   '0.9'],
    ['small',  'c-orange', 96,  0, 9,  0.5,  '-5px',  '1.3'],
  ];
  configs.forEach(([size, color, left, bottom, dur, delay, bx, bs]) => {
    const el = document.createElement('div');
    el.className = `bokeh-orb ${size} ${color}`;
    el.style.cssText = `left:${left}%;bottom:${bottom}%;animation-duration:${dur}s;animation-delay:-${delay}s;--bx:${bx};--bs:${bs};`;
    wrap.appendChild(el);
  });
})();

/* ============================================================
   ANIMACIONES DE ENTRADA DEL HERO – VANILLA JS NATIVO
   Curvas cubic-bezier de nivel Big Tech (Linear/Vercel/Stripe)
   ============================================================ */
function runHeroAnimations() {
  heroAnimated = true;

  const items = [
    { id: 'hero-badge',       delay: 0    },
    { id: 'hero-title',       delay: 210  },
    { id: 'hero-subtitle',    delay: 440  },
    { id: 'hero-ctas',        delay: 640  },
    { id: 'hero-stats',       delay: 820  },
    { id: 'scroll-indicator', delay: 1100 },
  ];

  items.forEach(({ id, delay }) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Cancelar animación CSS fallback y tomar control
    el.style.animation  = 'none';
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.filter     = 'blur(6px)';
    el.style.transition = 'none';
    el.getBoundingClientRect(); // fuerza reflow

    setTimeout(() => {
      el.style.transition = [
        `opacity 0.9s cubic-bezier(0.16,1,0.3,1)`,
        `transform 0.9s cubic-bezier(0.16,1,0.3,1)`,
        `filter 0.7s cubic-bezier(0.16,1,0.3,1)`,
      ].join(', ');
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
      el.style.filter    = 'blur(0px)';
    }, delay + 80);
  });

  // Lanzar contadores después de que los stats aparezcan
  setTimeout(animateCounters, 820 + 80 + 450);
}

/* ============================================================
   CONTADOR ANIMADO – VANILLA JS NATIVO (sin anime.js)
   ============================================================ */
function animateCounters() {
  function easeOutExpo(t) {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  document.querySelectorAll('.stat-number').forEach(el => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1900;
    const startTime = performance.now();

    function tick(now) {
      const t = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.floor(easeOutExpo(t) * target);
      if (t < 1) requestAnimationFrame(tick);
      else        el.textContent = target;
    }
    requestAnimationFrame(tick);
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function initScrollReveal() {
  document.body.classList.add('js-reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-card').forEach(el => observer.observe(el));

  setTimeout(() => {
    document.querySelectorAll('.reveal-up, .reveal-card').forEach(el => el.classList.add('visible'));
  }, 2500);
})();

/* ============================================================
   STATS COUNTER TRIGGER (al hacer scroll)
   ============================================================ */
(function initStatsCounter() {
  const statsEl  = document.getElementById('hero-stats');
  let   animated = false;

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      animateCounters();
      obs.disconnect();
    }
  }, { threshold: 0.5 });

  if (statsEl) obs.observe(statsEl);
})();

/* ============================================================
   PARALLAX SCROLL EN HERO
   ============================================================ */
(function initParallax() {
  const heroFrame = document.getElementById('hero-image-frame');
  if (!heroFrame) return;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          heroFrame.style.transform = `translateY(${scrollY * 0.08}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================================
   PARALLAX DE MOUSE EN HERO – EFECTO 3D PREMIUM
   Los elementos se mueven suavemente siguiendo el cursor
   con distintos factores para crear ilusión de profundidad
   ============================================================ */
(function initHeroMouseParallax() {
  const hero = document.getElementById('inicio');
  if (!hero || window.matchMedia('(max-width: 767px)').matches) return;

  const heroGrid   = hero.querySelector('.hero-grid');
  const glowLeft   = hero.querySelector('.hero-glow-left');
  const glowRight  = hero.querySelector('.hero-glow-right');
  const sparkCanvas = document.getElementById('sparkCanvas');

  // [elemento, factor-X, factor-Y, transform-base]
  const layers = [
    { el: glowLeft,    fx: -0.03,  fy: -0.02,  base: 'translateY(-50%)' },
    { el: glowRight,   fx:  0.025, fy:  0.015, base: '' },
    { el: heroGrid,    fx: -0.01,  fy: -0.006, base: '' },
    { el: sparkCanvas, fx:  0.006, fy:  0.004, base: '' },
  ];

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    targetX = e.clientX - rect.left  - rect.width  / 2;
    targetY = e.clientY - rect.top   - rect.height / 2;
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  (function animateParallax() {
    currentX += (targetX - currentX) * 0.055;
    currentY += (targetY - currentY) * 0.055;

    layers.forEach(({ el, fx, fy, base }) => {
      if (!el) return;
      const tx = currentX * fx;
      const ty = currentY * fy;
      el.style.transform = base
        ? `${base} translate(${tx}px, ${ty}px)`
        : `translate(${tx}px, ${ty}px)`;
    });

    requestAnimationFrame(animateParallax);
  })();
})();

/* ============================================================
   EFECTO MAGNÉTICO EN BOTONES – PREMIUM
   Botones que se "atraen" levemente hacia el cursor
   ============================================================ */
(function initMagneticButtons() {
  if (window.matchMedia('(max-width: 767px)').matches) return;

  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    let baseTransition = '';

    btn.addEventListener('mouseenter', () => {
      baseTransition = btn.style.transition || '';
    });

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left  - rect.width  / 2) * 0.14;
      const y = (e.clientY - rect.top   - rect.height / 2) * 0.18;
      btn.style.transition = 'transform 0.12s ease';
      btn.style.transform  = `translate(${x}px, ${y}px) translateY(-3px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
      btn.style.transform  = '';
      setTimeout(() => {
        btn.style.transition = baseTransition;
      }, 500);
    });
  });
})();

/* ============================================================
   SHIMMER EFFECT EN BOTONES PRIMARIOS
   ============================================================ */
(function initButtonShimmer() {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.querySelector('.btn-shimmer')) return;
    const shimmer = document.createElement('span');
    shimmer.className = 'btn-shimmer';
    btn.appendChild(shimmer);
  });
})();

/* ============================================================
   EFECTO TILT 3D LIGERO EN TARJETAS DE SERVICIO
   ============================================================ */
(function initCardTilt() {
  if (window.matchMedia('(max-width: 767px)').matches) return;

  document.querySelectorAll('.service-card, .benefit-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const xPct = (e.clientX - rect.left)  / rect.width  - 0.5;
      const yPct = (e.clientY - rect.top)   / rect.height - 0.5;
      card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease';
      card.style.transform  = `
        perspective(700px)
        rotateX(${-yPct * 4}deg)
        rotateY(${xPct  * 4}deg)
        translateY(-6px)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease';
      card.style.transform  = '';
    });
  });
})();

/* ============================================================
   HOVER GLOW RADIAL EN TARJETAS DE SERVICIO
   ============================================================ */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width)  * 100;
    const y    = ((e.clientY - rect.top)  / rect.height) * 100;
    this.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,107,0,0.09) 0%, rgba(5,5,7,0.6) 58%)`;
  });
  card.addEventListener('mouseleave', function() {
    this.style.background = '';
  });
});

/* ============================================================
   NAVBAR – LINK ACTIVO
   ============================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--orange)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   FORMULARIO → WHATSAPP
   ============================================================ */
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const fd       = new FormData(this);
  const nombre   = fd.get('nombre')   || '';
  const empresa  = fd.get('empresa')  || '';
  const tel      = fd.get('telefono') || '';
  const servicio = fd.get('servicio') || '';
  const msg      = fd.get('mensaje')  || '';

  const text = [
    `Hola MAINDUSA, soy ${nombre}${empresa ? ` de ${empresa}` : ''}.`,
    tel      ? `📞 Teléfono: ${tel}`     : '',
    servicio ? `🔧 Servicio: ${servicio}` : '',
    msg      ? `📝 ${msg}`               : '',
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/523333882211?text=${encodeURIComponent(text)}`, '_blank');
});

/* ============================================================
   SMOOTH SCROLL EN LINKS INTERNOS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   INIT – DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Si no hay loader (e.g. cacheado), lanzar hero animations directamente
  const loader = document.getElementById('page-loader');
  if (!loader) setTimeout(() => { if (!heroAnimated) runHeroAnimations(); }, 150);

  // Fallback de seguridad (máximo espera 3.8s)
  setTimeout(() => {
    if (!heroAnimated) runHeroAnimations();
  }, 3800);

  // Fallback para reveal-up / reveal-card
  setTimeout(() => {
    document.querySelectorAll('.reveal-up, .reveal-card').forEach(el => el.classList.add('visible'));
  }, 800);
});
