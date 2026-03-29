import { useState } from 'react';
import { generateQuiz } from '../lib/gemini';

const DIFF = {
  easy:   { label: 'Easy',   emoji: '🟢', seconds: 0 },
  medium: { label: 'Medium', emoji: '🟡', seconds: 30 },
  hard:   { label: 'Hard',   emoji: '🔴', seconds: 20 },
};

export default function QuizTab({ file }) {
  const [difficulty, setDifficulty] = useState('medium');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [revealed, setRevealed] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const start = async () => {
    const src = file || topic.trim();
    if (!src) return;
    setLoading(true); setError(''); setQuestions([]); setSelected({}); setRevealed({}); setSubmitted(false); setCurrent(0);
    try {
      const qs = await generateQuiz(src, difficulty);
      if (!qs.length) throw new Error('No questions generated. Try a different source.');
      setQuestions(qs);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const reset = () => { setQuestions([]); setSelected({}); setRevealed({}); setSubmitted(false); setCurrent(0); };

  const score = questions.length
    ? Object.entries(selected).filter(([i, a]) => questions[+i]?.answer === a).length
    : 0;

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 16 }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg,#2563eb,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🤖</div>
      <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>Generating Quiz…</p>
      <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Gemini is reading your content (5–15 seconds)</p>
      <div className="progress-bar" style={{ width: 200 }}><div className="progress-fill" style={{ width: '70%' }} /></div>
    </div>
  );

  if (submitted) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="card-body" style={{ padding: '40px 24px' }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>{pct >= 70 ? '🏆' : pct >= 40 ? '📚' : '💪'}</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', marginBottom: 6 }}>Quiz Complete!</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2563eb' }}>{score}/{questions.length}</p>
            <p style={{ color: '#64748b', marginBottom: 20 }}>{pct}% — {pct >= 70 ? 'Great job! 🎉' : pct >= 40 ? 'Keep practicing! 📖' : 'Review the material and retry! 💪'}</p>
            <div className="progress-bar" style={{ marginBottom: 24, maxWidth: 300, margin: '0 auto 24px' }}>
              <div className="progress-fill" style={{ width: `${pct}%`, background: pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444' }} />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={reset}>🔄 New Quiz</button>
              <button className="btn btn-outline" onClick={() => setSubmitted(false)}>👁 Review Answers</button>
            </div>
          </div>
        </div>
        {/* Answer review */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {questions.map((q, qi) => (
            <div key={qi} className="card">
              <div className="card-body">
                <p style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 12, color: '#1e293b' }}>
                  {qi + 1}. {q.q}
                  <span style={{ marginLeft: 8, fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: 8, background: selected[qi] === q.answer ? '#dcfce7' : '#fef2f2', color: selected[qi] === q.answer ? '#15803d' : '#b91c1c' }}>
                    {selected[qi] === q.answer ? '✓ Correct' : '✗ Wrong'}
                  </span>
                </p>
                {q.opts.map((o, oi) => (
                  <div key={oi} className={`quiz-option${oi === q.answer ? ' correct' : selected[qi] === oi && oi !== q.answer ? ' wrong' : ''}`} style={{ marginBottom: 6, cursor: 'default' }}>
                    <span style={{ fontWeight: 700, color: '#94a3b8', marginRight: 8 }}>{String.fromCharCode(65 + oi)}.</span>{o}
                    {oi === q.answer && <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>✓ Correct</span>}
                  </div>
                ))}
                {q.explanation && <p style={{ marginTop: 10, fontSize: '0.8rem', color: '#64748b', background: '#f8fafc', padding: '8px 12px', borderRadius: 8, borderLeft: '3px solid #2563eb' }}>💡 {q.explanation}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>Generate Quiz</h1>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>AI generates quiz questions from your uploaded document or from any topic you enter.</p>
      </div>

      {!questions.length && (
        <div className="card">
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {!file && (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Topic (if no file uploaded)</label>
                <input className="chat-input" placeholder="e.g. Data Structures, Photosynthesis, French Revolution…" value={topic} onChange={e => setTopic(e.target.value)}
                  style={{ width: '100%', display: 'block' }} />
              </div>
            )}
            {file && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '10px 14px' }}>
                <span>📄</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#15803d' }}>{file.name}</span>
                <span style={{ fontSize: '0.75rem', color: '#16a34a' }}>· Will quiz from this file</span>
              </div>
            )}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>Difficulty</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {Object.entries(DIFF).map(([k, d]) => (
                  <button key={k} onClick={() => setDifficulty(k)}
                    className={`btn btn-sm ${difficulty === k ? 'btn-primary' : 'btn-outline'}`}
                    style={{ flex: 1 }}>
                    {d.emoji} {d.label}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn btn-primary btn-full" onClick={start} disabled={!file && !topic.trim()}
              style={{ padding: '13px 20px', fontSize: '0.92rem' }}>
              🎯 Generate Quiz
            </button>
            {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 16px', color: '#b91c1c', fontSize: '0.85rem' }}>⚠️ {error}</div>}
          </div>
        </div>
      )}

      {questions.length > 0 && !submitted && (() => {
        const q = questions[current];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Question {current + 1} of {questions.length}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {questions.map((_, i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === current ? '#2563eb' : selected[i] !== undefined ? '#22c55e' : '#e2e8f0' }} />
                ))}
              </div>
              <button className="btn btn-outline btn-sm" onClick={reset}>✕ Exit</button>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
            <div className="card">
              <div className="card-body">
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: 16, lineHeight: 1.5 }}>{q.q}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {q.opts.map((o, oi) => (
                    <button key={oi} onClick={() => !revealed[current] && setSelected(s => ({ ...s, [current]: oi }))}
                      className={`quiz-option${selected[current] === oi && !revealed[current] ? ' selected' : ''}${revealed[current] && oi === q.answer ? ' correct' : ''}${revealed[current] && selected[current] === oi && oi !== q.answer ? ' wrong' : ''}`}
                      style={{ cursor: revealed[current] ? 'default' : 'pointer', width: '100%' }}>
                      <span style={{ fontWeight: 700, color: '#94a3b8', marginRight: 8, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span>
                      {o}
                    </button>
                  ))}
                </div>
                {selected[current] !== undefined && !revealed[current] && (
                  <button className="btn btn-outline btn-sm" style={{ marginTop: 12 }} onClick={() => setRevealed(r => ({ ...r, [current]: true }))}>Check Answer</button>
                )}
                {revealed[current] && q.explanation && (
                  <p style={{ marginTop: 12, fontSize: '0.8rem', color: '#475569', background: '#f8fafc', padding: '10px 14px', borderRadius: 10, borderLeft: '3px solid #2563eb' }}>
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline" disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>← Prev</button>
              {current < questions.length - 1
                ? <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setCurrent(c => c + 1)}>Next →</button>
                : <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setSubmitted(true)}>Submit Quiz ✓</button>}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
