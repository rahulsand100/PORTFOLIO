import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "framer-motion";
import Portfolio from "./components/Portfolio";
import "./index.css";
import "./components/SoftHero.css";

gsap.registerPlugin(ScrollTrigger);

function Loader() {
  return (
    <div className="loader" role="status" aria-label="Loading portfolio">
      <div className="loader-inner">
        <span className="loader-name" data-text="RAHUL">RAHUL</span>
        <span className="loader-track"><span /></span>
        <span className="loader-caption">INITIALIZING EXPERIENCE</span>
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis;
    let frame = 0;

    if (!reducedMotion) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 });
      const raf = (time) => {
        lenis.raf(time);
        frame = window.requestAnimationFrame(raf);
      };
      frame = window.requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }

    const resetRouteScroll = () => lenis?.scrollTo(0, { immediate: true });
    window.addEventListener("portfolio:navigate", resetRouteScroll);

    if (reducedMotion) {
      gsap.set(".reveal", { opacity: 1, y: 0 });
    } else {
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });
    }

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("portfolio:navigate", resetRouteScroll);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {loading && <Loader />}
      <Portfolio />
    </MotionConfig>
  );
}
