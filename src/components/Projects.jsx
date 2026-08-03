import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, Calendar, Users2, ShieldCheck, QrCode, LineChart, Sparkles } from 'lucide-react';
import SectionTitle from './SectionTitle';

const projects = [
  {
    title: 'IBENTO',
    subtitle: 'Smart Campus Event Management System',
    description:
      'A scalable three-tier event management platform enabling seamless event registration, real-time seat tracking, and QR-based attendance verification.',
    tags: ['React.js', 'Tailwind CSS', 'Firebase', 'Firestore'],
    highlights: [
      { icon: Calendar, text: 'Seamless registration & real-time updates' },
      { icon: ShieldCheck, text: 'Real-time seat tracking prevents overbooking' },
      { icon: QrCode, text: 'QR-based attendance & automated check-ins' },
    ],
    link: 'https://ibento-neon.vercel.app/', // TODO: replace with live demo link
    github: 'https://github.com/Govindjs5805/IBENTO', // TODO: replace with repo link
    accent: 'from-mint-500/20 to-emerald-400/5',
  },
  {
    title: 'PLACIFY AI',
    subtitle: 'AI-Powered Placement Package Predictor',
    description:
      'A predictive analytics platform using Linear Regression to forecast student placement packages from academic and skill-based parameters, with an interactive dashboard.',
    tags: ['Python', 'Scikit-Learn', 'Pandas', 'Streamlit'],
    highlights: [
      { icon: LineChart, text: 'Linear Regression package prediction model' },
      { icon: Sparkles, text: 'Real-time visualization of key influencing factors' },
      { icon: Users2, text: 'Streamlit dashboard for easy interaction' },
    ],
    link: 'https://placify-ai.streamlit.app/',
    github: 'https://github.com/Govindjs5805/Placify-AI',
    accent: 'from-emerald-400/20 to-teal-400/5',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="MY WORK" title="Featured Projects" center />

        <div className="space-y-10">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="group relative glass rounded-3xl overflow-hidden border border-transparent hover:border-mint-500/30 transition-all duration-500"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative grid md:grid-cols-5 gap-8 p-8 md:p-10">
                <div className="md:col-span-2 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-mint-500">0{i + 1}</span>
                    <h3 className="text-3xl font-bold mt-2 mb-1 group-hover:text-mint-500 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{p.subtitle}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-md bg-mint-500/10 text-mint-600 dark:text-mint-400 border border-mint-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-mint-500 text-ink-950 hover:bg-mint-400 transition-colors"
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border border-gray-300 dark:border-white/10 hover:border-mint-500 transition-colors"
                    >
                      Code <GitBranch size={14} />
                    </a>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{p.description}</p>
                  <div className="space-y-4">
                    {p.highlights.map(({ icon: Icon, text }, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 w-8 h-8 rounded-lg bg-mint-500/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={15} className="text-mint-500" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 pt-1">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-14">
          <a
            href="https://github.com/Govindjs5805"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full border border-mint-500/40 hover:bg-mint-500/10 transition-colors"
          >
            See More on GitHub <GitBranch size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}