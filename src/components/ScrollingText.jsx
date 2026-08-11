const words = [
  'REACT.JS',
  'MACHINE LEARNING',
  'FIREBASE',
  'UI/UX DESIGN',
  'PYTHON',
  'PROBLEM SOLVING',
  'TAILWIND CSS',
  'DATA STRUCTURES',
];

export default function ScrollingText() {
  return (
    <section className="relative overflow-hidden bg-mint-500 py-5 sm:py-6">
      {/* subtle top/bottom lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/20" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-black/20" />

      <div className="overflow-hidden">
        <div className="marquee-track flex items-center w-max">
          {[...words, ...words].map((word, i) => (
            <div
              key={i}
              className="flex items-center flex-shrink-0"
            >
              <span className="px-7 sm:px-10 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-ink-950 whitespace-nowrap">
                {word}
              </span>

              <span className="text-ink-950/50 text-xl sm:text-2xl">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}