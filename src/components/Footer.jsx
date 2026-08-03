import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Govind J S.
        </p>
        <a
          href="#home"
          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-mint-500 hover:border-mint-500/40 border border-transparent transition-colors"
        >
          <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
}