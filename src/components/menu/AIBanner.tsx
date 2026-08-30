export function AIBanner() {
  return (
    <section className="ai-banner" id="ai-banner">
      {/* Líneas de circuito animadas */}
      <svg
        className="ai-circuit-lines"
        viewBox="0 0 800 120"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Línea horizontal principal */}
        <line x1="0" y1="60" x2="800" y2="60" className="ai-circuit-line" />
        {/* Nodos */}
        <circle cx="120" cy="60" r="3" className="ai-circuit-node" />
        <circle cx="320" cy="60" r="3" className="ai-circuit-node" />
        <circle cx="480" cy="60" r="3" className="ai-circuit-node" />
        <circle cx="680" cy="60" r="3" className="ai-circuit-node" />
        {/* Ramificaciones */}
        <polyline points="120,60 120,30 200,30" className="ai-circuit-line" />
        <polyline points="320,60 320,90 400,90" className="ai-circuit-line" />
        <polyline points="480,60 480,25 560,25" className="ai-circuit-line" />
        <polyline points="680,60 680,85 750,85" className="ai-circuit-line" />
        {/* Nodos secundarios */}
        <circle cx="200" cy="30" r="2.5" className="ai-circuit-node ai-circuit-node-delay" />
        <circle cx="400" cy="90" r="2.5" className="ai-circuit-node ai-circuit-node-delay" />
        <circle cx="560" cy="25" r="2.5" className="ai-circuit-node ai-circuit-node-delay" />
        <circle cx="750" cy="85" r="2.5" className="ai-circuit-node ai-circuit-node-delay" />
        {/* Pulso de datos viajando */}
        <circle r="4" className="ai-data-pulse">
          <animateMotion dur="4s" repeatCount="indefinite" path="M0,60 L800,60" />
        </circle>
      </svg>

      <div className="ai-banner-content">
        {/* Icono IA con pulso */}
        <div className="ai-icon-wrapper">
          <div className="ai-icon-pulse" />
          <svg
            className="ai-icon"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            {/* Sparkle / estrella de 4 puntas */}
            <path
              d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
              fill="currentColor"
            />
            <path
              d="M19 15L19.75 17.25L22 18L19.75 18.75L19 21L18.25 18.75L16 18L18.25 17.25L19 15Z"
              fill="currentColor"
              opacity="0.7"
            />
            <path
              d="M5 2L5.5 3.5L7 4L5.5 4.5L5 6L4.5 4.5L3 4L4.5 3.5L5 2Z"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Texto */}
        <div className="ai-banner-text">
          <h3 className="ai-banner-title">Experiencia Digital Inteligente</h3>
          <p className="ai-banner-subtitle">
            Menú diseñado con inteligencia artificial · Innovación que eleva tu experiencia gastronómica
          </p>
        </div>
      </div>
    </section>
  );
}
