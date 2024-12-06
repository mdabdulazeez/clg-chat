import React, { useState } from 'react';

// Comprehensive list of educational email domains
const EDUCATIONAL_DOMAINS = [
  // US Domains
  '.edu',
  '.ac.edu',
  '.college.edu',
  '.university.edu',
  
  // International Domains
  '.ac.uk',   // United Kingdom
  '.ac.in',   // India
  '.ac.jp',   // Japan
  '.ac.ca',   // Canada
  '.ac.za',   // South Africa
  '.ac.au',   // Australia
  '.ac.nz',   // New Zealand
  '.edu.sg',  // Singapore
  '.edu.cn',  // China
  '.edu.br',  // Brazil
  '.edu.mx',  // Mexico
  '.edu.ar',  // Argentina
  '.edu.pk',  // Pakistan
  '.edu.ph',  // Philippines
  '.edu.tr',  // Turkey
  '.edu.eg',  // Egypt
  
  // Country-Specific Variants
  '.edu.pl',  // Poland
  '.edu.fr',  // France
  '.edu.de',  // Germany
  '.edu.es',  // Spain
  '.edu.it',  // Italy
];

interface EmailVerificationProps {
  onVerify: (email: string) => void;
}

export function EmailVerification({ onVerify }: EmailVerificationProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (emailToValidate: string): boolean => {
    // Check if email contains @
    if (!emailToValidate.includes('@')) {
      return false;
    }

    // Check if email ends with any of the educational domains
    return EDUCATIONAL_DOMAINS.some(domain => 
      emailToValidate.toLowerCase().endsWith(domain.toLowerCase())
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous errors
    setError('');

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid college email address');
      return;
    }
    
    // If validation passes, call the verification callback
    onVerify(email);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full mb-4">
          <span className="text-xl font-bold text-blue-600">✉️</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Email Verification</h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your college email to get started
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            College Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="your.email@college.edu"
            required
          />
        </div>

        {error && <p className="mt-1 text-sm text-center text-red-600">{error}</p>}
        
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Verify Email
        </button>
      </form>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        Supported domains include .edu, .ac.*, and country-specific educational domains
      </div>
    </div>
  );
}
