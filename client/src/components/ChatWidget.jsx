import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
import { profile, chatSuggestions } from '../data/siteData.js';

const GREETING = {
  role: 'assistant',
  content: `Hi! I'm an AI version of ${profile.firstName}. Ask me about my projects, internships, skills or education.`,
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy, open]);

  async function send(text) {
    const message = (text ?? input).trim();
    if (!message || busy) return;
    const history = messages.filter((m) => m !== GREETING);
    setMessages((m) => [...m, { role: 'user', content: message }]);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'assistant', content: err.message, error: true }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[min(560px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2.5rem))] animate-pop flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-gradient-to-r from-lime-400 to-lime-300 px-4 py-3">
            <img src={profile.photo} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover object-[50%_15%]" />
            <div className="flex-1 leading-tight">
              <div className="text-sm font-semibold">Chat with {profile.firstName}&apos;s AI</div>
              <div className="text-[11px] text-black/60">Answers from my resume &amp; profile</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1.5 hover:bg-black/10">
              <X size={18} />
            </button>
          </div>

          <div className="chat-scroll flex-1 space-y-3 overflow-y-auto bg-neutral-50 p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-ink text-white'
                      : m.error
                      ? 'rounded-bl-md bg-red-50 text-red-700'
                      : 'rounded-bl-md bg-white text-neutral-800 shadow-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {chatSuggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-lime-400 bg-lime-50 px-3 py-1.5 text-xs font-medium text-lime-600 transition hover:bg-lime-100">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2 border-t border-black/5 bg-white p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              maxLength={1000}
              className="flex-1 rounded-full border border-black/10 bg-neutral-50 px-4 py-2.5 text-sm outline-none focus:border-lime-500"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition disabled:opacity-40">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="group flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-medium text-white shadow-xl transition hover:-translate-y-0.5"
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
        {!open && (
          <>
            <span className="hidden sm:inline">Ask my AI</span>
            <Sparkles size={14} className="text-lime-400" />
          </>
        )}
      </button>
    </div>
  );
}
