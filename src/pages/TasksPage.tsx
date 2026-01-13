import React from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { useTodos } from '../hooks/useTodos';

const TasksPage: React.FC = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  
  return (
    <main>
      <TodoForm addTodo={addTodo} />
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Tasks ({todos.length})
          </h2>
          <div className="text-sm text-gray-400">
            {todos.filter(t => t.completed).length} completed
          </div>
        </div>
        
        <TodoList 
          todos={todos} 
          toggleTodo={toggleTodo} 
          deleteTodo={deleteTodo} 
        />
      </div>
    </main>
  );
};

export default TasksPage;