import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import SectionTitle from './SectionTitle';

const experience = [
  {
    role: 'Creative and Innovation Lead',
    org: 'IEDC BOOTCAMP, College of Engineering Chengannur',
    period: 'Jan 2026 - Present',
    location: 'Remote',
    points: [
      'Led creative strategy, overseeing design & execution of 40+ campaigns, events, and digital assets — driving a 20% improvement in audience engagement.',
      'Managed and mentored a multidisciplinary design team, ensuring high-quality deliverables while fostering creativity and collaboration.',
    ],
  },
  {
    role: 'Design Lead',
    org: 'GTech MuLearn, College of Engineering Chengannur',
    period: 'Jan 2026 - Present',
    location: 'Remote',
    points: [
      'Directed end-to-end design execution for events and digital campaigns, contributing to an 8% increase in engagement and participation.',
      'Guided a team of 4+ designers to deliver 30+ design assets and event creatives, amplifying event participation.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <SectionTitle eyebrow="LEADERSHIP & EXPERIENCE" title="Where I've Made an Impact" center />

        <div className="relative pl-8 border-l-2 border-mint-500/20 space-y-12">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="absolute -left-[2.55rem] top-1 w-6 h-6 rounded-full bg-white dark:bg-ink-950 border-2 border-mint-500 flex items-center justify-center">
                <Briefcase size={12} className="text-mint-500" />
              </div>
              <div className="glass rounded-2xl p-6 hover:border-mint-500/30 border border-transparent transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-bold">{exp.role}</h3>
                  <span className="text-xs font-mono text-mint-500">{exp.period}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {exp.org} · {exp.location}
                </p>
                <ul className="space-y-2">
                  {exp.points.map((pt, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex gap-2">
                      <span className="text-mint-500 mt-1">▹</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}