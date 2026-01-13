import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import TaskSummaryPage from './pages/TaskSummaryPage';
import { Calendar, ListTodo, PieChart, User } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <div className="container mx-auto px-4 py-8 max-w-2xl flex-grow">
          <Header />
          
          <nav className="mb-8">
            <div className="flex justify-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ListTodo size={20} />
                <span>Tasks</span>
              </Link>
              <Link
                to="/calendar"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Calendar size={20} />
                <span>Calendar</span>
              </Link>
              <Link
                to="/summary"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <PieChart size={20} />
                <span>Summary</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/summary" element={<TaskSummaryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;