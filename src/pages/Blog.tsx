import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Search, X, Calendar, BookOpen } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../data/BlogPosts";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.3 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: "100%", transition: { delay: 0.8, duration: 0.8, ease: "easeOut" } },
};

const iconVariants = {
  hidden: { opacity: 0, rotate: -180, scale: 0 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const breadcrumbVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.8, ease: "easeOut" } },
};

const particleVariants = {
  hidden: { opacity: 0, y: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: [0, 0.8, 0],
    y: [0, -40, -80],
    scale: [0, 1, 0],
    transition: { delay: 1 + i * 0.3, duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 },
  }),
};

const glowVariants = {
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.15, 1],
    transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
  },
};

export function Blog() {
  const title = "BLOG";
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const filteredPosts = blogPosts.filter((post) => {
    const q = searchQuery.toLowerCase();
    return post.title.toLowerCase().includes(q) || post.description.toLowerCase().includes(q) || post.date.toLowerCase().includes(q);
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
    return 0;
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setCurrentPage(1); };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setCurrentPage(1); };
  const handleSearchToggle = () => { if (isSearchExpanded) { setSearchQuery(""); setCurrentPage(1); } setIsSearchExpanded(!isSearchExpanded); };
  const siteUrl = "https://www.embracetechng.com";

  return (
    <main className="w-full overflow-hidden">
      <Helmet>
        <title>Blog | Embrace Technologies – Solar, Security & Tech Insights</title>
        <meta name="description" content="Read the latest articles from Embrace Technologies on solar energy, CCTV security, power backup solutions, and smart tech tips for homes and businesses in Nigeria." />
        <link rel="canonical" href={`${siteUrl}/blog`} />
      </Helmet>

      {/* PAGE HERO */}
      <section className="relative min-h-[280px] sm:min-h-[350px] md:min-h-[600px] flex items-end pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/blog-hero.webp')", backgroundPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        {/* Glowing background orb */}
        <motion.div
          className="absolute bottom-20 right-16 md:right-24 w-64 md:w-96 h-32 md:h-48 rounded-full opacity-60"
          style={{ background: "radial-gradient(ellipse, rgba(255, 199, 89, 0.2), transparent 70%)" }}
          variants={glowVariants}
          animate="animate"
        />

        {/* Floating particles */}
        <div className="absolute bottom-24 right-16 md:right-24 pointer-events-none z-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ left: `${i * 28}px`, backgroundColor: "#FFC759" }}
              variants={particleVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-end text-right">
          <div className="flex flex-col items-end">
            {/* Icon badge */}
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
              <BookOpen className="w-6 h-6 text-white" />
            </motion.div>

            {/* Title with per-letter animation */}
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
              {/* Animated gradient underline */}
              <motion.div
                className="absolute -bottom-2 right-0 h-1 rounded-full"
                style={{ background: "linear-gradient(90deg, #FFC759, #EA6936)" }}
                variants={underlineVariants}
                initial="hidden"
                animate="visible"
              />
            </h1>

            {/* Breadcrumb */}
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
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              >
                &gt;
              </motion.span>
              <span className="text-[#FFC759] font-semibold">Blog</span>
            </motion.nav>
          </div>
        </div>
      </section>

      {/* Search and Sort */}
      <section className="bg-slate-50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className={`flex items-center bg-slate-100 rounded-full overflow-hidden ${isSearchExpanded ? "w-full md:w-80" : "w-12"}`}>
              <button onClick={handleSearchToggle} className="w-12 h-12 flex items-center justify-center text-slate-500">
                {isSearchExpanded ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <input type="text" placeholder="Search articles..." value={searchQuery} onChange={handleSearch} className={`bg-transparent outline-none text-slate-700 text-sm ${isSearchExpanded ? "w-full h-12 px-4" : "w-0 px-0"}`} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-600 font-medium text-sm">Sort by:</span>
              <select value={sortBy} onChange={handleSort} className="bg-slate-100 rounded-full px-4 py-3 text-slate-700 text-sm">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          {sortedPosts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Search className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-500 mb-2">No articles found</h3>
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2">
            {currentPosts.map((post) => (
              <motion.article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg" {...fadeIn}>
                <div className="relative h-64 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex-col">
                  <h3 className="text-2xl font-montserrat font-bold mb-3 text-slate-800">{post.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm italic mb-4"><Calendar className="w-4 h-4" /><span>{post.date}</span></div>
                  <p className="text-slate-600 mb-6">{post.description}</p>
                  <button onClick={() => navigate(`/blog/${post.slug}`)} className="text-[#EA6936] font-semibold hover:gap-3">Read More →</button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}