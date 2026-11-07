import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { playCordSound, playDoorSound } from "../uiSounds";

const roles = [
  "AI Developer",
  "Agent Builder",
  "RAG Engineer",
  "LLM Engineer",
  "Full-Stack Developer",
];

const abilitySkills = [
  ["Agentic AI", "LangGraph", "LangChain"],
  ["RAG pipelines", "LLMs", "Embeddings"],
  ["FastAPI", "Python", "Vector search"],
  ["React", "MERN", "Three.js"],
];

// Collectible-style skills card opened from the portrait chip.
function AbilityModal({ onClose }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <motion.div
      className="ability-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className="ability-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ability-title"
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
      >
        <div className="ability-dialog-top">
          <span className="soft-label">A QUICK READ ON MY TOOLKIT</span>
          <button className="ability-close" type="button" onClick={onClose} aria-label="Close ability card">
            <X size={18} />
          </button>
        </div>
        <div className="ability-card-stage" style={{ perspective: 1000 }}>
          <motion.div
            className="ability-card-inner"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            <div className="ability-card-face ability-card-front">
              <span className="ability-card-kicker">RAHUL / BUILDER CARD</span>
              <h2 id="ability-title">Intelligence,<br />made useful.</h2>
              <p>AI Developer · B.Tech Student</p>
              <div className="ability-stats">
                <span><strong>05</strong> focus areas</span>
                <span><strong>03</strong> project concepts</span>
                <span><strong>01</strong> curious mind</span>
              </div>
              <span className="ability-card-serial">GN · IN / 2026</span>
            </div>
            <div className="ability-card-face ability-card-back" aria-hidden={flipped ? undefined : true}>
              <span className="ability-card-kicker">CURRENT LOADOUT</span>
              <div className="ability-skill-groups">
                {abilitySkills.map((group, index) => (
                  <div className="ability-skill-group" key={group[0]}>
                    <span>0{index + 1}</span>
                    <p>{group.join(" · ")}</p>
                  </div>
                ))}
              </div>
              <span className="ability-card-serial">THINK · BUILD · LEARN</span>
            </div>
          </motion.div>
        </div>
        <button className="ability-flip" type="button" onClick={() => setFlipped(!flipped)}>
          {flipped ? "View the front" : "Flip for skills"} <ArrowDownRight size={15} />
        </button>
      </motion.section>
    </motion.div>
  );
}

// Keep the draggable theme switch above the isolated hero and navbar.
function ThemeCord() {
  const [dark, setDark] = useState(() => window.localStorage.getItem("rahul-theme") === "dark");
  const dragged = useRef(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    window.localStorage.setItem("rahul-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => {
    playCordSound();
    setDark((current) => !current);
  };

  return (
    <motion.button
      className="theme-cord"
      type="button"
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      title="Pull to change theme"
      drag="y"
      dragConstraints={{ top: 0, bottom: 62 }}
      dragElastic={0.12}
      dragTransition={{ bounceStiffness: 420, bounceDamping: 22 }}
      onDragStart={() => { dragged.current = false; }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 28) {
          dragged.current = true;
          window.setTimeout(() => { dragged.current = false; }, 250);
          toggleTheme();
        }
      }}
      onClick={() => {
        if (!dragged.current) toggleTheme();
      }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="cord-line" aria-hidden="true" />
      <span className="cord-pendant" aria-hidden="true"><span /></span>
    </motion.button>
  );
}

function magnetize(event) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const offsetX = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
  const offsetY = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
  event.currentTarget.style.setProperty("--magnet-x", `${offsetX * 8}px`);
  event.currentTarget.style.setProperty("--magnet-y", `${offsetY * 8}px`);
}

function resetMagnet(event) {
  event.currentTarget.style.setProperty("--magnet-x", "0px");
  event.currentTarget.style.setProperty("--magnet-y", "0px");
}

export default function SoftHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [abilityOpen, setAbilityOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2500);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <>
      <ThemeCord />
      <section className="soft-hero" id="home">
      <div className="soft-hero-inner">
        <div className="soft-hero-copy">
          <motion.div
            className="soft-eyebrow"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
          >
            <span className="soft-status-dot" /> AI DEVELOPER &amp; STUDENT
          </motion.div>
          <motion.h1
            className="soft-hero-title"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            Hi, I&apos;m Rahul.
          </motion.h1>
          <motion.div
            className="role-line"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.55 }}
          >
            <span className="role-prefix">I am a</span>
            <div className="role-calendar" aria-label={`${roles[roleIndex]}, role ${roleIndex + 1} of ${roles.length}`}>
              <div className="calendar-rings" aria-hidden="true">
                {Array.from({ length: 7 }, (_, index) => <span key={index} />)}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className="calendar-page"
                  key={roleIndex}
                  initial={reducedMotion ? false : { rotateX: -84, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={reducedMotion ? undefined : { rotateX: 84, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.2, 0.75, 0.2, 1] }}
                >
                  <span className="calendar-role">{roles[roleIndex]}</span>
                  <span className="calendar-count">0{roleIndex + 1}<i>/</i>0{roles.length}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.p
            className="soft-hero-description"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.55 }}
          >
            I build thoughtful AI products, from agentic workflows and grounded answers to the full-stack systems behind them.
          </motion.p>
          <motion.div
            className="soft-hero-actions"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.5 }}
          >
            <Link
              className="soft-primary-cta"
              to="/contact"
              onClick={playDoorSound}
              onPointerMove={magnetize}
              onPointerLeave={resetMagnet}
            >
              Start a project <span><ArrowUpRight size={17} /></span>
            </Link>
            <Link className="soft-work-link" to="/projects" onClick={playDoorSound}>See my work <ArrowDownRight size={16} /></Link>
          </motion.div>
          <div className="soft-hero-location">GREATER NOIDA, INDIA <span /> BUILDING WITH INTENT</div>
        </div>

        <motion.div
          className="soft-portrait-wrap"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.7 }}
        >
          <div className="portrait-orbit portrait-orbit-one" aria-hidden="true" />
          <div className="portrait-orbit portrait-orbit-two" aria-hidden="true" />
          <img
            className="soft-portrait"
            src="/images/RAHUL.jpeg"
            alt="Rahul, AI developer and B.Tech student, standing outdoors in Greater Noida"
            fetchPriority="high"
          />
          <div className="portrait-stamp" aria-hidden="true">
            <span className="portrait-stamp-dot" />
            <span><small>RAHUL / BUILDING</small><strong>AI × FULL-STACK</strong></span>
          </div>
          <span className="portrait-coordinate" aria-hidden="true">28° N<br />77° E</span>
          <button className="ability-chip" type="button" onClick={() => setAbilityOpen(true)}>
            <span className="ability-chip-mark">R</span>
            <span><small>OPEN PROFILE</small><strong>My ability card</strong></span>
            <ArrowUpRight size={16} />
          </button>
        </motion.div>
      </div>

      <div className="soft-edge-notes" aria-hidden="true">
        <span className="edge-available">AVAILABLE FOR WORK</span>
        <span className="edge-remote">REMOTE-FIRST, WORLDWIDE</span>
        <Link className="edge-scroll" to="/about" onClick={playDoorSound}>EXPLORE THE ROOMS <span>↓</span></Link>
      </div>
      <AnimatePresence>{abilityOpen && <AbilityModal onClose={() => setAbilityOpen(false)} />}</AnimatePresence>
      </section>
    </>
  );
}