"use client";

import { useState } from "react";
import Image from "next/image";
import FuturisticChart from "./components/FuturisticChart";
import { BlurredStagger } from "./components/BlurredStagger";
import { motion, AnimatePresence } from "motion/react";
import { MagneticText } from "./components/MagneticText";
import { Counter } from "./components/Counter";
import { MenuOverlay } from "./components/MenuOverlay";
import { ContactModal } from "./components/ContactModal";

// Glowing Hexagon Icon wrapper for Section 4 metrics
function HexagonIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center w-12 h-12 text-red-500">
      {/* Glowing background */}
      <div className="absolute inset-0 rounded-full blur-[8px] bg-red-500/10 pointer-events-none" />
      {/* Hexagon outline SVG */}
      <svg className="absolute inset-0 w-full h-full text-red-500/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <polygon points="50,3 93,28 93,78 50,97 7,78 7,28" />
      </svg>
      {/* Outer red highlight hexagon */}
      <svg className="absolute inset-0 w-full h-full text-red-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 150">
        <polygon points="50,3 93,28 93,78 50,97 7,78 7,28" />
      </svg>
      {/* Inside Icon */}
      <div className="relative z-10 flex items-center justify-center w-5 h-5">
        {children}
      </div>
    </div>
  );
}

// Custom cyberpunk border outline background for Section 5 testimonial cards
function CyberpunkCardBackground() {
  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cardGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Main Card Shape Fill (Dark fill with red glow gradient) */}
        <path
          d="M 6,0 L 94,0 L 100,6 L 100,94 L 94,100 L 6,100 L 0,94 L 0,6 Z"
          fill="#0c0c0c"
          fillOpacity="0.9"
        />
        <path
          d="M 6,0 L 94,0 L 100,6 L 100,94 L 94,100 L 6,100 L 0,94 L 0,6 Z"
          fill="url(#cardGlow)"
        />

        {/* Cyberpunk Outer Border (Red outline with drop shadow glow) */}
        <path
          d="M 6,0.5 L 94,0.5 L 99.5,6 L 99.5,94 L 94,99.5 L 6,99.5 L 0.5,94 L 0.5,6 Z"
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.2"
          strokeOpacity="0.75"
          className="filter drop-shadow-[0_0_6px_rgba(239,68,68,0.45)]"
        />

        {/* Internal Horizontal Divider Line (drawn at Y = 52%) */}
        <line
          x1="0.5"
          y1="52"
          x2="99.5"
          y2="52"
          stroke="#ef4444"
          strokeWidth="1.2"
          strokeOpacity="0.25"
          strokeDasharray="4 2"
        />
      </svg>
    </div>
  );
}

const headingContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.008,
    },
  },
};

const headingLetter = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    y: 2,
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
  },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"project" | "call">("project");

  const scrollToSection = (id: string) => {
    const isMenuInitiallyOpen = menuOpen;
    setMenuOpen(false);

    const performScroll = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    if (isMenuInitiallyOpen) {
      setTimeout(performScroll, 220); // wait for menu exit animation (200ms duration + tiny buffer)
    } else {
      performScroll();
    }
  };

  const openContactModal = (type: "project" | "call") => {
    setMenuOpen(false);
    setModalType(type);
    setModalOpen(true);
  };
  return (
    <main className="relative min-h-screen w-full bg-black font-sans text-white overflow-x-hidden">
      {/* ───────────────────────── Hero Section ───────────────────────── */}
      <div id="home" className="relative h-[110vh] min-h-[800px] lg:min-h-[950px] w-full overflow-hidden">
        {/* Red trapezoid behind the figure */}
        <Image
          src="/hero/image3.png"
          alt=""
          aria-hidden
          width={400}
          height={140}
          priority
          className="pointer-events-none absolute left-1/2 top-0 z-0 w-[24vw] max-w-[400px] -translate-x-1/2 select-none"
        />

        {/* Red particle shards — sit BEHIND the figure, rendered twice to fill the scene */}
        <Image
          src="/hero/image2.png"
          alt=""
          aria-hidden
          width={840}
          height={400}
          priority
          className="pointer-events-none absolute left-1/2 top-[8%] z-[5] w-[58vw] max-w-[920px] -translate-x-1/2 select-none"
        />
        <Image
          src="/hero/image2.png"
          alt=""
          aria-hidden
          width={840}
          height={400}
          priority
          className="pointer-events-none absolute left-1/2 top-[40%] z-[5] w-[48vw] max-w-[760px] -translate-x-1/2 -scale-x-100 select-none opacity-80"
        />

        {/* Samurai figure */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center">
          <Image
            src="/hero/image1-v2.png"
            alt="Synth automation figure"
            width={720}
            height={1080}
            priority
            className="h-[115vh] lg:h-[125vh] w-auto select-none object-contain object-top"
          />
        </div>

        {/* ───────────────────────────── Header ──────────────────────────────── */}
        <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-8 py-6 lg:px-12">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Synth logo" width={36} height={36} className="h-9 w-9" />
            <span className="text-xl font-bold tracking-[0.2em]">SYNTH</span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => scrollToSection("work")}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-neutral-200 cursor-pointer"
            >
              EXPLORE SOLUTIONS →
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 text-sm font-medium tracking-[0.2em] cursor-pointer z-[60] relative"
            >
              <span>{menuOpen ? "CLOSE" : "MENU"}</span>
              <span className="flex flex-col gap-[5px] w-7 justify-center h-4 relative">
                <span className={`block h-[2px] w-7 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
                <span className={`block h-[2px] w-7 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
              </span>
            </button>
          </div>
        </header>

        {/* ──────────────────────────── Left copy ────────────────────────────── */}
        <div className="absolute left-8 top-[11%] lg:top-[13%] z-30 max-w-[46vw] lg:left-12">
          <div className="font-bold leading-[0.82] tracking-tight">
            <MagneticText
              text="DIGI"
              textClassName="text-[clamp(3.5rem,11vw,11rem)] font-bold text-white leading-[0.82] tracking-tight block"
              hoverTextClassName="text-[clamp(3.5rem,11vw,11rem)] font-bold text-red-600 leading-[0.82] tracking-tight block"
              circleClassName="bg-white"
              circleSize={220}
              className="block"
            />
            <div className="flex items-center gap-6">
              <span className="text-[clamp(0.7rem,1vw,1rem)] font-medium tracking-[0.15em] text-white/90">
                デジタル自動化
              </span>
              <MagneticText
                text="TAL"
                textClassName="text-[clamp(3.5rem,11vw,11rem)] font-bold text-white leading-[0.82] tracking-tight block"
                hoverTextClassName="text-[clamp(3.5rem,11vw,11rem)] font-bold text-red-600 leading-[0.82] tracking-tight block"
                circleClassName="bg-white"
                circleSize={220}
                className="inline-block"
              />
            </div>
            <MagneticText
              text="AUTO"
              textClassName="text-[clamp(3.5rem,11vw,11rem)] font-bold text-red-600 leading-[0.82] tracking-tight block"
              hoverTextClassName="text-[clamp(3.5rem,11vw,11rem)] font-bold text-white leading-[0.82] tracking-tight block"
              circleClassName="bg-red-600"
              circleSize={220}
              className="block"
            />
            <MagneticText
              text="MATE"
              textClassName="text-[clamp(3.5rem,11vw,11rem)] font-bold text-red-600 leading-[0.82] tracking-tight block"
              hoverTextClassName="text-[clamp(3.5rem,11vw,11rem)] font-bold text-white leading-[0.82] tracking-tight block"
              circleClassName="bg-red-600"
              circleSize={220}
              className="block"
            />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
            <MagneticText
              text="Intelligent Automation. Limitless Possibilities."
              textClassName="text-base font-semibold tracking-wide text-white"
              hoverTextClassName="text-base font-semibold tracking-wide text-red-600"
              circleClassName="bg-white"
              circleSize={120}
            />
          </div>

          <BlurredStagger 
            text="Building intelligent automation systems that connect AI, workflows, and real-world business operations." 
            className="mt-10 max-w-xs text-sm leading-relaxed text-neutral-400 block" 
          />
        </div>

        {/* ───────────────────── Vertical Japanese caption ───────────────────── */}
        <div className="absolute left-[37%] top-[46%] z-30 hidden text-[clamp(1.2rem,1.8vw,1.9rem)] font-semibold tracking-[0.2em] [writing-mode:vertical-rl] lg:block">
          未来の構築
        </div>

        {/* ──────────────────────────── Right card ───────────────────────────── */}
        <div className="absolute right-8 top-[38%] z-30 hidden w-[clamp(280px,24vw,400px)] overflow-hidden rounded-3xl border border-red-600/30 bg-black/40 p-8 backdrop-blur-sm lg:right-12 lg:block">
          {/* corner glow */}
          <div className="pointer-events-none absolute -right-10 top-6 h-32 w-32 rounded-full bg-red-600/40 blur-3xl" />

          <Image src="/logo.png" alt="" aria-hidden width={32} height={32} className="h-8 w-8" />

          <MagneticText
            text="Automation First"
            textClassName="text-2xl font-semibold text-white block"
            hoverTextClassName="text-2xl font-semibold text-red-600 block"
            circleClassName="bg-white"
            circleSize={140}
            className="mt-8 block"
          />
          <span className="mt-4 block h-[3px] w-8 bg-red-600" />

          <BlurredStagger 
            text="Create AI-powered workflows, automate repetitive tasks, and scale operations without increasing complexity." 
            className="mt-5 text-base leading-relaxed text-neutral-300 block" 
          />
        </div>
      </div>

      {/* ─────────────────────────── Section 2 ─────────────────────────── */}
      <section id="features" className="relative z-20 -mt-10 md:-mt-14 mx-4 md:mx-8 lg:mx-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-white px-6 py-20 text-black md:px-12 lg:px-24 lg:py-32 shadow-2xl border-t border-neutral-100 overflow-hidden">
        {/* Desktop Bottom-Left Corner Images (Normal/Static, no extra hover or zoom animation) */}
        <div className="absolute left-0 top-0 bottom-0 w-[41%] max-w-[480px] pointer-events-none hidden lg:block z-10">
          {/* Background image2.png */}
          <div 
            className="absolute inset-0 bg-cover bg-left"
            style={{ backgroundImage: "url('/section2/image2.png')" }}
          />
          {/* Foreground image1.png */}
          <div className="absolute inset-0 flex items-end justify-start">
            <Image
              src="/section2/image1.png"
              alt="Digital Automation"
              fill
              priority
              className="object-contain object-left-bottom"
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Left Column: Mobile Image Frame / Desktop Spacer */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              {/* Mobile/Tablet image container (hidden on desktop) */}
              <div className="lg:hidden w-full max-w-md mx-auto aspect-[4/5] relative rounded-[2rem] overflow-hidden border border-neutral-200">
                {/* Background image2.png */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/section2/image2.png')" }}
                />
                {/* Foreground image1.png */}
                <Image
                  src="/section2/image1.png"
                  alt="Digital Automation"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </div>
              
              {/* Desktop placeholder spacer */}
              <div className="hidden lg:block w-full" />
            </div>

            {/* Right Column: Copy and Grid */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Category indicator */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900">
                  Digital Automation
                </span>
              </div>

              {/* Heading */}
              <motion.h2
                variants={headingContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-[2.75rem] max-w-3xl block"
              >
                {"Digital Automation - is an intelligent system builder that combines".split(" ").map((word, index) => (
                  <motion.span
                    key={`part1-${index}`}
                    variants={headingLetter}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ display: "inline-block" }}
                    className="mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}{" "}
                <span className="text-neutral-400 font-normal">
                  {"AI, automation and custom solutions to drive real business impact.".split(" ").map((word, index) => (
                    <motion.span
                      key={`part2-${index}`}
                      variants={headingLetter}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ display: "inline-block" }}
                      className="mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </motion.h2>

              {/* Subtitle */}
              <BlurredStagger 
                text="I design and build end-to-end automation systems that save time, reduce cost and scale your business." 
                className="mt-6 text-sm md:text-base leading-relaxed text-neutral-600 max-w-2xl block" 
              />

              {/* Features Grid */}
              <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 border-t border-neutral-100 pt-10">
                {/* Card 1 */}
                <div className="flex flex-col group/item">
                  {/* Icon */}
                  <div className="flex items-center justify-start text-red-600 transition-transform duration-300 group-hover/item:scale-110 origin-left">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900">Custom Automation</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Tailored workflows and systems built for your unique business needs.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col group/item">
                  {/* Icon */}
                  <div className="flex items-center justify-start text-red-600 transition-transform duration-300 group-hover/item:scale-110 origin-left">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                      <text x="12" y="15.5" fontSize="8" fontWeight="bold" textAnchor="middle" fill="currentColor">AI</text>
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900">AI Integration</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Leverage AI models and APIs to automate decisions and unlock new capabilities.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="flex flex-col group/item">
                  {/* Icon */}
                  <div className="flex items-center justify-start text-red-600 transition-transform duration-300 group-hover/item:scale-110 origin-left">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 11l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900">Reliable & Secure</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Secure, scalable and reliable systems with best practices in place.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="flex flex-col group/item">
                  {/* Icon */}
                  <div className="flex items-center justify-start text-red-600 transition-transform duration-300 group-hover/item:scale-110 origin-left">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4L18.4 5.6" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900">Process Optimization</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Identify bottlenecks and automate repetitive tasks to maximize efficiency.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="flex flex-col group/item">
                  {/* Icon */}
                  <div className="flex items-center justify-start text-red-600 transition-transform duration-300 group-hover/item:scale-110 origin-left">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900">End-to-End Solutions</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    From strategy and design to deployment and ongoing improvements.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="flex flex-col group/item">
                  {/* Icon */}
                  <div className="flex items-center justify-start text-red-600 transition-transform duration-300 group-hover/item:scale-110 origin-left">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900">Scalable Systems</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Build systems that grow with your business without adding complexity.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────── Section 3 ─────────────────────────── */}
      <section id="stats" className="relative z-20 w-full bg-black text-white px-6 py-16 md:px-12 lg:px-24 lg:py-24 border-t border-neutral-900">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between pb-0">
            <div>
              {/* Category indicator */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                  Stats & Impact
                </span>
              </div>
            <MagneticText
              circleClassName="bg-black"
              circleSize={250}
              className="text-left block"
              children={
                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl max-w-2xl">
                  Stats defining the <br />
                  <span className="text-red-500 font-extrabold">impact</span> I create
                </h2>
              }
              hoverChildren={
                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-red-500 md:text-5xl lg:text-6xl max-w-2xl">
                  Stats defining the <br />
                  <span className="text-white font-extrabold">impact</span> I create
                </h2>
              }
            />
            </div>
            
            <button 
              onClick={() => scrollToSection("work")}
              className="group flex items-center gap-2 text-sm text-neutral-400 font-semibold tracking-wider hover:text-white transition-colors cursor-pointer self-start lg:self-auto border-b border-neutral-800 pb-1"
            >
              My track record:
              <svg className="w-4 h-4 text-red-500 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            
            {/* Column 1: Automations Deployed */}
            <div className="bg-neutral-950/40 border border-neutral-900 rounded-[2rem] p-8 flex flex-col justify-between h-[540px] relative overflow-hidden backdrop-blur-sm group/card">
              {/* Subtle top glow */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
              
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-bold">
                  Automations Deployed
                </span>
                <h3 className="text-5xl font-extrabold text-white mt-4 tracking-tight">
                  <Counter value={120} suffix="+" />
                </h3>
                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                  Production-ready automation systems delivered.
                </p>
              </div>

              {/* Futuristic Chart container */}
              <div className="relative w-full mt-6">
                <FuturisticChart />
              </div>
            </div>

            {/* Column 2: Solutions Built */}
            <div className="bg-neutral-950/40 border border-neutral-900 rounded-[2rem] p-8 flex flex-col justify-between h-[540px] relative overflow-hidden backdrop-blur-sm group/card">
              {/* Subtle top glow */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-bold">
                  Solutions Built
                </span>
                <h3 className="text-5xl font-extrabold text-white mt-4 tracking-tight">
                  <Counter value={3} suffix=" Tiers" />
                </h3>
                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                  Scalable solutions designed for different business needs.
                </p>
              </div>

              {/* Tiers List */}
              <div className="space-y-3 mt-6">
                {/* Enterprise */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900/20 border border-neutral-900/60 backdrop-blur-sm hover:bg-neutral-900/40 hover:border-neutral-800 transition-all duration-300 group/item cursor-pointer">
                  <div className="flex items-center gap-4">
                    {/* Glowing Blue Orb */}
                    <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-blue-950/20 border border-blue-500/20">
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]" />
                      <div className="absolute inset-0 rounded-full blur-[4px] bg-blue-500/30" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">Enterprise</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-none">High-scale systems for complex operations.</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-blue-500 transform transition-transform duration-300 group-hover/item:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                {/* Business */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900/20 border border-neutral-900/60 backdrop-blur-sm hover:bg-neutral-900/40 hover:border-neutral-800 transition-all duration-300 group/item cursor-pointer">
                  <div className="flex items-center gap-4">
                    {/* Glowing Purple Orb */}
                    <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-purple-950/20 border border-purple-500/20">
                      <div className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />
                      <div className="absolute inset-0 rounded-full blur-[4px] bg-purple-500/30" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">Business</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-none">Powerful automation for growing companies.</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-purple-500 transform transition-transform duration-300 group-hover/item:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                {/* Startup */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900/20 border border-neutral-900/60 backdrop-blur-sm hover:bg-neutral-900/40 hover:border-neutral-800 transition-all duration-300 group/item cursor-pointer">
                  <div className="flex items-center gap-4">
                    {/* Glowing Red Orb */}
                    <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-red-950/20 border border-red-500/20">
                      <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444]" />
                      <div className="absolute inset-0 rounded-full blur-[4px] bg-red-500/30" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">Startup</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-none">Lean automation to help startups move faster.</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-red-500 transform transition-transform duration-300 group-hover/item:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Column 3: Stacked Cards */}
            <div className="flex flex-col gap-6 h-[540px]">
              
              {/* Card 1: Hours Automated */}
              <div className="bg-neutral-950/40 border border-neutral-900 rounded-[2rem] p-8 flex flex-col justify-between h-[258px] relative overflow-hidden backdrop-blur-sm group/card">
                {/* Subtle top glow */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
                
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-bold">
                      Hours Automated
                    </span>
                    <h3 className="text-4xl font-extrabold text-white mt-2 tracking-tight">
                      <Counter value={20} suffix="K+" />
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed max-w-[200px] sm:max-w-none lg:max-w-[200px]">
                      Hours saved through intelligent automation and AI workflows.
                    </p>
                  </div>
                  
                  {/* Glowing Stopwatch Icon */}
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-red-950/10 border border-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="13" r="7" />
                      <path d="M12 9v4l2 2M12 2v2M9 2h6" />
                    </svg>
                    <div className="absolute inset-0 rounded-xl blur-[6px] bg-red-500/10" />
                  </div>
                </div>

                {/* Clients avatars */}
                <div className="flex items-center mt-2">
                  <Image
                    src="/section3/avatars.png"
                    alt="Clients"
                    width={130}
                    height={32}
                    className="h-8 w-auto object-contain select-none"
                  />
                </div>
              </div>

              {/* Card 2: Happy Clients */}
              <div className="bg-neutral-950/40 border border-neutral-900 rounded-[2rem] p-8 flex flex-col justify-between h-[258px] relative overflow-hidden backdrop-blur-sm group/card">
                {/* Subtle top glow */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-bold">
                      Happy Clients
                    </span>
                    <h3 className="text-4xl font-extrabold text-white mt-2 tracking-tight">
                      <Counter value={60} suffix="+" />
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed max-w-[200px] sm:max-w-none lg:max-w-[200px]">
                      Businesses and founders trust my systems.
                    </p>
                  </div>

                  {/* Glowing Users Icon */}
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-red-950/10 border border-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="3" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <div className="absolute inset-0 rounded-xl blur-[6px] bg-red-500/10" />
                  </div>
                </div>

                {/* Clients avatars */}
                <div className="flex items-center mt-2">
                  <Image
                    src="/section3/avatars.png"
                    alt="Clients"
                    width={130}
                    height={32}
                    className="h-8 w-auto object-contain select-none"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────── Section 4 ─────────────────────────── */}
      <section id="work" className="relative z-20 w-full bg-black text-white px-6 py-10 md:px-12 lg:px-24 lg:py-16 border-t border-neutral-900 overflow-hidden">
        {/* Section Background Glow (gradent.png placed behind the right side of the header/link) */}
        <div className="absolute right-[-60px] top-[-140px] w-[600px] md:w-[700px] lg:w-[800px] h-[450px] md:h-[550px] lg:h-[650px] pointer-events-none opacity-85 z-0">
          <Image
            src="/section4/gradent.png"
            alt=""
            fill
            className="object-contain object-center select-none"
          />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-neutral-900 pb-5">
            <div className="lg:col-span-5">
              {/* Category indicator */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                  Our Work
                </span>
              </div>
            <MagneticText
              circleClassName="bg-black"
              circleSize={250}
              className="text-left block"
              children={
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                  Systems Built <br />
                  For <span className="text-red-500">Real Impact</span>
                </h2>
              }
              hoverChildren={
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-red-500 md:text-5xl">
                  Systems Built <br />
                  For <span className="text-white">Real Impact</span>
                </h2>
              }
            />
            </div>

            <div className="lg:col-span-4 lg:col-start-6">
              <BlurredStagger
                text="End-to-end automation systems and AI solutions designed to drive measurable results."
                className="text-sm text-neutral-400 leading-relaxed block"
              />
            </div>

            <div className="lg:col-span-3 flex lg:justify-end">
              <button 
                onClick={() => scrollToSection("work")}
                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500 hover:text-white transition-colors cursor-pointer border-b border-red-500/20 pb-1"
              >
                View All Projects
                <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Grid stack (Tighter spacing) */}
          <div className="flex flex-col gap-5 mt-8">
            
            {/* Card 1: Voice AI Platform */}
            <div className="bg-neutral-950/40 border border-neutral-900 rounded-[2rem] min-h-[340px] relative overflow-hidden backdrop-blur-sm group hover:border-neutral-800 transition-all duration-300 flex flex-col-reverse lg:flex-row justify-between items-stretch">
              {/* Subtle top glow */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent pointer-events-none" />
              
              {/* Copy */}
              <div className="relative z-10 p-6 md:p-8 lg:py-10 lg:pl-12 lg:pr-0 lg:w-[42%] flex flex-col justify-center">
                <div>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                    プロジェクト 01
                  </span>
                  <span className="block h-[2px] w-8 bg-red-500 mt-2 mb-1" />
                </div>
                <h3 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
                  Voice AI Platform
                </h3>
                <BlurredStagger
                  text="Real-time AI calling, customer support, and voice automation platform."
                  className="text-sm text-neutral-400 mt-2 leading-relaxed block"
                />
                
                {/* Metric */}
                <div className="flex items-center gap-4 mt-6">
                  <HexagonIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-full h-full">
                      <path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2" />
                    </svg>
                  </HexagonIcon>
                  <div>
                    <span className="text-lg font-bold text-white tracking-tight block">
                      <Counter value={50} suffix="K+" />
                    </span>
                    <span className="text-xs text-neutral-400 leading-none">Conversations Automated</span>
                  </div>
                </div>
              </div>

              {/* Image (Expanded scale, centered vertically) */}
              <div className="relative z-10 w-full h-[260px] md:h-[300px] lg:h-auto lg:w-[58%] self-stretch overflow-hidden flex items-center justify-end">
                {/* Red glow backdrop */}
                <div className="absolute right-[10%] lg:right-[15%] top-[10%] w-[60%] h-[80%] rounded-full bg-red-500/15 blur-[70px] pointer-events-none z-0" />
                <Image
                  src="/section4/image1.png"
                  alt="Voice AI Platform"
                  fill
                  className="z-10 object-contain object-center lg:object-right transform scale-[1.1] lg:scale-[1.25] origin-center select-none transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 2: AI Lead Engine */}
            <div className="bg-neutral-950/40 border border-neutral-900 rounded-[2rem] min-h-[340px] relative overflow-hidden backdrop-blur-sm group hover:border-neutral-800 transition-all duration-300 flex flex-col-reverse lg:flex-row-reverse justify-between items-stretch">
              {/* Subtle top glow */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent pointer-events-none" />

              {/* Copy */}
              <div className="relative z-10 p-6 md:p-8 lg:py-10 lg:pr-12 lg:pl-0 lg:w-[42%] flex flex-col justify-center">
                <div>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                    自動化 02
                  </span>
                  <span className="block h-[2px] w-8 bg-red-500 mt-2 mb-1" />
                </div>
                <h3 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
                  AI Lead Engine
                </h3>
                <BlurredStagger
                  text="Automated lead generation, qualification, enrichment, and outreach at scale."
                  className="text-sm text-neutral-400 mt-2 leading-relaxed block"
                />
                
                {/* Metric */}
                <div className="flex items-center gap-4 mt-6">
                  <HexagonIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </HexagonIcon>
                  <div>
                    <span className="text-lg font-bold text-white tracking-tight block">
                      <Counter value={120} suffix="K+" />
                    </span>
                    <span className="text-xs text-neutral-400 leading-none">Leads Processed</span>
                  </div>
                </div>
              </div>

              {/* Image (Expanded scale, centered vertically) */}
              <div className="relative z-10 w-full h-[260px] md:h-[300px] lg:h-auto lg:w-[58%] self-stretch overflow-hidden flex items-center justify-start">
                {/* Red glow backdrop */}
                <div className="absolute left-[10%] lg:left-[15%] top-[10%] w-[60%] h-[80%] rounded-full bg-red-500/15 blur-[70px] pointer-events-none z-0" />
                <Image
                  src="/section4/image2.png"
                  alt="AI Lead Engine"
                  fill
                  className="z-10 object-contain object-center lg:object-left transform scale-[1.1] lg:scale-[1.25] origin-center select-none transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 3: Workflow Automation Suite */}
            <div className="bg-neutral-950/40 border border-neutral-900 rounded-[2rem] min-h-[340px] relative overflow-hidden backdrop-blur-sm group hover:border-neutral-800 transition-all duration-300 flex flex-col-reverse lg:flex-row justify-between items-stretch">
              {/* Subtle top glow */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent pointer-events-none" />

              {/* Copy */}
              <div className="relative z-10 p-6 md:p-8 lg:py-10 lg:pl-12 lg:pr-0 lg:w-[42%] flex flex-col justify-center">
                <div>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                    統合 03
                  </span>
                  <span className="block h-[2px] w-8 bg-red-500 mt-2 mb-1" />
                </div>
                <h3 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
                  Workflow Automation Suite
                </h3>
                <BlurredStagger
                  text="Custom integrations connecting your CRM, ERP, and operations."
                  className="text-sm text-neutral-400 mt-2 leading-relaxed block"
                />
                
                {/* Metric */}
                <div className="flex items-center gap-4 mt-6">
                  <HexagonIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
                    </svg>
                  </HexagonIcon>
                  <div>
                    <span className="text-lg font-bold text-white tracking-tight block">
                      <Counter value={500} suffix="+" />
                    </span>
                    <span className="text-xs text-neutral-400 leading-none">Workflows Employed</span>
                  </div>
                </div>
              </div>

              {/* Image (Expanded scale, centered vertically) */}
              <div className="relative z-10 w-full h-[260px] md:h-[300px] lg:h-auto lg:w-[58%] self-stretch overflow-hidden flex items-center justify-end">
                {/* Red glow backdrop */}
                <div className="absolute right-[10%] lg:right-[15%] top-[10%] w-[60%] h-[80%] rounded-full bg-red-500/15 blur-[70px] pointer-events-none z-0" />
                <Image
                  src="/section4/image3.png"
                  alt="Workflow Automation Suite"
                  fill
                  className="z-10 object-contain object-center lg:object-right transform scale-[1.1] lg:scale-[1.25] origin-center select-none transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────── Section 5 (Clients & Testimonials) ─────────────────────────── */}
      <section id="clients" className="relative z-20 w-full bg-black text-white px-6 py-16 md:px-12 lg:px-24 lg:py-24 border-t border-neutral-900 overflow-hidden">
        {/* Subtle background red glow */}
        <div className="absolute left-[10%] top-[30%] w-[350px] h-[350px] rounded-full bg-red-950/10 blur-[90px] pointer-events-none z-0" />
        <div className="absolute right-[10%] bottom-[20%] w-[400px] h-[400px] rounded-full bg-red-950/10 blur-[100px] pointer-events-none z-0" />

        <div className="mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-neutral-900 pb-8">
            <div className="lg:col-span-5">
              {/* Category indicator */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                  Our Clients
                </span>
              </div>
              <MagneticText
                circleClassName="bg-black"
                circleSize={250}
                className="text-left block"
                children={
                  <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-[2.75rem] max-w-xl">
                    Trusted By Teams <br />
                    That Need <span className="text-red-500 font-black">Real Results</span>
                  </h2>
                }
                hoverChildren={
                  <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-red-500 md:text-5xl lg:text-[2.75rem] max-w-xl">
                    Trusted By Teams <br />
                    That Need <span className="text-white font-black">Real Results</span>
                  </h2>
                }
              />
              <div className="mt-4 text-sm text-neutral-400 max-w-md">
                <BlurredStagger
                  text="Real businesses: Real outcomes."
                  className="block"
                />
                <BlurredStagger
                  text="Built through automation, AI, and scalable systems."
                  className="block mt-1"
                />
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-8 flex flex-col items-start lg:items-end lg:text-right">
              {/* Custom SVG square indicator boxes and line */}
              <div className="flex flex-col items-start lg:items-end gap-2">
                <div className="flex gap-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="w-2.5 h-2.5 border border-red-500/50 rounded-[1px] block" />
                  ))}
                </div>
                <span className="block w-12 h-[2px] bg-red-500" />
              </div>
              <BlurredStagger
                text="Companies and founders who transformed operations using intelligent automation."
                className="mt-4 text-sm text-neutral-400 max-w-xs leading-relaxed block"
              />
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            
            {/* Card 1: Sarah Johnson */}
            <div className="relative h-[460px] md:h-[480px] lg:h-[465px] flex flex-col justify-between p-12 overflow-hidden group transition-all duration-300">
              <CyberpunkCardBackground />
              
              {/* Quote text (Top part above divider line) */}
              <div className="h-[52%] flex flex-col justify-center relative z-10">
                <svg className="w-8 h-8 text-red-500/40 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <BlurredStagger
                  text="“SYNTH automated our entire lead generation process and reduced manual work by over 80%.”"
                  className="text-base font-semibold leading-relaxed text-neutral-200 block"
                />
              </div>

              {/* Profile & Stats (Bottom part below divider line) */}
              <div className="h-[48%] flex flex-col justify-end pt-4 relative z-10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start lg:gap-3 xl:flex-row xl:items-center xl:justify-between w-full mt-auto">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.2)] flex-shrink-0">
                      <Image
                        src="/section5/avatar1.png"
                        alt="Sarah Johnson"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white tracking-wide truncate">Sarah Johnson</h4>
                      <p className="text-[11px] text-neutral-400 truncate">Founder, GrowthScale</p>
                    </div>
                  </div>

                  {/* Bottom stats box */}
                  <div className="flex-shrink-0 bg-red-950/20 border border-red-500/30 rounded-full py-1.5 px-3 flex items-center gap-2 backdrop-blur-sm shadow-[inset_0_0_8px_rgba(239,68,68,0.1)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                    <span className="text-xs font-semibold text-red-400 whitespace-nowrap">
                      <Counter value={340} prefix="+" suffix="%" /> Qualified Leads
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Michael Chen */}
            <div className="relative h-[460px] md:h-[480px] lg:h-[465px] flex flex-col justify-between p-12 overflow-hidden group transition-all duration-300">
              <CyberpunkCardBackground />

              {/* Quote text (Top part above divider line) */}
              <div className="h-[52%] flex flex-col justify-center relative z-10">
                <svg className="w-8 h-8 text-red-500/40 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <BlurredStagger
                  text="“The voice AI system now handles thousands of customer interactions every month.”"
                  className="text-base font-semibold leading-relaxed text-neutral-200 block"
                />
              </div>

              {/* Profile & Stats (Bottom part below divider line) */}
              <div className="h-[48%] flex flex-col justify-end pt-4 relative z-10">
                {/* Overlay soundwave graphic in background of bottom part */}
                <div className="absolute right-0 top-0 opacity-50 z-0 text-red-500 pointer-events-none">
                  <svg className="w-24 h-6" viewBox="0 0 120 20" fill="currentColor">
                    <rect x="0" y="9" width="1.5" height="2" rx="0.5" />
                    <rect x="4" y="8" width="1.5" height="4" rx="0.5" />
                    <rect x="8" y="7" width="1.5" height="6" rx="0.5" />
                    <rect x="12" y="5" width="1.5" height="10" rx="0.5" />
                    <rect x="16" y="8" width="1.5" height="4" rx="0.5" />
                    <rect x="20" y="6" width="1.5" height="8" rx="0.5" />
                    <rect x="24" y="3" width="1.5" height="14" rx="0.5" />
                    <rect x="28" y="7" width="1.5" height="6" rx="0.5" />
                    <rect x="32" y="1" width="1.5" height="18" rx="0.5" />
                    <rect x="36" y="5" width="1.5" height="10" rx="0.5" />
                    <rect x="40" y="8" width="1.5" height="4" rx="0.5" />
                    <rect x="44" y="9" width="1.5" height="2" rx="0.5" />
                    <rect x="48" y="6" width="1.5" height="8" rx="0.5" />
                    <rect x="52" y="4" width="1.5" height="12" rx="0.5" />
                    <rect x="56" y="2" width="1.5" height="16" rx="0.5" />
                    <rect x="60" y="7" width="1.5" height="6" rx="0.5" />
                    <rect x="64" y="5" width="1.5" height="10" rx="0.5" />
                    <rect x="68" y="8" width="1.5" height="4" rx="0.5" />
                    <rect x="72" y="3" width="1.5" height="14" rx="0.5" />
                    <rect x="76" y="6" width="1.5" height="8" rx="0.5" />
                    <rect x="80" y="7" width="1.5" height="6" rx="0.5" />
                    <rect x="84" y="8" width="1.5" height="4" rx="0.5" />
                    <rect x="88" y="9" width="1.5" height="2" rx="0.5" />
                  </svg>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start lg:gap-3 xl:flex-row xl:items-center xl:justify-between w-full mt-auto relative z-10">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.2)] flex-shrink-0">
                      <Image
                        src="/section5/avatar2.png"
                        alt="Michael Chen"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white tracking-wide truncate">Michael Chen</h4>
                      <p className="text-[11px] text-neutral-400 truncate">Operations Director</p>
                    </div>
                  </div>

                  {/* Bottom stats box */}
                  <div className="flex-shrink-0 bg-red-950/20 border border-red-500/30 rounded-full py-1.5 px-3 flex items-center gap-2 backdrop-blur-sm shadow-[inset_0_0_8px_rgba(239,68,68,0.1)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                    <span className="text-xs font-semibold text-red-400 whitespace-nowrap">
                      <Counter value={50} suffix="K+" /> Conversations
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Emma Rodriguez */}
            <div className="relative h-[460px] md:h-[480px] lg:h-[465px] flex flex-col justify-between p-12 overflow-hidden group transition-all duration-300">
              <CyberpunkCardBackground />

              {/* Quote text (Top part above divider line) */}
              <div className="h-[52%] flex flex-col justify-center relative z-10">
                <svg className="w-8 h-8 text-red-500/40 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <BlurredStagger
                  text="“Workflow automation saved our team hundreds of hours every quarter.”"
                  className="text-base font-semibold leading-relaxed text-neutral-200 block"
                />
              </div>

              {/* Profile & Stats (Bottom part below divider line) */}
              <div className="h-[48%] flex flex-col justify-end pt-4 relative z-10">
                {/* Overlay motherboard node diagram in background of bottom part */}
                <div className="absolute right-0 top-0 opacity-40 z-0 text-red-500 pointer-events-none">
                  <svg className="w-20 h-10" viewBox="0 0 100 50">
                    <line x1="10" y1="25" x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="10" y1="25" x2="40" y2="40" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="40" y1="10" x2="70" y2="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="40" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="70" y1="10" x2="90" y2="25" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="70" y1="40" x2="90" y2="25" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="10" cy="25" r="3" fill="black" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="40" cy="10" r="3" fill="black" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="40" cy="40" r="3" fill="black" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="70" cy="10" r="3" fill="black" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="70" cy="40" r="3" fill="black" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="90" cy="25" r="3" fill="black" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start lg:gap-3 xl:flex-row xl:items-center xl:justify-between w-full mt-auto relative z-10">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.2)] flex-shrink-0">
                      <Image
                        src="/section5/avatar3.png"
                        alt="Emma Rodriguez"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white tracking-wide truncate">Emma Rodriguez</h4>
                      <p className="text-[11px] text-neutral-400 truncate">CEO</p>
                    </div>
                  </div>

                  {/* Bottom stats box */}
                  <div className="flex-shrink-0 bg-red-950/20 border border-red-500/30 rounded-full py-1.5 px-3 flex items-center gap-2 backdrop-blur-sm shadow-[inset_0_0_8px_rgba(239,68,68,0.1)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                    <span className="text-xs font-semibold text-red-400 whitespace-nowrap">
                      <Counter value={500} suffix="+" /> Processes
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Statistics Bar */}
          <div className="relative border border-red-500/25 bg-neutral-950/25 rounded-2xl p-6 md:p-8 mt-16 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.02)] backdrop-blur-sm overflow-hidden">
            {/* Cyberpunk corner brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500/70" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500/70" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500/70" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500/70" />

            {/* Column 1: Rating */}
            <div className="flex-1 flex flex-col items-center justify-center py-6 md:py-4 px-4 relative group/stat cursor-pointer">
              <span className="absolute left-4 top-2 text-[10px] text-red-500/50 font-mono tracking-widest font-bold">01</span>
              {/* Glowing star icon */}
              <div className="relative text-red-500 mb-3 group-hover/stat:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.195-.59 1.04-.59 1.235 0l2.367 7.182h7.525c.619 0 .876.79.376 1.177l-6.086 4.425 2.367 7.183c.196.59-.475 1.08-.992.704L12 18.016l-6.086 4.417c-.517.376-1.188-.118-.992-.704l2.367-7.183-6.086-4.425c-.5-.388-.243-1.177.376-1.177h7.525l2.367-7.182z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider text-center">Average Rating</span>
              <span className="text-2xl font-black text-white mt-2 font-mono tracking-tight">
                <Counter value={4.9} decimals={1} /> <span className="text-xs text-neutral-500 font-normal">/ 5</span>
              </span>
            </div>

            {/* Column 2: Businesses */}
            <div className="flex-1 flex flex-col items-center justify-center py-6 md:py-4 px-4 relative group/stat cursor-pointer">
              <span className="absolute left-4 top-2 text-[10px] text-red-500/50 font-mono tracking-widest font-bold">02</span>
              {/* Glowing building icon */}
              <div className="relative text-red-500 mb-3 group-hover/stat:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M21 21V12h-3v9" />
                </svg>
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider text-center">Businesses Served</span>
              <span className="text-2xl font-black text-white mt-2 font-mono tracking-tight">
                <Counter value={60} suffix="+" />
              </span>
            </div>

            {/* Column 3: Running */}
            <div className="flex-1 flex flex-col items-center justify-center py-6 md:py-4 px-4 relative group/stat cursor-pointer">
              <span className="absolute left-4 top-2 text-[10px] text-red-500/50 font-mono tracking-widest font-bold">03</span>
              {/* Glowing lightning icon */}
              <div className="relative text-red-500 mb-3 group-hover/stat:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider text-center">Automations Running</span>
              <span className="text-2xl font-black text-white mt-2 font-mono tracking-tight">
                <Counter value={120} suffix="+" />
              </span>
            </div>

            {/* Column 4: Efficiency */}
            <div className="flex-1 flex flex-col items-center justify-center py-6 md:py-4 px-4 relative group/stat cursor-pointer">
              <span className="absolute left-4 top-2 text-[10px] text-red-500/50 font-mono tracking-widest font-bold">04</span>
              {/* Glowing efficiency icon */}
              <div className="relative text-red-500 mb-3 group-hover/stat:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider text-center">Efficiency Increase</span>
              <span className="text-2xl font-black text-white mt-2 font-mono tracking-tight">
                <Counter value={80} suffix="%" />
              </span>
            </div>

            {/* Column 5: Retention */}
            <div className="flex-1 flex flex-col items-center justify-center py-6 md:py-4 px-4 relative group/stat cursor-pointer">
              <span className="absolute left-4 top-2 text-[10px] text-red-500/50 font-mono tracking-widest font-bold">05</span>
              {/* Glowing handshake icon */}
              <div className="relative text-red-500 mb-3 group-hover/stat:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider text-center">Retention Rate</span>
              <span className="text-2xl font-black text-white mt-2 font-mono tracking-tight">
                <Counter value={96} suffix="%" />
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────── Section 6 (Cyberpunk CTA Banner) ─────────────────────────── */}
      <section id="contact" className="relative z-20 w-full bg-black text-white px-6 md:px-12 lg:px-24 py-16 lg:py-20 border-t border-neutral-900 overflow-hidden">
        {/* Glowing red background moon and city backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-65 z-0" 
          style={{ backgroundImage: "url('/cta/background.png')" }} 
        />
        
        {/* Robotic Samurai figure in the center-right layer */}
        <div className="absolute right-0 md:right-[5%] lg:right-[15%] bottom-0 top-0 w-[450px] md:w-[550px] lg:w-[650px] z-10 pointer-events-none select-none">
          <Image 
            src="/cta/image1.png" 
            alt="Synth Robotic Samurai" 
            fill 
            className="object-contain object-bottom" 
            priority 
          />
        </div>

        {/* Cyberpunk Outer Border Frame */}
        <div className="absolute inset-4 z-20 border border-red-500/25 pointer-events-none rounded-xl">
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-red-500/80" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-red-500/80" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-red-500/80" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-red-500/80" />
        </div>

        {/* Content Container Grid */}
        <div className="mx-auto max-w-7xl relative z-20 flex flex-col lg:flex-row justify-between items-stretch gap-12 lg:gap-8 min-h-[500px]">
          
          {/* Left Column: Heading, description, and buttons */}
          <div className="flex-1 flex flex-col justify-between items-start">
            
            {/* Top info badge */}
            <div className="flex flex-col items-start gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-[1px] block animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500">
                  Ready To Build
                </span>
              </div>
              <span className="block w-8 h-[2px] bg-red-500" />
            </div>

            {/* Main Header Copy */}
            <div className="mt-8">
              <MagneticText
                circleClassName="bg-black"
                circleSize={300}
                className="text-left block"
                children={
                  <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tight leading-[0.9] text-white">
                    THE FUTURE <br />
                    <span className="text-red-500 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">IS AUTOMATED</span>
                  </h2>
                }
                hoverChildren={
                  <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tight leading-[0.9] text-red-500">
                    THE FUTURE <br />
                    <span className="text-white filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">IS AUTOMATED</span>
                  </h2>
                }
              />
              
              {/* Bullet style list */}
              <div className="mt-8 space-y-1 text-sm font-bold text-neutral-400 tracking-wider">
                <p>AI SYSTEMS.</p>
                <p>INTELLIGENT AUTOMATION.</p>
                <p>BUILT TO SCALE.</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => openContactModal("project")}
                  className="group w-full sm:w-[280px] bg-gradient-to-r from-red-950/40 via-red-900/35 to-red-950/40 border-2 border-red-500 text-white font-extrabold tracking-[0.2em] text-xs py-4 px-6 rounded-xl flex items-center justify-between shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.45)] transition-all duration-300 cursor-pointer"
                >
                  <span>START PROJECT</span>
                  <svg className="w-4 h-4 text-red-500 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => openContactModal("call")}
                  className="group w-full sm:w-[180px] border border-red-500/25 hover:border-red-500/50 bg-black/40 text-white font-bold tracking-[0.2em] text-[10px] py-4 px-6 rounded-xl flex items-center justify-between transition-all duration-300 backdrop-blur-sm cursor-pointer"
                >
                  <span>BOOK CALL</span>
                  <svg className="w-3.5 h-3.5 text-red-500 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Left Bottom Footer */}
            <div className="mt-12 flex items-center gap-2 text-[9px] font-bold tracking-[0.25em] text-neutral-500">
              <span className="text-red-500 font-black">SYNTH</span>
              <span>|</span>
              <span>シンセ</span>
              <span>INTELLIGENT AUTOMATION SYSTEMS</span>
            </div>

          </div>

          {/* Right Column: Japanese Label and Metric Cards */}
          <div className="flex flex-col justify-between items-end text-right gap-8 lg:gap-0 relative z-20">
            
            {/* Top Japanese Accent Label */}
            <div className="flex flex-col items-end gap-1 select-none">
              <span className="text-2xl font-black tracking-[0.2em] text-white">シンセ</span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-500">INTELLIGENT AUTOMATION SYSTEMS</span>
            </div>

            {/* Metrics cards vertical stack */}
            <div className="flex flex-col gap-4 w-full sm:w-auto">
              
              {/* Card 1: Systems deployed */}
              <div className="w-full sm:w-[170px] bg-black/70 border border-red-500/15 hover:border-red-500/35 rounded-xl p-5 flex flex-col items-end gap-1.5 backdrop-blur-md transition-all duration-300 group/metric cursor-pointer">
                {/* Robot icon */}
                <div className="text-red-500 group-hover/metric:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <circle cx="8" cy="16" r="1" />
                    <circle cx="16" cy="16" r="1" />
                    <path d="M9 2h6M12 2v3M8 6h8v5H8z" />
                  </svg>
                </div>
                <span className="text-2xl font-black text-white font-mono tracking-tight">
                  <Counter value={120} suffix="+" />
                </span>
                <div className="text-[8px] font-bold text-neutral-500 tracking-widest flex flex-col items-end leading-none">
                  <span>SYSTEMS</span>
                  <span className="mt-0.5">DEPLOYED</span>
                </div>
              </div>

              {/* Card 2: Hours saved */}
              <div className="w-full sm:w-[170px] bg-black/70 border border-red-500/15 hover:border-red-500/35 rounded-xl p-5 flex flex-col items-end gap-1.5 backdrop-blur-md transition-all duration-300 group/metric cursor-pointer">
                {/* Clock icon */}
                <div className="text-red-500 group-hover/metric:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <span className="text-2xl font-black text-white font-mono tracking-tight">
                  <Counter value={20} suffix="K+" />
                </span>
                <div className="text-[8px] font-bold text-neutral-500 tracking-widest flex flex-col items-end leading-none">
                  <span>HOURS</span>
                  <span className="mt-0.5">AUTOMATED</span>
                </div>
              </div>

              {/* Card 3: Happy clients */}
              <div className="w-full sm:w-[170px] bg-black/70 border border-red-500/15 hover:border-red-500/35 rounded-xl p-5 flex flex-col items-end gap-1.5 backdrop-blur-md transition-all duration-300 group/metric cursor-pointer">
                {/* Handshake icon */}
                <div className="text-red-500 group-hover/metric:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="text-2xl font-black text-white font-mono tracking-tight">
                  <Counter value={60} suffix="+" />
                </span>
                <div className="text-[8px] font-bold text-neutral-500 tracking-widest flex flex-col items-end leading-none">
                  <span>HAPPY</span>
                  <span className="mt-0.5">CLIENTS</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Cyberpunk overlays */}
      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay 
            isOpen={menuOpen} 
            onClose={() => setMenuOpen(false)} 
            onNavigate={scrollToSection} 
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {modalOpen && (
          <ContactModal 
            isOpen={modalOpen} 
            onClose={() => setModalOpen(false)} 
            type={modalType} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}
