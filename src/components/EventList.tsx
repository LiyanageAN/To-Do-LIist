import React from 'react';
import { CalendarEvent } from '../types/todo';
import { Bell, Calendar as CalendarIcon, Trash2 } from 'lucide-react';

interface EventListProps {
  events: CalendarEvent[];
  onDeleteEvent?: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDeleteEvent }) => {
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-3">
      {sortedEvents.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No events scheduled</p>
      ) : (
        sortedEvents.map(event => (
          <div
            key={event.id}
            className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg group hover:bg-gray-600 transition-colors"
          >
            <CalendarIcon size={20} className="text-indigo-500 mt-1 flex-shrink-0" />
            <div className="flex-grow min-w-0">
              <h3 className="font-medium truncate">{event.title}</h3>
              <p className="text-sm text-gray-400">
                {event.date.toLocaleDateString()} at{' '}
                {event.date.toLocaleTimeString()}
              </p>
              {event.reminder && (
                <div className="flex items-center mt-1 text-sm text-indigo-400">
                  <Bell size={14} className="mr-1 flex-shrink-0" />
                  <span className="truncate">
                    Reminder: {event.reminder.time.toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
            {onDeleteEvent && (
              <button
                onClick={() => onDeleteEvent(event.id)}
                className="p-2 text-gray-500 rounded-md hover:text-red-500 hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                aria-label="Delete event"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EventList