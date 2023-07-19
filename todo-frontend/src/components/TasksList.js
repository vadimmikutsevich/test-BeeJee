import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Task } from "./Task";
import { Pagination } from "./Pagination";
import { fetchTasks } from "../store/tasksSlice";
import styles from '../styles/TasksList.module.css';

export const TasksList = () => {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector(state => state.tasks);
  const totalTasks = useSelector(state => state.tasks.totalTasks);
  const [sortOrder, setSortOrder] = useState('username,ASC');
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchTasks({ sortOrder, page }));
  }, [dispatch, sortOrder, page]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className={styles.wrapper}>
      <h4>Sorting by:</h4>

      <select className={styles.select} value={sortOrder} onChange={handleSortChange}>
        <option value="username,ASC">Username (asc)</option>
        <option value="username,DESC">Username (desc)</option>
        <option value="email,ASC">Email (asc)</option>
        <option value="email,DESC">Email (desc)</option>
        <option value="status,ASC">Status (asc)</option>
        <option value="status,DESC">Status (desc)</option>
      </select>

      <table className={styles.table}>
        <thead className={styles.thead}>
            <tr>
              <th>
                <div>
                  Username
                </div>
              </th>
              <th>
                <div>
                  Email
                </div>
              </th>
              <th>
                <div>
                  Task
                </div>
              </th>
              <th>
                <div>
                  Status
                </div>
              </th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {status === 'loading' && <h4>Loading...</h4>}

          {status !== 'loading' && tasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>

      <Pagination
        page={page}
        totalTasks={totalTasks}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};