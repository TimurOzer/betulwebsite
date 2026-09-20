/* ═══════════════════════════════════════════════
   Betül Alkan — Portfolio  |  script.js
═══════════════════════════════════════════════ */

'use strict';

/* ── Media path helper ─────────────────────────
   Optimized images live in media/<slug>/<n>.jpg (full, ≤1600px)
   and media/<slug>/<n>-t.jpg (thumbnail, ≤500px).            */
function media(slug, count) {
  const images = [], thumbs = [];
  for (let i = 1; i <= count; i++) {
    images.push(`media/${slug}/${i}.jpg`);
    thumbs.push(`media/${slug}/${i}-t.jpg`);
  }
  return { images, thumbs, cover: thumbs[0] };
}

/* ── Project Data ──────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'Pigmentia — Website Design',
    titleTR: 'Pigmentia — Web Tasarımı',
    category: 'ux',
    categoryLabel: 'UI/UX',
    categoryLabelTR: 'Arayüz Tasarımı',
    gradient: 'linear-gradient(135deg, #0e0022 0%, #1c0045 100%)',
    ...media('pigmentia', 17),
    tools: ['adobe xd'],
    desc: 'A complete website design for Pigmentia — a modern color exploration and palette generation platform. Built user-first: clean navigation, accessible contrast tools, and a cohesive design system that balances aesthetic beauty with frictionless interaction.',
    descTR: 'Pigmentia için kapsamlı web sitesi tasarımı — modern renk keşif ve palet üretim platformu. Kullanıcı odaklı: temiz navigasyon, erişilebilir kontrast araçları ve estetik güzelliği sorunsuz etkileşimle dengeleyen tutarlı bir tasarım sistemi.',
    year: '2026'
  },
  {
    id: 2,
    title: 'Nox — Meal Planner App',
    titleTR: 'Nox — Yemek Planlayıcı Uygulaması',
    category: 'ux',
    categoryLabel: 'UI/UX',
    categoryLabelTR: 'Arayüz Tasarımı',
    gradient: 'linear-gradient(135deg, #080010 0%, #12001f 100%)',
    ...media('nox', 11),
    tools: ['figma'],
    desc: 'A dark, immersive mobile app design for Nox — a meal planning app brought to life through deep contrast, refined typography, and a meticulously layered UI. Every screen was designed to evoke atmosphere while maintaining clear usability.',
    descTR: 'Nox için koyu, sürükleyici bir mobil uygulama tasarımı — bir yemek planlama uygulaması; güçlü bir görsel kimlik, derin kontrast, rafine tipografi ve katmanlı bir arayüzle hayata geçirildi. Her ekran, net kullanılabilirliği korurken atmosfer yaratmak için tasarlandı.',
    year: '2025'
  },
  {
    id: 3,
    title: 'Catch — Game UI Design',
    titleTR: 'Catch — Oyun Arayüzü Tasarımı',
    category: 'ux',
    categoryLabel: 'UI/UX',
    categoryLabelTR: 'Arayüz Tasarımı',
    gradient: 'linear-gradient(135deg, #001a10 0%, #002818 100%)',
    ...media('catch', 6),
    tools: ['illustrator'],
    desc: 'Full UI design for Catch — a mobile game experience including main menu, HUD, level screens, and end states. The interface was crafted to feel intuitive and energetic, keeping players engaged with clear visual feedback at every moment.',
    descTR: 'Catch için tam UI tasarımı — ana menü, HUD, level ekranları ve bitiş ekranları dahil mobil oyun arayüzü. Arayüz, her an net görsel geri bildirimle oyuncuları bağlı tutan sezgisel ve enerjik bir his verecek şekilde tasarlandı.',
    year: '2025'
  },
  {
    id: 4,
    title: 'İGÜ Obis — UI Redesign',
    titleTR: 'İGÜ Obis — Arayüz Yenileme',
    category: 'ux',
    categoryLabel: 'UI/UX',
    categoryLabelTR: 'Arayüz Tasarımı',
    gradient: 'linear-gradient(135deg, #001830 0%, #002448 100%)',
    ...media('igu-obis', 2),
    tools: ['adobe xd'],
    desc: 'A modern redesign of Istanbul Gelişim University\'s OBIS student portal. The goal was to simplify complex academic workflows into a clean, accessible interface — reducing friction for students navigating course registrations, grades, and schedules.',
    descTR: 'İstanbul Gelişim Üniversitesi\'nin OBIS öğrenci portalının modern yeniden tasarımı. Amaç, karmaşık akademik süreçleri temiz ve erişilebilir bir arayüze dönüştürmek — ders kayıt, not ve program takibinde öğrencilerin yaşadığı zorluğu azaltmak.',
    year: '2026'
  },
  {
    id: 7,
    title: 'WUU7 Poster Design',
    titleTR: 'WUU7 Poster Tasarımı',
    category: 'print',
    categoryLabel: 'Print',
    categoryLabelTR: 'Baskı Tasarımı',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1c1c1c 100%)',
    images: ['media/poster/4.jpg'],
    thumbs: ['media/poster/4-t.jpg'],
    cover: 'media/poster/4-t.jpg',
    tools: ['illustrator'],
    desc: 'A series of social responsibility and environmental awareness posters exploring themes of microplastics, unity, and civic consciousness. Bold composition, strong typography, and purposeful color choices give each poster a voice that commands attention.',
    descTR: 'Mikroplastikler, birlik ve toplumsal farkındalık temalarını keşfeden sosyal sorumluluk ve çevre bilinci afiş serisi. Güçlü kompozisyon, belirgin tipografi ve bilinçli renk tercihleri her afişe dikkat çeken bir ses kazandırıyor.',
    year: '2025'
  },
  {
    id: 8,
    title: 'After Effects Animation',
    titleTR: 'After Effects Animasyonu',
    category: 'motion',
    categoryLabel: 'Motion',
    categoryLabelTR: 'Animasyon',
    gradient: 'linear-gradient(135deg, #000a1a 0%, #001430 100%)',
    cover: null,
    images: [],
    thumbs: [],
    video: encodeURI('PROJELER/after effects animasyon/art-contact.mp4'),
    tools: ['after effects'],
    desc: 'A motion graphics piece produced in After Effects — fluid transitions, kinetic typography, and layered visual storytelling. Every frame was animated with precision to create a dynamic, engaging experience.',
    descTR: 'After Effects\'te üretilen motion graphics çalışması — akıcı geçişler, kinetik tipografi ve katmanlı görsel anlatım. Her kare, dinamik ve ilgi çekici bir deneyim yaratmak için hassasiyetle animasyona alındı.',
    year: '2025'
  },
  {
    id: 9,
    title: 'Kinetic Name Animation',
    titleTR: 'Kinetik İsim Animasyonu',
    category: 'motion',
    categoryLabel: 'Motion',
    categoryLabelTR: 'Animasyon',
    gradient: 'linear-gradient(135deg, #12001a 0%, #2a0033 100%)',
    cover: null,
    images: [],
    thumbs: [],
    video: encodeURI('PROJELER/after effects animasyon/name.mp4'),
    tools: ['after effects'],
    desc: 'A kinetic typography study built in After Effects — letterforms that assemble, breathe, and settle in rhythm. An exercise in timing, easing, and how much personality a name can carry in motion.',
    descTR: 'After Effects\'te kurgulanan bir kinetik tipografi çalışması — harflerin ritimle birleşip yerine oturduğu bir animasyon. Zamanlama, yumuşatma ve bir ismin harekette ne kadar karakter taşıyabileceği üzerine bir deneme.',
    year: '2025'
  },
  {
    id: 10,
    title: 'Walk Cycle Animation',
    titleTR: 'Yürüyüş Döngüsü Animasyonu',
    category: 'motion',
    categoryLabel: 'Motion',
    categoryLabelTR: 'Animasyon',
    gradient: 'linear-gradient(135deg, #001a14 0%, #003026 100%)',
    cover: null,
    images: [],
    thumbs: [],
    video: encodeURI('PROJELER/after effects animasyon/walk.mp4'),
    tools: ['after effects'],
    desc: 'A character walk cycle animated in After Effects — looping motion driven by weight, balance, and follow-through. Each keyframe was tuned until the movement felt natural rather than mechanical.',
    descTR: 'After Effects\'te animasyona alınan bir karakter yürüyüş döngüsü — ağırlık, denge ve takip hareketiyle kurulan kesintisiz bir döngü. Hareket mekanik değil doğal hissettirene kadar her kare ayarlandı.',
    year: '2025'
  }
];

const TOOL_LOGOS = {
  'lightroom':     'images/logo-lightroom.png',
  'photoshop':     'images/logo-photoshop.png',
  'illustrator':   'images/logo-illustrator.png',
  'adobe xd':      'images/logo-adobe-xd.png',
  'premiere':      'images/logo-premiere.png',
  'after effects': 'images/logo-after-effects.png',
  'figma':         'images/logo-figma.png',
};

const TOOL_NAMES = {
  'lightroom':     'Adobe Lightroom',
  'photoshop':     'Adobe Photoshop',
  'illustrator':   'Adobe Illustrator',
  'adobe xd':      'Adobe XD',
  'premiere':      'Adobe Premiere Pro',
  'after effects': 'Adobe After Effects',
  'figma':         'Figma',
};

const ABOUT_TOOLS = ['illustrator', 'photoshop', 'adobe xd', 'premiere', 'after effects', 'figma'];

/* How many projects actually credit each tool. */
function projectsUsingTool(tool) {
  return PROJECTS.filter(p => p.tools.includes(tool)).length;
}

/* ── State ─────────────────────────────────── */
let currentLang      = 'en';
let activeFilter     = 'all';
let activeToolFilter = null;
let modalImgIndex    = 0;
let modalImages      = [];
let lastFocused      = null;

/* ── Helpers ───────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* Keep the headline numbers tied to the data instead of a stale literal. */
function syncStats() {
  const projectsEl = $('#statProjects');
  if (projectsEl) projectsEl.textContent = String(PROJECTS.length);

  const yearEl = $('#footerYear');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

/* ══════════════════════════════════════════════
   LANGUAGE
══════════════════════════════════════════════ */
const LANG_KEY = 'ba-lang';

function preferredLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'tr') return saved;
  } catch (e) { /* private mode */ }
  return (navigator.language || '').toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode */ }

  $$('[data-en]').forEach(el => {
    const text = el.dataset[lang];
    if (text === undefined) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });

  $$('.filter-btn').forEach(btn => {
    const text = btn.dataset[lang];
    if (text) btn.textContent = text;
  });

  const mobileCv = $('.mobile-cv');
  if (mobileCv) mobileCv.textContent = lang === 'tr' ? 'CV İndir ↓' : 'Download CV ↓';

  initAboutTools();
  renderProjects(activeFilter, activeToolFilter);
  syncStats();

  const btn = $('#langBtn');
  if (btn) btn.textContent = lang === 'en' ? 'TR' : 'EN';
}

/* ══════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════ */
function initNav() {
  const nav = $('#nav');

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const sections  = $$('section[id]');
  const navLinks  = $$('.nav-link');

  /* A 0.4 threshold can never be met by a section taller than 2.5 viewports —
     Work simply never lit up. Track whichever section owns the viewport
     midpoint instead, which works at any section height. */
  const markActive = () => {
    const line = window.scrollY + window.innerHeight * 0.4;
    let current = sections[0];
    sections.forEach(sec => { if (sec.offsetTop <= line) current = sec; });
    navLinks.forEach(l => {
      const on = l.dataset.section === current?.id;
      l.classList.toggle('active', on);
      l.setAttribute('aria-current', on ? 'true' : 'false');
    });
  };
  window.addEventListener('scroll', markActive, { passive: true });
  window.addEventListener('resize', markActive, { passive: true });
  markActive();

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    });
  });
}

function initMobileMenu() {
  const burger = $('#burgerBtn');
  const menu   = $('#mobileMenu');
  if (!burger || !menu) return;

  const open  = () => { burger.classList.add('open');  menu.classList.add('open');  burger.setAttribute('aria-expanded', 'true'); };
  const close = () => { burger.classList.remove('open'); menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };

  burger.addEventListener('click', () => burger.classList.contains('open') ? close() : open());
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) close();
  });
}

function closeMobileMenu() {
  $('#burgerBtn')?.classList.remove('open');
  $('#mobileMenu')?.classList.remove('open');
  $('#burgerBtn')?.setAttribute('aria-expanded', 'false');
}

/* ══════════════════════════════════════════════
   REVEAL ON SCROLL
══════════════════════════════════════════════ */
function initReveal() {
  const els = $$('.reveal-up, .reveal-right');
  if (!els.length) return;

  /* Without the observer these elements would stay at opacity 0 forever. */
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════════ */
function initCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const cursor = $('#cursor');
  if (!cursor) return;

  let mx = -100, my = -100, cx = -100, cy = -100, raf;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  const tick = () => {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  /* Delegated: project cards are rebuilt on every filter change, so
     listeners bound once at startup were lost after the first click. */
  const INTERACTIVE = 'a, button, .project-card, .tool-btn, .filter-btn, .filter-chip';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(INTERACTIVE)) cursor.classList.add('grow');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(INTERACTIVE) && !e.relatedTarget?.closest?.(INTERACTIVE)) {
      cursor.classList.remove('grow');
    }
  });

  /* The cursor is drawn by JS; hide it when the pointer leaves the page. */
  document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
  document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));
}

/* ══════════════════════════════════════════════
   ABOUT — TOOL BUTTONS
══════════════════════════════════════════════ */
function initAboutTools() {
  const wrap = $('#aboutTools');
  if (!wrap) return;
  wrap.innerHTML = '';

  ABOUT_TOOLS.forEach(key => {
    const logo = TOOL_LOGOS[key];
    if (!logo) return;

    const name  = TOOL_NAMES[key] || key;
    const count = projectsUsingTool(key);

    const btn = document.createElement('button');
    btn.className = 'tool-btn';
    btn.type = 'button';
    btn.dataset.tool = key;

    const img = document.createElement('img');
    img.src = logo;
    img.alt = '';
    img.loading = 'lazy';
    btn.appendChild(img);

    if (count > 0) {
      const badge = document.createElement('span');
      badge.className = 'tool-btn__count';
      badge.textContent = count;
      btn.appendChild(badge);
    } else {
      /* No project credits this tool — keep it on show as a skill,
         but don't offer a filter that can only come back empty. */
      btn.classList.add('tool-btn--empty');
      btn.disabled = true;
    }

    btn.title = count > 0
      ? `${name} — ${count} ${currentLang === 'tr' ? 'proje' : count === 1 ? 'project' : 'projects'}`
      : name;
    btn.setAttribute('aria-label', btn.title);
    if (key === activeToolFilter) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.setAttribute('aria-pressed', 'false');
    }

    btn.addEventListener('click', () => {
      const isActive = btn.classList.contains('active');
      $$('.tool-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      if (isActive) {
        activeToolFilter = null;
        renderProjects(activeFilter, null);
        return;
      }

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeToolFilter = key;
      /* Render first, then scroll — the old code scrolled to a grid that
         only changed 600ms later. */
      renderProjects(activeFilter, key);
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    });

    wrap.appendChild(btn);
  });
}

/* ══════════════════════════════════════════════
   WORK — PROJECT GRID
══════════════════════════════════════════════ */
function projectMatchesToolFilter(proj, toolFilter) {
  if (!toolFilter) return true;
  return proj.tools.includes(toolFilter);
}

function getVisible(filter, toolFilter) {
  return PROJECTS.filter(p => {
    const catMatch  = filter === 'all' || p.category === filter;
    const toolMatch = projectMatchesToolFilter(p, toolFilter);
    return catMatch && toolMatch;
  });
}

/* Clear every filter and re-render. */
function resetFilters() {
  activeFilter     = 'all';
  activeToolFilter = null;
  $$('.filter-btn').forEach(b => {
    const on = b.dataset.filter === 'all';
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  $$('.tool-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  renderProjects('all', null);
}

/* The tool filter used to run silently while the bar still read "All". */
function renderActiveFilterChip(toolFilter) {
  const slot = $('#workActiveFilter');
  if (!slot) return;

  slot.innerHTML = '';
  slot.hidden = !toolFilter;
  if (!toolFilter) return;

  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'filter-chip';
  chip.innerHTML = `
    <span>${currentLang === 'tr' ? 'Araç' : 'Tool'}: <strong>${TOOL_NAMES[toolFilter] || toolFilter}</strong></span>
    <span class="filter-chip__x" aria-hidden="true">✕</span>`;
  chip.setAttribute('aria-label', currentLang === 'tr'
    ? `${TOOL_NAMES[toolFilter] || toolFilter} filtresini kaldır`
    : `Clear the ${TOOL_NAMES[toolFilter] || toolFilter} filter`);
  chip.addEventListener('click', resetFilters);

  slot.appendChild(chip);
}

function renderProjects(filter = 'all', toolFilter = null) {
  const grid = $('#workGrid');
  if (!grid) return;

  renderActiveFilterChip(toolFilter);

  const visible = getVisible(filter, toolFilter);
  grid.innerHTML = '';

  if (!visible.length) {
    const empty = document.createElement('div');
    empty.className = 'work__empty';
    const msg = document.createElement('p');
    msg.textContent = currentLang === 'tr'
      ? 'Bu filtrelerle eşleşen proje yok.'
      : 'No projects match these filters.';
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'work__empty-reset';
    reset.textContent = currentLang === 'tr' ? 'Filtreleri temizle' : 'Clear filters';
    reset.addEventListener('click', resetFilters);
    empty.append(msg, reset);
    grid.appendChild(empty);
    return;
  }

  visible.forEach((proj, idx) => {
    const title    = currentLang === 'tr' ? proj.titleTR    : proj.title;
    const catLabel = currentLang === 'tr' ? proj.categoryLabelTR : proj.categoryLabel;

    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', currentLang === 'tr'
      ? `Projeyi aç: ${title}`
      : `Open project: ${title}`);
    card.style.background = proj.gradient || '#111';

    /* Big decorative number */
    const bigNum = document.createElement('div');
    bigNum.className = 'project-card__bignum';
    bigNum.textContent = String(idx + 1).padStart(2, '0');

    /* Staggered entrance — cleared on animationend so :hover can move the card */
    card.classList.add('project-card--enter');
    card.style.setProperty('--d', `${Math.min(idx, 8) * 0.06}s`);
    card.addEventListener('animationend', () => {
      card.classList.remove('project-card--enter');
      card.style.removeProperty('--d');
    }, { once: true });

    /* Cover image or silent video preview */
    if (proj.video && !proj.cover) {
      /* Video-only project: the clip itself is the cover, it plays on hover */
      const preview = document.createElement('video');
      preview.className = 'project-card__preview';
      preview.src = `${proj.video}#t=0.1`;
      preview.muted = true;
      preview.loop = true;
      preview.playsInline = true;
      preview.preload = 'metadata';
      preview.setAttribute('aria-hidden', 'true');
      preview.tabIndex = -1;
      preview.onerror = () => { preview.remove(); card.classList.add('project-card--noposter'); };

      const playPreview = () => { preview.play?.().catch(() => {}); };
      const stopPreview = () => { preview.pause?.(); preview.currentTime = 0.1; };
      card.addEventListener('mouseenter', playPreview);
      card.addEventListener('mouseleave', stopPreview);
      card.addEventListener('focus', playPreview);
      card.addEventListener('blur', stopPreview);

      const badge = document.createElement('div');
      badge.className = 'project-card__video-badge';
      badge.innerHTML = `<span>▶</span>${currentLang === 'tr' ? 'Video' : 'Showreel'}`;

      card.append(bigNum, preview, badge);
    } else if (proj.cover) {
      const img = document.createElement('img');
      img.className = 'project-card__img';
      img.alt = title;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 500; img.height = 360;
      img.onerror = () => img.remove();
      img.src = proj.cover;
      card.appendChild(bigNum);
      card.appendChild(img);
    } else {
      card.appendChild(bigNum);
    }

    /* Overlay */
    const overlay = document.createElement('div');
    overlay.className = 'project-card__overlay';

    /* Category badge */
    const catBadge = document.createElement('div');
    catBadge.className = 'project-card__category';
    catBadge.textContent = catLabel;

    /* Tool icons */
    const toolsWrap = document.createElement('div');
    toolsWrap.className = 'project-card__tools';
    proj.tools.forEach(t => {
      const logo = TOOL_LOGOS[t];
      if (!logo) return;
      const wrap = document.createElement('div');
      wrap.className = 'project-card__tool';
      const ti = document.createElement('img');
      ti.src = logo;
      ti.alt = TOOL_NAMES[t] || t;
      wrap.appendChild(ti);
      toolsWrap.appendChild(wrap);
    });

    /* Image count badge (for multi-image) */
    if (proj.images.length > 1) {
      const countBadge = document.createElement('div');
      countBadge.className = 'project-card__count';
      countBadge.textContent = currentLang === 'tr'
        ? `${proj.images.length} görsel`
        : `${proj.images.length} screens`;
      card.appendChild(countBadge);
    }

    /* Footer */
    const footer = document.createElement('div');
    footer.className = 'project-card__footer';
    footer.innerHTML = `
      <span class="project-card__num">${String(idx + 1).padStart(2, '0')} — ${proj.year}</span>
      <span class="project-card__title">${title}</span>
      <span class="project-card__inspect">${currentLang === 'tr' ? 'İncele' : 'View project'} →</span>
    `;

    card.append(overlay, catBadge, toolsWrap, footer);

    const open = () => openModal(proj);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });

    grid.appendChild(card);
  });
}

function initFilters() {
  const bar = $('#workFilters');
  if (!bar) return;

  bar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    $$('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    activeFilter     = btn.dataset.filter;
    activeToolFilter = null;
    $$('.tool-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    renderProjects(activeFilter, null);
  });
}

/* ══════════════════════════════════════════════
   PROJECT MODAL — GALLERY
══════════════════════════════════════════════ */
function setModalImage(index) {
  modalImgIndex = ((index % modalImages.length) + modalImages.length) % modalImages.length;

  const mainImg = $('#modalMainImg');
  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = modalImages[modalImgIndex];
      mainImg.style.opacity = '1';
    }, 150);
  }

  /* Update counter */
  const counter = $('#modalCounter');
  if (counter) counter.textContent = `${modalImgIndex + 1} / ${modalImages.length}`;

  /* Update thumbnail active state */
  $$('.modal__thumb').forEach((th, i) => {
    th.classList.toggle('active', i === modalImgIndex);
  });
}

function openModal(proj) {
  const overlay  = $('#modalOverlay');
  const imgWrap  = $('#modalImg');
  const infoWrap = $('#modalInfo');
  if (!overlay || !imgWrap || !infoWrap) return;

  const title    = currentLang === 'tr' ? proj.titleTR    : proj.title;
  const catLabel = currentLang === 'tr' ? proj.categoryLabelTR : proj.categoryLabel;
  const desc     = currentLang === 'tr' ? proj.descTR     : proj.desc;
  const toolsLbl = currentLang === 'tr' ? 'Kullanılan Araçlar' : 'Tools Used';
  const yearLbl  = currentLang === 'tr' ? 'Yıl' : 'Year';

  /* ── LEFT: Gallery or Video ── */
  imgWrap.innerHTML = '';
  modalImages = proj.images || [];
  modalImgIndex = 0;

  if (proj.video && modalImages.length === 0) {
    /* Video only */
    const vid = document.createElement('video');
    vid.src = proj.video;
    vid.controls = true;
    vid.autoplay = false;
    vid.className = 'modal__video';
    imgWrap.appendChild(vid);
  } else if (modalImages.length > 0) {
    /* Build gallery */
    const galleryWrap = document.createElement('div');
    galleryWrap.className = 'modal__gallery';

    /* Main image */
    const mainImg = document.createElement('img');
    mainImg.id = 'modalMainImg';
    mainImg.className = 'modal__gallery-img';
    mainImg.src = modalImages[0];
    mainImg.alt = title;
    mainImg.decoding = 'async';
    mainImg.style.transition = 'opacity 0.15s ease';
    galleryWrap.appendChild(mainImg);

    /* Prev / Next (only if multiple images) */
    if (modalImages.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'modal__nav modal__nav--prev';
      prevBtn.innerHTML = '‹';
      prevBtn.setAttribute('aria-label', 'Previous image');
      prevBtn.addEventListener('click', e => { e.stopPropagation(); setModalImage(modalImgIndex - 1); });

      const nextBtn = document.createElement('button');
      nextBtn.className = 'modal__nav modal__nav--next';
      nextBtn.innerHTML = '›';
      nextBtn.setAttribute('aria-label', 'Next image');
      nextBtn.addEventListener('click', e => { e.stopPropagation(); setModalImage(modalImgIndex + 1); });

      const counter = document.createElement('div');
      counter.id = 'modalCounter';
      counter.className = 'modal__counter';
      counter.textContent = `1 / ${modalImages.length}`;

      galleryWrap.append(prevBtn, nextBtn, counter);

      /* Thumbnail strip */
      const thumbs = document.createElement('div');
      thumbs.className = 'modal__thumbs';
      const thumbSrcs = proj.thumbs && proj.thumbs.length ? proj.thumbs : modalImages;
      modalImages.forEach((src, i) => {
        const th = document.createElement('button');
        th.className = 'modal__thumb' + (i === 0 ? ' active' : '');
        th.setAttribute('aria-label', `View image ${i + 1}`);
        const thImg = document.createElement('img');
        thImg.src = thumbSrcs[i] || src;
        thImg.alt = '';
        thImg.loading = 'lazy';
        thImg.decoding = 'async';
        th.appendChild(thImg);
        th.addEventListener('click', e => { e.stopPropagation(); setModalImage(i); });
        thumbs.appendChild(th);
      });
      galleryWrap.appendChild(thumbs);

      /* Keyboard navigation */
      const keyHandler = e => {
        if (e.key === 'ArrowLeft')  setModalImage(modalImgIndex - 1);
        if (e.key === 'ArrowRight') setModalImage(modalImgIndex + 1);
      };
      overlay._keyHandler = keyHandler;
      document.addEventListener('keydown', keyHandler);
    }

    imgWrap.appendChild(galleryWrap);
  } else {
    imgWrap.innerHTML = `<div class="modal__img-placeholder" style="background:${proj.gradient}">${title}</div>`;
  }

  /* ── RIGHT: Info ── */
  const toolsHTML = proj.tools.map(t => {
    const logo = TOOL_LOGOS[t];
    const name = TOOL_NAMES[t] || t;
    return `<div class="modal__tool-badge">
      ${logo ? `<img src="${logo}" alt="${name}" />` : ''}
      <span>${name}</span>
    </div>`;
  }).join('');

  infoWrap.innerHTML = `
    <p class="modal__category">${catLabel}</p>
    <h3 class="modal__title" id="modalTitle">${title}</h3>
    <p class="modal__desc">${desc}</p>
    <span class="modal__tools-label">${toolsLbl}</span>
    <div class="modal__tools">${toolsHTML}</div>
    <p class="modal__year"><strong>${yearLbl}:</strong> ${proj.year}</p>
  `;

  overlay.hidden = false;
  overlay.setAttribute('aria-hidden', 'false');
  /* One frame after un-hiding, so the fade-in actually transitions. */
  requestAnimationFrame(() => overlay.classList.add('open'));
  document.body.style.overflow = 'hidden';

  /* Send focus into the dialog and remember where to put it back. */
  lastFocused = document.activeElement;
  $('#modalClose')?.focus();
}

function closeModal() {
  const overlay = $('#modalOverlay');
  if (!overlay || overlay.hidden) return;

  /* Remove arrow key listener if set */
  if (overlay._keyHandler) {
    document.removeEventListener('keydown', overlay._keyHandler);
    overlay._keyHandler = null;
  }

  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  /* Pause any playing video */
  $('#modalImg video')?.pause();

  /* Keep it out of the accessibility tree once the fade is done. */
  setTimeout(() => {
    if (!overlay.classList.contains('open')) overlay.hidden = true;
  }, 300);

  lastFocused?.focus?.();
  lastFocused = null;
}

function initModal() {
  const overlay  = $('#modalOverlay');
  const closeBtn = $('#modalClose');
  if (!overlay) return;

  closeBtn?.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  document.addEventListener('keydown', e => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') { closeModal(); return; }

    /* Trap Tab inside the dialog — it used to walk off into the page behind. */
    if (e.key !== 'Tab') return;
    const focusable = $$('button, [href], input, textarea, video[controls], [tabindex]:not([tabindex="-1"])', overlay)
      .filter(el => !el.disabled && el.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

/* ══════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════ */
function initContactForm() {
  const form = $('#contactForm');
  const successEl = $('#formSuccess');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name  = $('#f-name').value.trim();
    const email = $('#f-email').value.trim();
    const msg   = $('#f-msg').value.trim();

    const fail = text => {
      if (!successEl) return;
      successEl.style.color = '#ff6b6b';
      successEl.textContent = text;
      /* The old code only auto-cleared messages from the request path,
         so a validation error stayed on screen forever. */
      clearTimeout(successEl._t);
      successEl._t = setTimeout(() => { successEl.textContent = ''; }, 5000);
    };

    if (!name || !email || !msg) {
      fail(currentLang === 'tr'
        ? 'Lütfen tüm alanları doldurun.'
        : 'Please fill in all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      fail(currentLang === 'tr'
        ? 'Geçerli bir e-posta adresi girin.'
        : 'Please enter a valid email address.');
      $('#f-email')?.focus();
      return;
    }

    const btn = form.querySelector('.c-form__submit');
    if (btn) btn.disabled = true;

    try {
      const res = await fetch('https://formsubmit.co/ajax/betulalkan98@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: msg,
          _subject: `New portfolio message from ${name}`
        })
      });

      if (!res.ok) throw new Error('Request failed');

      form.reset();
      if (successEl) {
        successEl.style.color = '';
        successEl.textContent = currentLang === 'tr'
          ? 'Mesajınız gönderildi! En kısa sürede geri döneceğim.'
          : 'Message sent! I\'ll get back to you shortly.';
        clearTimeout(successEl._t);
        successEl._t = setTimeout(() => { successEl.textContent = ''; }, 5000);
      }
    } catch (err) {
      fail(currentLang === 'tr'
        ? 'Mesaj gönderilemedi, lütfen doğrudan e-posta ile yazın.'
        : 'Message failed to send — please email me directly.');
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}

/* ══════════════════════════════════════════════
   LANGUAGE TOGGLE
══════════════════════════════════════════════ */
function initLangToggle() {
  const btn = $('#langBtn');
  if (!btn) return;
  btn.addEventListener('click', () => applyLang(currentLang === 'en' ? 'tr' : 'en'));
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* One throwing init used to take the whole page down with it — the
     project grid is built by JS, so a failure left an empty site. */
  const boot = (name, fn) => {
    try { fn(); } catch (err) { console.error(`init failed: ${name}`, err); }
  };

  boot('nav',         initNav);
  boot('mobileMenu',  initMobileMenu);
  boot('reveal',      initReveal);
  boot('cursor',      initCursor);
  boot('aboutTools',  initAboutTools);
  boot('filters',     initFilters);
  boot('modal',       initModal);
  boot('contactForm', initContactForm);
  boot('langToggle',  initLangToggle);
  boot('stats',       syncStats);
  boot('lang',        () => applyLang(preferredLang()));
});
