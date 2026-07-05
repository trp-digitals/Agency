"use client";

import MaxWrapper from "@/components/ui/MaxWrapper";
import { motion } from "framer-motion";
import { Shield, Zap, Sparkles, ArrowRight, Target, Lightbulb, Code } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const PhilosophyItem = ({ icon: Icon, title, description }: any) => (
  <motion.div 
    variants={fadeIn}
    className="group p-8 rounded-3xl glass border-white/5 hover:border-primary/20 transition-all duration-500"
  >
    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-foreground/50 leading-relaxed">{description}</p>
  </motion.div>
);

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      <MaxWrapper className="relative z-10">
        {/* Hero Section */}
        <section className="mb-32 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block px-4 py-2 rounded-full glass border-white/10 text-primary text-sm font-medium mb-8"
            >
              Our Identity
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[1.05]">
              Crafting Digital <br />
              <span className="text-gradient bg-clip-text">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/50 font-medium leading-relaxed">
              We bridge the gap between human intuition and cutting-edge technology 
              to create digital experiences that resonate and endure.
            </p>
          </motion.div>
        </section>

        {/* Our Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[40px] overflow-hidden glass border-white/10 p-2">
              <div className="w-full h-full rounded-[30px] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative group">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000" />
                 <Sparkles className="w-20 h-20 text-white/20 animate-pulse" />
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Our Story</h2>
            <div className="space-y-6 text-lg text-foreground/50 leading-relaxed font-medium">
              <p>
                Founded on the belief that code is an art form, TRP Digitals began as a 
                collective of visionaries, designers, and engineers dedicated to 
                redefining the digital landscape.
              </p>
              <p>
                We don&apos;t just build websites; we craft digital ecosystems. Our journey is 
                driven by a deep-seated passion for innovation and a relentless pursuit 
                of precision. Every pixel we place and every line of code we write is 
                a testament to our commitment to premium quality.
              </p>
              <p>
                Today, we stand as a beacon for elite brands seeking more than just 
                functionality—they seek a partner who understands the soul of their 
                digital presence.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Philosophy / Approach */}
        <section className="mb-40">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Philosophy</h2>
            <p className="text-lg text-foreground/50">
              A holistic approach to digital creation, where strategy meets soul.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <PhilosophyItem 
              icon={Target}
              title="Strategy First"
              description="We deep-dive into your brand identity and market positioning before a single design is drafted."
            />
            <PhilosophyItem 
              icon={Lightbulb}
              title="Creative Soul"
              description="Our designs are not just aesthetically pleasing—they are intentional, emotive, and user-centric."
            />
            <PhilosophyItem 
              icon={Code}
              title="Technical Precision"
              description="Performance-driven engineering ensures your digital product is fast, scalable, and secure."
            />
          </motion.div>
        </section>

        {/* What Sets Us Apart */}
        <section className="mb-40 py-24 rounded-[60px] glass border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />
          
          <MaxWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight">What Sets <br /> <span className="text-primary italic font-serif">Us Apart</span></h2>
                <div className="space-y-10">
                  <div className="flex gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl glass border-primary/20 flex items-center justify-center text-primary">
                      <Shield size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Bespoke Solutions</h4>
                      <p className="text-foreground/50">No templates. No shortcuts. Everything we build is uniquely tailored to your specific goals and vision.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl glass border-primary/20 flex items-center justify-center text-primary">
                      <Zap size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Performance-Driven</h4>
                      <p className="text-foreground/50">Luxury design meets technical excellence. We optimize for speed and conversion from day one.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 rounded-3xl p-12 border border-white/5 backdrop-blur-sm">
                <blockquote className="text-2xl font-medium text-white italic leading-relaxed">
                  &quot;TRP Digitals is not just an agency; they are our secret weapon for digital innovation. Their attention to detail is unparalleled.&quot;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20" />
                  <div>
                    <p className="font-bold text-white">Client</p>
                    <p className="text-sm text-foreground/40">USA</p>
                  </div>
                </div>
              </div>
            </div>
          </MaxWrapper>
        </section>

        {/* Team / Studio Feel */}
        <section className="mb-40 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">The Studio</h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/50 mb-16 leading-relaxed">
            Our team is a lean, mean, creative machine. We focus on high-impact results 
            through deep expertise and a unified vision of digital perfection.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Strategy', 'Design', 'Development', 'Launch'].map((label, i) => (
              <motion.div 
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square glass border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary font-bold text-2xl">
                  {i + 1}
                </div>
                <span className="font-bold text-white/60 tracking-widest text-xs uppercase">{label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-20 rounded-[80px] bg-gradient-to-br from-primary to-secondary relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter">
                Let&apos;s Build Something <br /> Exceptional
              </h2>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl"
              >
                Start Your Project <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </section>
      </MaxWrapper>
    </main>
  );
}
