/**
 * Ayudando a Venezuela - Chatbot de Búsqueda
 * Logic & Animations
 */

// ==========================================================================
// CONFIGURATION
// ==========================================================================
const WHATSAPP_CONFIG = {
  // Reemplazar con el número oficial del chatbot (con código de país, sin '+' ni ceros iniciales)
  // Ejemplo para Venezuela: 584241234567
  phoneNumber: "584241234567",
  
  // Mensajes preestablecidos para cada caso de uso
  messages: {
    general: "Hola, me gustaría iniciar una búsqueda o reporte en el sistema de Ayudando a Venezuela.",
    buscarFamiliar: "Hola, necesito buscar a un familiar desaparecido. ¿Me pueden ayudar con el reconocimiento facial?",
    registrarHallazgo: "Hola, soy rescatista/voluntario y quiero registrar el hallazgo de una persona para que su familia pueda localizarla."
  }
};

// ==========================================================================
// WHATSAPP LINK GENERATOR
// ==========================================================================
function getWhatsAppLink(messageType) {
  const baseText = WHATSAPP_CONFIG.messages[messageType] || WHATSAPP_CONFIG.messages.general;
  const encodedText = encodeURIComponent(baseText);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedText}`;
}

function setupWhatsAppButtons() {
  // Hero CTA
  const heroBtn = document.getElementById("hero-whatsapp-btn");
  if (heroBtn) {
    heroBtn.href = getWhatsAppLink("general");
  }

  // Segment Family CTA
  const familyBtn = document.getElementById("family-whatsapp-btn");
  if (familyBtn) {
    familyBtn.href = getWhatsAppLink("buscarFamiliar");
  }

  // Segment Rescue CTA
  const rescueBtn = document.getElementById("rescue-whatsapp-btn");
  if (rescueBtn) {
    rescueBtn.href = getWhatsAppLink("registrarHallazgo");
  }
  
  // Footer Link
  const footerBtn = document.getElementById("footer-whatsapp-btn");
  if (footerBtn) {
    footerBtn.href = getWhatsAppLink("general");
  }
}

// ==========================================================================
// HEADER SCROLL EFFECT
// ==========================================================================
function setupHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = "var(--shadow-md)";
      header.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    } else {
      header.style.boxShadow = "none";
      header.style.backgroundColor = "var(--bg-glass)";
    }
  });
}

// ==========================================================================
// SCROLL REVEAL ANIMATIONS
// ==========================================================================
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Una vez revelado, dejamos de observarlo para mejor rendimiento
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupWhatsAppButtons();
  setupHeaderScroll();
  setupScrollReveal();
});
