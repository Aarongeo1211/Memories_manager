import React, { useState } from 'react';
import { Event } from '../types';
import { Search, Calendar } from 'lucide-react';

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event =>
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search your memories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No memories found</p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <Calendar className="w-4 h-4" />
                <time>{new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</time>
              </div>
              
              <p className="text-gray-800 mb-4">{event.description}</p>
              
              {event.imageUrl && (
                <div className="mt-4">
                  <img
                    src={event.imageUrl}
                    alt="Memory"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="text-xs text-gray-500 mt-4">
                Added on {new Date(event.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}