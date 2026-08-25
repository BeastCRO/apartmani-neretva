(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Lightweight gallery lightbox (no dependency) */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  document.querySelectorAll(".gallery-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var fullSrc = item.getAttribute("data-full");
      var img = item.querySelector("img");
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = fullSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
    });
  });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.closest(".lightbox-close")) {
        lightbox.classList.remove("is-open");
        lightboxImg.src = "";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        lightbox.classList.remove("is-open");
        lightboxImg.src = "";
      }
    });
  }

  /* Booking form: validation + mailto hand-off */
  var form = document.getElementById("booking-form");
  if (!form) return;

  var statusBox = document.getElementById("form-status");

  function setInvalid(field, message) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    wrap.classList.add("invalid");
    var err = wrap.querySelector(".error");
    if (err && message) err.textContent = message;
  }
  function clearInvalid(field) {
    var wrap = field.closest(".field");
    if (wrap) wrap.classList.remove("invalid");
  }

  function validate() {
    var valid = true;
    var fields = form.querySelectorAll("[required]");
    fields.forEach(function (field) {
      clearInvalid(field);
      if (!field.value.trim()) {
        setInvalid(field);
        valid = false;
      }
    });

    var checkin = form.querySelector("#checkin");
    var checkout = form.querySelector("#checkout");
    if (checkin.value && checkout.value && checkout.value <= checkin.value) {
      setInvalid(checkout, "Datum odlaska mora biti nakon datuma dolaska.");
      valid = false;
    }

    var email = form.querySelector("#email");
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailPattern.test(email.value)) {
      setInvalid(email, "Unesite ispravnu email adresu.");
      valid = false;
    }

    return valid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statusBox.className = "form-status";

    if (!validate()) {
      statusBox.textContent = "Molimo provjerite označena polja.";
      statusBox.classList.add("show", "error");
      return;
    }

    var data = {
      ime: form.querySelector("#name").value.trim(),
      email: form.querySelector("#email").value.trim(),
      telefon: form.querySelector("#phone").value.trim(),
      dolazak: form.querySelector("#checkin").value,
      odlazak: form.querySelector("#checkout").value,
      gosti: form.querySelector("#guests").value,
      poruka: form.querySelector("#message").value.trim()
    };

    // Demo hand-off via mailto. Swap for a real backend/booking endpoint in production.
    var subject = "Upit za rezervaciju - " + data.dolazak + " do " + data.odlazak;
    var body =
      "Ime i prezime: " + data.ime + "\n" +
      "Email: " + data.email + "\n" +
      "Telefon: " + data.telefon + "\n" +
      "Dolazak: " + data.dolazak + "\n" +
      "Odlazak: " + data.odlazak + "\n" +
      "Broj gostiju: " + data.gosti + "\n" +
      "Poruka: " + (data.poruka || "-");

    var mailto =
      "mailto:info@apartmani-neretva-demo.hr" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailto;

    statusBox.textContent = "Hvala! Vaš upit je pripremljen za slanje putem emaila - javit ćemo se uskoro.";
    statusBox.classList.add("show", "success");
    form.reset();
  });
})();
