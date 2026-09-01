import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { blogPosts } from "../data/BlogPosts.ts";

export function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (!target) return;
            const href = target.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) { e.preventDefault(); navigate(href); }
        };
        el.addEventListener('click', handleClick);
        return () => el.removeEventListener('click', handleClick);
    }, [navigate]);

    const currentPost = blogPosts.find((post) => post.slug === slug);
    const currentIndex = blogPosts.findIndex((post) => post.slug === slug);
    const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
    const isoDate = currentPost ? new Date(currentPost.date).toISOString() : "";
    const siteUrl = "https://www.embracetechng.com";
    const postUrl = currentPost ? `${siteUrl}/blog/${currentPost.slug}` : "";
    const imageUrl = currentPost ? `${siteUrl}${currentPost.image}` : "";

    if (!currentPost) {
        return (<div className="min-h-screen flex items-center justify-center bg-white"><div className="text-center"><h2 className="text-3xl font-bold text-slate-800 mb-4">Post Not Found</h2><button onClick={() => navigate("/blog")} className="text-[#EA6936] font-semibold hover:underline">Back to Blog</button></div></div>);
    }

    return (
        <>
            <Helmet><title>{currentPost.title} | Embrace Technologies Blog</title><meta name="description" content={currentPost.metaDescription} /><link rel="canonical" href={postUrl} /></Helmet>
            <main className="w-full bg-white min-h-screen">
                <article className="max-w-4xl mx-auto px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-16">
                    <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-anton font-extrabold text-slate-700 mb-6 leading-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>{currentPost.title}</motion.h1>
                    <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><time dateTime={isoDate} className="text-slate-400 text-base italic font-poppins">{currentPost.date}</time></motion.div>
                    <motion.div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-16 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <img src={currentPost.image} alt={currentPost.title} className="w-full h-full object-cover" />
                    </motion.div>
                    {/* THIS RENDERS YOUR FULL HTML CONTENT WITH ALL 6 IMAGES */}
                    <motion.div ref={contentRef} className="prose prose-lg max-w-none" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} dangerouslySetInnerHTML={{ __html: currentPost.content }} style={{ fontFamily: "'poppins', sans-serif", lineHeight: "1.8" }} />
                </article>

                {/* PREVIOUS / NEXT BUTTONS */}
                {(previousPost || nextPost) && (
                    <motion.div className="max-w-4xl mx-auto px-4 md:px-6 pb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            {previousPost ? (<button onClick={() => navigate(`/blog/${previousPost.slug}`)} className="w-full sm:w-auto inline-flex items-center gap-3 px-6 py-4 bg-slate-100 hover:bg-slate-200 rounded-full"><ArrowLeft className="w-5 h-5 text-primary" /><span className="text-sm font-montserrat font-semibold text-slate-800">Previous Article</span></button>) : <div className="w-full sm:w-auto" />}
                            {nextPost ? (<button onClick={() => navigate(`/blog/${nextPost.slug}`)} className="w-full sm:w-auto inline-flex items-center gap-3 px-6 py-4 bg-slate-100 hover:bg-slate-200 rounded-full"><span className="text-sm font-montserrat font-semibold text-slate-800">Next Article</span><ArrowRight className="w-5 h-5 text-primary" /></button>) : <div className="w-full sm:w-auto" />}
                        </div>
                    </motion.div>
                )}
            </main>
        </>
    );
}