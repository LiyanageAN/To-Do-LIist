import React from 'react';
import { CheckCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-6 border-b border-gray-800">
      <div className="flex items-center justify-center space-x-2">
        <CheckCheck size={28} className="text-indigo-500" />
        <h1 className="text-2xl font-bold text-white">TaskMaster</h1>
      </div>
      <p className="mt-2 text-center text-gray-400 text-sm">
        Keep track of your tasks with ease
      </p>
    </header>
  );
};

export default Header;