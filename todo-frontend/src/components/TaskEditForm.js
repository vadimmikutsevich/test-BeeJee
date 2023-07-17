import { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/tasksSlice';
import styles from '../styles/TaskEditForm.module.css';

export const TaskEditForm = ({ task, onDone }) => {
  const [taskText, setTaskText] = useState(task.taskText);
  const [completed, setCompleted] = useState(task.completed);
  const dispatch = useDispatch();

  const onIsEdited = () => {
    if(task.taskText !== taskText) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(updateTask({ ...task, taskText, completed, edited: onIsEdited() }))
    .then(unwrapResult)
    .catch(error => {

      alert(error.message);
    });
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        className={styles.textInput}
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
      />

      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={e => setCompleted(e.target.checked)}
        />

        <span>
          Completed?
        </span>
      </div>

      <button type="submit" className={styles.saveBtn}>Save</button>
    </form>
  );
};