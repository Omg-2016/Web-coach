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
