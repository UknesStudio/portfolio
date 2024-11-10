'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Typed from 'typed.js';
import ProjectCard from './ProjectCard';
import SkillsOrbit from './SkillsOrbit';
import DockMenu from './DockMenu';
import AvailabilityStatus from './AvailabilityStatus';
import HyperText, { HyperTextRef } from './ui/hyper-text';
import CopyButton from './ui/copy-button';

const Scene = dynamic(() => import('./Scene'), { ssr: false });
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false });

export default function HomePage() {
  const containerRef = useRef(null);
  const typedRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const hyperTextRef = useRef<HyperTextRef>(null);
  
  const headerY = useTransform(scrollYProgress, [0, 0.2], ['0%', '100%']);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Full Stack Developer',
        '<span style="background: linear-gradient(to right, #FF6B6B, #FF8E53); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">UI/UX Designer</span>',
        '<span class="code-font" style="color: #4EC9B0">printf</span><span class="code-font" style="color: #D4D4D4">(</span><span class="code-font" style="color: #CE9178">"Creative Coder"</span><span class="code-font" style="color: #D4D4D4">);</span>',
        '<span class="arcade-font">Game Developer</span>'
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      contentType: 'html'
    });

    return () => typed.destroy();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-black overflow-hidden relative">
      {/* Hero Section */}
      <motion.div 
        style={{ y: headerY, opacity: headerOpacity }}
        className="h-screen relative"
        id="hero"
      >
        <Canvas 
          className="absolute top-0 left-0 w-full h-full"
          camera={{ position: [0, 0, 25], fov: 75 }}
          dpr={[1, 2]}
        >
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Scene />
        </Canvas>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.h1 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-8xl font-bold mb-4 text-white"
          >
            Rayane Makrane
          </motion.h1>
          <span ref={typedRef} className="text-xl md:text-3xl text-white text-center"></span>
        </div>
      </motion.div>

      {/* Projects Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, margin: "-100px" }}
        className="min-h-screen p-4 md:p-20 bg-black"
        id="projects"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-white">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <ProjectCard
            title="One Night At The Shack"
            description="Horror game made with Unity"
            image="/projects/shack.jpg"
            technologies={['Unity', 'C#']}
            link="https://store.steampowered.com/app/3109540/One_Night_At_The_Shack/"
          />
          <ProjectCard
            title="SmartStock"
            description="Stock market application made with Flutter"
            image="/projects/smartstock.jpg"
            technologies={['Flutter', 'Dart']}
            link="https://github.com/UknesStudio/SmartStock"
          />
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, margin: "-100px" }}
        className="min-h-screen p-4 md:p-20 bg-black"
        id="skills"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-white">Skills</h2>
        <SkillsOrbit />
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, margin: "-100px" }}
        className="min-h-screen p-4 md:p-20 bg-black"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-white">Let&apos;s Connect</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 p-8 rounded-xl border border-white/10"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all text-white"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 bg-gradient-to-r from-red-900 to-red-700 text-white rounded-lg font-medium hover:from-red-800 hover:to-red-600 transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Get in Touch</h3>
              <p className="text-gray-300 mb-4">
                I'm always open to new opportunities and interesting projects. 
                Let's create something amazing together!
              </p>
              <AvailabilityStatus status="available" />
              <div className="flex flex-col gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-2 bg-white/5 rounded-lg"
                  >
                    <span className="text-sm font-medium">Preferred Time Zone:</span>
                    <span className="ml-2 text-white">GMT+1 (CET)</span>
                  </motion.div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-2 bg-white/5 rounded-lg"
                  >
                    <span className="text-sm font-medium">Response Time:</span>
                    <span className="ml-2 text-white">Within 24 hours</span>
                  </motion.div>
                </div>
              </div>
            </div>

            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <a href="mailto:rayanmakrane2@gmail.com" className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <HyperText 
                    ref={hyperTextRef}
                    text="rayanmakrane2@gmail.com"
                    className="text-inherit"
                    duration={100}
                  />
                </a>
                <CopyButton 
                  textToCopy="rayanmakrane2@gmail.com" 
                  onCopy={() => hyperTextRef.current?.triggerAnimation()}
                />
              </div>
              <a href="https://github.com/UknesStudio" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
                <span>GITHUB</span>
              </a>
              <a href="https://www.linkedin.com/in/rayane-makrane-a16377293/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LINKEDIN</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <DockMenu />
    </div>
  );
} 