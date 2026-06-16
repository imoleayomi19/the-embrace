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
      <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-end pb-16 md:pb-20 overflow-hidden h-[450px]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/embrace-about.jpg')",
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

            {/* CONTACT US Title with letter animation */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-1 font-poppins tracking-[0.1em] relative inline-block">
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

            {/* Breadcrumb */}
            <motion.nav
              className="flex items-center gap-3 text-sm md:text-base font-montserrat mt-5"
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
                <span className="text-secondary uppercase tracking-[0.3em] text-sm font-semibold">
                  Reach out
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                  Let's start your solar or security project with the right partner.
                </h2>
                <p className="text-slate-600 font-montserrat leading-relaxed">
                  Reach out for a free consultation, customized proposal, or professional site inspection. Our team specializes in solar power systems, CCTV surveillance, and smart energy solutions for homes and businesses.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold mb-2">Office Address</h3>
                  <p className="text-slate-600">
                    116 Ikorodu-Lagos Road, Haruna Bustop, Ikorodu, Lagos,
                    Nigeria
                  </p>
                </div>
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                  <p className="text-slate-600">+234 706 145 1583</p>
                  <p className="text-slate-600">+234 807 895 4388</p>
                  <p className="text-slate-600">+234 911 015 2566</p>
                </div>
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-slate-600">info@embracetechng.com</p>
                </div>
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
                  <p className="text-slate-600">Mon – Fri: 8AM – 5PM</p>
                </div>
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
                <label className="block text-slate-700 mb-2 font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234 000 000 0000"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-semibold">
                  Enquiring About
                </label>
                <select
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none"
                >
                  <option value="solar">Solar</option>
                  <option value="cctv">CCTV</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-semibold">
                  Message
                </label>
                <textarea
                  placeholder="Tell us about your project"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 min-h-[180px] focus:border-secondary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full bg-secondary text-primary font-bold rounded-full px-8 py-4 hover:bg-yellow-400 transition-colors"
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