import {
  projects as defaultProjects,
  testimonials as defaultTestimonials,
  contactInfo as defaultContactInfo,
} from "../data/siteData";

const STORAGE_KEYS = {
  PROJECTS: "devx_projects_v1",
  TESTIMONIALS: "devx_testimonials_v1",
  CONTACT: "devx_contact_v1",
};

// Dispatch event so other components can re-render in real time
const notifyChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("devx_storage_updated"));
  }
};

/* --- TESTIMONIALS (AVALIAÇÕES) --- */

// Helper para normalizar itens
const normalizeTestimonial = (item, idx) => ({
  id: item.id || `review-${idx}-${Date.now()}`,
  client: item.client || "Cliente",
  role: item.role || "Cliente DEVX",
  quote: item.quote || "",
  rating: Number(item.rating) || 5,
  projectType: item.projectType || "Landing Page",
  status: item.status || "approved", // itens antigos/padrão já vêm aprovados
  date:
    item.date ||
    new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    }),
});

export const getStoredTestimonials = () => {
  if (typeof window === "undefined") return defaultTestimonials;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (!raw) {
      const normalized = defaultTestimonials.map(normalizeTestimonial);
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(normalized));
      return normalized;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeTestimonial) : defaultTestimonials;
  } catch (err) {
    console.error("Erro ao carregar avaliações do localStorage:", err);
    return defaultTestimonials;
  }
};

export const getApprovedTestimonials = () => {
  const all = getStoredTestimonials();
  return all.filter((t) => t.status === "approved");
};

export const getPendingTestimonials = () => {
  const all = getStoredTestimonials();
  return all.filter((t) => t.status === "pending");
};

export const saveTestimonials = (list) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(list));
    notifyChange();
  } catch (err) {
    console.error("Erro ao salvar avaliações:", err);
  }
};

export const addTestimonial = (testimonial, isApproved = false) => {
  const current = getStoredTestimonials();
  const newItem = {
    id: "review-" + Date.now(),
    client: testimonial.client || "Cliente",
    role: testimonial.role || "Cliente DEVX Solutions",
    quote: testimonial.quote || "",
    rating: Number(testimonial.rating) || 5,
    projectType: testimonial.projectType || "Landing Page",
    status: isApproved ? "approved" : "pending",
    date: new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    ...testimonial,
    // Garante que o status passado pelo argumento ou por formulário seja respeitado
    ...(testimonial.status ? { status: testimonial.status } : { status: isApproved ? "approved" : "pending" }),
  };
  const updated = [newItem, ...current];
  saveTestimonials(updated);
  return updated;
};

export const approveTestimonial = (id) => {
  const current = getStoredTestimonials();
  const updated = current.map((t) => (t.id === id ? { ...t, status: "approved" } : t));
  saveTestimonials(updated);
  return updated;
};

export const rejectTestimonial = (id) => {
  const current = getStoredTestimonials();
  const updated = current.filter((t) => t.id !== id);
  saveTestimonials(updated);
  return updated;
};

export const deleteTestimonial = (identifier) => {
  const current = getStoredTestimonials();
  const updated = typeof identifier === "number"
    ? current.filter((_, i) => i !== identifier)
    : current.filter((t) => t.id !== identifier);
  saveTestimonials(updated);
  return updated;
};

/* --- PROJECTS --- */
export const getStoredProjects = () => {
  if (typeof window === "undefined") return defaultProjects;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaultProjects));
      return defaultProjects;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erro ao ler projetos do localStorage:", err);
    return defaultProjects;
  }
};

export const saveProjects = (list) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(list));
    notifyChange();
  } catch (err) {
    console.error("Erro ao salvar projetos:", err);
  }
};

export const addProject = (project) => {
  const current = getStoredProjects();
  const newItem = {
    id: project.id || "proj-" + Date.now(),
    title: project.title || "Novo Projeto",
    category: project.category || "Landing Page",
    categoryFilter: project.categoryFilter || "landing",
    summary: project.summary || "",
    resultMetric: project.resultMetric || "Demonstração",
    img:
      project.img ||
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
    tags: Array.isArray(project.tags)
      ? project.tags
      : (project.tags || "React, Tailwind").split(",").map((s) => s.trim()),
    link: project.link ? project.link.trim() : "",
  };
  const updated = [newItem, ...current];
  saveProjects(updated);
  return updated;
};

export const updateProject = (id, updatedFields) => {
  const current = getStoredProjects();
  const updated = current.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
  saveProjects(updated);
  return updated;
};

export const deleteProject = (id) => {
  const current = getStoredProjects();
  const updated = current.filter((p) => p.id !== id);
  saveProjects(updated);
  return updated;
};

/* --- CONTACT INFO --- */
export const getStoredContactInfo = () => {
  if (typeof window === "undefined") return defaultContactInfo;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACT);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(defaultContactInfo));
      return defaultContactInfo;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erro ao carregar contato:", err);
    return defaultContactInfo;
  }
};

export const saveContactInfo = (info) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(info));
    notifyChange();
  } catch (err) {
    console.error("Erro ao salvar contato:", err);
  }
};

/* --- RESTORE DEFAULTS --- */
export const resetToDefaults = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.CONTACT);
    notifyChange();
  } catch (err) {
    console.error("Erro ao restaurar dados padrão:", err);
  }
};
