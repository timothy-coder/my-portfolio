const orbitItems = [
  {
    label: "HTML",
    short: "H",
    ring: "outer",
    delay: "0s",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },
  {
    label: "CSS",
    short: "C",
    ring: "outer",
    delay: "-2s",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  },
  {
    label: "Next.js",
    short: "N",
    ring: "outer",
    delay: "-4s",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
  },
  {
    label: "Python",
    short: "Py",
    ring: "outer",
    delay: "-6s",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    label: "MySQL",
    short: "SQL",
    ring: "outer",
    delay: "-8s",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },
  {
    label: "MariaDB",
    short: "DB",
    ring: "outer",
    delay: "-10s",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg"
  },
  {
    label: "APIs",
    short: "API",
    ring: "inner",
    delay: "-1s",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
  },
  { label: "ERP", short: "ERP", ring: "inner", delay: "-3s" },
  { label: "Scrum", short: "SC", ring: "inner", delay: "-5s" },
  {
    label: "DevOps",
    short: "DO",
    ring: "inner",
    delay: "-7s",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg"
  },
  {
    label: "Windows",
    short: "Win",
    ring: "inner",
    delay: "-9s",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"
  },
  { label: "Excel", short: "XL", ring: "inner", delay: "-11s" }
];

export default function MagicSkillOrbit({ skills }) {
  const featuredSkills = skills.flatMap((skill) => skill.items).slice(0, 18);

  return (
    <div className="magic-skills" aria-label="Visualizacion de habilidades tecnicas">
      <div className="magic-orbit" aria-hidden="true">
        <div className="magic-logo-grid">
          {orbitItems.map((item) => (
            <div className="orbit-node" key={item.label}>
              {item.icon ? <img src={item.icon} alt="" /> : <strong>{item.short}</strong>}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="magic-stage">
          <div className="orbit-line orbit-line-outer" />
          <div className="orbit-line orbit-line-inner" />
          <div className="orbit-line orbit-line-tilt" />

          <div className="magic-core">
            <span className="magic-core-logo">
              <img src="/logo.jpg" alt="" />
            </span>
            <span>NB</span>
          </div>
        </div>
      </div>

      <div className="magic-skill-panel">
        <p className="eyebrow">Tech Stack</p>
        <h3>Herramientas y conocimientos aplicados</h3>
        <div className="magic-skill-cloud">
          {featuredSkills.map((item, index) => (
            <span className="magic-skill-chip" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
