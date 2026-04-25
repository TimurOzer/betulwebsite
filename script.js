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
  let currentLang = 'en';
  const ANIM_MS   = 900;
  
const TOOL_LOGOS = {
  'lightroom':      'images/logo-lightroom.png',
  'photoshop':      'images/logo-photoshop.png',
  'illustrator':    'images/logo-illustrator.png',
  'adobe xd':       'images/logo-adobe-xd.png',
  'premiere':       'images/logo-premiere.png',
  'after effects':  'images/logo-after-effects.png',
  'figma':          'images/logo-figma.png',
  'capture one':    'images/logo-capture-one.png',
  'davinci':        'images/logo-davinci.png',
};

// Hangi fotoğrafta hangi araç? (index 0 = work_belt_01)
const WORK_TOOLS = [
  ['photoshop'],                    // work_belt_01.jpg - Sadece Photoshop
  ['lightroom'],                    // work_belt_02.jpg - Sadece Lightroom
  ['adobe xd'],                     // work_belt_03.jpg - Sadece Adobe XD
  ['photoshop', 'lightroom'],       // work_belt_04.jpg - Photoshop + Lightroom
  ['lightroom'],                    // work_belt_05.jpg - Sadece Lightroom
  ['photoshop'],                    // work_belt_06.jpg - Sadece Photoshop
  ['adobe xd', 'photoshop'],        // work_belt_07.jpg - XD + Photoshop
  [],                               // work_belt_08.jpg - Hiçbiri
];

const ABOUT_TOOLS = ['illustrator', 'photoshop', 'adobe xd', 'premiere', 'after effects', 'figma'];

// ⭐ Bu değişken burada tanımlanacak (başka yerde değil!)
let triggerWorkFilter = null;

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

    const images = found.filter(Boolean);
    const count  = images.length;

    if (elTotal) elTotal.textContent = String(count || 0).padStart(2, '0');

    let currentFilter = null;

    function getFilteredImages(filter) {
      if (!filter) return images;
      return images.filter((_, i) => {
        const tools = WORK_TOOLS[i] || [];
        return tools.map(t => t.toLowerCase()).includes(filter);
      });
    }

    // ⭐ applyFilter fonksiyonu burada tanımlanıyor
    function applyFilter(toolKey) {
      buildBeltCards(toolKey);
      if (filterBar) {
        filterBar.classList.add('active');
        if (filterLabel) filterLabel.textContent = toolKey.toUpperCase();
      }
      goTo(2);
    }

    // ⭐ Köprüyü hemen bağla
    triggerWorkFilter = applyFilter;

    function buildBeltCards(filter) {
      belt.innerHTML = '';
      currentFilter = filter;
      const srcList = getFilteredImages(filter);
      const count = srcList.length;
      if (elTotal) elTotal.textContent = String(count).padStart(2, '0');

      const sets = [srcList, srcList, srcList];
      sets.forEach((set, setIdx) => {
        set.forEach((src, i) => {
          const origIdx = images.indexOf(src);
          const tool = WORK_TOOLS[origIdx] || [];
          belt.appendChild(makeCard(src, setIdx * srcList.length + i, tool));
        });
      });

      requestAnimationFrame(() => requestAnimationFrame(initOffset));
    }

    const filterBar   = document.getElementById('workFilterBar');
    const filterLabel = document.getElementById('workFilterLabel');
    const filterClear = document.getElementById('workFilterClear');

    if (filterClear) {
      filterClear.addEventListener('click', () => {
        buildBeltCards(null);
        filterBar.classList.remove('active');
        document.querySelectorAll('.about__tool-btn').forEach(b => b.classList.remove('active'));
      });
    }

    // Lightbox
    function openLightbox(imageSrc) {
      const overlay = document.createElement('div');
      Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.92)', zIndex: '9999',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: '0', transition: 'opacity 0.3s ease', cursor: 'zoom-out'
      });
      
      const img = document.createElement('img');
      img.src = imageSrc;
      Object.assign(img.style, {
        maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain',
        borderRadius: '8px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        transform: 'scale(0.95)', transition: 'transform 0.3s ease'
      });
      
      overlay.appendChild(img);
      document.body.appendChild(overlay);
      
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        img.style.transform = 'scale(1)';
      });
      
      overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        setTimeout(() => overlay.remove(), 300);
      });
    }

    function makeCard(src, idx, tool) {
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

      const tools = Array.isArray(tool) ? tool : (tool ? [tool] : []);
      const validTools = tools.filter(t => TOOL_LOGOS[t.toLowerCase().trim()]);
      if (validTools.length) {
        const toolsWrap = document.createElement('div');
        toolsWrap.className = 'work__belt-card-tools';
        validTools.forEach(t => {
          const badge = document.createElement('div');
          badge.className = 'work__belt-card-tool';
          const toolImg = document.createElement('img');
          toolImg.src = TOOL_LOGOS[t.toLowerCase().trim()];
          toolImg.alt = t;
          badge.appendChild(toolImg);
          toolsWrap.appendChild(badge);
        });
        card.appendChild(toolsWrap);
      }

      let startX, startY;
      card.addEventListener('pointerdown', e => { startX = e.clientX; startY = e.clientY; });
      card.addEventListener('pointerup', e => {
        const diffX = Math.abs(e.clientX - startX);
        const diffY = Math.abs(e.clientY - startY);
        if (diffX < 5 && diffY < 5) openLightbox(src);
      });

      return card;
    }

    const srcList = count > 0 ? images : Array.from({ length: 5 }, (_, i) =>
      `images/work_belt_${String(i + 1).padStart(2, '0')}.jpg`
    );

    buildBeltCards(null);

    const GAP      = 16;
    const cardW    = () => belt.querySelector('.work__belt-card')?.offsetWidth || 400;
    const setW     = () => srcList.length * (cardW() + GAP);

    let offsetX    = 0;
    let startSet   = 0;

    function initOffset() {
      startSet = -setW();
      offsetX  = startSet;
      belt.style.transform = `translateX(${offsetX}px)`;
    }

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
      const rel = -(offsetX - startSet);
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

    wrap.addEventListener('mousedown', e => { e.preventDefault(); onDragStart(e.clientX); });
    window.addEventListener('mousemove', e => { if (isDragging) onDragMove(e.clientX); });
    window.addEventListener('mouseup', () => { if (isDragging) onDragEnd(); });

    wrap.addEventListener('touchstart', e => {
      onDragStart(e.touches[0].clientX);
    }, { passive: true });

    wrap.addEventListener('touchmove', e => {
      if (!isDragging) return;
      e.stopPropagation();
      onDragMove(e.touches[0].clientX);
    }, { passive: true });

    wrap.addEventListener('touchend', () => { if (isDragging) onDragEnd(); }, { passive: true });
  }

  function initAboutTools() {
    const wrap = document.getElementById('aboutTools');
    if (!wrap) return;

    ABOUT_TOOLS.forEach(toolKey => {
      if (!TOOL_LOGOS[toolKey]) return;
      const btn = document.createElement('button');
      btn.className = 'about__tool-btn';
      btn.dataset.tool = toolKey;
      btn.title = toolKey;

      const img = document.createElement('img');
      img.src = TOOL_LOGOS[toolKey];
      img.alt = toolKey;
      btn.appendChild(img);

      btn.addEventListener('click', () => {
        document.querySelectorAll('.about__tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (triggerWorkFilter) triggerWorkFilter(toolKey);
      });

      wrap.appendChild(btn);
    });
  }

  loadContent();
  initBelt();
  initAboutTools();

  /* ── Content loader ────────────────── */
  async function loadContent() {
    const c = window.SITE_CONTENT[currentLang];
    if (!c) { console.warn('SITE_CONTENT bulunamadı.'); return; }

    const set = (sel, html, prop = 'innerHTML') => {
      const el = document.querySelector(sel);
      if (el) el[prop] = html;
    };

    set('.nav__logo', c.nav.logo + '<sup>®</sup>');

    set('.hero__subtitle', c.home.hero.subtitle, 'textContent');
    const heroCopyP = document.querySelector('.hero__copy p');
    if (heroCopyP) heroCopyP.innerHTML = c.home.hero.copy;
    set('.hero__clients-label', c.home.hero.clientsLabel, 'textContent');
    set('.hero__card-title',    c.home.hero.card.title);
    set('.hero__card-year',     c.home.hero.card.year, 'textContent');
    set('.hero__card-btn',      c.home.hero.card.button, 'textContent');
    set('.rating-score',        c.home.hero.ratingScore, 'textContent');
    set('.hero__trust',         c.home.hero.trust);

    set('.quote-author__name', c.home.quote.authorName, 'textContent');
    set('.quote-author__role', c.home.quote.authorRole, 'textContent');
    const quoteEl = document.querySelector('.quote-text');
    if (quoteEl) quoteEl.innerHTML =
      `<span class="quote-mark">"</span>${c.home.quote.text}<span class="quote-mark">"</span>`;

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

    set('[data-panel="2"] .section-label', c.work.label, 'textContent');
    set('.work__title', c.work.title);
    const dragSpan = document.querySelector('.work__drag-hint span');
    if (dragSpan) dragSpan.textContent = c.work.dragHint;

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

  /* ── Lang toggle ───────────────────── */
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'tr' : 'en';
      langToggle.textContent = currentLang.toUpperCase();
      loadContent();
    });
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