import { motion } from 'framer-motion';
import { Terminal, Layers, Wrench, Brain } from 'lucide-react';
import SectionTitle from './SectionTitle';

const skillGroups = [
  { icon: Terminal, title: 'Languages', items: ['Python', 'Java', 'C/C++', 'SQL', 'JavaScript', 'HTML', 'CSS'] },
  { icon: Layers, title: 'Frameworks & Libraries', items: ['React', 'Tailwind CSS', 'Pandas', 'NumPy', 'Scikit-Learn'] },
  { icon: Wrench, title: 'Tools & Platforms', items: ['Figma', 'Jupyter Notebook', 'GitHub', 'Firebase', 'Vercel', 'VS Code', 'PyCharm', 'Canva'] },
  { icon: Brain, title: 'Core Concepts', items: ['OOPS', 'DBMS', 'Data Structures', 'Operating Systems', 'Computer Networks'] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="WHAT I WORK WITH" title="Skills & Toolbox" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map(({ icon: Icon, title, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-mint-500/40 border border-transparent hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-mint-500/10 flex items-center justify-center mb-4">
                <Icon className="text-mint-500" size={20} />
              </div>
              <h3 className="font-semibold mb-4">{title}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}