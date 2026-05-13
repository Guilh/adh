/* =================================================================
   ADH Insurance — Enrollment / Contact Form
   -----------------------------------------------------------------
   PRODUCTION SETUP (one-time, ~2 minutes):

   1. Go to https://formspree.io and create a free account using the
      destination email address (e.g. g.hernandez07@gmail.com for
      testing, or whichever inbox should receive submissions).
   2. Click "New Form", give it a name (e.g. "ADH Contact").
   3. Copy the form endpoint shown (looks like
      "https://formspree.io/f/xyzabc12") and paste it below as
      the value of FORM_ENDPOINT.
   4. Verify the email address from the confirmation email Formspree
      sends. Submissions will now arrive in that inbox.
   5. (Optional, recommended) In the Formspree form settings, enable
      reCAPTCHA and Akismet spam protection.

   Why this approach is production-safe:
   - The destination email is never exposed in the HTML/JS.
   - Honeypot + Formspree's built-in spam filtering block bots.
   - Endpoint URL is tied to your Formspree account; even if scraped,
     it can only deliver to your verified address.
   - No backend to maintain or secrets to leak.
   ================================================================= */

const FORM_ENDPOINT = "https://formspree.io/f/xbdwbeoe";

/* ── i18n ─────────────────────────────────────────────────────── */
const TRANSLATIONS = {
  en: {
    pageTitle: "Get in Touch – Angel Hernandez | ADH Insurance Services",
    title: "Hi, this is Angel Hernandez",
    subtitle:
      "Kindly let me know how you prefer to be contacted, and I'll reach out to you personally.",
    requiredField: "Required field",
    yourName: "Your name",
    preferredName: "Preferred name",
    lastName: "Last name",
    contactMethod: "Contact method",
    oneRequired: "At least one is required",
    email: "Email",
    mobilePhone: "Mobile phone",
    homePhone: "Home phone",
    anythingElse: "Anything else? (optional)",
    messagePlaceholder: "Coverage you're interested in, questions, timing...",
    consent:
      "By providing your name and contact information you are consenting to receive calls, text messages, and/or emails from a licensed insurance agent about insurance plans at the number provided, and you agree such calls and/or text messages may use an auto-dialer or robocall, even if you are on a government do-not-call registry. This agreement is not a condition of enrollment. You can revoke your consent at any time.",
    submit: "Submit",
    submitting: "Sending…",
    thanks: "Thanks — your message is on its way.",
    thanksSub: "Angel will reach out personally within one business day.",
    backHome: "Back to Home",
    errNameRequired: "Please enter your preferred name and last name.",
    errContactRequired:
      "Please provide at least one way to contact you (email, mobile, or home phone).",
    errEmailInvalid:
      "That email address doesn't look right. Please check and try again.",
    errPhoneInvalid:
      "That phone number doesn't look right. Please check and try again.",
    errGeneric:
      "Something went wrong sending the form. Please try again, or call (407) 683-9674.",
    errNotConfigured:
      "This form isn't connected yet. Please call (407) 683-9674 or email ahernandez913@gmail.com to reach Angel directly.",
  },
  es: {
    pageTitle: "Contacta – Angel Hernandez | ADH Insurance Services",
    title: "Hola, soy Angel Hernandez",
    subtitle:
      "Por favor, dime cómo prefieres que te contacte y me comunicaré contigo personalmente.",
    requiredField: "Campo requerido",
    yourName: "Tu nombre",
    preferredName: "Nombre preferido",
    lastName: "Apellido",
    contactMethod: "Método de contacto",
    oneRequired: "Se requiere al menos uno",
    email: "Correo electrónico",
    mobilePhone: "Teléfono celular",
    homePhone: "Teléfono de casa",
    anythingElse: "¿Algo más? (opcional)",
    messagePlaceholder: "Cobertura que te interesa, preguntas, fechas...",
    consent:
      "Al proporcionar tu nombre e información de contacto, consientes recibir llamadas, mensajes de texto y/o correos electrónicos de un agente de seguros licenciado sobre planes de seguro al número proporcionado, y aceptas que dichas llamadas y/o mensajes de texto pueden usar un marcador automático o robocall, incluso si estás en un registro gubernamental de no llamar. Este acuerdo no es una condición para inscribirse. Puedes revocar tu consentimiento en cualquier momento.",
    submit: "Enviar",
    submitting: "Enviando…",
    thanks: "Gracias — tu mensaje está en camino.",
    thanksSub: "Angel se comunicará personalmente dentro de un día hábil.",
    backHome: "Volver al Inicio",
    errNameRequired: "Por favor, ingresa tu nombre preferido y apellido.",
    errContactRequired:
      "Por favor, proporciona al menos una forma de contacto (correo, celular o teléfono de casa).",
    errEmailInvalid:
      "Ese correo electrónico no parece correcto. Por favor verifícalo.",
    errPhoneInvalid:
      "Ese número de teléfono no parece correcto. Por favor verifícalo.",
    errGeneric:
      "Algo salió mal al enviar el formulario. Inténtalo de nuevo o llama al (407) 683-9674.",
    errNotConfigured:
      "Este formulario aún no está conectado. Por favor llama al (407) 683-9674 o envía un correo a ahernandez913@gmail.com para contactar a Angel directamente.",
  },
};

let currentLang = "en";

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = TRANSLATIONS[lang][key];
    if (value === undefined) return;
    const attr = el.dataset.i18nAttr;
    if (attr) {
      el.setAttribute(attr, value);
    } else if (el.tagName === "TITLE") {
      document.title = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll(".form-lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute(
      "aria-pressed",
      btn.dataset.lang === lang ? "true" : "false",
    );
  });

  try {
    localStorage.setItem("adhLang", lang);
  } catch (_) {
    /* ignore */
  }
}

document.querySelectorAll(".form-lang-switch button").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

let initialLang = "en";
try {
  const saved = localStorage.getItem("adhLang");
  if (saved && TRANSLATIONS[saved]) initialLang = saved;
  else if (
    navigator.language &&
    navigator.language.toLowerCase().startsWith("es")
  )
    initialLang = "es";
} catch (_) {
  /* ignore */
}
setLanguage(initialLang);

/* ── Nav / hamburger (mirrors script.js) ────────────────────────── */
const hamburger = document.getElementById("navHamburger");
const mobileMenu = document.getElementById("navMobile");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });
  document
    .querySelectorAll(".nav-mobile-link, .nav-mobile .nav-cta")
    .forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });
}

/* ── Form ──────────────────────────────────────────────────────── */
const form = document.getElementById("contactForm");
const errorEl = document.getElementById("formError");
const successEl = document.getElementById("formSuccess");
const submitBtn = document.getElementById("submitBtn");

function t(key) {
  return TRANSLATIONS[currentLang][key];
}

function showError(messageKey) {
  errorEl.textContent = t(messageKey);
  errorEl.hidden = false;
  errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
}

function clearError() {
  errorEl.hidden = true;
  errorEl.textContent = "";
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function isValidPhone(v) {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function formatUSPhone(value) {
  let digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

document.querySelectorAll('input[type="tel"]').forEach((input) => {
  input.addEventListener("input", () => {
    input.value = formatUSPhone(input.value);
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError();

  const data = new FormData(form);

  // Honeypot — silently succeed for bots
  if ((data.get("_gotcha") || "").trim() !== "") {
    form.hidden = true;
    successEl.hidden = false;
    return;
  }

  const firstName = (data.get("firstName") || "").trim();
  const lastName = (data.get("lastName") || "").trim();
  const email = (data.get("email") || "").trim();
  const mobile = (data.get("mobilePhone") || "").trim();
  const home = (data.get("homePhone") || "").trim();

  if (!firstName || !lastName) {
    showError("errNameRequired");
    return;
  }
  if (!email && !mobile && !home) {
    showError("errContactRequired");
    return;
  }
  if (email && !isValidEmail(email)) {
    showError("errEmailInvalid");
    return;
  }
  if (mobile && !isValidPhone(mobile)) {
    showError("errPhoneInvalid");
    return;
  }
  if (home && !isValidPhone(home)) {
    showError("errPhoneInvalid");
    return;
  }

  if (FORM_ENDPOINT.includes("REPLACE_WITH_YOUR_FORM_ID")) {
    showError("errNotConfigured");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  submitBtn.querySelector(".form-submit-label").textContent = t("submitting");

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      form.hidden = true;
      successEl.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      let detail = "";
      try {
        const json = await res.json();
        if (
          json &&
          Array.isArray(json.errors) &&
          json.errors[0] &&
          json.errors[0].message
        ) {
          detail = " (" + json.errors[0].message + ")";
        }
      } catch (_) {
        /* ignore */
      }
      errorEl.textContent = t("errGeneric") + detail;
      errorEl.hidden = false;
      errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } catch (_) {
    showError("errGeneric");
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
    submitBtn.querySelector(".form-submit-label").textContent = t("submit");
  }
});
