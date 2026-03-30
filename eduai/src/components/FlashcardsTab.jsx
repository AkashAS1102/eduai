import { useState } from 'react';
import { generateFlashcards } from '../lib/ai';

function sm2(card, q) {
  let { ef = 2.5, interval = 1, reps = 0 } = card;
  if (q >= 3) { interval = reps === 0 ? 1 : reps === 1 ? 6 : Math.round(interval * ef); reps++; ef = Math.max(1.3, ef + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)); }
  else { reps = 0; interval = 1; }
  return { ...card, ef, interval, reps };
}

export default function FlashcardsTab({ file }) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const [streak, setStreak] = useState(0);

  const generate = async () => {
    const src = file || topic.trim();
    if (!src) return;
    setLoading(true); setError(''); setCards([]); setIdx(0); setFlipped(false); setDone(0); setStreak(0);
    try {
      const result = await generateFlashcards(src);
      if (!result.length) throw new Error('No flashcards generated.');
      setCards(result);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const rate = (q) => {
    setCards(prev => { const n = [...prev]; n[idx] = sm2(n[idx], q); return n; });
    if (q >= 3) setStreak(s => s + 1); else setStreak(0);
    setDone(d => d + 1);
    setFlipped(false);
    setTimeout(() => setIdx(i => i + 1), 200);
  };

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 16 }}>
      <div style={{ fontSize: 52 }}>🃏</div>
      <p style={{ fontWeight: 700, color: '#1e293b' }}>Generating Flashcards…</p>
      <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Creating smart study cards from your content</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>Flashcards</h1>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>AI generates smart flashcards with spaced repetition (SM-2 algorithm) for maximum retention.</p>
      </div>

      {!cards.length && (
        <div className="card">
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {!file && (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Topic</label>
                <input className="chat-input" placeholder="e.g. Organic Chemistry, World War II, Calculus…" value={topic} onChange={e => setTopic(e.target.value)} style={{ width: '100%', display: 'block' }} />
              </div>
            )}
            {file && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '10px 14px' }}>
                <span>📄</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#15803d' }}>{file.name}</span>
              </div>
            )}
            <button className="btn btn-primary btn-full" onClick={generate} disabled={!file && !topic.trim()} style={{ padding: '13px 20px' }}>
              🃏 Generate Flashcards
            </button>
            {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 16px', color: '#b91c1c', fontSize: '0.85rem' }}>⚠️ {error}</div>}
          </div>
        </div>
      )}

      {cards.length > 0 && idx < cards.length && (() => {
        const card = cards[idx];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Stats bar */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {[['📇', `${idx + 1}/${cards.length}`, 'Card'], ['🔥', streak, 'Streak'], ['✅', done, 'Reviewed']].map(([e, v, l]) => (
                <div key={l} className="card" style={{ flex: 1, textAlign: 'center', padding: '12px 8px' }}>
                  <div style={{ fontSize: 18 }}>{e}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1e293b' }}>{v}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Flashcard */}
            <div className="flashcard-wrap" onClick={() => setFlipped(f => !f)}>
              <div className={`flashcard-inner${flipped ? ' flipped' : ''}`}>
                <div className="flashcard-face flashcard-front">
                  {card.topic && <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#bfdbfe', color: '#1d4ed8', padding: '3px 10px', borderRadius: 20, marginBottom: 12 }}>{card.topic}</span>}
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>QUESTION</p>
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b', lineHeight: 1.5 }}>{card.front}</p>
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 16 }}>👆 tap to reveal answer</p>
                </div>
                <div className="flashcard-face flashcard-back">
                  {card.topic && <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#bbf7d0', color: '#15803d', padding: '3px 10px', borderRadius: 20, marginBottom: 12 }}>{card.topic}</span>}
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>ANSWER</p>
                  <p style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.65 }}>{card.back}</p>
                </div>
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>Click the card to flip</p>

            {flipped && (
              <div style={{ display: 'flex', gap: 10 }}>
                {[['😓 Hard', 1, '#fef2f2', '#b91c1c', '#fecaca'], ['🤔 Medium', 3, '#fffbeb', '#92400e', '#fde68a'], ['😊 Easy', 5, '#f0fdf4', '#15803d', '#86efac']].map(([label, q, bg, color, border]) => (
                  <button key={label} onClick={() => rate(q)}
                    style={{ flex: 1, padding: '12px 8px', borderRadius: 12, border: `1.5px solid ${border}`, background: bg, color, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                    {label}
                  </button>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
              <button className="btn btn-outline btn-sm" onClick={() => { setCards([]); setIdx(0); setFlipped(false); }}>← New Set</button>
              <button className="btn btn-outline btn-sm" onClick={() => { setIdx(i => Math.min(i + 1, cards.length - 1)); setFlipped(false); }}>Skip →</button>
            </div>
          </div>
        );
      })()}

      {cards.length > 0 && idx >= cards.length && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="card-body" style={{ padding: '40px 24px' }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>All cards reviewed!</h2>
            <p style={{ color: '#64748b', marginBottom: 8 }}>Streak: 🔥 {streak} · Reviewed: {done}</p>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: 24 }}>SRS algorithm will schedule your next review based on performance.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => { setIdx(0); setFlipped(false); setDone(0); setStreak(0); }}>🔄 Restart Deck</button>
              <button className="btn btn-outline" onClick={() => { setCards([]); setIdx(0); }}>➕ New Set</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
