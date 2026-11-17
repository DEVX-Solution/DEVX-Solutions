import React, { useState, useEffect } from "react";
import {
  Lock,
  User,
  LogOut,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle,
  CheckCircle2,
  Check,
  X,
  Clock,
  Sparkles,
  AlertCircle,
  ExternalLink,
  Star,
  Settings,
  FolderKanban,
  MessageSquareQuote,
  Shield,
  Phone,
  Pencil,
} from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { StarRatingInput } from "../components/StarRatingInput";
import { StarRatingDisplay } from "../components/StarRatingDisplay";
import {
  getStoredProjects,
  saveProjects,
  addProject,
  updateProject,
  deleteProject,
  getStoredTestimonials,
  saveTestimonials,
  addTestimonial,
  deleteTestimonial,
  approveTestimonial,
  rejectTestimonial,
  getStoredContactInfo,
  saveContactInfo,
  resetToDefaults,
} from "../utils/storage";

export function AdminPage({ navigate }) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("devx_admin_auth") === "true";
    }
    return false;
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [notification, setNotification] = useState(null);

  // Active Tab: 'testimonials' | 'projects' | 'contact'
  const [activeTab, setActiveTab] = useState("testimonials");

  // Data state
  const [testimonials, setTestimonials] = useState(getStoredTestimonials);
  const [projects, setProjects] = useState(getStoredProjects);
  const [contact, setContact] = useState(getStoredContactInfo);

  // Forms inside admin
  const [newTestimonial, setNewTestimonial] = useState({
    client: "",
    role: "",
    quote: "",
    rating: 5,
    projectType: "Landing Page",
  });

  const [newProject, setNewProject] = useState({
    title: "",
    category: "Landing Page",
    categoryFilter: "landing",
    summary: "",
    resultMetric: "+50% em conversão",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
    tags: "React, Tailwind",
    link: "https://devxsolutions.com.br",
  });

  // Edit project state
  const [editingProject, setEditingProject] = useState(null);

  const showNotify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    const syncData = () => {
      setTestimonials(getStoredTestimonials());
      setProjects(getStoredProjects());
      setContact(getStoredContactInfo());
    };
    window.addEventListener("devx_storage_updated", syncData);
    return () => window.removeEventListener("devx_storage_updated", syncData);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === "admin" && password === "DevX2026@") {
      setIsAuthenticated(true);
      sessionStorage.setItem("devx_admin_auth", "true");
      setAuthError("");
      showNotify("Bem-vindo ao Painel DEVX!", "success");
    } else {
      setAuthError("Usuário ou senha incorretos. Verifique suas credenciais.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("devx_admin_auth");
    setUsername("");
    setPassword("");
  };

  /* Add Testimonial */
  const handleAddTestimonial = (e) => {
    e.preventDefault();
    if (!newTestimonial.client.trim() || !newTestimonial.quote.trim()) {
      showNotify("Preencha o nome do cliente e a avaliação!", "error");
      return;
    }
    const updated = addTestimonial(
      {
        ...newTestimonial,
        status: "approved", // Admin adicionando direto já nasce aprovada
      },
      true
    );
    setTestimonials(updated);
    setNewTestimonial({
      client: "",
      role: "",
      quote: "",
      rating: 5,
      projectType: "Landing Page",
    });
    showNotify("Avaliação adicionada e publicada com sucesso!");
  };

  /* Approve Testimonial */
  const handleApproveTestimonial = (id) => {
    const updated = approveTestimonial(id);
    setTestimonials(updated);
    showNotify("Avaliação aprovada e publicada no site!", "success");
  };

  /* Reject Testimonial */
  const handleRejectTestimonial = (id) => {
    if (window.confirm("Deseja realmente rejeitar/descartar esta avaliação?")) {
      const updated = rejectTestimonial(id);
      setTestimonials(updated);
      showNotify("Avaliação rejeitada e removida.", "success");
    }
  };

  /* Delete Testimonial */
  const handleDeleteTestimonial = (identifier) => {
    if (window.confirm("Deseja realmente remover esta avaliação?")) {
      const updated = deleteTestimonial(identifier);
      setTestimonials(updated);
      showNotify("Avaliação removida.");
    }
  };

  /* Add Project */
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.summary.trim()) {
      showNotify("Preencha o título e o resumo do projeto!", "error");
      return;
    }
    const updated = addProject({
      ...newProject,
      tags: newProject.tags.split(",").map((s) => s.trim()),
    });
    setProjects(updated);
    setNewProject({
      title: "",
      category: "Landing Page",
      categoryFilter: "landing",
      summary: "",
      resultMetric: "+50% em conversão",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
      tags: "React, Tailwind",
      link: "https://devxsolutions.com.br",
    });
    showNotify("Novo projeto adicionado ao portfólio!");
  };

  /* Delete Project */
  const handleDeleteProject = (id) => {
    if (window.confirm("Deseja remover este projeto do portfólio?")) {
      const updated = deleteProject(id);
      setProjects(updated);
      if (editingProject && editingProject.id === id) {
        setEditingProject(null);
      }
      showNotify("Projeto removido do portfólio.");
    }
  };

  /* Start editing project */
  const handleStartEditProject = (p) => {
    setEditingProject({
      ...p,
      tags: Array.isArray(p.tags) ? p.tags.join(", ") : (p.tags || ""),
    });
    const formElement = document.getElementById("project-form-container");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* Cancel editing project */
  const handleCancelEditProject = () => {
    setEditingProject(null);
  };

  /* Save Edit Project */
  const handleSaveEditProject = (e) => {
    e.preventDefault();
    if (!editingProject.title.trim() || !editingProject.summary.trim()) {
      showNotify("Preencha o título e o resumo do projeto!", "error");
      return;
    }
    const tagsArray = typeof editingProject.tags === "string"
      ? editingProject.tags.split(",").map((s) => s.trim()).filter(Boolean)
      : Array.isArray(editingProject.tags)
      ? editingProject.tags
      : [];

    const updated = updateProject(editingProject.id, {
      ...editingProject,
      tags: tagsArray,
    });
    setProjects(updated);
    setEditingProject(null);
    showNotify("Projeto atualizado com sucesso!");
  };

  /* Save Contact info */
  const handleSaveContact = (e) => {
    e.preventDefault();
    saveContactInfo(contact);
    showNotify("Informações de contato atualizadas!");
  };

  /* Reset to Defaults */
  const handleResetDefaults = () => {
    if (
      window.confirm(
        "Atenção: Isso restaurará todos os projetos, depoimentos e contatos originais de fábrica. Deseja continuar?"
      )
    ) {
      resetToDefaults();
      showNotify("Dados de fábrica restaurados!");
    }
  };

  // 1. TELA DE LOGIN SE NÃO ESTIVER AUTENTICADO
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center px-4 py-24 sm:py-32">
        <div className="surface-card w-full max-w-md rounded-2xl border border-slate-800 p-8 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-brand-500/30 bg-brand-500/10 text-brand-400">
              <Shield size={28} />
            </div>
            <h1 className="mt-4 font-display text-2xl font-black text-white">
              Painel DEVX <span className="text-brand-400">Admin</span>
            </h1>
            <p className="mt-2 text-xs text-slate-400">
              Acesso exclusivo para gerenciamento de conteúdo e métricas.
            </p>
          </div>

          {authError && (
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block font-mono text-xs text-slate-300 mb-1">
                Usuário
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/90 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-slate-300 mb-1">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/90 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="touch-target mt-2 flex w-full items-center justify-center rounded-lg bg-brand-600 py-3 text-sm font-bold text-white shadow-lg shadow-brand-950/40 transition hover:bg-brand-500 active:translate-y-0.5"
            >
              ENTRAR NO PAINEL
            </button>
          </form>

          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("home", "/")}
              className="text-xs text-slate-400 hover:text-slate-200 transition"
            >
              ← Voltar ao site público
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD DE ADMIN AUTENTICADO
  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Toast Notificação */}
        {notification && (
          <div
            className={`fixed top-24 right-4 z-50 flex items-center gap-2 rounded-xl p-4 shadow-2xl backdrop-blur-md transition-all ${
              notification.type === "error"
                ? "border border-rose-500 bg-rose-950/90 text-rose-200"
                : "border border-emerald-500 bg-emerald-950/90 text-emerald-200"
            }`}
          >
            {notification.type === "error" ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle size={18} />
            )}
            <span className="text-xs font-semibold">{notification.msg}</span>
          </div>
        )}

        {/* Topo do Painel */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Sessão Ativa: admin
            </div>
            <h1 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">
              Painel de Administração DEVX
            </h1>
            <p className="text-xs text-slate-400">
              Gerencie avaliações, projetos exibidos e canais de contato em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="touch-target inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-slate-500 hover:text-white"
            >
              <RefreshCw size={14} /> Restaurar Padrões
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="touch-target inline-flex items-center gap-1.5 rounded-lg border border-rose-800/60 bg-rose-950/30 px-3.5 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-900/50"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="mt-8 flex gap-2 border-b border-slate-800 pb-2">
          {[
            { id: "testimonials", label: "Avaliações", icon: MessageSquareQuote },
            { id: "projects", label: "Projetos", icon: FolderKanban },
            { id: "contact", label: "Contato & Redes", icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`touch-target flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs font-semibold transition ${
                  isActive
                    ? "bg-brand-600 text-white shadow-md shadow-brand-950/40"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CONTEÚDO DAS ABAS */}
        <div className="mt-8">
          {/* TAB 1: AVALIAÇÕES & MODERAÇÃO */}
          {activeTab === "testimonials" && (() => {
            const pendingList = testimonials.filter((t) => t.status === "pending");
            const approvedList = testimonials.filter((t) => t.status !== "pending");

            return (
              <div className="space-y-8">
                {/* 1. SEÇÃO DE MODERAÇÃO: AVALIAÇÕES PENDENTES */}
                <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6 sm:p-8 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <Clock size={20} />
                      </div>
                      <div>
                        <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                          Avaliações Pendentes de Moderação
                          <span className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${
                            pendingList.length > 0
                              ? "bg-amber-500 text-slate-950"
                              : "bg-slate-800 text-slate-400"
                          }`}>
                            {pendingList.length}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-400">
                          Avaliações enviadas por clientes no site. Ao aprovar, elas aparecem instantaneamente no mural público.
                        </p>
                      </div>
                    </div>
                  </div>

                  {pendingList.length === 0 ? (
                    <div className="py-8 text-center">
                      <CheckCircle2 size={32} className="mx-auto text-emerald-400 mb-2 opacity-80" />
                      <p className="text-sm font-semibold text-slate-200">
                        Nenhuma avaliação pendente no momento.
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Todas as avaliações recebidas já foram moderadas ou aprovadas.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {pendingList.map((item) => (
                        <div
                          key={item.id}
                          className="surface-card relative flex flex-col justify-between rounded-xl p-5 border border-amber-500/30 shadow-lg"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-display text-sm font-bold text-white">
                                  {item.client}
                                </h4>
                                <span className="font-mono text-[11px] text-slate-400 block">
                                  {item.role || "Cliente DEVX"}
                                </span>
                              </div>
                              <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300 shrink-0">
                                Pendente
                              </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <StarRatingDisplay rating={item.rating || 5} size={14} />
                                <span className="font-mono text-xs font-bold text-amber-300">
                                  {Number(item.rating || 5).toFixed(1)}
                                </span>
                              </div>
                              <span className="font-mono text-[10px] text-slate-400">
                                {item.projectType || "Landing Page"}
                              </span>
                            </div>

                            <p className="mt-3 text-xs leading-relaxed text-slate-200 italic bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                              "{item.quote}"
                            </p>
                          </div>

                          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-3">
                            <button
                              type="button"
                              onClick={() => handleApproveTestimonial(item.id)}
                              className="touch-target flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-500 active:translate-y-0.5 transition"
                              title="Aprovar e publicar no site"
                            >
                              <Check size={14} /> Aprovar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRejectTestimonial(item.id)}
                              className="touch-target flex items-center justify-center gap-1.5 rounded-lg border border-rose-800/60 bg-rose-950/40 px-3 py-2 text-xs font-bold text-rose-300 hover:bg-rose-900/60 hover:text-white transition"
                              title="Rejeitar e excluir"
                            >
                              <X size={14} /> Rejeitar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. GRADE DE GESTÃO: FORMULÁRIO DE CADASTRO + LISTA DE APROVADAS */}
                <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
                  {/* Formulário Nova Avaliação */}
                  <div className="surface-card rounded-xl p-6 border border-slate-800">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Plus size={18} className="text-brand-400" />
                      <h2 className="font-display text-base font-bold text-white">
                        Cadastrar Avaliação Direta (Admin)
                      </h2>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      Avaliações cadastradas pelo painel já nascem publicadas e visíveis no site.
                    </p>

                    <form onSubmit={handleAddTestimonial} className="mt-5 space-y-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Cliente / Empresa *
                        </label>
                        <input
                          type="text"
                          required
                          value={newTestimonial.client}
                          onChange={(e) =>
                            setNewTestimonial({ ...newTestimonial, client: e.target.value })
                          }
                          placeholder="Ex: RocketFit"
                          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            Cargo / Segmento
                          </label>
                          <input
                            type="text"
                            value={newTestimonial.role}
                            onChange={(e) =>
                              setNewTestimonial({ ...newTestimonial, role: e.target.value })
                            }
                            placeholder="Ex: Academia & Fitness"
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            Tipo de Projeto
                          </label>
                          <select
                            value={newTestimonial.projectType}
                            onChange={(e) =>
                              setNewTestimonial({
                                ...newTestimonial,
                                projectType: e.target.value,
                              })
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                          >
                            <option value="Landing Page">Landing Page</option>
                            <option value="Site Institucional">Site Institucional</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Site Delivery">Site Delivery</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Nota da Avaliação
                        </label>
                        <StarRatingInput
                          value={newTestimonial.rating}
                          onChange={(val) =>
                            setNewTestimonial({ ...newTestimonial, rating: val })
                          }
                          size={22}
                          allowHalf={true}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Texto da Avaliação *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={newTestimonial.quote}
                          onChange={(e) =>
                            setNewTestimonial({ ...newTestimonial, quote: e.target.value })
                          }
                          placeholder="O que o cliente achou da entrega e do resultado?"
                          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="touch-target flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 py-2.5 text-xs font-bold text-white hover:bg-brand-500 transition"
                      >
                        <Plus size={16} /> ADICIONAR E PUBLICAR
                      </button>
                    </form>
                  </div>

                  {/* Lista de Avaliações Aprovadas e Ativas */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-400" />
                        <h3 className="font-display text-sm font-bold text-slate-200">
                          Avaliações Publicadas no Site ({approvedList.length})
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate("depoimentos", "/depoimentos")}
                        className="flex items-center gap-1 text-xs text-brand-400 hover:underline"
                      >
                        Ver mural público <ExternalLink size={12} />
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                      {approvedList.length === 0 ? (
                        <div className="surface-card rounded-xl p-6 text-center border border-slate-800 text-xs text-slate-400">
                          Nenhuma avaliação publicada ainda.
                        </div>
                      ) : (
                        approvedList.map((t) => (
                          <div
                            key={t.id}
                            className="surface-card rounded-xl p-4 border border-slate-800 flex items-start justify-between gap-4"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-display text-sm font-bold text-white">
                                  {t.client}
                                </span>
                                <span className="text-[11px] font-mono text-slate-400">
                                  • {t.role}
                                </span>
                                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-400 border border-emerald-500/20">
                                  No Ar
                                </span>
                                <div className="flex items-center gap-1 ml-auto">
                                  <StarRatingDisplay rating={t.rating || 5} size={12} />
                                  <span className="font-mono text-xs font-bold text-amber-300">
                                    {Number(t.rating || 5).toFixed(1)}
                                  </span>
                                </div>
                              </div>
                              <p className="mt-2 text-xs text-slate-300 italic">
                                "{t.quote}"
                              </p>
                              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                <span>{t.projectType || "Landing Page"}</span>
                                <span>{t.date}</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteTestimonial(t.id)}
                              className="rounded-lg p-2 text-slate-500 hover:bg-rose-950/40 hover:text-rose-400 transition"
                              title="Remover avaliação"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TAB 2: PROJETOS */}
          {activeTab === "projects" && (
            <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
              {/* Formulário Novo / Editar Projeto */}
              <div id="project-form-container" className="surface-card rounded-xl p-6 border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    {editingProject ? (
                      <>
                        <Pencil size={18} className="text-amber-400" />
                        <h2 className="font-display text-base font-bold text-white">
                          Editar Projeto: <span className="text-amber-300">{editingProject.title}</span>
                        </h2>
                      </>
                    ) : (
                      <>
                        <Plus size={18} className="text-brand-400" />
                        <h2 className="font-display text-base font-bold text-white">
                          Adicionar Projeto ao Portfólio
                        </h2>
                      </>
                    )}
                  </div>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={handleCancelEditProject}
                      className="touch-target inline-flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white transition"
                    >
                      <X size={14} /> Cancelar
                    </button>
                  )}
                </div>

                <form onSubmit={editingProject ? handleSaveEditProject : handleAddProject} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Nome do Projeto *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject ? editingProject.title : newProject.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (editingProject) {
                          setEditingProject({ ...editingProject, title: val });
                        } else {
                          setNewProject({ ...newProject, title: val });
                        }
                      }}
                      placeholder="Ex: Barber Club"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Categoria
                      </label>
                      <select
                        value={editingProject ? editingProject.category : newProject.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          const filterVal =
                            val === "Landing Page"
                              ? "landing"
                              : val === "Site Institucional"
                              ? "institucional"
                              : "delivery";
                          if (editingProject) {
                            setEditingProject({
                              ...editingProject,
                              category: val,
                              categoryFilter: filterVal,
                            });
                          } else {
                            setNewProject({
                              ...newProject,
                              category: val,
                              categoryFilter: filterVal,
                            });
                          }
                        }}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                      >
                        <option value="Landing Page">Landing Page</option>
                        <option value="Site Institucional">Site Institucional</option>
                        <option value="Site Delivery">Site Delivery</option>
                        <option value="E-Commerce">E-Commerce</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Métrica em Destaque
                      </label>
                      <input
                        type="text"
                        value={editingProject ? editingProject.resultMetric : newProject.resultMetric}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingProject) {
                            setEditingProject({
                              ...editingProject,
                              resultMetric: val,
                            });
                          } else {
                            setNewProject({
                              ...newProject,
                              resultMetric: val,
                            });
                          }
                        }}
                        placeholder="Ex: +180% em orçamentos"
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      URL da Imagem de Capa
                    </label>
                    <input
                      type="url"
                      value={editingProject ? editingProject.img : newProject.img}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (editingProject) {
                          setEditingProject({ ...editingProject, img: val });
                        } else {
                          setNewProject({ ...newProject, img: val });
                        }
                      }}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Link do Site / Demonstração
                    </label>
                    <input
                      type="url"
                      value={editingProject ? editingProject.link : newProject.link}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (editingProject) {
                          setEditingProject({ ...editingProject, link: val });
                        } else {
                          setNewProject({ ...newProject, link: val });
                        }
                      }}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Tags Técnicas (separadas por vírgula)
                    </label>
                    <input
                      type="text"
                      value={editingProject ? editingProject.tags : newProject.tags}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (editingProject) {
                          setEditingProject({ ...editingProject, tags: val });
                        } else {
                          setNewProject({ ...newProject, tags: val });
                        }
                      }}
                      placeholder="React, Next.js, Tailwind"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Resumo do Projeto *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={editingProject ? editingProject.summary : newProject.summary}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (editingProject) {
                          setEditingProject({ ...editingProject, summary: val });
                        } else {
                          setNewProject({ ...newProject, summary: val });
                        }
                      }}
                      placeholder="Breve descrição da proposta e resultados."
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  {editingProject ? (
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="touch-target flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-amber-600 py-2.5 text-xs font-bold text-white hover:bg-amber-500 transition"
                      >
                        <Save size={16} /> SALVAR ALTERAÇÕES
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEditProject}
                        className="touch-target rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="touch-target flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 py-2.5 text-xs font-bold text-white hover:bg-brand-500 transition"
                    >
                      <Plus size={16} /> ADICIONAR PROJETO
                    </button>
                  )}
                </form>
              </div>

              {/* Lista de Projetos Atuais */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-slate-200">
                    Projetos no Portfólio ({projects.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() => navigate("portfolio", "/portfolio")}
                    className="flex items-center gap-1 text-xs text-brand-400 hover:underline"
                  >
                    Ver galeria <ExternalLink size={12} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className={`surface-card rounded-xl p-4 border flex items-center justify-between gap-4 transition ${
                        editingProject && editingProject.id === p.id
                          ? "border-amber-500/60 bg-amber-500/5 shadow-md shadow-amber-950/20"
                          : "border-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.img}
                          alt={p.title}
                          className="h-12 w-16 rounded-md object-cover bg-slate-950 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-display text-sm font-bold text-white truncate">
                              {p.title}
                            </h4>
                            <span className="font-mono text-[10px] text-brand-300">
                              [{p.category}]
                            </span>
                            {editingProject && editingProject.id === p.id && (
                              <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-mono font-bold text-amber-300 border border-amber-500/30">
                                Editando
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {p.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStartEditProject(p)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-amber-300 transition"
                          title="Editar projeto"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(p.id)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-rose-950/40 hover:text-rose-400 transition"
                          title="Remover projeto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTATO & REDES */}
          {activeTab === "contact" && (
            <div className="max-w-2xl">
              <div className="surface-card rounded-xl p-6 border border-slate-800">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Settings size={18} className="text-brand-400" />
                  <h2 className="font-display text-base font-bold text-white">
                    Configuração de Contato da Marca
                  </h2>
                </div>

                <form onSubmit={handleSaveContact} className="mt-5 space-y-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                      <WhatsAppIcon size={14} className="text-emerald-400" />
                      WhatsApp (Número internacional sem formatação)
                    </label>
                    <input
                      type="text"
                      value={contact.whatsappNumber}
                      onChange={(e) =>
                        setContact({ ...contact, whatsappNumber: e.target.value })
                      }
                      placeholder="5511911908314"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                      <WhatsAppIcon size={14} className="text-emerald-400" />
                      WhatsApp Formatado para Exibição
                    </label>
                    <input
                      type="text"
                      value={contact.whatsappFormatted}
                      onChange={(e) =>
                        setContact({
                          ...contact,
                          whatsappFormatted: e.target.value,
                        })
                      }
                      placeholder="(11) 91190-8314"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      E-mail Principal
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      placeholder="contato.devxsolutions@gmail.com"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={contact.instagramUrl}
                      onChange={(e) =>
                        setContact({ ...contact, instagramUrl: e.target.value })
                      }
                      placeholder="https://www.instagram.com/devxsolutions"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={contact.linkedinUrl}
                      onChange={(e) =>
                        setContact({ ...contact, linkedinUrl: e.target.value })
                      }
                      placeholder="https://www.linkedin.com/..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="touch-target flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-brand-500"
                    >
                      <Save size={16} /> SALVAR ALTERAÇÕES
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
