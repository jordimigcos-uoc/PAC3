document.addEventListener("DOMContentLoaded", () => {
  let valor = 0;
  const final = 117391;
  const velocitat = 2;
  const increment = 250;
  const contador = document.getElementById("contador");
  const flourishContainer = document.querySelector(".flourish-container");
  let intervalGrande = null;

  function iniciarContadorGrande() {
    if (!intervalGrande && contador) {
      contador.classList.add('visible');
      intervalGrande = setInterval(() => {
        valor += increment;
        if (valor >= final) {
          valor = final;
          clearInterval(intervalGrande);
          intervalGrande = null;
        }
        contador.textContent = valor.toLocaleString('ca-ES');
      }, velocitat);
    }
  }

  // --- Comptador percentatge (animació suau 0 -> target) ---
  const percentEl = document.getElementById("contadorPercent");
  const percentTarget = 37;      // valor final en %
  const percentDuration = 1500;  // durada en ms

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animatePercent(el, target, duration) {
    if (!el) return;
    const startTime = performance.now();
    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      const current = Math.round(target * eased);
      el.textContent = `${current}%`;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = `${target}%`;
      }
    }
    requestAnimationFrame(frame);
  }

  function iniciarContadorPercent() {
    if (percentEl) {
      percentEl.classList.add('visible');
      // si ja mostra percentatge final, no llançar
      const text = percentEl.textContent.trim();
      if (!text || text === '0%' || text === '0') {
        animatePercent(percentEl, percentTarget, percentDuration);
      }
    }
  }

  function mostrarFlourish() {
    flourishContainer.classList.add('visible');
  }

  if (contador) {
    const observerContador = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        iniciarContadorGrande();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    observerContador.observe(contador);
  }

  if (percentEl) {
    const observerPercent = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        iniciarContadorPercent();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    observerPercent.observe(percentEl);
  }

  if (flourishContainer) {
    const observerFlourish = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        mostrarFlourish();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    observerFlourish.observe(flourishContainer);
  }

});
