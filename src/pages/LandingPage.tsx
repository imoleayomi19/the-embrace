import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Phone,
  MapPin,
  User,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "2347061451583";

const SYSTEM_OPTIONS = [
  "1kVA / 1kWh Starter System",
  "2kVA / 2kWh Home Basic",
  "3kVA / 3kWh Home Standard",
  "5kVA / 5kWh Home Premium",
  "10kVA / 10kWh Large Home",
  "Commercial / Business System",
  "Not sure – I need a free consultation",
];

const PRODUCT_SPECS = [
  { label: "Inverter Brands", value: "Deye, Growatt, Felicity" },
  { label: "Battery Options", value: "Lithium (LiFePO4) & Gel" },
  { label: "Solar Panels", value: "JA Solar, Jinko, Longi" },
  { label: "Warranty", value: "1–5 Years (product dependent)" },
  { label: "Installation", value: "Nationwide Coverage" },
  { label: "Support", value: "24/7 After-sales support" },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ✅ MOVED OUTSIDE — This fixes the focus loss issue
const Field = ({
  id,
  label,
  icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-semibold text-white/90 flex items-center gap-2">
      <span className="text-white">{icon}</span>
      {label}
    </label>
    {children}
    {error && (
      <p className="text-xs text-red-400 flex items-center gap-1">
        <span>⚠</span> {error}
      </p>
    )}
  </div>
);

// ── Component ────────────────────────────────────────────────────────────────
export function LandingPage() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    meta.id = 'landing-noindex';
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = 'Get Your Free Solar Quote — Embrace Technologies';
    return () => {
      document.head.removeChild(meta);
      document.title = prevTitle;
    };
  }, []);

  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    powerNeeds: "",
    system: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.phone.trim() || !/^[0-9+\-\s()]{7,15}$/.test(form.phone))
      errs.phone = "Enter a valid phone number.";
    if (!form.location.trim()) errs.location = "Please enter your location.";
    if (!form.powerNeeds.trim()) errs.powerNeeds = "Tell us what you want to power.";
    if (!form.system) errs.system = "Please select a preferred system.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const message =
      `🌞 *New Solar Enquiry – EmbraceAds*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📞 *Phone:* ${form.phone}\n` +
      `📍 *Location:* ${form.location}\n` +
      `⚡ *What to Power:* ${form.powerNeeds}\n` +
      ` *Preferred System:* ${form.system}\n\n` +
      `_Sent via EmbraceAds Landing Page_`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }, 900);
  };

  return (
    <>
      <div className="font-montserrat bg-white min-h-screen overflow-x-hidden">

        {/* SECTION 1 · HERO */}
        <section className="relative bg-primary overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-alternative/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-14 md:py-20 flex flex-col items-center text-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full max-w-3xl mt-4 rounded-xl overflow-hidden border-4 border-white/10 shadow-2xl aspect-video bg-primary/60 flex flex-col items-center justify-center gap-4 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary" />
              <div className="relative z-10 flex flex-col items-center gap-3 text-white/60">
                <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 ml-1 text-white/80">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold">Ad video coming soon</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 · PRODUCT / SERVICE INFO */}
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col items-center text-center gap-4 mb-14"
            >
              <motion.p variants={fadeUp} className="text-slate-600 max-w-xl text-sm sm:text-base !normal-case !tracking-normal !font-montserrat">
                From small home setups to large commercial installations we design, supply, and install the right system for you.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 shadow-2xl aspect-[4/3] flex items-center justify-center"
              >
                <img
                  src="/product.webp"
                  alt="Embrace Technologies Solar System"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40"
                />
                <div className="absolute top-5 right-5 bg-secondary text-white font-anton uppercase text-sm px-4 py-2 rounded-sm shadow-lg tracking-wide">
                  From ₦000,000
                </div>
              </motion.div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-5"
              >
                <motion.div variants={fadeUp}>
                  <h3 className="font-anton text-primary uppercase tracking-wide text-xl sm:text-2xl mb-1">
                    Complete Solar Package
                  </h3>
                  <p className="text-slate-500 text-sm !normal-case !tracking-normal !font-montserrat">
                    Everything included — panels, inverter, battery, installation & warranty.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCT_SPECS.map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-1"
                    >
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span className="text-sm font-semibold text-slate-700">{spec.value}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.button
                  variants={fadeUp}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToForm}
                  className="mt-2 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-7 py-3.5 rounded-sm shadow-lg transition-all text-sm w-fit"
                >
                  Get a Custom Quote <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4 · LEAD FORM */}
        <section
          ref={formRef}
          className="bg-gradient-to-br from-primary via-primary to-[#001540] py-16 md:py-24 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-alternative/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto px-4">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col items-center text-center gap-3 mb-10"
            >
              <motion.h2
                variants={fadeUp}
                className="font-anton !text-white uppercase tracking-wide text-2xl sm:text-3xl md:text-4xl"
              >
                Get Your Free Solar Quote
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-white/70 max-w-md text-sm sm:text-base !normal-case !tracking-normal !font-montserrat"
              >
                Complete the form and our team will send a detailed plan and pricing to your WhatsApp.
              </motion.p>
            </motion.div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 flex flex-col items-center gap-5 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#25D366]/20 border-2 border-[#25D366]/40 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 fill-[#25D366]"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24z" />
                    </svg>
                  </div>
                  <h3 className="font-anton !text-white uppercase text-2xl tracking-wide">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed !normal-case !tracking-normal !font-montserrat">
                    Your enquiry has been sent to our WhatsApp. Our solar expert will reply to you
                    shortly. Check your WhatsApp!
                  </p>
                  <p className="text-secondary text-xs font-semibold uppercase tracking-widest">
                    Embrace Technologies — Powering Your World
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col gap-5"
                >
                  <Field id="lp-name" label="Full Name" icon={<User className="w-4 h-4" />} error={errors.name}>
                    <input
                      id="lp-name"
                      type="text"
                      placeholder="Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/10 border border-white/25 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:border-transparent transition-all"
                    />
                  </Field>

                  <Field id="lp-phone" label="Phone / WhatsApp Number" icon={<Phone className="w-4 h-4" />} error={errors.phone}>
                    <input
                      id="lp-phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/10 border border-white/25 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:border-transparent transition-all"
                    />
                  </Field>

                  <Field id="lp-location" label="Your Location / Address" icon={<MapPin className="w-4 h-4" />} error={errors.location}>
                    <input
                      id="lp-location"
                      type="text"
                      placeholder="Location"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full bg-white/10 border border-white/25 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:border-transparent transition-all"
                    />
                  </Field>

                  <Field
                    id="lp-power"
                    label="What Do You Want to Power?"
                    icon={<Zap className="w-4 h-4" />}
                    error={errors.powerNeeds}
                  >
                    <textarea
                      id="lp-power"
                      rows={3}
                      placeholder="AC, fridge, TV, lights, water pump..."
                      value={form.powerNeeds}
                      onChange={(e) => setForm({ ...form, powerNeeds: e.target.value })}
                      className="w-full bg-white/10 border border-white/25 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:border-transparent transition-all resize-none"
                    />
                  </Field>

                  <Field
                    id="lp-system"
                    label="Preferred System Size"
                    icon={<ChevronDown className="w-4 h-4" />}
                    error={errors.system}
                  >
                    <div className="relative">
                      <select
                        id="lp-system"
                        value={form.system}
                        onChange={(e) => setForm({ ...form, system: e.target.value })}
                        className="w-full appearance-none bg-white/10 border border-white/25 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:border-transparent transition-all pr-10"
                      >
                        <option value="" disabled className="text-slate-700 bg-white">
                          Select a system
                        </option>
                        {SYSTEM_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="text-slate-700 bg-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                    </div>
                  </Field>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.03, y: -1 } : {}}
                    whileTap={!loading ? { scale: 0.97 } : {}}
                    className="mt-2 w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-all text-base"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24z" />
                        </svg>
                        Send via WhatsApp — Get My Free Quote
                      </>
                    )}
                  </motion.button>

                  <p className="text-white/40 text-xs text-center !normal-case !tracking-normal !font-montserrat">
                    🔒 Your details are sent directly to our team. We don't sell or share your info.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
}