'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#f8b195] via-[#f67280] to-[#c06c84] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">Casalogy</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition-colors">Home</Link>
                <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition-colors">Products</Link>
                <Link href="/events" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition-colors">Events</Link>
                <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition-colors">About</Link>
                <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href="/search" className="p-1 rounded-full hover:bg-white/20 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              <Link href="/cart" className="p-1 ml-3 rounded-full hover:bg-white/20 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>
              <Link href="/login" className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-[#6c5b7b] text-white hover:bg-opacity-90 transition-colors">Login</Link>
              <Link href="/register" className="ml-2 px-4 py-2 rounded-md text-sm font-medium bg-white text-[#6c5b7b] hover:bg-opacity-90 border border-[#6c5b7b] transition-colors">Register</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/20 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/20 transition-colors">Home</Link>
            <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/20 transition-colors">Products</Link>
            <Link href="/events" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/20 transition-colors">Events</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/20 transition-colors">About</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/20 transition-colors">Contact</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-white/20">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium">Guest User</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium bg-[#6c5b7b] text-white hover:bg-opacity-90 transition-colors">Login</Link>
              <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-white text-[#6c5b7b] hover:bg-opacity-90 mt-2 border border-[#6c5b7b] transition-colors">Register</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
