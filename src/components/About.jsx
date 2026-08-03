import { motion } from 'framer-motion';
import { Code2, Layers, Award, Users } from 'lucide-react';

const stats = [
  { icon: Award, value: '9.6', label: 'CGPA' },
  { icon: Code2, value: '2+', label: 'Major Projects' },
  { icon: Layers, value: '70+', label: 'Design Assets Led' },
  { icon: Users, value: '40+', label: 'Campaigns Directed' },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative w-72 h-72 mx-auto md:mx-0">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-mint-500/30 to-emerald-400/10 blur-2xl" />
            <div className="relative w-full h-full rounded-3xl glass overflow-hidden border-2 border-mint-500/30">
              <img src="/image.jpg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl px-4 py-3 font-mono text-xs shadow-xl">
              <p className="text-mint-500">const dev = {'{'}</p>
              <p className="pl-4">role: "CS Undergrad",</p>
              <p className="pl-4">passion: "Building"</p>
              <p className="text-mint-500">{'}'}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-mint-500 mb-2 text-sm tracking-widest">ABOUT ME</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Turning ideas into <span className="text-gradient">real products</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            I'm a Computer Science undergraduate at College of Engineering Chengannur, passionate
            about software development, machine learning, and UI/UX design. I love solving problems
            and building digital solutions people actually enjoy using — with hands-on experience
            shipping real-world projects, training predictive models, and leading creative teams.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {['Software Development', 'Machine Learning', 'UI/UX Design', 'Problem Solving'].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-mint-500/10 text-mint-600 dark:text-mint-400 border border-mint-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-4 hover:border-mint-500/40 border border-transparent transition-colors"
              >
                <Icon className="text-mint-500 mb-2" size={20} />
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}