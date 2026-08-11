import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Download, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { name: 'Home',       href: '#home'       },
  { name: 'About',      href: '#about'      },
  { name: 'Skills',     href: '#skills'     },
  { name: 'Projects',   href: '#projects'   },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact',    href: '#contact'    },
];

/* ── LOGO ── */
function Logo() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="#home"
      className="relative flex items-center gap-0.5 pb-1"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white">
        Govind
      </span>
      <motion.span
        className="font-black text-xl tracking-tight text-mint-500"
        animate={{
          textShadow: hovered
            ? '0 0 20px rgba(34,197,94,0.6)'
            : '0 0 0px rgba(34,197,94,0)',
        }}
        transition={{ duration: 0.3 }}
      >
        JS
      </motion.span>

      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-mint-500 to-emerald-400"
        animate={{ width: hovered ? '100%' : '35%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.a>
  );
}

/* ── NAVBAR ── */
export default function Navbar({ dark, setDark }) {
  const [open, setOpen]            = useState(false);
  const [scrolled, setScrolled]    = useState(false);
  const [activeSection, setActive] = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      for (const { href } of navLinks) {
        const el = document.getElementById(href.substring(1));
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) {
            setActive(href.substring(1));
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-white/5 border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          <Logo />

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative text-sm font-medium transition-colors duration-300 group ${
                    isActive
                      ? 'text-mint-500'
                      : 'text-gray-600 dark:text-gray-300 hover:text-mint-500 dark:hover:text-mint-400'
                  }`}
                >
                  {link.name}

                  {/* Sliding underline — always renders, width animates */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-mint-500"
                    animate={{ width: isActive ? '100%' : '0%' }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Hover underline for non-active */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-mint-500/50 group-hover:w-full transition-all duration-300" />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-3">

            {/* Theme toggle */}
            <motion.button
              onClick={() => setDark(!dark)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2.5 rounded-xl glass border border-transparent hover:border-mint-500/30 transition-colors overflow-hidden group"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-mint-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <AnimatePresence mode="wait">
                {dark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun size={18} className="text-mint-400 relative z-10" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon size={18} className="text-mint-600 relative z-10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Resume */}
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl bg-mint-500 text-ink-950 hover:bg-mint-400 transition-all shadow-lg shadow-mint-500/20 group"
            >
              <span>Resume</span>
              <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </motion.a>

            {/* Mobile toggle */}
            <motion.button
              className="lg:hidden p-2.5 rounded-xl glass border border-transparent hover:border-mint-500/30"
              onClick={() => setOpen(!open)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all group ${
                      isActive
                        ? 'bg-mint-500/10 text-mint-500 border border-mint-500/20'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-mint-500/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight
                      size={16}
                      className={`transition-transform group-hover:translate-x-1 ${
                        isActive ? 'text-mint-500' : 'text-gray-400'
                      }`}
                    />
                  </motion.a>
                );
              })}

              <motion.a
                href="/resume.pdf"
                download
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="flex items-center justify-center gap-2 mt-4 px-4 py-3 rounded-xl bg-mint-500 text-ink-950 font-semibold hover:bg-mint-400 transition-colors"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smooth scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-mint-500 via-mint-400 to-emerald-400 origin-left"
        style={{ scaleX }}
      />
    </motion.nav>
  );
}