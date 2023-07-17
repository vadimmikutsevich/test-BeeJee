import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import styles from '../styles/AddTaskForm.module.css'

export const AddTaskForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [taskText, setTaskText] = useState('');
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!username || !email || !taskText) {
      alert('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      alert('Email is not valid');
      return;
    }

    dispatch(addTask({ username, email, taskText }));
    setUsername('')
    setEmail('')
    setTaskText('')

  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <input
          className={styles.customInput}
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          className={styles.customInput}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>

      <div className={styles.textareaContainer}>
        <textarea
          className={styles.textarea}
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
          placeholder="Task text"
        />
      </div>

      <button className={styles.addBtn} type="submit">Add Task</button>
    </form>
  );
};