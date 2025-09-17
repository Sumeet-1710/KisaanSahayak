import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Site Title/Logo */}
        <Link href="/" className="text-xl font-bold text-green-700">
          Krishiyikisaan AI
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link href="#features" className="text-gray-600 hover:text-green-700">
              Features
            </Link>
          </li>
          <li>
            <Link href="#how-it-works" className="text-gray-600 hover:text-green-700">
              How It Works
            </Link>
          </li>
        </ul>

        {/* CTA Button */}
        <Link
          href="/assessment"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}