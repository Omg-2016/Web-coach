// ===============================
// menu.js (v9 definitivo)
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

// ===== Registro de consentimiento de cookies (centralizado) =====
const POLICY_VERSION = "2025-09-27";            // actualiza cuando cambies la política
const GA_MEASUREMENT_ID = "G-SX0VVQPPVH";       // tu ID real de GA4
const LS_KEY = "cookieConsent";                 // 'accepted' | 'rejected'
const LS_AT  = "cookieConsentAt";               // ISO datetime
const LS_VER = "cookiePolicyVersion";           // versión de política

function saveConsent(status) {
  const nowIso = new Date().toISOString();
  try {
    localStorage.setItem(LS_KEY, status);
    localStorage.setItem(LS_AT, nowIso);
    localStorage.setItem(LS_VER, POLICY_VERSION);
  } catch (e) {}
  document.cookie = `${LS_KEY}=${status}; path=/; max-age=${60*60*24*365}; SameSite=Lax`;
  document.cookie = `${LS_AT}=${encodeURIComponent(nowIso)}; path=/; max-age=${60*60*24*365}; SameSite=Lax`;
  document.cookie = `${LS_VER}=${POLICY_VERSION}; path=/; max-age=${60*60*24*365}; SameSite=Lax`;
}

// Lee y normaliza (soporta valores antiguos: all/necessary)
function readConsent() {
  const v = (localStorage.getItem(LS_KEY) || "").toLowerCase();
  if (v === "accepted" || v === "rejected") return v;
  if (v === "all") return "accepted";
  if (v === "necessary") return "rejected";
  const m = document.cookie.match(/(?:^|; )cookieConsent=([^;]+)/);
  if (m) {
    const c = decodeURIComponent(m[1]).toLowerCase();
    if (c === "accepted" || c === "rejected") return c;
    if (c === "all") return "accepted";
    if (c === "necessary") return "rejected";
  }
  return null;
}

// Cargar GA4 sólo si hay consentimiento
function loadGA4() {
  if (window.gaLoaded) return;
  window.gaLoaded = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  s.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  };
}

// Lógica del banner (presente en cada página)
document.addEventListener("DOMContentLoaded", () => {
  const banner    = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookies-accept");
  const rejectBtn = document.getElementById("cookies-reject");

  const current = readConsent();
  if (current === "accepted") {
    if (banner) banner.style.display = "none";
    loadGA4();
  } else if (current === "rejected") {
    if (banner) banner.style.display = "none";
  } else {
    if (banner) banner.style.display = "block";
  }

  if (acceptBtn) acceptBtn.addEventListener("click", () => {
    saveConsent("accepted");
    loadGA4();
    if (banner) banner.style.display = "none";
  });

  if (rejectBtn) rejectBtn.addEventListener("click", () => {
    saveConsent("rejected");
    if (banner) banner.style.display = "none";
  });
});

// ===== Página "configurar-cookies.html": pintar estado + botones =====
document.addEventListener('DOMContentLoaded', () => {
  const KEY = LS_KEY, AT = LS_AT, VER = LS_VER; // reutiliza POLICY_VERSION global

  const metaEl = document.getElementById('consent-meta');
  const pillEl = document.querySelector('.status'); // opcional

  const btnNecessary = document.getElementById('btn-necessary');
  const btnAccept    = document.getElementById('btn-accept');
  const btnReset     = document.getElementById('btn-reset');

  function normalize(v){
    v = (v || '').toLowerCase();
    if (v === 'all') return 'accepted';
    if (v === 'necessary') return 'rejected';
    return v;
  }
  function labelFor(v){
    return v === 'accepted' ? 'Aceptadas todas'
         : v === 'rejected' ? 'Solo necesarias'
         : 'Sin decidir';
  }
  function write(val){
    const nowIso = new Date().toISOString();
    try {
      localStorage.setItem(KEY, val);
      localStorage.setItem(AT, nowIso);
      localStorage.setItem(VER, POLICY_VERSION);
    } catch(e){}
    document.cookie = `${KEY}=${val}; path=/; max-age=${60*60*24*365}; SameSite=Lax`;
    document.cookie = `${AT}=${encodeURIComponent(nowIso)}; path=/; max-age=${60*60*24*365}; SameSite=Lax`;
    document.cookie = `${VER}=${POLICY_VERSION}; path=/; max-age=${60*60*24*365}; SameSite=Lax`;
  }
  function refreshUI(){
    const raw = localStorage.getItem(KEY) || '';
    const v = normalize(raw);
    const at = localStorage.getItem(AT);
    const ver = localStorage.getItem(VER);

    if (metaEl) {
      const when = at ? new Date(at).toLocaleString('es-ES', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' }) : '—';
      metaEl.textContent = `Estado: ${labelFor(v)} · Última decisión: ${when} · Versión de política: ${ver || '—'}`;
    }
    if (pillEl) {
      pillEl.classList.remove('ok','warn','idle');
      pillEl.classList.add(v === 'accepted' ? 'ok' : v === 'rejected' ? 'warn' : 'idle');
      pillEl.textContent = labelFor(v);
    }
  }

  if (btnNecessary) btnNecessary.addEventListener('click', () => { write('rejected'); location.reload(); });
  if (btnAccept)    btnAccept.addEventListener('click',    () => { write('accepted'); location.reload(); });
  if (btnReset)     btnReset.addEventListener('click',     () => {
    try { localStorage.removeItem(KEY); localStorage.removeItem(AT); localStorage.removeItem(VER); } catch(e){}
    document.cookie = `${KEY}=; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `${AT}=; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `${VER}=; path=/; max-age=0; SameSite=Lax`;
    location.reload();
  });

  // Pinta si hay elementos en la página de configuración
  if (metaEl || pillEl || btnNecessary || btnAccept || btnReset) refreshUI();
}); // <-- cierre del DOMContentLoaded de configurar-cookies

// ===== GA4: eventos WhatsApp + Formulario =====
(function(){
  function trackEvent(name, params = {}, cb) {
    if (typeof window.gtag === 'function') {
      if (location.hostname === 'localhost' || location.search.includes('debug=1')) {
        params.debug_mode = true;
      }
      if (cb) params.event_callback = cb;
      params.event_timeout = 2000;
      window.gtag('event', name, params);
      if (cb) setTimeout(cb, 2000);
    } else {
      if (cb) cb();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const page = { page_location: location.href, page_title: document.title };

    // 1) Abrir caja de WhatsApp (no conversión)
    const waFab = document.getElementById('waFab');
    if (waFab) {
      waFab.addEventListener('click', () => {
        trackEvent('whatsapp_open', { source: 'fab', ...page });
      });
    }

    // 2) Click “Enviar por WhatsApp” (sí conversión)
    const waSend = document.getElementById('waSend');
    const waMsg  = document.getElementById('waMsg');
    if (waSend) {
      waSend.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
          source: 'send_box',
          message_len: (waMsg?.value || '').length,
          ...page
        });
      });
    }

    // 3) Cualquier enlace wa.me
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => {
      a.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
          source: 'link',
          href: a.getAttribute('href'),
          ...page
        });
      });
    });

    // 4) Envío del formulario -> generate_lead
    const form = document.querySelector('form.contact-form');
    const ts   = document.getElementById('consent_ts');
    if (form) {
      form.addEventListener('submit', (e) => {
        if (ts) ts.value = new Date().toISOString();
        // Solo bloqueamos si GA4 está cargado (consent aceptado)
        if (typeof window.gtag === 'function') {
          e.preventDefault();
          trackEvent('generate_lead', {
            form_id: form.id || 'contact-form',
            form_name: 'contacto',
            method: 'formspree',
            ...page
          }, () => form.submit());
        }
      });
    }
  });
})();
