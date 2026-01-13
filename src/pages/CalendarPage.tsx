import React from 'react';
import Calendar from '../components/Calendar';
import DateTime from '../components/DateTime';
import EventList from '../components/EventList';
import { useCalendar } from '../hooks/useCalendar';

const CalendarPage: React.FC = () => {
  const { events, deleteEvent } = useCalendar();

  return (
    <main>
      <div className="mb-6">
        <DateTime />
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <EventList events={events} onDeleteEvent={deleteEvent} />
      </div>
    </main>
  );
};

export default CalendarPage;