import { useState } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  ScanLine,
  Sparkles,
  BookOpen,
  Globe,
  MessageCircle,
} from 'lucide-react';

/* =========================================================
   DATA
========================================================= */

const languages = [
  { name: 'Malayalam', level: 100, label: 'Native', desc: 'Mother tongue' },
  { name: 'English',   level: 90,  label: 'Fluent',  desc: 'Professional use' },
  { name: 'Hindi',     level: 40,  label: 'Basic',   desc: 'Conversational' },
];

const certifications = [
  {
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    tag: 'API Development',
    code: 'PMN-2024-SE-88214',
    year: '2024',
  },
  {
    title: 'Data Structures & Algorithms using Python',
    issuer: 'NPTEL',
    tag: 'Core CS',
    code: 'NPT-DSA-PY-55931',
    year: '2024',
  },
];

/* =========================================================
   EDUCATION HERO CARD
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
        className="relative w-full h-[280px] cursor-pointer"
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-mint-500/20 bg-gradient-to-br from-mint-600 via-emerald-600 to-green-700 p-8 sm:p-10 flex flex-col justify-between shadow-2xl shadow-mint-900/20"
        >
          {/* dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />

          <div className="relative flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-white"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[10px] font-mono text-white/80">2023 — Present</span>
            </div>
          </div>

          <div className="relative">
            <p className="font-mono text-[10px] text-white/60 uppercase tracking-widest mb-2">
              B.Tech · Computer Science
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              College of Engineering<br />Chengannur
            </h3>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-white/70 text-xs">
                <MapPin size={11} />
                Alappuzha, Kerala
              </div>
              
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl p-8 sm:p-10 flex items-center gap-8"
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(34,197,94,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,1) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* CGPA ring */}
          <div className="relative flex-shrink-0 w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 116 116">
              <circle
                cx="58" cy="58" r={radius}
                fill="none" stroke="currentColor"
                className="text-black/5 dark:text-white/10"
                strokeWidth="7"
              />
              <motion.circle
                cx="58" cy="58" r={radius}
                fill="none" stroke="url(#eduGrad)"
                strokeWidth="7" strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{
                  strokeDashoffset: flipped
                    ? circumference * (1 - percentage / 100)
                    : circumference,
                }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
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

          <div className="relative flex-1 min-w-0 space-y-3">
            <p className="font-mono text-[10px] tracking-widest text-mint-500 uppercase">
              Academic Transcript
            </p>
            {[
              { icon: Calendar, text: 'Sep 2023 — Present' },
              { icon: MapPin,   text: 'Alappuzha, Kerala' },
              { icon: BookOpen, text: 'CGPA 9.6 / 10.0' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Icon size={12} className="text-mint-500 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   LANGUAGE CARD — redesigned as horizontal bars
========================================================= */

function LanguageCard() {
  const [active, setActive] = useState(null);

  const langIcons = [Globe, MessageCircle, BookOpen];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl p-7 flex flex-col overflow-hidden"
    >
      <div className="absolute -top-8 -right-8 w-28 h-28 bg-mint-500/10 rounded-full blur-2xl pointer-events-none" />

      <p className="font-mono text-[10px] tracking-widest text-mint-500 uppercase mb-6">
        Languages
      </p>

      <div className="flex flex-col gap-4 flex-1 justify-center">
        {languages.map((lang, i) => {
          const Icon = langIcons[i];
          const isActive = active === i;

          return (
            <motion.div
              key={lang.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="cursor-default"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon
                    size={13}
                    className={`transition-colors ${isActive ? 'text-mint-500' : 'text-gray-400'}`}
                  />
                  <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-mint-600 dark:text-mint-400' : ''}`}>
                    {lang.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-400">{lang.desc}</span>
                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0.5 }}
                    className="text-[10px] font-mono font-bold text-mint-500"
                  >
                    {lang.level}%
                  </motion.span>
                </div>
              </div>

              {/* bar */}
              <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-mint-600 to-mint-400 relative overflow-hidden"
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </div>

              {/* proficiency dots */}
              <div className="flex gap-1 mt-1.5">
                {[...Array(5)].map((_, d) => (
                  <div
                    key={d}
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                      d < Math.round((lang.level / 100) * 5)
                        ? isActive ? 'bg-mint-500' : 'bg-mint-500/50'
                        : 'bg-black/5 dark:bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
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
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const dist = 60 + Math.random() * 40;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              scale: 0,
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-mint-500"
          />
        );
      })}
    </div>
  );
}

/* =========================================================
   CERTIFICATION CARD
========================================================= */

function CertificationCard({ cert, index }) {
  const [state, setState] = useState('sealed');
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
      whileHover={{ y: state === 'sealed' ? -4 : 0 }}
      className={`
        relative overflow-hidden rounded-2xl border p-6
        bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl
        transition-all duration-500
        ${state === 'verified'
          ? 'border-mint-500/40 shadow-lg shadow-mint-500/10'
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

      {/* verified glow */}
      {state === 'verified' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-mint-500/5 to-transparent pointer-events-none"
        />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[9px] font-mono px-2 py-1 rounded-full bg-mint-500/10 text-mint-600 dark:text-mint-400 uppercase tracking-widest">
              {cert.tag}
            </span>
            <span className="text-[9px] font-mono text-gray-400">{cert.year}</span>
          </div>

          <h4 className="font-bold text-sm leading-snug mb-2">
            {cert.title}
          </h4>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Issued by <span className="text-mint-600 dark:text-mint-400 font-medium">{cert.issuer}</span>
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
                className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center"
              >
                <ScanLine size={16} className="text-gray-400" />
              </motion.div>
            )}

            {state === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 360 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ rotate: { duration: 0.9, ease: 'linear' } }}
                className="w-10 h-10 rounded-xl bg-mint-500/10 flex items-center justify-center"
              >
                <ScanLine size={16} className="text-mint-500" />
              </motion.div>
            )}

            {state === 'verified' && (
              <motion.div
                key="verified"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-10 h-10 rounded-xl bg-mint-500 flex items-center justify-center shadow-lg shadow-mint-500/30"
              >
                <CheckCircle2 size={18} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* footer */}
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
              click to verify credential
            </motion.span>
          )}
          {state === 'scanning' && (
            <motion.span
              key="s2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-[10px] font-mono text-mint-500"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-mint-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
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
      {/* bg glows */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-mint-500/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-emerald-400/[0.04] rounded-full blur-3xl pointer-events-none" />

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
          <p className="font-mono text-mint-500 text-sm tracking-widest">
            EDUCATION & CREDENTIALS
          </p>
        </motion.div>

        {/* TOP ROW — education card + language card */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          <EducationCard />
          <LanguageCard />
        </div>

        {/* CERTIFICATIONS */}
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