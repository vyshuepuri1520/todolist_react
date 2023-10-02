import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

const Task = ({ index, task, modifyTask, deleteTask, userId, deadline }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [taskDeadline, setTaskDeadline] = useState(deadline || '');
  const [completed, setCompleted] = useState(false);

  // Generate a unique identifier for each task
  const taskIdentifier = `${userId}-${task}`;

  // Load the completed status for the task from local storage when the component mounts
  useEffect(() => {
    const storedCompleted = localStorage.getItem(`task-${taskIdentifier}`);
    if (storedCompleted !== null) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, [taskIdentifier]);

  // Save the completed status for the task to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(`task-${taskIdentifier}`, JSON.stringify(completed));
  }, [taskIdentifier, completed]);

  const handleEdit = () => {
    setIsEditing(true);
    // Set the taskDeadline state to the current task's deadline when entering edit mode
    setTaskDeadline(deadline || '');
  };

  const handleSave = () => {
    modifyTask(index, editedTask, taskDeadline);
    setIsEditing(false);
  };

  const handleComplete = () => {
    setCompleted(!completed);
    // Pass the current deadline value to the modifyTask function
    modifyTask(index, editedTask, taskDeadline);
  };

  return (
    <>
      <li className={`list-group-item ${completed ? "completed" : ""}`}>
        {isEditing ? (
          <>
            <input
              type="text"
              className="form-control"
              placeholder="Edit task description"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <input
              type="date"
              className="form-control"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
            <div className="input-group-append">
              <FontAwesomeIcon
                icon={faSave}
                className="button-save task-button float-right mx-2"
                onClick={handleSave}
              />
              <span className="button-save" onClick={handleSave}>Save</span>
            </div>
          </>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {completed ? (
                <del>{task}</del>
              ) : (
                <div>
                  {task}
                  {taskDeadline && <div className="text-muted">Deadline: {taskDeadline}</div>}
                </div>
              )}
            </div>
            <div className="col-md-4 text-right">
              <FontAwesomeIcon
                icon={faEdit}
                className="button-edit task-button float-right mx-2"
                onClick={handleEdit}
              />
              <span className="button-edit" onClick={handleEdit}>Edit</span>
              <FontAwesomeIcon
                icon={faTrash}
                className="button-delete task-button float-right mx-2"
                onClick={() => deleteTask(index)}
              />
              <span className="button-delete" onClick={() => deleteTask(index)}>Delete</span>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`button-complete task-button float-right mx-2 ${completed ? "completed" : ""}`}
                onClick={handleComplete}
              />
              <span className="button-complete" onClick={handleComplete}>Completed</span>
            </div>
          </div>
        )}
      </li>
    </>
  );
};

export default Task;


