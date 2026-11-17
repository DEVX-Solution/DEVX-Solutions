import React, { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ServicesPage } from "./pages/ServicesPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { FaqPage } from "./pages/FaqPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";

const pathToPageId = (pathname, hash) => {
  const target = hash ? hash.replace(/^#\/?/, "") : pathname.replace(/^\//, "");
  if (target === "portfolio") return "portfolio";
  if (target === "servicos" || target === "planos" || target === "services") return "servicos";
  if (target === "depoimentos" || target === "avaliacoes" || target === "testimonials") return "depoimentos";
  if (target === "duvidas" || target === "faq") return "duvidas";
  if (target === "contato" || target === "contact") return "contato";
  if (target === "admin") return "admin";
  return "home";
};

function MainApp() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return pathToPageId(window.location.pathname, window.location.hash);
    }
    return "home";
  });

  const getPageTitle = (pageId) => {
    const titles = t.seo?.pageTitles || {};
    return titles[pageId] || titles.home || "DEVX Solutions";
  };

  const navigate = (pageId, path = "/") => {
    setCurrentPage(pageId);

    if (typeof window !== "undefined") {
      window.history.pushState({ pageId }, "", path);
      document.title = getPageTitle(pageId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const page = pathToPageId(window.location.pathname, window.location.hash);
      setCurrentPage(page);
      document.title = getPageTitle(page);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [t]);

  // Atualiza título da aba quando o idioma muda
  useEffect(() => {
    document.title = getPageTitle(currentPage);
  }, [currentPage, t]);

  // Força atualização imediata do favicon na aba do navegador (bypassa cache rígido)
  useEffect(() => {
    try {
      const existingIcons = document.querySelectorAll("link[rel*='icon']");
      existingIcons.forEach((el) => el.remove());

      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.type = "image/png";
      newLink.href = "/Favicon.png?t=" + Date.now();
      document.head.appendChild(newLink);
    } catch (e) {
      console.error("Erro ao atualizar favicon:", e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between selection:bg-brand-600/30 selection:text-brand-200">
      <Navbar currentPage={currentPage} navigate={navigate} />

      <main className="flex-1">
        {currentPage === "home" && <HomePage navigate={navigate} />}
        {currentPage === "portfolio" && <PortfolioPage navigate={navigate} />}
        {currentPage === "servicos" && <ServicesPage navigate={navigate} />}
        {currentPage === "depoimentos" && <TestimonialsPage navigate={navigate} />}
        {currentPage === "duvidas" && <FaqPage navigate={navigate} />}
        {currentPage === "contato" && <ContactPage navigate={navigate} />}
        {currentPage === "admin" && <AdminPage navigate={navigate} />}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
