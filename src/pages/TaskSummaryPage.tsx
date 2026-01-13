import React from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTodos } from '../hooks/useTodos';

const TaskSummaryPage: React.FC = () => {
  const { todos } = useTodos();
  
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = todos.filter(todo => !todo.completed).length;
  
  const data = [
    { name: 'Completed', value: completedTasks, color: '#4F46E5' },
    { name: 'Pending', value: pendingTasks, color: '#6B7280' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
      <div className="flex items-center mb-6">
        <PieChartIcon size={24} className="text-indigo-500 mr-2" />
        <h2 className="text-xl font-bold">Task Overview</h2>
      </div>

      <div className="w-full max-w-md">
        <div className="h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-3xl font-bold">{todos.length}</p>
            <p className="text-gray-400 text-sm">Total Tasks</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-3xl font-bold text-indigo-500">{completedTasks}</p>
            <p className="text-gray-400 text-sm">Completed</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-3xl font-bold text-gray-500">{pendingTasks}</p>
            <p className="text-gray-400 text-sm">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummaryPage