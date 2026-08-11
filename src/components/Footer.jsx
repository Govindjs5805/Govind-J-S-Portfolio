import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [localTime, setLocalTime] = useState('');

  // Show/hide scroll-to-top based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Live local time in IST
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setLocalTime(istTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const nameLetters = "GOVIND J S".split("");

  return (
    <footer className="relative pt-24 pb-8 px-6 overflow-hidden border-t border-black/5 dark:border-white/10">
      {/* Animated background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-mint-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Name with animated letters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center flex-wrap gap-1 mb-4">
            {nameLetters.map((letter, idx) => (
              <motion.span
                key={idx}
                className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-mint-600 via-mint-500 to-emerald-500 bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: idx * 0.05,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  delay: idx * 0.1,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: [-5, 5, -5, 0],
                  transition: { duration: 0.3 }
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 text-base md:text-lg font-mono"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              &gt;
            </motion.span>
            <span>Developer</span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-mint-500"
            />
            <span>Designer</span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              className="w-1.5 h-1.5 rounded-full bg-mint-500"
            />
            <span>Creator</span>
          </motion.div>
        </motion.div>

        {/* Animated divider line */}
        <div className="relative h-px mb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-mint-500 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Quick Links with stagger animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 md:gap-8 mb-10 flex-wrap"
        >
          {quickLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group text-gray-600 dark:text-gray-400 hover:text-mint-500 transition-colors text-sm md:text-base font-medium"
            >
              {link.name}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-mint-500"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-mint-500/30"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.3,
                  ease: 'easeInOut'
                }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-mint-500"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
              Available for work
            </span>
            <div className="h-3 w-px bg-gray-300 dark:bg-gray-700" />
            <motion.span 
              className="text-xs font-mono text-mint-500 tabular-nums"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {localTime} IST
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5"
          >
            © {new Date().getFullYear()} · Made with
            <motion.span
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={14} className="text-mint-500 fill-mint-500" />
            </motion.span>
            and passion
          </motion.p>

          
        </div>
      </div>

      {/* Floating scroll-to-top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-mint-500 text-white shadow-lg shadow-mint-500/30 flex items-center justify-center group z-50 overflow-hidden"
        aria-label="Scroll to top"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-mint-600 to-mint-400 opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowUp size={20} className="relative z-10" />
        </motion.div>

        {/* Rotating ring around button */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-mint-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
        />
      </motion.button>

      {/* Decorative bottom line with animation */}
      <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-mint-500 to-transparent opacity-50"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        />
      </div>
    </footer>
  );
}