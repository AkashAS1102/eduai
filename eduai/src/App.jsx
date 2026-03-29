import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import {
  Brain, Zap, Upload, FileText, BarChart2, CheckCircle,
  Star, Layers, Target, Clock, Moon, Sun, Timer, RotateCcw,
  Download, RefreshCw, User, Menu, GraduationCap,
  FileQuestion, Lightbulb, TrendingUp, Shield, Award, Play, Sparkles
} from 'lucide-react';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import BlogPage from './pages/BlogPage';
import NotFoundPage from './pages/NotFoundPage';

/* ─── Nav link map ───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Features',     to: '/features'      },
  { label: 'How it Works', to: '/how-it-works'  },
  { label: 'Blog',         to: '/blog'          },
];

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('eduai-dark');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('eduai-dark', dark);
  }, [dark]);

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 text-sm font-medium ${
      isActive ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-blue-600'
    }`;

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'w-[92%] max-w-5xl' : 'w-[88%] max-w-4xl'}`}>
      <div className="glass rounded-2xl px-5 py-3 shadow-glass flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="text-gray-900 font-extrabold text-lg tracking-tight">Edu<span className="text-gradient">AI</span></span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>
          ))}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(d => !d)}
            className="p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark
              ? <Sun size={17} className="text-yellow-400" />
              : <Moon size={17} className="text-gray-500" />}
          </button>
          <a href="#" className="hidden md:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Sign In</a>
          <Link to="/" className="nav-btn bg-gray-900 text-white rounded-full px-5 py-2 text-sm font-semibold flex items-center gap-2 shadow-btn">
            <User size={14} />
            <span>Get Started</span>
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl hover:bg-blue-50 transition-colors">
            <Menu size={18} className="text-gray-700" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="glass mt-2 rounded-2xl px-5 py-4 shadow-glass flex flex-col gap-3 md:hidden">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `text-sm font-medium py-1 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}>{label}</NavLink>
          ))}
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 py-1">Sign In</a>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero({ inputValue, setInputValue, onGenerate }) {
  return (
    <section className="relative w-full hero-gradient pt-36 pb-56 px-4 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-56 h-56 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-40 bg-blue-100/40 rounded-full blur-2xl pointer-events-none" />

      {/* Badge */}
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
          <Sparkles size={12} />
          AI-Powered Learning · 10,000+ Students Trust EduAI
        </span>
      </div>

      {/* Main heading */}
      <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl mx-auto">
        Make Your Exam Prep{' '}
        <span className="block mt-1">
          Fast and Smart, with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">EduAI</span>
        </span>
      </h1>

      <p className="text-center text-gray-500 mt-5 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
        Upload your notes or syllabus and let our AI instantly generate smart quizzes, flashcards, and summaries — tailored just for you.
      </p>

      {/* Input bar */}
      <div className="mt-8 max-w-2xl mx-auto">
        <div className="relative flex items-center bg-white rounded-2xl shadow-[0_8px_40px_rgba(59,130,246,0.12)] border border-blue-100 p-2 gap-2">
          <div className="flex-1 flex items-center gap-3 px-3">
            <Upload size={16} className="text-blue-400 shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Upload syllabus or paste topic name..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              id="hero-input"
            />
          </div>
          <button
            id="generate-quiz-btn"
            onClick={onGenerate}
            className="generate-btn bg-gray-900 text-white rounded-xl px-5 py-3 text-sm font-semibold flex items-center gap-2 shadow-btn shrink-0"
          >
            <span>Generate Quiz</span>
            <Zap size={14} className="relative z-10" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-4">
          {['PDF', 'DOCX', 'PPT', 'TXT', 'Markdown'].map(f => (
            <span key={f} className="flex items-center gap-1"><CheckCircle size={10} className="text-green-400" />{f}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ─── Floating Cards ─────────────────────────────────────────── */
function FloatingCards({ quizStarted }) {
  const [progress, setProgress] = useState(45);
  useEffect(() => {
    const iv = setInterval(() => setProgress(p => p < 95 ? p + 1 : 20), 300);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative z-10 -mt-36 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Card 1 – Document Uploaded */}
        <div className="float-card-1 glass rounded-3xl p-5 shadow-glass hover:shadow-glass-hover transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-400 rounded-xl flex items-center justify-center shadow-md">
                <FileText size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Document</p>
                <p className="text-sm font-bold text-gray-800">Uploaded</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full dot-pulse" />
              Success
            </span>
          </div>
          <div className="bg-blue-50/60 rounded-2xl p-3 border border-blue-100/50">
            <p className="text-xs font-semibold text-gray-700 truncate">Biology_Chapter_5.pdf</p>
            <p className="text-xs text-gray-400 mt-0.5">2.4 MB · 48 pages</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-xl p-2.5 text-center">
              <p className="text-base font-extrabold text-blue-600">142</p>
              <p className="text-[10px] text-gray-400">Topics found</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-2.5 text-center">
              <p className="text-base font-extrabold text-green-600">98%</p>
              <p className="text-[10px] text-gray-400">Parsed</p>
            </div>
          </div>
        </div>

        {/* Card 2 – Quiz Generator (center, taller) */}
        <div className="float-card-2 glass rounded-3xl p-5 shadow-glass hover:shadow-glass-hover transition-all duration-300 cursor-pointer md:-mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-md">
                <Brain size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">AI Engine</p>
                <p className="text-sm font-bold text-gray-800">Quiz Generator</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">LIVE</span>
          </div>
          {/* Mock question */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3.5 border border-blue-100/50 mb-3">
            <p className="text-xs font-semibold text-gray-700 leading-snug">Which organelle is known as the powerhouse of the cell?</p>
          </div>
          {['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'].map((opt, i) => (
            <div key={opt} className={`quiz-option flex items-center gap-2.5 px-3 py-2 rounded-xl mb-1.5 border text-xs cursor-pointer ${i === 1 ? 'selected border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50' : 'border-gray-100 bg-gray-50/60 hover:border-blue-200'}`}>
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${i === 1 ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                {i === 1 && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
              </span>
              <span className={i === 1 ? 'font-semibold text-blue-700' : 'text-gray-600'}>{opt}</span>
              {i === 1 && <CheckCircle size={12} className="ml-auto text-blue-500" />}
            </div>
          ))}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>Generating questions…</span><span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="progress-fill h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 3 – Flashcards (interactive flip) */}
        {(() => {
          const CARDS = [
            { q: 'What is Photosynthesis?',      a: 'Process by which plants convert sunlight into glucose using CO₂ and water.' },
            { q: 'What is Mitochondria?',        a: 'The ‘powerhouse of the cell’ — produces ATP through cellular respiration.' },
            { q: 'What is DNA?',                 a: 'Deoxyribonucleic acid — carries genetic instructions for development and function.' },
          ];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [cardIdx, setCardIdx] = useState(0);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [flipped, setFlipped] = useState(false);
          const card = CARDS[cardIdx];
          return (
            <div className="float-card-3 glass rounded-3xl p-5 shadow-glass hover:shadow-glass-hover transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-400 rounded-xl flex items-center justify-center shadow-md">
                    <Layers size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Smart</p>
                    <p className="text-sm font-bold text-gray-800">Flashcards</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">Tap to flip</span>
              </div>
              {/* Flip card */}
              <div
                onClick={() => setFlipped(f => !f)}
                className="relative h-24 mb-3 cursor-pointer select-none"
                style={{ perspective: '800px' }}
              >
                <div style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                  position: 'relative', width: '100%', height: '100%'
                }}>
                  {/* Front */}
                  <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-200/60 flex flex-col items-center justify-center shadow-sm px-3">
                    <p className="text-[10px] text-violet-500 font-semibold uppercase tracking-widest mb-1">Question</p>
                    <p className="text-xs font-bold text-gray-700 text-center">{card.q}</p>
                  </div>
                  {/* Back */}
                  <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex flex-col items-center justify-center shadow-sm px-3">
                    <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-widest mb-1">Answer</p>
                    <p className="text-[11px] font-semibold text-white text-center leading-relaxed">{card.a}</p>
                  </div>
                </div>
              </div>
              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button onClick={() => { setCardIdx(i => (i - 1 + CARDS.length) % CARDS.length); setFlipped(false); }}
                  className="text-[10px] font-semibold text-gray-500 hover:text-violet-600 transition-colors px-2 py-1 rounded-lg hover:bg-violet-50">
                  ← Prev
                </button>
                <div className="flex gap-1">
                  {CARDS.map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === cardIdx ? 'bg-violet-600 w-3' : 'bg-gray-300'}`} />)}
                </div>
                <button onClick={() => { setCardIdx(i => (i + 1) % CARDS.length); setFlipped(false); }}
                  className="text-[10px] font-semibold text-gray-500 hover:text-violet-600 transition-colors px-2 py-1 rounded-lg hover:bg-violet-50">
                  Next →
                </button>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}

/* ─── Supported formats ticker ───────────────────────────────── */
const FORMATS = [
  { label: 'PDF Documents', icon: '📄', color: 'text-red-500' },
  { label: 'Word DOCX', icon: '📝', color: 'text-blue-600' },
  { label: 'PowerPoint PPT', icon: '📊', color: 'text-orange-500' },
  { label: 'Plain Text TXT', icon: '📃', color: 'text-gray-600' },
  { label: 'Markdown MD', icon: '⚡', color: 'text-purple-600' },
  { label: 'Google Docs', icon: '🗒️', color: 'text-blue-500' },
  { label: 'EPUB Books', icon: '📚', color: 'text-green-600' },
  { label: 'CSV / Xlsx', icon: '📋', color: 'text-teal-600' },
];

function FormatsTicker() {
  const items = [...FORMATS, ...FORMATS];
  return (
    <div className="w-full bg-white py-10 border-y border-gray-100 overflow-hidden">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Supported Formats</p>
      <div className="flex overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="ticker-track flex gap-6 whitespace-nowrap">
          {items.map((f, i) => (
            <div key={i} className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-xl border border-gray-100 shrink-0 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
              <span className="text-lg">{f.icon}</span>
              <span className={`text-sm font-semibold ${f.color}`}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Upload Zone ─────────────────────────────────────────────── */
function UploadZone({ onFileUpload, uploading, uploadedFile }) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileUpload(file);
  };

  return (
    <div
      id="upload-zone"
      className={`upload-zone glass rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer min-h-[340px] flex flex-col items-center justify-center p-8 text-center
        ${dragging ? 'border-blue-500 bg-blue-50/50 shadow-[0_0_40px_rgba(59,130,246,0.15)]' : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50/30'}`}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileRef.current?.click()}
    >
      <input ref={fileRef} type="file" className="hidden" accept=".pdf,.docx,.ppt,.pptx,.txt,.md" onChange={e => e.target.files[0] && onFileUpload(e.target.files[0])} />

      {uploading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg animate-pulse">
            <RefreshCw size={28} className="text-white animate-spin" />
          </div>
          <p className="text-sm font-semibold text-blue-600">Analyzing your document…</p>
          <div className="w-48 h-1.5 bg-blue-100 rounded-full overflow-hidden">
            <div className="progress-fill h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
          </div>
        </div>
      ) : uploadedFile ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg">
            <CheckCircle size={28} className="text-white" />
          </div>
          <div>
            <p className="text-base font-bold text-gray-800">{uploadedFile.name}</p>
            <p className="text-sm text-gray-400 mt-1">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB · Ready to generate</p>
          </div>
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <CheckCircle size={11} /> File Processed Successfully
          </span>
        </div>
      ) : (
        <>
          <div className="upload-icon w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg mb-5 transition-transform duration-300">
            <Upload size={28} className="text-white" />
          </div>
          <h3 className="text-lg font-extrabold text-gray-800">Drop your files here</h3>
          <p className="text-sm text-gray-400 mt-2 max-w-xs">Drag & drop any PDF, DOCX, PPT, or TXT file, or click to browse</p>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {['PDF', 'DOCX', 'PPT', 'TXT', 'MD'].map(f => (
              <span key={f} className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">{f}</span>
            ))}
          </div>
          <button className="mt-6 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl shadow-btn hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
            Browse Files
          </button>
        </>
      )}
    </div>
  );
}

/* ─── Mock AI question generator ─────────────────────────────── */
const QUESTION_BANK = {
  biology: [
    { q: 'Which organelle is known as the powerhouse of the cell?', opts: ['Nucleus', 'Mitochondria', 'Ribosome', 'Lysosome'], answer: 1 },
    { q: 'What is the primary function of DNA?', opts: ['Energy production', 'Protein synthesis direction', 'Cell division', 'Lipid metabolism'], answer: 1 },
    { q: 'Which process converts glucose to pyruvate?', opts: ['Krebs cycle', 'Glycolysis', 'Photosynthesis', 'Fermentation'], answer: 1 },
    { q: 'What is the basic unit of life?', opts: ['Atom', 'Molecule', 'Cell', 'Organ'], answer: 2 },
    { q: 'Which gas do plants release during photosynthesis?', opts: ['CO₂', 'Nitrogen', 'Oxygen', 'Hydrogen'], answer: 2 },
  ],
  chemistry: [
    { q: 'What is the atomic number of Carbon?', opts: ['4', '6', '8', '12'], answer: 1 },
    { q: 'Which bond involves sharing of electrons?', opts: ['Ionic', 'Metallic', 'Covalent', 'Hydrogen'], answer: 2 },
    { q: 'What is the pH of a neutral solution at 25°C?', opts: ['0', '7', '14', '3'], answer: 1 },
    { q: 'Which element is a noble gas?', opts: ['Chlorine', 'Neon', 'Sodium', 'Sulfur'], answer: 1 },
    { q: 'What is Avogadro\'s number approximately?', opts: ['6.02×10²³', '3.14×10¹⁰', '1.67×10⁻²⁷', '9.8×10⁶'], answer: 0 },
  ],
  physics: [
    { q: 'What is the unit of electric current?', opts: ['Volt', 'Watt', 'Ampere', 'Ohm'], answer: 2 },
    { q: 'What is Newton\'s first law also called?', opts: ['Law of Gravitation', 'Law of Inertia', 'Law of Motion', 'Law of Acceleration'], answer: 1 },
    { q: 'What is the speed of light in vacuum?', opts: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10¹⁰ m/s', '3×10⁴ m/s'], answer: 0 },
    { q: 'Which quantity is conserved in all collisions?', opts: ['Kinetic Energy', 'Momentum', 'Velocity', 'Force'], answer: 1 },
    { q: 'What does E=mc² represent?', opts: ['Entropy', 'Mass-Energy equivalence', 'Electric field', 'Momentum'], answer: 1 },
  ],
  history: [
    { q: 'In which year did World War II end?', opts: ['1943', '1944', '1945', '1946'], answer: 2 },
    { q: 'Who was the first President of the United States?', opts: ['Thomas Jefferson', 'Abraham Lincoln', 'John Adams', 'George Washington'], answer: 3 },
    { q: 'Which empire built the Colosseum?', opts: ['Greek', 'Roman', 'Ottoman', 'Byzantine'], answer: 1 },
    { q: 'The French Revolution began in which year?', opts: ['1776', '1789', '1799', '1804'], answer: 1 },
    { q: 'Who discovered America in 1492?', opts: ['Vasco da Gama', 'Ferdinand Magellan', 'Christopher Columbus', 'Amerigo Vespucci'], answer: 2 },
  ],
  math: [
    { q: 'What is the derivative of sin(x)?', opts: ['-cos(x)', 'cos(x)', 'tan(x)', '-sin(x)'], answer: 1 },
    { q: 'What is the value of π (pi) approximately?', opts: ['2.718', '3.141', '1.618', '1.414'], answer: 1 },
    { q: 'Which theorem relates sides of a right triangle?', opts: ['Euler\'s', 'Fermat\'s', 'Pythagoras\' theorem', 'Bayes\' theorem'], answer: 2 },
    { q: 'What is 12 factorial (12!)?', opts: ['479001600', '3628800', '720', '40320'], answer: 0 },
    { q: 'The integral of 1/x is:', opts: ['x', 'ln|x| + C', '1/x² + C', 'e^x + C'], answer: 1 },
  ],
  default: [
    { q: 'What does AI stand for?', opts: ['Automated Intelligence', 'Artificial Intelligence', 'Augmented Interface', 'Advanced Integration'], answer: 1 },
    { q: 'Which data structure operates on LIFO principle?', opts: ['Queue', 'Array', 'Stack', 'Tree'], answer: 2 },
    { q: 'What is the time complexity of binary search?', opts: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], answer: 2 },
    { q: 'Which protocol is used to load web pages?', opts: ['FTP', 'SMTP', 'HTTP', 'SSH'], answer: 2 },
    { q: 'RAM stands for:', opts: ['Read-Only Memory', 'Random Access Memory', 'Rapid Action Module', 'Remote Access Model'], answer: 1 },
  ],
};

function generateQuestionsFromTopic(topic) {
  const lower = (topic || '').toLowerCase();
  let bank = QUESTION_BANK.default;
  if (lower.match(/bio|cell|organ|gene|dna|life/)) bank = QUESTION_BANK.biology;
  else if (lower.match(/chem|atom|molecule|element|bond|acid/)) bank = QUESTION_BANK.chemistry;
  else if (lower.match(/phys|force|energy|motion|newton|wave|electric/)) bank = QUESTION_BANK.physics;
  else if (lower.match(/hist|war|empire|revolution|president|ancient/)) bank = QUESTION_BANK.history;
  else if (lower.match(/math|calc|algebra|geom|trigon|statistics|derivative/)) bank = QUESTION_BANK.math;
  return bank.map((q, i) => ({ id: i + 1, ...q }));
}

/* ─── Quiz Panel ──────────────────────────────────────────────── */

/* ─── Difficulty config ───────────────────────────────────────── */
const DIFF = {
  easy:   { label: 'Easy',   seconds: 0,  color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-300', emoji: '🟢' },
  medium: { label: 'Medium', seconds: 30, color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-300', emoji: '🟡' },
  hard:   { label: 'Hard',   seconds: 15, color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-300',   emoji: '🔴' },
};

function downloadCSV(questions, selected) {
  const rows = [['#', 'Question', 'Your Answer', 'Correct Answer', 'Result']];
  questions.forEach((q, i) => {
    const yours = selected[i] !== undefined ? q.opts[selected[i]] : 'Not answered';
    const correct = q.opts[q.answer];
    const result = selected[i] === q.answer ? 'Correct' : 'Wrong';
    rows.push([i + 1, q.q, yours, correct, result]);
  });
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'quiz-results.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

function QuizPanel({ quizStarted, onStart, questions = [], topic = '', difficulty = 'medium' }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [tab, setTab] = useState('quiz');
  const [timeLeft, setTimeLeft] = useState(null);

  const secPerQ = DIFF[difficulty]?.seconds ?? 30;

  // Reset when new questions arrive
  useEffect(() => {
    setCurrent(0); setSelected({}); setSubmitted(false); setTab('quiz');
    setTimeLeft(secPerQ > 0 ? secPerQ : null);
  }, [questions, difficulty]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || submitted) return;
    if (timeLeft === 0) {
      // Auto-advance or submit on timeout
      if (current < qs.length - 1) {
        setCurrent(c => c + 1);
        setTimeLeft(secPerQ);
      } else {
        setSubmitted(true);
      }
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, submitted]);

  // Reset timer on question change
  useEffect(() => {
    if (secPerQ > 0) setTimeLeft(secPerQ);
  }, [current]);

  const qs = questions.length ? questions : [];
  const q = qs[current];
  const score = qs.length ? Object.entries(selected).filter(([qi, ans]) => qs[parseInt(qi)].answer === ans).length : 0;
  const totalQ = qs.length;

  const summaryCards = [
    { title: `${topic || 'Key'} Concepts`, text: `Core ideas extracted and organised into ${totalQ} targeted questions.`, tag: 'Overview' },
    { title: 'Important Definitions', text: 'Key terms identified. Review flashcards above to reinforce vocabulary.', tag: 'Vocabulary' },
    { title: 'Exam Tips', text: 'Focus on wrong answers. Stats tab highlights your weak areas.', tag: 'Strategy' },
  ];

  const timerColor = timeLeft !== null && timeLeft <= 5 ? 'text-red-600' : 'text-blue-600';

  if (!quizStarted) {
    return (
      <div className="glass rounded-3xl p-6 shadow-glass min-h-[340px] flex flex-col items-center justify-center text-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center">
          <FileQuestion size={28} className="text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-gray-800">Quiz &amp; Summary Area</h3>
          <p className="text-sm text-gray-400 mt-1.5 max-w-xs">Upload a document or enter a topic above, then click <strong>Generate Quiz</strong>.</p>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          {[
            { icon: <Brain size={14} />, label: 'AI Quiz Generation', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: <Layers size={14} />, label: 'Smart Flashcards', color: 'text-violet-600', bg: 'bg-violet-50' },
            { icon: <BarChart2 size={14} />, label: 'Performance Analytics', color: 'text-green-600', bg: 'bg-green-50' },
          ].map(({ icon, label, color, bg }) => (
            <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700">
              <span className={`w-6 h-6 ${bg} ${color} rounded-lg flex items-center justify-center`}>{icon}</span>
              {label}
            </div>
          ))}
        </div>
        <button id="start-demo-quiz" onClick={onStart} className="generate-btn bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-btn">
          <span>Try Demo Quiz</span><Play size={13} className="relative z-10" />
        </button>
      </div>
    );
  }

  if (!qs.length) return null;

  return (
    <div className="glass rounded-3xl shadow-glass overflow-hidden">
      {/* Topic + difficulty badge */}
      {topic && (
        <div className="flex items-center gap-2 px-5 pt-4 pb-0 flex-wrap">
          <span className="text-[11px] bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Brain size={10} /> {topic}
          </span>
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${DIFF[difficulty].bg} ${DIFF[difficulty].color}`}>
            {DIFF[difficulty].emoji} {DIFF[difficulty].label}
          </span>
          <span className="text-[11px] text-gray-400">{totalQ} questions</span>
        </div>
      )}
      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-4 pt-2 gap-1">
        {[['quiz', 'Quiz', Brain], ['summary', 'Summary', Lightbulb], ['stats', 'Stats', TrendingUp]].map(([id, label, Icon]) => (
          <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all duration-200 ${tab === id ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/60' : 'text-gray-400 hover:text-gray-700'}`}>
            <Icon size={13} />{label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {tab === 'quiz' && !submitted && q && (
          <>
            <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
              <span>Question {current + 1} of {totalQ}</span>
              <span className={`flex items-center gap-1 font-bold ${timeLeft !== null ? timerColor : ''}`}>
                {timeLeft !== null
                  ? <><Timer size={11} /> {timeLeft}s</>  
                  : <><Clock size={11} /> Untimed</>}
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500" style={{ width: `${((current + 1) / totalQ) * 100}%` }} />
            </div>
            <p className="text-sm font-bold text-gray-800 mb-4 leading-snug">{q.q}</p>
            <div className="flex flex-col gap-2">
              {q.opts.map((opt, i) => (
                <button key={i} onClick={() => setSelected(s => ({ ...s, [current]: i }))} className={`quiz-option text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${selected[current] === i ? 'selected border-blue-400 font-semibold text-blue-700 bg-blue-50' : 'border-gray-100 bg-gray-50/60 text-gray-700 hover:border-blue-200'}`}>
                  <span className="font-bold text-gray-400 mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-5 gap-3">
              <button disabled={current === 0} onClick={() => setCurrent(c => c - 1)} className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors">← Prev</button>
              {current < totalQ - 1
                ? <button onClick={() => setCurrent(c => c + 1)} className="flex-1 bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Next →</button>
                : <button onClick={() => setSubmitted(true)} className="flex-1 bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">Submit Quiz</button>
              }
            </div>
          </>
        )}

        {tab === 'quiz' && submitted && (
          <div className="text-center py-4">
            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg mb-4 ${score >= Math.ceil(totalQ * 0.6) ? 'bg-gradient-to-br from-green-500 to-emerald-400' : 'bg-gradient-to-br from-orange-500 to-amber-400'}`}>
              <Award size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-800">Quiz Complete!</h3>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{score}/{totalQ}</p>
            <p className="text-sm text-gray-400 mt-1">{score >= Math.ceil(totalQ * 0.6) ? '🎉 Excellent work!' : '📚 Keep practicing!'}</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700" style={{ width: `${(score / totalQ) * 100}%` }} />
            </div>
            <div className="flex gap-2 mt-5 justify-center flex-wrap">
              <button onClick={() => { setSubmitted(false); setCurrent(0); setSelected({}); setTimeLeft(secPerQ > 0 ? secPerQ : null); }}
                className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                <RotateCcw size={13} /> Retake
              </button>
              <button onClick={() => setTab('summary')} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Summary</button>
              <button onClick={() => downloadCSV(qs, selected)}
                className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2">
                <Download size={13} /> CSV
              </button>
            </div>
          </div>
        )}

        {tab === 'summary' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-800">AI-Generated Summary</h3>
            {summaryCards.map(({ title, text, tag }) => (
              <div key={title} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100/50">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-bold text-gray-800">{title}</p>
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">{tag}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'stats' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800">Performance Analytics</h3>
            {[['Accuracy', Math.round((score / totalQ) * 100) || 0, 'text-green-600', 'bg-green-500'],
              ['Completion', Math.round((Object.keys(selected).length / totalQ) * 100) || 0, 'text-blue-600', 'bg-blue-500'],
              ['Questions Done', Object.keys(selected).length, 'text-violet-600', 'bg-violet-500', true]
            ].map(([label, val, tc, bc, isCount]) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{label}</span>
                  <span className={`font-bold ${tc}`}>{val}{isCount ? `/${totalQ}` : '%'}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${bc} rounded-full`} style={{ width: `${isCount ? (val / totalQ) * 100 : val}%` }} />
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[[String(totalQ), 'Questions'], [String(score), 'Correct'], [submitted ? '✓ Done' : '…']].map(([n, l]) => (
                <div key={n} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-extrabold text-gray-800">{n}</p>
                  {l && <p className="text-[10px] text-gray-400">{l}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


/* ─── Feature strip ───────────────────────────────────────────── */
function Features() {
  const features = [
    { icon: <Zap size={22} />, title: 'Instant Generation', desc: 'Get quiz questions in seconds from any document.', color: 'from-yellow-500 to-amber-400' },
    { icon: <Target size={22} />, title: 'Adaptive Learning', desc: 'AI adjusts difficulty based on your performance.', color: 'from-blue-600 to-blue-400' },
    { icon: <Layers size={22} />, title: 'Smart Flashcards', desc: 'Spaced repetition to maximize long-term retention.', color: 'from-violet-600 to-purple-400' },
    { icon: <BarChart2 size={22} />, title: 'Progress Tracking', desc: 'Detailed analytics on your study sessions.', color: 'from-green-600 to-emerald-400' },
    { icon: <Shield size={22} />, title: 'Secure & Private', desc: 'Your documents are encrypted and never stored.', color: 'from-gray-700 to-gray-500' },
    { icon: <Download size={22} />, title: 'Export Anywhere', desc: 'Download quizzes as PDF, Anki deck, or CSV.', color: 'from-pink-600 to-rose-400' },
  ];
  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Why EduAI</p>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-12">Everything you need to <span className="text-gradient">ace your exams</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon, title, desc, color }) => (
            <div key={title} className="group glass rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-110 transition-transform duration-300`}>{icon}</div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="text-white font-extrabold text-lg">Edu<span className="text-blue-400">AI</span></span>
          </div>
          <p className="text-sm text-center">Smart learning powered by AI · Trusted by 10,000+ students worldwide</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
            <span className="text-sm ml-1 text-white font-semibold">4.9/5</span>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">© 2026 EduAI. All rights reserved.</p>
          <div className="flex gap-5 text-xs">
            {['Privacy', 'Terms', 'Contact', 'Blog'].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Home page ───────────────────────────────────────────────── */
function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quizTopic, setQuizTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  const triggerGenerate = (topic) => {
    const generated = generateQuestionsFromTopic(topic);
    setQuestions(generated);
    setQuizTopic(topic || 'General Knowledge');
    setQuizStarted(true);
    setTimeout(() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleFileUpload = (file) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadedFile(file);
      const name = file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');
      triggerGenerate(name);
    }, 2200);
  };

  const handleGenerate = () => {
    if (inputValue.trim()) triggerGenerate(inputValue.trim());
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero inputValue={inputValue} setInputValue={setInputValue} onGenerate={handleGenerate} />
      <FloatingCards quizStarted={quizStarted} />
      <FormatsTicker />

      {/* Main Workspace */}
      <section className="bg-white py-16 px-4" id="workspace">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Workspace</p>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
            Your <span className="text-gradient">Learning Hub</span>
          </h2>

          {/* Difficulty selector */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-xs text-gray-500 font-medium mr-1">Difficulty:</span>
            {Object.entries(DIFF).map(([key, d]) => (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  difficulty === key
                    ? `${d.bg} ${d.color} ${d.border}`
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                {d.emoji} {d.label} {d.seconds > 0 ? `(${d.seconds}s)` : '(no limit)'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2"><Upload size={15} className="text-blue-500" /> Upload Document</h3>
              <UploadZone onFileUpload={handleFileUpload} uploading={uploading} uploadedFile={uploadedFile} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2"><Brain size={15} className="text-blue-500" /> Active Quiz &amp; Results</h3>
              <QuizPanel
                quizStarted={quizStarted}
                onStart={() => triggerGenerate('General Knowledge')}
                questions={questions}
                topic={quizTopic}
                difficulty={difficulty}
              />
            </div>
          </div>
        </div>
      </section>

      <Features />
      <Footer />
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"             element={<HomePage />} />
        <Route path="/features"     element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/blog"         element={<BlogPage />} />
        <Route path="*"             element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
