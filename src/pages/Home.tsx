import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Sun,
  Battery,
  Leaf,
  ArrowRight,
  Home as HomeIcon,
  Building2,
  Wrench,
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
    margin: "-100px",
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
    margin: "-100px",
  },
  transition: {
    staggerChildren: 0.2,
  },
};
const INSTALLATION_START_YEAR = 2019;
const yearsOfExperience = new Date().getFullYear() - INSTALLATION_START_YEAR;
const heroPhrases = [
  "Power Your Future With The Sun",
  "REALIABLE SOLAR POWER BEGINS WITH RIGHT PARTNER",
  "SECURING YOUR HOME WITH THE BEST SURVEILLANCE SYSTEM",
];
const heroImages = [
  "/solar-4.jpg",
  "/solar-5.jpg",
  "/solar-6.jpg",
  "/solar-7.jpg",
  "/solar-8.jpg",
];
function CountUp({
  target,
  duration = 1200,
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
    if (!node) {
      return;
    }

    let rafId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const startTime = performance.now();

          const step = (timestamp: number) => {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setValue(Math.round(progress * target));
            if (progress < 1) {
              rafId = requestAnimationFrame(step);
            }
          };

          rafId = requestAnimationFrame(step);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      },
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

export function Home() {
  const [heroText, setHeroText] = useState(heroPhrases[0]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [residentialSlide, setResidentialSlide] = useState(0);
  const [isResidentialPaused, setIsResidentialPaused] = useState(false);

  const [commercialSlide, setCommercialSlide] = useState(0);
  const [isCommercialPaused, setIsCommercialPaused] = useState(false);

  const [maintenanceSlide, setMaintenanceSlide] = useState(0);
  const [isMaintenancePaused, setIsMaintenancePaused] = useState(false);

  const [heroSlide, setHeroSlide] = useState(0);

  const residentialImages = ["/", "/]"];
  const commercialImages = ["/", "/"];
  const maintenanceImages = ["/", "/"];

  useEffect(() => {
    if (isResidentialPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setResidentialSlide(
        (current) => (current + 1) % residentialImages.length,
      );
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isResidentialPaused, residentialImages.length]);
  useEffect(() => {
    if (isCommercialPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCommercialSlide((current) => (current + 1) % commercialImages.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isCommercialPaused, commercialImages.length]);
  useEffect(() => {
    if (isMaintenancePaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setMaintenanceSlide(
        (current) => (current + 1) % maintenanceImages.length,
      );
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isMaintenancePaused, maintenanceImages.length]);

  useEffect(() => {
    const heroInterval = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(heroInterval);
  }, []);

  useEffect(() => {
    const currentPhrase = heroPhrases[phraseIndex];

    if (!isDeleting && heroText === currentPhrase) {
      const pauseId = window.setTimeout(() => setIsDeleting(true), 1200);
      return () => window.clearTimeout(pauseId);
    }

    if (isDeleting && heroText === "") {
      setIsDeleting(false);
      setPhraseIndex((current) => (current + 1) % heroPhrases.length);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHeroText((current) => {
        if (isDeleting) {
          return currentPhrase.slice(0, current.length - 1);
        }
        return currentPhrase.slice(0, current.length + 1);
      });
    }, isDeleting ? 100 : 180);

    return () => window.clearTimeout(timeoutId);
  }, [heroText, isDeleting, phraseIndex]);

  return (
    <main className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-72 md:pb-44 overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((src, idx) => (
            <div
              key={src}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${idx === heroSlide ? "opacity-100" : "opacity-0"}`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/80" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl gpu-accelerate will-change-transform">
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                ease: "easeOut",
              }}
              className="gpu-accelerate"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-1">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex"
                >
                  <Sun className="w-4 h-4 text-secondary drop-shadow-[0_0_6px_rgba(255,199,89,0.8)]" />
                </motion.div>
                <span className="text-white font-poppins text-sm font-medium tracking-wide uppercase">
                  Leading Solar Provider
                </span>
              </div>
              <div className="h-[4rem] md:h-[6rem] lg:h-[7rem] overflow-hidden flex items-center mb-6">
                <h3 className="text-5xl md:text-7xl lg:text-5xl text-white leading-[1.1] text-balance w-full">
                  <span className="text-secondary">{heroText}</span>
                  <span className="ml-2 inline-block animate-pulse text-white">|</span>
                </h3>
              </div>
              <p className="text-lg md:text-xl text-slate-200 font-montserrat mb-10 max-w-2xl leading-relaxed">
                Embrace Technologies Limited delivers premium solar and security
                solutions for homes and businesses. Save money, increase
                property value, and protect the environment.
              </p>

              <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
                <Link
                  to="/"
                  className="w-full sm:w-auto bg-secondary text-primary font-bold font-poppins px-4 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-yellow-400 transition-colors text-center text-sm sm:text-lg shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 group whitespace-nowrap"
                >
                  Get a Free Quote
                  <ArrowRight className="hidden sm:block w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/30 font-bold font-poppins px-4 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-white/20 transition-colors text-center text-sm sm:text-lg"
                >
                  Our Services
                </Link>
                <Link
                  to="/services"
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/30 font-bold font-poppins px-4 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-white/20 transition-colors text-center text-sm sm:text-lg"
                >
                  Book a Site Inspection
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Strip */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.5,
            delay: 1.0,
            ease: "easeOut",
          }}
          className="absolute bottom-0 left-0 right-0 bg-primary/95 backdrop-blur-md border-t border-white/10 py-6 gpu-accelerate"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 md:gap-12">
              <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3">
                <CountUp
                  target={yearsOfExperience}
                  duration={1200}
                  suffix="+"
                  className="text-secondary font-anton text-3xl"
                />
                <span className="text-slate-300 font-poppins text-sm uppercase leading-tight">
                  years of installation
                  <br />
                  experience
                </span>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/20"></div>
              <Link
                to="/projects"
                className="w-full md:w-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 group transition-colors hover:text-white"
              >
                <CountUp
                  target={10000}
                  duration={1300}
                  suffix="+"
                  format={(value) =>
                    value >= 1000
                      ? `${Math.floor(value / 1000)}k`
                      : value.toString()
                  }
                  className="text-secondary font-anton text-3xl group-hover:text-secondary"
                />
                <span className="text-slate-300 font-poppins text-sm uppercase leading-tight">
                  installations
                  <br />
                  delivered
                </span>
              </Link>
              <div className="hidden md:block w-px h-10 bg-white/20"></div>
              <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3">
                <span className="text-secondary font-anton text-3xl">1MW</span>
                <span className="text-slate-300 font-poppins text-sm uppercase leading-tight">
                  commercial
                  <br />
                  solar capacity
                </span>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/20"></div>
              <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3">
                <CountUp
                  target={25}
                  duration={1200}
                  suffix="+"
                  className="text-secondary font-anton text-3xl"
                />
                <span className="text-slate-300 font-poppins text-sm uppercase leading-tight">
                  training programs
                  <br />
                  delivered
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeIn}
          >
            <h2 className="text-4xl md:text-5xl mb-4">Why Choose Embrace</h2>
            <p className="text-slate-600 font-montserrat text-lg">
              We combine industry-leading technology with expert installation to
              deliver solar systems that perform better and last longer.
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
                icon: ShieldCheck,
                title: "Certified Installers",
                desc: "Our team of NEMCA and current certified professionals ensures flawless execution.",
                color: "text-alternativeO",
              },
              {
                icon: Sun,
                title: "Premium Panels",
                desc: "We use tier-1 monocrystalline panels with industry-leading efficiency.",
                color: "text-secondary",
              },
              {
                icon: Battery,
                title: "Lifetime Support",
                desc: "25-year comprehensive lifetime and ongoing maintenance support.",
                color: "text-alternativeR",
              },
              {
                icon: Leaf,
                title: "Eco-Friendly",
                desc: "Reduce your carbon footprint and contribute to a sustainable future.",
                color: "text-alternative",
              },
            ].map((prop, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow group"
              >
                <div
                  className={`w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <prop.icon className={`w-7 h-7 ${prop.color}`} />
                </div>
                <h3 className="text-xl mb-3">{prop.title}</h3>
                <p className="text-slate-600 font-montserrat text-sm leading-relaxed">
                  {prop.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY ORGANISATIONS */}
      <section className="py-16 bg-white border-t border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <p className="font-poppins text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">
              Trusted By Leading Organisations
            </p>
            <div className="w-16 h-0.5 bg-secondary mx-auto"></div>
          </motion.div>
        </div>

        {/* Marquee Track */}
        <div className="relative w-full overflow-hidden">
          {/* Edge gradient fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

          <motion.div
            className="flex items-center gap-20 md:gap-28 w-max"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...Array(2)].flatMap((_, dupIdx) =>
              [
                {
                  name: "Deye",
                  src: "/embrace-trusted.png",
                },
                {
                  name: "Lado Oil",
                  src: "/embrace-trusted1.png",
                },
                {
                  name: "Felicity Solar",
                  src: "/embrace-trusted2.jpg",
                },
                {
                  name: "luxsun energy",
                  src: "/luxsun logo.png",
                },
                {
                  name: "growatt",
                  src: "/Growatt-logo.png",
                },
                {
                  name: "Prado Power",
                  src: "/embrace-trusted3.png",
                },
              ].map((org, idx) => (
                <div
                  key={`${dupIdx}-${idx}`}
                  className="flex items-center justify-center h-20 w-40 md:w-52 shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
                  aria-hidden={dupIdx === 1 ? "true" : undefined}
                >
                  <img
                    src={org.src}
                    alt={dupIdx === 0 ? `${org.name} logo` : ""}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )),
            )}
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div className="max-w-2xl" {...fadeIn}>
              <h2 className="text-4xl md:text-5xl mb-4">Our Solutions</h2>
              <p className="text-slate-600 font-montserrat text-lg">
                As a leading solar installation and energy solutions company in
                Nigeria, Embrace Technologies Limited delivers innovative,
                customized solar solutions designed to stand out and perform
                reliably. Our experienced technical team combines deep industry
                knowledge with practical expertise in the solar PV space to
                design, install, and maintain efficient power systems built for
                Nigerian conditions. From system design and execution to
                professional installation and ongoing maintenance, we provide
                end-to-end solar solutions that help homes and businesses enjoy
                stable, cost-effective, and long-lasting energy.
              </p>
            </motion.div>
            <motion.div {...fadeIn}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 font-poppins font-bold text-primary hover:text-secondary transition-colors"
              >
                View All Services <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                icon: HomeIcon,
                title: "Custom Home or Residential Solar Solution",
                images: residentialImages,
                desc: "Power your home with clean energy, reduce utility bills, and increase your property's value.",
              },
              {
                icon: Building2,
                title: "Business and Commercial Solar Solution",
                images: commercialImages,
                desc: "Maximize ROI, take advantage of tax incentives, and showcase your corporate sustainability.",
              },
              {
                icon: Wrench,
                title: "Solar Maintenance Service",
                images: maintenanceImages,
                desc: "Keep your system running at peak efficiency with our comprehensive maintenance plans.",
              },
            ].map((service, idx) => {
              const currentSlide =
                service.title === "Residential Solar"
                  ? residentialSlide
                  : service.title === "Commercial Solar"
                    ? commercialSlide
                    : maintenanceSlide;

              const setCurrentSlide =
                service.title === "Residential Solar"
                  ? setResidentialSlide
                  : service.title === "Commercial Solar"
                    ? setCommercialSlide
                    : setMaintenanceSlide;

              const setCurrentPause =
                service.title === "Residential Solar"
                  ? setIsResidentialPaused
                  : service.title === "Commercial Solar"
                    ? setIsCommercialPaused
                    : setIsMaintenancePaused;

              return (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div
                    className="h-64 overflow-hidden relative"
                    onMouseEnter={() => setCurrentPause(true)}
                    onMouseLeave={() => setCurrentPause(false)}
                  >
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img
                      src={service.images ? service.images[currentSlide] : ""}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute top-4 left-4 z-20 bg-white p-3 rounded-full shadow-md">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>

                    {service.images && service.images.length > 1 && (
                      <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2 px-4">
                        {service.images.map((_, slideIdx) => (
                          <button
                            key={slideIdx}
                            type="button"
                            onClick={() => setCurrentSlide(slideIdx)}
                            className={`h-2.5 w-2.5 rounded-full transition-colors ${currentSlide === slideIdx ? "bg-white" : "bg-white/40 hover:bg-white"}`}
                            aria-label={`Show slide ${slideIdx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl mb-3">{service.title}</h3>
                    <p className="text-slate-600 font-montserrat mb-6 line-clamp-3">
                      {service.desc}
                    </p>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 font-poppins font-semibold text-primary group-hover:text-secondary transition-colors"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            {...fadeIn}
          >
            <h2 className="text-4xl md:text-5xl mb-4">How It Works</h2>
            <p className="text-slate-600 font-montserrat text-lg">
              A simple, transparent process from your first consultation to
              flipping the switch.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden lg:block"></div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {[
                {
                  step: "01",
                  title: "Consultation",
                  desc: "We assess your energy needs and evaluate your property's solar potential.",
                },
                {
                  step: "02",
                  title: "Custom Design",
                  desc: "Our engineers design a system optimized for your specific roof and usage.",
                },
                {
                  step: "03",
                  title: "Installation",
                  desc: "Certified professionals install your system with minimal disruption.",
                },
                {
                  step: "04",
                  title: "Activation",
                  desc: "We handle all permits and inspections. You turn on the power and save.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10">
                    <span className="font-anton text-3xl text-primary">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-600 font-montserrat text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPACT / STATS */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Abstract sun rays background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-alternative/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-alternativeO/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-alternativeR/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                num: "25M+",
                label: "kWh Generated",
              },
              {
                num: "18k",
                label: "Tons CO2 Offset",
                color: "text-alternativeO",
              },
              {
                num: "5,000+",
                label: "Homes Powered",
              },
              {
                num: "99%",
                label: "Happy Customers",
              },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeIn} className="p-6">
                <div
                  className={`font-anton text-5xl md:text-6xl mb-4 ${stat.color || "text-secondary"}`}
                >
                  {stat.num}
                </div>
                <div className="font-poppins text-white uppercase tracking-wider text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-cta-pattern bg-cover bg-center relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-md p-10 md:p-16 rounded-2xl border border-white/20 shadow-2xl"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <h2 className="text-4xl md:text-6xl text-white mb-6">
              Ready to Embrace Clean Energy?
            </h2>
            <p className="text-xl text-slate-200 font-montserrat mb-10 max-w-2xl mx-auto">
              Get a free, no-obligation quote and see how much you could save by
              switching to solar today.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-primary font-bold font-poppins px-10 py-5 rounded-sm hover:bg-yellow-400 transition-colors text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300"
            >
              Schedule Free Assessment
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
