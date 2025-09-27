// ===============================
// menu.js (v8 corregido)
// ===============================

// --- Menú hamburguesa ---
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.hamburger');
  const navMobile = document.getElementById('navMobile');
  if (!toggle || !navMobile) return;

  const openMenu = () => {
    navMobile.removeAttribute('hidden');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    navMobile.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  navMobile.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('hashchange', closeMenu, { passive: true });
  window.addEventListener('scroll', closeMenu, { passive: true });

  document.addEventListener('click', (e) => {
    const dentro = navMobile.contains(e.target) || toggle.contains(e.target);
    if (!dentro) closeMenu();
  });

  const mq = window.matchMedia('(min-width: 900px)');
  const handleMQ = (e) => { if (e.matches) closeMenu(); };
  if (mq.addEventListener) mq.addEventListener('change', handleMQ);
  else mq.addListener(handleMQ);
});

// --- Cambio de título de la pestaña ---
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "👋 ¡Vuelve a Futuro en Movimiento!";
  } else {
    document.title = "Futuro en Movimiento · Santiago Suárez";
  }
});

// --- Rotador de frases ---
(function(){
  const box = document.querySelector('.rotator');
  const items = box ? [...box.querySelectorAll('.rotator-item')] : [];
  if (!box || items.length < 2) return;

  let i = 0, timer, paused = false;

  const step = () => {
    if (paused || document.hidden) return;
    items[i].classList.remove('in');
    i = (i + 1) % items.length;
    items[i].classList.add('in');
  };

  // arranque
  items[0].classList.add('in');
  timer = setInterval(step, 3000);

  // pausa / reanuda
  box.addEventListener('mouseenter', ()=> paused = true);
  box.addEventListener('mouseleave', ()=> paused = false);
  document.addEventListener('visibilitychange', ()=>{
    if (!document.hidden && !timer) timer = setInterval(step, 3000);
  });
})();

// --- Aparición al hacer scroll: tarjetas de audiencia ---
(function(){
  const cards = document.querySelectorAll('.audience-card');
  if (!cards.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{
      if (e.isIntersecting){
        e.target.classList.add('in');   // se muestra
        io.unobserve(e.target);         // y se queda
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

  cards.forEach((card, i)=>{
    card.style.transitionDelay = `${i * 120}ms`;
    io.observe(card);
  });
})();

// --- Aparición al hacer scroll: frases de beneficios ---
(function(){
  const items = document.querySelectorAll('.benefits-list li');
  if (!items.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{
      if (e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  items.forEach((li, i)=>{
    li.style.transitionDelay = `${i * 120}ms`;
    io.observe(li);
  });
})();

// --- Aparición al hacer scroll: bloques fade-up (Enfoque y Valores) ---
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-up");
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // se queda visible
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});

// --- Preloader ---
(function(){
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  document.body.classList.add('preloading');

  const hidePreloader = () => {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      document.body.classList.remove('preloading');
    }
  };

  window.addEventListener('load', () => {
    setTimeout(hidePreloader, 200);
  });

  setTimeout(hidePreloader, 5000);
})();

// ==========================
// Configuración de cookies
// ==========================
const statusEl = document.querySelector(".status");

// Leer estado de cookies desde localStorage
const cookiePref = localStorage.getItem("cookie-pref");

if (statusEl) {
  if (cookiePref === "accepted") {
    statusEl.textContent = "Aceptadas todas";
    statusEl.classList.add("ok");
  } else if (cookiePref === "rejected") {
    statusEl.textContent = "Solo necesarias";
    statusEl.classList.add("warn");
  } else {
    statusEl.textContent = "Sin decidir";
    statusEl.classList.add("idle");
  }
}
