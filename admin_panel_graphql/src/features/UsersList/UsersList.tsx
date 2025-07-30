'use client'
import styles from "./usersList.module.scss";
import {SearchInput} from "@/common/components/SearchInput/Search";
import {Sortable} from "@/common/components/Table/Table";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "@/apollo/queries/getUser";
import {useState} from "react";
import {ManagementUserAction} from "@/features/UsersList/ManagementUserAction/ManagementUserAction";
import {SearchSelect} from "@/features/SearchSelect";
import {DeleteUserModal} from "@/features/UsersList/ManagementUserAction/DeleteUser/DeleteUserModal";
import {sortTypes, uploadedPhotosColumns} from "@/common/utils/utils";
import {PaginationController} from "@/common/components/Pagination/PaginationController";
import {BanUser} from "@/features/UsersList/BanUser/BanUser";
import {UnBanUser} from "@/features/UsersList/UnBanUser/UnBanUser";
import {useUserActions} from "@/common/hooks/useUserActions";
import {useUserModals} from "@/common/hooks/useUserModals";

export const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');

    const {
        openActionModal,
        modalPosition,
        selectedUserId,
        handleOpenActionModal,
    } = useUserActions()

    const {
        openBanModal,
        handleOpenBanModal,
        openUnbanModal,
        handleOpenUnbanModal,
        openDeleteModal,
        handleOpenDeleteModal,
        closeAllModals
    } = useUserModals()

    const {data, loading} = useQuery(GET_USERS, {variables: {pageSize: 100}});
    const allUsers = data?.getUsers?.users || [];
    const isBanned = data?.getUsers?.users.find(user => user.id === selectedUserId)?.userBan !== null;


    const filteredUsers = allUsers.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
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
                ) : allUsers.length > 0 ? (
                    <>
                        <Sortable
                            columns={uploadedPhotosColumns}
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
                )}
                {openActionModal && (
                    <div style={{
                        position: 'absolute',
                        top: `${modalPosition.top}px`,
                        left: `${modalPosition.left - 100}px`,
                        zIndex: 1000
                    }}>
                        <ManagementUserAction
                            openDeleteModal={() => {
                                const userToDelete = paginatedUsers.find(user => user.id === openActionModal);
                                handleOpenDeleteModal(userToDelete?.id || null);
                            }}
                            openBanModal={() => handleOpenBanModal(selectedUserId)}
                            userId={selectedUserId}
                            openUnbanModal={() => handleOpenUnbanModal(selectedUserId)}
                            isBanned={isBanned}
                        />
                    </div>
                )}
            </div>
            {openDeleteModal && (
                <DeleteUserModal
                    open={openDeleteModal}
                    onClose={() => closeAllModals()}
                    userId={selectedUserId}
                />
            )}
            {openBanModal && (
                <BanUser
                    open={openBanModal}
                    onClose={() => closeAllModals()}
                    userId={selectedUserId}
                />
            )}
            {openUnbanModal && (
                <UnBanUser
                    open={openUnbanModal}
                    onClose={() => closeAllModals()}
                    userId={selectedUserId}
                />
            )}
            <div className={styles.pagination}>
                {filteredUsers.length > 0 && (
                    <PaginationController
                        totalItems={filteredUsers.length}
                        defaultItemsPerPage={8}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                )}
            </div>
        </div>
    );
};