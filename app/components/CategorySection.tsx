'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CategorySection() {
  const categories = [
    {
      name: "Scrubs",
      description: "Comfortable and durable scrubs for every shift.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1470&auto=format&fit=crop",
      link: "/products/scrubs"
    },
    {
      name: "Lab Coats",
      description: "Professional lab coats for a polished look.",
      image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1472&auto=format&fit=crop",
      link: "/products/lab-coats"
    },
    {
      name: "Stethoscopes",
      description: "High-quality stethoscopes for accurate diagnostics.",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1470&auto=format&fit=crop",
      link: "/products/stethoscopes"
    },
    {
      name: "Event Planning",
      description: "Organize medical student events with ease.",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1470&auto=format&fit=crop",
      link: "/events"
    }
  ];

  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#302620]">Shop by Category</h2>
          <Link 
            href="/products" 
            className="text-[#775F4E] hover:text-[#302620] font-medium flex items-center"
          >
            View All 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-[#F5F2EE] rounded-md shadow-sm overflow-hidden group hover:shadow-md transition">
              <div className="h-64 relative">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition duration-300"
                  unoptimized
                />
              </div>
              <div className="p-6 bg-[#F5F2EE]">
                <h3 className="text-xl font-semibold mb-2 text-[#302620]">{category.name}</h3>
                <p className="text-[#775F4E] mb-4">{category.description}</p>
                <Link 
                  href={category.link} 
                  className="text-[#775F4E] font-medium hover:text-[#302620] flex items-center w-fit"
                >
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
