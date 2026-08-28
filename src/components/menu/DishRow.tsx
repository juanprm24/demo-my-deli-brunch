type Props = {
  name: string;
  description?: string | undefined;
  price: number;
  currencySymbol: string;
};

export function DishRow({ name, description, price, currencySymbol }: Props) {
  return (
    <li className="animate-rise py-5">
      <div className="flex items-end gap-2">
        <h3 className="min-w-0 font-display text-[1.375rem] leading-tight tracking-wide text-cream">
          {name}
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
