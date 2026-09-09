import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Lightbulb, SlidersHorizontal } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getShopProduct, shopProducts, type ShopProduct, type SolarProduct } from "../data/shopProducts";
import { useCart } from "../hooks/useCart";

function formatPrice(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/solar-panels.webp)" }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center pt-20 md:pt-32">
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
  );
}

function Recommender() {
  const [query, setQuery] = useState("");
  const [recommendation, setRecommendation] = useState<SolarProduct | null>(null);

  function recommend() {
    const normalized = query.toLowerCase();
    const recommendedSlug = normalized.includes("commercial") || normalized.includes("office")
      ? "deye-dxlv-15kw"
      : normalized.includes("ac") && (normalized.match(/ac/g)?.length ?? 0) > 2
        ? "ivem-10kw"
        : normalized.includes("ac")
          ? "ivem-6kw"
          : "ivem-4kw";
    setRecommendation(getShopProduct(recommendedSlug) ?? null);
  }

  return (
    <section className="border-y border-slate-200 bg-white px-4 py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h2 className="mt-3 font-anton text-3xl text-primary sm:text-4xl">What do you want to power?</h2>
          <p className="mt-4 font-poppins text-sm leading-7 text-slate-600">
            Tell us what matters most and we will point you toward a practical starting package.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && recommend()}
            placeholder="Tell us what you want to power. e.g 2 ACs, Fridge, 10 lights"
            className="min-h-14 flex-1 rounded-sm border border-slate-300 bg-slate-50 px-5 font-poppins text-sm text-slate-800 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
          />
          <button
            type="button"
            onClick={recommend}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-sm bg-primary px-6 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-secondary hover:text-primary"
          >
            <Lightbulb className="h-4 w-4" />
            Get Recommendation
          </button>
        </div>
        {recommendation && (
          <div className="mt-6 flex flex-col gap-3 border-l-4 border-secondary bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-montserrat text-sm font-semibold text-slate-800">
              We recommend {recommendation.name} Package
            </p>
            <Link
              to={`/shop/${recommendation.slug}`}
              className="inline-flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-primary hover:text-secondary"
            >
              View product <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: SolarProduct }) {
  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-slate-100 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      aria-label={`View ${product.name}`}
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-primary/95 px-4 py-4 transition-transform duration-300 group-hover:translate-y-0">
        <span className="font-montserrat text-sm font-bold text-white">{product.name}</span>
      </div>
    </Link>
  );
}

function ProductFilters({
  application,
  brand,
  powerSize,
  setApplication,
  setBrand,
  setPowerSize,
}: {
  application: string;
  brand: string;
  powerSize: string;
  setApplication: (value: string) => void;
  setBrand: (value: string) => void;
  setPowerSize: (value: string) => void;
}) {
  const selectClass = "w-full appearance-none rounded-sm border border-slate-300 bg-white px-4 py-3 font-montserrat text-xs font-semibold text-slate-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20";
  const filters = [
    { label: "Application", value: application, setter: setApplication, options: ["All", "Residential", "Commercial / Industrial"] },
    { label: "Brand", value: brand, setter: setBrand, options: ["All", "IVEM", "IVPM", "IVGM", "DEYE DXLV", "DEYE DXHV", "FLEX"] },
    { label: "Power Size", value: powerSize, setter: setPowerSize, options: ["All", ...new Set(shopProducts.map((product) => product.powerSize))] },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {filters.map((filter) => (
        <label key={filter.label} className="relative block">
          <span className="mb-2 block font-montserrat text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            {filter.label}
          </span>
          <select
            value={filter.value}
            onChange={(event) => filter.setter(event.target.value)}
            className={selectClass}
          >
            {filter.options.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
      ))}
    </div>
  );
}

function Catalog() {
  const [application, setApplication] = useState("All");
  const [brand, setBrand] = useState("All");
  const [powerSize, setPowerSize] = useState("All");
  const visibleProducts = useMemo(
    () => shopProducts.filter((product) =>
      (application === "All" || product.application === application) &&
      (brand === "All" || product.brand === brand) &&
      (powerSize === "All" || product.powerSize === powerSize)
    ),
    [application, brand, powerSize]
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />
      <Recommender />
      <section id="products" className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Solar packages</p>
            <h2 className="mt-3 font-anton text-3xl text-primary sm:text-4xl">Choose your power system</h2>
          </div>
          <SlidersHorizontal className="hidden h-6 w-6 text-secondary md:block" />
        </div>
        <div className="mt-8">
          <ProductFilters
            application={application}
            brand={brand}
            powerSize={powerSize}
            setApplication={setApplication}
            setBrand={setBrand}
            setPowerSize={setPowerSize}
          />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>
    </main>
  );
}

function ProductDetail({ product }: { product: SolarProduct }) {
  const { addItem } = useCart();
  const [selectedConfiguration, setSelectedConfiguration] = useState(0);
  const configuration = product.configurations[selectedConfiguration] ?? product.configurations[0];
  const cartProductName = product.slug === "ivem-4kw" ? "IVEM 4KW" : product.name;
  const cartProduct: ShopProduct = {
    ...product,
    id: product.id * 100 + selectedConfiguration,
    name: `${cartProductName} - ${configuration.solar} Solar Config`,
    price: configuration.price,
    description: `${configuration.solar} solar with ${configuration.battery}.`,
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-24">
      <div className="mx-auto max-w-6xl px-4">
        <Link to="/shop" className="inline-flex mt-5 items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-slate-600 hover:text-secondary">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
        <div className="mt-6 overflow-hidden rounded-sm p-4 shadow-xl sm:p-8">
          <div className="aspect-[16/9] overflow-hidden rounded-sm bg-white/10">
            <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.24em] text-secondary">{product.brand} package</p>
            <h1 className="mt-3 font-anton text-3xl leading-tight text-primary sm:text-5xl">{product.name}</h1>
            <p className="mt-5 max-w-xl font-poppins text-base leading-8 text-slate-600">{product.tagline}</p>

            <div className="mt-8">
              <h2 className="font-montserrat text-sm font-bold uppercase tracking-[0.14em] text-slate-900">Choose Your Solar Configuration:</h2>
              <div className="mt-4 flex flex-col gap-3">
                {product.configurations.map((option, index) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedConfiguration(index)}
                    className={`flex flex-col gap-2 rounded-sm border p-4 text-left transition sm:flex-row sm:items-center sm:justify-between ${selectedConfiguration === index
                      ? "border-secondary bg-orange-50 ring-2 ring-secondary/20"
                      : "border-slate-200 bg-white hover:border-secondary"
                      }`}
                  >
                    <span className="font-montserrat text-sm font-semibold text-slate-800">{option.solar} Solar + {option.battery}</span>
                    <span className="font-montserrat text-sm font-bold text-primary">{formatPrice(option.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-end justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="font-montserrat text-xs uppercase tracking-[0.18em] text-slate-500">Price</p>
                <p className="mt-2 font-anton text-3xl text-primary">From {formatPrice(configuration.price)}</p>
              </div>
              <Check className="h-7 w-7 text-secondary" />
            </div>
            <h2 className="mt-7 font-montserrat text-sm font-bold uppercase tracking-[0.14em] text-slate-900">What's Included</h2>
            <ul className="mt-4 space-y-3 font-poppins text-sm leading-6 text-slate-600">
              <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-secondary" />{product.name.split(" - ")[0]} Hybrid Inverter. 120A MPPT. Parallel up to 6 units</li>
              <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-secondary" />Battery Bank: {configuration.battery} LiFePO4</li>
              <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-secondary" />Solar Panels: {configuration.solar} Tier-1 Mono 550W-700W</li>
              <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-secondary" />Cables, Breakers, Installation Kit, Monitoring App</li>
            </ul>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <h2 className="font-montserrat text-sm font-bold uppercase tracking-[0.14em] text-slate-900">System Specs</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4 font-poppins text-xs text-slate-600">
                <div><dt className="font-semibold text-slate-900">Storage</dt><dd>{configuration.storage} option</dd></div>
                <div><dt className="font-semibold text-slate-900">Solar input</dt><dd>65V-145V low-voltage</dd></div>
                <div><dt className="font-semibold text-slate-900">Backup</dt><dd>ACs, pumps, fridge</dd></div>
                <div><dt className="font-semibold text-slate-900">Monitoring</dt><dd>RS-232 + App</dd></div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => addItem(cartProduct)}
                className="inline-flex flex-1 items-center justify-center rounded-sm bg-primary px-5 py-3 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-secondary hover:text-primary"
              >
                Add to Cart
              </button>
              <Link to="/contact" className="inline-flex flex-1 items-center justify-center rounded-sm border border-primary px-5 py-3 text-center font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-primary transition hover:bg-primary hover:text-white">
                Book Free Site Visit
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export function Shop() {
  const { slug } = useParams();
  const product = getShopProduct(slug);
  return slug && product ? <ProductDetail product={product} /> : <Catalog />;
}
