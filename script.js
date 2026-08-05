(function () {
  'use strict';

  var stage       = document.getElementById('stage');
  var pillToggle  = document.getElementById('pillToggle');
  var pillMenu    = document.getElementById('pillMenu');
  var pillCurrent = document.getElementById('pillCurrent');
  var carouselTrack = document.getElementById('carouselTrack');
  var carPrev     = document.getElementById('carPrev');
  var carNext     = document.getElementById('carNext');
  var detailOverlay = document.getElementById('detailOverlay');
  var detailClose   = document.getElementById('detailClose');
  var detailBody     = document.getElementById('detailBody');

  /* ── Pill / section dropdown ───────────────────────────── */
  function closeMenu() {
    pillMenu.hidden = true;
    pillToggle.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    pillMenu.hidden = false;
    pillToggle.setAttribute('aria-expanded', 'true');
  }
  pillToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (pillMenu.hidden) openMenu(); else closeMenu();
  });
  pillMenu.addEventListener('click', function (e) {
    var li = e.target.closest('li');
    if (!li || li.getAttribute('aria-disabled') === 'true') return;
    var view = li.dataset.view;
    if (!view) return;
    stage.dataset.view = view;
    pillCurrent.textContent = view.charAt(0).toUpperCase() + view.slice(1);
    closeMenu();
  });
  document.addEventListener('click', function (e) {
    if (!pillMenu.hidden && !pillMenu.contains(e.target) && e.target !== pillToggle) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Projects carousel ─────────────────────────────────── */
  (window.PROJECTS || []).forEach(function (project) {
    var card = document.createElement('div');
    card.className = 'project-card';
    if (project.type === 'video') {
      card.classList.add('project-card--video');
    } else {
      var cover = project.thumbs && project.thumbs[0] ? project.thumbs[0] : project.images[0];
      card.style.backgroundImage = 'url(' + encodeURI(cover) + ')';
    }

    var label = document.createElement('div');
    label.className = 'project-card__label';
    label.textContent = project.title;
    card.appendChild(label);

    card.addEventListener('click', function () { openDetail(project); });
    carouselTrack.appendChild(card);
  });

  function scrollCarousel(dir) {
    var card = carouselTrack.querySelector('.project-card');
    var step = card ? card.getBoundingClientRect().width + 24 : 300;
    carouselTrack.scrollBy({ left: dir * step, behavior: 'smooth' });
  }
  carPrev.addEventListener('click', function () { scrollCarousel(-1); });
  carNext.addEventListener('click', function () { scrollCarousel(1); });

  /* ── Project detail overlay ────────────────────────────── */
  var galleryImages = [];
  var galleryIndex = 0;

  function renderGalleryFrame() {
    var img = detailBody.querySelector('.detail-media img');
    var counter = detailBody.querySelector('.detail-counter');
    if (img) img.src = encodeURI(galleryImages[galleryIndex]);
    if (counter) counter.textContent = (galleryIndex + 1) + ' / ' + galleryImages.length;
    detailBody.querySelectorAll('.detail-thumbs img').forEach(function (th, i) {
      th.classList.toggle('active', i === galleryIndex);
    });
  }
  function setGalleryIndex(i) {
    galleryIndex = ((i % galleryImages.length) + galleryImages.length) % galleryImages.length;
    renderGalleryFrame();
  }

  function openDetail(project) {
    detailBody.innerHTML = '';

    var h2 = document.createElement('h2');
    h2.textContent = project.title;
    var desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = project.desc;

    var media = document.createElement('div');
    media.className = 'detail-media';

    if (project.type === 'video') {
      var video = document.createElement('video');
      video.src = encodeURI(project.video);
      video.controls = true;
      video.autoplay = true;
      media.appendChild(video);
      detailBody.append(h2, desc, media);
    } else {
      galleryImages = project.images;
      galleryIndex = 0;

      var img = document.createElement('img');
      media.appendChild(img);

      if (galleryImages.length > 1) {
        var prevBtn = document.createElement('button');
        prevBtn.className = 'detail-nav detail-nav--prev';
        prevBtn.setAttribute('aria-label', 'Previous image');
        prevBtn.textContent = '←';
        prevBtn.addEventListener('click', function (e) { e.stopPropagation(); setGalleryIndex(galleryIndex - 1); });

        var nextBtn = document.createElement('button');
        nextBtn.className = 'detail-nav detail-nav--next';
        nextBtn.setAttribute('aria-label', 'Next image');
        nextBtn.textContent = '→';
        nextBtn.addEventListener('click', function (e) { e.stopPropagation(); setGalleryIndex(galleryIndex + 1); });

        media.append(prevBtn, nextBtn);
      }

      var counter = document.createElement('div');
      counter.className = 'detail-counter';

      detailBody.append(h2, desc, media, counter);

      if (galleryImages.length > 1) {
        var thumbs = document.createElement('div');
        thumbs.className = 'detail-thumbs';
        (project.thumbs || galleryImages).forEach(function (src, i) {
          var th = document.createElement('img');
          th.src = encodeURI(src);
          th.addEventListener('click', function () { setGalleryIndex(i); });
          thumbs.appendChild(th);
        });
        detailBody.appendChild(thumbs);
      }

      renderGalleryFrame();
    }

    detailOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeDetail() {
    detailOverlay.hidden = true;
    document.body.style.overflow = '';
    var video = detailBody.querySelector('video');
    if (video) video.pause();
  }

  detailClose.addEventListener('click', closeDetail);
  detailOverlay.addEventListener('click', function (e) {
    if (e.target === detailOverlay) closeDetail();
  });
  document.addEventListener('keydown', function (e) {
    if (detailOverlay.hidden) return;
    if (e.key === 'Escape') closeDetail();
    if (e.key === 'ArrowLeft' && galleryImages.length) setGalleryIndex(galleryIndex - 1);
    if (e.key === 'ArrowRight' && galleryImages.length) setGalleryIndex(galleryIndex + 1);
  });
})();
