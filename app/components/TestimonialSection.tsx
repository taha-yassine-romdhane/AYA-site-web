'use client';

export default function TestimonialSection() {
  const testimonials = [
    {
      text: "The scrubs I purchased are the most comfortable I&apos;ve ever worn. The quality is exceptional and they&apos;ve held up well after multiple washes.",
      name: "Dr. Sarah Johnson",
      position: "Medical Resident"
    },
    {
      text: "Their event management team helped us organize our medical school&apos;s annual conference. Everything was perfect, from venue selection to catering.",
      name: "Mark Thompson",
      position: "Student Association President"
    },
    {
      text: "The lab coat I purchased is both professional and comfortable. I receive compliments from colleagues and patients alike.",
      name: "Dr. Michael Chen",
      position: "Cardiologist"
    }
  ];

  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#302620]">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#F5F2EE] p-8 rounded-md shadow-sm">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-6 w-6 text-[#775F4E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#775F4E] mb-6">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-[#302620]">{testimonial.name}</p>
                <p className="text-[#948C7A] text-sm">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
