export const techs = [
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

export const projects = [
  {
    id: "rocketfit",
    title: "RocketFit",
    category: "Landing Page",
    categoryFilter: "landing",
    summary: "Landing page focada em captação de alunos e conversão direta via WhatsApp.",
    resultMetric: "+220% em contatos",
    img: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?q=80&w=900&auto=format&fit=crop",
    tags: ["React", "Next.js"],
    link: "https://rocketfit.vercel.app",
  },
  {
    id: "studio-n",
    title: "Studio N.",
    category: "Site Institucional",
    categoryFilter: "institucional",
    summary: "Identidade institucional elegante para posicionamento de autoridade e serviços.",
    resultMetric: "Visual Premium",
    img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=900&auto=format&fit=crop",
    tags: ["WordPress", "PHP"],
    link: "https://studio-n.vercel.app",
  },
  {
    id: "elevate",
    title: "Elevate",
    category: "Web Design",
    categoryFilter: "institucional",
    summary: "Plataforma de alta precisão com interface minimalista e carregamento instantâneo.",
    resultMetric: "0.8s load time",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=900&auto=format&fit=crop",
    tags: ["React", "Tailwind"],
    link: "https://elevate-phi-henna.vercel.app",
  },
  {
    id: "vision",
    title: "Vision",
    category: "Landing Page",
    categoryFilter: "landing",
    summary: "Página de conversão de alto impacto visual para produto digital inovador.",
    resultMetric: "Mobile-First",
    img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=900&auto=format&fit=crop",
    tags: ["Next.js", "TypeScript"],
    link: "https://vision-one-chi.vercel.app",
  },
  {
    id: "pizza-house",
    title: "Pizza House",
    category: "Site Delivery",
    categoryFilter: "delivery",
    summary: "Vitrine digital e cardápio interativo para pedidos rápidos e organizados.",
    resultMetric: "+35% em pedidos",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=900&auto=format&fit=crop",
    tags: ["React", "Node.js"],
    link: "https://pizza-house-one.vercel.app",
  },
];

export const heroSlides = [
  {
    brand: "KAIROS",
    category: "Landing Page de Alta Conversão",
    nav: ["Início", "Serviços", "Sobre", "Contato"],
    activeNav: "Início",
    title: ["Estratégia.", "Design."],
    highlight: "Resultado.",
    description: "Soluções digitais que impulsionam negócios para o próximo nível.",
    button: "SAIBA MAIS",
    accentBg: "bg-brand-600 hover:bg-brand-500",
    accentColor: "text-brand-400",
    visual: "sphere",
  },
  {
    brand: "NEXA",
    category: "Campanha & Captação",
    nav: ["Home", "Projetos", "Planos", "Contato"],
    activeNav: "Projetos",
    title: ["Landing.", "Oferta."],
    highlight: "Conversão.",
    description: "Páginas rápidas, objetivas e preparadas para transformar visitas em contatos.",
    button: "VER PROJETO",
    accentBg: "bg-indigo-600 hover:bg-indigo-500",
    accentColor: "text-indigo-400",
    visual: "dashboard",
  },
  {
    brand: "LUMINA",
    category: "Site Institucional Corporativo",
    nav: ["Início", "Portfólio", "Sobre", "Contato"],
    activeNav: "Portfólio",
    title: ["Marca.", "Presença."],
    highlight: "Crescimento.",
    description: "Sites institucionais com visual premium, navegação simples e confiança imediata.",
    button: "EXPLORAR",
    accentBg: "bg-sky-600 hover:bg-sky-500",
    accentColor: "text-sky-400",
    visual: "cards",
  },
  {
    brand: "ATLAS",
    category: "E-Commerce & Catálogo Digital",
    nav: ["Loja", "Produtos", "Pedidos", "Contato"],
    activeNav: "Loja",
    title: ["Produto.", "Pedido."],
    highlight: "Escala.",
    description: "Experiências de venda online com vitrine clara, checkout direto e gestão fácil.",
    button: "COMEÇAR",
    accentBg: "bg-teal-600 hover:bg-teal-500",
    accentColor: "text-teal-400",
    visual: "store",
  },
];

export const budgets = [
  {
    id: "landing",
    name: "LANDING PAGE",
    label: "Página única",
    description: "Ideal para campanhas, lançamentos, anúncios (Google/Meta Ads) e páginas focadas em conversão direta.",
    popular: false,
    prazoMedio: "3 a 7 dias úteis",
    features: [
      "Design exclusivo e autoral",
      "Totalmente responsivo (Celular, Tablet e Desktop)",
      "Seções estratégicas de alta conversão",
      "Botão de contato direto para WhatsApp",
      "Carregamento ultra-rápido otimizado",
      "Estrutura com SEO básico para o Google",
    ],
  },
  {
    id: "institucional",
    name: "SITE INSTITUCIONAL",
    label: "Mais solicitado",
    popular: true,
    description: "Perfeito para empresas que precisam apresentar serviços, autoridade corporativa e múltiplos pontos de contato.",
    prazoMedio: "10 a 20 dias úteis",
    features: [
      "Estrutura com múltiplas páginas e seções",
      "Visual corporativo e sofisticado",
      "SEO técnico completo para busca orgânica",
      "Formulários de contato com envio direto",
      "Integração com WhatsApp, Redes e Google Maps",
      "Painel administrativo facilitado",
    ],
  },
  {
    id: "ecommerce",
    name: "E-COMMERCE",
    label: "Loja virtual",
    popular: false,
    description: "Para negócios que querem vender produtos online com vitrine organizada, carrinho e pagamento integrado.",
    prazoMedio: "15 a 30 dias úteis",
    features: [
      "Catálogo completo de produtos com variações",
      "Carrinho de compras fluido e intuitivo",
      "Checkout transparente e seguro",
      "Painel de gestão de vendas e estoque",
      "Estrutura escalável para alto tráfego",
      "Integrações de frete e gateways de pagamento",
    ],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Imersão & Briefing",
    description: "Entendemos seu modelo de negócio, público-alvo, objetivos comerciais e diferenciais para desenhar a estratégia ideal.",
  },
  {
    step: "02",
    title: "Design UI/UX & Prototipagem",
    description: "Criamos uma identidade visual moderna, pensada na jornada do seu cliente, sem templates prontos e com aprovação prévia.",
  },
  {
    step: "03",
    title: "Engenharia & Performance",
    description: "Desenvolvemos com código limpo, componentes reutilizáveis, máxima velocidade de carregamento e testes rigorosos.",
  },
  {
    step: "04",
    title: "SEO, Lançamento & Suporte",
    description: "Publicamos seu site nos servidores, indexamos no Google com SEO técnico e oferecemos suporte contínuo para sua tranquilidade.",
  },
];

export const faqs = [
  {
    question: "Quanto tempo leva para o meu site ficar pronto?",
    answer: "O prazo varia conforme a complexidade do projeto. Uma Landing Page expressa leva em média de 3 a 7 dias úteis. Sites institucionais completos levam entre 10 a 20 dias úteis, e lojas virtuais (e-commerce) levam de 15 a 30 dias úteis. Cumprimos rigorosamente os prazos acordados em contrato.",
  },
  {
    question: "Eu preciso ter o domínio e hospedagem antes de começar?",
    answer: "Não precisa! Nossa equipe cuida de tudo ou orienta você passo a passo na compra do seu domínio (.com.br ou .com) e na contratação da hospedagem com o melhor custo-benefício e velocidade do mercado.",
  },
  {
    question: "O site funcionará bem em celulares, tablets e iPads?",
    answer: "Sim, 100%. Todo o nosso processo de desenvolvimento segue a metodologia Mobile-First. Garantimos que sua página seja perfeitamente legível, rápida e confortável ao toque em qualquer dispositivo: smartphones Android, iPhones, iPads e computadores.",
  },
  {
    question: "Vocês fazem otimização para o Google (SEO)?",
    answer: "Sim! Todos os sites entregues pela DEVX Solutions já incluem SEO técnico integrado: meta tags de compartilhamento, semântica correta, títulos estruturados, compressão de imagens, velocidade de carregamento e dados estruturados Schema.org para o Google indexar sua empresa com destaque.",
  },
  {
    question: "Como funciona a forma de pagamento?",
    answer: "Trabalhamos com condições facilitadas, geralmente divididas em entrada no início do projeto e o restante na entrega e aprovação final do site. Também aceitamos parcelamento via cartão de crédito ou desconto via Pix.",
  },
  {
    question: "Terei suporte após o site ser publicado?",
    answer: "Com certeza! Oferecemos garantia após a entrega para ajustes e acompanhamento do funcionamento do site. Além disso, disponibilizamos planos acessíveis de manutenção contínua, backups e atualizações para você não precisar se preocupar com nada.",
  },
  {
    question: "Poderei atualizar os textos e fotos do site no futuro?",
    answer: "Sim. Nossos projetos são construídos de forma modular e clara. Nós orientamos como fazer alterações básicas ou cuidamos de todas as atualizações para você por meio do nosso suporte contínuo.",
  },
];

export const testimonials = [
  {
    id: "review-seed-1",
    client: "RocketFit",
    quote: "O site ficou rápido, moderno e trouxe muito mais contatos pelo WhatsApp.",
    role: "Cliente DEVX Solutions",
    projectType: "Landing Page",
    rating: 5,
    status: "approved",
    date: "15 de set.",
  },
  {
    id: "review-seed-2",
    client: "Studio N.",
    quote: "A DEVX organizou nossa presença online e deixou tudo com aparência profissional.",
    role: "Cliente DEVX Solutions",
    projectType: "Site Institucional",
    rating: 5,
    status: "approved",
    date: "22 de set.",
  },
  {
    id: "review-seed-3",
    client: "Pizza House",
    quote: "Depois da landing page, começamos a receber pedidos com muito mais facilidade.",
    role: "Cliente DEVX Solutions",
    projectType: "Site Delivery",
    rating: 5,
    status: "approved",
    date: "28 de set.",
  },
];

export const contactInfo = {
  whatsappNumber: "5511911908314",
  whatsappFormatted: "(11) 91190-8314",
  email: "contato.devxsolutions@gmail.com",
  instagramUrl: "https://www.instagram.com/devxsolutions",
  instagramHandle: "@devxsolutions",
  linkedinUrl: "https://www.linkedin.com/in/devx-solutions-14430a421/",
  githubUrl: "https://github.com/devxsolutions",
  location: "São Paulo - SP",
};

export const getWhatsappLink = (subject = "Contato pelo site", details = "") => {
  const msg = `Olá! Gostaria de conversar com a DEVX Solutions sobre ${subject} ${
    details ? `(${details})` : ""
  }. Pode me passar mais detalhes?`;
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`;
};
