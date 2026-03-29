import { Link } from 'react-router-dom';
import { GraduationCap, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg mx-auto mb-6">
          <GraduationCap size={32} className="text-white" />
        </div>

        {/* 404 number */}
        <p className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-2">404</p>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to learning!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-md"
          >
            <Home size={15} /> Back to Home
          </Link>
          <Link
            to="/blog"
            className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-sm font-semibold hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            <Search size={15} /> Browse Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
