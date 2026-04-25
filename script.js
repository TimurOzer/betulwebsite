/* ─────────────────────────────────────────
   CAPTURE® — script.js
───────────────────────────────────────── */

(() => {

  /* ── Panel system ──────────────────── */
  const panels    = document.querySelectorAll('.panel');
  const navLinks  = document.querySelectorAll('.nav-link');
  const TOTAL     = panels.length;
  let current     = 0;
  let isAnimating = false;
  const ANIM_MS   = 900;

  function goTo(index) {
    if (index === current || isAnimating) return;
    if (index < 0 || index >= TOTAL) return;
    isAnimating = true;
    current = index;

    panels.forEach((p, i) => {
      p.classList.remove('is-active', 'is-above');
      if (i < current) p.classList.add('is-above');
      else if (i === current) p.classList.add('is-active');
    });

    navLinks.forEach(l =>
      l.classList.toggle('active', +l.dataset.panel === current)
    );

    setTimeout(() => { isAnimating = false; }, ANIM_MS);
  }

  function initPanels() {
    document.body.classList.add('panels-ready');
    panels[0].classList.add('is-active');
    if (navLinks[0]) navLinks[0].classList.add('active');

    let wheelAccum = 0, wheelTimer;

    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (isAnimating) return;
      wheelAccum += e.deltaY;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelAccum = 0; }, 200);
      if (wheelAccum >  60) { goTo(current + 1); wheelAccum = 0; }
      if (wheelAccum < -60) { goTo(current - 1); wheelAccum = 0; }
    }, { passive: false });

    let touchY = 0;
    window.addEventListener('touchstart', e => { touchY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchend', e => {
      if (isAnimating) return;
      const d = touchY - e.changedTouches[0].clientY;
      if (Math.abs(d) > 50) goTo(d > 0 ? current + 1 : current - 1);
    }, { passive: true });

    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(current + 1);
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   goTo(current - 1);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        goTo(+link.dataset.panel);
        burgerBtn.classList.remove('open');
        mobileMenu.classList.remove('active');
      });
    });
  }

  initPanels();

  /* ── Burger menu ───────────────────── */
  const burgerBtn  = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('open');
    mobileMenu.classList.toggle('active');
  });

  /* ── Work Belt ─────────────────────── */
  async function initBelt() {
    const wrap    = document.getElementById('workBeltWrap');
    const belt    = document.getElementById('workBelt');
    const elCur   = document.getElementById('workCurrent');
    const elTotal = document.getElementById('workTotal');
    const hint    = document.getElementById('workDragHint');
    if (!wrap || !belt) return;

    // ── 1. Detect images: try work_belt_01 … work_belt_20
    const MAX_PROBE = 20;
    const found = [];

    await Promise.all(
      Array.from({ length: MAX_PROBE }, (_, i) => {
        const n    = String(i + 1).padStart(2, '0');
        const src  = `images/work_belt_${n}.jpg`;
        return new Promise(res => {
          const img  = new Image();
          img.onload  = () => { found[i] = src; res(); };
          img.onerror = () => res();
          img.src = src;
        });
      })
    );

    const images = found.filter(Boolean); // remove gaps
    const count  = images.length;

    if (elTotal) elTotal.textContent = String(count || 0).padStart(2, '0');

    // ── 2. Build cards (original + 2 clones for infinite loop)
    function makeCard(src, idx) {
      const card = document.createElement('div');
      card.className = 'work__belt-card';
      card.dataset.index = idx;

      const img = document.createElement('img');
      img.src = src;
      img.alt = `Work ${idx + 1}`;
      img.draggable = false;
      card.appendChild(img);

      const fallback = document.createElement('div');
      fallback.className = 'work__belt-card-fallback';
      fallback.textContent = src.split('/').pop();
      card.appendChild(fallback);

      const info = document.createElement('div');
      info.className = 'work__belt-card-info';
      info.innerHTML = `
        <span class="work__belt-card-num">${String(idx + 1).padStart(2, '0')}</span>
        <span class="work__belt-card-label">work_belt_${String(idx + 1).padStart(2, '0')}.jpg</span>
      `;
      card.appendChild(info);
      return card;
    }

    // If no images found, show placeholder cards
    const srcList = count > 0 ? images : Array.from({ length: 5 }, (_, i) =>
      `images/work_belt_${String(i + 1).padStart(2, '0')}.jpg`
    );

    // Triple the cards: [set A] [set B — original] [set C]
    const sets = [srcList, srcList, srcList];
    sets.forEach((set, setIdx) => {
      set.forEach((src, i) => {
        belt.appendChild(makeCard(src, setIdx * srcList.length + i));
      });
    });

    // ── 3. Drag logic
    const GAP      = 16;
    const cardW    = () => belt.querySelector('.work__belt-card')?.offsetWidth || 400;
    const setW     = () => srcList.length * (cardW() + GAP);

    // Start at beginning of set B (middle)
    let offsetX    = 0;
    let startSet   = 0; // will be set after first render

    function initOffset() {
      startSet = -setW();
      offsetX  = startSet;
      belt.style.transform = `translateX(${offsetX}px)`;
    }

    // Wait for layout
    requestAnimationFrame(() => {
      requestAnimationFrame(initOffset);
    });

    let isDragging  = false;
    let dragStartX  = 0;
    let dragStartOX = 0;
    let velocity    = 0;
    let lastX       = 0;
    let lastTime    = 0;
    let rafId       = null;

    function applyTransform(x, snap = false) {
      if (snap) {
        belt.classList.add('is-snapping');
        setTimeout(() => belt.classList.remove('is-snapping'), 460);
      }
      offsetX = x;
      belt.style.transform = `translateX(${x}px)`;
      updateCounter();
    }

    function loopCheck() {
      const sw = setW();
      if (offsetX < startSet - sw) {
        offsetX += sw;
        belt.style.transform = `translateX(${offsetX}px)`;
      } else if (offsetX > startSet + sw) {
        offsetX -= sw;
        belt.style.transform = `translateX(${offsetX}px)`;
      }
    }

    function updateCounter() {
      if (!elCur || !srcList.length) return;
      const sw  = setW();
      const rel = -(offsetX - startSet); // how far we are from set B start
      const idx = Math.round(rel / (cardW() + GAP));
      const mod = ((idx % srcList.length) + srcList.length) % srcList.length;
      elCur.textContent = String(mod + 1).padStart(2, '0');
    }

    function onDragStart(x) {
      isDragging  = true;
      dragStartX  = x;
      dragStartOX = offsetX;
      lastX       = x;
      lastTime    = performance.now();
      velocity    = 0;
      belt.classList.remove('is-snapping');
      wrap.classList.add('is-dragging');
      if (hint) hint.classList.add('dragging');
      cancelAnimationFrame(rafId);
    }

    function onDragMove(x) {
      if (!isDragging) return;
      const dx  = x - dragStartX;
      const now = performance.now();
      velocity  = (x - lastX) / (now - lastTime + 1) * 16;
      lastX     = x;
      lastTime  = now;
      applyTransform(dragStartOX + dx);
      loopCheck();
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      wrap.classList.remove('is-dragging');
      if (hint) hint.classList.remove('dragging');

      // Momentum / coast
      let vel = velocity * 12;
      const friction = 0.92;

      function coast() {
        vel *= friction;
        applyTransform(offsetX + vel);
        loopCheck();
        if (Math.abs(vel) > 0.5) {
          rafId = requestAnimationFrame(coast);
        }
      }
      rafId = requestAnimationFrame(coast);
    }

    // Mouse
    wrap.addEventListener('mousedown', e => { e.preventDefault(); onDragStart(e.clientX); });
    window.addEventListener('mousemove', e => { if (isDragging) onDragMove(e.clientX); });
    window.addEventListener('mouseup', () => { if (isDragging) onDragEnd(); });

    // Touch
    wrap.addEventListener('touchstart', e => {
      // only hijack horizontal drags inside belt
      onDragStart(e.touches[0].clientX);
    }, { passive: true });

    wrap.addEventListener('touchmove', e => {
      if (!isDragging) return;
      e.stopPropagation(); // don't trigger panel change
      onDragMove(e.touches[0].clientX);
    }, { passive: true });

    wrap.addEventListener('touchend', () => { if (isDragging) onDragEnd(); }, { passive: true });
  }

  loadContent();
  initBelt();

/* ── Content loader ────────────────── */
async function loadContent() {
  const c = window.SITE_CONTENT;
  if (!c) { console.warn('SITE_CONTENT bulunamadı.'); return; }

  const set = (sel, html, prop = 'innerHTML') => {
    const el = document.querySelector(sel);
    if (el) el[prop] = html;
  };

  // Nav
  set('.nav__logo', c.nav.logo + '<sup>®</sup>');

  // Hero
  set('.hero__subtitle', c.home.hero.subtitle, 'textContent');
  const heroCopyP = document.querySelector('.hero__copy p');
  if (heroCopyP) heroCopyP.innerHTML = c.home.hero.copy;
  set('.hero__clients-label', c.home.hero.clientsLabel, 'textContent');
  set('.hero__card-title',    c.home.hero.card.title);
  set('.hero__card-year',     c.home.hero.card.year, 'textContent');
  set('.hero__card-btn',      c.home.hero.card.button, 'textContent');
  set('.rating-score',        c.home.hero.ratingScore, 'textContent');
  set('.hero__trust',         c.home.hero.trust);

  // Quote
  set('.quote-author__name', c.home.quote.authorName, 'textContent');
  set('.quote-author__role', c.home.quote.authorRole, 'textContent');
  const quoteEl = document.querySelector('.quote-text');
  if (quoteEl) quoteEl.innerHTML =
    `<span class="quote-mark">"</span>${c.home.quote.text}<span class="quote-mark">"</span>`;

  // About
  set('[data-panel="1"] .section-label', c.about.label, 'textContent');
  set('.about__title', c.about.title);
  const bios = document.querySelectorAll('.about__bio');
  if (bios[0]) bios[0].textContent = c.about.bio1;
  if (bios[1]) bios[1].textContent = c.about.bio2;
  document.querySelectorAll('.about__stat').forEach((el, i) => {
    if (!c.about.stats[i]) return;
    el.querySelector('.about__stat-num').textContent   = c.about.stats[i].num;
    el.querySelector('.about__stat-label').textContent = c.about.stats[i].label;
  });

  // Work
  set('[data-panel="2"] .section-label', c.work.label, 'textContent');
  set('.work__title', c.work.title);
  const dragSpan = document.querySelector('.work__drag-hint span');
  if (dragSpan) dragSpan.textContent = c.work.dragHint;

  // Contact
  set('[data-panel="3"] .section-label', c.contact.label, 'textContent');
  set('.contact__title', c.contact.title);
  set('.contact__sub',   c.contact.sub, 'textContent');
  document.querySelectorAll('.contact__link').forEach((el, i) => {
    if (!c.contact.links[i]) return;
    el.textContent = c.contact.links[i].text;
    el.href        = c.contact.links[i].href;
  });
  const footerSpans = document.querySelectorAll('.contact__footer span');
  if (footerSpans[0]) footerSpans[0].textContent = c.contact.footerCopyright;
  if (footerSpans[1]) footerSpans[1].textContent = c.contact.footerLocation;

  // Contact form
  document.querySelectorAll('.form-group').forEach((el, i) => {
    const f = c.contact.form.fields[i];
    if (!f) return;
    const label = el.querySelector('label');
    if (label) label.textContent = f.label;
    const field = f.type === 'textarea'
      ? el.querySelector('textarea')
      : el.querySelector('input');
    if (field) field.placeholder = f.placeholder;
  });
  set('.contact__submit', c.contact.form.submit, 'textContent');
}

  /* ── Custom cursor ─────────────────── */
  if (window.matchMedia('(hover: hover)').matches) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .hero__card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /* ── Ticker pause on hover ─────────── */
  const tickerWrap  = document.querySelector('.ticker-wrap');
  const tickerTrack = document.querySelector('.ticker__track');
  if (tickerWrap && tickerTrack) {
    tickerWrap.addEventListener('mouseenter', () => tickerTrack.style.animationPlayState = 'paused');
    tickerWrap.addEventListener('mouseleave', () => tickerTrack.style.animationPlayState = 'running');
  }

})();
