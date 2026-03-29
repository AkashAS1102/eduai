import { Zap, Target, Layers, BarChart2, Shield, Download, CheckCircle, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const features = [
  {
    icon: <Zap size={26} />, title: 'Instant Generation', tag: 'Speed',
    desc: 'Upload any document and receive a full set of AI-generated quiz questions within seconds. No waiting, no setup.',
    bullets: ['MCQs, short answer & true/false', 'Configurable difficulty levels', 'Batch generation from long docs'],
    color: 'from-yellow-500 to-amber-400', bg: 'bg-amber-50', border: 'border-amber-100',
  },
  {
    icon: <Target size={26} />, title: 'Adaptive Learning', tag: 'Intelligence',
    desc: 'Our AI tracks your performance over time and automatically adjusts question difficulty to keep you in the optimal learning zone.',
    bullets: ['Spaced repetition algorithm', 'Weak-area targeting', 'Personalized study plans'],
    color: 'from-blue-600 to-blue-400', bg: 'bg-blue-50', border: 'border-blue-100',
  },
  {
    icon: <Layers size={26} />, title: 'Smart Flashcards', tag: 'Retention',
    desc: 'Auto-generated flashcards using the Leitner system ensure maximum long-term retention with minimal study time.',
    bullets: ['Auto card generation', 'Leitner box system', 'Image & formula support'],
    color: 'from-violet-600 to-purple-400', bg: 'bg-violet-50', border: 'border-violet-100',
  },
  {
    icon: <BarChart2 size={26} />, title: 'Progress Analytics', tag: 'Insights',
    desc: 'Detailed dashboards show your accuracy trends, time-per-question, topic mastery, and session streaks.',
    bullets: ['Session history & streaks', 'Topic-wise breakdown', 'Exportable reports'],
    color: 'from-green-600 to-emerald-400', bg: 'bg-green-50', border: 'border-green-100',
  },
  {
    icon: <Shield size={26} />, title: 'Secure & Private', tag: 'Privacy',
    desc: 'Your documents are end-to-end encrypted. We never train on your data and delete files after processing.',
    bullets: ['AES-256 encryption', 'Zero data retention', 'GDPR compliant'],
    color: 'from-gray-700 to-gray-500', bg: 'bg-gray-50', border: 'border-gray-100',
  },
  {
    icon: <Download size={26} />, title: 'Export Anywhere', tag: 'Flexibility',
    desc: 'Download your quizzes and flashcards in multiple formats to use in any study app or print for offline revision.',
    bullets: ['PDF, CSV, Anki deck', 'Google Forms export', 'Printable quiz sheets'],
    color: 'from-pink-600 to-rose-400', bg: 'bg-pink-50', border: 'border-pink-100',
  },
];

export default function FeaturesPage() {
  return (
    <PageWrapper
      badge="Platform Features"
      title={<>Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">ace your exams</span></>}
      subtitle="Six powerful AI-driven tools packed into one seamless learning experience."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {features.map(({ icon, title, tag, desc, bullets, color, bg, border }) => (
          <div key={title} className={`group rounded-3xl p-7 ${bg} border ${border} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>{icon}</div>
              <span className="text-xs font-bold text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full">{tag}</span>
            </div>
            <h3 className="text-base font-extrabold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
            <ul className="space-y-1.5">
              {bullets.map(b => (
                <li key={b} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle size={12} className="text-green-500 shrink-0" />{b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <div className="inline-block glass rounded-3xl px-10 py-8 shadow-glass max-w-lg mx-4">
          <p className="text-lg font-extrabold text-gray-900 mb-2">Ready to study smarter?</p>
          <p className="text-sm text-gray-500 mb-5">Join 10,000+ students already using EduAI every day.</p>
          <a href="/" className="inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg">
            Get Started Free <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
