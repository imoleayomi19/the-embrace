import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Search, X, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../data/blogPosts";

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
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
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
  animate: { opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1], transition: { duration: 3, ease: "easeInOut", repeat: Infinity } },
};

// ✅ THIS IS THE BLOG LIST COMPONENT
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
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setCurrentPage(1); };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setCurrentPage(1); };
  const handleSearchToggle = () => {
    if (isSearchExpanded) { setSearchQuery(""); setCurrentPage(1); }
    setIsSearchExpanded(!isSearchExpanded);
  };

  const siteUrl = "https://www.embracetechng.com";

  return (
    <main className="w-full overflow-hidden">
      {/* ✅ SEO: Blog Listing Page Meta Tags */}
      <Helmet>
        <title>Blog | Embrace Technologies – Solar, Security & Tech Insights</title>
        <meta
          name="description"
          content="Read the latest articles from Embrace Technologies on solar energy, CCTV security, power backup solutions, and smart tech tips for homes and businesses in Nigeria."
        />
        <link rel="canonical" href={`${siteUrl}/blog`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | Embrace Technologies – Solar, Security & Tech Insights" />
        <meta
          property="og:description"
          content="Read the latest articles from Embrace Technologies on solar energy, CCTV security, power backup solutions, and smart tech tips for homes and businesses in Nigeria."
        />
        <meta property="og:url" content={`${siteUrl}/blog`} />
        <meta property="og:image" content={`${siteUrl}/blog-hero.webp`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Embrace Technologies – Solar, Security & Tech Insights" />
        <meta
          name="twitter:description"
          content="Read the latest articles from Embrace Technologies on solar energy, CCTV security, power backup solutions, and smart tech tips for homes and businesses in Nigeria."
        />
        <meta name="twitter:image" content={`${siteUrl}/blog-hero.webp`} />
      </Helmet>

      {/* PAGE HERO */}
      <section className="relative min-h-[280px] sm:min-h-[350px] md:min-h-[600px] flex items-end pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/blog-hero.webp')", backgroundPosition: "center 40%" }} />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        <motion.div className="absolute bottom-20 right-16 md:right-24 w-64 md:w-96 h-32 md:h-48 rounded-full opacity-60" style={{ background: "radial-gradient(ellipse, rgba(255, 199, 89, 0.2), transparent 70%)" }} variants={glowVariants} animate="animate" />

        <div className="absolute bottom-24 right-16 md:right-24 pointer-events-none z-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{ left: `${i * 28}px`, backgroundColor: "#FFC759" }} variants={particleVariants} initial="hidden" animate="visible" custom={i} />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-end text-right">
          <div className="flex flex-col items-end">
            <motion.div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-lg" style={{ background: "linear-gradient(135deg, #FFC759, #EA6936)", boxShadow: "0 4px 20px rgba(234, 105, 54, 0.4)" }} variants={iconVariants} initial="hidden" animate="visible">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-anton font-extrabold text-white mb-1 tracking-wide sm:tracking-[0.15em] relative inline-block">
              <span className="relative">
                {title.split("").map((letter, i) => (
                  <motion.span key={i} className="inline-block" style={{ textShadow: "0 0 40px rgba(255, 199, 89, 0.3)" }} variants={letterVariants} initial="hidden" animate="visible" custom={i}>{letter}</motion.span>
                ))}
              </span>
              <motion.div className="absolute -bottom-2 right-0 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #FFC759, #EA6936)" }} variants={underlineVariants} initial="hidden" animate="visible" />
            </h1>

            <motion.nav className="flex items-center gap-3 text-sm md:text-base font-montserrat font-medium mt-5" variants={breadcrumbVariants} initial="hidden" animate="visible">
              <Link to="/" className="relative text-white/70 hover:text-white transition-colors duration-300 group">Home<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#FFC759] transition-all duration-300 group-hover:w-full" /></Link>
              <motion.span className="text-white/40 text-xs" animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}>&gt;</motion.span>
              <span className="relative text-[#FFC759] font-semibold">
                <span className="absolute -inset-1.5 -inset-x-2 border border-[#FFC759]/30 rounded-md" style={{ animation: "borderPulse 2s ease-in-out infinite" }} />
                <style>{`@keyframes borderPulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }`}</style>
                Blog
              </span>
            </motion.nav>
          </div>
        </div>
      </section>

      {/* Search and Sort Section */}
      <section className="relative z-20 bg-slate-50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-auto flex items-center">
              <div className={`flex items-center bg-slate-100 rounded-full overflow-hidden transition-all duration-300 ease-in-out border border-transparent focus-within:border-secondary/30 ${isSearchExpanded ? "w-full md:w-80" : "w-12"}`}>
                <button onClick={handleSearchToggle} className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-slate-500 hover:text-primary transition-colors" aria-label="Toggle search">
                  {isSearchExpanded ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>
                <input type="text" placeholder="Search articles..." value={searchQuery} onChange={handleSearch} className={`bg-transparent outline-none text-slate-700 placeholder-slate-400 font-poppins text-sm transition-all duration-300 ${isSearchExpanded ? "w-full h-12 px-4 opacity-100" : "w-0 h-0 px-0 opacity-0"}`} />
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-slate-600 font-montserrat font-medium text-sm whitespace-nowrap">Sort by:</span>
              <select value={sortBy} onChange={handleSort} className="flex-1 md:flex-none bg-slate-100 border-none rounded-full px-4 py-3 text-slate-700 font-poppins text-sm outline-none focus:ring-2 focus:ring-secondary cursor-pointer transition-all duration-200 hover:bg-slate-200">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          {sortedPosts.length === 0 && (
            <motion.div className="flex flex-col items-center justify-center py-24 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Search className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-montserrat font-semibold text-slate-500 mb-2">No articles found</h3>
              <p className="text-slate-400 font-poppins text-sm">No results for &ldquo;<span className="text-secondary">{searchQuery}</span>&rdquo;. Try a different keyword.</p>
            </motion.div>
          )}

          <div className={`grid gap-8 ${currentPosts.length === 1 ? 'grid-cols-1 place-items-center' : 'md:grid-cols-2'}`}>
            {currentPosts.map((post) => (
              <motion.article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full w-full max-w-2xl" {...fadeIn}>
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-montserrat font-bold mb-3 text-slate-800 leading-tight">{post.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm italic font-poppins mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <p className="text-slate-600 font-poppins font-normal leading-relaxed mb-6 flex-grow">{post.description}</p>
                  <button onClick={() => navigate(`/blog/${post.slug}`)} className="inline-flex items-center gap-2 text-secondary font-montserrat font-semibold hover:gap-3 transition-all duration-300 w-fit">
                    Read More
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {totalPages > 1 && (
            <motion.div className="flex justify-center items-center gap-4 mt-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {pageNumbers.map((number) => (
                <button key={number} onClick={() => { setCurrentPage(number); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-semibold text-lg transition-all duration-300 ${currentPage === number ? "bg-primary text-white" : "text-secondary hover:bg-secondary/10"}`}>
                  {number}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

// ─── BlogPost (Individual Post Page) ─────────────────────────────────────────

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  // Intercept internal links inside HTML content so React Router handles them
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        navigate(href);
      }
    };
    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [navigate]);

  const currentPost = blogPosts.find((post) => post.slug === slug);
  const currentIndex = blogPosts.findIndex((post) => post.slug === slug);

  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // ✅ SEO: Convert readable date to ISO format
  const isoDate = currentPost ? new Date(currentPost.date).toISOString() : "";

  // ✅ SEO: Absolute URLs
  const siteUrl = "https://www.embracetechng.com";
  const postUrl = currentPost ? `${siteUrl}/blog/${currentPost.slug}` : "";
  const imageUrl = currentPost ? `${siteUrl}${currentPost.image}` : "";

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
    <>
      {/* ✅ META TAGS & SOCIAL SHARING */}
      <Helmet>
        <title>{currentPost.title} | Embrace Technologies Blog</title>
        <meta name="description" content={currentPost.metaDescription} />
        <link rel="canonical" href={postUrl} />

        {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={currentPost.title} />
        <meta property="og:description" content={currentPost.metaDescription} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="article:published_time" content={isoDate} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentPost.title} />
        <meta name="twitter:description" content={currentPost.metaDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      {/* ✅ JSON-LD SCHEMA (For Google Rich Snippets) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": currentPost.title,
          "image": [imageUrl],
          "datePublished": isoDate,
          "dateModified": isoDate,
          "author": {
            "@type": "Organization",
            "name": "Embrace Technologies",
            "url": siteUrl,
          },
          "publisher": {
            "@type": "Organization",
            "name": "Embrace Technologies Ltd",
            "logo": {
              "@type": "ImageObject",
              "url": `${siteUrl}/fotter-logo.jpg`,
            },
          },
          "description": currentPost.metaDescription,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": postUrl,
          },
        })}
      </script>

      <main className="w-full bg-white min-h-screen">
        <article className="max-w-4xl mx-auto px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-16">
          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-anton font-extrabold text-slate-700 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {currentPost.title}
          </motion.h1>

          {/* ✅ Semantic <time> tag */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <time dateTime={isoDate} className="text-slate-400 text-base italic font-poppins">
              {currentPost.date}
            </time>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-16 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={currentPost.image}
              alt={`Cover image for the article: ${currentPost.title}`}
              width={800}
              height={450}
              loading="eager"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Full Article Content */}
          <motion.div
            ref={contentRef}
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            dangerouslySetInnerHTML={{ __html: currentPost.content }}
            style={{ fontFamily: "'poppins', sans-serif", lineHeight: "1.8" }}
          />
        </article>

        {/* Navigation Buttons (Previous / Next) */}
        {(previousPost || nextPost) && (
          <motion.div
            className="max-w-4xl mx-auto px-4 md:px-6 pb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {previousPost ? (
                <button
                  onClick={() => navigate(`/blog/${previousPost.slug}`)}
                  className="w-full sm:w-auto inline-flex items-center gap-3 px-6 py-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-300 group"
                >
                  <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-montserrat font-semibold text-slate-800">Previous Article</span>
                </button>
              ) : (
                <div className="w-full sm:w-auto" />
              )}

              {nextPost ? (
                <button
                  onClick={() => navigate(`/blog/${nextPost.slug}`)}
                  className="w-full sm:w-auto inline-flex items-center gap-3 px-6 py-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-300 group"
                >
                  <span className="text-sm font-montserrat font-semibold text-slate-800">Next Article</span>
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="w-full sm:w-auto" />
              )}
            </div>
          </motion.div>
        )}
      </main>
    </>
  );
}