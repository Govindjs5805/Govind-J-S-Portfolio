import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, Layers, Wrench, Brain,
  Boxes, Database, MonitorCog, Network, PenTool,
  Code2, Globe, Server, Cpu, GitBranch,
  Flame, Cloud, Triangle, BookOpen,
  BarChart2, Atom, Braces, Binary, Zap,
} from 'lucide-react';
import SectionTitle from './SectionTitle';

const skillGroups = [
  {
    icon: Terminal,
    title: 'Languages',
    items: [
      { name: 'Python',     level: 90, Icon: Code2    },
      { name: 'JavaScript', level: 85, Icon: Binary   },
      { name: 'Java',       level: 75, Icon: Braces   },
      { name: 'C/C++',      level: 70, Icon: Cpu      },
      { name: 'SQL',        level: 80, Icon: Database },
      { name: 'HTML',       level: 95, Icon: Globe    },
      { name: 'CSS',        level: 90, Icon: PenTool  },
    ],
  },
  {
    icon: Layers,
    title: 'Frameworks',
    items: [
      { name: 'React',       level: 88, Icon: Atom     },
      { name: 'Tailwind',    level: 92, Icon: Layers   },
      { name: 'Pandas',      level: 78, Icon: BarChart2},
      { name: 'NumPy',       level: 75, Icon: BarChart2},
      { name: 'Scikit-Learn',level: 72, Icon: Brain    },
    ],
  },
  {
    icon: Wrench,
    title: 'Tools',
    items: [
      { name: 'GitHub',  level: 90, Icon: GitBranch },
      { name: 'Firebase',level: 85, Icon: Flame     },
      { name: 'Figma',   level: 80, Icon: PenTool   },
      { name: 'VS Code', level: 95, Icon: Zap       },
      { name: 'Vercel',  level: 85, Icon: Triangle  },
      { name: 'Jupyter', level: 78, Icon: BookOpen  },
      { name: 'PyCharm', level: 75, Icon: Server    },
      { name: 'Canva',   level: 82, Icon: Cloud     },
    ],
  },
  {
    icon: Brain,
    title: 'Concepts',
    items: [
      { name: 'OOPS',            level: 88, Icon: Boxes      },
      { name: 'DBMS',            level: 82, Icon: Database   },
      { name: 'Data Structures', level: 85, Icon: Binary     },
      { name: 'OS',              level: 78, Icon: MonitorCog },
      { name: 'Networks',        level: 75, Icon: Network    },
    ],
  },
];

/* ── ANIMATED COUNTER ── */
function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(target * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
}

/* ── SKILL CARD ── */
function SkillCard({ skill, index, isSelected, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const { name, level, Icon } = skill;
  const displayLevel = useCountUp(isSelected || isHovered ? level : 0, 800);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        delay: index * 0.03,
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative cursor-pointer rounded-2xl p-6 transition-all duration-500 ${
        isSelected 
          ? 'bg-gradient-to-br from-mint-500/10 to-emerald-500/10 ring-2 ring-mint-500/50 shadow-lg shadow-mint-500/10' 
          : 'glass hover:shadow-xl'
      }`}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(34,197,94,0.1), transparent 70%)',
        }}
      />

      {/* Icon */}
      <motion.div
        animate={{
          scale: isSelected || isHovered ? 1.1 : 1,
          rotate: isSelected || isHovered ? 5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="relative w-14 h-14 mb-4 rounded-xl bg-mint-500/10 flex items-center justify-center"
      >
        <Icon 
          size={28} 
          className={`transition-colors duration-300 ${
            isSelected || isHovered ? 'text-mint-500' : 'text-gray-400 dark:text-gray-500'
          }`}
        />
      </motion.div>

      {/* Name */}
      <h3 className={`font-semibold text-lg mb-3 transition-colors duration-300 ${
        isSelected || isHovered 
          ? 'text-mint-600 dark:text-mint-400' 
          : 'text-gray-800 dark:text-gray-200'
      }`}>
        {name}
      </h3>

      {/* Level indicator */}
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <span className="text-xs font-mono text-gray-500">Proficiency</span>
          <motion.span 
            className="text-2xl font-bold font-mono tabular-nums text-mint-500"
            animate={{ 
              scale: isSelected || isHovered ? [1, 1.1, 1] : 1 
            }}
            transition={{ duration: 0.3 }}
          >
            {displayLevel}
          </motion.span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ 
              duration: 1.2, 
              delay: index * 0.03,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="h-full bg-gradient-to-r from-mint-600 to-mint-400 rounded-full relative"
          >
            {/* Moving shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ 
                duration: 2,
                delay: index * 0.05 + 0.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        </div>

        {/* Level dots */}
        <div className="flex gap-1 pt-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                backgroundColor: level >= (i + 1) * 20 
                  ? 'rgb(34, 197, 94)' 
                  : 'rgb(0, 0, 0, 0.05)'
              }}
              transition={{ 
                delay: index * 0.03 + i * 0.05,
                type: 'spring',
                stiffness: 400,
                damping: 25
              }}
              className="w-1.5 h-1.5 rounded-full dark:bg-white/5"
            />
          ))}
        </div>
      </div>

      {/* Selection indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="absolute -top-2 -right-2 w-7 h-7 bg-mint-500 rounded-full flex items-center justify-center shadow-lg shadow-mint-500/50"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── MAIN COMPONENT ── */
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const currentGroup = skillGroups[activeCategory];

  // Reset selection when category changes
  useEffect(() => {
    setSelectedSkill(null);
  }, [activeCategory]);

  return (
    <section id="skills" className="py-28 px-6 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint-500/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle 
          eyebrow="WHAT I WORK WITH" 
          title="Skills & Tools" 
          center 
        />

        {/* Category Navigation */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            const isActive = activeCategory === idx;
            
            return (
              <motion.button
                key={group.title}
                onClick={() => setActiveCategory(idx)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative group"
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-mint-500 rounded-2xl"
                    transition={{ 
                      type: 'spring', 
                      stiffness: 350, 
                      damping: 30 
                    }}
                  />
                )}
                
                {/* Button content */}
                <span className={`relative flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold transition-colors duration-300 ${
                  isActive 
                    ? 'text-white' 
                    : 'glass text-gray-600 dark:text-gray-300'
                }`}>
                  <Icon size={18} />
                  {group.title}
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full transition-colors ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-black/5 dark:bg-white/10 text-gray-500'
                  }`}>
                    {group.items.length}
                  </span>
                </span>

                {/* Hover glow effect */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.08), transparent 70%)',
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {currentGroup.items.map((skill, idx) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={idx}
                isSelected={selectedSkill?.name === skill.name}
                onClick={() => setSelectedSkill(
                  selectedSkill?.name === skill.name ? null : skill
                )}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Minimal instruction hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-400 dark:text-gray-500 mt-12 font-mono"
        >
        </motion.p>
      </div>
    </section>
  );
}