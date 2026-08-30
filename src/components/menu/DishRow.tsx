type Props = {
  name: string;
  description?: string | undefined;
  price: number;
  currencySymbol: string;
  /** If provided, the row is clickable and shows a camera icon */
  onTap?: () => void;
};

export function DishRow({ name, description, price, currencySymbol, onTap }: Props) {
  const isFeatured = !!onTap;

  return (
    <li
      className={`dish-hover animate-rise py-4 sm:py-5 ${isFeatured ? "dish-featured" : ""}`}
      onClick={onTap}
      role={isFeatured ? "button" : undefined}
      tabIndex={isFeatured ? 0 : undefined}
      onKeyDown={isFeatured ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onTap?.(); } } : undefined}
    >
      <div className="flex items-end gap-2">
        <h3 className="min-w-0 font-display text-[1.375rem] leading-tight tracking-wide text-cream">
          {name}
          {isFeatured && (
            <span className="dish-featured-badge" aria-label="Ver foto del platillo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="8" r="1" fill="currentColor" />
              </svg>
            </span>
          )}
        </h3>
        <span
          className="mb-1.5 h-px flex-1 shrink-0 bg-[repeating-linear-gradient(to_right,var(--gold)_0_2px,transparent_2px_7px)] opacity-60"
          aria-hidden
        />
        <span className="mb-0.5 shrink-0 font-body text-lg tabular-nums text-gold">
          {currencySymbol}
          {price}
        </span>
      </div>
      {description ? (
        <p className="mt-2 max-w-prose font-body text-[0.975rem] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </li>
  );
}
