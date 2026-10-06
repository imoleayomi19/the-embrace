import { useMemo, useState } from "react";
// Lightbulb, Phone and X are only used by the Recommender, which is commented out below.
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
// import { ArrowLeft, ArrowRight, Check, Lightbulb, Phone, SlidersHorizontal, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getShopProduct, shopProducts, type SolarProduct } from "../data/shopProducts";

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

/* "What do you want to power?" section - commented out. Uncomment this block,
   the <Recommender /> line in Catalog, and the full lucide-react import to restore it.

function Recommender() {
  const [query, setQuery] = useState("");
  const [recommendation, setRecommendation] = useState<SolarProduct | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", address: "" });

  const salesEmail = "sales@embracetechng.com";
  const salesPhone = "+2347061451583";

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
    setIsSubmitted(false);
    setIsFormOpen(true);
  }

  function submitRecommendation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `New Power Recommendation Request - ${form.fullName}`;
    const body = [
      `Power Need: ${query}`,
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
    ].join("\n");

    window.location.href = `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
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

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="recommendation-form-title"
        >
          <div className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-sm bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-primary"
              aria-label="Close recommendation form"
            >
              <X className="h-5 w-5" />
            </button>

            {isSubmitted ? (
              <div className="flex flex-col items-center gap-4 pt-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 text-primary">
                  <Lightbulb className="h-7 w-7" />
                </div>
                <h3 id="recommendation-form-title" className="font-anton text-2xl text-primary">Request Ready</h3>
                <p className="font-poppins text-sm leading-6 text-slate-600">
                  Your email app should now have a message addressed to our sales team. You can also call us directly.
                </p>
                <a
                  href={`tel:${salesPhone}`}
                  className="inline-flex items-center gap-2 rounded-sm bg-secondary px-6 py-3 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-primary transition hover:bg-alternative"
                >
                  <Phone className="h-4 w-4" />
                  Call sales
                </a>
              </div>
            ) : (
              <form onSubmit={submitRecommendation} className="flex flex-col gap-5">
                <div className="pr-8">
                  <h3 id="recommendation-form-title" className="font-anton text-2xl text-primary">Get your recommendation</h3>
                  <p className="mt-2 font-poppins text-sm leading-6 text-slate-600">
                    Share your details and our sales team will help you choose the right package.
                  </p>
                </div>
                <div>
                  <label htmlFor="recommendation-name" className="mb-2 block font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-slate-600">Full Name</label>
                  <input
                    id="recommendation-name"
                    required
                    value={form.fullName}
                    onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                    className="w-full rounded-sm border border-slate-300 px-4 py-3 font-poppins text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <div>
                  <label htmlFor="recommendation-phone" className="mb-2 block font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-slate-600">Phone</label>
                  <input
                    id="recommendation-phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    className="w-full rounded-sm border border-slate-300 px-4 py-3 font-poppins text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <div>
                  <label htmlFor="recommendation-address" className="mb-2 block font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-slate-600">Address</label>
                  <textarea
                    id="recommendation-address"
                    required
                    rows={3}
                    value={form.address}
                    onChange={(event) => setForm({ ...form, address: event.target.value })}
                    className="w-full resize-none rounded-sm border border-slate-300 px-4 py-3 font-poppins text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-secondary hover:text-primary"
                >
                  Send to sales
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

*/

function ProductCard({ product }: { product: SolarProduct }) {
  const startingPrice = product.configurations.reduce<number | null>((lowest, option) =>
    option.price === null ? lowest : lowest === null ? option.price : Math.min(lowest, option.price), null);

  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      aria-label={`View ${product.name}`}
    >
      <div className="px-4 pt-4 text-center">
        <span className="inline-flex rounded-full bg-[#FFF8E1] px-3 py-1 font-montserrat text-[10px] font-bold uppercase tracking-[0.12em] text-[#9A5B12]">
          {product.systemBadge ?? (product.brand.startsWith("DEYE") ? "Deye systems" : `${product.brand} system`)}
        </span>
      </div>
      <div className="mt-3 aspect-[4/3] overflow-hidden bg-primary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col items-center px-4 pb-5 pt-4 text-center">
        <p className="text-xs text-slate-500">Complete Hybrid Power Solar System</p>
        <h3 className="mt-2 font-montserrat text-lg font-bold text-slate-900">{product.name}</h3>
        <p className="mt-3 font-montserrat text-base font-bold text-primary">
          From {formatPrice(startingPrice ?? product.price)}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {product.configurations.length} {product.configurations.length === 1 ? "Configuration" : "Configurations"} Available
        </p>
        <span className="mt-4 inline-flex rounded-sm border border-secondary px-4 py-2 font-montserrat text-xs font-bold text-secondary transition group-hover:bg-secondary group-hover:text-primary">
          View Full Price Chart
        </span>
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
    { label: "Brand", value: brand, setter: setBrand, options: ["All", "IVEM", "IVPM", "IVGM", "DEYE Low Voltage (DXLV)", "DEYE High Voltage (DXHV)", "FLEX"] },
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
      {/* <Recommender /> */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-secondary/70" aria-hidden="true" />
            <p className="font-montserrat text-sm font-medium text-secondary">Complete hybrid packages</p>
          </div>
          <h2 className="mt-4 font-montserrat text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Choose your power system
          </h2>
          <p className="mt-5 max-w-2xl font-poppins text-base leading-7 text-slate-500">
            Each package is a complete hybrid system with installation included. Filter by application,
            brand or power size, then open a system to compare its configurations and prices.
          </p>
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
  const [selectedConfiguration, setSelectedConfiguration] = useState<string | null>(product.configurations[0]?.id ?? null);
  const configuration = product.configurations.find((option) => option.id === selectedConfiguration) ?? product.configurations[0];
  const isWithoutSolar = selectedConfiguration === null && product.withoutSolarPrice !== undefined;
  const selectedPrice = isWithoutSolar ? product.withoutSolarPrice ?? product.price : configuration?.price ?? product.price;
  const priceLabel = selectedPrice === null ? "Price on request" : formatPrice(selectedPrice);
  const inverterKva = Number.parseFloat(product.powerSize);
  const maxRecommendedLoadKw = (inverterKva * 1000 * 0.7 * 0.8 / 1000).toFixed(1);
  const whatsappMessage = `Hi Embrace Technologies, I would like to order ${product.name}${isWithoutSolar ? " without solar" : ` with the ${configuration?.solar} solar configuration`} at ${priceLabel}.`;

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-24">
      <div className="mx-auto max-w-6xl px-4">
        <Link to="/shop" className="inline-flex mt-5 items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-slate-600 hover:text-secondary">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
        <div className="mt-6 grid items-center gap-8 rounded-sm bg-primary p-5 shadow-xl sm:p-8 lg:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-sm bg-white">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="py-3 text-white lg:px-4">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.24em] text-secondary">{product.brand} PACKAGE</p>
            <h1 className="mt-3 font-anton text-3xl leading-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-5 max-w-xl font-poppins text-base leading-8 text-white/80">{product.tagline}</p>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.43fr)]">
          <div>
            <div>
              <h2 className="font-montserrat text-sm font-bold uppercase tracking-[0.14em] text-slate-900">CHOOSE YOUR SOLAR CONFIGURATION</h2>
              <div className="mt-4 flex flex-col gap-3">
                {product.configurations.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedConfiguration(option.id)}
                    aria-pressed={selectedConfiguration === option.id}
                    className={`flex flex-col gap-2 rounded-sm border p-4 text-left transition sm:flex-row sm:items-center sm:justify-between ${selectedConfiguration === option.id
                      ? "border-secondary bg-orange-50 ring-2 ring-secondary/20"
                      : "border-slate-200 bg-white hover:border-secondary"
                      }`}
                  >
                    <span className="font-montserrat text-sm font-semibold text-slate-800">
                      {option.solar} Solar + {option.battery}
                      {option.panels && option.panelBrand ? ` - ${option.panels} ${option.panelBrand}` : ""}
                    </span>
                    <span className="shrink-0 font-montserrat text-sm font-bold text-primary">
                      {option.price === null ? "Price on request" : formatPrice(option.price)}
                    </span>
                  </button>
                ))}
                {product.withoutSolarPrice !== undefined && (
                  <label className={`flex cursor-pointer items-center gap-3 rounded-sm border p-4 transition ${isWithoutSolar ? "border-secondary bg-orange-50 ring-2 ring-secondary/20" : "border-slate-200 bg-white hover:border-secondary"}`}>
                    <input
                      type="checkbox"
                      checked={isWithoutSolar}
                      onChange={(event) => setSelectedConfiguration(event.target.checked ? null : product.configurations[0]?.id ?? null)}
                      className="h-4 w-4 accent-orange-500"
                    />
                    <span className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-montserrat text-sm font-semibold text-slate-800">Without Solar</span>
                      <span className="font-montserrat text-sm font-bold text-primary">{formatPrice(product.withoutSolarPrice)}</span>
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>

          <aside className="self-start rounded-sm border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <p className="font-montserrat text-xs uppercase tracking-[0.18em] text-slate-500">Selected configuration price</p>
                <p className="mt-1 font-anton text-2xl text-primary sm:text-3xl">{priceLabel}</p>
              </div>
              <Check className="h-6 w-6 shrink-0 text-secondary" />
            </div>
            <div className="mt-4">
              <h2 className="font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-slate-900">Package Includes</h2>
              <p className="mt-2 font-poppins text-xs leading-5 text-slate-600">
                {product.powerSize.replace("KW", "kVA")} hybrid inverter, {configuration?.battery ?? product.systemStorage ?? "battery storage"}
                {!isWithoutSolar && configuration && `, ${configuration.panels && configuration.panelBrand
                  ? `${configuration.panels} ${configuration.panelBrand} PV modules`
                  : `${configuration.solar} solar PV modules`}`}
                , mounting accessories, system protection, cabling, earthing kit, and professional installation.
                {product.systemStorageAlternative && ` ${product.systemStorageAlternative}.`}
              </p>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <h2 className="font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-slate-900">System Specs</h2>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 font-poppins text-xs leading-5 text-slate-600">
                <div><dt className="font-semibold text-slate-900">Storage capacity</dt><dd>{isWithoutSolar ? product.systemStorage : configuration?.storage ?? product.systemStorage}</dd></div>
                <div><dt className="font-semibold text-slate-900">Inverter Cap</dt><dd>{product.powerSize.replace("KW", "kVA")} Hybrid</dd></div>
                <div className="col-span-2 max-load"><dt className="inline font-semibold text-slate-900">Max Recommended Load (70% safety): </dt><dd className="inline">{maxRecommendedLoadKw}kW</dd></div>
                <div><dt className="font-semibold text-slate-900">Solar cap</dt><dd>{isWithoutSolar ? "No solar modules" : configuration?.solar}</dd></div>
                <div className="col-span-2"><dt className="font-semibold text-slate-900">Load</dt><dd>Pumping machine, washing machine, fridge/freezer, lights, fan, TV, etc.</dd></div>
              </dl>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => window.open(`https://wa.me/2347061451583?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener,noreferrer")}
                className="inline-flex flex-1 items-center justify-center rounded-sm bg-primary px-5 py-3 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-secondary hover:text-primary"
              >
                Buy Now - {priceLabel}
              </button>
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
  return slug && product ? <ProductDetail key={product.slug} product={product} /> : <Catalog />;
}
