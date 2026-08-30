import { useEffect, useRef, useState } from "react";

const RESTAURANT_NAME = "My Deli";
const TAGLINE = "Brunch & Suits";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 4200); // after splash
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const inner = hero.querySelector(".hero-bg-layer") as HTMLElement | null;
      if (inner) {
        inner.style.transform = `translateY(${scrollY * 0.35}px) scale(1.08)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className={`hero-section ${isVisible ? "hero-visible" : ""}`}
      id="hero"
    >
      {/* Fondo cinemático con gradientes y formas */}
      <div className="hero-bg-layer">
        {/* Forma abstracta dorada 1 */}
        <div className="hero-orb hero-orb-1" />
        {/* Forma abstracta dorada 2 */}
        <div className="hero-orb hero-orb-2" />
        {/* Forma abstracta dorada 3 */}
        <div className="hero-orb hero-orb-3" />
        {/* Patrón de líneas finas */}
        <div className="hero-grid-pattern" />
      </div>

      {/* Overlay oscuro */}
      <div className="hero-overlay" />

      {/* Partículas doradas ambientales */}
      <div className="hero-ambient-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="hero-ambient-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="hero-content">
        {/* Línea decorativa animada */}
        <div className="hero-deco-line hero-deco-line-top" />

        <p className="hero-label">Carta Digital</p>

        <h1 className="hero-title">{RESTAURANT_NAME}</h1>

        <div className="hero-tagline-wrapper">
          <span className="hero-tagline-line" />
          <p className="hero-tagline">{TAGLINE}</p>
          <span className="hero-tagline-line" />
        </div>

        {/* Línea decorativa animada */}
        <div className="hero-deco-line hero-deco-line-bottom" />

        {/* Horario resumido */}
        <p className="hero-hours">
          Desayunos 9:00 AM – 1:30 PM &nbsp;·&nbsp; Comidas desde 1:30 PM
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span className="hero-scroll-text">Explorar Menú</span>
        <div className="hero-scroll-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 4 L10 14 M5 10 L10 15 L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
