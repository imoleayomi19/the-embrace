import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
// ── Main Navbar ────────────────────────────────────────────────────────────

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const location = useLocation();

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
          name: "Commercial & Industrial",
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
      children: [
        {
          name: "Complete Hybrid Solar Package",
          path: "/shop",
          description: "Felicity, Deye, Growth",
        },
        {
          name: "IVEM Series",
          path: "/shop",
          description: "IVEM, IVGM, IVPM, FLEX, DXLV, DXHV",
        },
        {
          name: "CCTV Surveillance Package",
          path: "/shop",
          description: "Full CCTV kits for homes and businesses",
        },
        {
          name: "Equipment & Component Store",
          path: "/shop",
          description: "Inverters, batteries, panels, breakers, etc.",
        },
        {
          name: "All Products",
          path: "/shop",
        },
      ],
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
                const isResources = link.name === "Resources";
                const hasChildren = !!link.children?.length;
                const active = isActive(link);

                // Simple link (no children, not Resources)
                if (!hasChildren && !isResources) {
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

          {/* Contact Us - Far Right */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">

            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white font-montserrat font-semibold px-6 py-2.5 rounded-sm shadow-md uppercase text-sm tracking-wide transition-all duration-200 hover:from-orange-600 hover:to-amber-600 hover:shadow-lg hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile: Hamburger toggle */}
          <div className="lg:hidden flex items-center gap-1 flex-shrink-0">

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
                  const isResources = link.name === "Resources";

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
