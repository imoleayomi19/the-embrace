import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../hooks/useCart";

type NavChild = {
  name: string;
  path: string;
  image?: string;
  // Short one-line description shown under the title in the minimal
  // dropdown card (Solutions). Optional so other dropdowns (About) can
  // keep using plain text-only rows.
  description?: string;
};

type NavLink = {
  name: string;
  path: string;
  children?: NavChild[];
};

// ─── Resources dropdown data (medium hover dropdown) ───────────────────────

type ResourceItem = {
  name: string;
  path: string;
  badge?: string;
};

type ResourceGroup = {
  title: string;
  items: ResourceItem[];
};
const resourcesGroups: ResourceGroup[] = [
  {
    title: "Training Academy",
    items: [
      { name: "Solar PV Installation", path: "/academy" },
      { name: "CCTV Installation", path: "/academy" },
      { name: "Corporate Training", path: "/academy" },
      { name: "Certification Programs", path: "/academy" },
      { name: "Register Now Form", path: "/academy/register" },
    ],
  },
];
// ─── Products mega-menu data ────────────────────────────────────────────────

type ProductCategory = {
  name: string;
  path: string;
};

type ProductItem = {
  name: string;
  image: string;
  path: string;
};

// Banner Type for the specific category view
type CategoryBanner = {
  title: string;
  image: string;
  path: string;
  description?: string;
};

// Residential product categories
const residentialCategories: (ProductCategory & {
  products: ProductItem[];
  series: { label: string; path: string }[];
  banners?: CategoryBanner[];
})[] = [
    {
      name: "Complete Hybrid Solar Systems",
      path: "/shop/off-grid-inverter",
      series: [
        { label: "IVPS Series", path: "/shop" },
        { label: "IVGM Series", path: "/shop" },
        { label: "IVPM Series", path: "/shop" },
      ],
      banners: [
        {
          title: "IVEM",
          image: "./products.webp",
          path: "/shop",
        },
        {
          title: "IVPM",
          image: "./products.webp",
          path: "/shop",
        },
        {
          title: "FLEX",
          image: "./products.webp",
          path: "/shop",
        },
      ],
      products: [
        { name: "IVPS3.5~10kVA", image: "./products.webp", path: "/shop" },
        { name: "IVPS0712-1512", image: "./products.webp", path: "/shop" },
        { name: "IVEM8~12kW", image: "./products.webp", path: "/shop" },
        { name: "IVEM-3.6kW", image: "./products.webp", path: "/shop" },
        { name: "IVCM1012-LV", image: "./products.webp", path: "/shop" },
        { name: "IVPA-Pro", image: "./products.webp", path: "/shop" },
        { name: "IVPS-Mini", image: "./products.webp", path: "/shop" },
        { name: "IVPM-5kW", image: "./products.webp", path: "/shop" },
        { name: "IVPM-8kW", image: "./products.webp", path: "/shop" },
        { name: "FLEX-Home 5kVA", image: "./products.webp", path: "/shop" },
        { name: "FLEX-Home 10kVA", image: "./products.webp", path: "/shop" },
      ],
    },
    {
      name: "CCTV Surveillance Systems",
      path: "/shop/hybrid-inverter",
      series: [
        { label: "IVCM Series", path: "/shop" },
        { label: "IVHG Series", path: "/shop" },
        { label: "IVPM Series", path: "/shop" },
      ],
      products: [
        { name: "IVCM1/2/3kW-PRO", image: "./products.webp", path: "/shop" },
        { name: "IVCM5kW-Lite", image: "./products.webp", path: "/shop" },
        { name: "IVHG-30kW", image: "./products.webp", path: "/shop" },
        { name: "IVHG-50kW", image: "./products.webp", path: "/shop" },
        { name: "IVHG-100kW", image: "./products.webp", path: "/shop" },
      ],
    },
    {
      name: "Shop All Products",
      path: "/shop/micro-inverter",
      series: [
        { label: "IVEM Series", path: "/shop" },
        { label: "Micro-400W Series", path: "/shop" },
      ],
      products: [
        { name: "IVEM8~12kW-II", image: "./products.webp", path: "/shop" },
        { name: "IVEM-400W", image: "./products.webp", path: "/shop" },
        { name: "IVEM-800W", image: "./products.webp", path: "/shop" },
      ],
    },
  ];

// Commercial product categories
const commercialCategories: (ProductCategory & {
  products: ProductItem[];
  series: { label: string; path: string }[];
  banners?: CategoryBanner[];
})[] = [
    {
      name: "Commercial Hybrid Solar Systems",
      path: "/shop/cabinet-ess",
      series: [
        { label: "Liquid Cooling Series", path: "/shop" },
        { label: "Air Cooling Series", path: "/shop" },
      ],
      banners: [
        {
          title: "DXLV",
          image: "./products.webp",
          path: "/shop",
        },
        {
          title: "DXHV",
          image: "./products.webp",
          path: "/shop",
        },
        {
          title: "FLEX",
          image: "./products.webp",
          path: "/shop",
        },
      ],
      products: [
        { name: "FLM500-125/261", image: "./products.webp", path: "/shop" },
        { name: "FLH-E60", image: "./products.webp", path: "/shop" },
        { name: "FLS-MES215AF-S", image: "./products.webp", path: "/shop" },
        { name: "FLS-ES232LC-S", image: "./products.webp", path: "/shop" },
        { name: "IVGM-50kW", image: "./products.webp", path: "/shop" },
        { name: "IVGM-100kW", image: "./products.webp", path: "/shop" },
        { name: "DXLV-100", image: "./products.webp", path: "/shop" },
        { name: "DXLV-200", image: "./products.webp", path: "/shop" },
        { name: "DXHV-200", image: "./products.webp", path: "/shop" },
        { name: "DXHV-500", image: "./products.webp", path: "/shop" },
        { name: "FLEX-C&I 100kVA", image: "./products.webp", path: "/shop" },
        { name: "FLEX-C&I 250kVA", image: "./products.webp", path: "/shop" },
      ],
    },
  ];

// Mini Grid product categories
const miniGridCategories: (ProductCategory & { products: ProductItem[]; series: { label: string; path: string }[] })[] = [
  {
    name: "Mini Grid Systems",
    path: "/shop/mini-grid",
    series: [
      { label: "Off-Grid Mini Grid", path: "/shop" },
      { label: "Hybrid Mini Grid", path: "/shop" },
    ],
    products: [
      { name: "MG-50kW System", image: "./products.webp", path: "/shop" },
      { name: "MG-100kW System", image: "./products.webp", path: "/shop" },
      { name: "MG-200kW System", image: "./products.webp", path: "/shop" },
      { name: "MG-500kW System", image: "./products.webp", path: "/shop" },
    ],
  },
  {
    name: "Mini Grid Tied",
    path: "/shop/mini-grid",
    series: [
      { label: "Off-Grid Mini Grid", path: "/shop" },
      { label: "Hybrid Mini Grid", path: "/shop" },
    ],
    products: [
      { name: "MG-50kW System", image: "./products.webp", path: "/shop" },
      { name: "MG-100kW System", image: "./products.webp", path: "/shop" },
      { name: "MG-200kW System", image: "./products.webp", path: "/shop" },
      { name: "MG-500kW System", image: "./products.webp", path: "/shop" },
    ],
  },
];

// ─── Product card ───────────────────────────────────────────────────────────
// large = same footprint as the Residential / Commercial banner flyers
// (aspect-[3/4] + 1/2/4-column responsive widths inside the 1200px container).
// default = compact fixed-size centered card (flex-none w-40 md:w-44).
function ProductCard({ product, large = false }: { product: ProductItem; large?: boolean }) {
  return (
    <Link
      to={product.path}
      className={`group flex flex-col items-center gap-2 ${large
        ? "w-full md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
        : "flex-none w-40 md:w-44"
        }`}
    >
      <div
        className={`w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center hover:border-secondary/40 hover:shadow-md transition-all duration-200 ${large ? "aspect-[3/4]" : "aspect-square"
          }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <span
        className={`font-montserrat text-center text-slate-600 group-hover:text-secondary transition-colors leading-tight ${large ? "font-semibold text-sm" : "font-medium text-xs"
          }`}
      >
        {product.name}
      </span>
    </Link>
  );
}

// ─── Products Mega Menu Component ───────────────────────────────────────────

function ProductsMegaMenu({
  isScrolled,
  activeCategory,
  setActiveCategory,
  productType,
  setProductType,
}: {
  isScrolled: boolean;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  productType: "residential" | "commercial" | "mini-grid";
  setProductType: (type: "residential" | "commercial" | "mini-grid") => void;
}) {
  const categories = productType === "residential"
    ? residentialCategories
    : productType === "commercial"
      ? commercialCategories
      : miniGridCategories;

  const activeCat = categories.find((c) => c.name === activeCategory) ?? categories[0];
  const hasBanners = !!activeCat.banners && activeCat.banners.length > 0;
  const isMiniGrid = productType === "mini-grid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{ top: isScrolled ? "56px" : "80px" }}
      className="fixed left-0 right-0 z-[100] shadow-2xl"
    >
      <div className="bg-white border-t-2 border-gray-400 mt-5 mb-2">
        <div className="max-w-[1400px] mx-auto">

          {/* Product Type Tabs - Montserrat Bold */}
          <div className="flex items-center justify-center gap-8 py-5 border-b border-slate-100">
            <button
              onClick={() => setProductType("residential")}
              className={`font-montserrat font-bold text-base transition-colors flex items-center gap-1 ${productType === "residential"
                ? "text-secondary"
                : "text-slate-700 hover:text-secondary"
                }`}
            >
              Residential <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setProductType("commercial")}
              className={`font-montserrat font-bold text-base transition-colors flex items-center gap-1 ${productType === "commercial"
                ? "text-secondary"
                : "text-slate-700 hover:text-secondary"
                }`}
            >
              Commercial & Industrial <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setProductType("mini-grid")}
              className={`font-montserrat font-bold text-base transition-colors flex items-center gap-1 ${productType === "mini-grid"
                ? "text-secondary"
                : "text-slate-700 hover:text-secondary"
                }`}
            >
              Mini Grid <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar and Products side by side */}
          <div className="flex" style={{ height: "calc(100vh - 180px)" }}>
            {/* ─ Left sidebar: categories - Montserrat Medium ─ */}
            <aside className="w-52 flex-shrink-0 border-r border-slate-100 py-4">
              {categories.map((cat) => {
                const active = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onMouseEnter={() => setActiveCategory(cat.name)}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-5 py-3 font-montserrat text-sm font-medium transition-colors group
                      ${active
                        ? "text-secondary font-semibold"
                        : "text-slate-700 hover:text-secondary"
                      }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-colors ${active ? "text-secondary" : "text-slate-300 group-hover:text-secondary"}`}
                    />
                  </button>
                );
              })}
            </aside>

            {/* ── Right: Content Area (Banners OR Product Cards) ── */}
            <div className="flex-1 px-6 py-5 flex flex-col overflow-hidden">

              <AnimatePresence mode="wait">
                {hasBanners ? (
                  // Banner flyers layout
                  <motion.div
                    key={`${activeCat.name}-banners`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    // CHANGE 1: h-full -> h-auto (This is crucial! It stops the container from stretching)
                    className="w-full h-auto flex items-start justify-center"
                  >
                    {/* CHANGE 2: Added pb-6 for extra bottom padding */}
                    <div className="w-full max-w-[1200px] p-4 md:p-5 bg-white pb-6">
                      <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        {activeCat.banners!.map((banner, idx) => (
                          <Link
                            key={idx}
                            to={banner.path}
                            aria-label={`Shop ${banner.title}`}
                            // CHANGE 3: Replaced aspect-[3/4] with h-[350px] to force a shorter, fixed height
                            className="group relative block overflow-hidden rounded-[4px] bg-slate-100 h-[350px] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                          >
                            <img
                              src={banner.image}
                              alt={banner.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // ... rest of your code (Product Cards) ...
                  // Residential / Commercial flyers); others stay compact.
                  <motion.div
                    key={`${activeCat.name}-products`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="flex-1 overflow-y-auto"
                  >
                    <div className={isMiniGrid ? "w-full max-w-[1200px] mx-auto p-[20px_24px]" : ""}>
                      <div className="flex flex-wrap justify-center gap-4">
                        {activeCat.products.map((product) => (
                          <ProductCard key={product.name} product={product} large={isMiniGrid} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Series links row — only for non-banner views */}
              {!hasBanners && (
                <div className="flex items-center gap-2 flex-wrap border-t border-slate-100 pt-3 mt-4">
                  {activeCat.series.map((s) => (
                    <Link
                      key={s.label}
                      to={s.path}
                      className="font-poppins font-normal text-xs text-slate-500 hover:text-secondary transition-colors"
                    >
                      {s.label} &gt;
                    </Link>
                  ))}
                  <Link
                    to={activeCat.path}
                    className="ml-auto font-montserrat font-semibold text-xs text-secondary hover:underline"
                  >
                    All {activeCat.name} &gt;
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const [activeProductCategory, setActiveProductCategory] = useState(
    residentialCategories[0].name
  );
  const [productType, setProductType] = useState<"residential" | "commercial" | "mini-grid">("residential");
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FIX: Close menus on ANY navigation — pathname AND search (query string).
  // Previously only pathname was watched, so navigating /shop → /shop?model=IVGM
  // left the mega menu open, overlaying the shop page.
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenMobileSub(null);
  }, [location.pathname, location.search]);

  const handleMobileNavClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    setIsMobileMenuOpen(false);
    setOpenMobileSub(null);

    if (location.pathname === path) {
      event.preventDefault();
      window.location.reload();
    }
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.assign("/");
  };

  // HOME | ABOUT | SOLUTIONS | SHOP PRODUCTS | PROJECTS | RESOURCES ▾
  const navLinks: NavLink[] = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Embrace",
      path: "/about",
      children: [
        { name: "Our Company", path: "/about" },
        { name: "Team", path: "/team" },
        {
          name: "Projects",
          path: "/projects",
          description: "See our completed installations and case work",
        },
      ],
    },
    {
      name: "Solutions",
      path: "/services",
      // Minimal dropdown: title + one-line description, no images.
      children: [
        {
          name: "Residential",
          path: "/services",
          description: "Homes, estates, duplexes and apartments",
        },
        {
          name: "Commercial",
          path: "/services",
          description: "Offices, hospitals, schools and retail",
        },
        {
          name: "C&I ESS Cabinet",
          path: "/services",
          description: "Containerized energy storage for commercial & industrial sites",
        },
        {
          name: "Project Cases",
          path: "/services",
          description: "Real installations and case studies from our work",
        },
        {
          name: "System Config Plan",
          path: "/services",
          description: "Custom system sizing and configuration for your site",
        },
      ],
    },
    {
      name: "Shop",
      path: "/shop",
      // children intentionally empty — mega menu is handled separately
      children: [],
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Resources",
      path: "/resources",
      // children handled by resourcesGroups (medium dropdown)
    },
  ];

  const isActive = (link: NavLink) => {
    return location.pathname === link.path && link.path !== "/";
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-1.5 sm:py-2 text-primary"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-3">
          {/* Logo - Far Left */}
          <Link to="/" onClick={handleLogoClick} className="group flex-shrink-0 min-w-0">
            <img
              src="/nav-logo.webp"
              alt="Embrace Technologies"
              className={`
                rounded-[20px] object-contain transition-all duration-300 group-hover:scale-105 max-w-full
                ${isScrolled
                  ? "h-10 w-24 sm:h-11 sm:w-28 md:h-14 md:w-36"
                  : "h-12 w-28 sm:h-14 sm:w-32 md:h-16 md:w-40 lg:h-20 lg:w-44"}
              `}
            />
          </Link>

          {/* Desktop Nav - Center - Montserrat Bold */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-4">
              {navLinks.map((link) => {
                const isProducts = link.name === "Shop";
                const isResources = link.name === "Resources";
                const hasChildren = !!link.children?.length;
                const active = isActive(link);

                // Simple link (no children) - Montserrat Bold
                if (!hasChildren && !isProducts && !isResources) {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`font-montserrat font-bold text-sm capitalize tracking-wide transition-colors py-2 px-1 ${active
                        ? "text-secondary"
                        : "text-primary hover:text-secondary"
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                }

                // Shop Products — dedicated mega menu trigger - Montserrat Bold
                if (isProducts) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown("Shop")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        type="button"
                        className={`flex items-center gap-1 font-montserrat font-bold text-sm capitalize tracking-wide transition-colors py-2 px-1 ${active
                          ? "text-secondary"
                          : "text-primary hover:text-secondary"
                          }`}
                        aria-haspopup="true"
                        aria-expanded={openDropdown === "Shop"}
                      >
                        <span>Shop</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "Shop" ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openDropdown === "Shop" && (
                          <ProductsMegaMenu
                            isScrolled={isScrolled}
                            activeCategory={activeProductCategory}
                            setActiveCategory={setActiveProductCategory}
                            productType={productType}
                            setProductType={setProductType}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Resources — medium hover dropdown (3 columns)
                if (isResources) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(link.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown(openDropdown === link.name ? null : link.name)
                        }
                        className={`flex items-center gap-1 font-montserrat font-bold text-sm capitalize tracking-wide transition-colors py-2 px-1 ${active
                          ? "text-secondary"
                          : "text-primary hover:text-secondary"
                          }`}
                        aria-haspopup="true"
                        aria-expanded={openDropdown === link.name}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className={`absolute top-full right-0 pt-2 z-50 ${isScrolled ? "mt-0" : "mt-2"}`}
                          >
                            <div className={`bg-white shadow-2xl border-t-2 border-gray-400 overflow-hidden w-64 ${isScrolled ? "mt-4" : "mt-5"}`}>
                              {resourcesGroups.map((group) => (
                                <div key={group.title} className="px-6 py-5">
                                  <h4 className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary border-b border-slate-200 pb-2 mb-3">
                                    {group.title}
                                  </h4>
                                  <ul className="space-y-2.5">
                                    {group.items.map((item) => (
                                      <li key={item.name}>
                                        <Link
                                          to={item.path}
                                          className="group flex items-baseline gap-2 font-poppins font-normal text-sm text-slate-700 hover:text-secondary transition-colors"
                                        >
                                          <span className="text-secondary text-xs leading-none">•</span>
                                          <span>
                                            {item.name}
                                            {item.badge && (
                                              <span className="ml-1 font-montserrat font-bold text-[10px] text-secondary">
                                                ({item.badge})
                                              </span>
                                            )}
                                          </span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Dropdowns with children (Solutions, About) — same box
                // styling as the Resources dropdown: white panel,
                // shadow-2xl, border-t-2 border-gray-400, bulleted list.
                // Solutions items additionally show a one-line description.
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.name ? null : link.name)
                      }
                      className={`flex items-center gap-1 font-montserrat font-bold text-sm capitalize tracking-wide transition-colors py-2 px-1 ${active
                        ? "text-secondary"
                        : "text-primary hover:text-secondary"
                        }`}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === link.name}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 z-50 ${isScrolled ? "mt-0" : "mt-2"}`}
                        >
                          <div className={`bg-white shadow-2xl border-t-2 border-gray-400 overflow-hidden ${isScrolled ? "mt-4" : "mt-5"}`}>
                            <ul className="py-4 px-6 space-y-3">
                              {link.children!.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    to={child.path}
                                    className="group flex items-baseline gap-2 font-poppins font-normal text-sm text-slate-700 hover:text-secondary transition-colors"
                                  >
                                    <span className="text-secondary text-xs leading-none">•</span>
                                    <span>
                                      <span className="block">{child.name}</span>
                                      {child.description && (
                                        <span className="mt-0.5 block text-xs text-slate-500 group-hover:text-secondary/80">
                                          {child.description}
                                        </span>
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Cart and Contact Us - Far Right */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <Link
              to="/cart"
              className="group relative inline-flex items-center justify-center p-2"
              aria-label="View cart"
            >
              <span className="relative inline-block">
                <img
                  src="/shopping-cart.png"
                  alt="Shopping Cart"
                  className="w-6 h-6 transition-transform group-hover:scale-110"
                />
                {totalItems > 0 && (
                  <span
                    className="absolute z-50 flex items-center justify-center rounded-full bg-orange-500 font-bold text-white shadow-md pointer-events-none"
                    style={{
                      top: "-7px",
                      right: "-7px",
                      minWidth: "18px",
                      height: "18px",
                      padding: "0 4px",
                      fontSize: "10px",
                      lineHeight: "1",
                      border: "2px solid #ffffff",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </span>
            </Link>

            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white font-montserrat font-semibold px-6 py-2.5 rounded-sm shadow-md uppercase text-sm tracking-wide transition-all duration-200 hover:from-orange-600 hover:to-amber-600 hover:shadow-lg hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile: Cart icon + Hamburger toggle */}
          <div className="lg:hidden flex items-center gap-1 flex-shrink-0">
            {/* Cart icon — left of hamburger */}
            <Link
              to="/cart"
              className="relative inline-flex items-center justify-center p-2 text-primary"
              aria-label="View cart"
            >
              <span className="relative inline-block">
                <img
                  src="/shopping-cart.png"
                  alt="Shopping Cart"
                  className="w-6 h-6"
                />
                {totalItems > 0 && (
                  <span
                    className="absolute z-50 flex items-center justify-center rounded-full bg-orange-500 font-bold text-white shadow-md pointer-events-none"
                    style={{
                      top: "-7px",
                      right: "-7px",
                      minWidth: "18px",
                      height: "18px",
                      padding: "0 4px",
                      fontSize: "10px",
                      lineHeight: "1",
                      border: "2px solid #ffffff",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </span>
            </Link>

            {/* Hamburger */}
            <button
              className="p-2 transition-colors text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav - Montserrat Medium */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden transition-colors bg-white border-t border-slate-100"
          >
            {/* FIX: cap menu at viewport height and scroll internally,
                so long dropdowns (Resources) never get stuck off-screen */}
            <div
              className="overflow-y-auto overscroll-contain"
              style={{ maxHeight: "calc(100dvh - 64px)" }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isProducts = link.name === "Shop";
                  const isResources = link.name === "Resources";

                  if (isProducts) {
                    const isOpen = openMobileSub === "Shop";
                    return (
                      <div
                        key="Shop"
                        className="transition-colors border-b border-slate-50"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenMobileSub(isOpen ? null : "Shop")}
                          className="w-full flex items-center justify-between font-montserrat font-medium text-lg py-3 capitalize tracking-wide transition-colors text-primary"
                          aria-expanded={isOpen}
                        >
                          <span>Shop</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4 border-l-2 border-secondary ml-1 mb-3"
                            >
                              {residentialCategories.map((cat) => (
                                <li key={cat.name}>
                                  <Link
                                    to={cat.path}
                                    onClick={(event) => handleMobileNavClick(event, cat.path)}
                                    className="block font-montserrat font-medium text-sm py-2 transition-colors text-slate-600"
                                  >
                                    {cat.name}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  if (isResources) {
                    const isOpen = openMobileSub === "Resources";
                    return (
                      <div
                        key="Resources"
                        className="transition-colors border-b border-slate-50"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenMobileSub(isOpen ? null : "Resources")}
                          className="w-full flex items-center justify-between font-montserrat font-medium text-lg py-3 capitalize tracking-wide transition-colors text-primary"
                          aria-expanded={isOpen}
                        >
                          <span>Resources</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4 border-l-2 border-secondary ml-1 mb-3"
                            >
                              {resourcesGroups.map((group) => (
                                <div key={group.title} className="pt-2">
                                  <div className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary pb-1">
                                    {group.title}
                                  </div>
                                  <ul>
                                    {group.items.map((item) => (
                                      <li key={item.name}>
                                        <Link
                                          to={item.path}
                                          onClick={(event) => handleMobileNavClick(event, item.path)}
                                          className="block font-montserrat font-medium text-sm py-2 transition-colors text-slate-600"
                                        >
                                          {item.name}
                                          {item.badge && (
                                            <span className="ml-1 text-xs font-bold text-secondary">
                                              ({item.badge})
                                            </span>
                                          )}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const hasChildren = !!link.children?.length;
                  if (!hasChildren) {
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={(event) => handleMobileNavClick(event, link.path)}
                        className="font-montserrat font-medium text-lg py-3 capitalize tracking-wide transition-colors text-primary border-b border-slate-50"
                      >
                        {link.name}
                      </Link>
                    );
                  }

                  const isOpen = openMobileSub === link.name;
                  return (
                    <div
                      key={link.name}
                      className="transition-colors border-b border-slate-50"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileSub(isOpen ? null : link.name)
                        }
                        className="w-full flex items-center justify-between font-montserrat font-medium text-lg py-3 capitalize tracking-wide transition-colors text-primary"
                        aria-expanded={isOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 border-l-2 border-secondary ml-1 mb-3"
                          >
                            {link.children!.map((child) => (
                              <li key={child.name}>
                                <Link
                                  to={child.path}
                                  onClick={(event) => handleMobileNavClick(event, child.path)}
                                  className="block font-montserrat font-medium text-sm py-2 transition-colors text-slate-600"
                                >
                                  {child.name}
                                </Link>
                                {child.description && (
                                  <p className="pb-2 -mt-1 text-xs text-slate-400">
                                    {child.description}
                                  </p>
                                )}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Contact Us Button (mobile) */}
                <div className="flex items-center gap-3 mt-4">
                  <Link
                    to="/contact"
                    onClick={(event) => handleMobileNavClick(event, "/contact")}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-montserrat font-semibold px-6 py-3 rounded-sm text-center uppercase tracking-wide shadow-md transition-all duration-200 hover:from-orange-600 hover:to-amber-600"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
