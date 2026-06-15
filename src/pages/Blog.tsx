import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export function Blog() {
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
              Blog
            </h1>
            <div className="flex items-center gap-2 text-sm md:text-base text-white/80 font-montserrat justify-end">
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-secondary font-medium">Blog</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-secondary uppercase tracking-[0.3em] text-sm font-semibold">
              Insights & Updates
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Latest Articles</h2>
            <p className="text-slate-600 font-montserrat text-lg leading-relaxed">
              Explore solar energy tips, security solutions, and practical advice for Nigerian homes and businesses.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Why Solar Is the Best Investment for Your Home",
                description:
                  "Discover how solar power reduces costs, increases reliability, and boosts your property's value.",
              },
              {
                title: "Top CCTV Setup Tips for Maximum Security",
                description:
                  "Learn how to choose the right cameras, position them for the best coverage, and protect your property.",
              },
              {
                title: "How to Prepare Your Business for Power Outages",
                description:
                  "Practical guidance on hybrid solar systems, batteries, and backup power solutions.",
              },
              {
                title: "Solar Maintenance: Keep Your System Performing",
                description:
                  "Simple maintenance steps that preserve performance and extend the lifetime of your solar panels.",
              },
            ].map((post, index) => (
              <motion.article
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
                {...fadeIn}
              >
                <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{post.description}</p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-secondary font-semibold"
                >
                  Read More
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
