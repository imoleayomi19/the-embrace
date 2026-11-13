import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, X } from "lucide-react";

export function FloatingCalculatorButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Hide the floating button when already on the Solar Calculator page
  if (location.pathname === "/solar-calculator") {
    return null;
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 220, delay: 0.3 }}
      className="fixed bottom-24 sm:bottom-28 right-0 z-40 font-montserrat select-none pointer-events-auto"
      aria-label="Solar Load Calculator Shortcut"
    >
      <AnimatePresence mode="wait">
        {!isCollapsed ? (
          <motion.div
            key="expanded"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            className="flex items-stretch bg-gradient-to-r from-[#fd8d07] to-[#EA6936] text-white rounded-l-2xl shadow-[0_8px_30px_rgba(253,141,7,0.45)] hover:shadow-[0_12px_40px_rgba(253,141,7,0.6)] overflow-hidden border-y border-l border-white/25 group"
          >
            {/* Clickable Area to Open Calculator */}
            <button
              onClick={() => navigate("/solar-calculator")}
              className="flex items-center gap-2.5 sm:gap-3 pl-3.5 sm:pl-4 pr-3 sm:pr-3.5 py-2.5 sm:py-3 hover:bg-black/5 transition-colors focus:outline-none"
              title="Open Solar Load Calculator"
            >
              <span className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-6 transition-transform">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </span>
              <span className="font-montserrat font-bold italic text-white text-sm sm:text-base tracking-wide whitespace-nowrap drop-shadow-sm">
                Use Calculator
              </span>
            </button>

            {/* Collapse Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(true);
              }}
              className="px-3 sm:px-3.5 bg-black/15 hover:bg-black/25 active:bg-black/35 text-white flex items-center justify-center transition-colors border-l border-white/20 focus:outline-none"
              title="Collapse Calculator Shortcut"
              aria-label="Collapse shortcut"
            >
              <X className="w-4 h-4 text-white hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#fd8d07] to-[#EA6936] text-white pl-3.5 pr-2.5 py-3 rounded-l-2xl shadow-[0_8px_25px_rgba(253,141,7,0.4)] hover:shadow-[0_12px_35px_rgba(253,141,7,0.6)] border-y border-l border-white/25 hover:pl-4 transition-all focus:outline-none group"
            title="Expand Solar Calculator"
            aria-label="Expand Solar Calculator shortcut"
          >
            <Calculator className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
