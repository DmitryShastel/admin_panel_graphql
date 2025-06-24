import React from 'react';
import styles from './pagination.module.scss';

export const Pagination = ({ totalPages, currentPage, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === currentPage - 1 || i === currentPage || i === currentPage + 1 || i === totalPages) {
            pageNumbers.push(i);
        } else if (currentPage > 3 && currentPage < totalPages - 2 && (i === 2 || i === totalPages - 1)) {
            pageNumbers.push('...');
        }
    }

    return (
        <div className={styles.pagination}>
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>&lt;</button>
            {pageNumbers.map((number, index) => (
                <button key={index} onClick={() => number !== '...' ? onPageChange(number) : null} className={currentPage === number ? styles.active : ''}>
                    {number}
                </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>&gt;</button>

            <span>Show
                <select value={itemsPerPage} onChange={(e) => onItemsPerPageChange(Number(e.target.value))}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="8">8</option>
                </select>
                on page
            </span>
        </div>
    );
};