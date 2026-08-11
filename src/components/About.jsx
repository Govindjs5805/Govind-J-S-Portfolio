import { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

import {
  Code2,
  Layers,
  Award,
  Users,
  MapPin,
  GraduationCap,
  Sparkles,
  Terminal,
  Heart,
  ArrowRight,
} from 'lucide-react';

/* =========================================================
   DEVICE DETECTION HOOK
   Disables mouse-only effects on touch devices
========================================================= */

function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHasFinePointer(mq.matches);

    const handler = (e) => setHasFinePointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return hasFinePointer;
}

/* =========================================================
   ANIMATED COUNTER
========================================================= */

function Counter({ to, suffix = '' }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 1600;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setVal(
        parseFloat((eased * to).toFixed(Number.isInteger(to) ? 0 : 1))
      );

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return (
    <>
      {val}
      {suffix}
    </>
  );
}

/* =========================================================
   INTERACTIVE PHOTO
========================================================= */

function PhotoCard() {
  const ref = useRef(null);
  const hasFinePointer = useHasFinePointer();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [9, -9]),
    { stiffness: 160, damping: 22 }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-9, 9]),
    { stiffness: 160, damping: 22 }
  );

  const glowX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!hasFinePointer) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={
        hasFinePointer
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 900,
            }
          : {}
      }
      className="relative w-72 h-80 mx-auto lg:mx-0"
    >
      <div
        className="
          absolute inset-0 scale-105 rounded-[2rem]
          bg-gradient-to-br from-mint-500/30 to-emerald-400/5
          blur-xl sm:blur-2xl
          pointer-events-none
        "
      />

      <div
        className="
          relative w-full h-full rounded-[2rem] overflow-hidden
          border border-mint-500/30 shadow-2xl shadow-black/20
        "
      >
        <img
          src="/image.jpg"
          alt="Govind J S"
          className="
            w-full h-full object-cover
            transition-transform duration-700
            hover:scale-[1.03]
          "
        />

        {hasFinePointer && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  circle at ${glowX} ${glowY},
                  rgba(255,255,255,0.18),
                  transparent 55%
                )
              `,
            }}
          />
        )}

        <div
          className="
            absolute bottom-0 inset-x-0 h-24
            bg-gradient-to-t from-black/90 via-black/45 to-transparent
          "
        />

        <div className="absolute bottom-4 left-5">
          <p className="text-white font-bold">Govind J S</p>
          <p className="text-mint-400 text-xs font-mono mt-0.5">
            CS Undergrad · Developer
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   INTERESTS
========================================================= */

const interests = [
  { label: 'Software Development', icon: Code2 },
  { label: 'Machine Learning', icon: Sparkles },
  { label: 'UI/UX Design', icon: Layers },
  { label: 'Problem Solving', icon: Terminal },
  { label: 'Team Leadership', icon: Users },
  { label: 'Always Learning', icon: Heart },
];

function InterestTags() {
  return (
    <div>
      <p
        className="
          text-[10px] font-mono tracking-[0.2em]
          text-gray-400 dark:text-gray-600 uppercase mb-3
        "
      >
        Interests
      </p>

      <div className="flex flex-wrap gap-2">
        {interests.map(({ label, icon: Icon }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -3, scale: 1.04 }}
            className="
              group flex items-center gap-1.5 px-3 py-1.5 rounded-full
              border border-black/5 dark:border-white/10
              bg-black/[0.025] dark:bg-white/[0.035]
              text-xs text-gray-600 dark:text-gray-300
              hover:border-mint-500/40 hover:bg-mint-500/5 hover:text-mint-600
              dark:hover:text-mint-400
              transition-colors cursor-default
            "
          >
            <Icon size={12} className="group-hover:rotate-6 transition-transform" />
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ icon: Icon, to, suffix = '', label, delay }) {
  const [visible, setVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setVisible(true)}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="
        group relative overflow-hidden rounded-2xl p-4
        bg-black/[0.025] dark:bg-white/[0.035]
        border border-black/5 dark:border-white/[0.07]
        hover:border-mint-500/30
        transition-colors
      "
    >
      <div
        className="
          absolute inset-0 bg-gradient-to-br from-mint-500/10 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        "
      />

      <div className="relative z-10">
        <Icon
          size={17}
          className="text-mint-500 mb-3 transition-transform duration-300 group-hover:scale-110"
        />
        <p className="text-2xl font-black tracking-tight">
          {visible ? <Counter to={to} suffix={suffix} /> : `0${suffix}`}
        </p>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{label}</p>
      </div>
    </motion.div>
  );
}

/* =========================================================
   WHAT I DO — replaces the old glitchy manifesto section
   Lightweight, no full-bleed layout, no blur stacking,
   no giant overlapping typography. Works identically on
   touch (tap) and desktop (hover).
========================================================= */

const pillars = [
  {
    number: '01',
    word: 'Build',
    icon: Code2,
    description:
      'I turn ideas into useful digital products that solve real problems.',
    tags: ['React', 'Firebase', 'Full-stack'],
  },
  {
    number: '02',
    word: 'Design',
    icon: Layers,
    description:
      'I care about how technology feels, not only about how it works.',
    tags: ['UI/UX', 'Figma', 'Visual Systems'],
  },
  {
    number: '03',
    word: 'Learn',
    icon: Sparkles,
    description:
      'Curiosity keeps me experimenting with better tools, systems and ideas.',
    tags: ['Machine Learning', 'DSA', 'CS'],
  },
  {
    number: '04',
    word: 'Lead',
    icon: Users,
    description:
      'I enjoy turning creative teams into people who build great things together.',
    tags: ['Design Teams', 'Campaigns', 'Collaboration'],
  },
];

function PillarCard({ item, index, isOpen, onToggle }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onToggle}
      onMouseEnter={onToggle}
      className={`
        relative cursor-pointer rounded-2xl p-5 sm:p-6
        border transition-colors duration-300
        ${
          isOpen
            ? 'border-mint-500/40 bg-mint-500/[0.04]'
            : 'border-black/5 dark:border-white/[0.07] bg-black/[0.02] dark:bg-white/[0.03]'
        }
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
            transition-colors duration-300
            ${isOpen ? 'bg-mint-500/15' : 'bg-black/5 dark:bg-white/5'}
          `}
        >
          <Icon
            size={18}
            className={isOpen ? 'text-mint-500' : 'text-gray-500 dark:text-gray-400'}
          />
        </div>

        <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600">
          / {item.number}
        </span>
      </div>

      <h3
        className={`
          text-2xl sm:text-3xl font-black tracking-tight mb-2
          transition-colors duration-300
          ${isOpen ? 'text-mint-500' : 'text-gray-800 dark:text-gray-100'}
        `}
      >
        {item.word}
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3 pt-1">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    text-[10px] font-mono px-2 py-1 rounded-full
                    bg-mint-500/10 text-mint-600 dark:text-mint-400
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* bottom accent bar */}
      <motion.div
        initial={false}
        animate={{ width: isOpen ? '100%' : '24px' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] mt-4 rounded-full bg-gradient-to-r from-mint-500 to-emerald-400"
      />
    </motion.div>
  );
}

function WhatIDo() {
  const [active, setActive] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20"
    >
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[11px] tracking-widest text-gray-400 dark:text-gray-600 uppercase">
          What drives my work
        </p>
        <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-gray-400 dark:text-gray-600">
          Tap / hover to explore <ArrowRight size={12} />
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((item, index) => (
          <PillarCard
            key={item.word}
            item={item}
            index={index}
            isOpen={active === index}
            onToggle={() => setActive(index)}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN ABOUT COMPONENT
========================================================= */

export default function About() {
  const [typedText, setTypedText] = useState('');

  const fullText =
    'CS undergrad @ CEC · passionate about shipping real-world software, training ML models, and leading creative teams. I build things people actually enjoy using.';

  useEffect(() => {
    let index = 0;
    setTypedText('');

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 22);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      <div
        className="
          absolute top-20 left-1/4
          w-96 h-96
          bg-mint-500/[0.06]
          rounded-full
          blur-xl sm:blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          hidden sm:block
          absolute bottom-10 right-1/4
          w-80 h-80
          bg-emerald-400/[0.05]
          rounded-full
          blur-3xl
          pointer-events-none
        "
      />

      <div className="max-w-6xl mx-auto">
        {/* SECTION LABEL */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-14"
        >
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[2px] bg-mint-500"
          />
          <p className="font-mono text-mint-500 text-sm tracking-widest">ABOUT ME</p>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-[288px_1fr] gap-14 items-start">
          {/* LEFT */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            <PhotoCard />

            <div className="flex flex-col gap-2.5 w-full max-w-[288px]">
              {[
                { icon: MapPin, text: 'Kollam, Kerala' },
                { icon: GraduationCap, text: 'College of Engineering Chengannur' },
              ].map(({ icon: Icon, text }, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="
                    flex items-center gap-2.5
                    text-xs text-gray-500 dark:text-gray-400
                    cursor-default
                  "
                >
                  <Icon size={13} className="text-mint-500 flex-shrink-0" />
                  {text}
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="
                text-4xl sm:text-5xl
                font-extrabold
                tracking-tight leading-tight
                mb-5
              "
            >
              Turning ideas into <span className="text-gradient">real products</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="
                font-mono text-sm
                text-gray-500 dark:text-gray-400
                leading-relaxed
                mb-8
                min-h-[48px]
              "
            >
              <span className="text-mint-500/60">{'// '}</span>
              {typedText}
              <span className="border-r-2 border-mint-500 ml-0.5 animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mb-8"
            >
              <InterestTags />
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard icon={Award} to={9.6} label="CGPA" delay={0.05} />
              <StatCard icon={Code2} to={2} suffix="+" label="Major Projects" delay={0.1} />
              <StatCard icon={Layers} to={70} suffix="+" label="Design Assets Led" delay={0.15} />
              <StatCard icon={Users} to={40} suffix="+" label="Campaigns Directed" delay={0.2} />
            </div>
          </div>
        </div>

        {/* WHAT I DO — new lightweight replacement */}
        <WhatIDo />
      </div>
    </section>
  );
}