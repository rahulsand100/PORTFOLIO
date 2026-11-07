import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FolderKanban, Mail, Route, Sparkles, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playDoorSound } from "../uiSounds";
import "./DoorwayNav.css";

const destinations = [
  { id: "about", name: "About", note: "The person behind the build", number: "01", accent: "#56836b", deep: "#18372d", icon: UserRound },
  { id: "skills", name: "Skills", note: "My AI and engineering toolkit", number: "02", accent: "#bd684f", deep: "#48281f", icon: Sparkles },
  { id: "projects", name: "Projects", note: "Things made useful", number: "03", accent: "#537d9a", deep: "#1c3446", icon: FolderKanban },
  { id: "experience", name: "My story", note: "Study, work, and what is next", number: "04", accent: "#bd914b", deep: "#47371d", icon: Route },
  { id: "contact", name: "Contact", note: "Let us make something matter", number: "05", accent: "#96677e", deep: "#402a36", icon: Mail },
];

const doorOpenDuration = 760;

export default function DoorwayNav() {
  const [openingId, setOpeningId] = useState(null);
  const timer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const openDoor = (event, destination) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.clearTimeout(timer.current);
    playDoorSound();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enter = () => {
      navigate(`/${destination.id}`);
      timer.current = window.setTimeout(() => setOpeningId(null), 900);
    };

    if (reducedMotion) {
      enter();
      return;
    }

    setOpeningId(destination.id);
    timer.current = window.setTimeout(enter, doorOpenDuration + 80);
  };

  return (
    <section className="doorways-section" aria-labelledby="doorways-title">
      <div className="doorways-heading">
        <span className="doorways-eyebrow"><span /> A DIFFERENT WAY THROUGH</span>
        <h2 id="doorways-title">Choose your<br /><span>next room.</span></h2>
        <p>Step into the parts of my work that interest you.</p>
      </div>
      <div className="doorways-grid">
        {destinations.map((destination, index) => {
          const Icon = destination.icon;
          const opening = openingId === destination.id;

          return (
            <a
              className={`doorway${opening ? " doorway-opening" : ""}`}
              key={destination.id}
              href={`/${destination.id}`}
              style={{ "--door-accent": destination.accent, "--door-deep": destination.deep }}
              onClick={(event) => openDoor(event, destination)}
              aria-label={`Open ${destination.name} section`}
              aria-current={opening ? "page" : undefined}
            >
              <span className="doorway-index">0{index + 1} <i>/ 05</i></span>
              <span className="door-frame" aria-hidden="true">
                <span className="doorway-light" />
                <span className="door-leaf">
                  <span className="door-inset">
                    <span className="door-symbol"><Icon size={20} strokeWidth={1.6} /></span>
                    <span className="door-name">{destination.name}</span>
                    <span className="door-note">{destination.note}</span>
                  </span>
                  <span className="door-handle" />
                </span>
              </span>
              <span className="doorway-action">Enter <ArrowUpRight size={14} /></span>
            </a>
          );
        })}
      </div>
    </section>
  );
}