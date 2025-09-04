// menu.js

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".hamburger");
  const navMobile = document.getElementById("navMobile");

  if (!toggle || !navMobile) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";

    // alternar estado
    toggle.setAttribute("aria-expanded", String(!expanded));

    if (expanded) {
      navMobile.setAttribute("hidden", "true");
      // no bloqueamos el scroll en versión dropdown
    } else {
      navMobile.removeAttribute("hidden");
      // no bloqueamos el scroll en versión dropdown
    }
  });

  // cerrar el menú si haces clic en un enlace
  navMobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMobile.setAttribute("hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});
