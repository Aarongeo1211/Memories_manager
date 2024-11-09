import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onNameSubmit: (name: string) => void;
}

export function WelcomeScreen({ onNameSubmit }: WelcomeScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        <div className="flex items-center justify-center mb-8">
          <Sparkles className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome to Memento
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Your personal journey through time
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Enter your name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Begin Your Journey
          </button>
        </form>
      </div>
    </div>
  );
}