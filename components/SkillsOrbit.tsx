'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { SiCss3, SiHtml5, SiJavascript, SiNextdotjs, SiNodedotjs, SiReact, SiTypescript, SiUnity, SiFlutter, SiKotlin, SiSwift, SiCplusplus, SiCsharp, SiBlender } from "react-icons/si";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { motion, AnimatePresence } from 'framer-motion';
// ... rest of imports

type SkillCategory = 'web' | 'game' | 'mobile';

const buttonVariants = {
  initial: { 
    scale: 0.9,
    opacity: 0 
  },
  animate: (index: number) => ({ 
    scale: 1,
    opacity: 1,
    transition: {
      delay: index * 0.15,
      type: "spring",
      stiffness: 200,
      damping: 12
    }
  }),
  exit: { 
    scale: 0.9,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const SkillIcon = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  useEffect(() => {
    if (ref && 'current' in ref ){
    if (!ref?.current) return;
    const element = ref.current;

    if (!element) return;

    const animate = () => {
      const x = Math.random() * 20 - 10; // Random value between -10px and 10px
      const y = Math.random() * 20 - 10;
      const duration = 2 + Math.random() * 2; // Random duration between 2-4s

      element.style.transition = `transform ${duration}s ease-in-out`;
      element.style.transform = `translate(${x}px, ${y}px)`;
    };

    animate();
    const interval = setInterval(animate, 4000); // Change position every 4 seconds

    return () => clearInterval(interval);
}
  }, [ref]);

  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

SkillIcon.displayName = "SkillIcon";

export default function SkillsOrbit() {
  const [category, setCategory] = useState<SkillCategory>('web');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const div1Ref = useRef<HTMLDivElement | null>(null);
  const div2Ref = useRef<HTMLDivElement | null>(null);
  const div3Ref = useRef<HTMLDivElement | null>(null);
  const div4Ref = useRef<HTMLDivElement | null>(null);
  const div5Ref = useRef<HTMLDivElement | null>(null);
  const div6Ref = useRef<HTMLDivElement | null>(null);

  const skillsData = {
    web: {
      center: { icon: SiJavascript, color: '#F7DF1E' },
      skills: [
        { icon: SiReact, color: '#61DAFB' },
        { icon: SiTypescript, color: '#3178C6' },
        { icon: SiNextdotjs, color: '#000000' },
        { icon: SiNodedotjs, color: '#339933' },
        { icon: SiHtml5, color: '#E34F26' },
        { icon: SiCss3, color: '#1572B6' },
      ]
    },
    game: {
      center: { icon: SiUnity, color: '#000000' },
      skills: [
        { icon: SiCsharp, color: '#239120' },
        { icon: SiBlender, color: '#F5792A' },
        { icon: SiCplusplus, color: '#00599C' },
      ]
    },
    mobile: {
      center: { icon: SiFlutter, color: '#02569B' },
      skills: [
        { icon: SiKotlin, color: '#7F52FF' },
        { icon: SiSwift, color: '#F05138' },
        { icon: SiReact, color: '#61DAFB' },
      ]
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col sm:flex-row gap-4 p-1 max-w-[320px] sm:max-w-none mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            className="flex flex-col sm:flex-row gap-4"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {[
              { id: 'web', icon: SiJavascript, label: 'Web Development', iconColor: '#F7DF1E' },
              { id: 'game', icon: SiUnity, label: 'Game Development', iconColor: '#000000' },
              { id: 'mobile', icon: SiFlutter, label: 'Mobile Development', iconColor: '#02569B' }
            ].map((item, index) => (
              <motion.div
                key={item.id}
                variants={buttonVariants}
                custom={index}
              >
                <RainbowButton
                  onClick={() => setCategory(item.id as SkillCategory)}
                  className={cn(
                    "px-6 py-3 font-medium transition-all duration-2000",
                    category === item.id 
                      ? "!bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(255,255,255,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] !text-black" 
                      : "opacity-80 hover:opacity-100"
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <item.icon className={`text-[${item.iconColor}]`} />
                    {item.label}
                  </div>
                </RainbowButton>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div 
        className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg p-10 md:shadow-xl"
        ref={containerRef}
      >
        <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
          {category === 'game' ? (
            // Special layout for game development
            <>
              <div className="flex flex-row items-center justify-between">
                {skillsData[category].skills.slice(0, 2).map((skill, index) => (
                  <SkillIcon key={index} ref={[div1Ref, div2Ref][index]}>
                    <skill.icon size={24} style={{ color: skill.color }} />
                  </SkillIcon>
                ))}
              </div>
              
              <div className="flex flex-row items-center justify-center">
                <SkillIcon ref={centerRef} className="size-16">
                  {React.createElement(skillsData[category].center.icon, {
                    size: 32,
                    style: { color: skillsData[category].center.color }
                  })}
                </SkillIcon>
              </div>

              <div className="flex flex-row items-center justify-center">
                <SkillIcon ref={div3Ref}>
                  {React.createElement(skillsData[category].skills[2].icon, {
                    size: 24,
                    style: { color: skillsData[category].skills[2].color }
                  })}
                </SkillIcon>
              </div>
            </>
          ) : (
            // Original layout for web and mobile
            <>
              <div className="flex flex-row items-center justify-between">
                {skillsData[category].skills.slice(0, 2).map((skill, index) => (
                  <SkillIcon key={index} ref={[div1Ref, div5Ref][index]}>
                    <skill.icon size={24} style={{ color: skill.color }} />
                  </SkillIcon>
                ))}
              </div>
              
              <div className="flex flex-row items-center justify-between">
                {skillsData[category].skills.slice(2, 3).map((skill, index) => (
                  <SkillIcon key={index} ref={div2Ref}>
                    <skill.icon size={24} style={{ color: skill.color }} />
                  </SkillIcon>
                ))}
                <SkillIcon ref={centerRef} className="size-16">
                  {React.createElement(skillsData[category].center.icon, {
                    size: 32,
                    style: { color: skillsData[category].center.color }
                  })}
                </SkillIcon>
                {skillsData[category].skills.slice(3, 4).map((skill, index) => (
                  <SkillIcon key={index} ref={div6Ref}>
                    <skill.icon size={24} style={{ color: skill.color }} />
                  </SkillIcon>
                ))}
              </div>

              <div className="flex flex-row items-center justify-between">
                {skillsData[category].skills.slice(4, 6).map((skill, index) => (
                  <SkillIcon key={index} ref={[div3Ref, div4Ref][index]}>
                    <skill.icon size={24} style={{ color: skill.color }} />
                  </SkillIcon>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Web Development Beams */}
        {category === 'web' && (
          <>
            {/* React to Center */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={centerRef}
                duration={3}
                curvature={-75}
                endYOffset={-10}
            />

            {/* TypeScript to Center */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={centerRef}
            />

            {/* Next.js to Center */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={centerRef}
                curvature={75}
                endYOffset={10}
            />

            {/* HTML to Center */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={centerRef}
                curvature={-75}
                endYOffset={-10}
                reverse
            />

            {/* CSS to Center */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={centerRef}
                reverse
            />

            {/* Node.js to Center */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={centerRef}
                curvature={75}
                endYOffset={10}
                reverse
            />

          </>
        )}

        {/* Game Development Beams */}
        {category === 'game' && (
          <>
            {/* C# to Unity */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={centerRef}
              curvature={-75}
              endYOffset={-10}
              className="animate-pulse"
            />
            {/* Blender to Unity */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div2Ref}
              toRef={centerRef}
              duration={4}
              reverse
            />
            {/* C++ to Unity */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div3Ref}
              toRef={centerRef}
              curvature={75}
              endYOffset={10}
              className="animate-pulse"
              reverse
            />
            {/* C# to C++ */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={div3Ref}
              curvature={50}
              className="opacity-30"
            />
            {/* Blender to C++ */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div2Ref}
              toRef={div3Ref}
              curvature={-30}
              className="opacity-30"
            />
          </>
        )}

        {/* Mobile Development Beams */}
        {category === 'mobile' && (
          <>
            {/* Kotlin to Flutter */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={centerRef}
              curvature={-75}
              endYOffset={-10}
              className="animate-pulse"
            />
            {/* Swift to Flutter */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div2Ref}
              toRef={centerRef}
              duration={4}
              reverse
            />
            {/* React Native to Flutter */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div3Ref}
              toRef={centerRef}
              curvature={75}
              endYOffset={10}
              className="animate-pulse"
              reverse
            />
            {/* Kotlin to Swift */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={div2Ref}
              curvature={50}
              className="opacity-30"
            />
            {/* React Native to Swift */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div3Ref}
              toRef={div2Ref}
              curvature={-30}
              className="opacity-30"
            />
          </>
        )}
      </div>
    </div>
  );
} 