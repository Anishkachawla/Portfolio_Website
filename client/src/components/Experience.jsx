import { GraduationCap } from 'lucide-react';
import { experience, education } from '../data/siteData.js';

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-5 py-20">
      <div className="text-center">
        <p className="section-label reveal">Journey</p>
        <h2 className="section-title reveal">Experience &amp; Education</h2>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        {/* experience timeline */}
        <ol className="relative space-y-6 border-l border-lime-400/60 pl-6">
          {experience.map((e) => (
            <li key={e.role + e.org} className="reveal relative">
              <span className="absolute -left-[31px] top-6 h-3 w-3 rounded-full border-2 border-white bg-lime-500 ring-4 ring-lime-200" />
              <div className="glass p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl">{e.role}</h3>
                  <span className="text-xs font-medium text-neutral-500">{e.period}</span>
                </div>
                <p className="mt-1 text-sm italic text-neutral-500">
                  {e.org} · {e.place}
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-700">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* education */}
        <div className="space-y-4">
          {education.map((ed) => (
            <div key={ed.school} className="glass reveal p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime-200">
                  <GraduationCap size={17} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold leading-snug">{ed.school}</h3>
                  <p className="mt-0.5 text-sm text-neutral-600">{ed.detail}</p>
                  <p className="mt-1 text-xs text-neutral-400">
                    {ed.place} · {ed.period}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
