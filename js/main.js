(() => {
  // Nav scroll
  const nav = document.getElementById('nav');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 60);
    lastY = scrollY;
  }, { passive: true });

  // Burger
  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    })
  );

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const el = document.querySelector(a.getAttribute('href'));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Scroll reveal
  const reveals = document.querySelectorAll(
    '.card, .step, .num-card, .price-card, .why-card, .faq__item, .go__left, .go__form'
  );
  reveals.forEach(el => el.setAttribute('data-reveal', ''));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  reveals.forEach(el => io.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('.num-card__value');
  let counted = false;
  const countObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      counters.forEach(el => {
        const target = +el.dataset.count;
        const start = performance.now();
        const dur = 1800;
        const tick = now => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          el.textContent = Math.round(ease * target);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }
  }, { threshold: 0.5 });
  if (counters.length) countObserver.observe(counters[0].closest('.numbers__grid'));

  // Form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(form);
      const msg = `Привет! Меня зовут ${d.get('name')}.\nИнтересует: ${d.get('service')}\n${d.get('message')}`;
      window.open(`https://t.me/n3verblad3?text=${encodeURIComponent(msg)}`, '_blank');
      const btn = form.querySelector('button');
      btn.textContent = 'Отправлено!';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent = 'Отправить заявку';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }
})();
