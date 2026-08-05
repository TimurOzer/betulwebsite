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

/* ── Tool → projects mapping ──────────────── */
const TOOL_CATEGORIES = {
  'illustrator':   ['print'],
  'photoshop':     ['print'],
  'adobe xd':      ['ux'],
  'figma':         ['ux'],
  'premiere':      ['motion'],
  'after effects': ['motion'],
  'lightroom':     ['print'],
};

/* ── State ─────────────────────────────────── */
let currentLang      = 'en';
let activeFilter     = 'all';
let activeToolFilter = null;
let modalImgIndex    = 0;
let modalImages      = [];

/* ── Helpers ───────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ══════════════════════════════════════════════
   LANGUAGE
══════════════════════════════════════════════ */
function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

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

  renderProjects(activeFilter, activeToolFilter);

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

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === e.target.id));
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));

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

  $$('a, button, .project-card, .tool-btn, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
}

/* ══════════════════════════════════════════════
   ABOUT — TOOL BUTTONS
══════════════════════════════════════════════ */
function initAboutTools() {
  const wrap = $('#aboutTools');
  if (!wrap) return;

  ABOUT_TOOLS.forEach(key => {
    const logo = TOOL_LOGOS[key];
    if (!logo) return;

    const btn = document.createElement('button');
    btn.className = 'tool-btn';
    btn.dataset.tool = key;
    btn.title = TOOL_NAMES[key] || key;

    const img = document.createElement('img');
    img.src = logo;
    img.alt = TOOL_NAMES[key] || key;
    img.loading = 'lazy';
    btn.appendChild(img);

    btn.addEventListener('click', () => {
      const isActive = btn.classList.contains('active');
      $$('.tool-btn').forEach(b => b.classList.remove('active'));

      if (isActive) {
        activeToolFilter = null;
        renderProjects(activeFilter, null);
      } else {
        btn.classList.add('active');
        activeToolFilter = key;
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          $$('.filter-btn').forEach(b => b.classList.remove('active'));
          $('.filter-btn[data-filter="all"]')?.classList.add('active');
          activeFilter = 'all';
          renderProjects('all', key);
        }, 600);
      }
    });

    wrap.appendChild(btn);
  });
}

/* ══════════════════════════════════════════════
   WORK — PROJECT GRID
══════════════════════════════════════════════ */
function projectMatchesToolFilter(proj, toolFilter) {
  if (!toolFilter) return true;
  if (proj.tools.includes(toolFilter)) return true;
  /* Also match by category affinity */
  const cats = TOOL_CATEGORIES[toolFilter] || [];
  return cats.includes(proj.category);
}

function getVisible(filter, toolFilter) {
  return PROJECTS.filter(p => {
    const catMatch  = filter === 'all' || p.category === filter;
    const toolMatch = projectMatchesToolFilter(p, toolFilter);
    return catMatch && toolMatch;
  });
}

function renderProjects(filter = 'all', toolFilter = null) {
  const grid = $('#workGrid');
  if (!grid) return;

  const visible = getVisible(filter, toolFilter);
  grid.innerHTML = '';

  if (!visible.length) {
    const empty = document.createElement('div');
    empty.className = 'work__empty';
    empty.textContent = currentLang === 'tr'
      ? 'Bu kategoride proje bulunamadı.'
      : 'No projects found in this category.';
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
    card.setAttribute('aria-label', `Open project: ${title}`);
    card.style.background = proj.gradient || '#111';

    /* Big decorative number */
    const bigNum = document.createElement('div');
    bigNum.className = 'project-card__bignum';
    bigNum.textContent = String(proj.id).padStart(2, '0');

    /* Cover image or video badge */
    if (proj.video && !proj.cover) {
      /* Video-only project: show play badge */
      const badge = document.createElement('div');
      badge.className = 'project-card__video-badge';
      badge.innerHTML = '<span>▶</span>';
      card.appendChild(bigNum);
      card.appendChild(badge);
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
      countBadge.textContent = `${proj.images.length} screens`;
      card.appendChild(countBadge);
    }

    /* Footer */
    const footer = document.createElement('div');
    footer.className = 'project-card__footer';
    footer.innerHTML = `
      <span class="project-card__num">${String(idx + 1).padStart(2, '0')}</span>
      <span class="project-card__title">${title}</span>
      <span class="project-card__inspect">Inspect →</span>
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

    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter     = btn.dataset.filter;
    activeToolFilter = null;
    $$('.tool-btn').forEach(b => b.classList.remove('active'));
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
    <h3 class="modal__title">${title}</h3>
    <p class="modal__desc">${desc}</p>
    <span class="modal__tools-label">${toolsLbl}</span>
    <div class="modal__tools">${toolsHTML}</div>
    <p class="modal__year"><strong>${yearLbl}:</strong> ${proj.year}</p>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = $('#modalOverlay');
  if (!overlay) return;

  /* Remove arrow key listener if set */
  if (overlay._keyHandler) {
    document.removeEventListener('keydown', overlay._keyHandler);
    overlay._keyHandler = null;
  }

  overlay.classList.remove('open');
  document.body.style.overflow = '';

  /* Pause any playing video */
  $('#modalImg video')?.pause();
}

function initModal() {
  const overlay  = $('#modalOverlay');
  const closeBtn = $('#modalClose');
  if (!overlay) return;

  closeBtn?.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
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

    if (!name || !email || !msg) {
      if (successEl) {
        successEl.style.color = '#ff6b6b';
        successEl.textContent = currentLang === 'tr'
          ? 'Lütfen tüm alanları doldurun.'
          : 'Please fill in all fields.';
      }
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
      }
    } catch (err) {
      if (successEl) {
        successEl.style.color = '#ff6b6b';
        successEl.textContent = currentLang === 'tr'
          ? 'Mesaj gönderilemedi, lütfen tekrar deneyin.'
          : 'Message failed to send, please try again.';
      }
    } finally {
      if (btn) btn.disabled = false;
      setTimeout(() => { if (successEl) successEl.textContent = ''; }, 5000);
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
  initNav();
  initMobileMenu();
  initReveal();
  initCursor();
  initAboutTools();
  initFilters();
  renderProjects();
  initModal();
  initContactForm();
  initLangToggle();
});
