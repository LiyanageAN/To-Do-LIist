import React, { useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-3 text-white bg-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          data-testid="todo-input"
        />
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-700"
          aria-label="Add task"
        >
          <Plus size={20} className="text-white" />
        </button>
      </div>
    </form>
  );
};

export default TodoForm;