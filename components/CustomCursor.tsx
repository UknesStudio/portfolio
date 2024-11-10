'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 
                 'ontouchstart' in window ||
                 navigator.maxTouchPoints > 0);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsPointer((e.target as HTMLElement).tagName === 'A' || 
                   (e.target as HTMLElement).tagName === 'BUTTON');
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 bg-red-900 rounded-full pointer-events-none z-50"
        animate={{ x: position.x - 8, y: position.y - 8 }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
      />
      <motion.div
        className="fixed w-8 h-8 border border-red-900 rounded-full pointer-events-none z-50"
        animate={{ 
          x: position.x - 16, 
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1 
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 40 }}
      />
    </>
  );
} 