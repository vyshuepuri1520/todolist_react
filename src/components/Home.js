import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [newTask, setNewTask] = useState({
    id: '',
    title: '',
    description: '',
    priority: '',
    deadline: '',
    completed: false,
  });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };


  const addTask = () => {
    if (newTask.title.trim() !== '') {
      if (editTask) {
        // Update existing task
        setTasks(tasks.map((task) => (task.id === editTask.id ? { ...newTask, id: editTask.id } : task)));
        setEditTask(null);
      } else {
        // Add new task
        setTasks([...tasks, { ...newTask, id: uuidv4() }]);
      }
      setNewTask({
        id: '',
        title: '',
        description: '',
        priority: '',
        deadline: '',
        completed: false,
      });
    }
  };


  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container mt-4">
      <h1>Todo List</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="priority" className="form-label">
          Priority
        </label>
        <select
          className="form-select"
          id="priority"
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="deadline" className="form-label">
          Deadline
        </label>
        <input
          type="date"
          className="form-control"
          id="deadline"
          name="deadline"
          value={newTask.deadline}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={addTask}>
        Add Task
      </button>
      <hr />
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`list-group-item ${task.completed ? 'list-group-item-success' : ''
                }`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{task.title}</h5>
                  <p>{task.description}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Deadline: {task.deadline}</p>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => toggleComplete(task.id)}
                  >
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => setEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default Home;
