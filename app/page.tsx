'use client';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const Page: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: number; title: string; content: string; done: boolean }[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [taskIdCounter, setTaskIdCounter] = useState(1); 
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddTask = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      const newTask = {
        id: taskIdCounter,
        title,
        content,
        done: false,
      };
      setTasks([...tasks, newTask]);
      setTaskIdCounter(taskIdCounter + 1);
      setTitle('');
      setContent('');
    }
  };

  const handleEditTask = (id: number) => {
    setEditingTaskId(id);
  };

  const handleSaveTask = (id: number) => {
    const editedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          title: newTitle,
          content: newContent,
        };
      }
      return task;
    });
    setTasks(editedTasks);
    setEditingTaskId(null);
    setNewTitle('');
    setNewContent('');
  };

  const handleDeleteTask = (id: number) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleToggleDone = (id: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <Navbar />
      <div className='mx-4 my-4'>
        <h1 className='text-2xl font-bold'>Add Task</h1>
        <div className='mt-4'>
          <label className='block text-lg font-medium text-gray-700' htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div className='mt-4'>
          <label className='block text-lg font-medium text-gray-700' htmlFor='content'>Content</label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div className='mt-4'>
          <button
            onClick={handleAddTask}
            className='bg-gray-900 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Add Task
          </button>
        </div>
        {tasks.length > 0 && (
          <div className='mt-4'>
            <h2 className='text-xl font-semibold mb-2'>Tasks</h2>
            {tasks.map((task, index) => (
              <div key={task.id} className={`bg-white p-4 rounded-md shadow-md mb-2 ${task.done ? 'bg-gray-200' : ''}`}>
                {editingTaskId === task.id ? (
                  <div>
                    <input
                      type='text'
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                    <textarea
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={4}
                      className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                    <button
                      onClick={() => handleSaveTask(task.id)}
                      className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className='text-xl font-bold'>{task.title}</h3>
                    <p className='mt-2'>{task.content}</p>
                  </div>
                )}
                <div className='mt-2'>
                  {editingTaskId!== task.id && (
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleToggleDone(task.id)}
                    className={`bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${task.done? 'bg-gray-600 hover:bg-gray-800' : ''}`}
                  >
                    {task.done? 'Undo' : 'Done'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;