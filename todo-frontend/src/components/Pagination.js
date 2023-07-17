import styles from '../styles/Pagination.module.css';

export const Pagination = ({ page, totalTasks, handlePrevPage, handleNextPage, handlePageChange }) => {
    const totalPages = Math.ceil(totalTasks / 3);
    const isDisabledPrevBtn = page === 0;
    const isDisabledNextBtn = page >= totalPages - 1;

    return (
        <div className={styles.paginationContainer}>
            <button className={styles.paginationBtn} onClick={handlePrevPage} disabled={isDisabledPrevBtn}>Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    className={styles.paginationBtn}
                    onClick={() => handlePageChange(i)}
                    disabled={i === page}>
                    {i + 1}
                </button>
            ))}
            <button className={styles.paginationBtn} onClick={handleNextPage} disabled={isDisabledNextBtn}>Next</button>
        </div>
    );
};