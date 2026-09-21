import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sun,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Phone,
  Zap,
  Camera,
  GraduationCap,
  ShoppingBag,
} from "lucide-react";

// Custom Solar Panel with Settings Icon
const SolarPanelSettings = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Solar Panel */}
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <line x1="6" y1="6" x2="6" y2="18" />
    <line x1="10" y1="6" x2="10" y2="18" />
    <line x1="14" y1="6" x2="14" y2="18" />
    <line x1="18" y1="6" x2="18" y2="18" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <line x1="2" y1="14" x2="22" y2="14" />
    {/* Settings Gear */}
    <circle cx="18" cy="18" r="3" fill="currentColor" stroke="none" />
  </svg>
);

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
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [heroTextStage, setHeroTextStage] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [isTrustedPaused, setIsTrustedPaused] = useState(false);

  // Keep both existing background videos while the content stays consistent across slides.
  const heroSlides = useMemo(() => [
    {
      type: "video",
      content: "https://res.cloudinary.com/ubznmcom/video/upload/v1787930923/herosec.mp4",
      duration: 14000,
    },
    {
      type: "video",
      content: "https://res.cloudinary.com/ubznmcom/video/upload/v1787930923/herosec.mp4",
      duration: 13000,
    },
  ], []);

  const testimonials: { name: string; quote: string; role?: string }[] = [
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

  // Auto-advance slides based on current slide duration
  useEffect(() => {
    const currentSlideDuration = heroSlides[activeVideoIndex].duration;
    const intervalId = window.setInterval(() => {
      setTimeout(() => {
        setActiveVideoIndex((current) => (current + 1) % heroSlides.length);
      }, 300);
    }, currentSlideDuration);
    return () => window.clearInterval(intervalId);
  }, [activeVideoIndex, heroSlides]);

  // Sequence the second slide's header and description before replacing its header.
  // Give both headers an equal share of the slide's on-screen time: the first
  // header runs from 1200ms to the midpoint of the remaining duration, and the
  // second header runs from that midpoint to the end of the slide.
  useEffect(() => {
    setHeroTextStage(0);
    const firstTextTimeoutId = window.setTimeout(() => {
      setHeroTextStage(1);
    }, 1200);

    let finalTextTimeoutId: number | undefined;
    if (activeVideoIndex === 1) {
      const slideDuration = heroSlides[activeVideoIndex].duration;
      const midpoint = 1200 + (slideDuration - 1200) / 2;
      finalTextTimeoutId = window.setTimeout(() => {
        setHeroTextStage(2);
      }, midpoint);
    }

    return () => {
      window.clearTimeout(firstTextTimeoutId);
      if (finalTextTimeoutId !== undefined) window.clearTimeout(finalTextTimeoutId);
    };
  }, [activeVideoIndex, heroSlides]);

  // Testimonial auto-advance
  useEffect(() => {
    if (isTestimonialPaused) return;
    const intervalId = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [isTestimonialPaused, testimonials.length]);

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
      icon: SolarPanelSettings,
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
      desc: "We handle permits and inspections. You flip the switch and start saving.",
      icon: Zap,
      bgColor: "bg-alternativeR",
      ringColor: "ring-alternativeR/30",
      textColor: "text-alternativeR",
      dotColor: "bg-alternativeR",
    },
  ];

  // Service cards for the right side - 5 cards with 5 brand colors
  const serviceCards = [
    {
      icon: Sun,
      title: "Solar & Energy Solutions",
      desc: "Hybrid, off-grid, grid-tie, backup and commercial power solutions",
      color: "#002060", // primary - dark blue
      gradient: "linear-gradient(135deg, #002060 0%, #004080 100%)",
    },
    {
      icon: Camera,
      title: "Security & Smart Systems",
      desc: "CCTV, access control and intelligent surveillance system",
      color: "#FFC759", // secondary - yellow
      gradient: "linear-gradient(135deg, #FFC759 0%, #FFB300 100%)",
    },
    {
      icon: Wrench,
      title: "Engineering Services",
      desc: "Design, installation, commissioning and maintenance",
      color: "#066906", // alternative - green
      gradient: "linear-gradient(135deg, #066906 0%, #0A8F0A 100%)",
    },
    {
      icon: ShoppingBag,
      title: "Retail Shop",
      desc: "Inverters, Batteries, Panels, Cables, Breakers, Racks, Rails, etc.",
      color: "#EA6936", // alternativeO - orange
      gradient: "linear-gradient(135deg, #EA6936 0%, #FF8C61 100%)",
    },
    {
      icon: GraduationCap,
      title: "Training & Capacity Development",
      desc: "Professional training and practical certification programs.",
      color: "#EE373D", // alternativeR - red
      gradient: "linear-gradient(135deg, #EE373D 0%, #FF6B6E 100%)",
    },
  ];

  const heroStats = [
    {
      label: "Installations Delivered",
      isCountUp: true,
      target: 10,
      duration: 1300,
      suffix: "k+",
      format: (value: number) =>
        value >= 1000 ? `${Math.floor(value / 1000)}k` : value.toString(),
    },
    {
      label: "Training Programs Delivered",
      isCountUp: true,
      target: 25,
      duration: 1300,
      suffix: "+",
    },
    {
      label: "Years of Experience",
      isCountUp: true,
      target: yearsOfExperience,
      duration: 1200,
      suffix: "+",
    },
    {
      label: "Commercial Solar Capacity Installed",
      isCountUp: false,
      staticValue: "1MW+",
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      {/* HERO SECTION WITH SLIDING CARDS */}
      <section className="relative overflow-hidden min-h-[115vh] md:min-h-[130vh] bg-primary">
        {/* Sliding Cards Container */}
        <div className="absolute inset-0 overflow-hidden bg-primary">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeVideoIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 1.6, ease: "easeInOut" },
              }}
              className="absolute inset-0 bg-primary"
            >
              {/* Card Content */}
              <div className="absolute inset-0 bg-cover bg-center">
                {heroSlides[activeVideoIndex].type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source
                      src={heroSlides[activeVideoIndex].content}
                      type={heroSlides[activeVideoIndex].content.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
                    />
                    <img
                      src="./solar-4.jpg"
                      alt="Video fallback"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </video>
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${heroSlides[activeVideoIndex].content}')` }}
                  />
                )}
              </div>

              {/* Subtle Dark Gradient Overlay - Entire Section */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col min-h-[110vh] md:min-h-[120vh]">
          {/* Shared hero message aligned more to the LEFT */}
          <div className="flex w-full flex-1 items-center px-4 pb-24 pt-32 sm:px-6 md:px-8 lg:px-12">
            {heroTextStage > 0 && (
              <div
                key={`text-${activeVideoIndex}`}
                className="w-full max-w-3xl text-left ml-0 md:ml-4 lg:ml-8"
              >
                {activeVideoIndex === 0 ? (
                  <>
                    <h1 className="animate-fade-in-up font-montserrat text-3xl font-black leading-tight text-white drop-shadow-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                      STAY ON<br />GO BEYOND
                    </h1>
                    <div className="mt-4 max-w-2xl rounded-xl bg-black/20 p-4 backdrop-blur-sm sm:p-6">
                      <p className="animate-fade-in-up font-source-sans-pro text-base font-medium leading-relaxed text-white drop-shadow-lg sm:text-lg">
                        Embrace Technologies Limited delivers integrated engineering solutions in solar energy, energy storage, digital security, and smart infrastructure for residential, commercial, industrial, and public-sector clients.
                      </p>
                    </div>
                    <div className="mt-7 flex flex-col items-start justify-start gap-3 sm:flex-row">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-sm bg-secondary px-6 py-3 text-base font-bold text-primary shadow-lg shadow-secondary/20 transition-all duration-300 hover:bg-white sm:px-8 sm:text-lg"
                      >
                        Request a Quote
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                      <Link
                        to="/shop"
                        className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-base font-bold text-primary shadow-lg transition-all duration-300 hover:bg-secondary sm:px-8 sm:text-lg"
                      >
                        Shop Now
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <AnimatePresence mode="wait" initial={false}>
                      {heroTextStage === 1 && (
                        <motion.h1
                          key="power-future"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -18 }}
                          transition={{ duration: 0.55, ease: "easeOut" }}
                          className="font-montserrat text-3xl font-black leading-tight text-white drop-shadow-2xl sm:text-4xl md:text-5xl lg:text-6xl"
                        >
                          Power Your <br /> Future With The Sun
                        </motion.h1>
                      )}
                      {heroTextStage === 2 && (
                        <motion.h1
                          key="surveillance-system"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -18 }}
                          transition={{ duration: 0.55, ease: "easeOut" }}
                          className="font-montserrat text-3xl font-black leading-tight text-white drop-shadow-2xl sm:text-4xl md:text-5xl lg:text-6xl"
                        >
                          Best Home Surveillance System
                        </motion.h1>
                      )}
                    </AnimatePresence>

                    {/* Constant Description */}
                    <div className="mt-4 max-w-2xl rounded-xl bg-black/20 p-4 backdrop-blur-sm sm:p-6">
                      <p className="font-source-sans-pro text-base font-medium leading-relaxed text-white drop-shadow-lg sm:text-lg">
                        Embrace Technologies Limited delivers integrated engineering solutions in solar energy, energy storage, digital security, and smart infrastructure for residential, commercial, industrial, and public-sector clients.
                      </p>
                    </div>

                    {/* Buttons for Slide 2 */}
                    <div className="mt-7 flex flex-col items-start justify-start gap-3 sm:flex-row">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-sm bg-secondary px-6 py-3 text-base font-bold text-primary shadow-lg shadow-secondary/20 transition-all duration-300 hover:bg-white sm:px-8 sm:text-lg"
                      >
                        Request a Quote
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                      <Link
                        to="/shop"
                        className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-base font-bold text-primary shadow-lg transition-all duration-300 hover:bg-secondary sm:px-8 sm:text-lg"
                      >
                        Shop Now
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveVideoIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeVideoIndex ? "bg-white w-8" : "bg-white/50"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STATS CARDS - pulled up over the hero's bottom edge via negative margin.*/}
      <div className="relative z-40 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {heroStats.map((stat, idx) => {
              const isLongLabel = stat.label.length > 30;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 p-6 sm:p-7 md:p-9 lg:p-10 min-h-[170px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[220px] flex flex-col items-center justify-center text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFFFFF 0%, #FFF9F0 30%, #FFEED9 60%, #FFE0BC 85%, #FFD5A3 100%)",
                  }}
                >
                  <div
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 md:mb-3"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    {stat.isCountUp ? (
                      <CountUp
                        target={stat.target as number}
                        duration={stat.duration}
                        suffix={stat.suffix}
                        format={stat.format}
                      />
                    ) : (
                      stat.staticValue
                    )}
                  </div>
                  <div
                    className={`text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wide text-slate-500 font-montserrat ${isLongLabel
                      ? "leading-snug max-w-[9rem] sm:max-w-[10.5rem] md:max-w-[12.5rem] mx-auto"
                      : "whitespace-nowrap"
                      }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TRUSTED BY ORGANISATIONS */}
      <section className="pt-16 pb-16 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6" onMouseEnter={() => setIsTrustedPaused(true)}
          onMouseLeave={() => setIsTrustedPaused(false)}>

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
                  duration: isTrustedPaused ? 0 : 50,
                  ease: "linear",
                },
              }}
            >
              {[...Array(2)].flatMap((_, dupIdx) =>
                [
                  { name: "Chint Power", src: "./chint-logo.webp" },
                  { name: "Coleman Power", src: "./coleman-logo.webp" },
                  { name: "Dahua Power", src: "./dahua-logo.webp" },
                  { name: "Deye", src: "./deye-logo.webp" },
                  { name: "Felicity Solar", src: "./felicity-logo.webp" },
                  { name: "growatt", src: "./growatt-logo.webp" },
                  { name: "Hikvision Power", src: "./hikvision-logo.webp" },
                  { name: "Huawei Power", src: "./huawei-logo.webp" },
                  { name: "ja-solar", src: "./ja-solar.webp" },
                  { name: "jinko Power", src: "./jinko-solar.webp" },
                  { name: "Lado Oil", src: "./lado-logo.webp" },
                  { name: "longi Power", src: "./longi-logo.webp" },
                  { name: "luxsun energy", src: "./luxsun-logo.webp" },
                  { name: "Prado Power", src: "./prado-logo.webp" },
                  { name: "Suntree Power", src: "./suntree-logo.webp" },
                  { name: "Trina Power", src: "./trina-logo.webp" },
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

      {/* ABOUT EMBRACE SECTION - simple heading + paragraph layout */}
      {/* <section className="pt-15 md:pt-15 pb-16 md:pb-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            Left - Heading with background image
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden min-h-[260px] md:min-h-[320px] flex items-center p-8 md:p-10"
            >
              Background image
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('./solar-4.jpg')" }}
              />
              Overlay so the heading stays readable
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/60" />

              <h2 className="relative z-10 font-montserrat font-bold text-white text-3xl sm:text-4xl md:text-[2.75rem] leading-tight drop-shadow-lg">
                Powering Nigeria's<br />Future, Today
              </h2>
            </motion.div>

            Right - Description
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
            >
              <p>
                Embrace Technologies Limited is a Nigerian engineering company delivering integrated solutions in solar energy, energy storage, digital security, and smart infrastructure for homes, businesses, and public-sector clients.
              </p>
              <p>
                From system design and installation to training and after-sales support, we combine certified engineering expertise with globally recognized equipment to deliver power and security systems built for Nigerian conditions — reliable, scalable, and backed by long-term support.
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* WHAT DOES EMBRACE ACTUALLY DO? SECTION */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Large Image/Video Container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] lg:h-[550px]"
            >
              {/* Video Background */}
              <div className="absolute inset-0 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
                  style={{ zIndex: 0 }}
                >
                  <source
                    src="https://res.cloudinary.com/ubznmcom/video/upload/v1786443325/Embrace-Video.webm"
                    type="video/webm"
                  />
                </video>

                {/* Even dark overlay for the whole card, slightly heavier toward the text area */}
                <div className="absolute inset-0 bg-primary/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              {/* Content - visible on top of video */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10">
                {/* <div className="rounded-xl bg-black/30 p-5 backdrop-blur-sm md:p-6"> */}
                <h2 className="text-center font-montserrat font-bold text-white text-2xl">About Us</h2>
                <p className="font-source-sans-pro text-base font-medium leading-relaxed text-white drop-shadow-lg md:text-lg">
                  Embrace Technologies Limited is a Nigerian engineering company delivering
                  integrated solutions in solar energy,
                  From system design and installation to training and after-sales support, we
                  combine certified engineering expertise with globally recognized equipment to
                  deliver power and security systems built for Nigerian conditions — reliable,
                  scalable, and backed by long-term support.
                </p>
                {/* </div> */}
              </div>
            </motion.div>


            {/* Right Side - Service List (icon + title + description, always visible) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative space-y-3"
            >
              {serviceCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group flex items-start gap-4 rounded-xl bg-white p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {/* Icon badge — now shares the Learn More hover gradient (white → secondary) */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center shadow-sm bg-gradient-to-r from-white to-secondary"
                    >
                      <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
                    </div>

                    {/* Text content */}
                    <div className="flex-1 pt-0.5">
                      <h4 className="font-montserrat font-bold text-primary text-sm md:text-base uppercase tracking-wide mb-1.5">
                        {card.title}
                      </h4>
                      <p
                        className="text-slate-600 text-sm md:text-[15px] leading-relaxed"
                        style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="pt-12 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Service Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                title: "Residential Solar Service",
                image: "./residential-solar-service.webp",
                features: [
                  "Power your home with clean energy",
                  "Reduce utility bills",
                  "Increase your property's value",
                ],
              },
              {
                title: "Commercial Solar Service",
                image: "./commercial-solar-service.webp",
                features: [
                  "Maximize your ROI",
                  "Access tax incentives",
                  "Boost your corporate sustainability",
                ],
              },
              {
                title: "Solar Maintenance Service",
                image: "./solar-maintenance-service.webp",
                features: [
                  "Keep your system running at peak efficiency",
                  "Get comprehensive maintenance plans",
                  "Schedule regular inspections and cleaning",
                ],
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="relative bg-primary rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,32,96,0.15)] hover:shadow-[0_0_40px_rgba(255,199,89,0.25)] transition-all duration-300 group"
              >
                {/* Background Image - Spreads across most of card */}
                <div className="relative h-[400px] md:h-[450px] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-primary" />

                  {/* Floating Title - Centered on image */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center px-4">
                    <h3 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-2 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Features List - At bottom */}
                <div className="p-6 md:p-8">
                  <ul className="space-y-3 mb-6">
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
                    className="inline-flex items-center justify-center w-full bg-white/10 hover:bg-gradient-to-r hover:from-white hover:to-secondary hover:text-primary transition-all duration-300 text-white font-montserrat font-semibold py-3 px-6 rounded-sm group-hover:shadow-lg"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS — ENHANCED */}
      <section className="py-8 md:py-10 bg-slate-50 overflow-hidden relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Section Header - Removed "Our Process" badge */}
          <motion.div className="text-center max-w-3xl mx-auto mb-20" {...fadeIn}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl tracking-wider font-black uppercase bg-gradient-to-r from-[#003399] via-[#0057D9] to-[#00A3FF] bg-clip-text text-transparent font-montserrat">
              How we work
            </h3>

            <p className="text-slate-600 font-montserrat text-lg" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
              A simple, transparent process from your first consultation to
              flipping the switch.
            </p>
          </motion.div>

          {/* Steps with animated progress line */}
          <div className="relative max-w-6xl mx-auto">
            {/* Animated connecting line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-alternativeR rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              />
            </div>

            {/* Steps grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative">
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
            <h3 className="text-2xl md:text-3xl mb-4 tracking-wider font-black uppercase bg-gradient-to-r from-[#003399] via-[#0057D9] to-[#00A3FF] bg-clip-text text-transparent font-montserrat">
              Leading Solar Installation Company in Nigeria
            </h3>

            <div className="space-y-2 text-slate-600 font-montserrat text-lg leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
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

          {/* Testimonial Slider with Paired Image + Card */}
          <div
            className="relative overflow-hidden rounded-3xl pb-2"
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${testimonialIndex * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  className="w-full flex-shrink-0"
                  style={{ minWidth: '100%' }}
                >
                  {/* Split Layout: Image + Testimonial for each slide */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0  overflow-hidden shadow-2xl">
                    {/* Left: Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative h-[300px] lg:h-[450px]"
                    >
                      <img
                        src="./residential-solar-service.webp"
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
                      <div className="relative z-10 flex flex-col justify-between h-full w-full max-w-full">
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
                              textAlign: 'center',
                              fontFamily: "'Source Sans Pro', sans-serif"
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

                        {/* Animated underline - visible on hover of entire card */}
                        <div className="mt-3 sm:mt-4 md:mt-6 flex justify-center">
                          <div className="h-0.5 bg-secondary w-0 group-hover/card:w-56 transition-all duration-500" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === testimonialIndex ? 'bg-primary w-6' : 'bg-slate-300'
                    }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
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
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-anton font-extrabold uppercase tracking-tight text-white drop-shadow-lg">
              READY TO EMBRACE CLEAN ENERGY?
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-primary font-montserrat font-semibold px-6 sm:px-10 py-4 sm:py-5 rounded-sm hover:bg-gradient-to-r hover:from-white hover:to-secondary hover:text-primary transition-all duration-300 w-fit text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl hover:-translate-y-1"
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