import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, ShoppingCart } from "lucide-react";
import { shopProducts } from "../data/shopProducts";
import { useCart } from "../hooks/useCart";

function formatPrice(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function Shop() {
  const { items, addItem, totalItems } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(shopProducts.map((product) => product.category))),
    ],
    []
  );

  const visibleProducts = useMemo(
    () =>
      activeCategory === "All"
        ? shopProducts
        : shopProducts.filter((product) => product.category === activeCategory),
    [activeCategory]
  );

  return (
    <main className="w-full overflow-hidden bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,199,89,0.18),_transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(12,51,103,0.9),_rgba(12,51,103,0.7))]" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-slate-100 font-montserrat font-semibold">
              Shop
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-anton font-extrabold tracking-tight text-white">
              Browse products built for Nigerian power systems.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 font-poppins">
              Choose reliable inverters, batteries, panels, and accessories with clear pricing and fast ordering.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="rounded-full bg-white/10 border border-white/20 px-4 py-3 text-sm text-slate-100 shadow-sm backdrop-blur-sm">
                {totalItems} item{totalItems === 1 ? "" : "s"} in cart
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary shadow-xl transition hover:bg-yellow-400"
                >
                  View Cart
                  <ShoppingCart className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-anton text-slate-900">Shop Categories</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 font-poppins">
              Filter by category to find the right product faster.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 to-transparent px-5 py-3 text-slate-100">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl font-semibold text-primary">{formatPrice(product.price)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addItem(product)}
                      className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary transition hover:bg-yellow-400"
                    >
                      Add to Cart
                    </button>
                    <Link
                      to="/contact"
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:border-secondary hover:text-secondary"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
