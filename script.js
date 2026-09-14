/* =========================================================
   A DREAM IN BLUE & GOLD — Debut Website Script
   Sections:
     1. Reduced motion check
     2. Sparkle particle canvas
     3. Floating butterflies
     4. Sticky nav + mobile menu
     5. Scroll reveal animations
     6. Hero entrance sequence + "Open Invitation" veil
     7. Live countdown timer
     8. 18 Roses / Candles / Treasures slot lists
     9. RSVP + Message forms
    10. Music player
    11. Back-to-top + share/download
   ========================================================= */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     2. SPARKLE PARTICLE CANVAS
     Soft gold particles drifting slowly upward, like floating
     glitter. Skipped entirely if reduced motion is requested.
  --------------------------------------------------------- */
  function initSparkles() {
    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width, height, particles;
    const PARTICLE_COUNT = window.innerWidth < 720 ? 26 : 55;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        speedY: Math.random() * 0.25 + 0.05,
        drift: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 219, 166, ${(p.alpha * twinkle).toFixed(3)})`;
        ctx.fill();

        p.y -= p.speedY;
        p.x += p.drift;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    init();
    requestAnimationFrame(draw);
  }

  /* ---------------------------------------------------------
     3. FLOATING BUTTERFLIES
     A handful of SVG butterflies gently drifting across the
     viewport on independent, randomized paths.
  --------------------------------------------------------- */
  function initButterflies() {
    const layer = document.getElementById('butterfly-layer');
    if (!layer || prefersReducedMotion) return;

    const COUNT = window.innerWidth < 720 ? 10 : 25;
    const palette = ['#D4AF6A', '#A9C6E8', '#F0DBA6', '#CFE0F5'];

    function makeButterflySVG(color) {
      return `
        <svg width="30" height="30" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <g class="wing-left">
            <path d="M30 30 C18 10, 2 12, 4 26 C6 38, 20 36, 30 30Z" fill="${color}" opacity="0.85"/>
          </g>
          <g class="wing-right">
            <path d="M30 30 C42 10, 58 12, 56 26 C54 38, 40 36, 30 30Z" fill="${color}" opacity="0.85"/>
          </g>
          <line x1="30" y1="22" x2="30" y2="38" stroke="${color}" stroke-width="1.4"/>
        </svg>`;
    }

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'butterfly';
      const color = palette[i % palette.length];
      el.innerHTML = makeButterflySVG(color);

      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const size = 0.7 + Math.random() * 0.9;
      const duration = 22 + Math.random() * 18;
      const delay = Math.random() * -20;

      el.style.left = startX + 'vw';
      el.style.top = startY + 'vh';
      el.style.transform = `scale(${size})`;
      el.style.animation = `butterflyPath${i % 4} ${duration}s ease-in-out ${delay}s infinite`;

      layer.appendChild(el);
    }

    // Inject a handful of distinct drifting paths so butterflies
    // don't all move in visual lockstep.
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      @keyframes butterflyPath0 {
        0%   { transform: translate(0, 0) scale(var(--s,1)) rotate(0deg); }
        25%  { transform: translate(12vw, -8vh) scale(var(--s,1)) rotate(8deg); }
        50%  { transform: translate(4vw, 10vh) scale(var(--s,1)) rotate(-6deg); }
        75%  { transform: translate(-10vw, -4vh) scale(var(--s,1)) rotate(4deg); }
        100% { transform: translate(0, 0) scale(var(--s,1)) rotate(0deg); }
      }
      @keyframes butterflyPath1 {
        0%   { transform: translate(0, 0) scale(var(--s,1)) rotate(0deg); }
        30%  { transform: translate(-14vw, 6vh) scale(var(--s,1)) rotate(-8deg); }
        60%  { transform: translate(6vw, 14vh) scale(var(--s,1)) rotate(6deg); }
        100% { transform: translate(0, 0) scale(var(--s,1)) rotate(0deg); }
      }
      @keyframes butterflyPath2 {
        0%   { transform: translate(0, 0) scale(var(--s,1)) rotate(0deg); }
        40%  { transform: translate(10vw, 12vh) scale(var(--s,1)) rotate(5deg); }
        70%  { transform: translate(-8vw, -10vh) scale(var(--s,1)) rotate(-5deg); }
        100% { transform: translate(0, 0) scale(var(--s,1)) rotate(0deg); }
      }
      @keyframes butterflyPath3 {
        0%   { transform: translate(0, 0) scale(var(--s,1)) rotate(0deg); }
        35%  { transform: translate(-6vw, -12vh) scale(var(--s,1)) rotate(-4deg); }
        65%  { transform: translate(12vw, -2vh) scale(var(--s,1)) rotate(7deg); }
        100% { transform: translate(0, 0) scale(var(--s,1)) rotate(0deg); }
      }
    `;
    document.head.appendChild(styleTag);
  }

  /* ---------------------------------------------------------
     4. STICKY NAV + MOBILE MENU
  --------------------------------------------------------- */
  function initNav() {
    const nav = document.getElementById('siteNav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!nav) return;

    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
      });

      links.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
          links.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* ---------------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS
     IntersectionObserver fades + lifts sections into view once,
     and lights up timeline dots as they pass into the viewport.
  --------------------------------------------------------- */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    const timelineEls = document.querySelectorAll('.timeline-item');

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('in-view'));
      timelineEls.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
    timelineEls.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------
     6. HERO ENTRANCE SEQUENCE + OPEN INVITATION VEIL
  --------------------------------------------------------- */
  function initHeroEntrance() {
    const veil = document.getElementById('inviteVeil');
    const openBtn = document.getElementById('openInviteBtn');

    const heroEls = [
      { id: 'h-kicker', delay: 100 },
      { id: 'h-name', delay: 260 },
      { id: 'h-title', delay: 460 },
      { id: 'h-tagline', delay: 620 },
      { id: 'h-meta', delay: 760 },
      { id: 'h-actions', delay: 900 }
    ];

    function playHeroSequence() {
      heroEls.forEach(({ id, delay }) => {
        const el = document.getElementById(id);
        if (!el) return;
        setTimeout(() => {
          el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        }, prefersReducedMotion ? 0 : delay);
      });
      const cue = document.querySelector('.scroll-cue');
      if (cue) {
        setTimeout(() => { cue.style.transition = 'opacity 1s ease'; cue.style.opacity = '1'; }, prefersReducedMotion ? 0 : 1100);
      }
    }

    // set initial offset for a soft rise-in
    heroEls.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) el.style.transform = 'translateY(16px)';
    });

    if (veil && openBtn) {
      // Auto-dismiss the preparing veil quickly, then let the
      // hero content play in underneath it.
      setTimeout(() => {
        veil.classList.add('hidden');
        playHeroSequence();
        // Attempt to start background music the moment the
        // loading veil finishes. If the browser blocks it, the
        // fallback listeners in initBackgroundMusic() will catch
        // the visitor's first click/tap instead.
        if (typeof window.__tryStartBackgroundMusic === 'function') {
          window.__tryStartBackgroundMusic();
        }
      }, prefersReducedMotion ? 200 : 1200);

      openBtn.addEventListener('click', () => {
        document.getElementById('intro')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    } else {
      playHeroSequence();
      if (typeof window.__tryStartBackgroundMusic === 'function') {
        window.__tryStartBackgroundMusic();
      }
    }
  }

  /* ---------------------------------------------------------
     7. LIVE COUNTDOWN TIMER
  --------------------------------------------------------- */
  function initCountdown() {
    const grid = document.getElementById('countdownGrid');
    if (!grid) return;

    const targetDate = new Date(grid.dataset.target);
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    function pad(n) { return String(Math.max(n, 0)).padStart(2, '0'); }

    function tick() {
      const now = new Date();
      let diff = targetDate.getTime() - now.getTime();

      if (isNaN(targetDate.getTime())) return;

      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        clearInterval(intervalId);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);
      const seconds = Math.floor(diff / 1000);

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }

    tick();
    const intervalId = setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------
     8. 18 CHOCOLATES / BLUEBILLS / HARD SHOTS / ROSES/ TREASURE/ SPECIAL CANDLE — SLOT LISTS
     Generates 18 numbered, editable-later placeholder slots
     for each tradition card.
  --------------------------------------------------------- */
  function initTraditionSlots() {
    
    const configs = [
      { id: 'rosesList', names: ['Renz Erwin Nuqui', 'Barry Acuin', 'Ivan Bangcaray', 'Markie Bautista', 'Ian Bangcaray', 'Tristan Kyle Valenzuela', 'Kalel David', 'Nathan Rullan', 'Aethan Rullan', 'John Jomel Chavez', 'Carlo Nuqui', 'Jorous Cawigan', 'Earl David', 'Geoff Mendoza', 'Clarence Viray', 'Bryan Nuqui', 'Willington Nuqui', 'Jimmy Nuqui'] },
      { id: 'candlesList', names: ['Ryza Nuqui', 'Angelic Valenzuela', 'Kristina Elaine Cawigan', 'Princess Andrea Acuin', 'Andrea Balatbat', 'Clay Ann Enriquez', 'Marianelle Orado', 'Rhea Diamsay', 'Darlene Bangcaray', 'Kristine Chloe Rullan', 'Rian Eteroza', 'Leigh Ann Bangcaray', 'Arian Bangcaray', 'Gwyneth Ann Mendoza', 'Charmie Nuqui', 'Joyce Macatuno', 'SherryAnn Nuqui', 'Rosanna Nuqui' ] },
      { id: 'treasuresList', names: ['Jelline Manalansan', 'Janelle Manalansan', 'Mariaella Bonifacio', 'Catheryne Nuqui', 'Karen Nuqui', 'Dian Bangcaray', 'Krisna Cawigan', 'Princess Calma', 'Mary Blue Tamayo Garcia', 'Clariza Ducut', 'Nikka Rosita', 'Zyca Arabaca', 'Princess Rosita', 'Jenilyn Castro', 'Riza Arabaca', 'Alexa Catalan', 'Irene Aguilar', 'Aejay Bagang'] },
      { id: 'billsList', names: ['Gloria Reyes', 'Letisha Manuel', 'Omer Dabu', 'Michelle Bonifacio', 'Cora Intal', 'Warren Mallari', 'Maricris Maranoc', 'Crisel Paule', 'Pinky Manalo', 'Anna Manalansan', 'Jenny Manalansan', 'Janice Cawigan', 'Janet Eteroza', 'Amy Lozano Ochoa', 'Jinky Ocampo', 'Jhoan Reyes Rullan', 'Jema Dabu', 'Joyce Bansil Susi'] },
      { id: 'chocolatesList', names: ['Azriel Danzel & Kalix Jaze Nuqui', 'Alden Cyrus Morales', 'Akihiro Aguilar', 'Asher Bangcaray', 'Austin Morales', 'Gyro Buenaventura', 'Nathaniel Nuqui', 'Gyro Maranoc', 'Jace Gavin Bansil', 'Edward Kalix Serrano', 'Mateo Cawigan', 'Kenjie David', 'Keizzia Belleza', 'Maxine Mae Nuqui', 'Atarah Bonifacio', 'Janella Bonifacio', 'Zumi Zyrel Arabaca', 'Hero Acuin'] },
      { id: 'shotsList', names: ['Carl Adrian Dampil', 'Jaivee Macatuno', 'Caleb John Flores', 'Jefferson Berbs', 'Raven Dave Falalimpa', 'Aldrin Arabaca', 'Yves Alfonso', 'Joseph Valenzuela', 'Billy Nuqui', 'Ronald Bonifacio', 'Jody Malmis', 'Ramil Cawigan', 'Edward Jules David', 'Kevin Nuqui', 'Ricky Rullan', 'Dante Cawigan', 'Leo Bangcaray', 'Alaine Cawigan' ] }
    ];

    configs.forEach(({ id, names }) => {
    const list = document.getElementById(id);
    if (!list) return;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 18; i++) {
      const li = document.createElement('li');
      const personName = names[i] || 'TBD'; 
      li.innerHTML = `<span class="slot-num">${String(i + 1).padStart(2, '0')}</span><span class="slot-name">${personName}</span>`;
      fragment.appendChild(li);
    }
    list.appendChild(fragment);
  });

    // Collapse long lists behind a "show all" affordance so the
    // page doesn't feel overwhelming on first load.
    document.querySelectorAll('.tradition-slot').forEach((list) => {
      const items = Array.from(list.children);
      if (items.length <= 5) return;

      items.slice(5).forEach((item) => { item.style.display = 'none'; });

      const toggle = document.createElement('li');
      toggle.style.borderBottom = 'none';
      toggle.style.paddingTop = '12px';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = `Show all 18 →`;
      btn.style.cssText = 'background:none;border:none;color:var(--gold);font-size:0.85rem;padding:0;letter-spacing:0.04em;';
      btn.addEventListener('click', () => {
        const hidden = items.slice(5).filter((i) => i.style.display === 'none');
        const isExpanded = hidden.length === 0;
        items.slice(5).forEach((item) => { item.style.display = isExpanded ? 'none' : 'flex'; });
        btn.textContent = isExpanded ? 'Show all 18 →' : 'Show less';
      });
      toggle.appendChild(btn);
      list.appendChild(toggle);
    });
  }

  /* ---------------------------------------------------------
     9. MESSAGE FORMS
     Client-side only: validates, shows a success state. Wire
     up formAction / fetch to a backend or form service later.
  --------------------------------------------------------- */
  function initForms1() {
    // Attendance radio pill styling
    const attendanceGroup = document.getElementById('attendanceGroup');
    if (attendanceGroup) {
      const pills = attendanceGroup.querySelectorAll('.radio-pill');
      pills.forEach((pill) => {
        const input = pill.querySelector('input');
        input.addEventListener('change', () => {
          pills.forEach((p) => p.classList.remove('checked'));
          if (input.checked) pill.classList.add('checked');
        });
      });
    }

    function wireForm(formId, successId) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form || !success) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.textContent : '';

  const action = form.getAttribute('action') || '';
  const hasRealEndpoint = /^https:\/\/formsubmit\.co\/[\w.+-]+@[\w-]+\.[a-z]{2,}$/i.test(action);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!hasRealEndpoint) {
      form.style.display = 'none';
      success.classList.add('show');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    fetch(action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then((response) => {
        if (response.ok) {
          form.style.display = 'none';
          success.classList.add('show');
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
        alert("Sorry, your message couldn't be sent right now. Please try again in a moment.");
      });
  });
    }

    wireForm('rsvpForm', 'rsvpSuccess');
    wireForm('messageForm', 'messageSuccess');

  }

  /* ---------------------------------------------------------
     10. RSVP FORMS
     Client-side only: validates, shows a success state. Wire
     up formAction / fetch to a backend or form service later.
  --------------------------------------------------------- */
  function initForms2() {
    // Attendance radio pill styling
    const attendanceGroup = document.getElementById('attendanceGroup');
    if (attendanceGroup) {
      const pills = attendanceGroup.querySelectorAll('.radio-pill');
      pills.forEach((pill) => {
        const input = pill.querySelector('input');
        input.addEventListener('change', () => {
          pills.forEach((p) => p.classList.remove('checked'));
          if (input.checked) pill.classList.add('checked');
        });
      });
    }

    function wireForm(formId, successId) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form || !success) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.textContent : '';

  const action = form.getAttribute('action') || '';
  const hasRealEndpoint = /^https:\/\/formsubmit\.co\/[\w.+-]+@[\w-]+\.[a-z]{2,}$/i.test(action);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!hasRealEndpoint) {
      form.style.display = 'none';
      success.classList.add('show');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    fetch(action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then((response) => {
        if (response.ok) {
          form.style.display = 'none';
          success.classList.add('show');
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
        alert("Sorry, your RSVP couldn't be submit right now. Please try again in a moment.");
      });
  });
    }

    wireForm('rsvpForm', 'rsvpSuccess');
    wireForm('messageForm', 'messageSuccess');

  }

  /* ---------------------------------------------------------
     11. BACKGROUND MUSIC — AUTO-START AFTER LOADING VEIL
     Attempts to play automatically the moment the "Preparing
     your invitation…" veil finishes.
  --------------------------------------------------------- */
  function initBackgroundMusic() {
    const audio = document.getElementById('bgAudio');
    if (!audio) return;

    let started = false;

    function tryStart() {
      if (started) return;
      audio.play().then(() => {
        started = true;
        document.removeEventListener('click', tryStart);
        document.removeEventListener('touchstart', tryStart);
        document.removeEventListener('keydown', tryStart);
      }).catch(() => {
        // Autoplay blocked — the fallback listeners below will
        // catch the visitor's first interaction instead.
      });
    }

    // Fallback: first tap/click/keypress anywhere on the page
    // starts the music if the initial autoplay attempt failed.
    document.addEventListener('click', tryStart);
    document.addEventListener('touchstart', tryStart);
    document.addEventListener('keydown', tryStart);

    // Expose so the hero entrance sequence can trigger this
    // right as the loading veil finishes.
    window.__tryStartBackgroundMusic = tryStart;
  }

  /* ---------------------------------------------------------
     12. BACK-TO-TOP + SHARE / DOWNLOAD
  --------------------------------------------------------- */
  function initMisc() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 700);
      }, { passive: true });

      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    }

    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const shareData = {
          title: document.title,
          text: "You're invited to Saira's 18th Birthday Debut — A Dream in Blue & Gold.",
          url: window.location.href
        };
        if (navigator.share) {
          try { await navigator.share(shareData); } catch (_) { /* user cancelled */ }
        } else if (navigator.clipboard) {
          try {
            await navigator.clipboard.writeText(shareData.url);
            const original = shareBtn.textContent;
            shareBtn.textContent = 'Link Copied!';
            setTimeout(() => { shareBtn.textContent = original; }, 2000);
          } catch (_) { /* clipboard unavailable */ }
        }
      });
    }

    const downloadBtn = document.getElementById('downloadInviteBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initSparkles();
    initButterflies();
    initNav();
    initReveal();
    initBackgroundMusic();
    initHeroEntrance();
    initCountdown();
    initTraditionSlots();
    initForms1();
    initForms2();
    initMisc();
  });
})(); 
