import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/siteData.js';

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20">
      <div className="text-center">
        <p className="section-label reveal">Case studies</p>
        <h2 className="section-title reveal">Selected Works</h2>
      </div>

      {/* green framed panel, like the reference */}
      <div className="reveal mt-12 rounded-[2rem] bg-gradient-to-br from-lime-400 to-lime-300 p-3 shadow-[0_30px_80px_-30px_rgba(90,160,0,0.6)] sm:p-5">
        <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white transition duration-300 hover:-translate-y-1"
            >
              {/* generated "cover" so no screenshots are needed */}
              <div className={`relative h-40 bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-medium backdrop-blur">
                  {p.tag}
                </span>
                <span className="absolute bottom-3 right-4 font-display text-6xl italic text-black/10">
                  {p.title[0]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} on GitHub`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 transition group-hover:bg-ink group-hover:text-white"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-600">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="reveal mt-8 text-center">
        <a href="https://github.com/Anishkachawla" target="_blank" rel="noreferrer" className="btn-light">
          <Github size={16} /> More on GitHub
        </a>
      </div>
    </section>
  );
}
