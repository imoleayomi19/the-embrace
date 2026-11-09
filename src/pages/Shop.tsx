import { useMemo, useState, useEffect, useRef } from "react";
import { ArrowDown, ArrowLeft, Check, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getShopProduct, shopProducts, type SolarProduct } from "../data/shopProducts";
import { useCart } from "../context/cartStore";

function formatPrice(value: number) {
  return `${value.toLocaleString("en-NG")}`;
}

// Hero images - replace these with your actual product flyer images
const HERO_IMAGES = [
  "/products/product.webp",
  "/products/product.webp",
  "/products/product.webp",
  "/products/product.webp",
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section
      className="relative mt-16 h-[85vh] min-h-[600px] w-full overflow-hidden sm:mt-20 lg:mt-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider Container */}
      <div className="relative h-full w-full">
        {HERO_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${src})` }}
            />
            {/* Removed the dark overlay so images are crystal clear */}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        type="button"
        onClick={goToPrevious}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
              ? "w-8 bg-primary"
              : "w-2 bg-slate-400 hover:bg-slate-500"
              }`}
          />
        ))}
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center pt-20 md:pt-32">
        <div className="mt-10 flex w-full max-w-md flex-col items-center gap-4">
          <button
            type="button"
            onClick={scrollToProducts}
            aria-label="Shop products"
            className="group inline-flex h-16 w-12 items-center justify-center rounded-full border-2 border-white/90 bg-white/5 text-white shadow-xl backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          >
            <ArrowDown className="h-7 w-7 transition-transform group-hover:animate-bounce motion-reduce:group-hover:animate-none" />
          </button>
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
const SLIDE_INTERVAL = 3000; // ms between automatic slides

function ProductImageSlider({
  images,
  alt,
  href,
  className = "aspect-[3/4]",
}: {
  images: string[];
  alt: string;
  href?: string; // when set, tapping the image opens the product page
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const swiped = useRef(false);
  const count = images.length;
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Auto-slide. The timer restarts after every change, so a manual swipe
  // or dot tap always gets a full 3 seconds before the next slide.
  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), SLIDE_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [index, paused, count, reduceMotion]);

  function onPointerDown(event: React.PointerEvent) {
    startX.current = event.clientX;
    swiped.current = false;
    setPaused(true);
  }

  function onPointerUp(event: React.PointerEvent) {
    if (startX.current !== null && count > 1) {
      const distance = event.clientX - startX.current;
      if (Math.abs(distance) > 40) {
        swiped.current = true;
        setIndex((current) => (distance < 0 ? (current + 1) % count : (current - 1 + count) % count));
      }
    }
    startX.current = null;
    setPaused(false);
  }

  // A swipe must not count as a click on the link
  function onClickCapture(event: React.MouseEvent) {
    if (swiped.current) {
      event.preventDefault();
      event.stopPropagation();
      swiped.current = false;
    }
  }

  const track = (
    <div
      className="flex h-full transition-transform duration-500 ease-out"
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {images.map((src, i) => (
        <div key={src} className="relative h-full w-full shrink-0">
          {/* Blurred copy fills the sides so there are no empty bars */}
          <img
            src={src}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-2xl"
          />
          <img
            src={src}
            alt={`${alt} - photo ${i + 1} of ${count}`}
            draggable={false}
            loading={i === 0 ? "eager" : "lazy"}
            className="relative h-full w-full object-contain"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`relative touch-pan-y select-none overflow-hidden bg-slate-100 ${className}`}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { startX.current = null; setPaused(false); }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {href ? (
        <Link to={href} onClickCapture={onClickCapture} aria-label={`View ${alt}`} className="block h-full">
          {track}
        </Link>
      ) : (
        track
      )}

      {count > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`pointer-events-auto h-2 rounded-full shadow transition-all duration-300 ${i === index ? "w-5 bg-secondary" : "w-2 bg-white/80 hover:bg-white"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: SolarProduct }) {
  const { addToCart } = useCart();
  const startingPrice = product.configurations.reduce<number | null>((lowest, option) =>
    option.price === null ? lowest : lowest === null ? option.price : Math.min(lowest, option.price), null);
  const startingConfiguration = product.configurations.reduce<(typeof product.configurations)[number] | null>(
    (lowest, option) => option.price === null || (lowest !== null && lowest.price !== null && lowest.price <= option.price)
      ? lowest
      : option,
    null
  ) ?? product.configurations[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="px-4 pb-3 pt-4 text-center">
        <span className="inline-flex rounded-full bg-[#FFF8E1] px-3 py-1 font-montserrat text-[10px] font-bold uppercase tracking-[0.12em] text-[#9A5B12]">
          {product.systemBadge ?? (product.brand.startsWith("DEYE") ? "Deye systems" : `${product.brand} system`)}
        </span>
      </div>

      <ProductImageSlider images={product.images} alt={product.name} href={`/shop/${product.slug}`} />

      <Link to={`/shop/${product.slug}`} className="flex flex-1 flex-col items-center px-4 pb-2 pt-4 text-center" aria-label={`View ${product.name}`}>
        <p className="text-xs text-slate-500">{product.powerSize.replace("KW", "kVA")} Hybrid Power Solar System</p>
        <h3 className="mt-2 font-montserrat text-lg font-bold text-slate-900">{product.name}</h3>
        <p className="mt-3 font-montserrat text-base font-bold text-primary">
          From {formatPrice(startingPrice ?? product.price)}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {product.configurations.length} {product.configurations.length === 1 ? "Configuration" : "Configurations"} Available
        </p>
      </Link>

      <div className="flex flex-wrap items-center justify-center gap-2 px-4 pb-5 pt-3">
        <Link
          to={`/shop/${product.slug}`}
          className="inline-flex items-center justify-center rounded-sm border border-secondary px-3 py-2 font-montserrat text-xs font-bold text-secondary transition hover:bg-secondary hover:text-primary"
        >
          View Full Price Chart
        </Link>
        <button
          type="button"
          onClick={() => addToCart({
            id: `${product.slug}:${startingConfiguration?.id ?? "default"}`,
            productName: product.name,
            configurationName: startingConfiguration?.solar ?? "Standard package",
            price: startingConfiguration ? startingConfiguration.price : product.price,
          })}
          aria-label={`Add ${product.name} to cart`}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-3 py-2 font-montserrat text-xs font-bold text-white transition hover:bg-secondary hover:text-primary"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
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
      <section id="products" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 md:py-20">
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
  const whatsappMessage = `Hi Embrace Technologies, I would like to order ${product.name}${isWithoutSolar ? " without solar" : ` with the ${configuration?.solar} solar configuration`} at ${priceLabel}.`;

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-24">
      <div className="mx-auto max-w-6xl px-4">
        <Link to="/shop" className="mt-5 inline-flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-slate-600 hover:text-secondary">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        {/* Kept for screen readers and search engines, not shown on screen */}
        <h1 className="sr-only">{product.name}</h1>

        {/* Image + description side by side */}
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
          <div className="relative aspect-[3/4] max-h-[560px] w-full overflow-hidden rounded-sm bg-slate-100 shadow-sm ring-1 ring-slate-200">
            <img
              src={product.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-2xl"
            />
            <img src={product.image} alt={product.name} className="relative h-full w-full object-contain" />
          </div>

          <aside className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
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

        {/* Configuration list, unchanged, now full width at the bottom */}
        <section className="mt-10">
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
        </section>
      </div>
    </main>
  );
}

export function Shop() {
  const { slug } = useParams();
  const product = getShopProduct(slug);
  return slug && product ? <ProductDetail key={product.slug} product={product} /> : <Catalog />;
}