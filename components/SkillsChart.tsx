'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { IconType } from 'react-icons';
import { 
  SiReact, 
  SiTypescript, 
  SiNodedotjs, 
  SiThreedotjs,
  SiNextdotjs,
  SiPython,
  SiUnity,
  SiCsharp,
  SiHtml5,
  SiBlender,
  SiCss3,
  SiJavascript,
  SiCplusplus,
  SiOpenjdk,
  SiFlutter
} from 'react-icons/si';

interface Skill {
  name: string;
  level: number;
  color: string;
  Icon: IconType;
  projects: number;
  description: string;
  category: 'frontend' | 'backend' | 'tools' | 'cloud';
  features: string[];
}

const skills: Skill[] = [
  { 
    name: 'React', 
    level: 90, 
    color: '#61DAFB',
    Icon: SiReact,
    projects: 15,
    description: 'Building modern web applications with React and Next.js',
    category: 'frontend',
    features: ['Hooks', 'Context', 'Redux', 'Performance Optimization']
  },
  { 
    name: 'TypeScript', 
    level: 85, 
    color: '#3178C6',
    Icon: SiTypescript,
    projects: 12,
    description: 'Type-safe development across the stack',
    category: 'frontend',
    features: ['Type Systems', 'Generics', 'Decorators', 'Advanced Types']
  },
  { 
    name: 'Node.js', 
    level: 80, 
    color: '#339933',
    Icon: SiNodedotjs,
    projects: 10,
    description: 'Server-side development and API creation',
    category: 'backend',
    features: ['Express', 'REST APIs', 'GraphQL', 'Microservices']
  },
  { 
    name: 'Three.js', 
    level: 75, 
    color: '#000000',
    Icon: SiThreedotjs,
    projects: 5,
    description: '3D graphics and interactive experiences',
    category: 'tools',
    features: ['WebGL', '3D Modeling', 'Animations', 'Shaders']
  },
  {
    name: 'Next.js',
    level: 88,
    color: '#000000',
    Icon: SiNextdotjs,
    projects: 8,
    description: 'Full-stack React framework for production',
    category: 'frontend',
    features: ['SSR', 'Static Generation', 'API Routes', 'Image Optimization']
  },
  {
    name: 'Python',
    level: 82,
    color: '#3776AB',
    Icon: SiPython,
    projects: 7,
    description: 'Backend development and data processing',
    category: 'backend',
    features: ['Django', 'FastAPI', 'Data Analysis', 'Automation']
  },
  {
    name: 'Unity',
    level: 85,
    color: '#000000',
    Icon: SiUnity,
    projects: 8,
    description: 'Game development and interactive experiences',
    category: 'tools',
    features: ['2D/3D Games', 'Physics', 'Animation', 'Scripting']
  },
  {
    name: 'C#',
    level: 83,
    color: '#239120',
    Icon: SiCsharp,
    projects: 10,
    description: 'Game development and application programming',
    category: 'backend',
    features: ['.NET', 'Unity Development', 'LINQ', 'Async Programming']
  },
  {
    name: 'HTML',
    level: 95,
    color: '#E34F26',
    Icon: SiHtml5,
    projects: 20,
    description: 'Semantic markup and web structure',
    category: 'frontend',
    features: ['Semantic Elements', 'Accessibility', 'Forms', 'SEO']
  },
  {
    name: 'Blender',
    level: 75,
    color: '#F5792A',
    Icon: SiBlender,
    projects: 5,
    description: '3D modeling and animation',
    category: 'tools',
    features: ['Modeling', 'Texturing', 'Animation', 'Rendering']
  },
  {
    name: 'CSS',
    level: 92,
    color: '#1572B6',
    Icon: SiCss3,
    projects: 18,
    description: 'Styling and responsive design',
    category: 'frontend',
    features: ['Flexbox', 'Grid', 'Animations', 'Responsive Design']
  },
  {
    name: 'JavaScript',
    level: 88,
    color: '#F7DF1E',
    Icon: SiJavascript,
    projects: 15,
    description: 'Dynamic web development',
    category: 'frontend',
    features: ['ES6+', 'DOM Manipulation', 'Async/Await', 'Web APIs']
  },
  {
    name: 'C++',
    level: 78,
    color: '#00599C',
    Icon: SiCplusplus,
    projects: 6,
    description: 'Systems programming and game development',
    category: 'backend',
    features: ['OOP', 'STL', 'Memory Management', 'Templates']
  },
  {
    name: 'Java',
    level: 80,
    color: '#007396',
    Icon: SiOpenjdk,
    projects: 7,
    description: 'Enterprise applications and Android development',
    category: 'backend',
    features: ['Spring Boot', 'Android', 'Collections', 'Multithreading']
  },
  {
    name: 'Flutter',
    level: 76,
    color: '#02569B',
    Icon: SiFlutter,
    projects: 4,
    description: 'Cross-platform mobile development',
    category: 'frontend',
    features: ['Widgets', 'State Management', 'Material Design', 'Native Integration']
  }
];

const categories = [
  { id: 'all', name: 'All Skills', color: '#6366F1' },
  { id: 'frontend', name: 'Frontend', color: '#EC4899' },
  { id: 'backend', name: 'Backend', color: '#10B981' },
  { id: 'tools', name: 'Tools', color: '#F59E0B' }
];

export default function SkillsChart() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Category Selection */}
      <div className="flex flex-wrap gap-4 mb-12 justify-center">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all
              ${selectedCategory === category.id 
                ? 'bg-gradient-to-r from-white/20 to-white/10 shadow-lg' 
                : 'bg-white/5 hover:bg-white/10'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            style={{
              borderLeft: selectedCategory === category.id 
                ? `4px solid ${category.color}` 
                : '4px solid transparent'
            }}
          >
            <span className="text-white">{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              layoutId={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-xl 
                        cursor-pointer hover:shadow-xl transition-all duration-300
                        border border-white/10 hover:border-white/20"
              onClick={() => setSelectedSkill(skill)}
            >
              <div className="flex items-center gap-4 mb-6">
                <skill.Icon 
                  className="text-4xl transition-all duration-300 group-hover:scale-110"
                  style={{ color: skill.color }} 
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                  <p className="text-sm text-white/60">{skill.category}</p>
                </div>
              </div>
              
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                />
              </div>

              <div className="flex justify-between text-sm text-white/60">
                <span>{skill.projects} Projects</span>
                <span>{skill.level}% Proficiency</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Enhanced Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-white/20 to-white/10 p-8 rounded-2xl 
                        backdrop-blur-xl max-w-3xl w-full mx-4 border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-6 mb-8">
                <selectedSkill.Icon 
                  className="text-6xl"
                  style={{ color: selectedSkill.color }} 
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-2">{selectedSkill.name}</h3>
                  <p className="text-white/70 text-lg">{selectedSkill.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                  {selectedSkill.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedSkill.color }} />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="aspect-square w-full bg-black/30 rounded-lg overflow-hidden">
                  <Canvas>
                    <OrbitControls autoRotate />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <mesh>
                      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                      <meshStandardMaterial color={selectedSkill.color} metalness={0.7} roughness={0.2} />
                    </mesh>
                  </Canvas>
                </div>
              </div>

              <button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-900 to-red-800 
                          hover:from-red-800 hover:to-red-700 transition-all duration-300"
                onClick={() => setSelectedSkill(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 