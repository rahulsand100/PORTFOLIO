const skills = [
  "Python",
  "JavaScript",
  "C++",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Three.js",
  "Generative AI",
  "LangChain",
  "LangGraph",
  "RAG",
  "Git & GitHub",
];

export default function Skills() {
  return (
    <section className="content-section" id="skills">
      <span className="section-tag">MY TECH STACK</span>
      <h2>Skills & <span>Technologies</span></h2>

      <div className="skill-grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill}>
            ✦ {skill}
          </div>
        ))}
      </div>
    </section>
  );
}