/**
 * Общий скрипт для всех приглашений в public/invites/[slug]/.
 * Подключается одной строкой в конце index.html:
 *   <script src="/shared/invite-data.js" defer></script>
 *
 * Что делает:
 *  1. Загружает ./data.json (рядом с текущим index.html).
 *  2. Подставляет значения в элементы с data-field="путь.к.полю":
 *       - <img>/<audio>/<source> → src
 *       - <a> с data-field-href="путь" → href (текст ссылки не трогает)
 *       - всё остальное → textContent
 *     Пути — через точку: data-field="couple.one", data-field="venue.address" и т.д.
 *  3. Имя и число мест гостя из ссылки (?g=...&n=...) доступны как
 *     data-field="guest.name" / data-field="guest.seats" — так же, через точку.
 *  4. Списки: контейнер с data-list="program" (или "photos") клонирует свой
 *     ПЕРВЫЙ дочерний элемент как шаблон на каждый элемент массива; внутри
 *     шаблона data-field — это поле текущего элемента массива (например
 *     data-field="time" / data-field="title" для program). Если элемент
 *     массива — просто строка (как в photos), сам корень шаблона должен
 *     нести data-field (без пути) — тогда в него подставится сама строка.
 *  5. Таймер: контейнер с data-countdown, внутри — четыре элемента
 *     data-countdown-unit="days|hours|minutes|seconds". Когда время тоя
 *     прошло, на контейнер ставится атрибут data-countdown-state="past" —
 *     стилизуйте/прячьте через CSS, плюс можно показать блок с атрибутом
 *     data-countdown-past (изначально он должен быть скрыт в вашем css).
 *  6. Музыка: <audio data-music> получает src = data.music (если указан;
 *     путь — относительно текущей папки, например "music.mp3").
 *
 * Каждый дизайн верстается как угодно — этот скрипт только подставляет
 * данные в готовую разметку, сам ничего не рисует и не навязывает стиль.
 */
(function () {
  "use strict";

  function getByPath(obj, path) {
    if (!path || path === ".") return obj;
    return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
  }

  function applyValue(el, value) {
    if (value === undefined || value === null) return;
    var tag = el.tagName;
    if (tag === "IMG" || tag === "AUDIO" || tag === "SOURCE") {
      el.setAttribute("src", String(value));
    } else {
      el.textContent = String(value);
    }
  }

  function bindScalarFields(root, data) {
    root.querySelectorAll("[data-field]").forEach(function (el) {
      // Внутри клонированных списков data-field уже обработан отдельно (bindList) —
      // не трогаем повторно элементы, помеченные как часть шаблона списка.
      if (el.closest("[data-list]") && el.closest("[data-list]") !== root) return;
      var value = getByPath(data, el.getAttribute("data-field"));
      applyValue(el, value);
    });
    root.querySelectorAll("[data-field-href]").forEach(function (el) {
      var value = getByPath(data, el.getAttribute("data-field-href"));
      if (value !== undefined && value !== null && value !== "") {
        el.setAttribute("href", String(value));
      }
    });
  }

  function bindList(container, data) {
    var path = container.getAttribute("data-list");
    var items = getByPath(data, path);
    var template = container.firstElementChild;
    if (!template || !Array.isArray(items)) return;
    template.remove();

    items.forEach(function (item) {
      var node = template.cloneNode(true);
      if (typeof item === "object" && item !== null) {
        node.querySelectorAll("[data-field]").forEach(function (el) {
          applyValue(el, getByPath(item, el.getAttribute("data-field")));
        });
        if (node.hasAttribute && node.hasAttribute("data-field")) {
          applyValue(node, getByPath(item, node.getAttribute("data-field")));
        }
      } else if (node.hasAttribute && node.hasAttribute("data-field")) {
        applyValue(node, item);
      } else {
        var inner = node.querySelector("[data-field]");
        if (inner) applyValue(inner, item);
      }
      container.appendChild(node);
    });
  }

  function guestFromQuery() {
    // Пустая строка/отсутствие параметра → undefined, чтобы data-field не
    // затёр текст-заглушку по умолчанию в самой вёрстке (applyValue
    // пропускает undefined/null, но не пустую строку).
    var params = new URLSearchParams(location.search);
    var name = (params.get("g") || "").trim() || undefined;
    var seatsRaw = params.get("n");
    var seats = seatsRaw ? Math.max(1, Math.min(20, parseInt(seatsRaw, 10) || 1)) : undefined;
    return { name: name, seats: seats };
  }

  function startCountdown(data) {
    var el = document.querySelector("[data-countdown]");
    if (!el || !data.date) return;
    var target = new Date(data.date + "T" + (data.time || "00:00") + ":00").getTime();
    var units = {
      days: el.querySelector('[data-countdown-unit="days"]'),
      hours: el.querySelector('[data-countdown-unit="hours"]'),
      minutes: el.querySelector('[data-countdown-unit="minutes"]'),
      seconds: el.querySelector('[data-countdown-unit="seconds"]'),
    };

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        el.setAttribute("data-countdown-state", "past");
        if (units.days) units.days.textContent = "0";
        if (units.hours) units.hours.textContent = "0";
        if (units.minutes) units.minutes.textContent = "0";
        if (units.seconds) units.seconds.textContent = "0";
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      if (units.days) units.days.textContent = String(Math.floor(s / 86400));
      if (units.hours) units.hours.textContent = String(Math.floor((s % 86400) / 3600));
      if (units.minutes) units.minutes.textContent = String(Math.floor((s % 3600) / 60));
      if (units.seconds) units.seconds.textContent = String(s % 60);
    }

    tick();
    var timer = setInterval(tick, 1000);
  }

  function setupMusic(data) {
    var audio = document.querySelector("[data-music]");
    if (audio && data.music) audio.setAttribute("src", data.music);
  }

  fetch("./data.json")
    .then(function (r) {
      if (!r.ok) throw new Error("data.json: HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      data.guest = guestFromQuery();
      bindScalarFields(document, data);
      document.querySelectorAll("[data-list]").forEach(function (el) {
        bindList(el, data);
      });
      startCountdown(data);
      setupMusic(data);
      document.dispatchEvent(new CustomEvent("invite-data-ready", { detail: data }));
    })
    .catch(function (err) {
      console.error("[invite-data] Не удалось загрузить data.json:", err);
    });
})();
