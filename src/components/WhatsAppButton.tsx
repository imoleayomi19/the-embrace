import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '2347061451583';
  const message = encodeURIComponent('Hello Embrace Technologies, I am interested in your services and would like to get more information.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  useEffect(() => {
    // Show tooltip after 3 seconds to not overwhelm the user immediately
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-montserrat pointer-events-none">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white text-slate-800 px-4 py-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-slate-100 flex items-start gap-3 max-w-[260px] relative md:max-w-xs pointer-events-auto"
          >
            {/* Tooltip Arrow */}
            <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45" />

            <div className="flex-1 text-xs md:text-sm font-medium leading-relaxed">
              <p className="font-bold text-primary mb-0.5">Need expert help?</p>
              <p className="text-slate-500">Chat with us on WhatsApp for free solar & security consultations!</p>
            </div>

            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors text-lg p-0.5 leading-none focus:outline-none"
              aria-label="Close tooltip"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button wrapper with pointer-events-auto */}
      <div className="relative group pointer-events-auto">
        {/* Pulsing rings backdrops */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 -z-10"
          animate={{
            scale: [1, 1.4, 1.8],
            opacity: [0.6, 0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 -z-10"
          animate={{
            scale: [1, 1.3, 1.6],
            opacity: [0.5, 0.3, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* The Float Action Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-colors hover:bg-[#20ba59] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
          aria-label="Chat on WhatsApp"
        >
          <svg
            className="w-8 h-8 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.419 9.86-9.86.001-2.636-1.02-5.115-2.873-6.97C16.593 1.91 14.121.89 11.493.89 6.058.89 1.636 5.313 1.634 10.754c0 1.684.449 3.325 1.302 4.773L1.93 21.02l5.703-1.496L6.647 19.16zM17.487 14.4c-.326-.163-1.934-.955-2.232-1.063-.297-.11-.514-.163-.73.163-.217.326-.84.84-.972.95-.13.11-.26.13-.586-.033-1.349-.67-2.155-1.047-3.018-2.527-.228-.39.227-.363.652-1.213.076-.15.038-.283-.019-.39-.057-.11-.514-1.238-.705-1.696-.186-.446-.372-.385-.511-.392l-.436-.01c-.15 0-.39.056-.595.28-.205.223-.782.763-.782 1.86 0 1.096.8 2.155.91 2.302.112.146 1.576 2.405 3.82 3.374.533.23 1.02.378 1.369.489.605.192 1.155.165 1.59.1.484-.073 1.934-.79 2.207-1.516.273-.727.273-1.353.192-1.482-.081-.13-.298-.21-.624-.373z" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}
