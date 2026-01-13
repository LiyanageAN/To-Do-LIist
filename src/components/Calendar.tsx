import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Bell } from 'lucide-react';
import { CalendarEvent } from '../types/todo';
import { useCalendar } from '../hooks/useCalendar';

const Calendar: React.FC = () => {
  const { currentDate, events, nextMonth, previousMonth, addEvent } = useCalendar();
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reminderTime, setReminderTime] = useState('');
  
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDay = firstDayOfMonth.getDay();
  
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleAddEvent = () => {
    if (selectedDate && newEventTitle.trim()) {
      const eventDate = new Date(selectedDate);
      
      // If reminder time is set, create a reminder
      let reminder;
      if (reminderTime) {
        const [hours, minutes] = reminderTime.split(':');
        const reminderDate = new Date(selectedDate);
        reminderDate.setHours(parseInt(hours), parseInt(minutes));
        reminder = {
          time: reminderDate,
          notified: false
        };
      }

      addEvent({
        title: newEventTitle,
        date: eventDate,
        color: '#4F46E5',
        reminder
      });
      
      setNewEventTitle('');
      setReminderTime('');
      setShowEventForm(false);
      setSelectedDate(null);
    }
  };
  
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14 w-full" />);
    }
    
    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = 
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      
      const dayEvents = getEventsForDate(date);
      
      days.push(
        <div
          key={day}
          onClick={() => {
            setSelectedDate(date);
            setShowEventForm(true);
          }}
          className={`h-14 w-full p-1 border border-gray-700 ${
            isToday
              ? 'bg-indigo-600'
              : 'hover:bg-gray-700 cursor-pointer'
          }`}
        >
          <div className="flex flex-col h-full">
            <span className={`text-sm ${isToday ? 'text-white font-bold' : 'text-gray-300'}`}>
              {day}
            </span>
            <div className="flex flex-col gap-0.5 mt-0.5">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className="flex items-center text-xs truncate px-1 rounded bg-indigo-500 text-white"
                  title={event.title}
                >
                  {event.reminder && <Bell size={10} className="mr-1" />}
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon size={20} className="text-indigo-500" />
          <h3 className="text-lg font-semibold">
            {monthName} {currentDate.getFullYear()}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={previousMonth}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => {
              setSelectedDate(new Date());
              setShowEventForm(true);
            }}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors text-indigo-500"
            aria-label="Add event"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm text-gray-400 font-medium">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays()}
      </div>

      {showEventForm && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">
            Add Event for {selectedDate?.toLocaleDateString()}
          </h4>
          <div className="space-y-3">
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Event title..."
              className="w-full px-3 py-2 bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex items-center space-x-2">
              <Bell size={16} className="text-indigo-500" />
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-3 py-1 bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-sm font-medium"
              >
                Add Event
              </button>
              <button
                onClick={() => {
                  setShowEventForm(false);
                  setNewEventTitle('');
                  setReminderTime('');
                  setSelectedDate(null);
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;