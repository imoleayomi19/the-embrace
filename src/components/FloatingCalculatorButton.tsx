import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, Sparkles } from "lucide-react";

export function FloatingCalculatorButton() {
  const location = useLocation();

  // Hide the floating button when already on the Solar Calculator page
  if (location.pathname === "/solar-calculator") {
    return null;
  }

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", damping: 22, stiffness: 220, delay: 0.4 }}
      className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 font-montserrat pointer-events-auto"
      aria-label="Solar Load Calculator Shortcut"
    >
      <Link
        to="/solar-calculator"
        className="group relative flex items-center gap-2.5 sm:gap-3 bg-gradient-to-r from-[#fd8d07] via-[#f97316] to-[#EA6936] text-white pl-2.5 pr-4 sm:pl-3 sm:pr-5 py-2.5 sm:py-3 rounded-full shadow-[0_10px_35px_rgba(253,141,7,0.45)] hover:shadow-[0_14px_45px_rgba(253,141,7,0.65)] border border-white/25 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-secondary/40 select-none"
      >
        {/* Soft background pulse effect */}
        <span
          className="absolute inset-0 rounded-full bg-secondary opacity-30 -z-10 animate-ping pointer-events-none"
          style={{ animationDuration: "3s" }}
        />

        {/* Icon Circle */}
        <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-12 transition-transform duration-300">
          <Calculator className="w-5 h-5 text-white" />
        </span>

        {/* Label */}
        <div className="flex flex-col text-left">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-amber-100/90 leading-none flex items-center gap-1">
            Free Tool
            <Sparkles className="w-2.5 h-2.5 text-amber-200" />
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-white leading-tight mt-0.5 whitespace-nowrap">
            Load Calculator
          </span>
        </div>
      </Link>
    </motion.aside>
  );
}

