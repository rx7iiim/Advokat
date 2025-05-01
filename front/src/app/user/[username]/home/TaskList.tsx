"use client";

import { useState } from "react";
import Task from "./taskInterface";
import { useStore } from "zustand";

type TaskListProps = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  username:string
};

export default function TaskList({ tasks, setTasks ,username}: TaskListProps) {
  const [newTask, setNewTask] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
 

  // ✅ Toggle Task Completion
  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // ✅ Delete Task from Backend
  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`${API_URL}/task?id=${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // ✅ Create a New Task
  const createTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await fetch(`${API_URL}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { description: newTask,username:username}),
      });

      if (response.ok) {
        const createdTask = await response.json();
        setTasks([...tasks, createdTask]);
        setNewTask(""); // ✅ Clear Input Field
      } else {
        console.log(username)
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="space-y-3">
      {/* ✅ Task Input Form */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a new task..."
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 bg-white px-3 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={createTask}
          className="bg-blue-600 text-white  rounded-lg text-xs p-2 shadow-sm hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      {/* ✅ Task List */}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            {/* ✅ Task Checkbox */}
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 bg-white border-gray-300 rounded focus:ring-blue-500"
              checked={!!task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            
              aria-label={`Mark task "${task.description}" as ${task.completed ? "incomplete" : "complete"}`}
            />
            <span
              className={`ml-3 text-sm bg-w text-gray-700 ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.description}
            </span>
          </div>

          {/* ✅ Delete Button */}
          <button
            className="bg-red-500 text-white px-2 py-1 text-xs rounded shadow-sm hover:bg-red-600 transition"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}