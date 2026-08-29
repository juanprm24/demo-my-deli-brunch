export function CornerFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in relative">
      <span className="pointer-events-none absolute -left-1 -top-1 h-6 w-6 border-l border-t border-gold/50" />
      <span className="pointer-events-none absolute -right-1 -top-1 h-6 w-6 border-r border-t border-gold/50" />
      <span className="pointer-events-none absolute -bottom-1 -left-1 h-6 w-6 border-b border-l border-gold/50" />
      <span className="pointer-events-none absolute -bottom-1 -right-1 h-6 w-6 border-b border-r border-gold/50" />
      {children}
    </div>
  );
}

export function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 text-gold/70" aria-hidden>
      <span className="h-px w-10 bg-gold/40" />
      <span className="font-display text-sm leading-none">&#10022;</span>
      <span className="h-px w-10 bg-gold/40" />
    </div>
  );
}
