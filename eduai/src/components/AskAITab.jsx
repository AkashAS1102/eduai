import { useState, useRef, useEffect } from 'react';
import { askQuestion } from '../lib/ai';

function renderMd(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:#f1f5f9;padding:2px 5px;border-radius:4px;font-size:0.85em">$1</code>')
    .replace(/^### (.*)/gm, '<strong style="font-size:0.95rem">$1</strong>')
    .replace(/^## (.*)/gm, '<strong>$1</strong>')
    .replace(/^# (.*)/gm, '<strong>$1</strong>')
    .replace(/^- (.*)/gm, '• $1')
    .replace(/\n/g, '<br/>');
}

const SUGGESTIONS = [
  'What is the formula for…?',
  'Explain this concept in simple terms',
  'Summarize the main points',
  'What are the key differences between…?',
  'Give me an example of…',
  'What does this term mean?',
];

export default function AskAITab({ file }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm your AI study assistant powered by Groq. Ask me anything about your uploaded document, or any academic topic. I'll give you clear, focused answers. 🎓" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: q }]);
    setLoading(true);
    try {
      const answer = await askQuestion(q, file || null);
      setMessages(m => [...m, { role: 'ai', text: answer }]);
    } catch (e) {
      setMessages(m => [...m, { role: 'ai', text: `⚠️ Error: ${e.message}`, error: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, height: 'calc(100vh - 120px)', maxHeight: 760 }}>
      <div style={{ padding: '0 0 16px' }}>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>Ask AI</h1>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
          Ask targeted questions about your document or any academic topic. Get instant, accurate answers.
          {file && <span style={{ marginLeft: 8, background: '#f0fdf4', border: '1px solid #86efac', color: '#15803d', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>📄 {file.name}</span>}
        </p>
      </div>

      {/* Suggestion chips */}
      {messages.length <= 1 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)}
              style={{ padding: '6px 14px', borderRadius: 20, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#374151', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.target.style.borderColor = '#93c5fd'; e.target.style.background = '#eff6ff'; e.target.style.color = '#1d4ed8'; }}
              onMouseLeave={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.color = '#374151'; }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, paddingRight: 4, marginBottom: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexDirection: m.role === 'user' ? 'row-reverse' : 'row', maxWidth: '88%' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0, background: m.role === 'user' ? '#2563eb' : '#f1f5f9', marginTop: 2 }}>
                {m.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className={`chat-msg ${m.role}`}
                style={{ background: m.error ? '#fef2f2' : undefined, color: m.error ? '#b91c1c' : undefined }}
                dangerouslySetInnerHTML={{ __html: renderMd(m.text) }} />
            </div>
            <p style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: 4, padding: '0 38px' }}>
              {m.role === 'user' ? 'You' : 'Llama 3.3'}
            </p>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, background: '#f1f5f9' }}>🤖</div>
            <div className="chat-msg ai" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8', animation: 'pulse-dot 1s ease-in-out infinite' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8', animation: 'pulse-dot 1s ease-in-out 0.2s infinite' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8', animation: 'pulse-dot 1s ease-in-out 0.4s infinite' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-wrap" style={{ borderRadius: 14, border: '1px solid #e2e8f0', padding: '12px 14px' }}>
        <input
          className="chat-input"
          style={{ border: 'none', background: 'transparent', padding: '0' }}
          placeholder={file ? `Ask anything about "${file.name}"…` : 'Ask any academic question…'}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          disabled={loading}
        />
        <button className="chat-send" onClick={() => send()} disabled={!input.trim() || loading}>
          {loading ? <div className="spinner" /> : '↑'}
        </button>
      </div>
    </div>
  );
}
