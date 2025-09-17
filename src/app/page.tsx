import Link from 'next/link';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-6">
        <section className="text-center py-20 md:py-28">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            AI-Powered Guidance for Optimal Crop Yield
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Get personalized, data-driven crop recommendations based on real-time
            soil analysis, weather forecasts, and market trends. Maximize your
            profit and farm sustainably.
          </p>
          <div className="mt-8">
            <Link
              href="/assessment"
              className="bg-green-600 text-white font-bold px-8 py-3 rounded-md text-lg hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Get Your Free Recommendation
            </Link>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />
    </>
  );
}