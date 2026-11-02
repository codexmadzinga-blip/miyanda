import React, { useState } from 'react';

export default function MobileNav({ cartCount, onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 md:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="font-bold text-lg text-gray-900 tracking-tight">
          Miyanda
        </div>

        {/* Right action buttons: Cart & Menu Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenCart}
            className="relative p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Shopping Cart"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none text-xl"
            aria-label="Toggle Menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="px-4 pt-2 pb-4 space-y-2 border-t border-gray-100 bg-white shadow-lg">
          <a
            href="#marketplace"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 font-medium hover:text-blue-600"
          >
            Marketplace
          </a>
          <a
            href="#vendors"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 font-medium hover:text-blue-600"
          >
            Vendors & Providers
          </a>
          <a
            href="#dashboard"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 font-medium hover:text-blue-600"
          >
            Supervisor Dashboard
          </a>
        </div>
      )}
    </nav>
  );
}