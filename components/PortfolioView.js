import { Button } from "./ui/button";
import { Card } from "./ui/card";
import MagicSkillOrbit from "./MagicSkillOrbit";
import TypewriterRole from "./TypewriterRole";

export default function PortfolioView({ data }) {
  const profile = data.profile;

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <img className="brand-logo" src="/logo.jpg" alt="Logo Nicolas Portfolio" />
          <span>
            <strong>Nicolas Portfolio</strong>
            <small>Systems Engineer</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Navegacion principal">
          <a href="#proyectos">Proyectos</a>
          <a href="#experiencia">Experiencia</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#certificados">Certificados</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <h1>{profile.name}</h1>
            <TypewriterRole />
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-actions">
              <Button asChild>
                <a href="#proyectos">Ver proyectos</a>
              </Button>
              <Button asChild variant="secondary">
                <a href="#contacto">Contactar</a>
              </Button>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Resumen profesional">
            <Metric value={profile.metrics.years} label="Años construyendo software" />
            <Metric value={profile.metrics.projectCount} label="Proyectos destacados" />
            <Metric value={profile.metrics.stack} label="Perfil técnico" />
          </aside>
        </section>

        <section className="section-band about">
          <div className="section-header">
            <p className="eyebrow">Perfil</p>
            <h2>Ingeniería aplicada a problemas reales</h2>
          </div>
          <p>{profile.about}</p>
        </section>

        <section className="content-section" id="proyectos">
          <div className="section-header">
            <p className="eyebrow">Trabajo</p>
            <h2>Proyectos</h2>
          </div>
          <div className="card-grid">
            {data.projects.map((project) => (
              <Card className="project-card" key={`${project.title}-${project.category}`}>
                <div>
                  <p className="category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <TagRow items={project.tech} />
              </Card>
            ))}
          </div>
        </section>

        <section className="content-section experience-showcase" id="experiencia">
          <div className="section-header centered">
            <p className="eyebrow">Ruta profesional</p>
            <h2>Experiencia laboral</h2>
          </div>
          <div className="experience-grid">
            {data.experience.map((item, index) => (
              <Card className="experience-card" tabIndex={0} key={`${item.role}-${item.period}`}>
                <div className="experience-icon" aria-hidden="true">
                  {index === 0 ? "ERP" : index === 1 ? "CFG" : index === 2 ? "TIC" : "INF"}
                </div>
                <div>
                  <p className="period">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="experience-company">{item.company}</p>
                  <p>{item.description}</p>
                  <span className="learn-more">Ver detalle {"->"}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="content-section education-section">
          <div className="section-header">
            <p className="eyebrow">Formación</p>
            <h2>Educación</h2>
          </div>
          <div className="timeline compact">
            {data.education.map((item) => (
              <Card className="timeline-item" key={`${item.title}-${item.period}`}>
                <p className="period">{item.period}</p>
                <h3>{item.title}</h3>
                <p>{item.institution}</p>
                <p>{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="content-section skills-section" id="habilidades">
          <div className="section-header">
            <p className="eyebrow">Stack</p>
            <h2>Habilidades técnicas</h2>
          </div>
          <MagicSkillOrbit skills={data.skills} />
          <div className="skills-layout">
            {data.skills.map((skill) => (
              <Card className="skill-card" key={skill.group}>
                <h3>{skill.group}</h3>
                <ul>
                  {skill.items.map((item) => (
                    <li className="tag" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="content-section two-column" id="certificados">
          <div>
            <div className="section-header">
              <p className="eyebrow">Certificaciones</p>
              <h2>Certificados</h2>
            </div>
            <div className="timeline">
              {(data.certificates || []).map((item) => (
                <Card className="timeline-item" key={`${item.title}-${item.issuer}`}>
                  <p className="period">{item.period}</p>
                  <h3>{item.title}</h3>
                  <p>{item.issuer}</p>
                  <p>{item.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="section-header">
              <p className="eyebrow">Idiomas</p>
              <h2>Idiomas</h2>
            </div>
            <div className="timeline compact">
              {(data.languages || []).map((item) => (
                <Card className="timeline-item" key={`${item.name}-${item.institution}`}>
                  <p className="period">{item.level}</p>
                  <h3>{item.name}</h3>
                  <p>{item.institution}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-band" id="contacto">
          <div>
            <p className="eyebrow">Contacto</p>
            <h2>Conversemos sobre tecnología, producto o automatización.</h2>
          </div>
          <div className="contact-links">
            {data.contact.map((item) => (
              <a className="contact-link" href={item.href} target="_blank" rel="noreferrer" key={item.href}>
                <span>{item.label}</span>
                <span>{item.value}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function Metric({ value, label }) {
  return (
    <div>
      <span className="metric">{value}</span>
      <small>{label}</small>
    </div>
  );
}

function TagRow({ items }) {
  return (
    <div className="tag-row">
      {items.map((item) => (
        <span className="tag" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

function firstName(name) {
  return String(name || "").trim().split(/\s+/)[0] || "Portfolio";
}
