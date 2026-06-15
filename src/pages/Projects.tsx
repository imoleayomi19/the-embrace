import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.7,
  },
};

export function Projects() {
  return (
    <main className="w-full overflow-hidden">
      {/* PAGE HERO */}
      <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-end pb-12 overflow-hidden">
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
              Projects
            </h1>
            <div className="flex items-center gap-2 text-sm md:text-base text-white/80 font-montserrat justify-end">
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-secondary font-medium">Projects</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeIn}
          >
            <p className="uppercase tracking-[0.3em] text-sm text-secondary font-bold mb-4">
              Projects
            </p>
            <h2 className="text-4xl md:text-5xl mb-4">
              10k+ installations delivered
            </h2>
            <p className="text-slate-600 font-montserrat text-lg leading-relaxed">
              Explore our portfolio of residential, commercial, and community solar
              installations. Each project reflects our commitment to quality,
              efficiency, and sustainable energy solutions.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Residential Solar",
                description:
                  "High-efficiency installations for homes seeking lower energy bills and cleaner power.",
              },
              {
                title: "Commercial Systems",
                description:
                  "Large-scale rooftop and canopy systems designed for lasting performance.",
              },
              {
                title: "Training & Support",
                description:
                  "Expert project management and continuous training for lasting results.",
              },
            ].map((item) => (
              <motion.article
                key={item.title}
                {...fadeIn}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
