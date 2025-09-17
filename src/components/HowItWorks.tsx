export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          Get Started in 3 Simple Steps
        </h2>
        
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Dashed line connector for desktop view */}
          <div className="hidden md:block absolute top-12 left-0 w-full mt-px">
            <div className="w-5/6 mx-auto h-1 border-t-2 border-dashed border-gray-300"></div>
          </div>

          {/* Step 1 */}
          <div className="relative text-center">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-green-600 text-white text-3xl font-bold rounded-full shadow-lg z-10">
              1
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-2">Input Your Data</h3>
            <p className="text-gray-600">
              Provide your farm&apos;s location, soil report, and past crop history.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative text-center">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-green-600 text-white text-3xl font-bold rounded-full shadow-lg z-10">
              2
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Our system analyzes your data against weather, soil, and market APIs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative text-center">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-green-600 text-white text-3xl font-bold rounded-full shadow-lg z-10">
              3
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-2">Get Recommendations</h3>
            <p className="text-gray-600">
              Receive a personalized report with the most profitable crops.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}