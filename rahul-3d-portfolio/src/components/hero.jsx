import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CodeXml,
  Download,
  Sparkles,
} from "lucide-react";

import Scene3D from "./Scene3D";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="hello-badge">
          👋 Hello, I'm Rahul
        </span>

        <h1>
          Building the
          <span> Future with AI.</span>
        </h1>

        <h2>AI Engineer & Full Stack Developer</h2>

        <p>
          I'm a B.Tech Data Science student passionate
          about Artificial Intelligence, Generative AI,
          and building intelligent digital experiences.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="primary-btn">
            Explore Projects <ArrowRight size={18} />
          </a>

          <a href="/resume.pdf" download className="secondary-btn">
            <Download size={17} /> Resume
          </a>
        </div>
        <img
          src="/images/rahul-cartoon-workspace.png"
          alt="Rahul Sand - 3D Cartoon Developer"
          className="cartoon-avatar"
        />

        <div className="social-links">
          <a
            href="https://github.com/rahulsand100"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <CodeXml size={18} />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <BriefcaseBusiness size={18} />
            LinkedIn
          </a>
        </div>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="visual-glow" />

        <div className="scene-label">
          <Sparkles size={15} /> My Creative Workspace
        </div>

        <Scene3D />
      </motion.div>

    </section>
  );
}