import React, {useState} from 'react';
import styles from "@/features/UserProfile/Followers/followers.module.scss";
import {Sortable} from "@/common/components/Table/Table";
import {FollowingColumns, sortTypes, usePagination} from "@/common/utils/utils";
import {PaginationController} from "@/common/components/Pagination/PaginationController";
import {useParams} from "next/navigation";
import {useQuery} from "@apollo/client";
import {GET_FOLLOWING} from "@/apollo/following";

export const Following = () => {

    const params = useParams()
    const userId = parseInt(params.userId as string, 10);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage, setItemsPerPage] = useState(8);
    const {
        // currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginationVariables
    } = usePagination();

    const {data} = useQuery(GET_FOLLOWING, {
        variables: {
            userId: userId,
            // pageNumber: currentPage,
            // pageSize: itemsPerPage
            ...paginationVariables
        }
    });


    const tableData = data?.getFollowing?.items.map(following => ({
        id: following.userId,
        userName: following.userName || "Unknown User",
        firstName: following.firstName || "User doesn't have link",
        subscriptionDate: following.createdAt
    })) || [];

    const totalCount = data?.getFollowing?.totalCount || 0;

    return (
        <div className={styles.container}>
            <div className={styles.table}>
                {tableData.length > 0 ? (
                    <Sortable
                        columns={FollowingColumns}
                        data={tableData}
                        callbackOpen={() => {
                        }}
                        sortTypes={sortTypes}
                        showActionButton={false}
                    />
                ) : (
                    <div className={styles.noFollowers}>
                        This user does not have following
                    </div>
                )}
            </div>
            {tableData.length > 0 && (
                <div className={styles.pagination}>
                    <PaginationController
                        totalItems={totalCount}
                        defaultItemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={setItemsPerPage}
                    />
                </div>
            )}
        </div>
    );
};

