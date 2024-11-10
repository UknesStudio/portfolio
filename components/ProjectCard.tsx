'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

export default function ProjectCard({ title, description, image, technologies, link }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile only after component mounts (client-side)
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="relative h-72 md:h-96 rounded-xl overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
        initial={{ y: 60, opacity: 0 }}
        animate={{ 
          y: isHovered || isMobile ? 0 : 60, 
          opacity: 1 
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">{description}</p>
        <div className="flex gap-2 flex-wrap mb-3 md:mb-4">
          {technologies.map((tech) => (
            <span key={tech} className="text-sm md:text-base bg-red-950 text-white px-2 md:px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <a href={link} className="text-sm md:text-base text-red-700 hover:text-red-500 transition-colors">
          View Project
        </a>
      </motion.div>
    </motion.div>
  );
} 