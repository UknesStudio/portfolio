'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { SiGithub, SiLinkedin, SiGmail } from 'react-icons/si';

const DOCK_ITEMS = [
  { icon: SiGithub, href: 'https://github.com/UknesStudio', label: 'GitHub' },
  { icon: SiLinkedin, href: 'https://www.linkedin.com/in/rayane-makrane-a16377293/', label: 'LinkedIn' },
  { icon: SiGmail, href: 'mailto:rayanemakrane2@gmail.com', label: 'Email' }
];

const DockIcon = ({ mouseX, icon: Icon, href, label }: {
  mouseX: any;
  icon: React.ElementType;
  href: string;
  label: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ width }}
      className="aspect-square flex items-center justify-center bg-white/10 rounded-xl 
                 backdrop-blur-md border border-white/20 hover:border-white/40 transition-colors
                 group relative"
    >
      <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
      <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity
                     text-sm text-white bg-black/50 px-2 py-1 rounded">
        {label}
      </span>
    </motion.a>
  );
};

export default function DockMenu() {
  const mouseX = useMotionValue(Infinity);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.8, 0.9], // Adjust these values to control when the dock starts fading
    [1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 flex gap-4 
                 bg-white/5 rounded-2xl backdrop-blur-lg border border-white/10
                 z-50"
    >
      {DOCK_ITEMS.map((item) => (
        <DockIcon
          key={item.label}
          mouseX={mouseX}
          icon={item.icon}
          href={item.href}
          label={item.label}
        />
      ))}
    </motion.div>
  );
} 