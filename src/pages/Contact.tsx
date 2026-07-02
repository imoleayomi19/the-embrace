import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

  return (
    <main className="w-full overflow-hidden">
      {/* PAGE HERO */}
      <section className="relative min-h-[280px] sm:min-h-[350px] md:min-h-[450px] flex items-end pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('./embrace-about.jpg')",
              backgroundPosition: "center 40%",
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

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <motion.div {...fadeIn} className="space-y-8">
              <div className="">
                <span className="text-secondary uppercase tracking-[0.3em] text-sm font-montserrat font-semibold">
                  Reach out
                </span>
                {/* Main Headline - Anton ExtraBold */}
                <h2 className="text-3xl md:text-4xl font-anton font-extrabold mt-4 mb-4">
                  Let's start your solar or security project with the right partner.
                </h2>
                {/* Body Text - Poppins Regular */}
                <p className="text-slate-600 font-poppins font-normal leading-relaxed">
                  Reach out for a free consultation, customized proposal, or professional site inspection. Our team specializes in solar power systems, CCTV surveillance, and smart energy solutions for homes and businesses.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
                  {/* Section Title - Montserrat Bold */}
                  <h3 className="text-lg font-montserrat font-bold mb-2">Office Address</h3>
                  {/* Body Text - Poppins Regular */}
                  <p className="text-slate-600 font-poppins font-normal">
                    116 Ikorodu-Lagos Road, Haruna Bustop, Ikorodu, Lagos,
                    Nigeria
                  </p>
                </div>
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-montserrat font-bold mb-2">Call Us</h3>
                  <p className="text-slate-600 font-poppins font-normal">+234 706 145 1583</p>
                  <p className="text-slate-600 font-poppins font-normal">+234 807 895 4388</p>
                  <p className="text-slate-600 font-poppins font-normal">+234 911 015 2566</p>
                </div>
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-montserrat font-bold mb-2">WhatsApp Us</h3>
                    <p className="text-slate-600 font-poppins font-normal mb-4">
                      Chat directly with our support team for quick assistance and consultations.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/2347061451583?text=Hello%20Embrace%20Technologies%2C%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20get%20more%20information."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-montserrat font-semibold rounded-2xl py-3 px-4 hover:bg-[#20ba59] transition-colors w-full text-center shadow-md shadow-[#25D366]/20"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.419 9.86-9.86.001-2.636-1.02-5.115-2.873-6.97C16.593 1.91 14.121.89 11.493.89 6.058.89 1.636 5.313 1.634 10.754c0 1.684.449 3.325 1.302 4.773L1.93 21.02l5.703-1.496L6.647 19.16zM17.487 14.4c-.326-.163-1.934-.955-2.232-1.063-.297-.11-.514-.163-.73.163-.217.326-.84.84-.972.95-.13.11-.26.13-.586-.033-1.349-.67-2.155-1.047-3.018-2.527-.228-.39.227-.363.652-1.213.076-.15.038-.283-.019-.39-.057-.11-.514-1.238-.705-1.696-.186-.446-.372-.385-.511-.392l-.436-.01c-.15 0-.39.056-.595.28-.205.223-.782.763-.782 1.86 0 1.096.8 2.155.91 2.302.112.146 1.576 2.405 3.82 3.374.533.23 1.02.378 1.369.489.605.192 1.155.165 1.59.1.484-.073 1.934-.79 2.207-1.516.273-.727.273-1.353.192-1.482-.081-.13-.298-.21-.624-.373z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-montserrat font-bold mb-2">Email</h3>
                  <p className="text-slate-600 font-poppins font-normal">info@embracetechng.com</p>
                </div>
                {/* <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200 sm:col-span-2">
                  <h3 className="text-lg font-montserrat font-bold mb-2">Working Hours</h3>
                  <p className="text-slate-600 font-poppins font-normal">Mon – Fri: 8AM – 5PM</p>
                </div> */}
              </div>

              <div className="rounded-[2rem] overflow-hidden shadow-xl border border-slate-200">
                <iframe
                  title="Embrace Technologies Location"
                  src="https://www.google.com/maps?q=116%20Ikorodu-Lagos%20Road%2C%20Haruna%20Bustop%2C%20Ikorodu%2C%20Lagos%2C%20Nigeria&z=15&output=embed"
                  className="w-full h-72 md:h-96 border-0"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.form
              {...fadeIn}
              className="space-y-6 bg-white rounded-[2rem] p-8 shadow-xl border border-slate-200"
            >
              <div>
                {/* Form Label - Montserrat SemiBold */}
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none font-poppins font-normal"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none font-poppins font-normal"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234 000 000 0000"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none font-poppins font-normal"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Enquiring About
                </label>
                <select
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none font-poppins font-normal"
                >
                  <option value="solar">Solar</option>
                  <option value="cctv">CCTV</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-montserrat font-semibold">
                  Message
                </label>
                <textarea
                  placeholder="Tell us about your project"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 min-h-[180px] focus:border-secondary focus:outline-none font-poppins font-normal"
                />
              </div>
              {/* Button - Montserrat SemiBold */}
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full bg-secondary text-primary font-montserrat font-semibold rounded-full px-8 py-4 hover:bg-yellow-400 transition-colors"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  );
}