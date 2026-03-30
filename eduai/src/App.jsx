import { useState, useCallback } from 'react';
import UploadSummarize from './components/UploadSummarize';
import QuizTab from './components/QuizTab';
import FlashcardsTab from './components/FlashcardsTab';
import AskAITab from './components/AskAITab';

const TABS = [
  { id: 'upload',     label: 'Upload & Summarize', icon: '📤', desc: 'Summarize documents'    },
  { id: 'quiz',       label: 'Quiz',               icon: '🎯', desc: 'Test your knowledge'    },
  { id: 'flashcards', label: 'Flashcards',          icon: '🃏', desc: 'Spaced repetition'      },
  { id: 'ask',        label: 'Ask AI',              icon: '💬', desc: 'Get instant answers'    },
];

function Logo() {
  return (
    <div className="sidebar-logo">
      <div className="sidebar-logo-icon">
        <span style={{ fontSize: 18 }}>🎓</span>
      </div>
      <div>
        <p style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1e293b', lineHeight: 1 }}>EduAI</p>
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: 2 }}>Study Smarter</p>
      </div>
    </div>
  );
}

function DarkToggle({ dark, toggle }) {
  return (
    <button onClick={toggle} title={dark ? 'Light mode' : 'Dark mode'}
      style={{ width: 36, height: 36, border: '1.5px solid #e2e8f0', background: 'transparent', borderRadius: 10, cursor: 'pointer', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
      {dark ? '☀️' : '🌙'}
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDark = useCallback(() => {
    setDark(d => {
      document.documentElement.classList.toggle('dark', !d);
      return !d;
    });
  }, []);

  // Apply dark class on mount
  useState(() => { if (dark) document.documentElement.classList.add('dark'); });

  const FMT = b => b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(1) + ' MB';

  return (
    <div className="app-layout">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 99 }} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar${mobileOpen ? ' open' : ''}`}>
        <Logo />

        <nav className="sidebar-nav">
          <span className="sidebar-section-label">Tools</span>
          {TABS.map(t => (
            <button key={t.id} className={`sidebar-item${tab === t.id ? ' active' : ''}`}
              onClick={() => { setTab(t.id); setMobileOpen(false); }}>
              <span className="sidebar-item-icon" style={{ fontSize: 16 }}>{t.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ lineHeight: 1.2 }}>{t.label}</p>
                <p style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 400, marginTop: 1 }}>{t.desc}</p>
              </div>
            </button>
          ))}

          <span className="sidebar-section-label" style={{ marginTop: 8 }}>Document</span>
          {file ? (
            <div style={{ margin: '4px 0' }}>
              <div style={{ padding: '10px 12px', borderRadius: 10, background: '#f0fdf4', border: '1px solid #86efac' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#15803d', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📄 {file.name}</p>
                <p style={{ fontSize: '0.68rem', color: '#16a34a', marginTop: 2 }}>{FMT(file.size)}</p>
              </div>
              <button className="sidebar-item" style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: 4 }} onClick={() => setFile(null)}>
                <span>🗑</span> Remove file
              </button>
            </div>
          ) : (
            <div style={{ padding: '10px 12px', borderRadius: 10, background: '#f8fafc', border: '1.5px dashed #e2e8f0', textAlign: 'center', cursor: 'pointer' }}
              onClick={() => setTab('upload')}>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No file uploaded</p>
              <p style={{ fontSize: '0.68rem', color: '#2563eb', fontWeight: 600, marginTop: 3 }}>Upload in Summary tab →</p>
            </div>
          )}

          <span className="sidebar-section-label" style={{ marginTop: 8 }}>Tips</span>
          <div style={{ padding: '10px 12px', fontSize: '0.73rem', color: '#94a3b8', lineHeight: 1.6 }}>
            <p>📤 Upload → get instant AI summary</p>
            <p style={{ marginTop: 4 }}>🎯 Generate quizzes for active recall</p>
            <p style={{ marginTop: 4 }}>🃏 Flashcards use SM-2 spaced repetition</p>
            <p style={{ marginTop: 4 }}>💬 Ask specific questions about your docs</p>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1e293b' }}>Powered by Groq</p>
              <p style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Llama 3.3 · Free Tier</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="sidebar-item" style={{ display: 'none', padding: '6px 8px', fontSize: 18 }}
              onClick={() => setMobileOpen(o => !o)}>☰</button>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                {TABS.find(t => t.id === tab)?.icon} {TABS.find(t => t.id === tab)?.label}
              </p>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{TABS.find(t => t.id === tab)?.desc}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {file && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '5px 12px' }}>
                <span style={{ fontSize: 14 }}>📄</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#15803d', maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</span>
              </div>
            )}
            <DarkToggle dark={dark} toggle={toggleDark} />
          </div>
        </header>

        {/* Page content */}
        <div className="page-content">
          {tab === 'upload'     && <UploadSummarize file={file} setFile={setFile} />}
          {tab === 'quiz'       && <QuizTab file={file} />}
          {tab === 'flashcards' && <FlashcardsTab file={file} />}
          {tab === 'ask'        && <AskAITab file={file} />}
        </div>
      </main>
    </div>
  );
}
