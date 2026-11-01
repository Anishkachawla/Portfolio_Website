import { useEffect, useState } from 'react';
import { ArrowUpRight, Download, Github, Linkedin } from 'lucide-react';
import { profile, stats } from '../data/siteData.js';

export default function Hero() {
  const [hasResume, setHasResume] = useState(false);

  // Only show the resume button if /resume.pdf really exists
  useEffect(() => {
    fetch(profile.resumeUrl, { method: 'HEAD' })
      .then((r) => setHasResume(r.ok && (r.headers.get('content-type') || '').includes('pdf')))
      .catch(() => setHasResume(false));
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pb-10 pt-28 sm:pt-32">
      {/* green gradient wash, like the reference */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f3fbe4] to-[#f3f4f1]" />
        <div className="absolute -bottom-40 left-1/2 h-[560px] w-[1300px] -translate-x-1/2 rounded-[100%] bg-lime-400/70 blur-[90px]" />
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-lime-300/50 blur-[100px]" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-lime-200/70 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="animate-pop flex justify-center">
          <span className="pill">
            <span className="h-2 w-2 rounded-full bg-lime-500" />
            Portfolio 2026 · Thapar Institute
          </span>
        </div>

        <h1 className="animate-pop mt-6 text-center text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
          Hi I&apos;m {profile.firstName}
          <span className="block font-display text-6xl font-normal italic sm:text-8xl">
            {profile.role}
          </span>
        </h1>

        <div className="relative mt-8 grid items-end gap-8 md:grid-cols-[1fr_auto_1fr]">
          {/* left column */}
          <div className="animate-pop order-2 flex flex-col items-center gap-5 md:order-1 md:items-start md:pb-10">
            <span className="pill">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-500 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-500" />
              </span>
              {profile.availability}
            </span>
            <div className="flex gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl leading-none">{s.value}</div>
                  <div className="mt-1 text-[11px] text-neutral-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* portrait in an arch frame */}
          <div className="animate-pop order-1 mx-auto md:order-2">
            <div className="relative animate-floaty">
              <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[2.5rem] bg-gradient-to-b from-lime-300/80 to-lime-500/30 blur-xl" />
              <img
                src={profile.photo}
                alt={`${profile.name} portrait`}
                className="relative h-[380px] w-[300px] rounded-t-[999px] rounded-b-[2.5rem] border-4 border-white object-cover object-[50%_18%] shadow-2xl sm:h-[460px] sm:w-[360px]"
              />
            </div>
          </div>

          {/* right column */}
          <div className="animate-pop order-3 flex flex-col items-center gap-5 text-center md:items-start md:pb-10 md:text-left">
            <p className="max-w-xs text-sm leading-relaxed text-neutral-700">{profile.short}</p>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <a href="#contact" className="btn-dark">
                Get in Touch <ArrowUpRight size={16} />
              </a>
              {hasResume && (
                <a href={profile.resumeUrl} download className="btn-light">
                  <Download size={16} /> Resume
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass flex h-10 w-10 items-center justify-center !rounded-full transition hover:-translate-y-0.5">
                <Github size={17} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass flex h-10 w-10 items-center justify-center !rounded-full transition hover:-translate-y-0.5">
                <Linkedin size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
