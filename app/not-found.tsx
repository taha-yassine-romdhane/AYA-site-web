"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [countdown, setCountdown] = useState(10);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#302620] via-[#775F4E] to-[#612A22] text-white p-4">
      <div className="max-w-md w-full bg-[#B9AB99] rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#302620]/20 text-[#302620]">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-[#302620] mb-2">Page Not Found</h1>
          <p className="text-[#612A22] mb-6">
            We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t exist yet. Our website is still in development mode.
          </p>
          
          <div className="mb-6 p-4 bg-[#948C7A]/30 rounded-md">
            <p className="text-[#302620] font-medium">
              Our team is working hard to bring you a great experience. Please check back soon!
            </p>
          </div>
          
          <div className="text-sm text-[#775F4E] mb-6">
            Redirecting to home page in <span className="font-bold">{countdown}</span> seconds...
          </div>
          
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-[#775F4E] text-white rounded-md font-medium hover:bg-[#612A22] transition-colors"
          >
            Return to Home
          </Link>
        </div>
        
        <div className="bg-[#302620] py-4 px-8 text-center">
          <p className="text-[#B9AB99] text-sm">
            &copy; {new Date().getFullYear()} Casalogy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
