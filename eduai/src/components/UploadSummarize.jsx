import { useState, useCallback } from 'react';
import { summarize } from '../lib/gemini';

const FMT = b => b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(1) + ' MB';

function renderMd(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^### (.*)/gm, '<h3>$1</h3>')
    .replace(/^## (.*)/gm, '<h2>$1</h2>')
    .replace(/^# (.*)/gm, '<h1>$1</h1>')
    .replace(/^- (.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|l|p])/gm, '<p>$&</p>')
    .replace(/<p><\/p>/g, '');
}

export default function UploadSummarize({ file, setFile }) {
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleFile = useCallback((f) => {
    if (!f) return;
    setFile(f);
    setSummary('');
    setError('');
  }, [setFile]);

  const handleDrop = (e) => {
    e.preventDefault(); setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const doSummarize = async () => {
    if (!file) return;
    setLoading(true); setError(''); setSummary('');
    try {
      const result = await summarize(file);
      setSummary(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>Upload &amp; Summarize</h1>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>Upload your textbook chapter or lecture notes to get a concise AI-generated summary of key points.</p>
      </div>

      {/* Drop zone */}
      <div
        className={`drop-zone${drag ? ' dragging' : ''}`}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload-input').click()}
      >
        <input id="file-upload-input" type="file" accept=".pdf,.docx,.txt,.md,.pptx"
          onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />
        <div style={{ fontSize: 36, marginBottom: 12 }}>📄</div>
        <p style={{ fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>
          {file ? file.name : 'Drop your file here'}
        </p>
        {file ? (
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{FMT(file.size)} · Click to change file</p>
        ) : (
          <>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: 12 }}>or click to browse — PDF, DOCX, TXT, PPT, Markdown</p>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['PDF', 'DOCX', 'TXT', 'PPTX', 'MD'].map(f => (
                <span key={f} style={{ background: '#eff6ff', color: '#2563eb', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20, border: '1px solid #bfdbfe' }}>{f}</span>
              ))}
            </div>
          </>
        )}
      </div>

      {file && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="file-item" style={{ flex: 1 }}>
            <span style={{ fontSize: 22 }}>📄</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</p>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>{FMT(file.size)}</p>
            </div>
            <span style={{ fontSize: '0.7rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>Ready</span>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => { setFile(null); setSummary(''); setError(''); }}>Remove</button>
        </div>
      )}

      <button className="btn btn-primary btn-full" onClick={doSummarize} disabled={!file || loading}
        style={{ padding: '13px 20px', fontSize: '0.92rem' }}>
        {loading ? <><div className="spinner" /> Analyzing document…</> : <><span>✨</span> Generate Summary</>}
      </button>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '14px 18px', color: '#b91c1c', fontSize: '0.85rem' }}>
          ⚠️ <strong>Error:</strong> {error}
        </div>
      )}

      {summary && (
        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>📝</span> AI Summary
            </span>
            <button className="btn btn-outline btn-sm" onClick={() => { const b = new Blob([summary], { type: 'text/plain' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'summary.txt'; a.click(); }}>
              ⬇ Export
            </button>
          </div>
          <div className="card-body summary-content"
            dangerouslySetInnerHTML={{ __html: renderMd(summary) }} />
        </div>
      )}

      {!summary && !loading && (
        <div className="card">
          <div className="card-body" style={{ padding: '24px 20px' }}>
            <p style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 12, color: '#374151' }}>💡 How to use</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['📤', 'Upload', 'Upload your textbook chapter, lecture notes, or any study material (PDF, DOCX, TXT, PPT)'],
                ['🤖', 'Summarize', 'AI extracts key concepts, definitions, formulas and organizes them clearly'],
                ['📋', 'Export', 'Download the summary as a text file for offline study'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.82rem', color: '#1e293b' }}>{title}</p>
                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 2 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
