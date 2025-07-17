'use client'
import { useState } from 'react';
import { Pagination } from "@/common/components/Pagination/Pagination";

type PaginationControllerProps = {
    totalItems: number;
    defaultItemsPerPage?: number;
    onPageChange?: (pageNumber: number, itemsPerPage: number) => void;
};

export const PaginationController = ({
                                         totalItems,
                                         defaultItemsPerPage = 8,
                                         onPageChange,
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
        setCurrentPage(1);
        onPageChange?.(1, newItemsPerPage);
    };

    return (
        <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            onPageChange={handlePageChange}
        />
    );
};