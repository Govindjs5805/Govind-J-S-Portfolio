import { motion } from 'framer-motion';
import { GraduationCap, Award, Languages as LangIcon } from 'lucide-react';

const certifications = [
  'Postman API Fundamentals Student Expert — Postman',
  'Data Structures & Algorithms using Python — NPTEL',
];

const languages = [
  { name: 'Malayalam', level: 'Native' },
  { name: 'English', level: 'Fluent' },
  { name: 'Hindi', level: 'Basic' },
];

export default function Education() {
  return (
    <section id="education" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-mint-500/10 flex items-center justify-center">
              <GraduationCap className="text-mint-500" size={20} />
            </div>
            <h3 className="font-semibold text-lg">Education</h3>
          </div>
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <div>
              <p className="font-bold">College of Engineering Chengannur</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bachelor of Technology in Computer Science</p>
            </div>
            <span className="text-xs font-mono text-mint-500">Sep 2023 - Present</span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-2xl font-bold text-gradient">9.6</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">CGPA · Alappuzha, Kerala</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-mint-500/10 flex items-center justify-center">
              <LangIcon className="text-mint-500" size={20} />
            </div>
            <h3 className="font-semibold text-lg">Languages</h3>
          </div>
          <div className="space-y-3">
            {languages.map((l) => (
              <div key={l.name} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">{l.name}</span>
                <span className="text-mint-600 dark:text-mint-400 font-medium">{l.level}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-3 glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-mint-500/10 flex items-center justify-center">
              <Award className="text-mint-500" size={20} />
            </div>
            <h3 className="font-semibold text-lg">Certifications</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((c) => (
              <div key={c} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                <span className="text-mint-500 mt-1">▹</span>
                {c}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}