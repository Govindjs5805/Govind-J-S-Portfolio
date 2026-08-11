import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
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

/* ── RADAR CHART ── */
function RadarChart({ items }) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 78;
  const levels = [0.25, 0.5, 0.75, 1];
  const total = items.length;

  const angleFor = (i) => (i / total) * 2 * Math.PI - Math.PI / 2;

  const pt = (i, r) => {
    const a = angleFor(i);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  const skillPath = items
    .map((item, i) => {
      const r = (item.level / 100) * maxR;
      const p = pt(i, r);
      return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`;
    })
    .join(' ') + 'Z';

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
    >
      {/* grid rings */}
      {levels.map((l, li) => {
        const pts = items.map((_, i) => pt(i, maxR * l));
        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';
        return (
          <path
            key={li}
            d={d}
            fill="none"
            stroke="rgba(34,197,94,0.12)"
            strokeWidth="1"
          />
        );
      })}

      {/* spokes */}
      {items.map((_, i) => {
        const p = pt(i, maxR);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={p.x} y2={p.y}
            stroke="rgba(34,197,94,0.15)"
            strokeWidth="1"
          />
        );
      })}

      {/* filled skill area */}
      <motion.path
        key={skillPath}
        d={skillPath}
        fill="rgba(34,197,94,0.12)"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      {/* dots at each vertex */}
      {items.map((item, i) => {
        const r = (item.level / 100) * maxR;
        const p = pt(i, r);
        return (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3.5}
            fill="#22c55e"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.05 }}
          />
        );
      })}

      {/* labels */}
      {items.map((item, i) => {
        const p = pt(i, maxR + 18);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="7.5"
            fontFamily="JetBrains Mono, monospace"
            fill="rgba(156,163,175,0.9)"
          >
            {item.name.length > 8 ? item.name.slice(0, 7) + '…' : item.name}
          </text>
        );
      })}
    </svg>
  );
}

/* ── SINGLE SKILL ROW ── */
function SkillRow({ item, index, isHovered, onHover, onLeave }) {
  const { name, level, Icon } = item;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ delay: index * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative flex items-center gap-4 cursor-default"
    >
      {/* icon bubble */}
      <motion.div
        animate={isHovered
          ? { scale: 1.15, backgroundColor: 'rgba(34,197,94,0.2)' }
          : { scale: 1,    backgroundColor: 'rgba(34,197,94,0.06)' }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-mint-500/10"
      >
        <Icon
          size={16}
          className={`transition-colors duration-300 ${
            isHovered ? 'text-mint-500' : 'text-gray-400 dark:text-gray-500'
          }`}
        />
      </motion.div>

      {/* bar + name */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-sm font-medium transition-colors duration-300 ${
            isHovered
              ? 'text-mint-600 dark:text-mint-400'
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {name}
          </span>
          <motion.span
            animate={{ opacity: isHovered ? 1 : 0.35 }}
            className="font-mono text-xs text-mint-500 font-bold ml-3"
          >
            {level}%
          </motion.span>
        </div>

        {/* track */}
        <div className="relative h-[5px] rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
          {/* filled bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1.1, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg,#16a34a,#22c55e,#4ade80)',
            }}
          />

          {/* shimmer */}
          <motion.div
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
            animate={{ x: ['-100%', '700%'] }}
            transition={{
              duration: 2.5,
              delay: index * 0.1 + 0.8,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
          />

          {/* hover glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={isHovered
              ? { boxShadow: '0 0 8px rgba(34,197,94,0.6)' }
              : { boxShadow: 'none' }
            }
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── MAIN COMPONENT ── */
export default function Skills() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const group = skillGroups[active];

  const avg = Math.round(
    group.items.reduce((s, i) => s + i.level, 0) / group.items.length
  );
  const top = [...group.items].sort((a, b) => b.level - a.level)[0];

  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="WHAT I WORK WITH" title="Skills & Toolbox" center />

        {/* ── CATEGORY TABS ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillGroups.map((g, i) => {
            const Icon = g.icon;
            const isActive = active === i;
            return (
              <motion.button
                key={g.title}
                onClick={() => { setActive(i); setHovered(null); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? 'text-ink-950 dark:text-ink-950'
                    : 'glass text-gray-500 dark:text-gray-400 hover:text-mint-600 dark:hover:text-mint-400'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-mint-500 to-emerald-500 shadow-lg shadow-mint-500/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon size={15} className="relative z-10" />
                <span className="relative z-10">{g.title}</span>
                <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-ink-950/15' : 'bg-mint-500/10 text-mint-500'
                }`}>
                  {g.items.length}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ── MAIN PANEL ── */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">

          {/* LEFT — skill rows */}
          <div className="glass rounded-3xl p-7 relative overflow-hidden">
            {/* subtle top-right glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-mint-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* header */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-xl bg-mint-500/10 flex items-center justify-center">
                <group.icon size={17} className="text-mint-500" />
              </div>
              <div>
                <p className="font-semibold leading-tight">{group.title}</p>
                <p className="text-[11px] font-mono text-gray-400 dark:text-gray-500">
                  {group.items.length} skills
                </p>
              </div>
              <div className="ml-auto flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <span className="w-2 h-2 rounded-full bg-mint-500/80" />
              </div>
            </div>

            {/* rows */}
            <div className="space-y-4 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="space-y-4"
                >
                  {group.items.map((item, idx) => (
                    <SkillRow
                      key={item.name}
                      item={item}
                      index={idx}
                      isHovered={hovered === idx}
                      onHover={() => setHovered(idx)}
                      onLeave={() => setHovered(null)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — radar + stats */}
          <div className="space-y-4">

            {/* radar card */}
            <div className="glass rounded-3xl p-6 flex flex-col items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-mint-500/5 to-transparent pointer-events-none" />
              <p className="font-mono text-[11px] text-gray-400 dark:text-gray-500 mb-4 self-start">
                skill_radar.svg
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <RadarChart items={group.items} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* avg proficiency */}
            <div className="glass rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-mint-500/5 to-transparent pointer-events-none" />
              <p className="font-mono text-[11px] text-gray-400 dark:text-gray-500 mb-2">
                avg_proficiency
              </p>
              <div className="flex items-end justify-between">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={avg}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-4xl font-black text-gradient"
                  >
                    {avg}%
                  </motion.span>
                </AnimatePresence>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">across</p>
                  <p className="font-bold text-sm">{group.items.length} skills</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                <motion.div
                  key={avg}
                  initial={{ width: 0 }}
                  animate={{ width: `${avg}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-mint-600 to-mint-400"
                />
              </div>
            </div>

            {/* top skill */}
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={top.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="w-11 h-11 rounded-xl bg-mint-500/10 flex items-center justify-center flex-shrink-0 border border-mint-500/20"
                >
                  <top.Icon size={20} className="text-mint-500" />
                </motion.div>
              </AnimatePresence>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[11px] text-gray-400 dark:text-gray-500">top_skill</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={top.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-bold truncate"
                  >
                    {top.name}
                  </motion.p>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={top.level}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-sm font-bold text-mint-500 flex-shrink-0"
                >
                  {top.level}%
                </motion.span>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}