import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

const Task = ({ index, task, modifyTask, deleteTask, userId, deadline }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [taskDeadline, setTaskDeadline] = useState(deadline || '');
  const [completed, setCompleted] = useState(false);

  const taskIdentifier = `${userId}-${task}`;

  useEffect(() => {
    const storedCompleted = localStorage.getItem(`task-${taskIdentifier}`);
    if (storedCompleted !== null) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, [taskIdentifier]);

  useEffect(() => {
    localStorage.setItem(`task-${taskIdentifier}`, JSON.stringify(completed));
  }, [taskIdentifier, completed]);

  const handleEdit = () => {
    setIsEditing(true);
    setTaskDeadline(deadline || '');
  };

  const handleSave = () => {
    modifyTask(index, editedTask, taskDeadline);
    setIsEditing(false);
  };

  const handleComplete = () => {
    setCompleted(!completed);
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
                className="button-save custom-cursor  task-button float-right mx-2"
                onClick={handleSave}
              />
              <span className="button-save custom-cursor " onClick={handleSave}>Save</span>
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
                className="button-edit custom-cursor task-button float-right mx-2"
                onClick={handleEdit}
              />
              <span className="button-edit custom-cursor" onClick={handleEdit}>Edit</span>
              <FontAwesomeIcon
                icon={faTrash}
                className="button-delete custom-cursor task-button float-right mx-2"
                onClick={() => deleteTask(index)}
              />
              <span className="button-delete custom-cursor " onClick={() => deleteTask(index)}>Delete</span>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`button-complete custom-cursor task-button float-right mx-2 ${completed ? "completed" : ""}`}
                onClick={handleComplete}
              />
              <span className="button-complete custom-cursor " onClick={handleComplete}>Completed</span>
            </div>
          </div>
        )}
      </li>
    </>
  );
};

export default Task;


