import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  GitBranch,
  Link,
  Send,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import emailjs from 'emailjs-com';
import SectionTitle from './SectionTitle';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'govindjspersonal@gmail.com',
    href: 'mailto:govindjspersonal@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 96057 70892',
    href: 'tel:+919605770892',
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'Kollam, Kerala, India',
  },
];

const inputClass =
  'w-full rounded-2xl border border-black/10 bg-black/[0.025] px-4 pt-6 pb-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-transparent focus:border-mint-500/60 focus:bg-mint-500/[0.035] focus:ring-4 focus:ring-mint-500/10 dark:border-white/10 dark:bg-white/[0.035] dark:text-gray-200';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateField = (field) => (e) => {
    setForm((previous) => ({
      ...previous,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        ok: false,
        message: 'Email service is not configured yet.',
      });
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        publicKey
      );

      setStatus({
        ok: true,
        message: 'Message sent successfully.',
      });

      setForm({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS error:', error);

      setStatus({
        ok: false,
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28">
      {/* subtle background detail */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-mint-500/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="GET IN TOUCH"
          title="Let's Build Something Great"
          center
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass relative overflow-hidden rounded-[2rem] p-7 sm:p-9"
          >
            {/* decorative number */}
            <span className="pointer-events-none absolute -right-3 -top-8 select-none text-[10rem] font-black leading-none text-mint-500/[0.06]">
              01
            </span>

            <div className="relative z-10">
              <div className="mb-10 flex items-center justify-between">

                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-mint-500" />
                  Available
                </span>
              </div>

              <h3 className="max-w-sm text-3xl font-bold leading-tight sm:text-4xl">
                Have an idea?
                <br />
                <span className="text-mint-500">Let's talk about it.</span>
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-7 text-gray-500 dark:text-gray-400">
                Whether you have a project in mind, a question, or simply want
                to connect, feel free to send me a message.
              </p>

              {/* contact links */}
              <div className="mt-10 space-y-3">
                {contactItems.map(({ icon: Icon, label, value, href }) => {
                  const Wrapper = href ? motion.a : motion.div;

                  return (
                    <Wrapper
                      key={label}
                      {...(href ? { href } : {})}
                      whileHover={href ? { x: 5 } : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-colors duration-300 hover:border-mint-500/20 hover:bg-mint-500/[0.04]"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-mint-500/10 transition-colors duration-300 group-hover:bg-mint-500/20">
                        <Icon
                          size={17}
                          className="text-mint-500 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                          {label}
                        </p>
                        <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                          {value}
                        </p>
                      </div>

                      {href && (
                        <ArrowUpRight
                          size={15}
                          className="text-gray-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint-500"
                        />
                      )}
                    </Wrapper>
                  );
                })}
              </div>

              {/* social links */}
              <div className="mt-8 flex items-center gap-3 border-t border-black/10 pt-6 dark:border-white/10">
                <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Find me
                </span>

                <motion.a
                  href="https://github.com/Govindjs5805"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-gray-500 transition-colors hover:border-mint-500/40 hover:text-mint-500 dark:border-white/10"
                >
                  <GitBranch size={17} />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/govindjs5805"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-gray-500 transition-colors hover:border-mint-500/40 hover:text-mint-500 dark:border-white/10"
                >
                  <Link size={17} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* FORM PANEL */}
          <motion.form
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass relative overflow-hidden rounded-[2rem] p-7 sm:p-9"
          >
            {/* top accent line */}
            <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-mint-500 to-transparent opacity-70" />

            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="font-mono text-xs text-gray-400 dark:text-gray-500">
                  send_message()
                </p>
                <h3 className="mt-2 text-xl font-bold">Tell me about your project</h3>
              </div>

              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700" />
                <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700" />
                <span className="h-2 w-2 rounded-full bg-mint-500" />
              </div>
            </div>

            <div className="space-y-4">
              {/* name and email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <label
                    htmlFor="contact-name"
                    className="pointer-events-none absolute left-4 top-2.5 z-10 font-mono text-[10px] uppercase tracking-widest text-gray-400"
                  >
                    Name
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    required
                    value={form.name}
                    onChange={updateField('name')}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="contact-email"
                    className="pointer-events-none absolute left-4 top-2.5 z-10 font-mono text-[10px] uppercase tracking-widest text-gray-400"
                  >
                    Email
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={updateField('email')}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* message */}
              <div className="relative">
                <label
                  htmlFor="contact-message"
                  className="pointer-events-none absolute left-4 top-2.5 z-10 font-mono text-[10px] uppercase tracking-widest text-gray-400"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={7}
                  maxLength={1200}
                  value={form.message}
                  onChange={updateField('message')}
                  placeholder="Tell me about your project..."
                  className={`${inputClass} resize-none`}
                />

                <span className="absolute bottom-3 right-4 font-mono text-[10px] text-gray-400">
                  {form.message.length}/1200
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint-500 px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <Send size={16} />
                  </>
                )}
              </motion.button>

              <AnimatePresence mode="wait">
                {status && (
                  <motion.div
                    key={status.message}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`flex items-center gap-2 text-sm ${
                      status.ok ? 'text-mint-500' : 'text-red-500'
                    }`}
                    role="status"
                  >
                    {status.ok ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}