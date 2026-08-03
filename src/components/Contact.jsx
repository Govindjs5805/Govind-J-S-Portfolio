import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, GitBranch, Link, Send } from 'lucide-react';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import SectionTitle from './SectionTitle';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus({ ok: true, message: 'Message sent — thank you!' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error', err);
      setStatus({ ok: false, message: 'Send failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionTitle eyebrow="GET IN TOUCH" title="Let's Build Something Great" center />

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'govindjspersonal@gmail.com', href: 'mailto:govindjspersonal@gmail.com' },
              { icon: Phone, label: 'Phone', value: '+91 96057 70892', href: 'tel:+919605770892' },
              { icon: MapPin, label: 'Location', value: 'Kollam, Kerala, India', href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-mint-500/30 border border-transparent transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-mint-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-mint-500" size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                  {href ? (
                    <a href={href} className="font-medium hover:text-mint-500 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/Govindjs5805"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:border-mint-500/40 border border-transparent hover:text-mint-500 transition-colors"
              >
                <GitBranch size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/govindjs5805"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:border-mint-500/40 border border-transparent hover:text-mint-500 transition-colors"
              >
                <Link size={18} />
              </a>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="md:col-span-3 glass rounded-2xl p-6 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-mint-500 outline-none transition-colors text-sm"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-mint-500 outline-none transition-colors text-sm"
              />
            </div>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-mint-500 outline-none transition-colors text-sm resize-none"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mint-500 text-ink-950 font-semibold hover:bg-mint-400 transition-colors disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Message'} <Send size={16} />
              </button>
              {status && (
                <p className={`text-sm ${status.ok ? 'text-green-500' : 'text-red-500'}`}>{status.message}</p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}