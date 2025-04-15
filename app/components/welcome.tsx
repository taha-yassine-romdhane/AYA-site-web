"use client";

import { useState, useEffect } from 'react';

// Mock database for demonstration purposes - in a real app, this would come from your backend
const MOCK_REGISTERED_EMAILS = [
  "taha.romdhane1999@gmail.com",
  "test@example.com",
  "user@domain.com"
];
import { useRouter } from 'next/navigation';

const faculties = [
  "Université de Tunis El Manar - Tunis FMT",
  "Université de Sfax Sfax FMS ",
  "Université de Sousse Sousse FMSO",
  "Université de Monastir Monastir FMM",
  "Université de Gabès Gabès FMG"
];

export default function Welcome() {
  const [showModal, setShowModal] = useState(false);
  const [year, setYear] = useState<number | null>(null); // Fix hydration error
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    faculty: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear email error when user changes the email field
    if (name === 'email') {
      setEmailError(false);
      setError('');
      
      // Check if email already exists in our mock database
      if (value && MOCK_REGISTERED_EMAILS.includes(value.toLowerCase().trim())) {
        setEmailError(true);
        setError('This email is already registered. Please use a different email address.');
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for duplicate email before submitting
    if (MOCK_REGISTERED_EMAILS.includes(formData.email.toLowerCase().trim())) {
      setEmailError(true);
      setError('This email is already registered. Please use a different email address.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/welcome-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if the error is due to a duplicate email
        if (data.code === 'EMAIL_EXISTS' || data.error?.toLowerCase().includes('email already exists') || response.status === 409) {
          throw new Error('This email is already registered. Please use a different email address.');
        }
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      setShowModal(true); // Show popup modal
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        faculty: ''
      });

      // Optionally auto-close modal after a delay
      // setTimeout(() => setShowModal(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      {/* Success Popup - Positioned outside the card as a full-screen overlay */}
      {success && showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" style={{animation: 'fadeIn 0.3s ease'}}>
          <div className="bg-[#B9AB99] rounded-xl shadow-2xl p-8 max-w-sm w-full text-center relative border-4 border-[#775F4E]" style={{animation: 'popUp 0.4s cubic-bezier(.18,1.25,.44,1.19)'}}>
            {/* Confetti Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-1/4" style={{animation: 'confetti 1.2s ease-in-out infinite alternate'}}>
                <div className="h-8 w-8 bg-[#612A22] rounded-full opacity-70" />
              </div>
              <div className="absolute top-10 right-1/4" style={{animation: 'confetti 1.5s ease-in-out infinite alternate-reverse'}}>
                <div className="h-6 w-6 bg-[#775F4E] rounded-full opacity-70" />
              </div>
              <div className="absolute bottom-10 left-1/3" style={{animation: 'confetti 1.3s ease-in-out infinite alternate'}}>
                <div className="h-5 w-5 bg-[#B9AB99] rounded-full opacity-70" />
              </div>
              <div className="absolute top-1/2 right-1/3" style={{animation: 'confetti 1.7s ease-in-out infinite alternate-reverse'}}>
                <div className="h-7 w-7 bg-[#302620] rounded-full opacity-70" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 relative z-10">
              <svg className="w-16 h-16 mb-2" style={{animation: 'bounce 1s infinite'}} fill="none" viewBox="0 0 48 48" stroke="#612A22">
                <circle cx="24" cy="24" r="22" strokeWidth="4" fill="#fff"/>
                <path d="M16 24l6 6 10-10" stroke="#775F4E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="text-2xl font-bold text-[#302620] mb-1">Congratulations!</h3>
              <p className="text-[#612A22] font-medium mb-2">You’ve signed up and will receive a <span className="text-[#775F4E] font-bold">special discount</span> when we launch!</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-6 py-2 bg-[#775F4E] text-white rounded-md font-semibold hover:bg-[#612A22] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 space-y-6 bg-gradient-to-r from-[#f8b195]/90 via-[#f67280]/80 to-[#c06c84]/90 text-white backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome to Casalogy</h2>
            <p className="mt-2 text-lg">Our website is coming soon!</p>
            <p className="mt-1 text-white/80">Sign up now to receive a special discount when we launch.</p>
          </div>

          {success ? (
            <div className="p-4 rounded-md bg-white/20 backdrop-blur-sm">
              <p className="text-center font-medium">Thank you for signing up! Check your email for details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-white/30 bg-white/30 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-white focus:bg-white/40 text-white placeholder-white/70"
                  style={{backdropFilter: 'blur(4px)'}}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${emailError ? 'border-[#612A22]/70' : 'border-white/30'} bg-white/30 rounded-md shadow-sm focus:outline-none focus:ring-1 ${emailError ? 'focus:ring-[#612A22]' : 'focus:ring-white'} focus:bg-white/40 text-white placeholder-white/70`}
                  style={{backdropFilter: 'blur(4px)'}}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-[#612A22] bg-white/20 p-1 rounded flex items-center">
                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Email already registered
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-white/30 bg-white/30 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-white focus:bg-white/40 text-white placeholder-white/70"
                  style={{backdropFilter: 'blur(4px)'}}
                />
              </div>

              <div>
                <label htmlFor="faculty" className="block text-sm font-medium text-white">
                  Faculty
                </label>
                <select
                  id="faculty"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-white/30 bg-white/30 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-white focus:bg-white/40 text-white"
                  style={{backdropFilter: 'blur(4px)', color: 'white'}}
                >
                  <option value="" disabled className="text-gray-700">Select your faculty</option>
                  {faculties.map(faculty => (
                    <option key={faculty} value={faculty} className="text-gray-700 bg-white">{faculty}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div className={`p-3 rounded-md backdrop-blur-sm border ${error.includes('email is already registered') ? 'bg-[#612A22]/30 border-[#612A22]/70' : 'bg-white/20 border-white/40'}`}>
                  <div className="flex items-start">
                    {error.includes('email is already registered') && (
                      <svg className="w-5 h-5 mr-2 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    <p className="text-sm text-white">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 border border-white/40 rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-1 focus:ring-white transition-colors ${loading ? 'bg-white/40' : 'bg-white/30 hover:bg-white/40'}`}
                style={{backdropFilter: 'blur(4px)'}}
              >
                {loading ? 'Submitting...' : 'Get My Discount'}
              </button>
            </form>
          )}
        </div>
        <div className="px-6 py-4 bg-gradient-to-r from-[#6c5b7b] via-[#355c7d] to-[#6c5b7b]">
          <p className="text-center text-sm text-white/80">
            &copy; {year ?? ''} Casalogy. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Add this to your globals.css file if you want to use class-based animations instead of inline styles */
/*
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes popUp { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@keyframes confetti { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(20px) rotate(10deg); } }
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
*/