import { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { profile } from '../data/siteData.js';

const empty = { name: '', email: '', message: '', website: '' };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: 'loading', msg: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus({ type: 'ok', msg: "Thanks! Your message is in, I'll get back to you soon." });
      setForm(empty);
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    }
  }

  const input =
    'w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-lime-500 focus:ring-4 focus:ring-lime-200/60';

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-80 bg-gradient-to-t from-lime-300/70 to-transparent" />
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div className="reveal">
          <p className="section-label">Contact</p>
          <h2 className="section-title">
            Let&apos;s build something <span className="italic text-lime-600">together</span>
          </h2>
          <p className="mt-4 max-w-sm text-neutral-600">
            Have a role, project or idea in mind? Send a message, or ask my AI twin in the chat
            bubble at the bottom right.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={16} /> <a className="underline-offset-4 hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} /> {profile.location}
            </li>
            <li className="flex items-center gap-3">
              <Github size={16} /> <a className="underline-offset-4 hover:underline" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            </li>
            <li className="flex items-center gap-3">
              <Linkedin size={16} /> <a className="underline-offset-4 hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="glass reveal space-y-4 p-6">
          {/* honeypot: hidden from people, bots fill it */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={set('website')}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <input className={input} placeholder="Your name" value={form.name} onChange={set('name')} required maxLength={100} />
          <input className={input} type="email" placeholder="Your email" value={form.email} onChange={set('email')} required maxLength={200} />
          <textarea className={`${input} min-h-[140px] resize-y`} placeholder="Your message" value={form.message} onChange={set('message')} required minLength={5} maxLength={3000} />
          <button type="submit" disabled={status.type === 'loading'} className="btn-dark w-full justify-center disabled:opacity-60">
            {status.type === 'loading' ? 'Sending…' : (<>Send message <Send size={15} /></>)}
          </button>
          {status.msg && (
            <p role="status" className={`text-sm ${status.type === 'ok' ? 'text-lime-600' : 'text-red-600'}`}>
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
