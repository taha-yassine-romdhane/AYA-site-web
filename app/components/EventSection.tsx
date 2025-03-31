'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function EventSection() {
  return (
    <section className="w-full py-20 px-4 bg-[#F5F2EE]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative h-[400px] w-full rounded-md overflow-hidden shadow-md">
              <Image 
                src="https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=1470&auto=format&fit=crop" 
                alt="Medical conference" 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#302620]">Event Management Services</h2>
            <p className="text-xl mb-6 text-[#775F4E]">
              We specialize in organizing events for medical students, from conferences to workshops. 
              Let us handle the logistics so you can focus on learning.
            </p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[#775F4E] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#302620]">Professional event planning and coordination</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[#775F4E] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#302620]">Venue selection and management</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[#775F4E] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#302620]">Speaker and guest coordination</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[#775F4E] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#302620]">Marketing and registration management</span>
              </li>
            </ul>
            <Link 
              href="/events" 
              className="bg-[#775F4E] text-white px-8 py-4 rounded-md font-semibold hover:bg-opacity-90 transition inline-block text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
