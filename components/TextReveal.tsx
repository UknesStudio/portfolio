import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import React from 'react';
import { useEffect, useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-1 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i + delay}
          variants={variants}
          initial="hidden"
          animate={controls}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
} 