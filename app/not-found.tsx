import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-6xl font-bold text-deloitte-green mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-deloitte-green text-white rounded-lg hover:bg-deloitte-green-dark transition-colors font-medium inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
