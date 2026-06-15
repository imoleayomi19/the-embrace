import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
type NavChild = {
  name: string;
  path: string;
};
type NavLink = {
  name: string;
  path: string;
  children?: NavChild[];
};
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
      name: "About",
      path: "/about",
    },
    
    {
      name: "Services",
      path: "/services",
      children: [
        {
          name: "Hybrid Solar Systems",
          path: "/services",
        },
        {
          name: "CCTV Surveillance systems",
          path: "/services",
        },
        {
          name: "Mini Grid Solution",
          path: "/services",
        },
        {
          name: "Project Management & Partnership",
          path: "/services",
        },
        {
          name: "Equipment Sales, Supply & Installation",
          path: "/services",
        },
      ],
    },
    {
      name: "Shop",
      path: "/shop",
      children: [
        {
          name: "Residential/SME Hybrid Solar Systems",
          path: "/shop/hybrid-solar-system",
        },
        {
          name: "Protection devices",
          path: "/shop/protection-devices",
        },
        {
          name: "Accessories",
          path: "/shop/accessories",
        },
      ],
    },
    {
      name: "Academy",
      path: "/academy",
      children: [
        {
          name: "Solar Installation Track",
          path: "/academy",
        },
        {
          name: "Inverter & Battery Workshop",
          path: "/academy",
        },
        {
          name: "Certification Programs",
          path: "/academy",
        },
        {
          name: "Corporate Capacity Building",
          path: "/academy",
        },
      ],
    },
     {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
  ];

  const isActive = (link: NavLink) => {
    if (link.name === "Home") return location.pathname === "/";
    return location.pathname === link.path && link.path !== "/";
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2 text-primary" : "py-3 text-white"}`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <img
          src="./embrace-logo.jpg"
          alt="Embrace Technologies"
          className="h-12 md:h-14 w-36 rounded-[20px] md:w-44 object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const hasChildren = !!link.children?.length;
            const active = isActive(link);
            if (!hasChildren) {
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-montserrat font-bold text-sm transition-colors relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full hover:text-secondary ${active ? "text-secondary" : isScrolled ? "text-primary" : "text-white/90"}`}
                >
                  {link.name}
                </Link>
              );
            }
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
                    setOpenDropdown(
                      openDropdown === link.name ? null : link.name,
                    )
                  }
                  className={`flex items-center gap-1 font-montserrat font-bold text-sm transition-colors relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full hover:text-secondary ${active ? "text-secondary" : isScrolled ? "text-primary" : "text-white/90"}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === link.name}
                >
                  {link.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === link.name && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                      }}
                      transition={{
                        duration: 0.18,
                      }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72"
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="h-1 bg-secondary" />
                        <ul className="py-2">
                          {link.children!.map((child) => (
                            <li key={child.name}>
                              <Link
                                to={child.path}
                                className="block px-5 py-3 font-montserrat text-sm text-primary relative pb-2 after:absolute after:bottom-1 after:left-5 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-[calc(100%-40px)] hover:bg-slate-50 hover:text-secondary transition-colors"
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

          <Link
            to="/"
            className="bg-secondary text-primary font-bold font-poppins px-6 py-2.5 rounded-sm hover:bg-yellow-400 transition-colors shadow-sm"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-primary" : "text-white"}`}
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

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className={`lg:hidden overflow-hidden transition-colors ${isScrolled ? "bg-white border-t border-slate-100" : "bg-primary/95 backdrop-blur-md border-t border-primary/50"}`}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const hasChildren = !!link.children?.length;
                if (!hasChildren) {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`font-montserrat font-medium text-lg py-3 relative pb-1 after:absolute after:bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full hover:text-secondary transition-colors ${isScrolled ? "text-primary border-b border-slate-50" : "text-white border-b border-primary/30"}`}
                    >
                      {link.name}
                    </Link>
                  );
                }
                const isOpen = openMobileSub === link.name;
                return (
                  <div key={link.name} className={`transition-colors ${isScrolled ? "border-b border-slate-50" : "border-b border-primary/30"}`}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileSub(isOpen ? null : link.name)
                      }
                      className={`w-full flex items-center justify-between font-montserrat font-medium text-lg py-3 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full hover:text-secondary transition-colors ${isScrolled ? "text-primary" : "text-white"}`}
                      aria-expanded={isOpen}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.ul
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="overflow-hidden pl-4 border-l-2 border-secondary ml-1 mb-3"
                        >
                          {link.children!.map((child) => (
                            <li key={child.name}>
                              <Link
                                to={child.path}
                                className={`block font-montserrat text-sm py-2 relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full hover:text-secondary transition-colors ${isScrolled ? "text-slate-600" : "text-white/80"}`}
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
                to="/"
                className="bg-secondary text-primary font-bold font-poppins px-6 py-3 rounded-sm text-center mt-4"
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
