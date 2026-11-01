import { profile } from '../data/siteData.js';

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-5 py-24 text-center">
      <p className="section-label reveal">Hello!</p>
      <p className="reveal font-display text-3xl leading-snug sm:text-5xl">
        My focus is on <span className="italic text-lime-600">blending</span> solid engineering,
        thoughtful design and AI to <span className="italic text-lime-600">build</span> software that
        solves real problems.
      </p>
      <p className="reveal mx-auto mt-6 max-w-2xl text-neutral-600">
        {profile.headline} I enjoy structured learning and hands-on implementation, and my goal is to
        grow into a software engineer with deep expertise in agentic AI and intelligent systems.
      </p>
    </section>
  );
}
