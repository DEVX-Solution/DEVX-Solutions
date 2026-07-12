import React, { useEffect, useState } from "react";
import {
  ArrowRight, Rocket, ShieldCheck, TrendingUp, Check, Phone, Mail, MapPin,
  Instagram, Linkedin, Github, ExternalLink, MessageCircle, Zap, BadgeCheck,
  Clock, Users, Code2, ChevronDown, LayoutTemplate, Building2, ShoppingCart,
  Menu, X
} from "lucide-react";

const techs = [
  ["HTML5", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"],
  ["CSS3", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"],
  ["JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"],
  ["TypeScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"],
  ["React", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"],
  ["Next.js", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"],
  ["Node.js", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"],
  ["PHP", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"],
  ["MySQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"],
  ["WordPress", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg"],
  ["Git", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"],
  ["AWS", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"],
];

const projects = [
  { title: "RocketFit", type: "Landing Page", img: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?q=80&w=900&auto=format&fit=crop", tags: ["React", "Next.js"], link: "https://rocketfit.vercel.app" },
  { title: "Studio N.", type: "Site Institucional", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=900&auto=format&fit=crop", tags: ["WordPress", "PHP"], link: "https://studio-n.vercel.app" },
  { title: "Elevate", type: "Web Design", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=900&auto=format&fit=crop", tags: ["React", "Tailwind"], link: "https://elevate-phi-henna.vercel.app" },
  { title: "Vision", type: "Landing Page", img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=900&auto=format&fit=crop", tags: ["Next.js", "TypeScript"], link: "https://vision-one-chi.vercel.app" },
  { title: "Pizza House", type: "Site Delivery", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=900&auto=format&fit=crop", tags: ["React", "Node.js"], link: "https://pizza-house-one.vercel.app" },
];

const heroSlides = [
  {
    brand: "KAIROS",
    nav: ["Início", "Serviços", "Sobre", "Contato"],
    activeNav: "Início",
    title: ["Estratégia.", "Design."],
    highlight: "Resultado.",
    description: "Soluções digitais que impulsionam negócios para o próximo nível.",
    button: "SAIBA MAIS",
    highlightClass: "text-blue-400",
    buttonClass: "bg-blue-600",
    visual: "sphere",
  },
  {
    brand: "NEXA",
    nav: ["Home", "Projetos", "Planos", "Contato"],
    activeNav: "Projetos",
    title: ["Landing.", "Oferta."],
    highlight: "Conversão.",
    description: "Páginas rápidas, objetivas e preparadas para transformar visitas em contatos.",
    button: "VER PROJETO",
    highlightClass: "text-purple-400",
    buttonClass: "bg-purple-600",
    visual: "dashboard",
  },
  {
    brand: "LUMINA",
    nav: ["Início", "Portfólio", "Sobre", "Contato"],
    activeNav: "Portfólio",
    title: ["Marca.", "Presença."],
    highlight: "Crescimento.",
    description: "Sites institucionais com visual premium, navegação simples e confiança imediata.",
    button: "EXPLORAR",
    highlightClass: "text-cyan-300",
    buttonClass: "bg-cyan-600",
    visual: "cards",
  },
  {
    brand: "ATLAS",
    nav: ["Loja", "Produtos", "Pedidos", "Contato"],
    activeNav: "Loja",
    title: ["Produto.", "Pedido."],
    highlight: "Escala.",
    description: "Experiências de venda online com vitrine clara, checkout direto e gestão fácil.",
    button: "COMEÇAR",
    highlightClass: "text-fuchsia-400",
    buttonClass: "bg-fuchsia-600",
    visual: "store",
  },
];

const budgets = [
  {
    name: "LANDING PAGE",
    label: "Página única",
    icon: LayoutTemplate,
    description: "Ideal para campanhas, lançamentos e páginas focadas em conversão.",
    features: ["Design exclusivo", "Página responsiva", "Seções estratégicas", "Botão para WhatsApp", "Entrega otimizada"],
  },
  {
    name: "SITE INSTITUCIONAL",
    label: "Mais solicitado",
    icon: Building2,
    popular: true,
    description: "Perfeito para empresas que precisam apresentar serviços, autoridade e contato.",
    features: ["Múltiplas páginas", "Visual profissional", "SEO básico", "Formulários de contato", "Integrações necessárias"],
  },
  {
    name: "E-COMMERCE",
    label: "Loja virtual",
    icon: ShoppingCart,
    description: "Para negócios que querem vender produtos online com vitrine organizada.",
    features: ["Catálogo de produtos", "Carrinho de compras", "Checkout direto", "Painel de gestão", "Estrutura escalável"],
  },
];

const whatsappNumber = "5511911908314";

const getWhatsappLink = (budgetName, detail = "") => {
  const message = `Olá! Tenho interesse em solicitar um orçamento para ${budgetName} ${detail ? `(${detail})` : ""} com a DEVX Solutions. Pode me passar mais detalhes?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const companyEmail = "contato.devxsolutions@gmail.com";
const instagramUrl = "https://www.instagram.com/devxsolutions";
const linkedinUrl = "https://www.linkedin.com/in/devx-solutions-14430a421/";
const githubUrl = "https://github.com/devxsolutions";

const navLinks = [
  ["inicio", "Início"],
  ["servicos", "Serviços"],
  ["portfolio", "Portfólio"],
  ["planos", "Orçamento"],
  ["tecnologias", "Tecnologias"],
  ["depoimentos", "Depoimentos"],
  ["contato", "Contato"],
];

const openExternalLink = (url) => {
  const isInstagramWebView =
    navigator.userAgent.includes("Instagram") ||
    navigator.userAgent.includes("FB_IAB") ||
    navigator.userAgent.includes("FBAN");

  if (isInstagramWebView) {
    // Android: força abertura no Chrome/navegador padrão
    const intentUrl = `intent://${url.replace(/^https?:\/\//, "")}#Intent;scheme=https;package=com.android.chrome;end`;
    window.location.href = intentUrl;

    // Fallback: se não abrir em 1.5s, tenta direto
    setTimeout(() => {
      window.location.href = url;
    }, 1500);
  } else {
    window.location.href = url;
  }
};

const handleContactSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  const project = formData.get("project")?.trim();

  const subject = `Novo orçamento pelo site - ${name || "Cliente"}`;
  const body = `Olá, DEVX Solutions!%0D%0A%0D%0ANome: ${name || ""}%0D%0AE-mail: ${email || ""}%0D%0A%0D%0AProjeto:%0D%0A${project || ""}`;

  window.location.href = `mailto:${companyEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
};



function Logo() {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <div className="relative h-8 w-8 sm:h-9 sm:w-9">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 blur-sm sm:rounded-xl" />
        <div className="relative grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-black sm:h-9 sm:w-9 sm:rounded-xl">
          <Code2 size={20} className="text-blue-400 sm:h-[22px] sm:w-[22px]" />
        </div>
      </div>
      <div className="leading-none">
        <div className="text-xl font-black tracking-tight sm:text-2xl">DEV<span className="text-gradient">X</span></div>
        <div className="text-[8px] tracking-[.3em] text-white/55 sm:text-[10px] sm:tracking-[.35em]">SOLUTIONS</div>
      </div>
    </div>
  );
}

function HeroVisual({ type }) {
  if (type === "dashboard") {
    return (
      <div className="relative aspect-square">
        <div className="absolute inset-6 rounded-full bg-purple-600 blur-3xl" />
        <div className="absolute inset-4 rotate-3 rounded-2xl border border-purple-300/25 bg-purple-500/10" />
        <div className="relative grid h-full w-full place-items-center rounded-2xl border border-white/10 bg-[#0d1020] p-5 shadow-blueglow">
          <div className="w-full space-y-4">
            <div className="flex h-24 items-end gap-2 rounded-xl bg-black/25 p-4">
              <span className="h-10 flex-1 rounded-t-md bg-blue-500/80" />
              <span className="h-16 flex-1 rounded-t-md bg-purple-500/90" />
              <span className="h-12 flex-1 rounded-t-md bg-cyan-400/80" />
              <span className="h-20 flex-1 rounded-t-md bg-fuchsia-500/80" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <span className="h-12 rounded-xl border border-white/10 bg-white/[.06]" />
              <span className="h-12 rounded-xl border border-white/10 bg-blue-500/20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className="relative aspect-square">
        <div className="absolute inset-8 rounded-full bg-cyan-500 blur-3xl" />
        <div className="absolute left-8 top-6 h-36 w-32 -rotate-6 rounded-2xl border border-cyan-200/20 bg-cyan-400/10" />
        <div className="absolute right-8 top-14 h-36 w-32 rotate-6 rounded-2xl border border-purple-200/20 bg-purple-500/10" />
        <div className="relative mx-auto mt-8 w-36 scale-[0.82] rounded-2xl border border-white/10 bg-[#0b1221] p-3 shadow-blueglow">
          <div className="mb-4 h-24 rounded-xl bg-[linear-gradient(135deg,#22d3ee,#2563eb_55%,#7c3aed)]" />
          <div className="space-y-2">
            <span className="block h-2 w-28 rounded-full bg-white/70" />
            <span className="block h-2 w-20 rounded-full bg-white/25" />
            <span className="block h-8 rounded-lg bg-cyan-500/20" />
          </div>
        </div>
      </div>
    );
  }

if (type === "store") {
  return (
    <div className="relative aspect-square scale-[0.88]">
      <div className="absolute inset-8 rounded-full bg-fuchsia-600 blur-3xl" />

      <div className="relative mx-auto h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#100c1c] p-3 shadow-blueglow">

        <div className="mb-3 flex items-center justify-between">
          <span className="h-2.5 w-16 rounded-full bg-white/60" />
          <span className="h-7 w-7 rounded-full bg-fuchsia-500/70" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            "bg-blue-500/80",
            "bg-purple-500/80",
            "bg-fuchsia-500/80",
            "bg-cyan-400/80",
          ].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-white/10 bg-black/25 p-2"
            >
              <div className={`mb-2 h-11 rounded-md ${item}`} />

              <span className="mb-1.5 block h-1.5 rounded-full bg-white/50" />
              <span className="block h-1.5 w-7 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="relative aspect-square">
      <div className="absolute inset-6 rounded-full bg-blue-600 blur-3xl" />
      <div className="absolute inset-8 rounded-full bg-purple-600 blur-2xl" />
      <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_30%_30%,#8b5cf6,#2563eb_45%,#080b14_68%)] shadow-blueglow" />
      <div className="absolute inset-8 rotate-45 rounded-full border-[18px] border-purple-500/70 blur-[1px]" />
    </div>
  );
}

const carouselAnimationStyles = `
  @keyframes devxSlideReveal {
    0% {
      opacity: 0;
      transform: translateX(var(--slide-offset, 26px)) scale(.985);
      filter: blur(10px);
    }
    58% {
      opacity: 1;
      filter: blur(0);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes devxSoftFloat {
    0%, 100% {
      transform: translate3d(0, 0, 0) rotate(-1deg);
    }
    50% {
      transform: translate3d(0, -8px, 0) rotate(-.6deg);
    }
  }

  @keyframes devxGlowSweep {
    0% {
      transform: translateX(-130%) rotate(18deg);
      opacity: 0;
    }
    25% {
      opacity: .45;
    }
    100% {
      transform: translateX(130%) rotate(18deg);
      opacity: 0;
    }
  }

  @keyframes devxContentRise {
    0% {
      opacity: 0;
      transform: translateY(16px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes devxVisualPop {
    0% {
      opacity: 0;
      transform: translateY(18px) scale(.94) rotate(2deg);
      filter: blur(8px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(0);
      filter: blur(0);
    }
  }

  .devx-carousel-card {
    animation: devxSoftFloat 6.5s ease-in-out infinite;
    will-change: transform;
  }

  .devx-carousel-card::before {
    content: "";
    position: absolute;
    inset: -35% auto -35% -45%;
    width: 42%;
    pointer-events: none;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
    animation: devxGlowSweep 4.3s ease-in-out infinite;
  }

  .devx-slide-animate {
    --slide-offset: 28px;
    animation: devxSlideReveal .78s cubic-bezier(.2,.72,.18,1) both;
    will-change: transform, opacity, filter;
  }

  .devx-slide-animate[data-direction="prev"] {
    --slide-offset: -28px;
  }

  .devx-slide-copy > * {
    animation: devxContentRise .72s cubic-bezier(.2,.72,.18,1) both;
  }

  .devx-slide-copy > *:nth-child(1) { animation-delay: .06s; }
  .devx-slide-copy > *:nth-child(2) { animation-delay: .14s; }
  .devx-slide-copy > *:nth-child(3) { animation-delay: .22s; }

  .devx-slide-visual {
    animation: devxVisualPop .82s cubic-bezier(.2,.72,.18,1) both;
    animation-delay: .12s;
    will-change: transform, opacity, filter;
  }

  @media (prefers-reduced-motion: reduce) {
    .devx-carousel-card,
    .devx-carousel-card::before,
    .devx-slide-animate,
    .devx-slide-copy > *,
    .devx-slide-visual {
      animation: none !important;
    }
  }
`;

function HeroMockup() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [timerResetKey, setTimerResetKey] = useState(0);
  const slide = heroSlides[activeSlide];

  const changeSlide = (nextIndex) => {
    if (nextIndex === activeSlide) {
      setTimerResetKey((current) => current + 1);
      return;
    }

    setSlideDirection(nextIndex > activeSlide ? "next" : "prev");
    setActiveSlide(nextIndex);
    setTimerResetKey((current) => current + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDirection("next");
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeSlide, timerResetKey]);

  return (
    <div className="relative mx-auto flex min-h-[280px] w-full max-w-[620px] items-center justify-center pb-8 sm:min-h-[430px] sm:pb-0">
      <style>{carouselAnimationStyles}</style>
      <div className="absolute right-0 top-4 h-[320px] w-[320px] rounded-full bg-purple-700/25 blur-[90px] sm:top-0 sm:h-[470px] sm:w-[520px] sm:blur-[100px]" />
      <div className="absolute -left-2 top-32 hidden h-64 w-80 rotate-[-3deg] rounded-2xl border border-white/10 bg-white/[.025] opacity-70 sm:block" />
      <div className="absolute right-0 top-28 hidden h-64 w-80 rotate-[2deg] rounded-2xl border border-white/10 bg-white/[.025] opacity-60 sm:block" />

      <div className="devx-carousel-card relative z-10 w-full max-w-[240px] overflow-hidden rounded-2xl border border-blue-300/30 bg-[#090d17] p-3.5 shadow-glow sm:max-w-[560px] sm:p-7">
        <div key={slide.brand} data-direction={slideDirection} className="devx-slide-animate relative z-10">
          <div className="mb-5 flex items-center justify-between sm:mb-12">
            <b className="text-sm tracking-wide sm:text-base">{slide.brand}</b>
            <div className="hidden gap-5 text-[10px] text-white/70 sm:flex">
              {slide.nav.map((item) => (
                <span key={item} className={item === slide.activeNav ? "text-blue-400" : ""}>{item}</span>
              ))}
              <span>×</span>
            </div>
          </div>
          <div className="grid items-center gap-5 sm:grid-cols-2 sm:gap-8">
            <div className="devx-slide-copy">
              <h3 className="text-lg font-black leading-tight sm:text-3xl">
                {slide.title.map((line) => (
                  <React.Fragment key={line}>{line}<br /></React.Fragment>
                ))}
                <span className={slide.highlightClass}>{slide.highlight}</span>
              </h3>
              <p className="mt-4 text-xs leading-relaxed text-white/55">{slide.description}</p>
              <button className={`mt-5 rounded-md px-5 py-3 text-xs font-bold transition hover:-translate-y-0.5 sm:mt-6 ${slide.buttonClass}`}>
                {slide.button}
              </button>
            </div>
            <div className="devx-slide-visual mx-auto flex w-full items-start justify-center self-start pt-2">
              <div className="w-[105px] sm:w-[185px]">
                <HeroVisual type={slide.visual} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-20 flex gap-3 sm:bottom-3 sm:gap-4">
        {heroSlides.map((item, index) => (
          <button
            key={item.brand}
            type="button"
            aria-label={`Mostrar slide ${item.brand}`}
            onClick={() => changeSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 hover:scale-110 ${
              activeSlide === index ? "w-9 bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,.65)] sm:w-10" : "w-5 bg-white/15 hover:bg-white/30 sm:w-6"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function CometDivider({ reverse = false, delay = "0s" }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-14 w-full overflow-hidden lg:hidden"
    >
      <span
        style={{ animationDelay: delay }}
        className={`hero-comet absolute top-1/2 h-[2px] w-24 -translate-y-1/2 rounded-full
          bg-gradient-to-r from-transparent via-blue-400 to-purple-500
          shadow-[0_0_12px_rgba(99,102,241,.9)]
          ${reverse ? "hero-comet-reverse" : ""}
        `}
      >
        <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,1)]" />
      </span>

      <span
        style={{ animationDelay: `calc(${delay} + 1.4s)` }}
        className={`hero-comet hero-comet-small absolute top-[70%] h-px w-14 rounded-full
          bg-gradient-to-r from-transparent via-cyan-300 to-blue-500
          shadow-[0_0_10px_rgba(59,130,246,.8)]
          ${reverse ? "hero-comet-reverse" : ""}
        `}
      />
    </div>
  );
}

const heroCometStyles = `
  @keyframes heroCometMove {
    0% {
      left: -35%;
      opacity: 0;
      transform: translateY(-50%) scaleX(.6);
    }

    15% {
      opacity: 1;
    }

    80% {
      opacity: 1;
    }

    100% {
      left: 115%;
      opacity: 0;
      transform: translateY(-50%) scaleX(1.15);
    }
  }

  @keyframes heroCometMoveReverse {
    0% {
      right: -35%;
      left: auto;
      opacity: 0;
      transform: translateY(-50%) scaleX(.6) rotate(180deg);
    }

    15% {
      opacity: 1;
    }

    80% {
      opacity: 1;
    }

    100% {
      right: 115%;
      left: auto;
      opacity: 0;
      transform: translateY(-50%) scaleX(1.15) rotate(180deg);
    }
  }

  .hero-comet {
    animation: heroCometMove 4.8s ease-in-out infinite;
  }

  .hero-comet-reverse {
    animation-name: heroCometMoveReverse;
  }

  .hero-comet-small {
    animation-duration: 6.2s;
    opacity: .7;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-comet {
      animation: none;
      display: none;
    }
  }
`;

function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ["inicio", "servicos", "portfolio", "planos", "tecnologias", "depoimentos", "contato"];

   const handleScroll = () => {
    const scrollPosition = window.scrollY + 160;
    let current = "inicio";

    sections.forEach((id) => {
      const section = document.getElementById(id);

      if (section && scrollPosition >= section.offsetTop) {
        current = id;
      }
    });

    setActiveSection(current);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1280) {
      setMobileMenuOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const navClass = (id) =>
  `pb-7 transition ${
    activeSection === id
      ? "border-b-2 border-blue-500 text-blue-400"
      : "border-b-2 border-transparent text-white/85 hover:text-blue-400"
  }`;
const closeMobileMenu = () => setMobileMenuOpen(false);
  return (
    <main className="min-h-screen overflow-hidden bg-[#030407] text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <Logo />
          <div className="hidden items-center gap-7 text-sm font-semibold xl:flex xl:gap-10">
            <a className={navClass("inicio")} href="#inicio">Início</a>

            <div
              className={`relative pb-7 border-b-2 transition ${
                activeSection === "servicos"
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`flex items-center gap-1 transition ${
                  activeSection === "servicos"
                    ? "text-blue-400"
                    : "text-white/85 hover:text-blue-400"
                }`}
              >
                Serviços <ChevronDown size={14} />
              </button>

              {servicesOpen && (
                <div className="absolute left-0 top-10 z-50 w-72 rounded-xl border border-white/10 bg-[#080b13] p-3 shadow-glow">
                  <a href="#servicos" className="block rounded-lg px-4 py-3 text-white/70 hover:bg-blue-500/10 hover:text-blue-400">
                    Criação de Sites
                  </a>
                  <a href="#servicos" className="block rounded-lg px-4 py-3 text-white/70 hover:bg-blue-500/10 hover:text-blue-400">
                    Landing Pages
                  </a>
                  <a href="#servicos" className="block rounded-lg px-4 py-3 text-white/70 hover:bg-blue-500/10 hover:text-blue-400">
                    Lojas Virtuais
                  </a>
                  <a href="#servicos" className="block rounded-lg px-4 py-3 text-white/70 hover:bg-blue-500/10 hover:text-blue-400">
                    Manutenção de Sites
                  </a>
                  <a href="#planos" className="block rounded-lg px-4 py-3 text-blue-400 hover:bg-blue-500/10">
                    Solicitar orçamento
                  </a>
                </div>
              )}
            </div>

            <a className={navClass("portfolio")} href="#portfolio">Portfólio</a>
            <a className={navClass("planos")} href="#planos">Orçamento</a>
            <a className={navClass("tecnologias")} href="#tecnologias">Tecnologias</a>
            <a className={navClass("depoimentos")} href="#depoimentos">Depoimentos</a>
            <a className={navClass("contato")} href="#contato">Contato</a>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a href="#contato" className="hidden rounded-lg border border-blue-500/70 px-5 py-3 text-xs font-bold hover:bg-blue-500/10 sm:inline-flex sm:items-center lg:px-7 lg:text-sm">ORÇAMENTO <ArrowRight className="ml-2 inline" size={16}/></a>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[.04] text-white/85 transition hover:border-blue-400/60 hover:text-blue-400 xl:hidden"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#05070d]/95 px-4 pb-5 pt-3 shadow-glow xl:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navLinks.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={closeMobileMenu}
                  className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
                    activeSection === id
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-white/75 hover:bg-white/[.04] hover:text-blue-400"
                  }`}
                >
                  {label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={closeMobileMenu}
                className="btn-gradient mt-2 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-black shadow-glow"
              >
                SOLICITAR ORÇAMENTO <ArrowRight className="ml-2" size={16} />
              </a>
            </div>
          </div>
        )}
      </header>

      <section
  id="inicio"
  className="relative border-b border-white/10 pt-20 sm:pt-28"
><style>{heroCometStyles}</style>
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute right-0 top-20 h-[420px] w-[420px] bg-gradient-to-l from-purple-800/35 to-transparent blur-3xl sm:h-[520px] sm:w-[720px]" />
        <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl gap-14 px-5 py-10 sm:min-h-0 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:px-8 lg:py-20">
          <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-between text-center sm:min-h-0 sm:justify-center lg:mx-0 lg:items-start lg:text-left">

  {/* Parte superior */}
  <div className="flex flex-col items-center lg:items-start">
    <span className="inline-flex rounded-full border border-blue-500/40 bg-blue-600/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-blue-400 sm:text-xs">
      Criação & Gestão de Sites
    </span>

    <h1 className="mx-auto mt-7 max-w-[21rem] text-[2.4rem] font-black leading-[1.08] sm:mt-8 sm:max-w-xl sm:text-5xl md:text-6xl lg:mx-0 xl:text-7xl">
      Transformamos ideias em sites que{" "}
      <span className="text-gradient">impulsionam resultados.</span>
    </h1>
  </div>

<CometDivider reverse delay=".8s" />

  {/* Parte central */}
  <div className="mt-1">
    <p className="mx-auto max-w-[21rem] text-[20px] leading-relaxed text-white/60 sm:max-w-xl sm:text-lg lg:mx-0">  
      Criamos, desenvolvemos e gerenciamos sites modernos, rápidos e
      otimizados para o seu negócio crescer na internet.
    </p>
  </div>

  <CometDivider delay="0s" />

  {/* Parte inferior */}
  <div className="mt-8 flex w-full flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:justify-center lg:justify-start">

  <a
    href="#contato"
    className="btn-gradient inline-flex h-[56px] w-full max-w-[240px] items-center justify-center rounded-xl px-8 text-[15px] font-extrabold shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-blueglow"
  >
    QUERO UM SITE
    <ArrowRight className="ml-2 h-5 w-5" />
  </a>

  <a
    href="#portfolio"
    className="inline-flex h-[56px] w-full max-w-[240px] items-center justify-center rounded-xl border border-purple-500/60 bg-transparent px-8 text-[15px] font-extrabold transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:bg-purple-500/10"
  >
    VER PORTFÓLIO
  </a>

</div>

  <div
    id="servicos"
    className="hidden md:mt-16 md:grid md:grid-cols-3 md:gap-8 md:text-left"
  >
    {[
      [
        Rocket,
        "Rápido e Otimizado",
        "Sites leves e otimizados para alta performance.",
      ],
      [
        ShieldCheck,
        "Seguro e Confiável",
        "Proteção avançada e backups automáticos.",
      ],
      [
        TrendingUp,
        "Focado em Resultados",
        "Estratégias que geram mais clientes e conversões.",
      ],
    ].map(([Icon, t, d]) => (
      <div key={t} className="flex gap-4">
        <Icon className="shrink-0 text-purple-500" size={32} />
        <div className="min-w-0">
          <b>{t}</b>
          <p className="mt-1 text-sm text-white/55">{d}</p>
        </div>
      </div>
    ))}
  </div>
</div>
          <div className="hidden lg:flex"><HeroMockup />
  
</div>
        </div>
      </section>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
    <div className="border-t border-white/10"></div>
</div>
      <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-14">
        <div className="card rounded-2xl p-6 sm:p-8 lg:p-12">
          <div className="mb-8 flex flex-col justify-between gap-5 md:mb-10 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-400">Nosso portfólio</p>
              <h2 className="text-3xl font-black sm:text-4xl">Projetos que fazem a diferença.</h2>
              <p className="mt-3 text-white/55">Soluções únicas para negócios de todos os tamanhos.</p>
            </div>
            <button className="w-full rounded-lg border border-purple-500/60 px-7 py-3 text-sm font-bold sm:w-fit">VER TODOS OS PROJETOS</button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {projects.map((p)=>(
              <button
                key={p.title}
                onClick={() => openExternalLink(p.link)}
                className="group block overflow-hidden rounded-xl border border-white/10 bg-black/35 p-2 transition hover:-translate-y-2 hover:border-blue-500/60 cursor-pointer text-left w-full sm:p-3"
              >
                <img src={p.img} className="h-24 w-full rounded-lg object-cover opacity-80 sm:h-36" />
                <div className="p-2 sm:p-3">
                  <div className="flex items-center justify-between gap-2"><h3 className="text-sm font-bold sm:text-base">{p.title}</h3><ExternalLink size={15} className="shrink-0"/></div>
                  <p className="mt-1 text-xs text-white/55 sm:text-sm">{p.type}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">{p.tags.map(t=><span key={t} className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/60 sm:px-2 sm:py-1 sm:text-xs">{t}</span>)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 grid gap-5 sm:mb-12 lg:grid-cols-[1fr_.7fr] lg:gap-8">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-400">Orçamentos</p>
            <h2 className="text-3xl font-black sm:text-4xl">Escolha a solução ideal para o seu projeto.</h2>
          </div>
          <p className="self-end text-white/55">Cada projeto tem uma necessidade diferente. Criamos orçamentos personalizados para entregar o melhor custo-benefício para o seu negócio.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_.95fr] xl:gap-18">
          {budgets.map((budget) => {
            const Icon = budget.icon;

            return (
              <div
                key={budget.name}
                className={`card relative flex min-h-[300px] flex-col rounded-2xl p-4 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-blueglow sm:min-h-[360px] sm:p-8 xl:min-h-[390px] ${
                  budget.popular ? "border-blue-500 shadow-blueglow" : "border-white/10"
                }`}
              >
                {budget.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 text-center text-[10px] font-black sm:-top-4 sm:px-5 sm:text-xs">
                    MAIS SOLICITADO
                  </span>
                )}

                <div className="mb-4 flex items-center justify-between sm:mb-6">
                  <p className="text-xs font-black text-blue-400 sm:text-sm">{budget.name}</p>
                  <div className="grid h-8 w-8 place-items-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-blue-400 sm:h-10 sm:w-10">
                    <Icon size={18} className="sm:h-[22px] sm:w-[22px]" />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/40 sm:text-sm">{budget.label}</span>
                  <h3 className="mt-2 text-lg font-black leading-tight sm:mt-3 sm:text-3xl">Orçamento personalizado</h3>
                  <p className="mt-3 text-xs leading-relaxed text-white/55 sm:mt-4 sm:text-sm">{budget.description}</p>
                </div>

                <ul className="mt-5 space-y-2 sm:mt-7 sm:space-y-3">
                  {budget.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-xs text-white/70 sm:gap-3 sm:text-sm">
                      <Check size={15} className="mt-0.5 shrink-0 text-blue-400 sm:h-[18px] sm:w-[18px]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openExternalLink(getWhatsappLink(budget.name, budget.label))}
                  className={`mt-8 block w-full rounded-lg py-3 text-center text-xs font-black transition-all duration-300 hover:-translate-y-1 hover:shadow-blueglow sm:mt-10 sm:py-4 sm:text-sm ${
                  budget.popular
                    ? "btn-gradient"
                    : "border border-blue-500/60 hover:bg-blue-500/10"
                  }`}
                >
                  SOLICITAR ORÇAMENTO
                </button>
              </div>
            );
          })}

          <div className="card rounded-2xl p-4 sm:p-8 xl:self-center">
            {[
              [Zap, "Projeto sob medida"],
              [Clock, "Prazo combinado"],
              [BadgeCheck, "Visual profissional"],
              [Users, "Atendimento humano"],
            ].map(([Icon, text]) => (
              <div key={text} className="mb-5 flex items-center gap-3 text-sm text-white/70 last:mb-0 sm:mb-7 sm:gap-4 sm:text-base">
                <Icon className="shrink-0 text-blue-400" size={20} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tecnologias" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <h2 className="mb-8 text-center text-xs font-bold uppercase tracking-[.2em] text-white/45 sm:text-sm sm:tracking-[.25em]">Tecnologias e ferramentas</h2>
        <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 sm:gap-7 md:grid-cols-6 lg:grid-cols-12">
          {techs.map(([name, icon])=>(
            <div key={name} className="group text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center transition group-hover:scale-110">
                <img src={icon} alt={name} className="max-h-10 max-w-10" />
              </div>
              <p className="mt-2 text-xs font-semibold text-white/75">{name}</p>
            </div>
          ))}
        </div>
      </section>


      <section id="depoimentos" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-400">Depoimentos</p>
          <h2 className="text-3xl font-black sm:text-4xl">Clientes que confiaram na DEVX.</h2>
          <p className="mt-3 text-white/55">Alguns feedbacks de empresas que transformaram sua presença digital.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {[
            ["RocketFit", "O site ficou rápido, moderno e trouxe muito mais contatos pelo WhatsApp."],
            ["Studio N.", "A DEVX organizou nossa presença online e deixou tudo com aparência profissional."],
            ["Pizza House", "Depois da landing page, começamos a receber pedidos com muito mais facilidade."]
          ].map(([name, text]) => (
            <div key={name} className="card rounded-2xl p-6 transition hover:-translate-y-2 hover:border-blue-500/60 sm:p-7">
              <div className="mb-5 flex gap-1 text-blue-400">★★★★★</div>
              <p className="text-white/70">"{text}"</p>
              <h3 className="mt-6 font-bold">{name}</h3>
              <span className="text-sm text-white/45">Cliente DEVX Solutions</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contato" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090d17] p-5 sm:p-8 lg:p-12">
          <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-l from-purple-700/35 to-transparent sm:w-1/2 sm:from-purple-700/45" />
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-700/20 blur-[90px]" />

          <div className="relative grid gap-8 lg:grid-cols-[.9fr_1.35fr] lg:items-center lg:gap-12">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-400 sm:text-sm">Vamos conversar?</p>
              <h2 className="max-w-xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                Fale com a gente pelo canal que preferir.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
                Escolha uma das opções de sua preferência e chame a DEVX Solutions para transformar sua ideia em um site profissional.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-5">
              <button
                onClick={() => openExternalLink(getWhatsappLink("Contato pelo site", "0"))}
                className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/70 hover:bg-green-500/10 hover:shadow-blueglow sm:gap-6 sm:p-6 lg:hover:-translate-y-2 text-left w-full"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-green-400/30 bg-green-500/10 text-green-400 transition group-hover:scale-110 sm:h-16 sm:w-16">
                  <img
                    src="/img/whatsapp.png"
                    alt="WhatsApp"
                    className="h-7 w-7 object-contain sm:h-8 sm:w-8"
        />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-green-400 sm:text-sm">WhatsApp</p>
                  <h3 className="mt-1 truncate text-lg font-black sm:text-2xl">(11) 91190-8314</h3>
                  <span className="mt-1 block text-xs text-white/50 sm:mt-2 sm:text-sm">Clique para chamar agora</span>
                </div>
                <ArrowRight className="hidden shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-green-400 sm:block" />
              </button>

              <button
                onClick={() => openExternalLink(`mailto:${companyEmail}?subject=Orçamento DEVX Solutions`)}
                className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/70 hover:bg-purple-500/10 hover:shadow-blueglow sm:gap-6 sm:p-6 lg:hover:-translate-y-2 text-left w-full"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-purple-400/30 bg-purple-500/10 text-purple-400 transition group-hover:scale-110 sm:h-16 sm:w-16">
                  <Mail size={28} className="sm:h-8 sm:w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-400 sm:text-sm">E-mail</p>
                  <h3 className="mt-1 break-words text-base font-black leading-snug sm:text-2xl">{companyEmail}</h3>
                  <span className="mt-1 block text-xs text-white/50 sm:mt-2 sm:text-sm">Clique para enviar um e-mail</span>
                </div>
                <ArrowRight className="hidden shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-purple-400 sm:block" />
              </button>

              <button
                onClick={() => openExternalLink(instagramUrl)}
                className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-pink-400/70 hover:bg-pink-500/10 hover:shadow-blueglow sm:gap-6 sm:p-6 lg:hover:-translate-y-2 text-left w-full"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-pink-400/30 bg-pink-500/10 text-pink-400 transition group-hover:scale-110 sm:h-16 sm:w-16">
                  <Instagram size={28} className="sm:h-8 sm:w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-pink-400 sm:text-sm">Instagram</p>
                  <h3 className="mt-1 truncate text-lg font-black sm:text-2xl">@devxsolutions</h3>
                  <span className="mt-1 block text-xs text-white/50 sm:mt-2 sm:text-sm">Clique para ver nosso perfil</span>
                </div>
                <ArrowRight className="hidden shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-pink-400 sm:block" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8 lg:pb-10">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:pb-12">
          <div><Logo/><p className="mt-6 text-sm leading-relaxed text-white/55">Criamos experiências digitais que conectam marcas e pessoas.</p><div className="mt-7 flex gap-5 text-white/70">
              <button onClick={() => openExternalLink(instagramUrl)} className="transition hover:text-pink-500 hover:scale-110"><Instagram/></button>
              <button onClick={() => openExternalLink(linkedinUrl)} className="transition hover:text-blue-400 hover:scale-110"><Linkedin/></button>
              <button onClick={() => openExternalLink(githubUrl)} className="transition hover:text-white hover:scale-110"><Github/></button>
            </div></div>
          <div><h3 className="mb-5 font-bold text-blue-400">NAVEGAÇÃO</h3><p className="space-y-2 text-sm text-white/60">Início<br/>Serviços<br/>Portfólio<br/>Orçamento<br/>Tecnologias<br/>Depoimentos<br/>Contato</p></div>
          <div><h3 className="mb-5 font-bold text-blue-400">SERVIÇOS</h3><p className="space-y-2 text-sm text-white/60">Criação de Sites<br/>Lojas Virtuais<br/>Landing Pages<br/>Manutenção de Sites<br/>Otimização (SEO)<br/>Hospedagem e Domínio</p></div>
          <div><h3 className="mb-5 font-bold text-blue-400">CONTATO</h3><p className="space-y-4 text-sm text-white/60"><Phone className="mr-2 inline" size={16}/> (11) 91190-8314<br/><Mail className="mr-2 inline" size={16}/> <button onClick={() => openExternalLink(`mailto:${companyEmail}`)} className="hover:text-blue-400">{companyEmail}</button><br/><MapPin className="mr-2 inline" size={16}/> São Paulo - SP</p></div>
        </div>
        <div className="flex flex-col gap-3 py-6 text-sm text-white/45 sm:py-8 md:flex-row md:justify-between">
          <span>© 2026 DEVX Solutions. Todos os direitos reservados.</span>
          <span>Política de Privacidade &nbsp;&nbsp;&nbsp; Termos de Uso</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
