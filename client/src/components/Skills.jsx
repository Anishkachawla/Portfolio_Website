import { Award } from 'lucide-react';
import { skills, certifications } from '../data/siteData.js';

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-5 py-20">
      <div className="text-center">
        <p className="section-label reveal">Toolbox</p>
        <h2 className="section-title reveal">Technical Skills</h2>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div key={s.group} className="glass reveal p-5">
            <h3 className="font-display text-xl italic">{s.group}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.items.map((i) => (
                <span key={i} className="rounded-full bg-lime-100 px-3 py-1 text-xs font-medium text-lime-600">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="reveal mt-6 flex flex-wrap items-center justify-center gap-2">
        {certifications.map((c) => (
          <span key={c} className="pill">
            <Award size={14} className="text-lime-600" /> {c}
          </span>
        ))}
      </div>
    </section>
  );
}
