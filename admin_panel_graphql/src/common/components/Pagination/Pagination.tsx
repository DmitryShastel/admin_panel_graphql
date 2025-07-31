'use client'
import React from 'react';
import styles from './pagination.module.scss';

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    totalItems: number;
};

export const Pagination = ({
                               totalPages,
                               currentPage,
                               onPageChange,
                               itemsPerPage,
                               onItemsPerPageChange,
                               totalItems
                           }: PaginationProps) => {
    const pageNumbers = [];
    const itemsPerPageOptions = [1, 3, 5, 8];

    // Генерация номеров страниц с многоточиями
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === currentPage - 1 || i === currentPage || i === currentPage + 1 || i === totalPages) {
            pageNumbers.push(i);
        } else if (currentPage > 3 && currentPage < totalPages - 2 && (i === 2 || i === totalPages - 1)) {
            pageNumbers.push('...');
        }
    }

    return (
        <div className={styles.pagination}>
            <div className={styles.paginationControls}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className={styles.paginationButton}
                >
                    &lt;
                </button>

                {pageNumbers.map((number, index) => (
                    <button
                        key={index}
                        onClick={() => number !== '...' ? onPageChange(number) : null}
                        className={`${styles.paginationButton} ${currentPage === number ? styles.active : ''}`}
                    >
                        {number}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className={styles.paginationButton}
                >
                    &gt;
                </button>
            </div>

            <div className={styles.itemsPerPageSelector}>
                <span>Show</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    className={styles.select}
                >
                    {itemsPerPageOptions.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <span>of {totalItems} items</span>
            </div>
        </div>
    );
};
