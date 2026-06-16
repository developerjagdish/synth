"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ContactModalProps {
  isOpen?: boolean;
  onClose: () => void;
  type: "project" | "call";
}

export function ContactModal({ isOpen, onClose, type }: ContactModalProps) {
  const [formState, setFormState] = useState({ name: "", email: "", details: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setFormState({ name: "", email: "", details: "" });
      // Prevent scrolling of background page when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 2000); // 2-second mock network request transmission
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-red-500/30 bg-neutral-950 p-8 shadow-[0_0_50px_rgba(239,68,68,0.15)] md:p-10"
      >
        {/* Cyberpunk accent corner brackets */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-red-500/80" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-red-500/80" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-red-500/80" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-red-500/80" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-neutral-500 hover:text-white transition-colors cursor-pointer text-xs font-bold font-mono tracking-widest"
        >
          [CLOSE]
        </button>

        {status === "idle" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-[1px] block animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500">
                  {type === "project" ? "SYSTEM INITIATION" : "DISCOVERY SYNC"}
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-white tracking-tight">
                {type === "project" ? "START YOUR PROJECT" : "BOOK A SYNC CALL"}
              </h2>
              <p className="mt-2 text-xs text-neutral-400">
                Establish a secure channel. Submit details to sync automation operations.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold tracking-[0.2em] text-neutral-500 uppercase">IDENTIFIER (NAME)</label>
              <input
                required
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                placeholder="Agent Name / Company"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold tracking-[0.2em] text-neutral-500 uppercase">COMMUNICATION NODE (EMAIL)</label>
              <input
                required
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                placeholder="name@domain.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
                {type === "project" ? "OPERATIONAL DETAILS" : "SYNC OBJECTIVES"}
              </label>
              <textarea
                rows={4}
                value={formState.details}
                onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                placeholder={type === "project" ? "What processes do you want automated?" : "What are you hoping to build or optimize?"}
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-gradient-to-r from-red-950/40 via-red-900/35 to-red-950/40 border-2 border-red-500 text-white font-extrabold tracking-[0.2em] text-xs py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.45)] transition-all duration-300 cursor-pointer"
            >
              <span>TRANSMIT DETAILS</span>
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>
        )}

        {status === "submitting" && (
          <div className="flex flex-col items-center justify-center py-12 gap-6 min-h-[300px]">
            {/* Spinning/pulsing radar/node animation */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-red-500/35 border-t-red-500 animate-spin" />
              <div className="absolute w-10 h-10 rounded-full border border-red-500/15 animate-ping" />
              <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_12px_#ef4444]" />
            </div>
            
            <div className="text-center">
              <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase animate-pulse">TRANSMITTING OPERATION</h3>
              <p className="mt-2 text-xs text-neutral-500">Establishing handshake with secure SYNTH servers...</p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center justify-center py-12 gap-6 text-center min-h-[300px]">
            {/* Static secure success shield/globe SVG */}
            <div className="w-16 h-16 rounded-full bg-red-950/20 border border-red-500 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.25)]">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>

            <div>
              <h3 className="text-xl font-black text-white tracking-tight">TRANSMISSION SUCCESSFUL</h3>
              <p className="mt-1.5 text-xs text-red-500 font-bold tracking-[0.15em] uppercase">SECURE NODE ESTABLISHED</p>
              <p className="mt-4 text-xs text-neutral-400 max-w-xs leading-relaxed mx-auto">
                Handshake complete. Your project details have been successfully synced. I will respond to your node shortly.
              </p>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-neutral-900 border border-neutral-800 text-white hover:border-red-500/30 font-bold tracking-[0.2em] text-[10px] rounded-lg transition-all cursor-pointer"
            >
              DISCONNECT SESSION
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
