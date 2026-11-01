import { techMarquee } from '../data/siteData.js';

export default function Marquee() {
  const items = [...techMarquee, ...techMarquee];
  return (
    <div className="relative overflow-hidden border-y border-black/5 bg-white/40 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f3f4f1] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f3f4f1] to-transparent" />
      <div className="flex w-max animate-marquee gap-12">
        {items.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap text-lg font-medium text-neutral-400"
          >
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
