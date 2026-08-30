import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import menuData from "@/data/menu-data.json";
import { DishRow } from "@/components/menu/DishRow";
import { Divider } from "@/components/menu/Ornament";
import { SplashLoader } from "@/components/menu/SplashLoader";
import { HeroSection } from "@/components/menu/HeroSection";
import { DishDetailDrawer, type FeaturedDish } from "@/components/menu/DishDetailDrawer";

/** Featured dishes with photo detail — demo shows only 2 as a preview */
const FEATURED_DISHES: Record<string, Omit<FeaturedDish, "name" | "description" | "price" | "currencySymbol">> = {
  "Pan Francés": {
    image: "/demo-my-deli-brunch/dish-pan-frances.jpg",
    category: "Clásicos",
    tags: ["Pistache", "Berries", "Mermelada", "Fresa"],
    prepTime: "12–15 min",
    highlight: "Favorito de la casa — mousse de pistache artesanal",
  },
  "Avo Toast": {
    image: "/demo-my-deli-brunch/dish-avo-toast.jpg",
    category: "Entrepanes",
    tags: ["Sourdough", "Queso de cabra", "Tocino", "Pepitas"],
    prepTime: "10–12 min",
    highlight: "Nuestro best seller — pan sourdough de masa madre",
  },
};


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
  const [activeDish, setActiveDish] = useState<FeaturedDish | null>(null);

  const openDish = useCallback((item: { name: string; description?: string; price: number }, featured: Omit<FeaturedDish, "name" | "description" | "price" | "currencySymbol">) => {
    setActiveDish({
      name: item.name,
      description: item.description ?? "",
      price: item.price,
      currencySymbol: restaurant.currencySymbol,
      ...featured,
    });
  }, []);

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
    <>
      <SplashLoader />
      <HeroSection />
    <main id="menu-section" className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-8 pt-4 sm:pt-8 scroll-mt-4">
      <div className="sticky-bar-shadow sticky top-0 z-20 -mx-5 border-b border-gold/20 bg-[#0a1520]/95 px-5 pt-3 pb-3 backdrop-blur-md sm:-mx-8 sm:px-8 sm:pt-4 sm:pb-4">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          {menus.map((m) => {
            const active = m.id === activeMenu.id;
            return (
              <button
                key={m.id}
                onClick={() => switchMenu(m.id)}
                aria-pressed={active}
                className={`min-h-[50px] rounded-lg border px-3.5 py-2 transition-all duration-300 sm:min-h-[58px] sm:py-2.5 cursor-pointer text-center ${
                  active
                    ? "border-gold bg-gold/15 text-cream shadow-[0_0_20px_oklch(0.74_0.09_82_/_15%)]"
                    : "border-gold/20 bg-[#0c1926]/50 text-muted-foreground hover:border-gold/40 hover:text-cream/80"
                }`}
              >
                <span className="block font-display text-xl sm:text-2xl leading-tight tracking-wide">
                  {m.label}
                </span>
                <span className="block font-body text-[0.72rem] tracking-widest text-gold/80 mt-0.5 sm:text-[0.75rem]">
                  {m.hours}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex items-center gap-2 border-b border-gold/25 pb-1 sm:mt-3">
          <span className="font-body text-sm text-gold/70" aria-hidden>
            ⌕
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar platillo…"
            aria-label="Buscar platillo"
            className="h-9 w-full bg-transparent font-body text-base text-cream placeholder:text-muted-foreground/70 focus:outline-none sm:h-11"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="min-h-9 px-2 font-body text-sm text-gold sm:min-h-11"
            >
              Limpiar
            </button>
          ) : null}
        </div>

        <div className="-mx-5 mt-2 overflow-x-auto px-5 sm:-mx-8 sm:mt-3 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2">
            {[{ name: "all", label: "Todo" }, ...activeMenu.categories.map((c) => ({ name: c.name, label: c.name }))].map(
              (c) => {
                const active = category === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setCategory(c.name)}
                    aria-pressed={active}
                    className={`min-h-9 whitespace-nowrap rounded-full border px-4 font-body text-sm tracking-wide transition-colors sm:min-h-11 sm:px-5 ${
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
            <section key={section.name} className="pt-8 sm:pt-12">
              <h2 className="text-center font-display text-3xl tracking-[0.12em] text-gold">
                {section.name}
              </h2>
              <div className="mt-3 flex justify-center">
                <Divider />
              </div>
              <ul className="mt-4 divide-y divide-gold/12">
                {section.items.map((item) => {
                  const featured = FEATURED_DISHES[item.name];
                  return (
                    <DishRow
                      key={`${section.name}-${item.name}`}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      currencySymbol={restaurant.currencySymbol}
                      onTap={featured ? () => openDish(item, featured) : undefined}
                    />
                  );
                })}
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
    <DishDetailDrawer dish={activeDish} onClose={() => setActiveDish(null)} />
    </>
  );
}
