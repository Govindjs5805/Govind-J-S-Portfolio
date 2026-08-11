import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, GitBranch, Link, Mail } from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────────── */

function useTypewriter(words, speed = 90, pause = 1400) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;

    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setDeleting(true);
        }, pause);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length - 1));
        }, speed / 2);
      } else {
        setDeleting(false);
        setIndex((i) => i + 1);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

/* ─────────────────────────────────────────────
   PORTRAIT
───────────────────────────────────────────── */

function Portrait() {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 250, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 250, damping: 28 });

  const glowX = useTransform(smoothX, (value) => value - 110);
  const glowY = useTransform(smoothY, (value) => value - 110);

  const dotX = useTransform(smoothX, (value) => value - 4);
  const dotY = useTransform(smoothY, (value) => value - 4);

  const [hovering, setHovering] = useState(false);

  const handlePointerMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      className="relative w-full h-full flex items-end justify-center overflow-visible"
    >
      {/* Backlight glow */}
      <motion.div
        className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[95%] aspect-square rounded-full bg-mint-500/10 blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* LARGE STATIC PORTRAIT */}
      <motion.img
        src="./images/govind-portrait.png"
        alt="Govind J S"
        draggable={false}
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="
          absolute
          bottom-0

          h-[105vh]
          max-h-[1100px]

          sm:h-[108vh]
          xl:h-[112vh]
          2xl:h-[115vh]

          w-auto
          max-w-none

          object-contain
          object-bottom

          select-none
          pointer-events-none

          drop-shadow-[0_35px_50px_rgba(0,0,0,0.15)]
        "
      />

      {/* Cursor halo */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.7 }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.3 } }}
        className="absolute top-0 left-0 w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.16)_0%,rgba(34,197,94,0.06)_35%,transparent_70%)] pointer-events-none z-20"
      />

      {/* Cursor center dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0 }}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-mint-400 shadow-[0_0_14px_rgba(34,197,94,0.8)] pointer-events-none z-30"
      />

      {/* Orbiting decorative dots */}
      <motion.span
        className="absolute top-[18%] right-[6%] w-2 h-2 rounded-full bg-mint-500/50 pointer-events-none"
        animate={{ y: [0, -12, 0], opacity: [0.25, 0.8, 0.25] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="absolute top-[42%] left-[3%] w-1.5 h-1.5 rounded-full bg-mint-500/40 pointer-events-none"
        animate={{ y: [0, 10, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 4, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="absolute top-[10%] left-[22%] w-1 h-1 rounded-full bg-mint-400/50 pointer-events-none"
        animate={{ scale: [1, 2, 1], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */

export default function Hero() {
  const role = useTypewriter([
    'Software Developer',
    'ML Enthusiast',
    'UI/UX Designer',
    'Problem Solver',
  ]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-grid">
      {/* Background atmosphere */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-mint-500/20 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-mint-500/[0.07] rounded-full blur-3xl pointer-events-none" />

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen">
        <div className="grid lg:grid-cols-[1fr_1.15fr] min-h-screen gap-6 overflow-visible">

          {/* ── LEFT CONTENT ── */}
          <div className="flex flex-col justify-center pt-28 pb-20 relative z-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-mint-500 mb-4 flex items-center gap-2"
            >
              <span className="w-8 h-[2px] bg-mint-500" />
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4"
            >
              Govind <span className="text-gradient">J S</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="min-h-12 mb-6"
            >
              <span className="text-xl sm:text-2xl xl:text-3xl font-mono text-gray-600 dark:text-gray-300">
                I'm a <span className="text-mint-600 dark:text-mint-400">{role}</span>
                <span className="border-r-2 border-mint-500 ml-1 animate-blink" />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed"
            >
              Computer Science undergrad crafting user-friendly digital experiences — from predictive ML
              models to full-stack web apps. CGPA 9.6, forever curious, always building.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.a
                href="#projects"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-full bg-mint-500 text-ink-950 font-semibold hover:bg-mint-400 transition-colors shadow-lg shadow-mint-500/20"
              >
                View My Work
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-full border border-mint-500/40 hover:bg-mint-500/10 hover:border-mint-500 font-semibold transition-colors"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex gap-4"
            >
              {[
                { icon: GitBranch, href: 'https://github.com/Govindjs5805', label: 'GitHub' },
                { icon: Link, href: 'https://www.linkedin.com/in/govindjs5805', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:govindjspersonal@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/10 flex items-center justify-center hover:border-mint-500 hover:text-mint-500 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT PORTRAIT ── */}
          <div className="hidden lg:block relative min-h-screen overflow-visible">
            <Portrait />
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-gray-400 hover:text-mint-500 transition-colors"
        aria-label="Scroll to about"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}