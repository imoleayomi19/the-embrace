import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { shopProducts } from "../data/shopProducts";
import { useCart } from "../hooks/useCart";

function formatPrice(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function Shop() {
  const { addItem } = useCart();
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
      {/* Hero Section — full-bleed image, centered text */}
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-8 py-3.5 text-base font-semibold text-slate-900 shadow-xl transition hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              Shop Products
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="container mx-auto px-4 py-12 md:py-16">
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