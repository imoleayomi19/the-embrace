import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { blogPosts } from "../data/blogPosts";

export function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = contentRef.current;
        if (!element) return;
        const handleClick = (event: MouseEvent) => {
            const target = (event.target as HTMLElement).closest("a");
            const href = target?.getAttribute("href");
            if (href && href.startsWith("/") && !href.startsWith("//")) {
                event.preventDefault();
                navigate(href);
            }
        };
        element.addEventListener("click", handleClick);
        return () => element.removeEventListener("click", handleClick);
    }, [navigate]);

    const currentPost = blogPosts.find((post) => post.slug === slug);
    const currentIndex = blogPosts.findIndex((post) => post.slug === slug);
    const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
    const isoDate = currentPost ? new Date(currentPost.date).toISOString() : "";
    const siteUrl = "https://www.embracetechng.com";
    const postUrl = currentPost ? `${siteUrl}/blog/${currentPost.slug}` : "";
    const isMythsGuide = currentPost?.slug === "common-solar-myths-nigeria-debunked-2026-guide";

    if (!currentPost) {
        return <div className="flex min-h-screen items-center justify-center bg-white"><div className="text-center"><h2 className="mb-4 text-3xl font-bold text-slate-800">Post Not Found</h2><button onClick={() => navigate("/blog")} className="font-semibold text-[#EA6936] hover:underline">Back to Blog</button></div></div>;
    }

    return (
        <>
            <Helmet>
                <title>{currentPost.title} | Embrace Technologies Blog</title>
                <meta name="description" content={currentPost.metaDescription} />
                <link rel="canonical" href={postUrl} />
                {isMythsGuide && <meta name="keywords" content="solar in Nigeria, solar cost Nigeria, does solar work in rain, solar maintenance Nigeria" />}
            </Helmet>
            {isMythsGuide && <a href="#solar-quote" className="fixed right-4 top-1/2 z-40 -translate-y-1/2 rounded-l-xl bg-[#ffc759] px-3 py-4 text-center font-montserrat text-xs font-bold uppercase tracking-wide text-[#063b75] shadow-lg [writing-mode:vertical-rl] hover:bg-[#f5b82e]">Get Free Solar Quote</a>}
            <main className="min-h-screen w-full bg-white">
                <article className="mx-auto max-w-4xl px-4 pb-12 pt-32 md:px-6 md:pb-16 md:pt-40">
                    <motion.h1 className="mb-6 text-3xl font-anton font-extrabold leading-tight text-slate-700 sm:text-4xl md:text-5xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>{currentPost.title}</motion.h1>
                    <motion.time dateTime={isoDate} className="mb-5 block text-base italic text-slate-400" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>{currentPost.date}</motion.time>
                    <motion.p className="mb-10 max-w-3xl font-poppins text-lg leading-8 text-slate-600" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>{currentPost.description}</motion.p>
                    <motion.div className="relative mb-16 h-64 overflow-hidden rounded-2xl shadow-xl sm:h-80 md:h-96 lg:h-[500px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <img src={currentPost.image} alt={currentPost.title} className="h-full w-full object-cover" />
                    </motion.div>
                    <motion.div ref={contentRef} className="prose prose-lg max-w-none prose-headings:font-anton prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-[#063b75] prose-h2:mt-16 prose-h2:text-3xl prose-h3:text-xl prose-p:leading-8 prose-strong:text-[#063b75]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} dangerouslySetInnerHTML={{ __html: currentPost.content }} style={{ fontFamily: "'poppins', sans-serif", lineHeight: "1.8" }} />
                </article>
                {(previousPost || nextPost) && <motion.div className="mx-auto max-w-4xl px-4 pb-16 md:px-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}><div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    {previousPost ? <button onClick={() => navigate(`/blog/${previousPost.slug}`)} className="inline-flex w-full items-center gap-3 rounded-full bg-slate-100 px-6 py-4 hover:bg-slate-200 sm:w-auto"><ArrowLeft className="h-5 w-5 text-primary" /><span className="text-sm font-semibold text-slate-800">Previous Article</span></button> : <div className="w-full sm:w-auto" />}
                    {nextPost ? <button onClick={() => navigate(`/blog/${nextPost.slug}`)} className="inline-flex w-full items-center gap-3 rounded-full bg-slate-100 px-6 py-4 hover:bg-slate-200 sm:w-auto"><span className="text-sm font-semibold text-slate-800">Next Article</span><ArrowRight className="h-5 w-5 text-primary" /></button> : <div className="w-full sm:w-auto" />}
                </div></motion.div>}
            </main>
        </>
    );
}
