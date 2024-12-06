import React from 'react';
import type { Gender } from '../types/chat';

interface GenderSelectionProps {
  onSelect: (gender: Gender) => void;
}

export function GenderSelection({ onSelect }: GenderSelectionProps) {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Select Your Gender
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelect('male')}
          className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <span className="text-4xl mb-2">👨</span>
          <span className="font-medium text-gray-800">Male</span>
        </button>

        <button
          onClick={() => onSelect('female')}
          className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors"
        >
          <span className="text-4xl mb-2">👩</span>
          <span className="font-medium text-gray-800">Female</span>
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-600 text-center">
        This information is used for matching purposes only and will not be stored.
      </p>
    </div>
  );
}