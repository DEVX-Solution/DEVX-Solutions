import React, { useEffect, useState } from "react";
import {
  ArrowRight, Rocket, ShieldCheck, TrendingUp, Check, Phone, Mail, MapPin,
  Instagram, Linkedin, Github, ExternalLink, MessageCircle, Zap, BadgeCheck,
  Clock, Users, Code2, ChevronDown
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

const plans = [
  { name: "BÁSICO", price: "99", features: ["Site Institucional", "Até 5 Páginas", "Suporte por E-mail"] },
  { name: "PROFISSIONAL", price: "199", popular: true, features: ["Site Profissional", "Até 10 Páginas", "Suporte Prioritário", "SEO Básico"] },
  { name: "PREMIUM", price: "299", features: ["Site Personalizado", "Páginas ilimitadas", "Suporte 24/7", "SEO Avançado", "Integrações"] },
];

const whatsappNumber = "5511999999999";

const getWhatsappLink = (planName, price) => {
  const message = `Olá! Tenho interesse no plano ${planName} da DEVX Solutions por R$ ${price}/mês. Pode me passar mais detalhes?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const companyEmail = "contato.devxsolutions@gmail.com";
const instagramUrl = "https://www.instagram.com/devxsolutions";
const linkedinUrl = "https://www.linkedin.com/company/devxsolutions";
const githubUrl = "https://github.com/devxsolutions";

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
    <div className="flex items-center gap-3">
      <div className="relative h-9 w-9">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 blur-sm" />
        <div className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-black">
          <Code2 size={22} className="text-blue-400" />
        </div>
      </div>
      <div className="leading-none">
        <div className="text-2xl font-black tracking-tight">DEV<span className="text-gradient">X</span></div>
        <div className="text-[10px] tracking-[.35em] text-white/55">SOLUTIONS</div>
      </div>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative min-h-[430px] flex items-center justify-center">
      <div className="absolute right-0 top-0 h-[470px] w-[520px] rounded-full bg-purple-700/25 blur-[100px]" />
      <div className="absolute -left-2 top-32 h-64 w-80 rotate-[-3deg] rounded-2xl border border-white/10 bg-white/[.025] opacity-70" />
      <div className="absolute right-0 top-28 h-64 w-80 rotate-[2deg] rounded-2xl border border-white/10 bg-white/[.025] opacity-60" />
      <div className="relative z-10 w-full max-w-[560px] -rotate-[1deg] rounded-2xl border border-blue-300/30 bg-[#090d17] p-7 shadow-glow">
        <div className="mb-12 flex items-center justify-between">
          <b className="tracking-wide">KAIROS</b>
          <div className="flex gap-5 text-[10px] text-white/70">
            <span className="text-blue-400">Início</span><span>Serviços</span><span>Sobre</span><span>Contato</span><span>×</span>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-8">
          <div>
            <h3 className="text-3xl font-black leading-tight">Estratégia.<br />Design. <span className="text-blue-400">Resultado.</span></h3>
            <p className="mt-4 text-xs leading-relaxed text-white/55">Soluções digitais que impulsionam negócios para o próximo nível.</p>
            <button className="mt-6 rounded-md bg-blue-600 px-5 py-3 text-xs font-bold">SAIBA MAIS</button>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-6 rounded-full bg-blue-600 blur-3xl" />
            <div className="absolute inset-8 rounded-full bg-purple-600 blur-2xl" />
            <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_30%_30%,#8b5cf6,#2563eb_45%,#080b14_68%)] shadow-blueglow" />
            <div className="absolute inset-8 rounded-full border-[18px] border-purple-500/70 blur-[1px] rotate-45" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 flex gap-4">
        <span className="h-2 w-9 rounded-full bg-blue-500"></span>
        <span className="h-2 w-8 rounded-full bg-white/15"></span>
        <span className="h-2 w-5 rounded-full bg-white/15"></span>
        <span className="h-2 w-8 rounded-full bg-white/15"></span>
      </div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [servicesOpen, setServicesOpen] = useState(false);

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

const navClass = (id) =>
  `pb-7 transition ${
    activeSection === id
      ? "border-b-2 border-blue-500 text-blue-400"
      : "border-b-2 border-transparent text-white/85 hover:text-blue-400"
  }`;
  return (
    <main className="min-h-screen overflow-hidden bg-[#030407] text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/65 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          <Logo />
          <div className="hidden items-center gap-10 text-sm font-semibold lg:flex">
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
                    Ver planos disponíveis
                  </a>
                </div>
              )}
            </div>

            <a className={navClass("portfolio")} href="#portfolio">Portfólio</a>
            <a className={navClass("planos")} href="#planos">Planos</a>
            <a className={navClass("tecnologias")} href="#tecnologias">Tecnologias</a>
            <a className={navClass("depoimentos")} href="#depoimentos">Depoimentos</a>
            <a className={navClass("contato")} href="#contato">Contato</a>
          </div>
          <a href="#contato" className="rounded-lg border border-blue-500/70 px-7 py-3 text-sm font-bold hover:bg-blue-500/10">ORÇAMENTO <ArrowRight className="ml-2 inline" size={16}/></a>
        </nav>
      </header>

      <section id="inicio" className="relative border-b border-white/10 pt-28">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute right-0 top-20 h-[520px] w-[720px] bg-gradient-to-l from-purple-800/35 to-transparent blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-8 py-20 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <span className="rounded-full border border-blue-500/40 bg-blue-600/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-400">Criação & Gestão de Sites</span>
            <h1 className="mt-8 max-w-xl text-5xl font-black leading-[1.05] md:text-7xl">Transformamos ideias em sites que <span className="text-gradient">impulsionam resultados.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/60">Criamos, desenvolvemos e gerenciamos sites modernos, rápidos e otimizados para o seu negócio crescer na internet.</p>
            <div className="mt-9 flex gap-6">
              <a className="btn-gradient rounded-lg px-8 py-4 text-sm font-extrabold shadow-glow" href="#contato">QUERO UM SITE <ArrowRight className="ml-2 inline" size={18}/></a>
              <a className="rounded-lg border border-purple-500/60 px-8 py-4 text-sm font-extrabold" href="#portfolio">VER PORTFÓLIO</a>
            </div>
            <div id="servicos" className="mt-16 grid gap-8 sm:grid-cols-3">
              {[[Rocket,"Rápido e Otimizado","Sites leves e otimizados para alta performance."],[ShieldCheck,"Seguro e Confiável","Proteção avançada e backups automáticos."],[TrendingUp,"Focado em Resultados","Estratégias que geram mais clientes e conversões."]].map(([Icon,t,d])=>(
                <div key={t} className="flex gap-4">
                  <Icon className="shrink-0 text-purple-500" size={32}/>
                  <div><b>{t}</b><p className="mt-1 text-sm text-white/55">{d}</p></div>
                </div>
              ))}
            </div>
          </div>
          <HeroMockup />
        </div>
      </section>

      

      <section id="portfolio" className="mx-auto max-w-7xl px-8 py-14">
        <div className="card rounded-2xl p-12">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-400">Nosso portfólio</p>
              <h2 className="text-4xl font-black">Projetos que fazem a diferença.</h2>
              <p className="mt-3 text-white/55">Soluções únicas para negócios de todos os tamanhos.</p>
            </div>
            <button className="w-fit rounded-lg border border-purple-500/60 px-7 py-3 text-sm font-bold">VER TODOS OS PROJETOS</button>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {projects.map((p)=>(
              <a key={p.title} href={p.link || "#"} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl border border-white/10 bg-black/35 p-3 transition hover:-translate-y-2 hover:border-blue-500/60 cursor-pointer">
                <img src={p.img} className="h-36 w-full rounded-lg object-cover opacity-80" />
                <div className="p-3">
                  <div className="flex items-center justify-between"><h3 className="font-bold">{p.title}</h3><ExternalLink size={17}/></div>
                  <p className="mt-1 text-sm text-white/55">{p.type}</p>
                  <div className="mt-4 flex gap-2">{p.tags.map(t=><span key={t} className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/60">{t}</span>)}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="mx-auto max-w-7xl px-8 py-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_.7fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-400">Nossos planos</p>
            <h2 className="text-4xl font-black">Escolha o plano ideal para o seu negócio.</h2>
          </div>
          <p className="self-end text-white/55">Planos feitos para empresas que querem crescer com presença digital profissional.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1fr_.95fr]">
          {plans.map((plan)=>(
            <div
              key={plan.name}
              className={`card relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-blueglow ${
                plan.popular ? "border-blue-500 shadow-blueglow" : "border-white/10"
              }`}
            >
              {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-1 text-xs font-black">MAIS ESCOLHIDO</span>}
              <p className="text-sm font-black text-blue-400">{plan.name}</p>
              <div className="mt-7"><span className="text-xl">R$</span><span className="text-5xl font-black"> {plan.price}</span><span className="text-white/60"> /mês</span></div>
              <ul className="mt-8 space-y-4">
                {plan.features.map(f=><li key={f} className="flex gap-3 text-sm text-white/70"><Check size={18} className="text-blue-400"/>{f}</li>)}
              </ul>
              <a
                href={getWhatsappLink(plan.name, plan.price)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-10 block w-full rounded-lg py-4 text-center text-sm font-black transition-all duration-300 hover:-translate-y-1 hover:shadow-blueglow ${
                  plan.popular
                    ? "btn-gradient"
                    : "border border-blue-500/60 hover:bg-blue-500/10"
                }`}
              >
                ESCOLHER PLANO
              </a>
            </div>
          ))}
          <div className="card self-center rounded-2xl p-8">
            {[[Zap,"Sem taxa de implantação"],[Clock,"Cancelamento quando quiser"],[BadgeCheck,"Satisfação garantida"],[Users,"Atendimento humano"]].map(([Icon,t])=>(
              <div key={t} className="mb-7 flex items-center gap-4 text-white/70 last:mb-0">
                <Icon className="text-blue-400" size={24}/><span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

<section id="tecnologias" className="mx-auto max-w-7xl px-8 py-12">
        <h2 className="mb-8 text-center text-sm font-bold uppercase tracking-[.25em] text-white/45">Tecnologias e ferramentas</h2>
        <div className="grid grid-cols-3 gap-7 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
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


      <section id="depoimentos" className="mx-auto max-w-7xl px-8 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-400">Depoimentos</p>
          <h2 className="text-4xl font-black">Clientes que confiaram na DEVX.</h2>
          <p className="mt-3 text-white/55">Alguns feedbacks de empresas que transformaram sua presença digital.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["RocketFit", "O site ficou rápido, moderno e trouxe muito mais contatos pelo WhatsApp."],
            ["Studio N.", "A DEVX organizou nossa presença online e deixou tudo com aparência profissional."],
            ["Pizza House", "Depois da landing page, começamos a receber pedidos com muito mais facilidade."]
          ].map(([name, text]) => (
            <div key={name} className="card rounded-2xl p-7 transition hover:-translate-y-2 hover:border-blue-500/60">
              <div className="mb-5 flex gap-1 text-blue-400">★★★★★</div>
              <p className="text-white/70">“{text}”</p>
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
              <a
                href={getWhatsappLink("Contato pelo site", "0")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/70 hover:bg-green-500/10 hover:shadow-blueglow sm:gap-6 sm:p-6 lg:hover:-translate-y-2"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-green-400/30 bg-green-500/10 text-green-400 transition group-hover:scale-110 sm:h-16 sm:w-16">
                  <MessageCircle size={28} className="sm:h-8 sm:w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-green-400 sm:text-sm">WhatsApp</p>
                  <h3 className="mt-1 truncate text-lg font-black sm:text-2xl">(11) 99999-9999</h3>
                  <span className="mt-1 block text-xs text-white/50 sm:mt-2 sm:text-sm">Clique para chamar agora</span>
                </div>
                <ArrowRight className="hidden shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-green-400 sm:block" />
              </a>

              <a
                href={`mailto:${companyEmail}?subject=Orçamento DEVX Solutions`}
                className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/70 hover:bg-purple-500/10 hover:shadow-blueglow sm:gap-6 sm:p-6 lg:hover:-translate-y-2"
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
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-pink-400/70 hover:bg-pink-500/10 hover:shadow-blueglow sm:gap-6 sm:p-6 lg:hover:-translate-y-2"
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
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-8 pb-10 pt-10">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-4">
          <div><Logo/><p className="mt-6 text-sm leading-relaxed text-white/55">Criamos experiências digitais que conectam marcas e pessoas.</p><div className="mt-7 flex gap-5 text-white/70">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-pink-500 hover:scale-110"><Instagram/></a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-blue-400 hover:scale-110"><Linkedin/></a>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-white hover:scale-110"><Github/></a>
            </div></div>
          <div><h3 className="mb-5 font-bold text-blue-400">NAVEGAÇÃO</h3><p className="space-y-2 text-sm text-white/60">Início<br/>Serviços<br/>Portfólio<br/>Planos<br/>Tecnologias<br/>Depoimentos<br/>Contato</p></div>
          <div><h3 className="mb-5 font-bold text-blue-400">SERVIÇOS</h3><p className="space-y-2 text-sm text-white/60">Criação de Sites<br/>Lojas Virtuais<br/>Landing Pages<br/>Manutenção de Sites<br/>Otimização (SEO)<br/>Hospedagem e Domínio</p></div>
          <div><h3 className="mb-5 font-bold text-blue-400">CONTATO</h3><p className="space-y-4 text-sm text-white/60"><Phone className="mr-2 inline" size={16}/> (11) 99999-9999<br/><Mail className="mr-2 inline" size={16}/> <a href={`mailto:${companyEmail}`} className="hover:text-blue-400">{companyEmail}</a><br/><MapPin className="mr-2 inline" size={16}/> São Paulo - SP</p></div>
        </div>
        <div className="flex justify-between py-8 text-sm text-white/45">
          <span>© 2024 DEVX Solutions. Todos os direitos reservados.</span>
          <span>Política de Privacidade &nbsp;&nbsp;&nbsp; Termos de Uso</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
