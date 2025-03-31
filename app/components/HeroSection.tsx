'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Overlay with gradient using lighter colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#B9AB99]/70 to-[#948C7A]/70 z-10"></div>
      
      {/* Background image */}
      <div className="absolute inset-0">
        <Image 
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1470&auto=format&fit=crop" 
          alt="Medical professionals" 
          fill 
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#302620] leading-tight max-w-3xl">
          Premium Medical Apparel & Event Management
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-[#302620] max-w-2xl">
          Quality scrubs, lab coats, and comprehensive event planning services for medical students and professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/products" 
            className="bg-[#775F4E] text-white px-8 py-4 rounded-md font-semibold hover:bg-opacity-90 transition text-lg inline-block w-fit"
          >
            Explore Products
          </Link>
          <Link 
            href="/events" 
            className="bg-transparent border-2 border-[#775F4E] text-[#775F4E] px-8 py-4 rounded-md font-semibold hover:bg-[#775F4E] hover:text-white transition text-lg inline-block w-fit"
          >
            Plan an Event
          </Link>
        </div>
      </div>
    </section>
  );
}
