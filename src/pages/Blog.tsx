import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Search, X, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

// Letter animation variants
const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.3 + i * 0.12,
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

// Blog List Page Component
export function Blog() {
  const title = "BLOG";
  const navigate = useNavigate();

  // Search and Sort State
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // Calculate total pages
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Pagination numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="w-full overflow-hidden">
      {/* PAGE HERO */}
      <section className="relative min-h-[280px] sm:min-h-[350px] md:min-h-[600px] flex items-end pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('./blog.webp')",
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

        {/* Content */}
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
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </motion.div>

            {/* BLOG Title with letter animation - Anton ExtraBold */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-anton font-extrabold text-white mb-1 tracking-wide sm:tracking-[0.15em] relative inline-block">
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
                    {letter}
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
                Blog
              </span>
            </motion.nav>
          </div>
        </div>
      </section>

      {/* Search and Sort Section - Below Hero */}
      <section className="relative z-20 bg-slate-50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Expandable Search Box */}
            <div className="relative w-full md:w-auto flex items-center">
              <div
                className={`flex items-center bg-slate-100 rounded-full overflow-hidden transition-all duration-300 ease-in-out border border-transparent focus-within:border-secondary/30 ${isSearchExpanded ? "w-full md:w-80" : "w-12"
                  }`}
              >
                <button
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                  aria-label="Toggle search"
                >
                  {isSearchExpanded ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>

                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`bg-transparent outline-none text-slate-700 placeholder-slate-400 font-poppins text-sm transition-all duration-300 ${isSearchExpanded
                    ? "w-full h-12 px-4 opacity-100"
                    : "w-0 h-0 px-0 opacity-0"
                    }`}
                />
              </div>
            </div>

            {/* Sort By Select */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-slate-600 font-montserrat font-medium text-sm whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 md:flex-none bg-slate-100 border-none rounded-full px-4 py-3 text-slate-700 font-poppins text-sm outline-none focus:ring-2 focus:ring-secondary cursor-pointer transition-all duration-200 hover:bg-slate-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - COMMENTED OUT */}
      {/* <section className="py-12 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {currentPosts.map((post) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                {...fadeIn}
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-montserrat font-bold mb-3 text-slate-800 leading-tight">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-500 text-sm font-poppins mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>

                  <p className="text-slate-600 font-poppins font-normal leading-relaxed mb-6 flex-grow">
                    {post.description}
                  </p>

                  <button
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="inline-flex items-center gap-2 text-secondary font-montserrat font-semibold hover:gap-3 transition-all duration-300 w-fit"
                  >
                    Read More
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-4 mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => {
                    setCurrentPage(number);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-semibold text-lg transition-all duration-300 ${currentPage === number
                    ? "bg-primary text-white"
                    : "text-secondary hover:bg-secondary/10"
                    }`}
                >
                  {number}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section> */}
    </main>
  );
}

// Individual Blog Post Page Component
export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = parseInt(id || "1");

  const currentPost = blogPosts.find((post) => post.id === postId);
  const currentIndex = blogPosts.findIndex((post) => post.id === postId);

  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Post Not Found</h2>
          <button
            onClick={() => navigate("/blog")}
            className="text-secondary font-semibold hover:underline"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full bg-white min-h-screen">
      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-anton font-extrabold text-slate-700 mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {currentPost.title}
        </motion.h1>

        {/* Date - Simple text styling */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-slate-400 text-sm italic font-poppins">
            {currentPost.date}
          </span>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={currentPost.image}
            alt={currentPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        {/* Full Article Content */}
        <motion.div
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: currentPost.content }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            lineHeight: "1.8",
          }}
        />
      </article>

      {/* Navigation Buttons */}
      {(previousPost || nextPost) && (
        <motion.div
          className="max-w-4xl mx-auto px-4 md:px-6 pb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Previous Article Button */}
            {previousPost ? (
              <button
                onClick={() => navigate(`/blog/${previousPost.id}`)}
                className="w-full sm:w-auto inline-flex items-center gap-3 px-6 py-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-montserrat font-semibold text-slate-800">
                  Previous Article
                </span>
              </button>
            ) : (
              <div className="w-full sm:w-auto" />
            )}

            {/* Next Article Button */}
            {nextPost ? (
              <button
                onClick={() => navigate(`/blog/${nextPost.id}`)}
                className="w-full sm:w-auto inline-flex items-center gap-3 px-6 py-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-300 group"
              >
                <span className="text-sm font-montserrat font-semibold text-slate-800">
                  Next Article
                </span>
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="w-full sm:w-auto" />
            )}
          </div>
        </motion.div>
      )}
    </main>
  );
}