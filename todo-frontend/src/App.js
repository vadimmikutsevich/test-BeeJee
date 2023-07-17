import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { TasksList } from './components/TasksList';
import { AddTaskForm } from './components//AddTaskForm';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
import { checkSession } from './store/authSlice';
import styles from './styles/App.module.css';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkSession())
  }, [dispatch])

  return (
    <Router>
      <div className={styles.wrapper}>
        <div className={styles.app}>
          <Header />

          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={
            <>
              <TasksList />
              <AddTaskForm />
            </>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
