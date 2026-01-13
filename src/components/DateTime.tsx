import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import Calendar from './Calendar';

const DateTime: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div>
      <div className="flex items-center justify-center space-x-2 p-4 bg-gray-800 rounded-lg mb-6">
        <Clock size={20} className="text-indigo-500" />
        <div className="text-center">
          <div className="text-lg font-semibold">{formatTime(date)}</div>
          <div className="text-sm text-gray-400">{formatDate(date)}</div>
        </div>
      </div>
      <Calendar />
    </div>
  );
};

export default DateTime;