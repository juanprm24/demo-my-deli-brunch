import { useState, useEffect } from "react";

const LETTERS = "My Deli".split("");
const TAGLINE = "Brunch & Suits";
const TOTAL_DURATION = 3800; // ms before curtain opens
const PARTICLE_COUNT = 24;

export function SplashLoader() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setPhase("exiting"), TOTAL_DURATION);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, TOTAL_DURATION + 900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`splash-loader ${phase === "exiting" ? "splash-exit" : ""}`}
      aria-hidden="true"
    >
      {/* Partículas doradas flotantes */}
      <div className="splash-particles">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <span
            key={i}
            className="splash-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2.5}s`,
              animationDuration: `${2.5 + Math.random() * 3}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Contenido central */}
      <div className="splash-content">
        {/* Línea decorativa superior */}
        <div className="splash-line-top" />

        {/* Nombre letra por letra */}
        <h1 className="splash-title" aria-label="My Deli">
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className="splash-letter"
              style={{ animationDelay: `${0.6 + i * 0.12}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p className="splash-tagline">{TAGLINE}</p>

        {/* Barra de progreso dorada */}
        <div className="splash-progress-track">
          <div className="splash-progress-bar" />
        </div>

        {/* Línea decorativa inferior */}
        <div className="splash-line-bottom" />
      </div>

      {/* Cortinas de salida */}
      <div className="splash-curtain splash-curtain-left" />
      <div className="splash-curtain splash-curtain-right" />
    </div>
  );
}
