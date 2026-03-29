import { Upload, Cpu, BarChart2, CheckCircle, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const steps = [
  {
    n: '01', icon: <Upload size={24} />, title: 'Upload Your Material',
    desc: 'Drag and drop any PDF, DOCX, PPT, or TXT file — or paste a topic name. EduAI supports over 8 file formats and can parse up to 500 pages instantly.',
    details: ['Supports 8+ file formats', 'Up to 500 pages', 'OCR for scanned PDFs'],
    color: 'from-blue-600 to-blue-400',
  },
  {
    n: '02', icon: <Cpu size={24} />, title: 'AI Analyses & Generates',
    desc: 'Our large language model reads and comprehends your content, extracting key concepts, definitions, and relationships to generate targeted questions.',
    details: ['Concept extraction', 'Difficulty calibration', 'Multi-format output'],
    color: 'from-violet-600 to-purple-400',
  },
  {
    n: '03', icon: <BarChart2 size={24} />, title: 'Study, Track & Master',
    desc: 'Take quizzes, review flashcards, and watch your analytics dashboard update in real time. Adaptive spaced repetition keeps you on track to mastery.',
    details: ['Real-time analytics', 'Spaced repetition', 'Export & share'],
    color: 'from-green-600 to-emerald-400',
  },
];

const faqs = [
  { q: 'What file formats does EduAI support?', a: 'PDF, DOCX, PPT, PPTX, TXT, Markdown, EPUB, and plain text. OCR is included for scanned PDFs.' },
  { q: 'How many questions can EduAI generate?', a: 'Up to 100 questions per document on the free plan. Pro users get unlimited generation.' },
  { q: 'Is my data safe?', a: 'Yes. Files are encrypted with AES-256, processed, then deleted. We never train on your data.' },
  { q: 'Can I edit the generated questions?', a: 'Absolutely. Every question and answer can be edited, reordered, or deleted before exporting.' },
];

export default function HowItWorksPage() {
  return (
    <PageWrapper
      badge="How It Works"
      title={<>Three simple steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">exam mastery</span></>}
      subtitle="From document to quiz in under 30 seconds — no account required to try."
    >
      {/* Steps */}
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {steps.map(({ n, icon, title, desc, details, color }, i) => (
          <div key={n} className="group glass rounded-3xl p-7 shadow-glass hover:shadow-glass-hover transition-all duration-300 flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>{icon}</div>
              {i < steps.length - 1 && <div className="hidden md:block w-0.5 h-12 bg-gradient-to-b from-blue-200 to-transparent" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-extrabold text-blue-400 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">Step {n}</span>
                <h3 className="text-base font-extrabold text-gray-900">{title}</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {details.map(d => (
                  <span key={d} className="inline-flex items-center gap-1 bg-gray-50 border border-gray-100 text-xs text-gray-600 font-medium px-3 py-1 rounded-full">
                    <CheckCircle size={10} className="text-green-500" />{d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="glass rounded-2xl px-6 py-5 shadow-card">
              <p className="text-sm font-bold text-gray-800 mb-1.5">{q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="/" className="inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg">
            Try It Now — Free <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
