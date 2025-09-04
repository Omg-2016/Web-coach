// menu.js
document.addEventListener('DOMContentLoaded', () => {
  // ====== MENÚ MÓVIL (dropdown bajo el header) ======
  const toggle = document.querySelector('.hamburger');
  const navMobile = document.getElementById('navMobile');

  if (toggle && navMobile) {
    const closeMenu = () => {
      navMobile.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        navMobile.setAttribute('hidden', '');
      } else {
        navMobile.removeAttribute('hidden');
      }
    });

    // Cierra al hacer clic en un enlace del menú
    navMobile.addEventListener('click', (e) => {
      if (e.target.matches('a')) closeMenu();
    });

    // Cierra con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Al pasar a escritorio, resetea el estado del menú móvil
    const mq = window.matchMedia('(min-width: 900px)');
    const handleMQ = (e) => { if (e.matches) closeMenu(); };
    if (mq.addEventListener) mq.addEventListener('change', handleMQ);
    else mq.addListener(handleMQ); // fallback navegadores viejos
  }

  // ====== ACORDEONES "MÁS INFORMACIÓN" ======
  const buttons = document.querySelectorAll('.more-toggle');
  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('aria-controls');
        const panel = id ? document.getElementById(id) : null;
        if (!panel) return;

        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Cierra otros acordeones
        buttons.forEach((b) => {
          if (b !== btn) {
            const pid = b.getAttribute('aria-controls');
            const p = pid ? document.getElementById(pid) : null;
            b.setAttribute('aria-expanded', 'false');
            b.textContent = 'Más información';
            if (p) p.setAttribute('hidden', '');
          }
        });

        // Toggle del acordeón actual
        btn.setAttribute('aria-expanded', String(!isOpen));
        if (isOpen) {
          panel.setAttribute('hidden', '');
          btn.textContent = 'Más información';
        } else {
          panel.removeAttribute('hidden');
          btn.textContent = 'Mostrar menos';
          // Lleva el bloque a la vista
          const y = btn.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }
});
