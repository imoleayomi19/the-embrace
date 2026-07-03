import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Quote,
  ChevronLeft,
  ChevronRight,
  Phone,
  Pencil,
  Zap,
  Power,
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

const INSTALLATION_START_YEAR = 2019;
const yearsOfExperience = new Date().getFullYear() - INSTALLATION_START_YEAR;

const heroPhrases = [
  "Power Your Future With The Sun",
  "RELIABLE POWER BEGINS WITH THE RIGHT PARTNER",
  "SECURING YOUR HOME WITH THE BEST SURVEILLANCE SYSTEM",
];

const heroImages = [
  "./solar-4.jpg",
  "./solar-5.jpg",
  "./solar-6.jpg",
  "./solar-7.jpg",
  "./solar-8.jpg",
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [isTrustedPaused, setIsTrustedPaused] = useState(false);

  const residentialImages = ["/", "/]"];
  const commercialImages = ["/", "/"];
  const maintenanceImages = ["/", "/"];

  const testimonials = [
    {
      name: "Sadiq A. - Lagos Entrepreneur",
      quote:
        "My shop used to suffer from frequent power outages until Embrace Techologies upgraded my inverter setup.The difference is clear - my equipment runs smoothly now, and I no longer panic when NEPA takes light.",
    },
    {
      name: "Adewale O. - Lagos Resident",
      quote:
        "Embrace Technologies really impressed me with their professionalism. From the site inspection to the final installation, everything was well explained and neatly done. My power has been stable since the installation, and I honestly wish I had done it earlier.",
    },
    {
      name: "Mrs. Kemi Balogun ",
      quote:
        "I was worried about spending money on solar, but Embrace Technologies helped me choose the right system for my home without overselling. The system has been working perfectly, and their after-installation support is excellent.",
    },
  ];

  useEffect(() => {
    if (isTestimonialPaused) return;
    const intervalId = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [isTestimonialPaused, testimonials.length]);

  useEffect(() => {
    if (isResidentialPaused) return;
    const intervalId = window.setInterval(() => {
      setResidentialSlide((current) => (current + 1) % residentialImages.length);
    }, 4500);
    return () => window.clearInterval(intervalId);
  }, [isResidentialPaused, residentialImages.length]);

  useEffect(() => {
    if (isCommercialPaused) return;
    const intervalId = window.setInterval(() => {
      setCommercialSlide((current) => (current + 1) % commercialImages.length);
    }, 4500);
    return () => window.clearInterval(intervalId);
  }, [isCommercialPaused, commercialImages.length]);

  useEffect(() => {
    if (isMaintenancePaused) return;
    const intervalId = window.setInterval(() => {
      setMaintenanceSlide((current) => (current + 1) % maintenanceImages.length);
    }, 4500);
    return () => window.clearInterval(intervalId);
  }, [isMaintenancePaused, maintenanceImages.length]);

  useEffect(() => {
    const heroInterval = window.setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setHeroSlide((current) => (current + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 300);
    }, 7000);
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
        if (isDeleting) return currentPhrase.slice(0, current.length - 1);
        return currentPhrase.slice(0, current.length + 1);
      });
    }, isDeleting ? 100 : 180);

    return () => window.clearTimeout(timeoutId);
  }, [heroText, isDeleting, phraseIndex]);

  const nextTestimonial = () =>
    setTestimonialIndex((current) => (current + 1) % testimonials.length);

  const prevTestimonial = () =>
    setTestimonialIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );

  // Steps data with icons and brand colors
  const steps = [
    {
      step: "01",
      title: "Consultation",
      desc: "We assess your energy needs and evaluate your property's solar potential.",
      icon: Phone,
      bgColor: "bg-primary",
      ringColor: "ring-primary/30",
      textColor: "text-primary",
      dotColor: "bg-primary",
    },
    {
      step: "02",
      title: "Custom Design",
      desc: "Our engineers design a system optimized for your specific roof and usage.",
      icon: Pencil,
      bgColor: "bg-secondary",
      ringColor: "ring-secondary/30",
      textColor: "text-secondary",
      dotColor: "bg-secondary",
    },
    {
      step: "03",
      title: "Installation",
      desc: "Certified professionals install your system with minimal disruption.",
      icon: Wrench,
      bgColor: "bg-alternativeO",
      ringColor: "ring-alternativeO/30",
      textColor: "text-alternativeO",
      dotColor: "bg-alternativeO",
    },
    {
      step: "04",
      title: "Activation",
      desc: "We handle all permits and inspections. You turn on the power and save.",
      icon: Zap,
      bgColor: "bg-alternativeR",
      ringColor: "ring-alternativeR/30",
      textColor: "text-alternativeR",
      dotColor: "bg-alternativeR",
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden min-h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlide}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: isTransitioning ? 1 : 1.1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 7, ease: "easeOut" },
              }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImages[heroSlide]}')` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/80" />
        </div>

        <div className="relative z-10 flex flex-col min-h-[calc(100dvh-4rem)] md:min-h-[90vh]">
          {/* Hero content */}
          <div className="container mx-auto px-4 md:px-6 pt-24 sm:pt-28 md:pt-32 pb-6 md:pb-44 flex-1 flex items-start md:items-center">
            <div className="max-w-3xl gpu-accelerate will-change-transform w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                className="gpu-accelerate"
              >

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.15] text-balance w-full font-anton font-extrabold">
                    <span className="text-secondary">{heroText}</span>
                    <span className="ml-1 sm:ml-2 inline-block animate-pulse text-white">|</span>
                  </h3>
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 font-montserrat mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                  Embrace Technologies Limited delivers integrated engineering solutions in solar energy, energy storage, digital security, and smart infrastructure for residential, commercial, industrial, and public-sector clients.
                </p>

                <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto bg-secondary text-primary font-montserrat font-semibold px-4 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-yellow-400 transition-colors text-center text-sm sm:text-lg shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 group whitespace-nowrap"
                  >
                    Request a Quote
                    <ArrowRight className="hidden sm:block w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Trust Strip — in document flow on mobile, pinned to bottom on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
            className="relative md:absolute md:bottom-0 md:left-0 md:right-0 bg-primary/95 backdrop-blur-md border-t border-white/10 py-4 sm:py-5 md:py-6 gpu-accelerate shrink-0"
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-6 md:flex md:flex-row md:justify-between md:items-center md:gap-12">
                <div className="flex flex-row items-center gap-2 sm:gap-3 md:flex-col md:items-start lg:flex-row lg:items-start text-left">
                  <CountUp
                    target={yearsOfExperience}
                    duration={1200}
                    suffix="+"
                    className="text-secondary font-anton font-extrabold text-2xl sm:text-3xl shrink-0"
                  />
                  <span className="text-slate-300 font-montserrat font-medium text-[10px] sm:text-xs md:text-sm uppercase leading-tight">
                    years of installation experience
                  </span>
                </div>
                <Link
                  to="/projects"
                  className="flex flex-row items-center gap-2 sm:gap-3 md:flex-col md:items-start lg:flex-row lg:items-start text-left group transition-colors hover:text-white"
                >
                  <CountUp
                    target={10000}
                    duration={1300}
                    suffix="+"
                    format={(value) =>
                      value >= 1000 ? `${Math.floor(value / 1000)}k` : value.toString()
                    }
                    className="text-secondary font-anton font-extrabold text-2xl sm:text-3xl shrink-0 group-hover:text-secondary"
                  />
                  <span className="text-slate-300 font-montserrat font-medium text-[10px] sm:text-xs md:text-sm uppercase leading-tight">
                    installations delivered
                  </span>
                </Link>
                <div className="flex flex-row items-center gap-2 sm:gap-3 md:flex-col md:items-start lg:flex-row lg:items-start text-left">
                  <span className="text-secondary font-anton font-extrabold text-2xl sm:text-3xl shrink-0">1MW</span>
                  <span className="text-slate-300 font-montserrat font-medium text-[10px] sm:text-xs md:text-sm uppercase leading-tight">
                    commercial solar capacity
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2 sm:gap-3 md:flex-col md:items-start lg:flex-row lg:items-start text-left">
                  <CountUp
                    target={25}
                    duration={1200}
                    suffix="+"
                    className="text-secondary font-anton font-extrabold text-2xl sm:text-3xl shrink-0"
                  />
                  <span className="text-slate-300 font-montserrat font-medium text-[10px] sm:text-xs md:text-sm uppercase leading-tight">
                    training programs delivered
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK SERVICE SECTION */}
      <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {/* Section Header */}
          <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeIn}>
            <span className="inline-block bg-secondary/20 text-primary font-montserrat font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Quick Services
            </span>
            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-primary leading-tight mb-4">
              Everything You Need,{" "}
              <span className="text-secondary italic">All In One Place</span>
            </h2>
            <p className="text-slate-500 font-montserrat text-base md:text-lg leading-relaxed">
              From consultation to commissioning — our expert team delivers reliable energy solutions tailored to your needs.
            </p>
          </motion.div>

          {/* 6 Cards Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                number: "01",
                accent: "text-primary",
                border: "border-primary/30",
                icon: Sun,
                title: "Solar Installation",
                desc: "End-to-end residential and commercial solar PV system design, supply, and professional installation.",
                link: "/services",
              },
              {
                number: "02",
                accent: "text-secondary",
                border: "border-secondary/40",
                icon: Battery,
                title: "Energy Storage",
                desc: "High-capacity lithium battery systems and inverter solutions for 24/7 uninterrupted power supply.",
                link: "/services",
              },
              {
                number: "03",
                accent: "text-alternativeO",
                border: "border-alternativeO/30",
                icon: ShieldCheck,
                title: "System Maintenance",
                desc: "Scheduled inspections, performance monitoring, and rapid-response after-sales support.",
                link: "/services",
              },
              {
                number: "04",
                accent: "text-alternativeR",
                border: "border-alternativeR/30",
                icon: Building2,
                title: "Commercial Projects",
                desc: "Scalable solar solutions for factories, office complexes, schools, and government facilities.",
                link: "/services",
              },
              {
                number: "05",
                accent: "text-primary",
                border: "border-primary/30",
                icon: HomeIcon,
                title: "Smart Home Energy",
                desc: "Intelligent energy management systems that optimise usage and reduce electricity bills.",
                link: "/services",
              },
              {
                number: "06",
                accent: "text-secondary",
                border: "border-secondary/40",
                icon: Leaf,
                title: "Eco Consultation",
                desc: "Expert energy audits and sustainability road-maps aligned with your green-energy goals.",
                link: "/services",
              },
            ].map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`bg-white rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 ${card.border} flex flex-col gap-4 group`}
                >
                  {/* Number + Icon row */}
                  <div className="flex items-center justify-between">
                    <span className={`font-anton font-extrabold text-5xl leading-none ${card.accent} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
                      {card.number}
                    </span>
                    <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shadow-sm`}>
                      <CardIcon className={`w-6 h-6 ${card.accent}`} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-montserrat font-bold text-primary text-lg mb-2 group-hover:text-secondary transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 font-montserrat text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    to={card.link}
                    className={`inline-flex items-center gap-1.5 font-montserrat font-semibold text-sm ${card.accent} mt-auto group-hover:gap-3 transition-all duration-300`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* SERVICES PREVIEW */}
      <section className="pt-12 pb-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('./solar-4.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 py-10 sm:py-12 md:py-16">
              <div className="max-w-5xl mx-auto">
                <div
                  className="bg-black/50 backdrop-blur-sm rounded-2xl p-5 sm:p-8 md:p-12 mb-6 sm:mb-8 overflow-y-auto"
                  style={{
                    maxHeight: "400px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255, 199, 89, 0.5) rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="pr-4">
                    <motion.h2
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-4 sm:mb-6 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      Our Solutions
                    </motion.h2>

                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <p className="text-white/90 font-montserrat text-base sm:text-lg md:text-xl leading-relaxed">
                        As a leading solar installation and energy solutions company in
                        Nigeria, Embrace Technologies Limited delivers innovative,
                        customized solar solutions designed to stand out and perform
                        reliably. Our experienced technical team combines deep industry
                        knowledge with practical expertise in the solar PV space to
                        design, install, and maintain efficient power systems built for
                        Nigerian conditions.
                      </p>
                      <p className="text-white/90 font-montserrat text-base sm:text-lg md:text-xl leading-relaxed">
                        From system design and execution to professional installation and
                        ongoing maintenance, we provide end-to-end solar solutions that
                        help homes and businesses enjoy stable, cost-effective, and
                        long-lasting energy. We understand the unique challenges faced by
                        Nigerian consumers and businesses, and we've tailored our approach
                        to deliver maximum value and reliability in every project we
                        undertake.
                      </p>
                      <p className="text-white/90 font-montserrat text-base sm:text-lg md:text-xl leading-relaxed">
                        Our commitment to excellence extends beyond installation. We provide
                        comprehensive after-sales support, regular maintenance services,
                        and performance monitoring to ensure your solar system continues to
                        deliver optimal results for years to come. With Embrace
                        Technologies, you're not just getting a solar system – you're
                        gaining a long-term partner in your energy independence journey.
                      </p>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-3 bg-white text-primary font-montserrat font-semibold px-8 py-4 rounded-full hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
                  >
                    View All Services
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>


          {/* Service Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 rounded-xl p-4 shadow-[0_0_30px_rgba(0,32,96,0.15)] hover:shadow-[0_0_40px_rgba(255,199,89,0.25)] transition-all duration-300 group border border-white/10"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                title: "Residential Solar Solution",
                image: "./solar-4.jpg",
                features: [
                  "Power your home with clean energy",
                  "Reduce utility bills",
                  "Increase your property's value",
                ],
              },
              {
                title: "Commercial Solar Solution",
                image: "./solar-5.jpg",
                features: [
                  "Maximize ROI",
                  "Take advantage of tax incentives",
                  "Showcase your corporate sustainability",
                ],
              },
              {
                title: "Solar Maintenance Service",
                image: "./solar-6.jpg",
                features: [
                  "Keep your system running at peak efficiency",
                  "Comprehensive maintenance plans",
                  "Regular inspections and cleaning",
                ],
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="bg-primary rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(0,32,96,0.15)] hover:shadow-[0_0_40px_rgba(255,199,89,0.25)] transition-all duration-300 group border border-white/10"
              >
                {/* Title - At the top */}
                <h3 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-6 text-center">
                  {service.title}
                </h3>

                {/* Image */}
                <div className="h-48 md:h-56 overflow-hidden rounded-xl mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-3 text-white/90 font-montserrat text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center w-full bg-white/10 hover:bg-secondary hover:text-primary text-white font-montserrat font-semibold py-3 px-6 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                >
                  MORE DETAILS
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS — ENHANCED */}
      <section className="py-16 md:py-24 bg-slate-50 overflow-hidden relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Section Header - Removed "Our Process" badge */}
          <motion.div className="text-center max-w-3xl mx-auto mb-20" {...fadeIn}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 font-montserrat text-lg">
              A simple, transparent process from your first consultation to
              flipping the switch.
            </p>
          </motion.div>

          {/* Steps with animated progress line */}
          <div className="relative max-w-6xl mx-auto">
            {/* Animated connecting line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary via-alternativeO to-alternativeR rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              />
            </div>

            {/* Steps grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
              {steps.map((item, idx) => {
                const StepIcon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + idx * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -8 }}
                    className="relative flex flex-col items-center text-center group"
                  >
                    {/* Animated dot on the line (desktop) */}
                    <motion.div
                      className={`hidden lg:block absolute top-10 w-3 h-3 rounded-full ${item.dotColor} -translate-y-1/2 z-20`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.15, duration: 0.4 }}
                    />

                    {/* Step circle with pulsing ring */}
                    <div className="relative mb-6">
                      {/* Pulsing ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full ${item.bgColor} opacity-30`}
                        animate={{
                          scale: [1, 1.6, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: idx * 0.3,
                        }}
                      />

                      {/* Main circle */}
                      <motion.div
                        className={`relative w-20 h-20 ${item.bgColor} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <StepIcon className="w-8 h-8 text-white" strokeWidth={2} />
                      </motion.div>

                      {/* Step number badge */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-slate-100"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.4 + idx * 0.15,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <span className={`font-anton font-extrabold text-xs ${item.textColor}`}>
                          {item.step}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <motion.h3
                      className="text-xl font-montserrat font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.15 }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      className="text-slate-600 font-montserrat text-sm leading-relaxed max-w-xs"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.15 }}
                    >
                      {item.desc}
                    </motion.p>

                    {/* Hover underline accent */}
                    <motion.div
                      className={`mt-4 h-0.5 w-12 ${item.bgColor} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & ABOUT SECTION */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header Text - Reduced height */}
          <motion.div
            className="max-w-5xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-primary mb-3">
              Leading Solar Installation Company in Nigeria
            </h2>

            <div className="space-y-2 text-slate-600 font-montserrat text-sm leading-relaxed max-w-4xl mx-auto">
              <p>
                As a leading solar installation company in Nigeria, Embrace Technologies delivers more than solar products — we engineer reliable power systems built specifically for Nigerian conditions.
              </p>
              <p>
                We partner with globally recognized solar manufacturers to source high-performance panels, lithium batteries, inverters, and protection components that meet international standards. But premium equipment alone is not enough. What truly defines our work is precision design, proper load analysis, structured wiring architecture, and complete system protection.
              </p>
              <p>
                From detailed energy audits and system sizing to installation, configuration, and post-installation maintenance, we handle every stage with technical discipline and long-term performance in mind.
              </p>
            </div>
          </motion.div>

          {/* Split Layout: Image + Testimonial */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[300px] lg:h-[450px]"
            >
              <img
                src="./solar-4.jpg"
                alt="Solar panel installation team at work"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20 lg:bg-gradient-to-r lg:from-transparent lg:to-primary/10" />
            </motion.div>

            {/* Right: Blue Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-primary p-3 sm:p-5 md:p-8 lg:p-12 flex flex-col justify-center min-h-[auto] lg:min-h-[450px] group/card"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
            >
              <div
                className="relative z-10 flex flex-col justify-between h-full w-full max-w-full"
                onMouseEnter={() => setIsTestimonialPaused(true)}
                onMouseLeave={() => setIsTestimonialPaused(false)}
              >
                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-montserrat font-bold text-white mb-3 sm:mb-4 md:mb-6 text-center leading-tight px-2"
                >
                  What Client Say About Us
                </motion.h3>

                {/* Testimonial Slider */}
                <div className="overflow-hidden flex-grow flex items-center w-full max-w-full">
                  <motion.div
                    className="flex"
                    animate={{ x: `-${testimonialIndex * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {testimonials.map((testimonial, idx) => (
                      <motion.div
                        key={idx}
                        className="w-full flex-shrink-0 px-2 sm:px-3 md:px-4"
                        style={{ minWidth: '100%' }}
                      >
                        <div className="text-center w-full max-w-full">
                          {/* Quote */}
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-white/90 font-montserrat text-[11px] sm:text-xs md:text-sm lg:text-base italic leading-snug sm:leading-relaxed mb-3 sm:mb-4 md:mb-6"
                            style={{
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word',
                              hyphens: 'auto',
                              textAlign: 'center'
                            }}
                          >
                            "{testimonial.quote}"
                          </motion.p>

                          {/* Stars */}
                          <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2 mb-3 sm:mb-4 md:mb-6">
                            {[...Array(5)].map((_, i) => (
                              <Sun key={i} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-current text-secondary flex-shrink-0" />
                            ))}
                          </div>

                          {/* Client Info */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="cursor-default px-2"
                          >
                            <h4 className="text-white font-montserrat font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1"
                              style={{
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word'
                              }}>
                              {testimonial.name}
                            </h4>
                            <p className="text-white/70 font-montserrat text-[10px] sm:text-xs md:text-sm">
                              {testimonial.role || ""}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Animated underline - visible on hover of entire card */}
                <div className="mt-3 sm:mt-4 md:mt-6 flex justify-center">
                  <div className="h-0.5 bg-secondary w-0 group-hover/card:w-56 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY ORGANISATIONS */}
      <section className="py-16 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6" onMouseEnter={() => setIsTrustedPaused(true)}
          onMouseLeave={() => setIsTrustedPaused(false)}>
          <motion.div className="text-center mb-12" {...fadeIn}>
            <p className="font-montserrat font-medium text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">
              Trusted By Leading Organisations
            </p>
            <div className="w-16 h-0.5 bg-secondary mx-auto"></div>
          </motion.div>

          <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsTrustedPaused(true)}
            onMouseLeave={() => setIsTrustedPaused(false)}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-50 to-transparent" />

            <motion.div
              className="flex items-center gap-20 md:gap-28 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: isTrustedPaused ? 0 : 50,  // When paused, duration becomes 0 (stops animation)
                  ease: "linear",
                },
              }}
            >
              {[...Array(2)].flatMap((_, dupIdx) =>
                [
                  { name: "Deye", src: "./embrace-trusted3.png" },
                  { name: "Lado Oil", src: "./embrace-trusted1.png" },
                  { name: "Felicity Solar", src: "./embrace-trusted2.jpg" },
                  { name: "luxsun energy", src: "./luxsun logo.png" },
                  { name: "growatt", src: "./Growatt-logo.png" },
                  { name: "Prado Power", src: "./prado-logo.png" },
                  { name: "Chint Power", src: "./Chint-logo.png" },
                  { name: "Coleman Power", src: "./Coleman-logo.png" },
                  { name: "Dahua Power", src: "./Dahua logo.png" },
                  { name: "Hikvision Power", src: "./Hikvision-logo.png" },
                  { name: "Huawei Power", src: "./huawei_logo.png" },
                  { name: "ja-solar", src: "./ja-solar.png" },
                  { name: "jinko Power", src: "./jinko solar.png" },
                  { name: "longi Power", src: "./longi-logo.png" },
                  { name: "Suntree Power", src: "./Suntree-logo.png" },
                  { name: "Trina Power", src: "./Trina logo.png" },
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
                ))
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-cta-pattern bg-cover bg-center relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-md p-6 sm:p-10 md:p-16 rounded-2xl border border-white/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-montserrat font-bold text-white mb-4 sm:mb-6">
              Ready to Embrace Clean Energy?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-montserrat mb-8 sm:mb-10 max-w-2xl mx-auto">
              Call To Action
              Ready To Power Your Home or Business?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-primary font-montserrat font-semibold px-6 sm:px-10 py-4 sm:py-5 rounded-sm hover:bg-yellow-400 transition-colors text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300"
            >

              Request Free Consultation

              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}