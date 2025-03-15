"use client";
import { useState } from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

export default function TaskList({ tasks, setTasks }: TaskListProps) {
  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center p-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task.id)}
            className="w-3 h-3 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <span
            className={`ml-3 text-xs text-gray-700 ${
              task.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.title}
          </span>
        </div>
      ))}
    </div>
  );
}