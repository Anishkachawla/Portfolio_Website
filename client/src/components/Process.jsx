import { process } from '../data/siteData.js';

const tilt = ['-rotate-3', 'rotate-2 md:translate-y-8', '-rotate-2'];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden px-5 py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/40 blur-[90px]" />
      <div className="mx-auto max-w-5xl text-center">
        <p className="section-label reveal">How I work</p>
        <h2 className="section-title reveal">Here&apos;s how I work</h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {process.map((p, i) => (
            <div key={p.n} className="reveal">
              <div className="mb-3 text-left font-display text-4xl text-neutral-400">{p.n}</div>
              <div
                className={`glass p-6 text-left transition duration-300 hover:rotate-0 hover:-translate-y-1 ${tilt[i]}`}
              >
                <h3 className="font-display text-3xl italic">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
