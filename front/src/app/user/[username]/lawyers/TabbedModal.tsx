// components/TabbedModal.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import Lawyer from './lawyer';
import * as dotenv from 'dotenv';
dotenv.config();

type TabType = 'tasks' | 'clients' | 'schedule';

interface TabbedModalProps {
  onClose: () => void;
  username: string;
  selectedLawyer: Lawyer | null;
}

export default function TabbedModal({ onClose, username, selectedLawyer }: TabbedModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const [clients, setClients] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchTasks = async (username: string) => {
    try {
      const response = await fetch(`${API_URL}/task?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };

  const fetchClients = async (username: string) => {
    try {
      const response = await fetch(`${API_URL}/clients/clients?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  };

  const handleFetchTasks = async (username: string) => {
    setIsLoadingTasks(true);
    try {
      const tasksData = await fetchTasks(username);
      setTasks(tasksData);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const handleFetchClients = async (username: string) => {
    setIsLoadingClients(true);
    try {
      const clientsData = await fetchClients(username);
      setClients(clientsData);
    } catch (error) {
      console.error('Failed to load clients:', error);
    } finally {
      setIsLoadingClients(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleAddTask = () => {
    console.log('Add Task for lawyer:', selectedLawyer?.lawyerUsername);
  };

  const handleAddClient = () => {
    console.log('Add Client for lawyer:', selectedLawyer?.lawyerUsername);
  };

  const handleAddSchedule = () => {
    console.log('Add Schedule for lawyer:', selectedLawyer?.lawyerUsername);
  };

  if (!selectedLawyer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-[600px] overflow-hidden"
      >
        {/* Modal Header with Lawyer Info */}
        <div className="bg-blue-50 p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {selectedLawyer.lawyerUsername.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-lg">{selectedLawyer.lawyerUsername}</h3>
            <p className="text-sm text-gray-600">{selectedLawyer.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => { setActiveTab('tasks'); handleFetchTasks(username); }}
            className={`flex-1 py-4 px-6 font-medium ${
              activeTab === 'tasks'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => { setActiveTab('clients'); handleFetchClients(username); }}
            className={`flex-1 py-4 px-6 font-medium ${
              activeTab === 'clients'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-4 px-6 font-medium ${
              activeTab === 'schedule'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Schedule
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[400px] overflow-y-auto">
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Tasks for {selectedLawyer.lawyerUsername}</h3>
                <button
                  onClick={handleAddTask}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Task
                </button>
              </div>
              
              {isLoadingTasks ? (
                <div className="flex justify-center items-center h-32">
                  <span className="loading loading-spinner text-blue-500"></span>
                </div>
              ) : (
                <ul className="space-y-2">
                  {tasks.map((task) => (
                    <li key={task.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                      <input
                      title='ff'
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}}
                        className="checkbox checkbox-primary mr-3"
                      />
                      <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                        {task.title}
                      </span>
                      <button title='ff' className="text-red-500 hover:text-red-700 ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Clients for {selectedLawyer.lawyerUsername}</h3>
                <button
                  onClick={handleAddClient}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Client
                </button>
              </div>
              
              {isLoadingClients ? (
                <div className="flex justify-center items-center h-32">
                  <span className="loading loading-spinner text-blue-500"></span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clients.map((client) => (
                    <div key={client.client_id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {client.pfp || client.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{client.username}</h4>
                          <p className="text-sm text-gray-600">{client.email}</p>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {client.phoneNumber}
                          </div>
                        </div>
                        <button title='ff' className="text-red-500 hover:text-red-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Schedule for {selectedLawyer.lawyerUsername}</h3>
              <button
                onClick={handleAddSchedule}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Schedule
              </button>
              <p className="mt-4 text-gray-500">Schedule content will be displayed here</p>
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}