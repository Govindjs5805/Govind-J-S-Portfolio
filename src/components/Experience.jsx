import { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';

import {
  ArrowUpRight,
  MapPin,
  Palette,
  Sparkles,
  ChevronRight,
  Crown,
  PenTool,
  TrendingUp,
} from 'lucide-react';

import SectionTitle from './SectionTitle';

/* =========================================================
   EXPERIENCE DATA
========================================================= */

const journeys = [
  {
    id: 'iedc',
    number: '01',
    short: 'IEDC',
    organization: 'IEDC BOOTCAMP',
    institution: 'College of Engineering Chengannur',
    location: 'Remote',
    summary:
      'A journey from contributing as a designer to leading creative direction, campaigns and multidisciplinary design execution.',
    roles: [
      {
        title: 'Designer',
        period: '2025 — 2026',
        type: 'Foundation',
        icon: PenTool,
        description:
          'Contributed to the visual identity and creative execution of IEDC initiatives, collaborating with teams to create event and campaign designs.',
        points: [
          'Designed visual assets for events, initiatives and digital campaigns.',
          'Collaborated with organizing teams to translate ideas into clear and engaging visuals.',
          'Built experience in maintaining visual consistency while working across different event requirements.',
        ],
        skills: ['Visual Design', 'Figma', 'Campaign Creatives', 'Collaboration'],
      },
      {
        title: 'Creative & Innovation Lead',
        period: 'Jan 2026 — Present',
        type: 'Leadership',
        icon: Crown,
        description:
          'Leading creative strategy and guiding the visual direction of campaigns, events and digital experiences across IEDC BOOTCAMP.',
        points: [
          'Led creative strategy and execution across 40+ campaigns, events and digital assets.',
          'Contributed to a 20% improvement in audience engagement through stronger creative direction.',
          'Managed and mentored a multidisciplinary design team while maintaining quality and delivery timelines.',
        ],
        skills: ['Creative Direction', 'Leadership', 'Campaign Strategy', 'Team Management'],
        metrics: [
          { value: '40+', label: 'Campaigns' },
          { value: '20%', label: 'Engagement ↑' },
          { value: 'Lead', label: 'Current Role' },
        ],
      },
    ],
  },
  {
    id: 'mulearn',
    number: '02',
    short: 'MuLearn',
    organization: 'GTech MuLearn',
    institution: 'College of Engineering Chengannur',
    location: 'Remote',
    summary:
      'Progressed from hands-on design contribution to directing visual execution and guiding a growing design team.',
    roles: [
      {
        title: 'Designer',
        period: '2025 — 2026',
        type: 'Foundation',
        icon: Palette,
        description:
          'Worked on visual communication and event creatives for the MuLearn community while collaborating with organizers and fellow designers.',
        points: [
          'Created digital creatives supporting community events and initiatives.',
          'Worked with team members to maintain clear and consistent event communication.',
          'Developed practical experience in fast-paced collaborative design workflows.',
        ],
        skills: ['Visual Design', 'Event Creatives', 'Teamwork', 'Brand Consistency'],
      },
      {
        title: 'Design Lead',
        period: 'Jan 2026 — Present',
        type: 'Leadership',
        icon: Sparkles,
        description:
          'Directing end-to-end visual execution for events and digital campaigns while mentoring designers and improving overall creative quality.',
        points: [
          'Directed end-to-end design execution across events and digital campaigns.',
          'Contributed to an 8% increase in event engagement and participation.',
          'Guided a team of 4+ designers in delivering around 30+ design assets and event creatives.',
        ],
        skills: ['Design Direction', 'Leadership', 'Visual Systems', 'Event Design'],
        metrics: [
          { value: '30+', label: 'Design Assets' },
          { value: '8%', label: 'Engagement ↑' },
          { value: '4+', label: 'Designers Led' },
        ],
      },
    ],
  },
];

/* =========================================================
   ORGANIZATION SELECTOR — more green
========================================================= */

function OrganizationSelector({ journey, index, active, onSelect }) {
  const selected = active === index;

  return (
    <motion.button
      onClick={() => onSelect(index)}
      onMouseEnter={() => onSelect(index)}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full text-left py-6 border-b border-black/10 dark:border-white/10 overflow-hidden"
    >
      {/* Full green wash behind selected item */}
      <motion.div
        initial={false}
        animate={{ opacity: selected ? 1 : 0, x: selected ? 0 : '-10%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-gradient-to-r from-mint-500/15 via-mint-500/5 to-transparent"
      />

      {/* Left bar */}
      <motion.div
        initial={false}
        animate={{ scaleY: selected ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-center bg-mint-500 shadow-[0_0_15px_rgba(34,197,94,.6)]"
      />

      <motion.div
        animate={{ x: selected ? 12 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative flex items-center gap-4"
      >
        {/* Number badge — green when selected */}
        <motion.div
          animate={{
            backgroundColor: selected ? 'rgba(34,197,94,0.15)' : 'rgba(0,0,0,0.04)',
            borderColor: selected ? 'rgba(34,197,94,0.4)' : 'rgba(0,0,0,0.06)',
          }}
          className="w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0"
        >
          <span
            className={`font-mono text-xs font-bold transition-colors ${
              selected ? 'text-mint-500' : 'text-gray-400 dark:text-gray-600'
            }`}
          >
            {journey.number}
          </span>
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
              selected ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-white/30'
            }`}
          >
            {journey.organization}
          </h3>

          {/* Progression chips */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <span
              className={`text-[9px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                selected
                  ? 'bg-mint-500/10 text-mint-600 dark:text-mint-400'
                  : 'bg-black/5 dark:bg-white/5 text-gray-400'
              }`}
            >
              Designer
            </span>
            <motion.div animate={{ x: selected ? [0, 3, 0] : 0 }} transition={{ duration: 1.2, repeat: selected ? Infinity : 0 }}>
              <ChevronRight size={10} className={selected ? 'text-mint-500' : 'text-gray-400'} />
            </motion.div>
            <span
              className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-semibold transition-colors ${
                selected
                  ? 'bg-mint-500 text-ink-950'
                  : 'bg-black/5 dark:bg-white/5 text-gray-400'
              }`}
            >
              Lead
            </span>
          </div>
        </div>

        <motion.div animate={{ opacity: selected ? 1 : 0, x: selected ? 0 : -8 }}>
          <ArrowUpRight size={18} className="text-mint-500" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}

/* =========================================================
   PROGRESSION SWITCH
========================================================= */

function ProgressionSwitch({ roles, activeRole, setActiveRole }) {
  return (
    <div className="relative mb-8">
      <div className="absolute top-[23px] left-[30px] right-[30px] h-[2px] bg-black/5 dark:bg-white/10" />
      <motion.div
        initial={false}
        animate={{ width: activeRole === 0 ? '0%' : 'calc(100% - 60px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[23px] left-[30px] h-[2px] bg-gradient-to-r from-mint-600 to-mint-400 shadow-[0_0_10px_rgba(34,197,94,.4)]"
      />

      <div className="relative grid grid-cols-2">
        {roles.map((role, index) => {
          const Icon = role.icon;
          const selected = activeRole === index;

          return (
            <button
              key={role.title}
              onMouseEnter={() => setActiveRole(index)}
              onClick={() => setActiveRole(index)}
              className="group flex flex-col items-center text-center"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: selected ? 1.08 : 1,
                  backgroundColor: selected ? '#22c55e' : 'rgba(34,197,94,.08)',
                  borderColor: selected ? '#22c55e' : 'rgba(34,197,94,.2)',
                  boxShadow: selected ? '0 0 24px rgba(34,197,94,.3)' : '0 0 0 rgba(34,197,94,0)',
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className="relative z-10 w-12 h-12 rounded-2xl border flex items-center justify-center"
              >
                <Icon size={18} className={selected ? 'text-ink-950' : 'text-mint-500'} />
              </motion.div>

              <p className={`mt-3 text-sm font-bold transition-colors ${selected ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
                {role.title}
              </p>
              <p className="mt-1 font-mono text-[9px] text-gray-400 dark:text-gray-600">
                {role.period}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   ROLE DETAILS
========================================================= */

function RoleDetails({ role }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={role.title}
        initial={{ opacity: 0, y: 18, filter: 'blur(7px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(7px)' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-500/[0.07] border border-mint-500/15 font-mono text-[9px] text-mint-600 dark:text-mint-400 uppercase tracking-widest mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
          {role.type}
        </div>

        <h3 className="text-3xl sm:text-4xl font-black tracking-tight">{role.title}</h3>

        <p className="mt-4 max-w-xl text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {role.description}
        </p>

        {role.metrics && (
          <div className="grid grid-cols-3 gap-3 my-7">
            {role.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.025] dark:bg-white/[0.03] p-4"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-mint-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="relative text-2xl font-black text-mint-600 dark:text-mint-400">{metric.value}</p>
                <p className="relative mt-1 text-[10px] text-gray-500 dark:text-gray-500">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        <div className={`space-y-4 ${role.metrics ? '' : 'mt-7'}`}>
          {role.points.map((point, index) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 + index * 0.07 }}
              whileHover={{ x: 6 }}
              className="group flex gap-3 cursor-default"
            >
              <div className="mt-[7px] relative flex-shrink-0">
                <span className="block w-1.5 h-1.5 rounded-full bg-mint-500" />
                <span className="absolute inset-0 rounded-full bg-mint-500 opacity-0 group-hover:opacity-40 group-hover:animate-ping" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {point}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-black/5 dark:border-white/10">
          {role.skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + index * 0.04 }}
              whileHover={{ y: -2, scale: 1.04 }}
              className="px-3 py-1.5 rounded-full bg-mint-500/[0.06] border border-mint-500/15 text-[10px] font-medium text-mint-700 dark:text-mint-400 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   EXPERIENCE STAGE
========================================================= */

function ExperienceStage({ journey, activeRole, setActiveRole }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(-500); mouseY.set(-500); }}
      className="relative min-h-[650px] overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/10 bg-white/55 dark:bg-white/[0.025] backdrop-blur-xl shadow-2xl shadow-black/[0.04] dark:shadow-black/20"
    >
      <motion.div
        style={{ left: smoothX, top: smoothY }}
        className="absolute w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-500/[0.09] blur-[100px] pointer-events-none"
      />

      <div
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(34,197,94,1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,1)_1px,transparent_1px)] bg-[size:34px_34px] pointer-events-none"
      />

      <AnimatePresence mode="wait">
        <motion.p
          key={journey.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 0.025, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="absolute -right-3 top-2 text-[7rem] sm:text-[9rem] font-black tracking-[-0.08em] text-black dark:text-white select-none pointer-events-none"
        >
          {journey.short}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={journey.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-8">
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-mint-500 uppercase">
                Career progression
              </p>
              <h3 className="text-2xl sm:text-3xl font-black mt-2">{journey.organization}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">{journey.institution}</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 dark:text-gray-600">
              <MapPin size={12} className="text-mint-500" />
              {journey.location}
            </div>
          </div>

          <ProgressionSwitch
            roles={journey.roles}
            activeRole={activeRole}
            setActiveRole={setActiveRole}
          />

          <RoleDetails role={journey.roles[activeRole]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   LEFT PANEL STATS BAR
========================================================= */

function StatsBar({ journey }) {
  const stats = journey.roles[1]?.metrics || [];

  return (
    <motion.div
      key={journey.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-5 rounded-2xl bg-gradient-to-br from-mint-500/10 to-emerald-500/5 border border-mint-500/20 p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={12} className="text-mint-500" />
        <span className="font-mono text-[9px] text-mint-500 uppercase tracking-widest">
          Impact at {journey.short}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-base font-black text-mint-500">{stat.value}</p>
            <p className="text-[9px] font-mono text-gray-400 dark:text-gray-500 mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function Experience() {
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeRole, setActiveRole] = useState(1);

  const selectJourney = (index) => {
    if (index !== activeJourney) {
      setActiveJourney(index);
      setActiveRole(1);
    }
  };

  const journey = journeys[activeJourney];

  return (
    <section id="experience" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full bg-mint-500/[0.04] blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          eyebrow="LEADERSHIP & EXPERIENCE"
          title="From Creating to Leading"
          center
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto -mt-8 mb-14 text-center text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
        >
          Two communities. Two journeys. Starting hands-on with design and growing into creative leadership.
        </motion.p>

        <div className="relative grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-0 items-start">

          {/* ── LEFT PANEL ── */}
          <div className="lg:sticky lg:top-28 lg:pr-8">

            {/* Header row */}
            <div className="flex justify-between items-center mb-4">
              <p className="font-mono text-[9px] tracking-[0.2em] text-gray-400 dark:text-gray-600">
                ORGANIZATIONS
              </p>
              <span className="flex items-center gap-1.5 font-mono text-[9px] text-mint-500">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-mint-400 opacity-70 animate-ping" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-mint-500" />
                </span>
                LEADING NOW
              </span>
            </div>

            {/* Org list */}
            <div className="border-t border-black/10 dark:border-white/10">
              {journeys.map((item, index) => (
                <OrganizationSelector
                  key={item.id}
                  journey={item}
                  index={index}
                  active={activeJourney}
                  onSelect={selectJourney}
                />
              ))}
            </div>

            {/* Summary with green left border */}
            <motion.div
              key={journey.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pl-4 border-l-2 border-mint-500"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {journey.summary}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <span className="text-[10px] font-mono text-gray-400">DESIGNER</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight size={12} className="text-mint-500" />
                </motion.div>
                <span className="text-[10px] font-mono font-bold text-mint-500">LEAD</span>
              </div>
            </motion.div>

            {/* Green stats bar */}
            <StatsBar journey={journey} />

            {/* Green glow accent at bottom of left panel */}
            <div className="mt-5 h-px bg-gradient-to-r from-mint-500/50 via-mint-500/20 to-transparent rounded-full" />
          </div>

          {/* Connecting divider */}
          <div className="hidden lg:block absolute left-[300px] top-0 bottom-0 w-8">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-mint-500/20 to-transparent" />
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="lg:pl-8">
            <ExperienceStage
              journey={journey}
              activeRole={activeRole}
              setActiveRole={setActiveRole}
            />
          </div>

        </div>
      </div>
    </section>
  );
}