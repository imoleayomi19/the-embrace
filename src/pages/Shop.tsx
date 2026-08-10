import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { shopProducts } from "../data/shopProducts";
import { useCart } from "../hooks/useCart";

function formatPrice(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

// ─── Category filters shown directly below the hero (requested order) ──────
const shopFilters = [
  "All",
  "Hybrid Solar System",
  "Inverters",
  "Batteries",
  "Solar Panels",
  "Accessories",
  "CCTV",
];

export function Shop() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleProducts = useMemo(
    () =>
      activeCategory === "All"
        ? shopProducts
        : shopProducts.filter((product) => product.category === activeCategory),
    [activeCategory]
  );

  return (
    <main className="w-full overflow-hidden bg-slate-50 min-h-screen">
      {/* Hero Section — full-bleed image, centered text (unchanged) */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/solar-panels.png)` }}
        />

        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Centered Content - shifted down more */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center pt-20 md:pt-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-anton font-extrabold tracking-tight text-white drop-shadow-lg">
            Embrace The Power
          </h1>

          <div className="mt-10 flex w-full max-w-md flex-col items-center gap-4">
            <a
              href="#products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-white px-8 py-3.5 text-base font-semibold text-slate-900 shadow-xl transition hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              Shop Products
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Category filter bar — directly below the hero ── */}
      <div className="sticky top-20 z-40 border-y border-slate-200 bg-white/95 backdrop-blur shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Filter by
            </span>
            {shopFilters.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeCategory === category
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-slate-700 border-slate-200 hover:border-secondary hover:text-secondary"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section id="products" className="container mx-auto px-4 py-12 md:py-16">
        {/* Header — active category + product count */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-anton text-slate-900">
              {activeCategory === "All" ? "Shop Categories" : activeCategory}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 font-poppins">
              Filter by category to find the right product faster.
            </p>
          </div>
          <span className="font-montserrat text-xs text-slate-500">
            {visibleProducts.length} product{visibleProducts.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* ── NEW product grid style + compact Add to Cart button ── */}
        {visibleProducts.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-14 text-center shadow-sm">
            <p className="font-montserrat font-semibold text-slate-700">
              No products found for this filter.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="mt-6 inline-flex items-center rounded-full bg-secondary px-6 py-3 font-montserrat text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-primary hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                <div className="mt-4 flex flex-1 flex-col">
                  <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {product.category}
                  </span>
                  <h3 className="mt-2 font-montserrat text-base font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 font-poppins text-xs leading-5 text-slate-500">
                    {product.description}
                  </p>

                  <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3">
                    <span className="font-montserrat text-sm font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      {/* NEW: compact Add to Cart button with cart icon */}
                      <button
                        type="button"
                        onClick={() => addItem(product)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700 transition-colors hover:border-secondary hover:text-secondary"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Add
                      </button>
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700 transition-colors hover:border-secondary hover:text-secondary"
                      >
                        Quote
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}