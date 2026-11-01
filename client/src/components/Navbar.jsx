import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profile } from '../data/siteData.js';

const links = [
  ['About', '#about'],
  ['Process', '#process'],
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-display text-2xl italic tracking-tight">
          {profile.name}
        </a>

        <nav className="glass hidden items-center gap-1 !rounded-full px-2 py-1.5 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3.5 py-1.5 text-sm text-neutral-600 transition hover:bg-black/5 hover:text-ink"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="glass flex h-10 w-10 items-center justify-center !rounded-full md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="glass mx-5 animate-pop p-3 md:hidden">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm hover:bg-black/5"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
