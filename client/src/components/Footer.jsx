import { profile } from '../data/siteData.js';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-lime-300/40 px-5 py-8 text-center text-xs text-neutral-600">
      © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS &amp; Node.js.
    </footer>
  );
}
