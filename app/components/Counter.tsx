"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";

interface CounterProps {
  value: number;
  duration?: number; // in seconds
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({
  value,
  duration = 1.5,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const easeOutQuad = (t: number) => t * (2 - t);

    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const current = start + (end - start) * progress;

      setCount(current);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, value, duration]);

  const formattedCount = count.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}
