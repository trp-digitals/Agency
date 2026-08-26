"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import MaxWrapper from "./ui/MaxWrapper";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Client 1",
    role: "Maharashtra",
    content: "TRP Digitals delivered a product that exceeded our expectations. Their attention to detail and commitment to quality is unmatched in the industry.",
    rating: 4,
  },
  {
    name: "Client 2",
    role: "UK",
    content: "Working with them was a seamless experience. The smooth animations and premium feel they brought to our platform really set us apart from competitors.",
    rating: 5,
  },
  {
    name: "Client 3",
    role: "Australia",
    content: "The best investment we've made for our digital presence. TRP Digitals doesn't just build websites; they craft digital experiences that convert.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextStep, 5000);
    return () => clearInterval(timer);
  }, [nextStep]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-background">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 blur-[120px] rounded-full -z-10" />

      <MaxWrapper>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono font-medium tracking-widest uppercase text-xs mb-4"
          >
            Client Love
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            What They <span className="text-white/40">Say About Us</span>
          </motion.h2>
        </div>

        <div className="relative h-100 md:h-87.5 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full max-w-4xl px-4"
            >
              <div className="glass p-10 md:p-16 rounded-[3rem] border-white/5 relative overflow-hidden group">
                <Quote className="absolute top-8 right-8 w-24 h-24 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[index].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl font-normal text-white/90 leading-relaxed mb-10 italic max-w-3xl">
                    "{testimonials[index].content}"
                  </p>
                  
                  <div>
                    <h4 className="text-xl md:text-2xl font-semibold text-white mb-1">{testimonials[index].name}</h4>
                    <p className="text-primary font-mono text-xs font-medium tracking-widest uppercase">{testimonials[index].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button 
              onClick={prevStep}
              className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    index === i ? "w-8 bg-primary" : "w-1.5 bg-white/10"
                  )}
                />
              ))}
            </div>
            <button 
              onClick={nextStep}
              className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </MaxWrapper>
    </section>
  );
}
