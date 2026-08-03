import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, GitBranch, Link, Mail } from 'lucide-react';

function useTypewriter(words, speed = 90, pause = 1400) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
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
        setIndex((i) => i + 1);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

export default function Hero() {
  const role = useTypewriter(['Software Developer', 'ML Enthusiast', 'UI/UX Designer', 'Problem Solver']);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-grid">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-mint-500/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-emerald-400/10 rounded-full blur-3xl animate-float-slower" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-float" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-mint-500 mb-4 flex items-center gap-2"
        >
          <span className="w-8 h-[2px] bg-mint-500" /> Hello, I'm
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
          className="h-10 sm:h-12 mb-6"
        >
          <span className="text-xl sm:text-3xl font-mono text-gray-600 dark:text-gray-300">
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
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-mint-500 text-ink-950 font-semibold hover:bg-mint-400 hover:-translate-y-0.5 transition-all shadow-lg shadow-mint-500/20"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-mint-500/40 hover:bg-mint-500/10 font-semibold transition-all"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex gap-4"
        >
          {[
            { icon: GitBranch, href: 'https://github.com/yourusername' },
            { icon: Link, href: 'https://linkedin.com/in/yourusername' },
            { icon: Mail, href: 'mailto:govindjspersonal@gmail.com' },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/10 flex items-center justify-center hover:border-mint-500 hover:text-mint-500 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-mint-500 z-10"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}