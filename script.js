const messages = [
  "Você merece viver coisas que ainda nem imagina.",
  "Dias difíceis também passam.",
  "Sua história ainda tem muitos capítulos.",
  "Você merece ser ouvido.",
  "Não tenha medo de pedir ajuda.",
  "O seu amanhã pode ser completamente diferente do seu hoje.",
  "Você não precisa resolver tudo de uma vez.",
  "Pequenos passos também são progresso.",
  "Sua presença faz diferença.",
  "O mundo é melhor com você nele.",
  "Descansar também faz parte do caminho.",
  "Existem pessoas dispostas a te escutar.",
  "Você não precisa carregar tudo sozinho.",
  "Um momento difícil não define toda a sua vida.",
  "Continue. Ainda existem muitos motivos para sorrir.",
  "Pedir ajuda também é uma forma de coragem.",
  "Tudo bem não estar bem todos os dias.",
  "Você merece cuidado, inclusive o seu próprio.",
  "Há dias melhores que ainda não chegaram.",
  "Mesmo devagar, continuar ainda é seguir em frente."
];

const messageText = document.getElementById("motivationText");
const messageBtn = document.getElementById("messageBtn");
const messageNumber = document.getElementById("messageNumber");
const motivationCard = document.getElementById("motivationCard");
const progressBar = document.getElementById("progressBar");
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const intro = document.getElementById("intro");

let currentIndex = 0;


// ========================================
// TROCAR MENSAGEM MOTIVACIONAL
// ========================================

messageBtn.addEventListener("click", () => {

  let nextIndex;

  // Evita repetir a mesma mensagem
  do {
    nextIndex = Math.floor(Math.random() * messages.length);
  } while (nextIndex === currentIndex);

  currentIndex = nextIndex;

  // Reinicia a animação
  messageText.classList.remove("message-pop");

  void messageText.offsetWidth;

  // Troca a mensagem
  messageText.textContent = messages[currentIndex];

  messageText.classList.add("message-pop");

  // Atualiza contador
  messageNumber.textContent =
    String(currentIndex + 1).padStart(2, "0");


  // Pequena animação no card
  motivationCard.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.992)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 320,
      easing: "ease-out"
    }
  );

});


// ========================================
// BARRA DE PROGRESSO + NAVBAR
// ========================================

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;

  const docHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    docHeight > 0
      ? (scrollTop / docHeight) * 100
      : 0;

  progressBar.style.width = `${progress}%`;

  // Muda a navbar depois que começar a rolar
  navbar.classList.toggle(
    "scrolled",
    scrollTop > 30
  );

});


// ========================================
// ANIMAÇÕES AO ROLAR A PÁGINA
// ========================================

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.13,
    rootMargin: "0px 0px -40px 0px"
  }

);


// Procura todos os elementos com fade-up
document
  .querySelectorAll(".fade-up")
  .forEach((el) => observer.observe(el));


// ========================================
// MENU MOBILE
// ========================================

menuToggle.addEventListener("click", () => {

  const isOpen =
    navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});


// Fecha o menu quando clicar em uma opção
document
  .querySelectorAll(".nav-links a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


// ========================================
// ARRASTAR PARA CIMA NO CELULAR
// ========================================

let touchStartY = null;


// Detecta onde o dedo começou
intro.addEventListener(
  "touchstart",

  (event) => {

    touchStartY =
      event.touches[0].clientY;

  },

  { passive: true }
);


// Detecta onde o dedo terminou
intro.addEventListener(
  "touchend",

  (event) => {

    if (touchStartY === null) return;

    const touchEndY =
      event.changedTouches[0].clientY;

    const distance =
      touchStartY - touchEndY;


    // Se arrastar para cima
    if (distance > 55) {

      document
        .getElementById("inicio")
        .scrollIntoView({
          behavior: "smooth"
        });

    }

    touchStartY = null;

  },

  { passive: true }
);


// ========================================
// SCROLL DO MOUSE NA TELA INICIAL
// ========================================

let introScrollLocked = false;


intro.addEventListener(
  "wheel",

  (event) => {

    if (
      event.deltaY > 12 &&
      !introScrollLocked
    ) {

      introScrollLocked = true;


      document
        .getElementById("inicio")
        .scrollIntoView({
          behavior: "smooth"
        });


      setTimeout(() => {

        introScrollLocked = false;

      }, 900);

    }

  },

  { passive: true }
);


// ========================================
// EFEITO SUAVE DO GIRASSOL COM O MOUSE
// ========================================

const homeVisual =
  document.querySelector(".home-visual");


window.addEventListener(
  "mousemove",

  (event) => {

    // Desativa o efeito em telas pequenas
    if (
      !homeVisual ||
      window.innerWidth < 900
    ) return;


    const x =
      (
        event.clientX /
        window.innerWidth -
        0.5
      ) * 10;


    const y =
      (
        event.clientY /
        window.innerHeight -
        0.5
      ) * 10;


    homeVisual.style.transform =
      `translate(
        ${x * 0.35}px,
        ${y * 0.35}px
      )`;

  }
);


console.log(
  "Projeto Setembro Amarelo — 3º Ano Técnico."
);