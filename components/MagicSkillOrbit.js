const orbitItems = [
  { label: "HTML", short: "H", ring: "outer", delay: "0s" },
  { label: "CSS", short: "C", ring: "outer", delay: "-2s" },
  { label: "Next.js", short: "N", ring: "outer", delay: "-4s" },
  { label: "Python", short: "Py", ring: "outer", delay: "-6s" },
  { label: "MySQL", short: "SQL", ring: "outer", delay: "-8s" },
  { label: "MariaDB", short: "DB", ring: "outer", delay: "-10s" },
  { label: "APIs", short: "API", ring: "inner", delay: "-1s" },
  { label: "ERP", short: "ERP", ring: "inner", delay: "-3s" },
  { label: "Scrum", short: "SC", ring: "inner", delay: "-5s" },
  { label: "DevOps", short: "DO", ring: "inner", delay: "-7s" },
  { label: "Windows", short: "Win", ring: "inner", delay: "-9s" },
  { label: "Excel", short: "XL", ring: "inner", delay: "-11s" }
];

export default function MagicSkillOrbit({ skills }) {
  const featuredSkills = skills.flatMap((skill) => skill.items).slice(0, 18);

  return (
    <div className="magic-skills" aria-label="Visualizacion de habilidades tecnicas">
      <div className="magic-orbit" aria-hidden="true">
        <div className="orbit-line orbit-line-outer" />
        <div className="orbit-line orbit-line-inner" />
        <div className="orbit-line orbit-line-tilt" />

        <div className="magic-core">
          <img src="/logo.jpg" alt="" />
          <span>NB</span>
        </div>

        {orbitItems.map((item, index) => (
          <div
            className={`orbit-path orbit-path-${item.ring}`}
            style={{ "--orbit-delay": item.delay, "--orbit-index": index }}
            key={item.label}
          >
            <div className="orbit-node">
              <strong>{item.short}</strong>
              <span>{item.label}</span>
            </div>
          </div>
        ))}
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
