import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import styles from '../styles/LoginForm.module.css';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector(state => state.auth.admin);

  const handleSubmit = e => {
    e.preventDefault();
    if (!username || !password) {
      alert('All fields are required');
      return;
    }

    dispatch(login({ username, password }))
    .then(unwrapResult)
    .catch(error => {
      
      alert('Failed to login: ' + error.message);
    });
  };

  if (admin) {
    return <div>Logged in as admin</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputs}>
        <input
          className={styles.customInput}
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          className={styles.customInput}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>

      <button className={styles.loginBtn} type="submit">Login</button>
    </form>
  );
};