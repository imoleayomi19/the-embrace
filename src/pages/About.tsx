import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Award,
  Users,
  Target,
  Heart,
  CheckCircle2,
  ArrowRight,
  Quote,
  Sun,
  Shield,
  Lightbulb,
  Handshake,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.2 },
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

const INSTALLATION_START_YEAR = 2019;
const yearsOfExperience = new Date().getFullYear() - INSTALLATION_START_YEAR;

export function About() {
  const title = "ABOUT US";

  return (
    <main className="w-full overflow-hidden">
      {/* HERO SECTION */}
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
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </motion.div>

            {/* ABOUT US Title with letter animation - Anton ExtraBold */}
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
                About Us
              </span>
            </motion.nav>
          </div>
        </div>
      </section>
      {/* OUR STORY */}
      <section className="relative py-9 bg-white overflow-visible">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">
            {/* Left Column: Image positioned to overlap hero section above */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative -mt-40 lg:-mt-28 z-20"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-[3/4] max-h-[600px] lg:max-h-[700px]">
                <img
                  src="./solar-10.jpg"
                  alt="Embrace Technologies Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            {/* Right Column: Story & Intro */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 pt-4 lg:pt-0"
            >
              <motion.div {...fadeIn}>
                {/* Main Headline - Anton ExtraBold */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold mt-1 mb-6 leading-tight text-primary">
                  EMBRACE TECHNOLOGIES LIMITED
                </h2>
              </motion.div>

              <motion.div {...fadeIn} className="space-y-4">
                {/* Section Title - Montserrat Bold */}
                <h3 className="text-2xl font-montserrat font-bold text-slate-800">About Us</h3>
                {/* Body Text - Source Sans Pro/Poppins Regular */}
                <p className="text-slate-600 font-poppins font-normal text-base leading-relaxed">
                  Embrace Technologies Limited is a Nigerian energy and smart infrastructure engineering company delivering integrated engineering solutions for power, energy storage, digital security, and intelligent building technologies. Founded in 2019, we commenced operations as a registered business in 2021 and was incorporated as a limited liability company in February 2026. We provide end-to-end services spanning engineering, procurement, construction, commissioning, and long-term operations and maintenance (O&M) of energy and technology infrastructure.
                </p>
                <p className="text-slate-600 font-poppins font-normal text-base leading-relaxed">
                  We serve residential, commercial, industrial, institutional, and public-sector clients with reliable and scalable solutions tailored to their operational requirements. Our capabilities range from backup and hybrid energy systems to large-scale solar and distributed power infrastructure, complemented by advanced security and smart technology solutions.
                </p>
                <p className="text-slate-600 font-poppins font-normal text-base leading-relaxed">
                  Driven by innovation, technical excellence, and uncompromising quality standards, we are committed to helping organizations and communities achieve greater energy resilience, operational efficiency, and sustainable growth. Through strategic partnerships, professional project execution, and a customer-centric approach, we are building a future where reliable power and intelligent infrastructure enable progress across Africa.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Vision, Mission, Tagline Cards */}
        <div className="container mx-auto px-4 md:px-6 mt-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-2">
              {/* Tagline Card - Top Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-[200px] md:h-[240px] overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: "url('./solar-6.jpg')" }}
                />

                {/* Title visible always */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-anton font-extrabold text-white drop-shadow-lg">
                    Tagline
                  </h3>
                </div>

                {/* Hover overlay - swipes up from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-full group-hover:translate-y-0">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-anton font-extrabold text-white mb-3">
                      Tagline
                    </h3>
                    <p className="text-white font-poppins font-normal text-base md:text-lg text-center max-w-2xl leading-relaxed font-semibold">
                      Reliable Power Begins with The Right Partner.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Vision and Mission Cards - Bottom Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Vision Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative h-[240px] md:h-[280px] overflow-hidden group cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: "url('./solar-4.jpg')" }}
                  />

                  {/* Title visible always */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-anton font-extrabold text-white drop-shadow-lg">
                      Vision
                    </h3>
                  </div>

                  {/* Hover overlay - swipes up from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-full group-hover:translate-y-0">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-anton font-extrabold text-white mb-3">
                        Vision
                      </h3>
                      <p className="text-slate-100 font-poppins font-normal text-xs md:text-sm text-center leading-relaxed">
                        Our vision is to become a leading African provider of sustainable energy and smart infrastructure engineering solutions, delivering world-class projects that create lasting economic and social impact.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Mission Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative h-[240px] md:h-[280px] overflow-hidden group cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: "url('./solar-5.jpg')" }}
                  />

                  {/* Title visible always */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-anton font-extrabold text-white drop-shadow-lg">
                      Mission
                    </h3>
                  </div>

                  {/* Hover overlay - swipes up from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-full group-hover:translate-y-0">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-anton font-extrabold text-white mb-3">
                        Mission
                      </h3>
                      <p className="text-white font-poppins font-normal text-xs md:text-sm text-center leading-relaxed">
                        To deliver innovative, reliable, and cost-effective energy and smart infrastructure solutions through engineering excellence, quality execution, and strategic partnerships that empower homes, businesses, industries, and communities across Africa.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY EMBRACE TECHNOLOGIES LIMITED */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-anton font-extrabold mb-6 text-primary">
              Why Embrace Technologies Limited
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {[
              "Engineering expertise",
              "End-to-end project delivery",
              "Quality products",
              "Professional Installation",
              "After-sales support",
              "Technical training",
              "Strategic partnerships",
              "Nationwide project execution",
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-slate-900 rounded-lg p-6 flex items-center gap-4 hover:bg-slate-800 transition-colors cursor-pointer group"
              >
                <svg
                  className="w-4 h-4 text-secondary flex-shrink-0 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-white font-montserrat font-bold text-sm uppercase tracking-wide">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES & CERTIFICATIONS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Milestones Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h3 className="text-2xl md:text-3xl font-anton font-extrabold mb-8 text-primary">
                Milestones Timeline
              </h3>
              <div className="space-y-6">
                {[
                  { year: "2019", event: "Founded" },
                  { year: "2021", event: "Registered as Business Name (CAC)" },
                  { year: "2026", event: "Incorporated as Limited Liability Company" },
                ].map((milestone, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-2xl font-anton font-extrabold text-white">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="flex-grow border-b border-slate-200 pb-4">
                      <p className="text-slate-700 font-poppins font-normal text-base">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications & Compliance */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h3 className="text-2xl md:text-3xl font-anton font-extrabold mb-8 text-primary">
                Certifications & Compliance
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {["CAC", "NEMSA", "COREN", "HSE"].map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200 hover:border-secondary hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-xl font-montserrat font-bold text-primary">
                      {cert}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR CORE VALUES - SOLAR STYLE */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('./solar-4.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/85 to-primary/90" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeIn}
          >
            {/* Main Headline - Anton ExtraBold */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold mt-2 mb-4 text-white">
              Our Core Values
            </h2>
            {/* Body Text - Source Sans Pro/Poppins Regular */}
            <p className="text-slate-200 font-poppins font-normal text-lg">
              These principles guide everything we do and shape our commitment to excellence.
            </p>
          </motion.div>

          {/* SOLAR-style Vertical Panels */}
          <motion.div

            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                letter: "E",
                title: "Excellence",
                desc: "We pursue the highest standards of engineering, quality, and professionalism in everything we do.",
                color: "text-secondary",
                borderColor: "border-secondary/30",
                bgColor: "bg-secondary/10",
              },
              {
                letter: "I",
                title: "Integrity",
                desc: "We conduct business with honesty, transparency, and accountability.",
                color: "text-alternativeO",
                borderColor: "border-alternativeO/30",
                bgColor: "bg-alternativeO/10",
              },
              {
                letter: "I",
                title: "Innovation",
                desc: "We embrace technology and continuous improvement to deliver sustainable solutions.",
                color: "text-alternativeR",
                borderColor: "border-alternativeR/30",
                bgColor: "bg-alternativeR/10",
              },
              {
                letter: "C",
                title: "Customer Success",
                desc: "We are committed to creating lasting value and exceptional experiences for our clients.",
                color: "text-alternative",
                borderColor: "border-alternative/30",
                bgColor: "bg-alternative/10",
              },
              {
                letter: "C",
                title: "Collaboration",
                desc: "We believe strong partnerships and teamwork drive exceptional outcomes.",
                color: "text-white",
                borderColor: "border-white/30",
                bgColor: "bg-white/10",
              },
              {
                letter: "S",
                title: "Sustainability",
                desc: "We contribute to a cleaner and more resilient future through responsible innovation.",
                color: "text-green-400",
                borderColor: "border-green-400/30",
                bgColor: "bg-green-400/10",
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="group relative h-[400px] md:h-[500px] overflow-hidden border-t-0 border-l-0 border-r-0 border-b border-white/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:z-20 hover:shadow-2xl"
                style={{
                  background: `linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                }}
              >
                {/* Large Letter - Anton ExtraBold */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2">
                  <span className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-anton font-extrabold ${value.color} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}>
                    {value.letter}
                  </span>
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  {/* Icon - Aligned at top */}
                  <div className="flex justify-center pt-8">
                    <div className={`w-12 h-12 ${value.bgColor} border ${value.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-md`}>
                      {idx === 0 && <Award className={`w-6 h-6 ${value.color}`} />}
                      {idx === 1 && <Shield className={`w-6 h-6 ${value.color}`} />}
                      {idx === 2 && <Lightbulb className={`w-6 h-6 ${value.color}`} />}
                      {idx === 3 && <Target className={`w-6 h-6 ${value.color}`} />}
                      {idx === 4 && <Handshake className={`w-6 h-6 ${value.color}`} />}
                      {idx === 5 && <Heart className={`w-6 h-6 ${value.color}`} />}
                    </div>
                  </div>

                  {/* Middle Section - Title (Montserrat Bold) */}
                  <div className="flex-grow flex items-center justify-center">
                    <h3 className="text-sm md:text-base font-montserrat font-bold text-white text-center leading-tight px-2">
                      {value.title}
                    </h3>
                  </div>

                  {/* Bottom Section - Description (Source Sans Pro/Poppins Regular) */}
                  <div className="pb-2">
                    <p className="text-slate-200 font-poppins font-normal text-xs text-center leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 px-2">
                      {value.desc}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Hint */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-slate-300 font-poppins font-normal text-sm flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Hover over each value to learn more
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            </p>
          </motion.div>
        </div>
      </section>
      {/* OUR COMMITMENT */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          {/* Flex container for header and cards */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

            {/* Header Section - Left Side */}
            <motion.div
              className="lg:w-1/4 flex flex-col justify-center text-center"
              {...fadeIn}
            >
              {/* Main Headline - Anton ExtraBold */}
              <h2 className="text-2xl md:text-3xl font-anton font-extrabold text-primary leading-tight">
                our commitment
              </h2>
            </motion.div>

            {/* Commitment Cards - Vertical Panels - Right Side */}
            <motion.div
              className="lg:w-3/4 flex flex-col md:flex-row gap-2"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {[
                {
                  title: "To Our Client",
                  desc: "We deliver dependable solutions, professional service, and long-term value built on trust and excellence.",
                  color: "bg-primary",
                  textColor: "text-primary",
                  image: "./solar-4.jpg",
                },
                {
                  title: "To Our Employees",
                  desc: "We foster a culture of safety, innovation, teamwork, and continuous development.",
                  color: "bg-secondary",
                  textColor: "text-secondary",
                  image: "./solar-5.jpg",
                },
                {
                  title: "To Our Partners",
                  desc: "We cultivate relationships founded on integrity, transparency, and mutual success.",
                  color: "bg-alternativeO",
                  textColor: "text-alternativeO",
                  image: "./solar-6.jpg",
                },
                {
                  title: "To Our Shareholders",
                  desc: "We are committed to sustainable growth, operational excellence, and long-term value creation.",
                  color: "bg-alternativeR",
                  textColor: "text-alternativeR",
                  image: "./solar-7.jpg",
                },
                {
                  title: "To Our Communities",
                  desc: "We create positive impact through clean energy, technological innovation, and responsible business practices.",
                  color: "bg-alternative",
                  textColor: "text-alternative",
                  image: "./solar-8.jpg",
                },
              ].map((commitment, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  className="group relative flex-1 min-h-[400px] md:min-h-[500px] overflow-hidden cursor-pointer"
                  whileHover={{ flex: 2 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${commitment.image}')` }}
                  />

                  {/* Dark Overlay - Default */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500" />

                  {/* Colored Overlay - Shows on hover */}
                  <div className={`absolute inset-0 ${commitment.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500`} />

                  {/* Content Container - Centered vertically and horizontally */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    {/* Title - Centered, always visible (Montserrat Bold) */}
                    <div className="w-full text-center">
                      <h3 className="text-white font-montserrat font-bold text-xs md:text-sm leading-tight mb-2 group-hover:text-white">
                        {commitment.title}
                      </h3>

                      {/* Description - Hidden by default, shown on hover (Source Sans Pro/Poppins Regular) */}
                      <p className="text-white/90 font-poppins font-normal text-xs md:text-sm text-center leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 max-h-0 group-hover:max-h-48 mt-0 group-hover:mt-3">
                        {commitment.desc}
                      </p>
                    </div>
                  </div>

                  {/* Top Border Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${commitment.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* TEAM SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeIn}
          >
            {/* Main Headline - Anton ExtraBold */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold mb-4 text-primary">Our Team</h2>
            {/* Body Text - Source Sans Pro/Poppins Regular */}
            <p className="text-slate-600 font-poppins font-normal text-lg">
              Dedicated professionals committed to powering your sustainable
              future.
            </p>
          </motion.div>

          <motion.p
            className="text-center text-slate-600 font-poppins font-normal text-lg max-w-2xl mx-auto"
            {...fadeIn}
          >
            Our team of experienced engineers, installers, and support
            specialists work tirelessly to deliver exceptional results. With a
            combined experience of over
            {yearsOfExperience * 3} years in renewable energy, we bring
            expertise, passion, and reliability to every project.
          </motion.p>
        </div>
      </section>




      {/* CTA SECTION */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-alternativeO/5 rounded-full blur-3xl translate-y-1/3"></div>
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-alternativeR/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Headline - Anton ExtraBold */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold text-white mb-4 sm:mb-6">
              Ready to Join the Solar Revolution?
            </h2>
            {/* Body Text - Source Sans Pro/Poppins Regular */}
            <p className="text-xl text-slate-200 font-poppins font-normal mb-10">
              Let's help you harness the power of the sun and build a
              sustainable future.
            </p>
            {/* Button - Montserrat SemiBold */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-primary font-montserrat font-semibold px-8 py-4 rounded-sm hover:bg-yellow-400 transition-colors shadow-lg"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}