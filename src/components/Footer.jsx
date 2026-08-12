import { ArrowUp, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const onScroll = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      setLocalTime(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const quickLinks = [
    { name: 'About',    href: '#about'    },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills',   href: '#skills'   },
    { name: 'Contact',  href: '#contact'  },
  ];

  const nameLetters = 'GOVIND J S'.split('');

  return (
    <footer className="relative pt-20 pb-8 px-6 overflow-hidden border-t border-black/5 dark:border-white/10">

      {/* ── BACKGROUND BLOBS ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/4 w-80 h-80 bg-mint-500/5 rounded-full blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-mint-500/5 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* ── BIG NAME ── */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-end flex-wrap mb-3">
            {nameLetters.map((letter, idx) => (
              <motion.span
                key={idx}
                className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-mint-600 via-mint-500 to-emerald-400 bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.04,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.15,
                  y: -6,
                  transition: { type: 'spring', stiffness: 400, damping: 15 },
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center justify-center gap-2.5 text-sm md:text-base font-mono text-gray-500 dark:text-gray-400"
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              &gt;
            </motion.span>

            {['Developer', 'Designer', 'Creator'].map((word, i) => (
              <span key={word} className="flex items-center gap-2.5">
                <span>{word}</span>
                {i < 2 && (
                  <motion.span
                    className="w-1 h-1 rounded-full bg-mint-500 flex-shrink-0"
                    animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
                  />
                )}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── ANIMATED DIVIDER ── */}
        <div className="relative h-px mb-8 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-mint-500 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
          />
        </div>

        {/* ── QUICK LINKS ── */}
        <div className="flex justify-center gap-6 md:gap-10 mb-8 flex-wrap">
          {quickLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ y: -3 }}
              className="relative text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-mint-500 dark:hover:text-mint-400 transition-colors group"
            >
              {link.name}
              {/* underline grows from left on hover */}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-mint-500 rounded-full group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-black/5 dark:border-white/[0.06]"
        >
          {/* Status + time */}
          <div className="flex items-center gap-2.5">
            <motion.span
              className="w-2 h-2 rounded-full bg-mint-500 flex-shrink-0"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
              Available for work
            </span>
            <span className="h-3 w-px bg-gray-300 dark:bg-gray-700" />
            <motion.span
              className="text-xs font-mono text-mint-500 tabular-nums"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {localTime} IST
            </motion.span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} Govind J S · Made with
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <Heart size={13} className="text-mint-500 fill-mint-500" />
            </motion.span>
          </p>
        </motion.div>

      </div>

      {/* ── SCROLL TO TOP ── */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.7,
          y: isVisible ? 0 : 16,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-mint-500 shadow-lg shadow-mint-500/30 flex items-center justify-center z-50 overflow-hidden"
        aria-label="Scroll to top"
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      >
        {/* Hover gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-mint-600 to-mint-400"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Bouncing arrow */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <ArrowUp size={18} className="text-white" />
        </motion.div>

        {/* Spinning ring */}
        <motion.div
          className="absolute inset-[-3px] rounded-full border-2 border-mint-400/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}
        />
      </motion.button>

      {/* ── BOTTOM SHIMMER LINE ── */}
      <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-mint-500/60 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
        />
      </div>
    </footer>
  );
}