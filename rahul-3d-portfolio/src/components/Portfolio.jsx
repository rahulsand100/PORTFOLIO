import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import SoftHero from "./SoftHero";
import DoorwayNav from "./DoorwayNav";
import { playDoorSound } from "../uiSounds";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Braces,
  Code2,
  Cpu,
  Database,
  Layers3,
  Mail,
  Network,
  Phone,
  Rocket,
  ShoppingCart,
  Send,
  Terminal,
} from "lucide-react";

const skillGroups = [
  {
    name: "Agentic AI",
    icon: Network,
    description: "Autonomous workflows that reason, use tools, and coordinate agents.",
    items: ["Agentic AI", "Multi-Agent Systems", "Tool Calling", "Prompt Engineering"],
  },
  {
    name: "RAG & LLMs",
    icon: Database,
    description: "Retrieval and language-model techniques for grounded answers.",
    items: ["Generative AI", "Large Language Models", "RAG", "Embeddings", "Semantic Search", "Vector Search"],
  },
  {
    name: "AI Frameworks & APIs",
    icon: Atom,
    description: "Frameworks and model APIs used across AI projects.",
    items: ["LangChain", "LangGraph", "OpenAI Agents SDK", "Hugging Face", "OpenAI API", "Gemini API"],
  },
  {
    name: "Languages & Backend",
    icon: Terminal,
    description: "Programming languages, web services, and REST APIs.",
    items: ["Python", "Java", "JavaScript", "FastAPI", "Node.js", "Express.js", "REST APIs"],
  },
  {
    name: "Databases & Search",
    icon: Database,
    description: "Persistent storage and vector retrieval technologies.",
    items: ["MongoDB", "MySQL", "PostgreSQL", "ChromaDB", "FAISS"],
  },
  {
    name: "Frontend, Web & Tools",
    icon: Code2,
    description: "Responsive interfaces, site quality, and everyday developer tools.",
    items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Responsive Web Design", "UI/UX", "WordPress", "Website Maintenance", "Performance Optimization", "Basic SEO", "Git", "GitHub", "VS Code", "Postman"],
  },
];

const projects = [
  {
    number: "01",
    type: "MULTI-AGENT AI · AGRICULTURE",
    title: "AgriWaste Exchange",
    description:
      "A multi-agent platform that classifies crop residue, discovers nearby buyer demand, estimates indicative value, and coordinates pickup requests. Built as a Build with Bharat 4.0 hackathon MVP; buyer records and prices are illustrative demo data.",
    tags: ["React", "Express", "PostgreSQL", "Multi-agent AI"],
    icon: Layers3,
    github: "https://github.com/rahulsand100/agriwaste-exchange",
  },
  {
    number: "02",
    type: "GENERATIVE AI · OPEN-SOURCE FORK",
    title: "Inkloom",
    description:
      "An early-access brand identity platform exploring AI-assisted brand analysis, typography, symbol construction, and logo composition. Logo generation is not live yet; this repository is an open-source fork.",
    tags: ["TypeScript", "React", "Cloudflare Workers", "Brand systems"],
    icon: Atom,
    github: "https://github.com/rahulsand100/inkloom",
    website: "https://inkloom.art/",
    websiteLabel: "Early access",
  },
  {
    number: "03",
    type: "AI WELLNESS · GEMINI",
    title: "MindMate AI",
    description:
      "An AI emotional-support companion with Gemini chat, mood tracking and history, visual emotion analysis, voice interaction, and crisis-support features. Built as a personal wellness project, not a replacement for professional care.",
    tags: ["Gemini AI", "React", "TypeScript", "Express"],
    icon: Cpu,
    github: "https://github.com/rahulsand100/MindMateAI",
  },
  {
    number: "04",
    type: "E-COMMERCE · FULL-STACK",
    title: "Mukta Fancy Store",
    description:
      "A garments storefront with product and category pages, featured collections, search, cart, wishlist, checkout, and WhatsApp contact.",
    tags: ["React", "Tailwind CSS", "E-commerce", "Checkout"],
    icon: ShoppingCart,
    github: "https://github.com/rahulsand100/MUKTA-FANCY-STORE",
  },
  {
    number: "05",
    type: "PERSONAL BUILD · 2025",
    title: "Multi-Agent AI Assistant",
    description:
      "A modular assistant built with persistent memory, dynamic tool use, and autonomous task orchestration across specialized agents.",
    tags: ["Python", "LangGraph", "LangChain", "Gemini API"],
    icon: Network,
  },
  {
    number: "06",
    type: "PERSONAL BUILD · 2025",
    title: "RAG-Based Document Chatbot",
    description:
      "A document Q&A pipeline using semantic chunking, ChromaDB vector indexing, and hybrid retrieval for grounded answers.",
    tags: ["Python", "LangChain", "ChromaDB", "Gemini API"],
    icon: Database,
  },
  {
    number: "07",
    type: "PERSONAL BUILD · 2025",
    title: "AI Research Assistant",
    description:
      "An LLM research workflow that synthesizes information from multiple sources into structured, actionable reports.",
    tags: ["Python", "LangChain", "Gemini API"],
    icon: Cpu,
  },
  {
    number: "08",
    type: "PERSONAL BUILD · 2024",
    title: "MERN Authentication System",
    description:
      "A full-stack authentication platform with JWT, role-based access control, and MongoDB-backed user persistence.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    icon: Braces,
  },
  {
    number: "09",
    type: "PERSONAL BUILD · 2024",
    title: "Student Management System",
    description:
      "A RESTful student-management API with CRUD operations, input validation, authentication middleware, and MongoDB queries.",
    tags: ["Node.js", "Express.js", "MongoDB", "REST API"],
    icon: Terminal,
  },
];

const certifications = [
  { title: "Introduction to Generative AI", issuer: "Google Cloud", year: "2025" },
  { title: "Web Development Internship", issuer: "SEO India Higherup", year: "2026" },
  { title: "Data Analytics & Visualization Job Simulation", issuer: "Accenture Forage", year: "2024" },
  { title: "Programming Fundamentals Using Python", issuer: "Infosys Springboard", year: "2024" },
  { title: "Data Science: Capstone", issuer: "HarvardX", year: "2024" },
];

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return undefined;

    const move = (event) => {
      if (dot.current) dot.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const setInteractive = (event) => {
      const target = event.target.closest("a, button, input, textarea, [data-cursor]");
      ring.current?.classList.toggle("cursor-ring--active", Boolean(target));
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", setInteractive);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", setInteractive);
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <span className="cursor-dot" ref={dot} />
      <span className="cursor-ring" ref={ring} />
    </div>
  );
}

function Counter({ value, label, suffix = "+" }) {
  const ref = useRef(null);
  const frame = useRef(0);
  const visible = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [count, setCount] = useState(() => reducedMotion ? value : 0);

  useEffect(() => {
    if (!visible || reducedMotion) return undefined;
    const start = performance.now();
    const duration = 1100;
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame.current = requestAnimationFrame(update);
    };
    frame.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame.current);
  }, [reducedMotion, value, visible]);

  return (
    <div className="stat-card" ref={ref}>
      <strong>{count}<span>{suffix}</span></strong>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, accent, detail }) {
  return (
    <div className="section-heading reveal">
      <span className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</span>
      <h2>{title} <span>{accent}</span></h2>
      {detail && <p>{detail}</p>}
    </div>
  );
}

function Navbar() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const localTime = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const localDate = now.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
  }).toUpperCase();

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Rahul, back to home" onClick={playDoorSound}>
        <span className="brand-mark">R</span>
        <span>RAHUL<span className="brand-period">.</span></span>
      </Link>
      <div className="nav-local-time" aria-label={`Local time ${localTime} India Standard Time, ${localDate}`}>
        <time>{localTime} IST</time>
        <span>{localDate} · INDIA</span>
      </div>
    </header>
  );
}

function Hero() {
  return <SoftHero />;
}

function About() {
  return (
    <section className="section about-section" id="about">
      <SectionHeading
        eyebrow="A LITTLE CONTEXT"
        title="Curiosity, meet"
        accent="engineering."
        detail="I care about building useful technology—not just impressive demos."
      />
      <div className="about-layout">
        <div className="about-copy reveal">
          <p className="about-lead">
            I&apos;m Rahul Shand, an AI developer and B.Tech CSE (Data Science) student building
            <span> agentic AI, RAG, and full-stack products.</span>
          </p>
          <p>
            I build LLM-powered applications and multi-agent workflows with LangChain,
            LangGraph, and FastAPI, alongside MERN and WordPress websites. I focus on
            connecting useful ideas to reliable systems and thoughtful interfaces.
          </p>
          <p>
            I&apos;m pursuing a B.Tech in Computer Science &amp; Engineering (Data Science)
            at KCC Institute of Technology and Management, while developing practical
            experience through personal builds and a web development internship.
          </p>
          <Link className="text-link" to="/experience" onClick={playDoorSound}>More about my journey <ArrowUpRight size={15} /></Link>
        </div>
        <div className="about-visual reveal">
          <div className="profile-frame">
            <div className="profile-frame-corner corner-tl" />
            <div className="profile-frame-corner corner-tr" />
            <div className="profile-frame-corner corner-bl" />
            <div className="profile-frame-corner corner-br" />
            <div className="profile-orbit orbit-one" />
            <div className="profile-orbit orbit-two" />
            <div className="profile-core"><Network size={48} strokeWidth={1} /></div>
            <span className="profile-coordinate">28.4744° N<br />77.5040° E</span>
            <span className="profile-caption">HUMAN-CENTERED INTELLIGENCE</span>
            <span className="profile-scanline" />
          </div>
          <div className="about-stats">
            <Counter value={9} label="PROJECT BUILDS" />
            <Counter value={25} label="TOOLS & METHODS" />
            <Counter value={2} suffix=" mo" label="ON-SITE INTERNSHIP" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [activeGroup, setActiveGroup] = useState(0);

  const moveGroup = (direction) => {
    setActiveGroup((current) => (current + direction + skillGroups.length) % skillGroups.length);
  };

  return (
    <section className="section skills-section" id="skills">
      <SectionHeading
        eyebrow="THE TOOLKIT"
        title="Ideas into"
        accent="systems."
        detail="A field guide to the models, methods, and tools I use to turn ideas into working products."
      />
      <div className="skill-carousel" role="region" aria-roledescription="carousel" aria-label="Skills by category">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          let offset = index - activeGroup;
          if (offset > skillGroups.length / 2) offset -= skillGroups.length;
          if (offset < -skillGroups.length / 2) offset += skillGroups.length;
          const distance = Math.abs(offset);

          return (
            <article
              className={`skill-card glass-card skill-carousel-card skill-card-${index + 1}`}
              key={group.name}
              aria-hidden={offset !== 0}
              aria-label={`${group.name}, field ${index + 1} of ${skillGroups.length}`}
              style={{
                "--card-x": `${offset * 54}%`,
                "--card-z": `${-distance * 110}px`,
                "--card-rotate": `${offset * -16}deg`,
                "--card-scale": `${1 - distance * 0.1}`,
                "--card-distance": distance,
                zIndex: skillGroups.length - distance,
                pointerEvents: offset === 0 ? "auto" : "none",
              }}
              onMouseMove={tiltCard}
              onMouseLeave={resetTilt}
            >
              <div className="skill-card-top">
                <span className="skill-icon"><Icon size={20} /></span>
                <span className="mono skill-index">FIELD 0{index + 1}<i> / 06</i></span>
              </div>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <div className="skill-tags">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          );
        })}
      </div>
      <div className="skill-carousel-controls">
        <button className="skill-carousel-arrow" type="button" onClick={() => moveGroup(-1)} aria-label="Previous skill group">
          <ArrowLeft size={17} />
        </button>
        <div className="skill-carousel-status" aria-live="polite">
          <span className="skill-carousel-current">{skillGroups[activeGroup].name}</span>
          <span className="skill-carousel-count mono">0{activeGroup + 1} <i>/ 0{skillGroups.length}</i></span>
        </div>
        <div className="skill-carousel-dots" aria-label="Choose a skill group">
          {skillGroups.map((group, index) => (
            <button
              className={`skill-carousel-dot${index === activeGroup ? " skill-carousel-dot-active" : ""}`}
              key={group.name}
              type="button"
              aria-label={`Show ${group.name}`}
              aria-pressed={index === activeGroup}
              onClick={() => setActiveGroup(index)}
            />
          ))}
        </div>
        <button className="skill-carousel-arrow" type="button" onClick={() => moveGroup(1)} aria-label="Next skill group">
          <ArrowRight size={17} />
        </button>
      </div>
      <div className="skills-orbit-note reveal">
        <span className="orbit-note-line" /><span>ALWAYS LEARNING · ALWAYS BUILDING</span><span className="orbit-note-line" />
      </div>
    </section>
  );
}

function tiltCard(event) {
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  card.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
  card.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
  card.style.setProperty("--glow-x", `${x * 100}%`);
  card.style.setProperty("--glow-y", `${y * 100}%`);
}

function resetTilt(event) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

function GithubMark({ size = 17 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.77 2.58 3.64 1.83.1-.73.39-1.23.7-1.51-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.11-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.22 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.24-5.1 5.52.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function LinkedinMark({ size = 18 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.88H4.96V9.33h2.97v9.55ZM6.45 8.03a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.43 10.85h-2.97v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.6V9.33h2.85v1.3h.04c.4-.75 1.37-1.55 2.82-1.55 3.01 0 3.57 1.98 3.57 4.56v5.24Z" />
    </svg>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <SectionHeading
        eyebrow="SELECTED WORK"
        title="Built to make"
        accent="an impact."
        detail="Projects from my GitHub, spanning applied AI, useful products, and experiments in progress."
      />
      <div className="project-list">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              className="project-card glass-card"
              key={project.number}
              onMouseMove={tiltCard}
              onMouseLeave={resetTilt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="project-card-glow" />
              <div className="project-number mono">{project.number}</div>
              <div className="project-main">
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div className="project-art" aria-hidden="true">
                <div className="project-art-ring" />
                <div className="project-art-core"><Icon size={38} strokeWidth={1.2} /></div>
                <span className="project-art-cross cross-a">+</span>
                <span className="project-art-cross cross-b">+</span>
                <span className="project-art-dash">— — —</span>
              </div>
              <div className={`project-actions${!project.github && !project.website ? " project-actions-empty" : ""}`}>
                {project.github && (
                  <a
                    className="project-link"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <GithubMark size={17} /><span>GitHub</span><ArrowUpRight size={15} />
                  </a>
                )}
                {project.website && (
                  <a className="project-link" href={project.website} target="_blank" rel="noreferrer">
                    <span>{project.websiteLabel}</span><ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
      <a className="all-work-link" href="https://github.com/rahulsand100" target="_blank" rel="noreferrer">
        More experiments on GitHub <ArrowUpRight size={15} />
      </a>
    </section>
  );
}

function Experience() {
  const milestones = [
    {
      date: "JUL 2024 — JUN 2028 · EXPECTED",
      title: "B.Tech · Computer Science & Engineering (Data Science)",
      place: "KCC Institute of Technology and Management",
      description: "Undergraduate study in Computer Science and Engineering with a Data Science specialization.",
      icon: Terminal,
    },
    {
      date: "AUG — SEP 2026 · ON-SITE",
      title: "Web Development Intern",
      place: "SEO India Higherup",
      description: "Developed and maintained responsive live websites with HTML, CSS, JavaScript, and WordPress. Applied UI/UX, performance optimization, and basic SEO practices, with additional exposure to agentic AI, RAG, LangChain, and LangGraph.",
      icon: Code2,
    },
    {
      date: "2025 — PRESENT · REMOTE",
      title: "AI Developer · Self-Learning & Personal Projects",
      place: "Independent projects",
      description: "Built RAG systems and multi-agent workflows for document Q&A and task automation. Developed FastAPI backends and worked on prompt engineering and vector-search pipelines.",
      icon: Network,
    },
    {
      date: "SCHOOLING",
      title: "Kendriya Vidyalaya Panisagar",
      place: "North Tripura, Tripura",
      description: "School education before beginning undergraduate study in Greater Noida.",
      icon: Braces,
    },
  ];

  return (
    <section className="section experience-section" id="experience">
      <SectionHeading
        eyebrow="THE JOURNEY"
        title="Learning by"
        accent="doing."
        detail="A work in progress—shaped by study, collaboration, and hands-on projects."
      />
      <div className="timeline">
        <span className="timeline-track" aria-hidden="true" />
        {milestones.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              className={`timeline-item${index % 2 ? " timeline-item-right" : ""}`}
              key={item.title}
              initial={{ opacity: 0, x: index % 2 ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <span className="timeline-node"><Icon size={15} /></span>
              <div className="timeline-card glass-card">
                <span className="timeline-date mono">{item.date}</span>
                <h3>{item.title}</h3>
                <span className="timeline-place">{item.place}</span>
                <p>{item.description}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
      <div className="certification-block reveal">
        <div className="certification-heading">
          <span className="eyebrow"><span className="eyebrow-mark" /> CERTIFICATIONS</span>
          <span className="mono certification-count">05 CREDENTIALS</span>
        </div>
        <div className="certification-list">
          {certifications.map((certification) => (
            <article className="certification-item" key={certification.title}>
              <span className="certification-year mono">{certification.year}</span>
              <div>
                <h3>{certification.title}</h3>
                <p>{certification.issuer}</p>
              </div>
              <span className="certification-mark" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState(null);
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "rahulsand100@gmail.com";

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get("name")}`);
    const body = encodeURIComponent(
      `${formData.get("message")}\n\nReply to: ${formData.get("email")}`,
    );

    if (!contactEmail) {
      setStatus({ type: "unavailable" });
      return;
    }

    const mailtoUrl = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus({ type: "ready", mailtoUrl });
    window.location.href = mailtoUrl;
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-panel glass-card reveal">
        <div className="contact-topline">
          <span className="eyebrow"><span className="eyebrow-mark" /> YOUR NEXT IDEA STARTS HERE</span>
          <span className="contact-serial mono">END / 06</span>
        </div>
        <div className="contact-layout">
          <div className="contact-copy">
            <h2>Let&apos;s build<br /><span>what&apos;s next.</span></h2>
            <p>Have an AI idea, a product challenge, or a team looking for a curious builder? I&apos;d like to hear about it.</p>
            <div className="contact-details">
              <a className="contact-email" href={`mailto:${contactEmail}`}>
                <Mail size={17} /> {contactEmail} <ArrowUpRight size={15} />
              </a>
              <a className="contact-email" href="tel:+919863139043">
                <Phone size={17} /> +91 98631 39043 <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="social-buttons">
              <a className="social-button magnetic" href="https://github.com/rahulsand100" target="_blank" rel="noreferrer" aria-label="Rahul on GitHub"><GithubMark size={18} /></a>
              <a className="social-button magnetic" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Rahul on LinkedIn"><LinkedinMark size={18} /></a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">YOUR NAME</label>
            <input id="contact-name" name="name" autoComplete="name" placeholder="How should I call you?" required />
            <label htmlFor="contact-email">EMAIL ADDRESS</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            <label htmlFor="contact-message">WHAT ARE YOU THINKING?</label>
            <textarea id="contact-message" name="message" rows="3" placeholder="Tell me a little about it..." required />
            <button className="button button-primary form-submit" type="submit">
              Prepare a message <Send size={15} />
            </button>
            {status && (
              <div className={`form-status form-status-${status.type}`} role="status">
                <span className="form-status-mark" aria-hidden="true">
                  {status.type === "ready" ? <Send size={15} /> : <Mail size={15} />}
                </span>
                <div>
                  {status.type === "ready" ? (
                    <>
                      <p>Your message is ready in your email app. Review it and press Send to finish.</p>
                      <div className="form-status-links">
                        <a href={status.mailtoUrl}>
                          Open email draft <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>Email isn&apos;t set up on this portfolio yet. You can still reach me here:</p>
                      <div className="form-status-links">
                        <a href="https://github.com/rahulsand100" target="_blank" rel="noreferrer">
                          GitHub <ArrowUpRight size={13} />
                        </a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                          LinkedIn <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" to="/" onClick={playDoorSound}>R<span>.</span></Link>
      <span className="footer-note">DESIGNED TO THINK. BUILT TO SHIP.</span>
      <span className="footer-copy">© 2026 RAHUL · GREATER NOIDA, INDIA</span>
      <Link className="back-top" to="/" aria-label="Back to home" onClick={playDoorSound}><Rocket size={16} /></Link>
    </footer>
  );
}

const sectionPages = [
  { path: "/about", title: "About", element: <About /> },
  { path: "/skills", title: "Skills", element: <Skills /> },
  { path: "/projects", title: "Projects", element: <Projects /> },
  { path: "/experience", title: "My story", element: <Experience /> },
  { path: "/contact", title: "Contact", element: <Contact /> },
];

function HomePage() {
  return (
    <>
      <Hero />
      <DoorwayNav />
    </>
  );
}

function SectionPage({ index, children }) {
  const previous = sectionPages[(index - 1 + sectionPages.length) % sectionPages.length];
  const next = sectionPages[(index + 1) % sectionPages.length];

  return (
    <div className="route-page">
      {children}
      <nav className="route-page-nav" aria-label="Page navigation">
        <Link className="route-page-link route-page-previous" to={previous.path} onClick={playDoorSound}>
          <ArrowLeft size={15} /><span><small>PREVIOUS ROOM</small><strong>{previous.title}</strong></span>
        </Link>
        <Link className="route-all-rooms" to="/" onClick={playDoorSound}>All rooms</Link>
        <Link className="route-page-link route-page-next" to={next.path} onClick={playDoorSound}>
          <span><small>NEXT ROOM</small><strong>{next.title}</strong></span><ArrowRight size={15} />
        </Link>
      </nav>
    </div>
  );
}

function RoutePages() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("portfolio:navigate"));
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="route-transition"
        key={location.pathname}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          {sectionPages.map((page, index) => (
            <Route
              key={page.path}
              path={page.path}
              element={<SectionPage index={index}>{page.element}</SectionPage>}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Portfolio() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Cursor />
      <Navbar />
      <main id="main-content"><RoutePages /></main>
      <Footer />
    </BrowserRouter>
  );
}
