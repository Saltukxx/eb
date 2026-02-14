/**
 * Ebrar Sevgililer Günü - Ana Uygulama
 * Canvas starfield, scroll animasyonları, sahne yönetimi
 */

(function () {
  'use strict';

  /* ===== STARFIELD ===== */
  const STAR_COUNT = 80;
  let stars = [];
  let animationId = null;

  function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (stars.length === 0) {
        stars = Array.from({ length: STAR_COUNT }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.5 + 0.5
        }));
      }
    };

    resize();
    window.addEventListener('resize', resize);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
        const twinkle = 0.5 + Math.sin(Date.now() * 0.002 + star.x) * 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();
  }

  /* ===== SCROLL PROGRESS ===== */
  let ticking = false;
  let lastScroll = 0;

  function getSectionProgress(section) {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;
    const progress = (windowHeight - rect.top) / (sectionHeight + windowHeight);
    return Math.max(0, Math.min(1, progress));
  }

  function getSectionProgressLocal(section) {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;
    const shown = windowHeight - rect.top;
    return Math.max(0, Math.min(1, shown / sectionHeight));
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateAllSections();
        ticking = false;
      });
      ticking = true;
    }
  }


  /* ===== SECTION UPDATERS ===== */
  function updateHero() {
    const section = document.getElementById('hero');
    if (!section) return;
    const progress = getSectionProgress(section);
    const content = section.querySelector('.balloon-content');
    if (content) {
      const y = (1 - progress) * 30;
      const opacity = Math.max(0, Math.min(1, 1 - progress * 1.5));
      content.style.transform = `translateY(${y}px)`;
      content.style.opacity = String(opacity);
    }
  }

  let chatSequenceStarted = false;

  function updateChat() {
    const section = document.getElementById('chat-scene');
    const chatSim = section?.querySelector('.wa-chat-sim');
    const typing = section?.querySelector('.wa-typing');
    const messages = section?.querySelectorAll('.wa-msg');
    if (!section || !chatSim || !messages.length) return;

    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.85;

    if (inView && !chatSequenceStarted) {
      chatSequenceStarted = true;
      const delayPerMsg = 600;
      const initialDelay = 800;
      const scrollEl = chatSim;

      messages.forEach((msg, i) => {
        setTimeout(() => {
          if (typing && i === 0) typing.classList.add('hidden');
          msg.classList.add('visible');
          if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
        }, initialDelay + i * delayPerMsg);
      });
    }
  }

  function updateLetter() {
    const section = document.getElementById('letter-finale');
    if (!section) return;
    const progress = getSectionProgressLocal(section);
    const hint = section.querySelector('.letter-hint');
    const container = section.querySelector('.letter-container');
    if (container && progress > 0.15) {
      container.classList.add('in-view');
    }
    if (hint && !section.dataset.letterOpened) {
      if (progress > 0.3) {
        hint.classList.add('visible');
        hint.classList.remove('hidden');
      } else {
        hint.classList.remove('visible');
      }
    }
  }

  function updateClosing() {
    const section = document.getElementById('closing');
    if (!section) return;
    const progress = getSectionProgressLocal(section);
    const btn = section.querySelector('.heart-btn');
    if (btn) {
      btn.style.opacity = progress > 0.3 ? '1' : '0';
      btn.style.transform = progress > 0.3 ? 'scale(1)' : 'scale(0.8)';
    }
  }

  function updateAllSections() {
    updateHero();
    updateMusicSection();
    updateChat();
    updateLetter();
    updateClosing();
  }

  /* ===== LETTER (TIKLAMA İLE AÇILMA) ===== */
  function initLetter() {
    const btn = document.getElementById('envelope-btn');
    const envelope = document.querySelector('.envelope');
    const letter = document.querySelector('.letter');
    const lines = document.querySelectorAll('.letter-line');
    const hint = document.getElementById('letter-hint');
    const section = document.getElementById('letter-finale');

    if (!btn || !envelope || !letter) return;

    btn.addEventListener('click', () => {
      if (section.dataset.letterOpened) return;
      section.dataset.letterOpened = 'true';
      section.querySelector('.letter-container')?.classList.add('letter-opened');

      if (hint) {
        hint.classList.add('hidden');
        hint.classList.remove('visible');
      }

      btn.classList.add('pulse');
      btn.classList.add('opening');
      btn.style.pointerEvents = 'none';

      setTimeout(() => envelope.classList.add('open'), 450);

      setTimeout(() => letter.classList.add('revealed'), 1600);

      lines.forEach((line, i) => {
        setTimeout(() => line.classList.add('visible'), 2600 + i * 320);
      });
    });
  }

  /* ===== GALERİ SERGİ - Sayaç ve header görünürlük ===== */
  function initGalleryExhibition() {
    const exhibition = document.querySelector('.gallery-exhibition');
    const counter = document.getElementById('gallery-counter');
    const header = document.querySelector('.gallery-header');
    const hint = document.getElementById('gallery-hint');
    const slides = document.querySelectorAll('.gallery-slide');

    if (!exhibition || !counter || slides.length === 0) return;

    const total = slides.length;

    function updateCounter() {
      const vh = window.innerHeight;
      const center = vh * 0.5;
      let current = 0;
      slides.forEach((slide, i) => {
        const r = slide.getBoundingClientRect();
        if (r.top <= center && r.bottom >= center) current = i + 1;
      });
      counter.textContent = `${current || 1} / ${total}`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting;
          if (header) header.classList.toggle('visible', visible);
          if (hint) hint.classList.toggle('visible', visible);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(exhibition);

    window.addEventListener('scroll', updateCounter, { passive: true });
    updateCounter();
  }

  /* ===== MODAL - Daktilo efekti ===== */
  const modalParagraphs = [
    { text: "Seni çok seviyorum. Hep diyorum, Allah'tan seni diledim o da bana nasip etti. Beraber girdiğimiz ilk 14 Şubatta yanında değilim belki ama kalbim hep seninle atıyor, hep de seninle atacak.", love: false },
    { text: "Seni sevmeyi, senin tarafından sevilmeyi çok seviyorum. Çünkü sevmek ve sevilmek sen içinde olunca anlam buldu benim hayatımda. Seni tanıyıp, seni anladığım günden beri hayatımın geri kalanında senin olmadığın bir an olsun istemiyorum.", love: false },
    { text: "Bütün hayallerimde, geleceğe dair umutla baktığım bütün günlerde sen varsın ve hepsi sen varsın diye güzel. Bu garip hayatımın anlamsızlıkları arasında açan bir çiçeksin benim için. Sessiz, sabırlı ve koşulsuz açan bir çiçek. Bütün zorluklara, bütün engellere rağmen asla solmayan bir çiçek.", love: false },
    { text: "Seni ömrüm yettiğince, senin beni sevdiğin gibi, sessiz, sabırlı ve koşulsuz seveceğim seni. Umarım her sene buraya yeni anılarımızı koyabiliriz. Bizimle beraber büyütür, belki birgün çocuklarımıza gösteririz. Koskocaman bir iyi kisin benim için, onun için yazıya başladığım gibi bitirmek istedim.", love: false },
    { text: "Seni çok seviyorum sevgilim,\nSaltuk", love: true }
  ];

  function runTypewriter(container, delayPerWord) {
    if (!container) return;
    container.innerHTML = '';
    const tokens = [];
    for (const p of modalParagraphs) {
      const lines = p.text.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (i > 0) tokens.push({ type: 'br' });
        const words = lines[i].split(/\s+/).filter(Boolean);
        for (const w of words) tokens.push({ type: 'word', text: w });
      }
      tokens.push({ type: 'pEnd', love: p.love });
    }

    let currentP = null;
    let delay = 0;
    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      const next = tokens[i + 1];
      if (tok.type === 'br') {
        if (currentP) {
          const targetP = currentP;
          const br = document.createElement('br');
          setTimeout(() => targetP.appendChild(br), delay);
          delay += delayPerWord;
        }
      } else if (tok.type === 'word') {
        if (!currentP) {
          currentP = document.createElement('p');
          container.appendChild(currentP);
        }
        const targetP = currentP;
        const span = document.createElement('span');
        span.className = 'modal-word';
        span.textContent = tok.text;
        const d = delay;
        setTimeout(() => {
          targetP.appendChild(span);
          if (next && next.type === 'word') targetP.appendChild(document.createTextNode(' '));
        }, d);
        delay += delayPerWord;
      } else if (tok.type === 'pEnd') {
        if (currentP && tok.love) currentP.classList.add('modal-love');
        currentP = null;
      }
    }
  }

  function initModal() {
    const btn = document.getElementById('heart-btn');
    const modal = document.getElementById('surprise-modal');
    const overlay = document.getElementById('modal-overlay');
    const modalText = document.getElementById('modal-text');

    if (!btn || !modal) return;

    const open = () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const video = document.getElementById('hero-video');
      if (video) video.play().catch(() => {});
      runTypewriter(modalText, 90);
    };
    const close = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (modalText) modalText.innerHTML = '';
    };

    btn.addEventListener('click', open);
    overlay.addEventListener('click', close);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });
  }

  /* ===== MUSIC - WhatsApp simülasyonu + buton ===== */
  let musicSequenceStarted = false;

  function updateMusicSection() {
    const section = document.getElementById('music-section');
    const chatSim = document.getElementById('wa-chat-sim');
    const musicFinal = document.getElementById('music-final');
    if (!section || !chatSim || !musicFinal) return;

    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.85;

    if (inView && !musicSequenceStarted) {
      musicSequenceStarted = true;
      const typing = chatSim.querySelector('.wa-typing');
      const msgs = chatSim.querySelectorAll('.wa-msg');
      const delayPerMsg = 2400;
      const initialDelay = 1800;
      const holdBeforeClose = 5500;

      msgs.forEach((msg, i) => {
        setTimeout(() => {
          if (typing && i === 0) typing.classList.add('hidden');
          msg.classList.add('visible');
        }, initialDelay + i * delayPerMsg);
      });
      setTimeout(() => {
        chatSim.classList.add('hidden');
        setTimeout(() => {
          musicFinal.classList.add('visible');
        }, 500);
      }, initialDelay + msgs.length * delayPerMsg + holdBeforeClose);
    }
  }

  function initMusic() {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-open-btn');
    if (!audio || !btn) return;

    audio.volume = 0.35;

    btn.addEventListener('click', () => {
      audio.currentTime = 26;
      audio.play().catch(() => {});
      btn.classList.add('playing');
      btn.querySelector('.music-open-label').textContent = 'Müzik çalıyor';
      btn.setAttribute('aria-label', 'Müzik çalıyor');
      localStorage.setItem('music-muted', 'false');
    });
  }

  /* ===== FLOATING HEARTS ===== */
  function initFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;
    const hearts = ['♥', '♡', '♥'];
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('span');
      el.className = 'floating-heart';
      el.textContent = hearts[i % 3];
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDelay = (Math.random() * 8) + 's';
      el.style.animationDuration = (10 + Math.random() * 6) + 's';
      el.style.fontSize = (0.6 + Math.random() * 0.8) + 'rem';
      container.appendChild(el);
    }
  }

  /* ===== MEDIA LOADING & VIDEO KEEP PLAYING ===== */
  function initMediaLoading() {
    const video = document.getElementById('hero-video');
    const videoLoading = document.getElementById('video-loading');
    if (video && videoLoading) {
      const hideVideoLoading = () => videoLoading.classList.add('hidden');
      if (video.readyState >= 3) hideVideoLoading();
      else video.addEventListener('canplay', hideVideoLoading);

      video.addEventListener('ended', () => video.play());
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && video) video.play().catch(() => {});
      });
    }
  }

  /* ===== INIT ===== */
  function init() {
    initStarfield();
    initFloatingHearts();
    initMediaLoading();
    initLetter();
    initGalleryExhibition();
    initModal();
    initMusic();
    updateAllSections();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', () => updateAllSections());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
