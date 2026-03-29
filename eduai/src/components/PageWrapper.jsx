import { GraduationCap } from 'lucide-react';

export default function PageWrapper({ badge, title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Page hero header */}
      <div className="hero-gradient pt-36 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-10 left-1/3 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-48 h-48 bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />
        {badge && (
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
              <GraduationCap size={12} />{badge}
            </span>
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl mx-auto">{title}</h1>
        {subtitle && <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">{subtitle}</p>}
      </div>

      {/* Page content */}
      <div className="py-14">{children}</div>

      {/* Minimal footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-400">
        © 2026 EduAI · <a href="/" className="text-blue-500 hover:underline">Back to Home</a>
      </footer>
    </div>
  );
}
