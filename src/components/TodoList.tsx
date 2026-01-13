import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';
import { ClipboardList } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  toggleTodo, 
  deleteTodo 
}) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <ClipboardList size={48} className="mb-4 opacity-50" />
        <p className="text-center">No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <ul className="mt-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;