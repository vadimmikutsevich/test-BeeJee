import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/authSlice';
import styles from '../styles/Header.module.css';

export const Header = () => {
  const admin = useSelector(state => state.auth.admin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <h1 className={styles.title}>Task Manager</h1>
      <nav className={styles.nav}>
        <NavLink className={({ isActive }) => (isActive ? styles.active_link : styles.link)} to="/">Home</NavLink>
        {!admin && <NavLink className={({ isActive }) => (isActive ? styles.active_link : styles.link)} to="/login">Login</NavLink>}
        {admin && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
};