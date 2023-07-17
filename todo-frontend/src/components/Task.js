import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TaskEditForm } from './TaskEditForm';
import styles from '../styles/Task.module.css';

export const Task = ({ task }) => {

    const [editing, setEditing] = useState(false);
    const admin = useSelector(state => state.auth.admin);

    const handleEditClick = () => {
        if (admin) {
            setEditing(true);
        }
    };

    const finishEditing = () => {
        setEditing(false)
    }

    if (editing) {
        return (
            <tr>
                <td colSpan="4">
                    <TaskEditForm task={task} onDone={finishEditing} />
                </td>
            </tr>
        );
    }

    return (
        <tr onClick={handleEditClick} className={admin ? styles.task_admin : styles.task}>
            <td>{task.username}</td>
            <td>{task.email}</td>
            <td><span dangerouslySetInnerHTML={{ __html: task.taskText }} /></td>
            <td>
                {task.completed ? <span>Completed</span> : <span>Not completed</span>}
                {task.edited && <span>Edited by admin</span>}
            </td>
        </tr>
    );
}