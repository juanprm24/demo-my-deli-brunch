import { useEffect, useRef } from "react";

/** Metadata for featured dishes with expanded detail views */
export type FeaturedDish = {
  name: string;
  description: string;
  price: number;
  currencySymbol: string;
  image: string;
  category: string;
  tags: string[];
  prepTime: string;
  highlight: string;
};

type Props = {
  dish: FeaturedDish | null;
  onClose: () => void;
};

export function DishDetailDrawer({ dish, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (dish) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [dish]);

  // Close on ESC
  useEffect(() => {
    if (!dish) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dish, onClose]);

  if (!dish) return null;

  return (
    <div
      ref={backdropRef}
      className="dish-drawer-backdrop"
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${dish.name}`}
    >
      <div ref={drawerRef} className="dish-drawer">
        {/* Handle bar (mobile drag indicator) */}
        <div className="dish-drawer-handle-bar">
          <span className="dish-drawer-handle" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="dish-drawer-close"
          aria-label="Cerrar detalle"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Hero Image */}
        <div className="dish-drawer-image-wrapper">
          <img
            src={dish.image}
            alt={dish.name}
            className="dish-drawer-image"
            loading="eager"
          />
          <div className="dish-drawer-image-overlay" />
          {/* Category badge */}
          <span className="dish-drawer-badge">{dish.category}</span>
        </div>

        {/* Content */}
        <div className="dish-drawer-content">
          {/* Title & Price */}
          <div className="dish-drawer-header">
            <h2 className="dish-drawer-title">{dish.name}</h2>
            <span className="dish-drawer-price">
              {dish.currencySymbol}{dish.price}
            </span>
          </div>

          {/* Divider */}
          <div className="dish-drawer-divider" />

          {/* Description */}
          <p className="dish-drawer-description">{dish.description}</p>

          {/* Highlight callout */}
          <div className="dish-drawer-highlight">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="dish-drawer-highlight-icon">
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
            </svg>
            <span>{dish.highlight}</span>
          </div>

          {/* Info row */}
          <div className="dish-drawer-info-row">
            <div className="dish-drawer-info-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>{dish.prepTime}</span>
            </div>
            <div className="dish-drawer-info-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 21C12 21 4 15 4 9.5C4 5.36 7.58 2 12 2C16.42 2 20 5.36 20 9.5C20 15 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span>Preparado al momento</span>
            </div>
          </div>

          {/* Tags */}
          <div className="dish-drawer-tags">
            {dish.tags.map((tag) => (
              <span key={tag} className="dish-drawer-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
