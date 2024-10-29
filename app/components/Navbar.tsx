import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-fff p-4 border-b border-fff" >
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Logo, About Us, and Contact */}
        <div className="flex items-center space-x-8">
          <div className="text-white text-2xl font-bold">
            <Link href="/">PTA</Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side: Join Us and Login */}
        <div className="flex items-center space-x-4">
          <Link href="/join" className="text-white hover:text-gray-300">
            Join Us
          </Link>
          <Link href="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
