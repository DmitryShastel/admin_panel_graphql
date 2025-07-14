'use client'
import styles from "./usersList.module.scss"
import {SearchInput} from "@/common/components/SearchInput/Search";
import {Sortable} from "@/common/components/Table/Table";
import {Pagination} from "@/common/components/Pagination/Pagination";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "@/apollo/user";
import {useState} from "react";
import {ManagementUserAction} from "@/features/UsersList/ManagementUserAction/ManagementUserAction";
import {SearchSelect} from "@/features/SearchSelect";


export const UsersList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(8);
    const [open, setOpen] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')

    const {data, loading} = useQuery(GET_USERS, {variables: {pageSize: 100}})
    const allUsers  = data?.getUsers?.users || []

    const filteredUsers = allUsers .filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const onModalOpen = () => {
        setOpen(prevState => !prevState)
    }

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1)
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
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
                <SearchInput value={searchTerm} callBack={handleSearchChange}/>
                <SearchSelect/>
            </div>
            <div className={styles.table}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    allUsers.length > 0 ? (
                        <>
                            <Sortable
                                columns={columns}
                                data={paginatedUsers}
                                sortTypes={sortTypes}
                                callbackOpen={onModalOpen}
                            />
                            {filteredUsers.length === 0 && (
                                <p>No users found matching your search</p>
                            )}
                        </>
                    ) : (
                        <p>No data available</p>
                    )
                )}
                {open && <ManagementUserAction/>}
            </div>
            <div className={styles.pagination}>
                {filteredUsers.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        onPageChange={onPageChange}/>
                )}
            </div>
        </div>
    );
};
