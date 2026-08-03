export default function SectionTitle({ eyebrow, title, center }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      <p className="font-mono text-mint-500 mb-2 text-sm tracking-widest">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
    </div>
  );
}