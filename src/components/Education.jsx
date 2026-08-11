import { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  ScanLine,
  RotateCcw,
  Sparkles,
} from 'lucide-react';


/* =========================================================
   DATA
========================================================= */

const languages = [
  { name: 'Malayalam', level: 100, label: 'Native' },
  { name: 'English', level: 90, label: 'Fluent' },
  { name: 'Hindi', level: 40, label: 'Basic' },
];

const certifications = [
  {
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    tag: 'API Development',
    code: 'PMN-2024-SE-88214',
  },
  {
    title: 'Data Structures & Algorithms using Python',
    issuer: 'NPTEL',
    tag: 'Core CS',
    code: 'NPT-DSA-PY-55931',
  },
];


/* =========================================================
   FLIP EDUCATION CARD
========================================================= */

function EducationCard() {
  const [flipped, setFlipped] = useState(false);

  const cgpa = 9.6;
  const percentage = (cgpa / 10) * 100;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="md:col-span-2 relative"
      style={{ perspective: 1200 }}
    >
      <motion.div
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-[280px] cursor-pointer group"
      >
        {/* ── FRONT FACE ── */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="
            absolute inset-0
            rounded-[2rem]
            overflow-hidden
            border border-mint-500/20
            bg-gradient-to-br from-mint-600 via-emerald-600 to-green-700
            p-8 sm:p-10
            flex flex-col justify-between
            shadow-2xl shadow-mint-900/20
          "
        >
          {/* decorative pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />

          <div className="relative flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>

            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              className="flex items-center gap-1.5 text-[10px] font-mono text-white/70 uppercase tracking-widest"
            >
              
            </motion.div>
          </div>

          <div className="relative">
            <p className="font-mono text-[10px] text-white/60 uppercase tracking-widest mb-2">
              Student Identity
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              College of Engineering<br />Chengannur
            </h3>
            <p className="text-white/80 text-sm mt-2">
              Bachelor of Technology · Computer Science
            </p>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="
            absolute inset-0
            rounded-[2rem]
            overflow-hidden
            border border-black/5 dark:border-white/10
            bg-white/70 dark:bg-white/[0.04]
            backdrop-blur-xl
            p-8 sm:p-10
            flex items-center gap-8
          "
        >
          <div
            className="
              absolute inset-0 opacity-[0.03]
              bg-[linear-gradient(rgba(34,197,94,1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,1)_1px,transparent_1px)]
              bg-[size:28px_28px]
              pointer-events-none
            "
          />

          {/* CGPA ring */}
          <div className="relative flex-shrink-0 w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 116 116">
              <circle
                cx="58" cy="58" r={radius}
                fill="none"
                stroke="currentColor"
                className="text-black/5 dark:text-white/10"
                strokeWidth="7"
              />
              <motion.circle
                cx="58" cy="58" r={radius}
                fill="none"
                stroke="url(#eduGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{
                  strokeDashoffset: flipped
                    ? circumference * (1 - percentage / 100)
                    : circumference,
                }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: flipped ? 0.3 : 0 }}
              />
              <defs>
                <linearGradient id="eduGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-gradient">{cgpa}</span>
              <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest">CGPA</span>
            </div>
          </div>

          <div className="relative flex-1 min-w-0">
            <p className="font-mono text-[10px] tracking-widest text-mint-500 uppercase mb-2">
              Transcript
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar size={12} className="text-mint-500" />
                Sep 2023 — Present
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MapPin size={12} className="text-mint-500" />
                Alappuzha, Kerala
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Award size={12} className="text-mint-500" />
                Top academic performance
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


/* =========================================================
   LANGUAGE DIAL
========================================================= */

function LanguageDial() {
  const [active, setActive] = useState(0);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const current = languages[active];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="
        relative rounded-[2rem] border border-black/5 dark:border-white/10
        bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl p-8
        flex flex-col items-center overflow-hidden
      "
    >
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-mint-500/10 rounded-full blur-3xl pointer-events-none" />

      <p className="relative self-start font-mono text-[10px] tracking-widest text-mint-500 uppercase mb-6">
        Languages
      </p>

      {/* dial */}
      <div className="relative w-28 h-28 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 116 116">
          <circle
            cx="58" cy="58" r={radius}
            fill="none"
            stroke="currentColor"
            className="text-black/5 dark:text-white/10"
            strokeWidth="7"
          />
          <motion.circle
            cx="58" cy="58" r={radius}
            fill="none"
            stroke="url(#langGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{
              strokeDashoffset: circumference * (1 - current.level / 100),
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="langGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={current.level}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-xl font-black text-gradient"
            >
              {current.level}%
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* selector pills */}
      <div className="flex flex-col gap-2 w-full">
        {languages.map((lang, i) => {
          const isActive = active === i;
          return (
            <motion.button
              key={lang.name}
              onClick={() => setActive(i)}
              whileTap={{ scale: 0.97 }}
              className={`
                relative flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium
                border transition-colors duration-300 overflow-hidden
                ${
                  isActive
                    ? 'border-mint-500/50 text-mint-600 dark:text-mint-400'
                    : 'border-black/5 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-mint-500/25'
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="langActiveBg"
                  className="absolute inset-0 bg-mint-500/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
              <span className="relative z-10">{lang.name}</span>
              <span className="relative z-10 text-[10px] font-mono opacity-70">{lang.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}


/* =========================================================
   PARTICLE BURST
========================================================= */

function ParticleBurst({ trigger }) {
  if (!trigger) return null;

  const particles = Array.from({ length: 14 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x, y, scale: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-mint-500"
          />
        );
      })}
    </div>
  );
}


/* =========================================================
   CERTIFICATION — CLICK TO VERIFY
========================================================= */

function CertificationCard({ cert, index }) {
  const [state, setState] = useState('sealed'); // sealed | scanning | verified
  const [burst, setBurst] = useState(false);

  const handleVerify = () => {
    if (state !== 'sealed') return;
    setState('scanning');

    setTimeout(() => {
      setState('verified');
      setBurst(true);
      setTimeout(() => setBurst(false), 800);
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleVerify}
      className={`
        relative overflow-hidden rounded-2xl border p-6
        bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl
        transition-colors duration-500
        ${state === 'verified'
          ? 'border-mint-500/40'
          : 'border-black/5 dark:border-white/10 hover:border-mint-500/25 cursor-pointer'
        }
      `}
    >
      {/* scanning sweep */}
      <AnimatePresence>
        {state === 'scanning' && (
          <motion.div
            initial={{ top: '-20%' }}
            animate={{ top: '120%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'linear' }}
            className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-mint-500/25 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <span className="text-[9px] font-mono px-2 py-1 rounded-full bg-mint-500/10 text-mint-600 dark:text-mint-400 uppercase tracking-widest">
            {cert.tag}
          </span>

          <h4 className="font-bold text-sm leading-snug mt-3">
            {cert.title}
          </h4>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Issued by {cert.issuer}
          </p>
        </div>

        <div className="relative flex-shrink-0">
          <ParticleBurst trigger={burst} />

          <AnimatePresence mode="wait">
            {state === 'sealed' && (
              <motion.div
                key="sealed"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center"
              >
                <ScanLine size={15} className="text-gray-400" />
              </motion.div>
            )}

            {state === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 360 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ rotate: { duration: 0.9, ease: 'linear' } }}
                className="w-9 h-9 rounded-xl bg-mint-500/10 flex items-center justify-center"
              >
                <ScanLine size={15} className="text-mint-500" />
              </motion.div>
            )}

            {state === 'verified' && (
              <motion.div
                key="verified"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-9 h-9 rounded-xl bg-mint-500 flex items-center justify-center shadow-lg shadow-mint-500/30"
              >
                <CheckCircle2 size={17} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* footer state */}
      <div className="relative flex items-center justify-between mt-5 pt-4 border-t border-black/5 dark:border-white/10">
        <AnimatePresence mode="wait">
          {state === 'sealed' && (
            <motion.span
              key="s1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400"
            >
              <Sparkles size={11} />
              click to verify
            </motion.span>
          )}
          {state === 'scanning' && (
            <motion.span
              key="s2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-mono text-mint-500"
            >
              verifying credential...
            </motion.span>
          )}
          {state === 'verified' && (
            <motion.span
              key="s3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 text-[10px] font-mono text-mint-500"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse" />
              {cert.code}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Education() {
  return (
    <section id="education" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-mint-500/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="w-8 h-[2px] bg-mint-500" />
          <p className="font-mono text-mint-500 text-sm tracking-widest">EDUCATION & CREDENTIALS</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-5">
          <EducationCard />
          <LanguageDial />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-widest text-gray-400 dark:text-gray-600 uppercase mb-4"
        >
          Certifications — click to verify
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-5">
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}