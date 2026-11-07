import { BriefcaseBusiness, CodeXml, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section className="content-section contact" id="contact">
      <span className="section-tag">LET'S CONNECT</span>
      <h2>Let's Build Something <span>Amazing</span></h2>

      <p>
        Interested in AI, development or collaboration?
        Let's connect.
      </p>

      <a href="mailto:your-email@example.com">
        <Mail size={18} /> Email Me
      </a>

      <div className="social-links">
        <a href="https://github.com/rahulsand100">
          <CodeXml />
          GitHub
        </a>

        <a href="https://www.linkedin.com/">
          <BriefcaseBusiness />
          LinkedIn
        </a>
      </div>
    </section>
  );
}