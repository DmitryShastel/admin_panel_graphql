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
import {DeleteUserModal} from "@/features/UsersList/ManagementUserAction/DeleteUser/DeleteUserModal";
import {columns, sortTypes} from "@/common/utils/utils";

export const UsersList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(8);
    const [openActionModal, setOpenActionModal] = useState<string | null>(null);
    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const {data, loading} = useQuery(GET_USERS, {variables: {pageSize: 100}});
    const allUsers = data?.getUsers?.users || [];

    const filteredUsers = allUsers.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        // setOpenModalId(null); // Закрываем модалку при смене страницы
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
        // setOpenModalId(null);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
        // setOpenModalId(null);
    };

    const handleOpenActionModal = (userId: any, event: React.MouseEvent) => {
        const buttonRect = event.currentTarget.getBoundingClientRect();
        setModalPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.left + window.scrollX
        });
        setOpenActionModal(openActionModal === userId ? null : userId);
    };

    const handleOpenDeleteModal = (userId: number | null) => {
        setOpenDeleteModal(true)
        setOpenActionModal(null)
        setSelectedUserId(userId);
    }


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
                                callbackOpen={handleOpenActionModal}
                            />
                            {filteredUsers.length === 0 && (
                                <p>No users found matching your search</p>
                            )}
                        </>
                    ) : (
                        <p>No data available</p>
                    )
                )}
                {openActionModal && (
                    <div
                        style={{
                            position: 'absolute',
                            top: `${modalPosition.top}px`,
                            left: `${modalPosition.left}px`,
                            zIndex: 1000
                        }}
                    >
                        <ManagementUserAction
                            openDeleteModal={() => {
                                const userToDelete = paginatedUsers.find(user => user.id === openActionModal);
                                handleOpenDeleteModal(userToDelete?.id || null);
                            }}
                        />
                    </div>
                )}
            </div>
            {openDeleteModal && <DeleteUserModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                userId={selectedUserId}
            />
            }
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