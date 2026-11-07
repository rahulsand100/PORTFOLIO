const sections = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Education", "education"],
  ["Contact", "contact"],
];

export default function Navbar() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="brand" href="#home">
        Rahul.
      </a>
      <div className="nav-links">
        {sections.map(([label, id]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
