import React, { useState, useEffect } from 'react';
import Task from './Task';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  let navigate = useNavigate();

  // Get the userId from local storage or set a default value
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '', deadline: '' });

  // Load tasks from local storage for the specific user when the component mounts
  useEffect(() => {
    if (!localStorage.getItem('authenticatedUser')) {
      navigate('/login');
    } else {
      const userTasks = JSON.parse(localStorage.getItem(`user-${JSON.parse(localStorage.getItem('authenticatedUser')).email}-tasks`)) || [];
      setTasks(userTasks);
    }
    // eslint-disable-next-line
  }, []);

  const addTask = () => {
    if (newTask.description.trim() !== '') {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem(`user-${JSON.parse(localStorage.getItem('authenticatedUser')).email}-tasks`, JSON.stringify(updatedTasks));
      setNewTask({ description: '', deadline: '' });
    }
  };

  const modifyTask = (index, updatedTask, updatedDeadline) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { description: updatedTask, deadline: updatedDeadline };
    setTasks(updatedTasks);
    localStorage.setItem(`user-${JSON.parse(localStorage.getItem('authenticatedUser')).email}-tasks`, JSON.stringify(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem(`user-${JSON.parse(localStorage.getItem('authenticatedUser')).email}-tasks`, JSON.stringify(updatedTasks));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task and add deadline for it..."
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          className="form-control"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <div className="input-group-append">
          <button className="btn btn-primary mx-2" type="button" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            task={task.description}
            deadline={task.deadline}
            modifyTask={modifyTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

