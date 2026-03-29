import { CheckCircle, Zap, Star, ArrowRight, Shield } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const plans = [
  {
    name: 'Free', price: '$0', period: 'forever', color: 'from-gray-700 to-gray-500',
    desc: 'Perfect for trying EduAI and casual study sessions.',
    features: ['5 uploads / month', 'Up to 20 questions/doc', 'Basic flashcards', 'PDF & TXT support', 'Email support'],
    cta: 'Get Started Free', ctaStyle: 'bg-gray-900 text-white hover:bg-gray-800', popular: false,
  },
  {
    name: 'Pro', price: '$12', period: '/month', color: 'from-blue-600 to-blue-400',
    desc: 'For serious students who want unlimited AI-powered learning.',
    features: ['Unlimited uploads', 'Unlimited questions', 'Smart flashcards + spaced repetition', 'All file formats (PDF, DOCX, PPT, MD…)', 'Analytics dashboard', 'Anki & CSV export', 'Priority support'],
    cta: 'Start Pro — 7 days free', ctaStyle: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600', popular: true,
  },
  {
    name: 'Team', price: '$39', period: '/month', color: 'from-violet-600 to-purple-400',
    desc: 'For study groups, tutors, and institutions.',
    features: ['Everything in Pro', 'Up to 10 seats', 'Shared quiz library', 'Admin dashboard', 'Custom branding', 'SSO & SCIM', 'Dedicated support'],
    cta: 'Contact Sales', ctaStyle: 'bg-gray-900 text-white hover:bg-gray-800', popular: false,
  },
];

const testimonials = [
  { name: 'Priya K.', role: 'Medical Student', text: 'EduAI turned my 200-page physiology notes into 80 quiz questions in seconds. My exam scores jumped 15%!', rating: 5 },
  { name: 'James R.', role: 'Law Student', text: 'The spaced repetition flashcards are a game changer. I retain case names and statutes so much better now.', rating: 5 },
  { name: 'Sofia M.', role: 'CS Undergrad', text: 'I use it every week for algorithm prep. The difficulty adapts perfectly — it always keeps me on my toes.', rating: 5 },
];

export default function PricingPage() {
  return (
    <PageWrapper
      badge="Simple Pricing"
      title={<>Plans that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">scale with you</span></>}
      subtitle="Start free. Upgrade when you need more. Cancel anytime — no questions asked."
    >
      {/* Plans */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(({ name, price, period, color, desc, features, cta, ctaStyle, popular }) => (
          <div key={name} className={`relative glass rounded-3xl p-7 shadow-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-hover flex flex-col ${popular ? 'ring-2 ring-blue-500' : ''}`}>
            {popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1"><Star size={10} className="fill-white" />Most Popular</span>
              </div>
            )}
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md mb-4`}>
              <Zap size={18} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{name}</p>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-extrabold text-gray-900">{price}</span>
              <span className="text-sm text-gray-400 mb-1">{period}</span>
            </div>
            <p className="text-xs text-gray-500 mb-5">{desc}</p>
            <ul className="space-y-2.5 mb-7 flex-1">
              {features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-md ${ctaStyle}`}>{cta}</button>
          </div>
        ))}
      </div>

      {/* Trust bar */}
      <div className="flex items-center justify-center gap-6 mt-10 flex-wrap px-4">
        {['No credit card required', 'Cancel anytime', 'AES-256 encrypted', 'GDPR compliant'].map(t => (
          <span key={t} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Shield size={12} className="text-green-500" />{t}
          </span>
        ))}
      </div>

      {/* Testimonials */}
      <div className="max-w-5xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">What students are saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(({ name, role, text, rating }) => (
            <div key={name} className="glass rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="flex gap-0.5 mb-3">
                {[...Array(rating)].map((_, i) => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">"{text}"</p>
              <div>
                <p className="text-sm font-bold text-gray-900">{name}</p>
                <p className="text-xs text-gray-400">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
