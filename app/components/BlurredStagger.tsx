"use client";

import * as React from "react";
import { motion } from "motion/react";

export const BlurredStagger = ({
  text = "",
  className = "text-base",
}: {
  text: string;
  className?: string;
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.012,
      },
    },
  };

  const letterAnimation = {
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

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterAnimation}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
