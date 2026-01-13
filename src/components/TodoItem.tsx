import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li
      className="flex items-center justify-between p-4 mb-3 bg-gray-800 rounded-lg transition-all hover:shadow-md group animate-fade-in"
      style={{ animationDelay: '100ms' }}
    >
      <div className="flex items-center flex-grow pr-4">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`flex-shrink-0 w-6 h-6 mr-3 border rounded-md transition-all ${
            todo.completed
              ? 'bg-green-600 border-green-600'
              : 'border-gray-600 hover:border-indigo-500'
          }`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && <Check size={18} className="text-white" />}
        </button>
        
        <span
          className={`text-sm sm:text-base transition-all ${
            todo.completed
              ? 'text-gray-500 line-through'
              : 'text-white'
          }`}
        >
          {todo.text}
        </span>
      </div>
      
      <button
        onClick={() => deleteTodo(todo.id)}
        className="p-2 text-gray-500 rounded-md hover:text-red-500 hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TodoItem;