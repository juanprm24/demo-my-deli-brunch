import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import menuData from "@/data/menu-data.json";
import { DishRow } from "@/components/menu/DishRow";
import { CornerFrame, Divider } from "@/components/menu/Ornament";

const { restaurant } = menuData;
const menus = menuData.menus as Array<{
  id: string;
  label: string;
  hours: string;
  categories: Array<{ name: string; items: Array<{ name: string; description?: string; price: number }> }>;
}>;
const firstMenu = menus[0]!;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${restaurant.name} — Menú Digital de Brunch` },
      {
        name: "description",
        content: `Carta digital de ${restaurant.name} (${restaurant.tagline}): desayunos y comidas con precios actualizados.`,
      },
      { property: "og:title", content: `${restaurant.name} — Menú Digital` },
      {
        property: "og:description",
        content: `Explora los menús de desayunos y comidas de ${restaurant.name}.`,
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuId, setMenuId] = useState(firstMenu.id);
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const activeMenu = menus.find((m) => m.id === menuId) ?? firstMenu;

  const categories = useMemo(
    () => activeMenu.categories.filter((c) => category === "all" || c.name === category),
    [activeMenu, category],
  );

  const q = query.trim().toLowerCase();
  const sections = categories
    .map((c) => ({
      name: c.name,
      items: c.items.filter(
        (i) =>
          !q ||
          i.name.toLowerCase().includes(q) ||
          (i.description ?? "").toLowerCase().includes(q),
      ),
    }))
    .filter((c) => c.items.length > 0);

  const switchMenu = (id: string) => {
    setMenuId(id);
    setCategory("all");
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-8">
      <header className="pt-14 pb-10 text-center sm:pt-20">
        <CornerFrame>
          <div className="px-4 py-8 sm:py-12">
            <p className="font-body text-[0.7rem] uppercase tracking-[0.45em] text-gold">
              Carta
            </p>
            <h1 className="mt-4 font-display text-[3.25rem] leading-[1.05] tracking-wide text-cream sm:text-7xl">
              {restaurant.name}
            </h1>
            <p className="mt-3 font-body text-base tracking-[0.3em] uppercase text-muted-foreground">
              {restaurant.tagline}
            </p>
            <div className="mt-7 flex justify-center">
              <Divider />
            </div>
          </div>
        </CornerFrame>
      </header>

      <div className="sticky top-0 z-20 -mx-5 border-b border-gold/20 bg-[#0a1520]/92 px-5 pt-3 pb-3 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="grid grid-cols-2 gap-2">
          {menus.map((m) => {
            const active = m.id === activeMenu.id;
            return (
              <button
                key={m.id}
                onClick={() => switchMenu(m.id)}
                aria-pressed={active}
                className={`min-h-[52px] rounded-sm border px-3 py-2 transition-colors ${
                  active
                    ? "border-gold bg-gold/12 text-cream"
                    : "border-gold/25 text-muted-foreground"
                }`}
              >
                <span className="block font-display text-xl leading-tight tracking-wide">
                  {m.label}
                </span>
                <span className="block font-body text-[0.7rem] tracking-widest text-gold/80">
                  {m.hours}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center gap-2 border-b border-gold/25 pb-1">
          <span className="font-body text-sm text-gold/70" aria-hidden>
            ⌕
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar platillo…"
            aria-label="Buscar platillo"
            className="h-11 w-full bg-transparent font-body text-base text-cream placeholder:text-muted-foreground/70 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="min-h-11 px-2 font-body text-sm text-gold"
            >
              Limpiar
            </button>
          ) : null}
        </div>

        <div className="-mx-5 mt-3 overflow-x-auto px-5 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2">
            {[{ name: "all", label: "Todo" }, ...activeMenu.categories.map((c) => ({ name: c.name, label: c.name }))].map(
              (c) => {
                const active = category === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setCategory(c.name)}
                    aria-pressed={active}
                    className={`min-h-11 whitespace-nowrap rounded-full border px-5 font-body text-sm tracking-wide transition-colors ${
                      active
                        ? "border-gold bg-gold text-primary-foreground"
                        : "border-gold/30 text-muted-foreground"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>

      <div key={`${activeMenu.id}-${category}`} className="animate-rise">
        {sections.length === 0 ? (
          <p className="py-20 text-center font-display text-2xl text-muted-foreground">
            Sin resultados para “{query}”
          </p>
        ) : (
          sections.map((section) => (
            <section key={section.name} className="pt-12">
              <h2 className="text-center font-display text-3xl tracking-[0.12em] text-gold">
                {section.name}
              </h2>
              <div className="mt-3 flex justify-center">
                <Divider />
              </div>
              <ul className="mt-4 divide-y divide-gold/12">
                {section.items.map((item) => (
                  <DishRow
                    key={`${section.name}-${item.name}`}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    currencySymbol={restaurant.currencySymbol}
                  />
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      <footer className="pt-16 text-center">
        <Divider />
        <p className="mt-5 font-body text-xs uppercase tracking-[0.35em] text-muted-foreground">
          {restaurant.name} · Precios en {restaurant.currency}
        </p>
      </footer>
    </main>
  );
}
