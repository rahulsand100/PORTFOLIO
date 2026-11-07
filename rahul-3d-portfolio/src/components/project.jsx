const projects = [
  {
    name: "MindMate AI",
    category: "Artificial Intelligence",
    description:
      "An AI-powered application designed to provide intelligent user assistance.",
    tech: "AI • Python • LLM",
  },
  {
    name: "Mukta Fancy Store",
    category: "Full Stack Development",
    description:
      "An e-commerce platform for a local clothing business.",
    tech: "React • Node.js • MongoDB",
  },
  {
    name: "AgriWaste Exchange",
    category: "AI & Social Impact",
    description:
      "A platform concept connecting agricultural waste suppliers and potential buyers.",
    tech: "MERN • AI",
  },
];

export default function Projects() {
  return (
    <section className="content-section" id="projects">
      <span className="section-tag">MY WORK</span>
      <h2>Featured <span>Projects</span></h2>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <span>{project.category}</span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <small>{project.tech}</small>
          </article>
        ))}
      </div>
    </section>
  );
}