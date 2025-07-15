'use client'
import {useState} from "react";

export const usePagination = (initialPage = 1, initialItemsPerPage = 8) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    const paginate = <T,>(items: T[]) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    };

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const onItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    return {
        currentPage,
        itemsPerPage,
        paginate,
        onPageChange,
        onItemsPerPageChange,
    };
};