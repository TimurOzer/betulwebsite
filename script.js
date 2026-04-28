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
const WORK_TOOLS = {
  'work_belt_01.jpg': ['illustrator'],
  'work_belt_02.jpg': ['illustrator', 'photoshop'],
  'work_belt_03.jpg': ['illustrator', 'photoshop'],
  'work_belt_04.jpg': ['illustrator'],
  'work_belt_05.jpg': ['adobe xd'],
  'work_belt_06.jpg': ['illustrator']
};

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

    const MAX_PROBE = 6;
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
	let activeImages = []; // YENİ EKLENEN SATIR
	function getFilteredImages(filter) {
	  if (!filter) return images;
	  return images.filter((src) => {
		const filename = src.split('/').pop(); // Sadece dosya adını alır (örn: work_belt_02.jpg)
		const tools = WORK_TOOLS[filename] || [];
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
	  activeImages = getFilteredImages(filter);
	  const count = activeImages.length;

	  if (elTotal) elTotal.textContent = String(count).padStart(2, '0');

	  // EĞER 4 veya daha azsa tek set, 4'ten fazlaysa sonsuz döngü için 3 set oluştur
	  const sets = count <= 4 ? [activeImages] : [activeImages, activeImages, activeImages];

	  sets.forEach((set, setIdx) => {
		set.forEach((src, i) => {
		  const filename = src.split('/').pop();
		  const tool = WORK_TOOLS[filename] || [];
		  belt.appendChild(makeCard(src, setIdx * activeImages.length + i, tool));
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

	// Proje detay paneli
	function openProjectDetail(imageSrc) {
	  const filename = imageSrc.split('/').pop();
	  const lang = currentLang;
	  const projects = SITE_CONTENT[lang]?.work?.projects || [];
	  const project = projects.find(p => p.file === filename) || {
		title: filename,
		desc: '',
		tools: WORK_TOOLS[filename] || []
	  };
	  const tools = WORK_TOOLS[filename] || [];

	  // Overlay
	  const overlay = document.createElement('div');
	  overlay.className = 'project-detail-overlay';
	  Object.assign(overlay.style, {
		position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
		backgroundColor: 'rgba(0,0,0,0.92)', zIndex: '9999',
		display: 'flex', alignItems: 'center', justifyContent: 'center',
		opacity: '0', transition: 'opacity 0.3s ease',
		padding: '40px'
	  });

	  // Kart
	  const card = document.createElement('div');
	  card.className = 'project-detail-card';
	  Object.assign(card.style, {
		display: 'flex', maxWidth: '1100px', width: '100%', maxHeight: '85vh',
		backgroundColor: '#111', borderRadius: '16px', overflow: 'hidden',
		boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
		transform: 'scale(0.95)', transition: 'transform 0.3s ease',
		flexDirection: 'row'
	  });

	  // Sol: Görsel
	  const imgWrap = document.createElement('div');
	  imgWrap.className = 'project-detail-img';
	  Object.assign(imgWrap.style, {
		flex: '1 1 55%', display: 'flex', alignItems: 'center', justifyContent: 'center',
		background: '#000', minHeight: '400px', position: 'relative', overflow: 'hidden'
	  });
	  const img = document.createElement('img');
	  img.src = imageSrc;
	  Object.assign(img.style, {
		width: '100%', height: '100%', objectFit: 'contain', display: 'block'
	  });
	  imgWrap.appendChild(img);

	  // Sağ: Bilgi
	  const info = document.createElement('div');
	  info.className = 'project-detail-info';
	  Object.assign(info.style, {
		flex: '1 1 45%', padding: '48px 40px', display: 'flex', flexDirection: 'column',
		justifyContent: 'center', color: '#fff', overflowY: 'auto'
	  });

	  // Başlık
	  const title = document.createElement('h3');
	  title.textContent = project.title;
	  Object.assign(title.style, {
		fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
		fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.1', marginBottom: '24px'
	  });
	  info.appendChild(title);

	  // Açıklama
	  if (project.desc) {
		const desc = document.createElement('p');
		desc.textContent = project.desc;
		Object.assign(desc.style, {
		  fontSize: '0.95rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)',
		  fontWeight: '300', marginBottom: '32px', maxWidth: '90%'
		});
		info.appendChild(desc);
	  }

	  // Araçlar
	  if (tools.length) {
		const toolsLabel = document.createElement('span');
		toolsLabel.textContent = currentLang === 'tr' ? 'Kullanılan Araçlar' : 'Tools Used';
		Object.assign(toolsLabel.style, {
		  fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)',
		  textTransform: 'uppercase', marginBottom: '12px', display: 'block'
		});
		info.appendChild(toolsLabel);
		const toolsRow = document.createElement('div');
		toolsRow.style.display = 'flex'; toolsRow.style.gap = '12px'; toolsRow.style.flexWrap = 'wrap';
		tools.forEach(t => {
		  const badge = document.createElement('div');
		  Object.assign(badge.style, {
			width: '40px', height: '40px', background: 'rgba(255,255,255,0.08)',
			borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
			padding: '6px'
		  });
		  const icon = document.createElement('img');
		  icon.src = TOOL_LOGOS[t.toLowerCase()];
		  icon.alt = t;
		  icon.style.width = '100%'; icon.style.height = '100%'; icon.style.objectFit = 'contain';
		  badge.appendChild(icon);
		  toolsRow.appendChild(badge);
		});
		info.appendChild(toolsRow);
	  }

	  // Kapat düğmesi
	  const closeBtn = document.createElement('button');
	  closeBtn.textContent = '✕';
	  Object.assign(closeBtn.style, {
		position: 'absolute', top: '16px', right: '16px',
		background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff',
		width: '36px', height: '36px', borderRadius: '50%', fontSize: '1.2rem',
		cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
		transition: 'background 0.2s', zIndex: '2'
	  });
	  closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(255,255,255,0.2)';
	  closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(255,255,255,0.08)';

	  // Overlay'e kapatma olayı
	  overlay.addEventListener('click', (e) => {
		if (e.target === overlay) {
		  overlay.style.opacity = '0';
		  card.style.transform = 'scale(0.95)';
		  setTimeout(() => overlay.remove(), 300);
		}
	  });
	  closeBtn.addEventListener('click', () => {
		overlay.style.opacity = '0';
		card.style.transform = 'scale(0.95)';
		setTimeout(() => overlay.remove(), 300);
	  });

	  // ESC ile kapat
	  const escHandler = (e) => {
		if (e.key === 'Escape') {
		  overlay.style.opacity = '0';
		  card.style.transform = 'scale(0.95)';
		  setTimeout(() => overlay.remove(), 300);
		  window.removeEventListener('keydown', escHandler);
		}
	  };
	  window.addEventListener('keydown', escHandler);

	  card.appendChild(imgWrap);
	  card.appendChild(info);
	  card.style.position = 'relative';
	  card.appendChild(closeBtn);
	  overlay.appendChild(card);
	  document.body.appendChild(overlay);

	  requestAnimationFrame(() => {
		overlay.style.opacity = '1';
		card.style.transform = 'scale(1)';
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
		  if (diffX < 5 && diffY < 5) openProjectDetail(src);
		});

      return card;
    }

    buildBeltCards(null);

	const GAP      = 16;
	const cardW    = () => belt.querySelector('.work__belt-card')?.offsetWidth || 400;
	const setW     = () => activeImages.length * (cardW() + GAP); // srcList yerine activeImages oldu

    let offsetX    = 0;
    let startSet   = 0;

	function initOffset() {
	  const isLooping = activeImages.length > 4;
	  // Döngü varsa orta sete ( -setW ), yoksa en başa ( 0 ) odaklan
	  startSet = isLooping ? -setW() : 0;
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
	  // 4 veya daha az fotoğraf varsa döngü kontrolünü çalıştırma
	  if (activeImages.length <= 4) return;

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
	  if (!elCur || !activeImages.length) return;
	  const isLooping = activeImages.length > 4;
	  
	  // Döngü varsa startSet'e göre, yoksa 0'a göre hesapla
	  const rel = isLooping ? -(offsetX - startSet) : -offsetX;
	  const idx = Math.round(rel / (cardW() + GAP));
	  const mod = ((idx % activeImages.length) + activeImages.length) % activeImages.length;
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
	  let targetX = dragStartOX + dx;

	  // Döngü kapalıyken (4'ten az fotoğraf) sınırları koru
	  if (activeImages.length <= 4) {
		const maxDrag = 0; // En sol sınır
		const minDrag = -(belt.scrollWidth - wrap.offsetWidth); // En sağ sınır
		if (targetX > maxDrag) targetX = maxDrag;
		if (targetX < minDrag && minDrag < 0) targetX = minDrag;
		else if (minDrag >= 0) targetX = 0; // Ekrana sığıyorsa hiç oynatma
	  }

	  const now = performance.now();
	  velocity  = (x - lastX) / (now - lastTime + 1) * 16;
	  lastX     = x;
	  lastTime  = now;
	  
	  applyTransform(targetX);
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
	set('#aboutToolsLabel', c.about.toolsLabel, 'textContent');
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