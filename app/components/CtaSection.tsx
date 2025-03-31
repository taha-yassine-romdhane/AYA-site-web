'use client';

import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="w-full py-16 px-4 bg-[#B9AB99] text-[#302620]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Medical Experience?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of medical professionals who trust us for their clothing and event management needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/products" 
            className="bg-[#775F4E] text-white px-8 py-4 rounded-md font-semibold hover:bg-opacity-90 transition text-lg"
          >
            Shop Now
          </Link>
          <Link 
            href="/contact" 
            className="bg-white text-[#775F4E] px-8 py-4 rounded-md font-semibold hover:bg-opacity-90 transition text-lg border border-[#775F4E]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
