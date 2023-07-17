import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { TasksList } from './components/TasksList';
import { AddTaskForm } from './components//AddTaskForm';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
// import { logout, login } from './store/authSlice';
import styles from './styles/App.module.css';

function App() {

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
