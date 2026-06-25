import { useEffect, useRef, useState } from 'react';
import { fetchClients, fetchHealth, sendChat } from './api.js';
import './chatWidget.css';

const DEMO_QUESTIONS = [
  'What is the status of my latest invoice?',
  'How many seats do I have and are any available?',
  "What's the status of my open service requests?",
];

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function initials(name) {
  return (name || '?')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    fetchHealth().then((h) => setMode(h.mode)).catch(() => {});
    fetchClients().then((list) => {
      setClients(list);
      if (list.length) setClientId(list[0].clientId);
    }).catch(() => setError('Could not reach the assistant backend. Make sure the server is running on port 3001.'));
  }, []);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  async function ask(text) {
    if (!text.trim() || !clientId || loading) return;
    setMessages((m) => [...m, { role: 'user', text, time: now() }]);
    setInput('');
    setLoading(true);
    try {
      const { reply } = await sendChat(clientId, text);
      setMessages((m) => [...m, { role: 'assistant', text: reply, time: now() }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: 'Something went wrong. Please try again.', time: now() }]);
    } finally {
      setLoading(false);
    }
  }

  const current = clients.find((c) => c.clientId === clientId);

  return (
    <div className="kmc-widget">
      {open && (
        <div className="panel">
          <header className="header">
            <div className="header-row">
              <div className="avatar">{current ? initials(current.companyName) : 'AI'}</div>
              <div className="header-meta">
                <div className="header-title">
                  {current ? current.companyName : 'Client Assistant'}
                  {mode && <span className={`mode-badge ${mode}`}>{mode === 'agent' ? 'AI agent' : 'deterministic'}</span>}
                </div>
                <div className="header-sub">
                  <span className="online-dot" /> online
                  {current && <> · prefers {current.preferredChannel}</>}
                </div>
              </div>
              <select
                className="client-select"
                value={clientId}
                onChange={(e) => { setClientId(e.target.value); setMessages([]); }}
                aria-label="Select client"
              >
                {clients.map((c) => (
                  <option key={c.clientId} value={c.clientId}>{c.companyName} ({c.clientId})</option>
                ))}
              </select>
              <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
            </div>
          </header>

          {error && <div className="error-banner">{error}</div>}

          <div className="chat" ref={chatRef}>
            {messages.length === 0 && !loading && (
              <p className="hint">Ask about your invoice, seats, or service requests 👇</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`row ${m.role}`}>
                <div className={`bubble ${m.role}`}>
                  <span className="bubble-text">{m.text}</span>
                  <span className="bubble-meta">
                    {m.time}
                    {m.role === 'user' && <span className="ticks">✓✓</span>}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="row assistant">
                <div className="bubble assistant typing">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </div>
              </div>
            )}
          </div>

          <div className="chips">
            {DEMO_QUESTIONS.map((q) => (
              <button key={q} className="chip" onClick={() => ask(q)} disabled={loading}>{q}</button>
            ))}
          </div>

          <form className="composer" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
            />
            <button type="submit" className="send-btn" disabled={loading} aria-label="Send">➤</button>
          </form>
        </div>
      )}

      <button
        className={`launcher ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Minimize chat' : 'Open chat'}
      >
        {open ? '⌄' : '💬'}
      </button>
    </div>
  );
}
