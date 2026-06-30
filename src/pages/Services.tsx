import React, { useState, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home,
  Building2,
  Battery,
  Wrench,
  Search,
  Zap,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
  Settings,
} from "lucide-react";

const fadeIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
  },
  transition: {
    duration: 0.6,
  },
};

const staggerContainer = {
  initial: {
    opacity: 0,
  },
  whileInView: {
    opacity: 1,
  },
  viewport: {
    once: true,
  },
  transition: {
    staggerChildren: 0.15,
  },
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

export function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const title = "OUR SERVICES";

  const services = [
    {
      icon: Home,
      title: "Residential Solar",
      desc: "With Embrace Technologies, Nigerian homes can enjoy dependable solar power through expertly designed residential systems tailored to individual energy needs — starting from 1.2kVA and scalable for greater capacity.",
      features: [
        "Custom roof design",
        "Tier-1 monocrystalline panels",
        "Smart monitoring app",
        "25-year warranty",
      ],
    },
    {
      icon: Building2,
      title: "Commercial Solar",
      desc: "At Embrace Technologies, we provide tailored and forward-thinking solar solutions for government bodies, businesses, and commercial, industrial, and educational organizations nationwide, serving clients across all 36 states of Nigeria.",
      features: [
        "Tax incentive guidance",
        "Demand charge reduction",
        "Fleet charging integration",
        "Corporate sustainability",
      ],
    },
    {
      icon: Battery,
      title: "Battery Storage",
      desc: "Store excess energy generated during the day to use at night or during grid outages. True energy independence.",
      features: [
        "Seamless backup power",
        "Time-of-use optimization",
        "Lithium-ion technology",
        "Scalable capacity",
      ],
    },
    {
      icon: Wrench,
      title: "Solar Maintenance",
      desc: "After installing solar system across Nigeria, we are one solar company in Nigeria that understand what it takes to ensure systems perform better than expected via professional maintenance service.",
      features: [
        "Panel cleaning",
        "Inverter inspection",
        "Performance analysis",
        "Pest abatement",
      ],
    },
    {
      icon: Search,
      title: "Energy Audits",
      desc: "Comprehensive analysis of your property's energy consumption to identify efficiency improvements before going solar.",
      features: [
        "Thermal imaging",
        "Insulation check",
        "Appliance analysis",
        "Detailed ROI report",
      ],
    },
    {
      icon: Zap,
      title: "EV Charging",
      desc: "Level 2 and DC fast charging station installation for homes and businesses, integrated with your solar system.",
      features: [
        "Smart load management",
        "Multi-vehicle setups",
        "Commercial fleet solutions",
        "Rebate assistance",
      ],
    },
  ];

  const faqs = [
    {
      q: "How much does a solar system cost?",
      a: "The cost varies depending on your energy needs, roof size, and location. However, with current tax incentives and financing options, many customers switch to solar for $0 down and pay less per month than their current utility bill.",
    },
    {
      q: "What happens during a power outage?",
      a: "Standard grid-tied solar systems automatically shut off during an outage for safety reasons. If you want backup power during outages, you'll need to add a battery storage system to your installation.",
    },
    {
      q: "How long does installation take?",
      a: "The physical installation usually takes 1-3 days. However, the entire process—including design, permitting, and utility interconnection—typically takes 4-8 weeks depending on your local municipality.",
    },
    {
      q: "Do solar panels work on cloudy days?",
      a: "Yes! While they produce the most power in direct sunlight, solar panels still generate electricity on cloudy or rainy days. They just produce at a lower capacity.",
    },
    {
      q: "What warranties do you offer?",
      a: "We offer a comprehensive 25-year warranty that covers the panels, microinverters, racking, and our workmanship. We guarantee your system will perform as promised.",
    },
    {
      q: "Will solar panels damage my roof?",
      a: "No. In fact, solar panels can actually protect the portion of the roof they cover from weather and UV damage. Our certified installers use specialized flashing to ensure your roof remains completely watertight.",
    },
  ];

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
              <Settings className="w-6 h-6 text-white" />
            </motion.div>

            {/* OUR SERVICES Title with letter animation - Anton ExtraBold */}
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
                Services
              </span>
            </motion.nav>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeIn}
          >
            {/* Main Headline - Anton ExtraBold */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold mb-4">
              Our Solutions
            </h2>
            {/* Body Text - Poppins Regular */}
            <p className="text-slate-600 font-poppins font-normal text-lg">
              Comprehensive clean energy solutions tailored to your needs. From
              initial design to lifetime maintenance, we handle everything.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                {/* Section Title - Montserrat Bold */}
                <h3 className="text-2xl font-montserrat font-bold mb-4">{service.title}</h3>
                {/* Body Text - Poppins Regular */}
                <p className="text-slate-600 font-poppins font-normal mb-8 flex-grow">
                  {service.desc}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-3 font-poppins font-normal text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-5 h-5 text-alternativeO shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button - Montserrat SemiBold */}
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 font-montserrat font-semibold text-primary group-hover:text-secondary transition-colors mt-auto pt-6 border-t border-slate-100"
                >
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div className="lg:w-1/2" {...fadeIn}>
              {/* Main Headline - Anton ExtraBold */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold mb-6">
                The Embrace Process
              </h2>
              {/* Body Text - Poppins Regular */}
              <p className="text-slate-600 font-poppins font-normal text-lg mb-10">
                Going solar shouldn't be complicated. We've streamlined our
                process to make your transition to clean energy as smooth and
                hands-off as possible.
              </p>

              <div className="space-y-8">
                {[
                  {
                    num: "01",
                    title: "Site Assessment & Design",
                    desc: "We analyze your roof, shading, and energy bills to engineer a custom system that maximizes your savings.",
                  },
                  {
                    num: "02",
                    title: "Permitting & Approvals",
                    desc: "Our team handles all the paperwork, dealing directly with your local municipality and utility company.",
                  },
                  {
                    num: "03",
                    title: "Professional Installation",
                    desc: "Our certified crews install your system typically in 1-2 days, ensuring a clean, watertight finish.",
                  },
                  {
                    num: "04",
                    title: "Inspection & Activation",
                    desc: "After final inspections, we give you the green light to turn on your system and start saving.",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full font-anton text-xl flex items-center justify-center shrink-0 z-10 ${idx % 2 === 0
                          ? "bg-alternativeO text-white"
                          : "bg-alternativeR text-white"
                          }`}
                      >
                        {step.num}
                      </div>
                      {idx !== 3 && (
                        <div className="w-px h-full bg-slate-200 my-2"></div>
                      )}
                    </div>
                    <div className="pb-8">
                      {/* Section Title - Montserrat Bold */}
                      <h4 className="text-xl font-montserrat font-bold mb-2">{step.title}</h4>
                      {/* Body Text - Poppins Regular */}
                      <p className="text-slate-600 font-poppins font-normal text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="lg:w-1/2 w-full" {...fadeIn}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="./services3.jpeg"
                  alt="Solar Installation Process"
                  className="w-full h-[600px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-10">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white">
                    {/* Data Font - Anton ExtraBold */}
                    <div className="font-anton font-extrabold text-4xl text-secondary mb-2">
                      100%
                    </div>
                    {/* Navigation Menu - Montserrat Medium */}
                    <div className="font-montserrat font-medium uppercase tracking-wider text-sm">
                      Turnkey Solution
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div className="text-center mb-16" {...fadeIn}>
            {/* Main Headline - Anton ExtraBold */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold mb-4">
              Frequently Asked Questions
            </h2>
            {/* Body Text - Poppins Regular */}
            <p className="text-slate-600 font-poppins font-normal text-lg">
              Everything you need to know about switching to solar.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  {/* Section Title - Montserrat Bold */}
                  <span className="font-montserrat font-bold text-lg text-primary">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === idx
                      ? "bg-primary text-secondary"
                      : "bg-slate-100 text-slate-500"
                      }`}
                  >
                    {openFaq === idx ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
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
                        duration: 0.3,
                      }}
                    >
                      {/* Body Text - Poppins Regular */}
                      <div className="px-6 pb-6 pt-2 text-slate-600 font-poppins font-normal leading-relaxed border-t border-slate-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-alternativeO/5 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-alternativeR/5 rounded-full blur-3xl translate-y-1/3"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl">
            <div className="max-w-2xl">
              {/* Main Headline - Anton ExtraBold */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold text-white mb-4">
                Ready to start your solar journey?
              </h2>
              {/* Body Text - Poppins Regular */}
              <p className="text-slate-300 font-poppins font-normal text-lg">
                Schedule a free site assessment and discover your property's
                solar potential.
              </p>
            </div>
            {/* Button - Montserrat SemiBold */}
            <Link
              to="/"
              className="shrink-0 bg-secondary text-primary font-montserrat font-semibold px-8 py-4 rounded-sm hover:bg-yellow-400 transition-colors text-lg shadow-lg flex items-center gap-2"
            >
              Schedule Assessment <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}