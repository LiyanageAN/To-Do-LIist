export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color: string;
  reminder?: {
    time: Date;
    notified: boolean;
  };
}