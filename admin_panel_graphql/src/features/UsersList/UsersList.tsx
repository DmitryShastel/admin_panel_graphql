'use client'
import styles from "./usersList.module.scss"
import {SearchInput} from "@/common/components/SearchInput/Search";
import {Sortable} from "@/common/components/Table/Table";
import {Pagination} from "@/common/components/Pagination/Pagination";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "@/apollo/user";
import {useState} from "react";


export const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    const {data, loading} = useQuery(GET_USERS, {variables: {pageSize: 100}})
    const users = data?.getUsers?.users || []

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1)
    };

    const columns = [
        {
            Header: 'User ID',
            accessor: 'id',
        },
        {
            Header: 'Profile link',
            accessor: 'profile.userName',
        },
        {
            Header: 'Username',
            accessor: 'userName',
        },
        {
            Header: 'Date added',
            accessor: 'createdAt',
        },
    ];

    const sortTypes = {
        string: (rowA, rowB, columnId, desc) => {
            const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [string, string];
            return a.localeCompare(b, 'en');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <SearchInput/>
                {/*Не сделан*/}
                <p>Select</p>
            </div>
            <div className={styles.table}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    data ? (
                        <Sortable columns={columns} data={paginatedUsers} sortTypes={sortTypes}/>
                    ) : (
                        <p>No data available</p>
                    )
                )}
            </div>
            <div className={styles.pagination}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(users.length / itemsPerPage)}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    onPageChange={onPageChange}/>
            </div>
        </div>
    );
};
