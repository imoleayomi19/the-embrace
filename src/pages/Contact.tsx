import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export function Contact() {
  return (
    <main className="w-full overflow-hidden">
      {/* PAGE HERO */}
      <section className="relative  min-h-[45vh] md:min-h-[50vh] flex items-end pb-12 overflow-hidden">
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

        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-end text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 font-poppins">
              Contact Us
            </h1>
            <div className="flex items-center gap-2 text-sm md:text-base text-white/80 font-montserrat justify-end">
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-secondary font-medium">Contact Us</span>
            </div>
          </motion.div>
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
                  Let’s start your solar or security project with the right partner.
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
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 font-semibold">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+234 000 000 0000"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none"
                />
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
