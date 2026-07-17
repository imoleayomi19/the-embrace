import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Add this CountUp component
function CountUp({
  target,
  duration = 2000,
  suffix = "",
  format = (value: number) => value.toString(),
  className,
}: {
  target: number;
  duration?: number;
  suffix?: string;
  format?: (value: number) => string;
  className?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let rafId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const startTime = performance.now();

          const step = (timestamp: number) => {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setValue(Math.round(progress * target));
            if (progress < 1) rafId = requestAnimationFrame(step);
          };

          rafId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
      {suffix}
    </span>
  );
}

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
  ArrowRightCircle,
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
      {/* HERO SECTION - LEFT AS IS */}
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
                  src="./img-4.png"
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
                  style={{ backgroundImage: "url('./tagline.png')" }}
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
                    style={{ backgroundImage: "url('./vision.png')" }}
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
                    style={{ backgroundImage: "url('./mission.png')" }}
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

      {/* MILESTONES TIMELINE - HORIZONTAL CARD STYLE */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            {...fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-anton font-extrabold mb-4 text-primary">
              Milestones Timeline
            </h2>
            <p className="text-slate-600 font-poppins font-normal text-lg max-w-2xl mx-auto">
              Our journey of growth and excellence
            </p>
          </motion.div>

          {/* Horizontal Timeline Cards with Overlapping Arrows */}
          <div className="relative flex flex-col lg:flex-row items-center justify-center">
            {[
              {
                year: 2019,
                title: "Founded",
                image: "./solar-4.jpg",
              },
              {
                year: 2021,
                title: "Registered as Business Name (CAC)",
                image: "./solar-5.jpg",
              },
              {
                year: 2026,
                title: "Incorporated as Limited Liability Company",
                image: "./solar-6.jpg",
              },
            ].map((milestone, idx) => (
              <div key={idx} className="relative w-full lg:w-80 h-96 mx-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden group"
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="text-6xl font-anton font-extrabold text-white/30 mb-2">
                      <CountUp
                        target={milestone.year}
                        duration={2000}
                        className=""
                      />
                    </div>
                    <h3 className="text-white font-montserrat font-bold text-lg leading-tight">
                      {milestone.title}
                    </h3>
                  </div>
                </motion.div>

                {/* Arrow Connector - Positioned between cards */}
                {idx < 2 && (
                  <div
                    className="hidden lg:block absolute z-30"
                    style={{
                      left: 'calc(100% + 8px)',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center shadow-lg border-4 border-white">
                      <ArrowRightCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS & COMPLIANCE */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-montserrat font-black uppercase tracking-wider mb-12 text-primary">
              Certifications & Compliance
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "CAC",
                  gradientStart: "#002060", // Primary
                  gradientEnd: "#066906",    // Alternative
                },
                {
                  name: "NEMSA",
                  gradientStart: "#FFC759",  // Secondary
                  gradientEnd: "#EA6936",    // AlternativeO
                },
                {
                  name: "COREN",
                  gradientStart: "#066906",  // Alternative
                  gradientEnd: "#002060",    // Primary
                },
                {
                  name: "HSE",
                  gradientStart: "#EE373D",  // AlternativeR
                  gradientEnd: "#EA6936",    // AlternativeO
                },
              ].map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative flex flex-col items-center group"
                >
                  {/* Hexagonal Badge */}
                  <div className="relative w-40 h-44 md:w-48 md:h-52 transition-transform duration-300 group-hover:scale-105">
                    {/* Hexagon Shape */}
                    <svg
                      viewBox="0 0 200 220"
                      className="w-full h-full drop-shadow-lg"
                    >
                      <defs>
                        <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={cert.gradientStart} />
                          <stop offset="100%" stopColor={cert.gradientEnd} />
                        </linearGradient>
                      </defs>

                      {/* Outer hexagon border with gradient */}
                      <polygon
                        points="100,5 190,52.5 190,157.5 100,205 10,157.5 10,52.5"
                        fill="white"
                        stroke={`url(#grad-${idx})`}
                        strokeWidth="6"
                      />

                      {/* Inner hexagon to create clean border effect */}
                      <polygon
                        points="100,15 180,57.5 180,152.5 100,195 20,152.5 20,57.5"
                        fill="white"
                        stroke="none"
                      />
                    </svg>

                    {/* Badge Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-4 pb-8">
                      <h4 className="text-lg md:text-xl font-montserrat font-bold text-slate-800 mb-1">
                        {cert.name}
                      </h4>
                      <div className="w-16 h-0.5 bg-slate-300 my-1"></div>
                    </div>

                    {/* Ribbon */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <svg
                        viewBox="0 0 60 40"
                        className="w-16 h-12 md:w-20 md:h-14 drop-shadow-md"
                      >
                        <polygon
                          points="0,0 60,0 45,40 30,30 15,40"
                          fill="#1E293B"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR CORE VALUES - SOLAR STYLE WITH ANIMATED GRADIENT */}
      <section className="relative overflow-hidden ml-5 mr-5 pt-10 pb-10 rounded-3xl ">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-800 to-primary opacity-95">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(
                -45deg, 
                #002060 0%, 
                #066906 25%, 
                #FFC759 50%, 
                #EA6936 75%, 
                #EE373D 100%
              )`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 15s ease infinite',
            }}
          />
        </div>

        {/* Animated mesh pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Add keyframes for gradient animation */}
        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeIn}
          >
            {/* Main Headline - Anton ExtraBold */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold mt-2 mb-4 text-white drop-shadow-lg">
              Our Core Values
            </h2>
            {/* Body Text - Source Sans Pro/Poppins Regular */}
            <p className="text-secondary font-poppins font-normal text-lg drop-shadow-md">
              These principles guide everything we do and shape our commitment to excellence.
            </p>
          </motion.div>

          {/* SOLAR-style Vertical Panels - Border Radius on Container */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 text-center p-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                letter: "E",
                title: "Excellence",
                desc: "We pursue the highest standards of engineering, quality, and professionalism in everything we do.",
                color: "text-white",
                borderColor: "border-secondary/30",
                bgColor: "bg-white/95",
                textColor: "text-primary",
              },
              {
                letter: "I",
                title: "Integrity",
                desc: "We conduct business with honesty, transparency, and accountability.",
                color: "text-white",
                borderColor: "border-alternativeO/30",
                bgColor: "bg-white/95",
                textColor: "text-primary",
              },
              {
                letter: "I",
                title: "Innovation",
                desc: "We embrace technology and continuous improvement to deliver sustainable solutions.",
                color: "text-white",
                borderColor: "border-alternativeR/30",
                bgColor: "bg-white/95",
                textColor: "text-primary",
              },
              {
                letter: "C",
                title: "Customer Success",
                desc: "We are committed to creating lasting value and exceptional experiences for our clients.",
                color: "text-white",
                borderColor: "border-alternative/30",
                bgColor: "bg-white/95",
                textColor: "text-primary",
              },
              {
                letter: "C",
                title: "Collaboration",
                desc: "We believe strong partnerships and teamwork drive exceptional outcomes.",
                color: "text-white",
                borderColor: "border-primary/30",
                bgColor: "bg-white/95",
                textColor: "text-primary",
              },
              {
                letter: "S",
                title: "Sustainability",
                desc: "We contribute to a cleaner and more resilient future through responsible innovation.",
                color: "text-white",
                borderColor: "border-green-600/30",
                bgColor: "bg-white/95",
                textColor: "text-primary",
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className={`group relative h-[450px] md:h-[550px] overflow-hidden backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:z-20 hover:shadow-2xl ${idx !== 1 && idx !== 3 && idx !== 5 ? 'border-r border-white/20' : ''
                  } ${idx !== 5 ? 'md:border-r md:border-white/20' : ''
                  }`}
                style={{
                  background: value.bgColor,
                }}
              >
                {/* Large Letter - Anton ExtraBold with brand colors - INCREASED TOP MARGIN */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2">
                  <span className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-anton font-extrabold ${value.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}>
                    {value.letter}
                  </span>
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  {/* Middle Section - Title (Montserrat Bold) - INCREASED TOP MARGIN */}
                  <div className="flex-grow flex items-center justify-center pt-56">
                    <h3 className={`text-sm md:text-base font-montserrat font-bold ${value.textColor} text-center leading-none px-2 drop-shadow-sm`}>
                      {value.title}
                    </h3>
                  </div>

                  {/* Bottom Section - Description (Source Sans Pro/Poppins Regular) - WHITE TEXT */}
                  <div className="pb-8 mb-2">
                    <p className="text-white font-poppins font-normal text-xs text-center leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 px-2">
                      {value.desc}
                    </p>
                  </div>
                </div>

                {/* Colored top border accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${value.color.replace('text-', 'bg-')}`} />
              </motion.div>
            ))}
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
                OUR COMMITMENT
              </h2>
            </motion.div>

            {/* Commitment Cards - Vertical Panels - Right Side */}
            <motion.div
              className="w-full lg:w-3/4 flex flex-col md:flex-row gap-2"
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
                  image: "./our-client.png",
                },
                {
                  title: "To Our Employees",
                  desc: "We foster a culture of safety, innovation, teamwork, and continuous development.",
                  color: "bg-secondary",
                  textColor: "text-secondary",
                  image: "./our-emplyee.png",
                },
                {
                  title: "To Our Partners",
                  desc: "We cultivate relationships founded on integrity, transparency, and mutual success.",
                  color: "bg-alternativeO",
                  textColor: "text-alternativeO",
                  image: "./our-partners.png",
                },
                {
                  title: "To Our Shareholders",
                  desc: "We are committed to sustainable growth, operational excellence, and long-term value creation.",
                  color: "bg-secondary",
                  textColor: "text-alternativeR",
                  image: "./our-shareholder.png",
                },
                {
                  title: "To Our Communities",
                  desc: "We create positive impact through clean energy, technological innovation, and responsible business practices.",
                  color: "bg-primary",
                  textColor: "text-alternative",
                  image: "./our-communities.png",
                },
              ].map((commitment, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  className="group relative w-full md:w-auto flex-1 min-h-[400px] md:min-h-[500px] overflow-hidden cursor-pointer"
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
              className="inline-flex items-center gap-2 bg-secondary text-primary font-montserrat font-semibold px-8 py-4 rounded-sm hover:bg-gradient-to-r hover:from-white hover:to-secondary hover:text-primary transition-all duration-300 w-fit text-center shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 group whitespace-nowrap"
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