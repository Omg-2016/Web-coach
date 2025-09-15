// menu.js (v7)
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
// custom.js
// === Cambio de título de la pestaña ===

// Versión básica: cambia título al salir y lo restaura al volver
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "👋 ¡Vuelve a Futuro en Movimiento!";
  } else {
    document.title = "Futuro en Movimiento · Santiago Suárez";
  }
});
// Rotador de frases (A) con pausa en hover y al perder foco
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
    // reanuda el ciclo cuando vuelve el foco
    if (!document.hidden && !timer) timer = setInterval(step, 3000);
  });
})();
// Aparición al hacer scroll: tarjetas de audiencia (Adolescentes/Adultos)
(function(){
  const cards = document.querySelectorAll('.audience-card');
  if (!cards.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{
      if (e.isIntersecting){
        e.target.classList.add('in');   // se muestra
        io.unobserve(e.target);         // y se queda (no se oculta más)
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

  // pequeño “stagger” para entrada secuencial
  cards.forEach((card, i)=>{
    card.style.transitionDelay = `${i * 120}ms`;
    io.observe(card);
  });
})();
// Aparición al hacer scroll: frases de beneficios
(function(){
  const items = document.querySelectorAll('.benefits-list li');
  if (!items.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{
      if (e.isIntersecting){
        e.target.classList.add('in');   // se muestra
        io.unobserve(e.target);         // se queda
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  // “stagger” para que aparezcan una a una
  items.forEach((li, i)=>{
    li.style.transitionDelay = `${i * 120}ms`;
    io.observe(li);
  });
})();



// ===============================
// Versión alternativa (parpadeo):
// ===============================
// let blinkInterval;
// const originalTitle = "Futuro en Movimiento · Santiago Suárez";
// const altTitle = "👋 ¡Te esperamos!";

// document.addEventListener("visibilitychange", () => {
//   if (document.hidden) {
//     let visible = false;
//     blinkInterval = setInterval(() => {
//       document.title = visible ? originalTitle : altTitle;
//       visible = !visible;
//     }, 1200); // velocidad del parpadeo
//   } else {
//     clearInterval(blinkInterval);
//     document.title = originalTitle;
//   }
// });
// ===== PRELOADER =====
(function(){
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Evita scroll mientras carga
  document.body.classList.add('preloading');

  // Función para ocultar de forma segura
  const hidePreloader = () => {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      document.body.classList.remove('preloading');
    }
  };

  // Oculta al terminar la carga de la página (recursos incluidos)
  window.addEventListener('load', () => {
    // pequeño delay para que el fade se vea suave
    setTimeout(hidePreloader, 200);
  });

  // Fallback por si algo tarda demasiado (5s)
  setTimeout(hidePreloader, 5000);
})();

