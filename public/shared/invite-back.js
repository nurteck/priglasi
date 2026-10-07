/**
 * Плавающая кнопка «Назад» поверх любого приглашения в public/invites/[slug]/.
 * Подключается одной строкой в конце index.html:
 *   <script src="/shared/invite-back.js" defer></script>
 *
 * Не зависит от data.json/invite-data.js — работает в любом дизайне.
 * Если в истории браузера есть куда возвращаться (обычно так и есть —
 * сюда переходят с каталога/заказа/страницы хозяина), ведёт назад по
 * истории; если открыли приглашение напрямую (например, по ссылке из
 * WhatsApp, когда своей истории на сайте нет) — ведёт в каталог.
 */
(function () {
  "use strict";

  function addBackButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", "Назад");
    btn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>' +
      '<span>Назад</span>';
    btn.style.cssText = [
      "position:fixed", "top:calc(14px + env(safe-area-inset-top,0px))", "left:14px", "z-index:2147483000",
      "display:inline-flex", "align-items:center", "gap:6px",
      "height:40px", "padding:0 14px 0 12px", "border:0", "border-radius:999px", "cursor:pointer",
      "background:rgba(30,8,13,.55)", "color:#F6EFE6", "backdrop-filter:blur(6px)", "-webkit-backdrop-filter:blur(6px)",
      "font:500 14px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif",
      "box-shadow:0 4px 16px rgba(0,0,0,.25)"
    ].join(";");

    btn.addEventListener("click", function () {
      if (window.history.length > 1) window.history.back();
      else window.location.href = "/catalog/";
    });

    document.body.appendChild(btn);
  }

  if (document.body) addBackButton();
  else document.addEventListener("DOMContentLoaded", addBackButton);
})();
