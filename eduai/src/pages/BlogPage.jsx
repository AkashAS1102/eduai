import { useState } from 'react';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const posts = [
  {
    id: 1, date: 'March 25, 2026', readTime: '5 min', tag: 'Study Tips',
    title: '10 Proven Techniques to Retain Information Longer',
    excerpt: 'From spaced repetition to the Feynman technique — science-backed methods that top students swear by to lock knowledge in long-term memory.',
    gradient: 'from-blue-600 to-blue-400', emoji: '🧠',
  },
  {
    id: 2, date: 'March 20, 2026', readTime: '4 min', tag: 'AI Learning',
    title: 'How AI is Revolutionising Exam Preparation in 2026',
    excerpt: 'Generative AI has moved beyond chatbots. Discover how modern academic AI tools are personalising the way millions of students prepare for exams.',
    gradient: 'from-violet-600 to-purple-400', emoji: '🤖',
  },
  {
    id: 3, date: 'March 15, 2026', readTime: '6 min', tag: 'Productivity',
    title: 'The Ultimate Study Schedule Template (Free Download)',
    excerpt: 'A structured weekly study plan used by top medical and law students — adapted for any subject. Includes time-blocking and priority matrices.',
    gradient: 'from-green-600 to-emerald-400', emoji: '📅',
  },
  {
    id: 4, date: 'March 10, 2026', readTime: '3 min', tag: 'Feature Update',
    title: 'EduAI Now Supports Scanned PDFs via OCR',
    excerpt: 'Upload photos of textbook pages or scanned handwritten notes. Our new OCR pipeline converts them into structured quiz-ready text instantly.',
    gradient: 'from-orange-500 to-amber-400', emoji: '📸',
  },
  {
    id: 5, date: 'March 5, 2026', readTime: '7 min', tag: 'Research',
    title: 'Active Recall vs Passive Review: What the Science Says',
    excerpt: 'A deep dive into cognitive science research on active recall, and why testing yourself outperforms re-reading by a factor of 3x for long-term retention.',
    gradient: 'from-pink-600 to-rose-400', emoji: '🔬',
  },
  {
    id: 6, date: 'February 28, 2026', readTime: '4 min', tag: 'Tips',
    title: 'How to Convert Your Lecture Notes into a Perfect Quiz',
    excerpt: 'A step-by-step walkthrough of uploading your lecture slides to EduAI, tuning question count and difficulty, and exporting to Anki for mobile review.',
    gradient: 'from-teal-600 to-cyan-400', emoji: '📝',
  },
];

const TAGS = ['All', 'Study Tips', 'AI Learning', 'Productivity', 'Feature Update', 'Research', 'Tips'];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All' ? posts : posts.filter(p => p.tag === activeTag);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <PageWrapper
      badge="Blog"
      title={<>Insights to help you <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">study smarter</span></>}
      subtitle="Tips, research, and product updates from the EduAI team."
    >
      {/* Tag filters */}
      <div className="flex justify-center gap-2 flex-wrap mb-10 px-4">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
              activeTag === t ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-10">No posts in this category yet.</p>
      )}

      {/* Featured post */}
      {featured && (
        <div className="max-w-5xl mx-auto px-4 mb-8">
          <div className="glass rounded-3xl overflow-hidden shadow-glass hover:shadow-glass-hover transition-all duration-300 group cursor-pointer">
            <div className={`h-40 bg-gradient-to-br ${featured.gradient} flex items-center justify-center text-6xl`}>{featured.emoji}</div>
            <div className="p-7 flex flex-col md:flex-row gap-5 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">{featured.tag}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} />{featured.readTime} read</span>
                </div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{featured.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{featured.excerpt}</p>
              </div>
              <button className="shrink-0 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-md mt-auto">
                Read More <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map(({ id, date, readTime, tag, title, excerpt, gradient, emoji }) => (
            <div key={id} className="glass rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col">
              <div className={`h-28 bg-gradient-to-br ${gradient} flex items-center justify-center text-4xl`}>{emoji}</div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1"><Tag size={9} />{tag}</span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={9} />{readTime}</span>
                </div>
                <h3 className="text-sm font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug flex-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">{excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] text-gray-400">{date}</span>
                  <button className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all group-hover:underline">Read <ArrowRight size={11} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
