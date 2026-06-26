import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NavChild = {
  name: string;
  path: string;
  image?: string;
};

type NavLink = {
  name: string;
  path: string;
  children?: NavChild[];
};

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

type ProductTab = "Residential" | "Commercial & Industrial";

const productCategories: ProductCategory[] = [
  { name: "Off Grid Inverter", path: "/shop/off-grid-inverter" },
  { name: "Hybrid Inverter", path: "/shop/hybrid-inverter" },
  { name: "Micro Inverter", path: "/shop/micro-inverter" },
  { name: "Lithium Battery", path: "/shop/lithium-battery" },
  { name: "All in One ESS", path: "/shop/all-in-one-ess" },
  { name: "Gel Battery", path: "/shop/gel-battery" },
  { name: "Key Components", path: "/shop/key-components" },
];

const productsByTab: Record<ProductTab, ProductItem[]> = {
  Residential: [
    { name: "IVPS3.5~10kVA-US", image: "/solar-4.jpg", path: "/shop" },
    { name: "IVCM1012-LV", image: "/solar-5.jpg", path: "/shop" },
    { name: "IVEM8~12kW-II", image: "/solar-6.jpg", path: "/shop" },
    { name: "IVCM1/2/3kW-PRO", image: "/solar-7.jpg", path: "/shop" },
    { name: "IVPS0712-1512", image: "/solar-8.jpg", path: "/shop" },
  ],
  "Commercial & Industrial": [
    { name: "IVHG 30-100kW", image: "/solar-5.jpg", path: "/shop" },
    { name: "IVCS 50kW ESS", image: "/solar-6.jpg", path: "/shop" },
    { name: "IVMG 3-Phase", image: "/solar-7.jpg", path: "/shop" },
    { name: "IVLI-200AH", image: "/solar-8.jpg", path: "/shop" },
    { name: "IVCA-Stack", image: "/solar-4.jpg", path: "/shop" },
  ],
};

const productSeries = [
  { label: "IVEM Series", path: "/shop" },
  { label: "IVCM Series", path: "/shop" },
  { label: "IVPM Series", path: "/shop" },
  { label: "IVPS Series", path: "/shop" },
  { label: "IVPA Series", path: "/shop" },
];

// ─── Products Mega Menu Component ────────────────────────────────────────────

function ProductsMegaMenu({
  isScrolled,
  activeCategory,
  setActiveCategory,
}: {
  isScrolled: boolean;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<ProductTab>("Residential");
  const products = productsByTab[activeTab];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{ top: isScrolled ? "56px" : "80px" }}
      className="fixed left-0 right-0 z-[100] shadow-2xl"
    >
      <div className="bg-white border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto flex" style={{ minHeight: 340 }}>

          {/* ── Left sidebar: categories ── */}
          <aside className="w-52 flex-shrink-0 border-r border-slate-100 py-4">
            {productCategories.map((cat) => {
              const active = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onMouseEnter={() => setActiveCategory(cat.name)}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full flex items-center justify-between px-5 py-2.5 font-montserrat text-sm font-medium transition-colors group
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

          {/* ── Right: tabs + product grid + series ── */}
          <div className="flex-1 px-6 py-4 flex flex-col gap-4">

            {/* Top tabs */}
            <div className="flex items-center gap-6 border-b border-slate-100 pb-3">
              {(["Residential", "Commercial & Industrial"] as ProductTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`font-montserrat font-semibold text-sm pb-1 border-b-2 transition-colors
                    ${activeTab === tab
                      ? "text-secondary border-secondary"
                      : "text-slate-500 border-transparent hover:text-primary"
                    }`}
                >
                  {tab}
                  <ChevronRight className="inline w-3 h-3 ml-1 opacity-60" />
                </button>
              ))}
            </div>

            {/* Product image grid */}
            <div className="grid grid-cols-5 gap-4 flex-1">
              {products.map((product) => (
                <Link
                  key={product.name}
                  to={product.path}
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="w-full aspect-square bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex items-center justify-center hover:border-secondary/40 hover:shadow-md transition-all duration-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <span className="font-montserrat text-xs text-center text-slate-600 group-hover:text-secondary transition-colors leading-tight">
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Series links row */}
            <div className="flex items-center gap-1 flex-wrap border-t border-slate-100 pt-3">
              {productSeries.map((s) => (
                <Link
                  key={s.label}
                  to={s.path}
                  className="font-montserrat text-xs text-slate-500 hover:text-primary transition-colors px-1"
                >
                  {s.label} &gt;
                </Link>
              ))}
              <Link
                to="/shop"
                className="ml-auto font-montserrat text-xs font-semibold text-secondary hover:underline"
              >
                All Products &gt;
              </Link>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const [activeProductCategory, setActiveProductCategory] = useState(
    productCategories[0].name
  );
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenMobileSub(null);
  }, [location.pathname]);

  const navLinks: NavLink[] = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Embrace",
      path: "/about",
      children: [
        {
          name: "Projects",
          path: "/projects",
        },
      ],
    },
    {
      name: "Solutions",
      path: "/services",
      children: [
        { name: "Balcony", path: "/services", image: "/solar-4.jpg" },
        { name: "Residential", path: "/services", image: "/solar-5.jpg" },
        { name: "Commercial", path: "/services", image: "/solar-6.jpg" },
        { name: "C&I ESS Cabinet", path: "/services", image: "/solar-7.jpg" },
        { name: "Project Cases", path: "/services", image: "/solar-8.jpg" },
        { name: "Esolar Platform", path: "/services", image: "/solar-4.jpg" },
        { name: "System Config Plan", path: "/services", image: "/solar-5.jpg" },
      ],
    },
    {
      name: "Products",
      path: "/shop",
      // children intentionally empty — mega menu is handled separately
      children: [],
    },
    {
      name: "Training Academy",
      path: "/academy",
      children: [
        { name: "Solar Installation Track", path: "/academy" },
        { name: "Inverter & Battery Workshop", path: "/academy" },
        { name: "Certification Programs", path: "/academy" },
        { name: "Corporate Capacity Building", path: "/academy" },
      ],
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
  ];

  const isActive = (link: NavLink) => {
    return location.pathname === link.path && link.path !== "/";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2 text-primary" : "py-0 text-white"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo - Far Left */}
          <Link to="/" className="group flex-shrink-0">
            <img
              src="./embrace-logo.jpg"
              alt="Embrace Technologies"
              className={`
                rounded-[20px] object-contain transition-all duration-300 group-hover:scale-105
                ${isScrolled ? "h-12 md:h-14 w-36 md:w-44" : "h-24 md:h-25 w-50 md:w-32"}
              `}
            />
          </Link>

          {/* Desktop Nav - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-4">
              {navLinks.map((link) => {
                const isProducts = link.name === "Products";
                const isSolutions = link.name === "Solutions";
                const hasChildren = !!link.children?.length;
                const active = isActive(link);

                // Simple link (no children)
                if (!hasChildren && !isProducts) {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`relative font-montserrat font-bold text-sm uppercase tracking-wide transition-colors py-2 px-1 ${active
                          ? "text-secondary"
                          : isScrolled
                            ? "text-primary"
                            : "text-white/90"
                        }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <motion.div
                        className="absolute inset-0 bg-secondary/10 rounded-md"
                        initial={{ opacity: 0, y: "100%", scaleY: 0.8 }}
                        whileHover={{ opacity: 1, y: 0, scaleY: 1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </Link>
                  );
                }

                // Products — dedicated mega menu trigger
                if (isProducts) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown("Products")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        type="button"
                        className={`relative flex items-center gap-1 font-montserrat font-bold text-sm uppercase tracking-wide transition-colors py-2 px-1 ${active
                            ? "text-secondary"
                            : isScrolled
                              ? "text-primary"
                              : "text-white/90"
                          }`}
                        aria-haspopup="true"
                        aria-expanded={openDropdown === "Products"}
                      >
                        <span className="relative z-10">Products</span>
                        <motion.div
                          className="absolute inset-0 bg-secondary/10 rounded-md"
                          initial={{ opacity: 0, y: "100%", scaleY: 0.8 }}
                          whileHover={{ opacity: 1, y: 0, scaleY: 1 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 relative z-10 ${openDropdown === "Products" ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openDropdown === "Products" && (
                          <ProductsMegaMenu
                            isScrolled={isScrolled}
                            activeCategory={activeProductCategory}
                            setActiveCategory={setActiveProductCategory}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Dropdowns with children (Solutions, About, Academy)
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
                      className={`relative flex items-center gap-1 font-montserrat font-bold text-sm uppercase tracking-wide transition-colors py-2 px-1 ${active
                          ? "text-secondary"
                          : isScrolled
                            ? "text-primary"
                            : "text-white/90"
                        }`}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === link.name}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <motion.div
                        className="absolute inset-0 bg-secondary/10 rounded-md"
                        initial={{ opacity: 0, y: "100%", scaleY: 0.8 }}
                        whileHover={{ opacity: 1, y: 0, scaleY: 1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 relative z-10 ${openDropdown === link.name ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {/* Mega Menu for Solutions - Full Width */}
                      {openDropdown === link.name && isSolutions && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            top: isScrolled ? "48px" : "72px",
                            height: isScrolled
                              ? "calc(100vh - 88px)"
                              : "calc(100vh - 112px)",
                          }}
                          className="fixed left-0 right-0 z-[100]"
                        >
                          <div className="bg-white shadow-2xl w-full h-full overflow-y-auto">
                            <div className="px-4 py-6">
                              <h3 className="text-2xl font-anton font-extrabold text-primary mb-6 uppercase tracking-wide text-center">
                                Our Solutions
                              </h3>
                              <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {link.children!.map((child, idx) => (
                                  <Link key={idx} to={child.path} className="group block">
                                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] w-[250px] h-[200px] mb-0 bg-gradient-to-br from-slate-100 to-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
                                      {child.image ? (
                                        <>
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                          <img
                                            src={child.image}
                                            alt={child.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                              (e.target as HTMLImageElement).style.display =
                                                "none";
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                                          <span className="text-slate-600 font-semibold text-xs">
                                            View Details
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-center">
                                      <span className="inline-block font-montserrat font-bold text-primary text-xs uppercase tracking-wide group-hover:text-secondary transition-colors duration-300">
                                        {child.name}
                                      </span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Regular dropdown for About, Academy */}
                      {openDropdown === link.name && !isSolutions && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 z-50"
                        >
                          <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                            <div className="h-1 bg-secondary" />
                            <ul className="py-2">
                              {link.children!.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    to={child.path}
                                    className="block px-5 py-3 font-montserrat text-sm text-primary hover:bg-slate-50 transition-colors"
                                  >
                                    {child.name}
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

          {/* Get a Quote Button - Far Right */}
          <div className="hidden lg:block flex-shrink-0">
            <Link
              to="/contact"
              className="bg-secondary text-primary font-bold font-poppins px-6 py-2.5 rounded-sm hover:bg-yellow-400 transition-colors shadow-sm uppercase text-sm tracking-wide"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors flex-shrink-0 ${isScrolled ? "text-primary" : "text-white"
              }`}
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

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden overflow-hidden transition-colors ${isScrolled
                ? "bg-white border-t border-slate-100"
                : "bg-primary/95 backdrop-blur-md border-t border-primary/50"
              }`}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isProducts = link.name === "Products";

                // Products mobile: show category list
                if (isProducts) {
                  const isOpen = openMobileSub === "Products";
                  return (
                    <div
                      key="Products"
                      className={`transition-colors ${isScrolled
                          ? "border-b border-slate-50"
                          : "border-b border-primary/30"
                        }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenMobileSub(isOpen ? null : "Products")}
                        className={`w-full flex items-center justify-between font-montserrat font-medium text-lg py-3 uppercase tracking-wide transition-colors ${isScrolled ? "text-primary" : "text-white"
                          }`}
                        aria-expanded={isOpen}
                      >
                        <span>Products</span>
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
                            {productCategories.map((cat) => (
                              <li key={cat.name}>
                                <Link
                                  to={cat.path}
                                  className={`block font-montserrat text-sm py-2 transition-colors ${isScrolled ? "text-slate-600" : "text-white/80"
                                    }`}
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

                const hasChildren = !!link.children?.length;
                if (!hasChildren) {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`font-montserrat font-medium text-lg py-3 uppercase tracking-wide transition-colors ${isScrolled
                          ? "text-primary border-b border-slate-50"
                          : "text-white border-b border-primary/30"
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                }

                const isOpen = openMobileSub === link.name;
                return (
                  <div
                    key={link.name}
                    className={`transition-colors ${isScrolled
                        ? "border-b border-slate-50"
                        : "border-b border-primary/30"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileSub(isOpen ? null : link.name)
                      }
                      className={`w-full flex items-center justify-between font-montserrat font-medium text-lg py-3 uppercase tracking-wide transition-colors ${isScrolled ? "text-primary" : "text-white"
                        }`}
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
                                className={`block font-montserrat text-sm py-2 transition-colors ${isScrolled ? "text-slate-600" : "text-white/80"
                                  }`}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                to="/contact"
                className="bg-secondary text-primary font-bold font-poppins px-6 py-3 rounded-sm text-center mt-4 uppercase tracking-wide"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}