import { useState, useEffect } from 'react';
import { CalendarEvent } from '../types/todo';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    try {
      const savedEvents = localStorage.getItem('calendarEvents');
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents);
        return parsedEvents.map((event: any) => ({
          ...event,
          date: new Date(event.date),
          reminder: event.reminder ? {
            ...event.reminder,
            time: new Date(event.reminder.time),
            notified: Boolean(event.reminder.notified)
          } : undefined
        }));
      }
    } catch (error) {
      console.error('Error loading calendar events:', error);
    }
    return [];
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving calendar events:', error);
    }
  }, [events]);

  // Check for reminders every minute
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      events.forEach(event => {
        if (
          event.reminder &&
          !event.reminder.notified &&
          event.reminder.time.getTime() <= now.getTime()
        ) {
          // Show notification
          if (Notification.permission === 'granted') {
            new Notification(event.title, {
              body: `Event starting at ${event.date.toLocaleTimeString()}`,
              icon: '/vite.svg'
            });
          }

          // Mark reminder as notified
          setEvents(prev => prev.map(e =>
            e.id === event.id
              ? {
                  ...e,
                  reminder: e.reminder ? { ...e.reminder, notified: true } : undefined
                }
              : e
          ));
        }
      });
    };

    // Check immediately and then every minute
    checkReminders();
    const interval = setInterval(checkReminders, 60000);
    
    return () => clearInterval(interval);
  }, [events]);

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const previousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: crypto.randomUUID(),
      date: new Date(event.date),
      reminder: event.reminder ? {
        ...event.reminder,
        time: new Date(event.reminder.time),
        notified: false
      } : undefined
    };

    setEvents(prev => [...prev, newEvent]);

    // Request notification permission if needed
    if (
      newEvent.reminder &&
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission();
    }
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  return {
    currentDate,
    events,
    nextMonth,
    previousMonth,
    addEvent,
    deleteEvent
  };
};