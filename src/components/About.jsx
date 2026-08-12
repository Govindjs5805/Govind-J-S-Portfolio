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
} from 'lucide-react';

/* =========================================================
   DEVICE DETECTION HOOK
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
   LOOPING TYPEWRITER
========================================================= */

const bioLines = [
  'CS undergrad @ CEC · passionate about shipping real-world software, training ML models, and leading creative teams.',
  'Full-stack developer who loves turning ideas into polished products people actually enjoy using.',
  'Designer + Developer hybrid · CGPA 9.6 · always building, always learning.',
  'Creative Lead @ IEDC & MuLearn · bridging design and engineering one project at a time.',
];

function useLoopingTypewriter(lines, speed = 28, pause = 1800) {
  const [text, setText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex % lines.length];
    let timeout;

    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2);
      } else {
        setDeleting(false);
        setLineIndex((i) => (i + 1) % lines.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, lineIndex, lines, speed, pause]);

  return text;
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
      setVal(parseFloat((eased * to).toFixed(Number.isInteger(to) ? 0 : 1)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return <>{val}{suffix}</>;
}

/* =========================================================
   INTERACTIVE PHOTO
========================================================= */

function PhotoCard() {
  const ref = useRef(null);
  const hasFinePointer = useHasFinePointer();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [9, -9]), { stiffness: 160, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-9, 9]), { stiffness: 160, damping: 22 });
  const glowX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!hasFinePointer) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => { mouseX.set(0.5); mouseY.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={hasFinePointer ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 } : {}}
      className="relative w-72 h-80 mx-auto lg:mx-0"
    >
      <div className="absolute inset-0 scale-105 rounded-[2rem] bg-gradient-to-br from-mint-500/30 to-emerald-400/5 blur-xl sm:blur-2xl pointer-events-none" />

      <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-mint-500/30 shadow-2xl shadow-black/20">
        <img
          src="/image.jpg"
          alt="Govind J S"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />

        {hasFinePointer && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.18), transparent 55%)`,
            }}
          />
        )}

        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

        <div className="absolute bottom-4 left-5">
          <p className="text-white font-bold">Govind J S</p>
          <p className="text-mint-400 text-xs font-mono mt-0.5">CS Undergrad · Developer</p>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   STAT CARD — improved
========================================================= */

function StatCard({ icon: Icon, to, suffix = '', label, delay, accent }) {
  const [visible, setVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setVisible(true)}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl p-5 bg-black/[0.025] dark:bg-white/[0.035] border border-black/5 dark:border-white/[0.07] hover:border-mint-500/40 transition-all duration-300 cursor-default"
    >
      {/* Animated gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-mint-500/12 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"
      />

      {/* Top mint bar */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '40%' }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-mint-500 to-emerald-400 rounded-full"
      />

      <div className="relative z-10 flex flex-col gap-2">
        <div className="w-8 h-8 rounded-xl bg-mint-500/10 flex items-center justify-center group-hover:bg-mint-500/20 transition-colors duration-300">
          <Icon size={15} className="text-mint-500 group-hover:scale-110 transition-transform duration-300" />
        </div>

        <div>
          <p className="text-3xl font-black tracking-tight text-gradient">
            {visible ? <Counter to={to} suffix={suffix} /> : `0${suffix}`}
          </p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   INTERACTIVE MANIFESTO
========================================================= */

const manifesto = [
  {
    number: '01',
    word: 'BUILD',
    description: 'I turn ideas into useful digital products that solve real problems.',
    tags: 'React · Firebase · Full-stack',
  },
  {
    number: '02',
    word: 'DESIGN',
    description: 'I care about how technology feels, not only about how it works.',
    tags: 'UI/UX · Figma · Visual Systems',
  },
  {
    number: '03',
    word: 'LEARN',
    description: 'Curiosity keeps me experimenting with better tools, systems and ideas.',
    tags: 'Machine Learning · DSA · CS',
  },
  {
    number: '04',
    word: 'LEAD',
    description: 'I enjoy turning creative teams into people who build great things together.',
    tags: 'Design Teams · Campaigns · Collaboration',
  },
];

function InteractiveManifesto() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const hasFinePointer = useHasFinePointer();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 25, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 25, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (!hasFinePointer) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-20 overflow-hidden max-w-[1500px] mx-auto border-y border-black/10 dark:border-white/10"
    >
      {hasFinePointer && (
        <motion.div
          style={{ left: smoothX, top: smoothY }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-mint-500/10 blur-[100px] pointer-events-none"
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={manifesto[active].number}
          initial={{ opacity: 0, scale: 0.85, x: 30 }}
          animate={{ opacity: hasFinePointer ? 0.035 : 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 1.08, x: -20 }}
          transition={{ duration: 0.45 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[13rem] sm:text-[18rem] md:text-[23rem] leading-none font-black text-black dark:text-white pointer-events-none select-none"
        >
          {manifesto[active].number}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10">
        {manifesto.map((item, index) => {
          const isActive = active === index;

          return (
            <motion.div
              key={item.word}
              onMouseEnter={() => hasFinePointer && setActive(index)}
              onClick={() => setActive(index)}
              className="relative group border-b last:border-b-0 border-black/10 dark:border-white/[0.08] cursor-default"
            >
              <motion.div
                animate={{ paddingLeft: isActive ? 18 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                className="grid md:grid-cols-[70px_1fr_1fr] items-center gap-3 md:gap-6 py-7 md:py-8"
              >
                <span className={`font-mono text-[10px] transition-colors duration-300 ${isActive ? 'text-mint-500' : 'text-gray-400 dark:text-gray-600'}`}>
                  / {item.number}
                </span>

                <motion.h3
                  animate={{ x: isActive ? 8 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className={`text-[3.4rem] sm:text-6xl md:text-7xl leading-[0.85] font-black tracking-[-0.06em] transition-colors duration-300 ${
                    isActive ? 'text-mint-500' : 'text-gray-200 dark:text-white/[0.10]'
                  }`}
                >
                  {item.word}
                </motion.h3>

                <div className="md:pl-6 min-h-[65px] flex items-center">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={item.word}
                        initial={{ opacity: 0, x: 25, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: -12, filter: 'blur(5px)' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 max-w-sm leading-relaxed">
                          {item.description}
                        </p>
                        <p className="mt-2 font-mono text-[10px] sm:text-xs text-mint-600 dark:text-mint-400">
                          {item.tags}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div
                initial={false}
                animate={{ width: isActive ? '100%' : '0%' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-mint-600 via-mint-400 to-transparent shadow-[0_0_12px_rgba(34,197,94,0.35)]"
              />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 flex justify-between items-center py-4 font-mono text-[9px] sm:text-[10px] tracking-widest text-gray-400 dark:text-gray-600">
        <span>WHAT DRIVES MY WORK</span>
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden sm:block"
        >
          {hasFinePointer ? 'HOVER TO EXPLORE →' : 'TAP TO EXPLORE →'}
        </motion.span>
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN ABOUT COMPONENT
========================================================= */

export default function About() {
  const typedText = useLoopingTypewriter(bioLines, 28, 1800);

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-mint-500/[0.06] rounded-full blur-xl sm:blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-400/[0.05] rounded-full blur-3xl pointer-events-none" />

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
                  className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400 cursor-default"
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
              className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5"
            >
              Turning ideas into{' '}
              <span className="text-gradient">real products</span>
            </motion.h2>

            {/* LOOPING TYPEWRITER BIO */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mb-8 rounded-2xl border border-mint-500/15 bg-black/[0.02] dark:bg-white/[0.02] p-4"
            >
              {/* Terminal top bar */}
              <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-black/5 dark:border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-mint-500/80" />

              </div>

              {/* Typed text */}
              <p className="font-mono text-sm text-gray-600 dark:text-gray-300 leading-relaxed min-h-[60px]">
                <span className="text-mint-500/70 select-none">{'> '}</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={typedText.slice(0, 20)}
                    className="inline"
                  >
                    {typedText}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  className="inline-block w-[2px] h-[14px] bg-mint-500 ml-0.5 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'steps(1)' }}
                />
              </p>
            </motion.div>

            {/* STATS — full width, no gaps */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              <StatCard
                icon={Award}
                to={9.6}
                label="CGPA"
                delay={0.05}
              />
              <StatCard
                icon={Code2}
                to={2}
                suffix="+"
                label="Major Projects"
                delay={0.1}
              />
              <StatCard
                icon={Layers}
                to={70}
                suffix="+"
                label="Design Assets"
                delay={0.15}
              />
              <StatCard
                icon={Users}
                to={40}
                suffix="+"
                label="Campaigns"
                delay={0.2}
              />
            </div>
          </div>
        </div>

        {/* INTERACTIVE MANIFESTO */}
        <div className="relative left-1/2 w-screen -translate-x-1/2 px-6 lg:px-10 xl:px-16">
          <InteractiveManifesto />
        </div>
      </div>
    </section>
  );
}