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
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </motion.div>

            {/* ABOUT US Title with letter animation */}
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
                About Us
              </span>
            </motion.nav>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Team Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-[3/4] max-h-[500px]"
            >
              <img
                src="/solar-10.jpg"
                alt="Embrace Technologies Team"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Right Column: Story & Intro */}
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div {...fadeIn}>
                <span className="text-secondary uppercase tracking-[0.3em] text-sm font-semibold">
                  Built to deliver
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight text-primary">
                  Backed by power you can trust.
                </h2>
              </motion.div>

              <motion.div {...fadeIn} className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-800">Our Story</h3>
                <p className="text-slate-600 font-montserrat text-lg leading-relaxed">
                  Embrace Technologies is a trusted solar energy and security
                  solutions company based in{" "}
                  <span className="font-bold">Ikorodu, Lagos, Nigeria, </span>
                  delivering reliable power and smart technology solutions to
                  homes, offices, and businesses across Nigeria. We specialize in
                  solar system design and installation, inverter and battery
                  solutions, CCTV and IP camera installation, access control
                  systems, vehicle tracking, networking, and professional
                  technical training. Our goal is simple: to help Nigerians
                  achieve stable power, enhanced security, and long-term energy
                  independence in a country where power reliability remains a
                  major challenge.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeIn}
          >
            <h2 className="text-4xl md:text-5xl mb-4">Our Core Values</h2>
            <p className="text-slate-600 font-montserrat text-lg">
              These principles guide everything we do and shape our commitment
              to excellence.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                icon: Award,
                title: "Excellence",
                desc: "We deliver the highest quality solar solutions with meticulous attention to detail.",
              },
              {
                icon: Users,
                title: "Customer Focus",
                desc: "Your satisfaction and long-term success are at the heart of all we do.",
              },
              {
                icon: Target,
                title: "Innovation",
                desc: "We constantly evolve to bring the latest technology and solutions to our clients.",
              },
              {
                icon: Heart,
                title: "Sustainability",
                desc: "Protecting our environment is our responsibility to future generations.",
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">
                  <value.icon
                    className={`w-12 h-12 ${idx === 0
                      ? "text-alternativeO"
                      : idx === 1
                        ? "text-secondary"
                        : idx === 2
                          ? "text-alternativeR"
                          : "text-alternative"
                      }`}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-slate-600 font-montserrat">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* ACHIEVEMENTS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeIn}
          >
            <h2 className="text-4xl md:text-5xl mb-4">Our Achievements</h2>
            <p className="text-slate-600 font-montserrat text-lg">
              Measurable impact and recognition from industry leaders.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                number: "5,000+",
                label: "Homes Powered",
                color: "text-secondary",
              },
              {
                number: "25M+",
                label: "kWh Generated",
                color: "text-alternativeO",
              },
              {
                number: "18k",
                label: "Tons CO2 Offset",
                color: "text-alternativeR",
              },
              {
                number: "99%",
                label: "Customer Satisfaction",
                color: "text-alternative",
              },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeIn}>
                <div
                  className={`text-4xl md:text-5xl font-anton ${stat.color} mb-2`}
                >
                  {stat.number}
                </div>
                <p className="text-slate-600 font-montserrat text-lg">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeIn}
          >
            <h2 className="text-4xl md:text-5xl mb-4">Why Choose Embrace</h2>
            <p className="text-slate-600 font-montserrat text-lg">
              We set ourselves apart through expertise, commitment, and results.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                title: "NABCEP Certified Team",
                desc: "Our installers hold industry-leading certifications ensuring flawless execution.",
              },
              {
                title: "25-Year Warranties",
                desc: "Comprehensive coverage and ongoing support for your peace of mind.",
              },
              {
                title: "Premium Components",
                desc: "We use only tier-1 equipment from trusted global manufacturers.",
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden fees—just honest, competitive pricing upfront.",
              },
              {
                title: "Local Expertise",
                desc: "Deep knowledge of Nigeria's climate and energy landscape.",
              },
              {
                title: "Lifetime Support",
                desc: "Dedicated customer service and maintenance throughout your system's life.",
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeIn} className="flex gap-4">
                <CheckCircle2
                  className={`w-6 h-6 ${idx % 3 === 0
                    ? "text-alternativeO"
                    : idx % 3 === 1
                      ? "text-secondary"
                      : "text-alternativeR"
                    } shrink-0 mt-1`}
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-600 font-montserrat">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeIn}
          >
            <h2 className="text-4xl md:text-5xl mb-4">Our Team</h2>
            <p className="text-slate-600 font-montserrat text-lg">
              Dedicated professionals committed to powering your sustainable
              future.
            </p>
          </motion.div>

          <motion.p
            className="text-center text-slate-600 font-montserrat text-lg max-w-2xl mx-auto"
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
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              Ready to Join the Solar Revolution?
            </h2>
            <p className="text-xl text-slate-200 font-montserrat mb-10">
              Let's help you harness the power of the sun and build a
              sustainable future.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-secondary text-primary font-bold font-poppins px-8 py-4 rounded-sm hover:bg-yellow-400 transition-colors shadow-lg"
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