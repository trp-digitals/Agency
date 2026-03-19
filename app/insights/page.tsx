"use client";

import MaxWrapper from "@/components/ui/MaxWrapper";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { articles } from "@/lib/insights";

const categories = ["All", "UI/UX", "Development", "Branding", "Growth"];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function InsightsPage() {
  const featuredArticles = articles.slice(0, 2);
  const remainingArticles = articles.slice(2);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-40">
      <MaxWrapper>
        {/* Hero Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8">
              Insights & <br /> <span className="text-gradient">Perspectives</span>
            </h1>
            <p className="text-xl text-foreground/50 leading-relaxed font-medium">
              A curated space for our latest thinking on design, engineering, 
              and the future of digital commerce.
            </p>
          </motion.div>
        </section>

        {/* Categories Navbar */}
        <section className="mb-16 border-y border-white/5 py-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-8 items-center min-w-max">
            {categories.map((cat, i) => (
              <button 
                key={cat}
                className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${i === 0 ? 'text-primary' : 'text-foreground/30 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {featuredArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-pointer"
            >
              <Link href={`/insights/${article.id}`}>
                <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden mb-8 glass border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-4 text-xs font-bold text-foreground/40 mb-4 uppercase tracking-wider">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h2>
                  <p className="text-lg text-foreground/50 leading-relaxed max-w-lg mb-6 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                    Read Article <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* Article Grid */}
        <section className="mb-32">
          <div className="flex items-end justify-between mb-16 border-b border-white/5 pb-8">
            <h3 className="text-4xl font-bold text-white">Latest Thinking</h3>
            <div className="text-foreground/40 text-sm font-medium">Showing {articles.length} results</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {remainingArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border-b border-white/5 pb-12 hover:border-primary/30 transition-colors"
              >
                <Link href={`/insights/${article.id}`} className="block">
                  <div className="flex items-center gap-4 text-[10px] font-black text-primary/60 uppercase tracking-[0.2em] mb-4">
                    {article.category}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-6 text-xs font-medium text-foreground/30 uppercase tracking-widest">
                    <span className="flex items-center gap-2 tracking-tighter"><Clock size={14} /> {article.readTime}</span>
                    <span className="tracking-tighter">{article.date}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative rounded-[60px] overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 blur-[100px] opacity-20" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass border-white/5 p-20 text-center relative z-10"
          >
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-10 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Explore Our Thinking
            </h2>
            <p className="text-lg text-foreground/50 max-w-xl mx-auto mb-12">
              Subscribe to our newsletter for deep-dives into the future of digital luxury and performance engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                Subscribe
              </button>
            </div>
          </motion.div>
        </section>
      </MaxWrapper>
    </main>
  );
}
