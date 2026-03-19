"use client";

import MaxWrapper from "@/components/ui/MaxWrapper";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { articles } from "@/lib/insights";

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;
  
  const article = articles.find(a => a.id === id);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <MaxWrapper>
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            href="/insights" 
            className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <ArrowLeft size={16} /> Back to Insights
          </Link>
        </motion.div>

        {/* Hero Section */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                  {article.category}
                </span>
                <div className="flex items-center gap-4 text-xs font-medium text-foreground/30 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readTime}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-8 leading-[1.1]">
                {article.title}
              </h1>
              <div className="flex items-center justify-between py-6 border-y border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[1px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-black text-white uppercase">
                      TRP
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-tight">TRP Editorial Team</p>
                    <p className="text-xs text-foreground/40 font-medium">Strategic Visionaries</p>
                  </div>
                </div>
                <button className="p-3 rounded-full glass border-white/5 text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>
          </header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video rounded-[40px] overflow-hidden mb-16 glass border-white/5"
          >
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-8 text-lg md:text-xl leading-relaxed text-foreground/60 font-medium">
              {article.content.map((paragraph, i) => (
                <p key={i} className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <footer className="mt-20 pt-12 border-t border-white/5">
            <h4 className="text-2xl font-bold text-white mb-8">Related Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.filter(a => a.id !== article.id).slice(0, 2).map(related => (
                <Link 
                  key={related.id} 
                  href={`/insights/${related.id}`}
                  className="group p-8 rounded-3xl glass border-white/5 hover:border-primary/20 transition-all flex flex-col justify-between h-full"
                >
                  <div>
                    <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest block mb-2">{related.category}</span>
                    <h5 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{related.title}</h5>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-foreground/30 text-xs font-bold uppercase tracking-widest">
                    Explore <ArrowLeft size={14} className="rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          </footer>
        </article>
      </MaxWrapper>
    </main>
  );
}
