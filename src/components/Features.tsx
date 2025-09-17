export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Everything You Need for Smarter Farming
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1: Soil Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M21.5 21.5 12 12l9.5-9.5"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Soil Analysis</h3>
            <p className="text-gray-600">
              Get instant soil health data from satellite APIs or manual reports.
            </p>
          </div>

          {/* Feature 2: Weather Forecasts */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M17.5 19.5 16 18l1.5-1.5"/><path d="M22 10.5a8.5 8.5 0 0 0-17 0"/><path d="M12 2v2.5"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Weather Forecasts</h3>
            <p className="text-gray-600">
              Receive hyper-localized weather predictions to plan your farming activities.
            </p>
          </div>

          {/* Feature 3: Market Trends */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><line x1="12" x2="12" y1="20" y2="10"/><path d="M18 20V4"/><path d="M6 20v-7"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Market Trends</h3>
            <p className="text-gray-600">
              Analyze current market demand and prices to choose the most profitable crops.
            </p>
          </div>

          {/* Feature 4: AI Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
            <p className="text-gray-600">
              Our smart AI synthesizes all data to give you the best crop recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}