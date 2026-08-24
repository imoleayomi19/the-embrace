import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

// Letter animation variants
const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Underline animation
const underlineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: { delay: 0.8, duration: 0.8, ease: "easeOut" },
  },
};

// Icon spin animation
const iconVariants = {
  hidden: { opacity: 0, rotate: -180, scale: 0 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// Breadcrumb fade up
const breadcrumbVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.9, duration: 0.8, ease: "easeOut" },
  },
};

// Particle animation
const particleVariants = {
  hidden: { opacity: 0, y: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: [0, 0.8, 0],
    y: [0, -40, -80],
    scale: [0, 1, 0],
    transition: {
      delay: 1 + i * 0.3,
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  }),
};

// Glow pulse
const glowVariants = {
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.15, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export function Contact() {
  const title = "CONTACT US";
  const location = useLocation();

  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [address, setAddress] = useState("");

  // Scroll to top when location changes (fires every time, even on same route)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.search]);

  // Nigerian states
  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT - Abuja",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
  ];

  return (
    <main className="w-full overflow-hidden">
      {/* PAGE HERO - LEFT AS IS */}
      <section className="relative min-h-[280px] sm:min-h-[350px] md:min-h-[600px] flex items-end pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center sm:bg-center"
            style={{
              backgroundImage: "url('./contact-us2.jpg')",
              backgroundPosition: "left 30% center",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        {/* Glowing background shape */}
        <motion.div
          className="absolute bottom-20 right-16 md:right-24 w-64 md:w-96 h-32 md:h-48 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255, 199, 89, 0.2), transparent 70%)",
          }}
          variants={glowVariants}
          animate="animate"
        />

        {/* Floating Particles */}
        <div className="absolute bottom-24 right-16 md:right-24 pointer-events-none z-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${i * 28}px`,
                backgroundColor: "#FFC759",
              }}
              variants={particleVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-end text-right">
          <div className="flex flex-col items-end">
            {/* Icon Badge */}
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #FFC759, #EA6936)",
                boxShadow: "0 4px 20px rgba(234, 105, 54, 0.4)",
              }}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
            >
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </motion.div>

            {/* CONTACT US Title with letter animation - Anton ExtraBold */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-anton font-extrabold text-white mb-1 tracking-wide sm:tracking-[0.1em] relative inline-block">
              <span className="relative">
                {title.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    style={{ textShadow: "0 0 40px rgba(255, 199, 89, 0.3)" }}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>

              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 right-0 h-1 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FFC759, #EA6936)",
                }}
                variants={underlineVariants}
                initial="hidden"
                animate="visible"
              />
            </h1>

            {/* Breadcrumb - Montserrat Medium */}
            <motion.nav
              className="flex items-center gap-3 text-sm md:text-base font-montserrat font-medium mt-5"
              variants={breadcrumbVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                to="/"
                className="relative text-white/70 hover:text-white transition-colors duration-300 group"
              >
                Home
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#FFC759] transition-all duration-300 group-hover:w-full" />
              </Link>

              <motion.span
                className="text-white/40 text-xs"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                &gt;
              </motion.span>

              <span className="relative text-[#FFC759] font-semibold">
                <span
                  className="absolute -inset-1.5 -inset-x-2 border border-[#FFC759]/30 rounded-md"
                  style={{
                    animation: "borderPulse 2s ease-in-out infinite",
                  }}
                />
                <style>{`
                  @keyframes borderPulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                  }
                `}</style>
                Contact Us
              </span>
            </motion.nav>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">

            {/* LEFT COLUMN: Info + Map */}
            <motion.div {...fadeIn} className="space-y-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold mb-4">
                  <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                    Let's Power Your Home & Secure Your Property
                  </span>
                </h2>
              </div>

              {/* Contact Info Cards with Icon Styling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-alternative">
                    <img
                      src="./icon-location.gif"
                      alt="Location"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-montserrat font-bold text-primary mb-2">Address</h3>
                  <p className="text-slate-600 font-poppins font-normal text-sm leading-relaxed">
                    116 Ikorodu-Lagos Road, Haruna Bustop,<br />
                    Ikorodu, Lagos, Nigeria
                  </p>
                </motion.div>

                {/* Call Us */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-secondary">
                    <img
                      src="./icon-call.gif"
                      alt="Call Us"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-montserrat font-bold text-primary mb-2">Call Us</h3>
                  <p className="text-slate-600 font-poppins font-normal text-sm leading-relaxed">
                    +234 706 145 1583<br />
                    +234 911 015 2566
                  </p>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-primary">
                    <img
                      src="./icon-email.gif"
                      alt="Email"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-montserrat font-bold text-primary mb-2">Email</h3>
                  <p className="text-slate-600 font-poppins font-normal text-sm leading-relaxed">
                    info@embracetechng.com
                  </p>
                </motion.div>

                {/* Working Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-alternativeR">
                    <img
                      src="./icon-clock.gif"
                      alt="Working Hours"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-montserrat font-bold text-primary mb-2">Working Hours</h3>
                  <p className="text-slate-600 font-poppins font-normal text-sm leading-relaxed">
                    Mon - Sat: 8:00 AM - 6:00 PM
                  </p>
                </motion.div>
              </div>

              {/* Map Section */}
              <div className="relative overflow-hidden shadow-[0_0_60px_rgba(0,32,96,0.20)] border border-slate-200 transition-all duration-300 hover:shadow-[0_0_80px_rgba(0,32,96,0.30)]">
                {/* Custom Address Label Overlay */}
                <div className="absolute top-2 left-2 right-4 z-10 bg-white shadow-lg p-4 border border-slate-200">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-grow">
                      <h4 className="font-montserrat font-bold text-primary text-base mb-1">EMBRACE TECHNOLOGIES LTD</h4>
                      <p className="text-slate-600 text-xs font-poppins leading-relaxed">
                        116 Ikorodu-Lagos Road, Haruna Bustop,<br />
                        Ikorodu, Lagos, Nigeria
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href="https://www.google.com/maps?q=116%20Ikorodu-Lagos%20Road%2C%20Haruna%20Bustop%2C%20Ikorodu%2C%20Lagos%2C%20Nigeria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                        aria-label="Open in Google Maps"
                      >
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=116%20Ikorodu-Lagos%20Road%2C%20Haruna%20Bustop%2C%20Ikorodu%2C%20Lagos%2C%20Nigeria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                        aria-label="Get Directions"
                      >
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <iframe
                  title="Embrace Technologies Location"
                  src="https://www.google.com/maps?q=116%20Ikorodu-Lagos%20Road%2C%20Haruna%20Bustop%2C%20Ikorodu%2C%20Lagos%2C%20Nigeria&z=15&output=embed"
                  className="w-full h-72 md:h-96 border-0"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Form */}
            <motion.form
              {...fadeIn}
              className="space-y-6 bg-white p-8 shadow-[0_0_60px_rgba(0,32,96,0.15)] border border-slate-200 transition-all duration-300 hover:shadow-[0_0_80px_rgba(0,32,96,0.15)]"
            >
              <div>
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none focus:shadow-[0_0_0_4px_rgba(255,199,89,0.1)] transition-all duration-300 font-poppins font-normal"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+234 000 000 0000"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none focus:shadow-[0_0_0_4px_rgba(255,199,89,0.1)] transition-all duration-300 font-poppins font-normal"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none focus:shadow-[0_0_0_4px_rgba(255,199,89,0.1)] transition-all duration-300 font-poppins font-normal"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Location
                </label>
                <select
                  value={selectedState || ""}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none focus:shadow-[0_0_0_4px_rgba(255,199,89,0.1)] transition-all duration-300 font-poppins font-normal"
                >
                  <option value="" disabled>Select your state</option>
                  {nigerianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                {selectedState && (
                  <div className="mt-4">
                    <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                      Property Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full address"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none focus:shadow-[0_0_0_4px rgba(255,199,89,0.1)] transition-all duration-300 font-poppins font-normal"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Service Needed
                </label>
                <select
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none focus:shadow-[0_0_0_4px rgba(255,199,89,0.1)] transition-all duration-300 font-poppins font-normal"
                >
                  <option value="solar">Solar Energy System </option>
                  <option value="cctv">CCTV Surveillance System </option>
                  <option value="training">SPVI Training and Certification</option>
                  <option value="training">CCTV Installation Training</option>
                  <option value="training">Partnership </option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Message
                </label>
                <textarea
                  placeholder="Enter your message"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 min-h-[180px] focus:border-secondary focus:outline-none focus:shadow-[0_0_0_4px rgba(255,199,89,0.1)] transition-all duration-300 font-poppins font-normal"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full bg-secondary text-primary font-montserrat font-semibold rounded-sm px-8 py-4 hover:bg-alternativeO transition-colors"
              >
                Submit Request
              </button>
            </motion.form>

          </div>
        </div>
      </section>
    </main>
  );
}