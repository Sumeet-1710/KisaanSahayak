export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left">
          <p className="text-lg font-bold">Krishiyikisaan AI</p>
        </div>
        <div className="text-center sm:text-right mt-4 sm:mt-0">
          <p className="text-sm">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}