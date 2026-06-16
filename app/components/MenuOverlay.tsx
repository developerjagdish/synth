"use client";

import React from "react";
import { motion } from "motion/react";
import { MagneticText } from "./MagneticText";

interface MenuOverlayProps {
  isOpen?: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const menuItems = [
  { label: "HOME", target: "home", jp: "ホーム" },
  { label: "SERVICES", target: "features", jp: "サービス" },
  { label: "IMPACT", target: "stats", jp: "インパクト" },
  { label: "PROJECTS", target: "work", jp: "プロジェクト" },
  { label: "TESTIMONIALS", target: "clients", jp: "実績" },
  { label: "CONTACT", target: "contact", jp: "お問い合わせ" },
];

const menuListVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
} as const;

const menuItemVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
} as const;

export function MenuOverlay({ onClose, onNavigate }: MenuOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden"
    >
      {/* Absolute Close Button inside MenuOverlay */}
      <button
        onClick={onClose}
        className="absolute right-8 top-8 md:right-12 md:top-8 text-neutral-500 hover:text-red-500 transition-colors cursor-pointer text-xs font-bold font-mono tracking-widest z-[60] flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
        [CLOSE_SYSTEM]
      </button>

      {/* Cyberpunk Grid Background Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Decorative Glowing Red Accents */}
      <div className="absolute left-[10%] top-[20%] w-[300px] h-[300px] rounded-full bg-red-950/15 blur-[100px] pointer-events-none z-0" />
      <div className="absolute right-[15%] bottom-[15%] w-[400px] h-[400px] rounded-full bg-red-950/15 blur-[120px] pointer-events-none z-0" />

      {/* Large faint background title */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        exit={{ opacity: 0, scale: 1.02, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 z-0 font-black text-[12vw] text-neutral-900/15 tracking-[0.2em] pointer-events-none uppercase select-none"
      >
        SYNTH
      </motion.div>

      {/* Futuristic Vertical Border Lines */}
      <div className="absolute left-8 top-24 bottom-24 w-[1px] bg-neutral-800/40 hidden md:block z-10" />
      <div className="absolute right-8 top-24 bottom-24 w-[1px] bg-neutral-800/40 hidden md:block z-10" />

      {/* Menu Content */}
      <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col md:flex-row justify-between items-center gap-16 md:gap-8">
        
        {/* Navigation List */}
        <motion.div
          variants={menuListVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 md:gap-8 items-center md:items-start w-full md:w-auto"
        >
          {menuItems.map((item, index) => (
            <motion.div key={item.target} variants={menuItemVariants}>
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onNavigate(item.target)}>
                {/* Accent number */}
                <span className="font-mono text-xs text-red-500/50 font-bold self-start mt-2 group-hover:text-red-500 transition-colors">
                  0{index + 1}
                </span>

                <div className="flex flex-col items-start">
                  <MagneticText
                    circleClassName="bg-black"
                    circleSize={180}
                    className="text-left"
                    children={
                      <span className="text-4xl md:text-6xl font-black tracking-wide text-white group-hover:text-red-500/90 transition-colors duration-300">
                        {item.label}
                      </span>
                    }
                    hoverChildren={
                      <span className="text-4xl md:text-6xl font-black tracking-wide text-red-500 transition-colors duration-300">
                        {item.label}
                      </span>
                    }
                  />
                  <span className="text-[10px] tracking-[0.3em] text-neutral-500 font-bold uppercase mt-1 pl-1 select-none">
                    {item.jp}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Side Accent & Social Panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center md:items-end text-center md:text-right max-w-xs md:max-w-none"
        >
          {/* Cyberpunk corner bracket container */}
          <div className="relative border border-red-500/20 bg-neutral-950/40 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center md:items-end gap-4 shadow-[0_0_30px_rgba(239,68,68,0.02)]">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500/60" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500/60" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500/60" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500/60" />

            <span className="text-xs font-bold text-red-500 tracking-[0.2em]">INTELLIGENT SYSTEMS</span>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-[200px]">
              Connecting AI workflows to scale operations without increasing operational complexity.
            </p>
            <span className="h-[1px] w-full bg-neutral-900" />
            
            {/* Social links */}
            <div className="flex gap-4">
              <a href="#" className="text-xs font-bold text-neutral-500 hover:text-white transition-colors tracking-widest font-mono">X</a>
              <span className="text-neutral-800">/</span>
              <a href="#" className="text-xs font-bold text-neutral-500 hover:text-white transition-colors tracking-widest font-mono">GH</a>
              <span className="text-neutral-800">/</span>
              <a href="#" className="text-xs font-bold text-neutral-500 hover:text-white transition-colors tracking-widest font-mono">LN</a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
