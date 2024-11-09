import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { EventForm } from './components/EventForm';
import { EventList } from './components/EventList';
import { Event, User } from './types';
import { BookHeart } from 'lucide-react';

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleNameSubmit = (name: string) => {
    setUser({ name });
  };

  const handleEventSubmit = (date: string, description: string, imageUrl?: string) => {
    const newEvent: Event = {
      id: crypto.randomUUID(),
      date,
      description,
      imageUrl,
      createdAt: new Date().toISOString(),
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  if (!user) {
    return <WelcomeScreen onNameSubmit={handleNameSubmit} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookHeart className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Your personal journey through memories
          </p>
        </header>

        <div className="grid gap-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Memory
            </h2>
            <EventForm onSubmit={handleEventSubmit} />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Memories
            </h2>
            <EventList events={events} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;