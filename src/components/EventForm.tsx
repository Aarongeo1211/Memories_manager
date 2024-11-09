import React, { useState } from 'react';
import { Calendar, Image as ImageIcon, X } from 'lucide-react';

interface EventFormProps {
  onSubmit: (date: string, description: string, imageUrl?: string) => void;
}

export function EventForm({ onSubmit }: EventFormProps) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && description) {
      onSubmit(date, description, imageUrl || undefined);
      setDate('');
      setDescription('');
      setImageUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>When did it happen?</span>
          </div>
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What happened?
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
          placeholder="Tell me about this memory..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span>Add an image (optional)</span>
          </div>
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Paste an image URL"
          />
          {imageUrl && (
            <button
              type="button"
              onClick={() => setImageUrl('')}
              className="p-2 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
      >
        Save Memory
      </button>
    </form>
  );
}