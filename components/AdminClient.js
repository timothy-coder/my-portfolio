"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const STORAGE_KEY = "portfolio-data-v2";
const SESSION_KEY = "portfolio-session-v1";

const tabs = [
  ["profile", "Perfil"],
  ["projects", "Proyectos"],
  ["experience", "Experiencia"],
  ["education", "Educacion"],
  ["skills", "Habilidades"],
  ["certificates", "Certificados"],
  ["languages", "Idiomas"],
  ["contact", "Contacto"],
  ["json", "JSON"]
];

export default function AdminClient({ defaultData }) {
  const [data, setData] = useState(defaultData);
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const storedSession = sessionStorage.getItem(SESSION_KEY);

    if (storedData) {
      try {
        setData(mergePortfolioData(defaultData, JSON.parse(storedData)));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsLoggedIn(storedSession === "true");
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2));
    }
  }, [data, isReady]);

  const jsonPreview = useMemo(() => JSON.stringify(data, null, 2), [data]);

  function login(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = clean(form.get("username"));
    const password = String(form.get("password") || "");

    if (username !== data.auth.username || password !== data.auth.password) {
      setLoginError("Usuario o contrasena incorrectos.");
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "true");
    setLoginError("");
    setIsLoggedIn(true);
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setIsLoggedIn(false);
    setActiveTab("profile");
  }

  function updateProfile(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setData((current) => ({
      ...current,
      profile: {
        name: clean(form.get("name")),
        role: clean(form.get("role")),
        summary: clean(form.get("summary")),
        about: clean(form.get("about")),
        metrics: {
          years: clean(form.get("years")),
          projectCount: clean(form.get("projectCount")),
          stack: clean(form.get("stack"))
        }
      }
    }));
  }

  function addProject(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    addItem("projects", {
      title: clean(values.get("title")),
      category: clean(values.get("category")),
      description: clean(values.get("description")),
      tech: splitList(values.get("tech"))
    });
    form.reset();
  }

  function addExperience(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    addItem("experience", {
      role: clean(values.get("role")),
      company: clean(values.get("company")),
      period: clean(values.get("period")),
      description: clean(values.get("description"))
    });
    form.reset();
  }

  function addEducation(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    addItem("education", {
      title: clean(values.get("title")),
      institution: clean(values.get("institution")),
      period: clean(values.get("period")),
      description: clean(values.get("description"))
    });
    form.reset();
  }

  function addSkill(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    addItem("skills", {
      group: clean(values.get("group")),
      items: splitList(values.get("items"))
    });
    form.reset();
  }

  function addCertificate(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    addItem("certificates", {
      title: clean(values.get("title")),
      issuer: clean(values.get("issuer")),
      period: clean(values.get("period")),
      description: clean(values.get("description"))
    });
    form.reset();
  }

  function addLanguage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    addItem("languages", {
      name: clean(values.get("name")),
      level: clean(values.get("level")),
      institution: clean(values.get("institution"))
    });
    form.reset();
  }

  function addContact(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    addItem("contact", {
      label: clean(values.get("label")),
      value: clean(values.get("value")),
      href: clean(values.get("href"))
    });
    form.reset();
  }

  function addItem(collection, item) {
    setData((current) => ({
      ...current,
      [collection]: [item, ...(current[collection] || [])]
    }));
  }

  function deleteItem(collection, index) {
    setData((current) => ({
      ...current,
      [collection]: (current[collection] || []).filter((_, itemIndex) => itemIndex !== index)
    }));
  }

  function resetData() {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "profile.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function importJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        setData(JSON.parse(String(reader.result)));
      } catch {
        alert("El archivo no contiene un JSON valido.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div className="admin-brand-title">
          <img className="brand-logo" src="/logo.jpg" alt="Logo Nicolas Portfolio" />
          <div>
            <p className="eyebrow">Portal privado</p>
            <h1>Administrador</h1>
          </div>
        </div>
        <Button asChild variant="secondary">
          <a href="/">Ver portafolio</a>
        </Button>
      </header>

      {!isLoggedIn ? (
        <Card className="admin-card">
          <form className="login-form" onSubmit={login}>
            <Label>
              Usuario
              <Input name="username" autoComplete="username" required />
            </Label>
            <Label>
              Contrasena
              <Input name="password" type="password" autoComplete="current-password" required />
            </Label>
            <Button type="submit">Iniciar sesion</Button>
            <p className="form-note">
              Demo local: usuario <strong>admin</strong>, contrasena <strong>admin123</strong>.
            </p>
            {loginError && (
              <p className="error-message" role="alert">
                {loginError}
              </p>
            )}
          </form>
        </Card>
      ) : (
        <section className="admin-workspace">
          <aside className="admin-sidebar">
            <div className="segmented vertical" role="tablist" aria-label="Secciones editables">
              {tabs.map(([id, label]) => (
                <Button
                  className={activeTab === id ? "active" : ""}
                  type="button"
                  key={id}
                  variant="ghost"
                  onClick={() => setActiveTab(id)}
                >
                  {label}
                </Button>
              ))}
            </div>
            <Button variant="secondary" type="button" onClick={logout}>
              Salir
            </Button>
          </aside>

          <Card className="admin-card">
            {activeTab === "profile" && <ProfileForm profile={data.profile} onSubmit={updateProfile} />}
            {activeTab === "projects" && (
              <CollectionForm type="projects" items={data.projects} onSubmit={addProject} onDelete={deleteItem} />
            )}
            {activeTab === "experience" && (
              <CollectionForm type="experience" items={data.experience} onSubmit={addExperience} onDelete={deleteItem} />
            )}
            {activeTab === "education" && (
              <CollectionForm type="education" items={data.education} onSubmit={addEducation} onDelete={deleteItem} />
            )}
            {activeTab === "skills" && (
              <CollectionForm type="skills" items={data.skills} onSubmit={addSkill} onDelete={deleteItem} />
            )}
            {activeTab === "certificates" && (
              <CollectionForm
                type="certificates"
                items={data.certificates || []}
                onSubmit={addCertificate}
                onDelete={deleteItem}
              />
            )}
            {activeTab === "languages" && (
              <CollectionForm
                type="languages"
                items={data.languages || []}
                onSubmit={addLanguage}
                onDelete={deleteItem}
              />
            )}
            {activeTab === "contact" && (
              <CollectionForm type="contact" items={data.contact} onSubmit={addContact} onDelete={deleteItem} />
            )}
            {activeTab === "json" && (
              <section className="admin-form">
                <div className="json-actions">
                  <Button type="button" onClick={exportJson}>
                    Exportar JSON
                  </Button>
                  <Label className="file-button">
                    Importar JSON
                    <Input type="file" accept="application/json" onChange={importJson} />
                  </Label>
                  <Button variant="secondary" type="button" onClick={resetData}>
                    Restaurar datos
                  </Button>
                </div>
                <Textarea value={jsonPreview} rows={16} spellCheck="false" readOnly />
              </section>
            )}
          </Card>
        </section>
      )}
    </main>
  );
}

function ProfileForm({ profile, onSubmit }) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <AdminTitle title="Perfil publico" text="Edita la informacion principal que aparece en la portada." />
      <Label>
        Nombre
        <Input name="name" required defaultValue={profile.name} />
      </Label>
      <Label>
        Rol
        <Input name="role" required defaultValue={profile.role} />
      </Label>
      <Label>
        Resumen
        <Textarea name="summary" rows={3} required defaultValue={profile.summary} />
      </Label>
      <Label>
        Sobre mi
        <Textarea name="about" rows={4} required defaultValue={profile.about} />
      </Label>
      <div className="form-grid">
        <Label>
          Anios
          <Input name="years" required defaultValue={profile.metrics.years} />
        </Label>
        <Label>
          Proyectos
          <Input name="projectCount" required defaultValue={profile.metrics.projectCount} />
        </Label>
        <Label>
          Perfil tecnico
          <Input name="stack" required defaultValue={profile.metrics.stack} />
        </Label>
      </div>
      <Button type="submit">Guardar perfil</Button>
    </form>
  );
}

function CollectionForm({ type, items, onSubmit, onDelete }) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <AdminTitle title={sectionTitles[type]} text={sectionTexts[type]} />
      {type === "projects" && (
        <>
          <div className="form-grid">
            <Label>
              Titulo
              <Input name="title" required />
            </Label>
            <Label>
              Categoria
              <Input name="category" required />
            </Label>
          </div>
          <Label>
            Descripcion
            <Textarea name="description" rows={3} required />
          </Label>
          <Label>
            Tecnologias
            <Input name="tech" placeholder="React, Node.js, PostgreSQL" required />
          </Label>
        </>
      )}

      {type === "experience" && (
        <>
          <div className="form-grid">
            <Label>
              Cargo
              <Input name="role" required />
            </Label>
            <Label>
              Empresa
              <Input name="company" required />
            </Label>
            <Label>
              Periodo
              <Input name="period" required />
            </Label>
          </div>
          <Label>
            Descripcion
            <Textarea name="description" rows={3} required />
          </Label>
        </>
      )}

      {type === "education" && (
        <>
          <div className="form-grid">
            <Label>
              Titulo
              <Input name="title" required />
            </Label>
            <Label>
              Institucion
              <Input name="institution" required />
            </Label>
            <Label>
              Periodo
              <Input name="period" required />
            </Label>
          </div>
          <Label>
            Descripcion
            <Textarea name="description" rows={3} required />
          </Label>
        </>
      )}

      {type === "skills" && (
        <div className="form-grid two-fields">
          <Label>
            Grupo
            <Input name="group" required />
          </Label>
          <Label>
            Habilidades
            <Input name="items" placeholder="Java, Python, SQL" required />
          </Label>
        </div>
      )}

      {type === "certificates" && (
        <>
          <div className="form-grid">
            <Label>
              Certificado
              <Input name="title" required />
            </Label>
            <Label>
              Emisor
              <Input name="issuer" required />
            </Label>
            <Label>
              Fecha
              <Input name="period" required />
            </Label>
          </div>
          <Label>
            Descripcion
            <Textarea name="description" rows={3} required />
          </Label>
        </>
      )}

      {type === "languages" && (
        <div className="form-grid">
          <Label>
            Idioma
            <Input name="name" required />
          </Label>
          <Label>
            Nivel
            <Input name="level" required />
          </Label>
          <Label>
            Institucion
            <Input name="institution" required />
          </Label>
        </div>
      )}

      {type === "contact" && (
        <div className="form-grid">
          <Label>
            Etiqueta
            <Input name="label" placeholder="Email" required />
          </Label>
          <Label>
            Valor visible
            <Input name="value" placeholder="nicolas@example.com" required />
          </Label>
          <Label>
            Enlace
            <Input name="href" placeholder="mailto:nicolas@example.com" required />
          </Label>
        </div>
      )}

      <Button type="submit">Agregar</Button>

      <div className="editable-list">
        {items.map((item, index) => (
          <Card className="editable-item" key={`${type}-${index}`}>
            <div>
              <strong>{itemTitle(type, item)}</strong>
              <p>{itemDescription(type, item)}</p>
            </div>
            <Button variant="destructive" type="button" title="Eliminar" onClick={() => onDelete(type, index)}>
              X
            </Button>
          </Card>
        ))}
      </div>
    </form>
  );
}

function AdminTitle({ title, text }) {
  return (
    <CardHeader className="admin-section-title">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{text}</CardDescription>
    </CardHeader>
  );
}

const sectionTitles = {
  projects: "Proyectos",
  experience: "Experiencia",
  education: "Educacion",
  skills: "Habilidades",
  certificates: "Certificados",
  languages: "Idiomas",
  contact: "Contacto"
};

const sectionTexts = {
  projects: "Agrega proyectos con categoria, descripcion y tecnologias separadas por coma.",
  experience: "Registra cargos, empresas, periodos y responsabilidades principales.",
  education: "Agrega estudios, cursos o certificaciones relevantes.",
  skills: "Crea grupos de habilidades con elementos separados por coma.",
  certificates: "Registra certificaciones, cursos y constancias relevantes.",
  languages: "Agrega idiomas, nivel e institucion donde los estudiaste.",
  contact: "Administra enlaces publicos de contacto."
};

function itemTitle(type, item) {
  if (type === "projects") return item.title;
  if (type === "experience") return `${item.role} - ${item.company}`;
  if (type === "education") return item.title;
  if (type === "skills") return item.group;
  if (type === "certificates") return item.title;
  if (type === "languages") return `${item.name} - ${item.level}`;
  return item.label;
}

function itemDescription(type, item) {
  if (type === "projects") return item.description;
  if (type === "experience") return item.period;
  if (type === "education") return `${item.institution} - ${item.period}`;
  if (type === "skills") return item.items.join(", ");
  if (type === "certificates") return `${item.issuer} - ${item.period}`;
  if (type === "languages") return item.institution;
  return item.value;
}

function clean(value) {
  return String(value || "").trim();
}

function splitList(value) {
  return clean(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function mergePortfolioData(defaultData, storedData) {
  return {
    ...defaultData,
    ...storedData,
    profile: {
      ...defaultData.profile,
      ...storedData.profile,
      metrics: {
        ...defaultData.profile.metrics,
        ...storedData.profile?.metrics
      }
    },
    projects: storedData.projects || defaultData.projects,
    experience: storedData.experience || defaultData.experience,
    education: storedData.education || defaultData.education,
    skills: storedData.skills || defaultData.skills,
    certificates: storedData.certificates || defaultData.certificates,
    languages: storedData.languages || defaultData.languages,
    contact: storedData.contact || defaultData.contact
  };
}
