"use client";

import { motion } from "framer-motion";
import MaxWrapper from "@/components/ui/MaxWrapper";
import Link from "next/link";
import CareersForm from "@/components/CareersForm";
import { 
  Sparkles, 
  Briefcase, 
  FolderGit2, 
  TrendingUp, 
  Lightbulb, 
  ShieldCheck, 
  Palette, 
  Zap, 
  ArrowRight 
} from "lucide-react";

const benefits = [
  {
    icon: Briefcase,
    title: "Real Projects",
    desc: "Work on real websites, applications, brands, and digital solutions built for actual clients and real-world use.",
  },
  {
    icon: FolderGit2,
    title: "Build Your Portfolio",
    desc: "Turn your skills into meaningful work you can showcase. Build case studies, project experience, and proof of what you can actually create.",
  },
  {
    icon: TrendingUp,
    title: "Grow With the Team",
    desc: "Collaborate with talented people, learn through execution, take ownership, and develop skills that matter in the real world.",
  },
];

const domains = [
  "Web & Digital Development",
  "UI/UX & Product Design",
  "Mobile App Development",
  "SaaS & Custom Platforms",
  "E-Commerce Solutions",
  "AI & Business Automation",
];

const mindsets = [
  {
    icon: Lightbulb,
    title: "Curious",
    desc: "Always learning, experimenting, and looking for a better way to solve problems.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable",
    desc: "You take ownership of your work and follow through on what you commit to.",
  },
  {
    icon: Palette,
    title: "Creative",
    desc: "You bring ideas, perspective, and original thinking to the work you do.",
  },
  {
    icon: Zap,
    title: "Driven",
    desc: "You don't wait for opportunities. You build, improve, and prove what you're capable of.",
  },
];

export default function CareersClient() {
  // Careers page is disabled
  return null;
}
