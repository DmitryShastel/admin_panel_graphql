'use client'
import { useState } from 'react';
import { Pagination } from "@/common/components/Pagination/Pagination";

type PaginationControllerProps = {
    totalItems: number;
    defaultItemsPerPage?: number;
    onPageChange?: (pageNumber: number, itemsPerPage: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
};

export const PaginationController = ({
                                         totalItems,
                                         defaultItemsPerPage = 8,
                                         onPageChange,
                                         onItemsPerPageChange,
                                     }: PaginationControllerProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        //@ts-ignore
        onPageChange?.(pageNumber, itemsPerPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Сбрасываем на первую страницу при изменении количества элементов
        onPageChange?.(1, newItemsPerPage);
        onItemsPerPageChange?.(newItemsPerPage);
    };

    return (
        <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            onPageChange={handlePageChange}
            totalItems={totalItems}
        />
    );
};