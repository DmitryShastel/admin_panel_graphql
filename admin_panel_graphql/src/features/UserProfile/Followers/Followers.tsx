import styles from "@/features/UserProfile/UploadedFoto/uploadedFoto.module.scss";
import {Sortable} from "@/common/components/Table/Table";
import {FollowersColumns, sortTypes, usePagination} from "@/common/utils/utils";
import {PaginationController} from "@/common/components/Pagination/PaginationController";
import {useParams} from "next/navigation";
import {GET_FOLLOWERS} from "@/apollo/followers";
import {useQuery} from "@apollo/client";
import React from "react";

export const Followers = () => {

    const params = useParams()
    const userId = parseInt(params.userId as string, 10);
    const {
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginationVariables
    } = usePagination();
    const {data, loading} = useQuery(GET_FOLLOWERS,
        {
            variables: {
                userId: userId,
                ...paginationVariables
            }
        })

    const tableData = data?.getFollowers?.items.map(follower => ({
        id: follower.userId,
        userName: follower.userName || "Unknown User",
        firstName: follower.firstName || "User doesn't have link",
        subscriptionDate: follower.createdAt
    })) || [];

    const totalCount = data?.getFollowers?.totalCount || 0;

    if(loading){
        return <div>Loading followers...</div>;
    }

    return (
        <div>
            <div>
                {tableData.length > 0 ? (
                    <Sortable
                        columns={FollowersColumns}
                        data={tableData}
                        callbackOpen={() => {}}
                        sortTypes={sortTypes}
                        showActionButton={false}
                    />
                ) : (
                    <div className={styles.noData}>
                        This user does not have followers
                    </div>
                )}
            </div>
            {tableData.length > 0 && (
                    <PaginationController
                        totalItems={totalCount}
                        defaultItemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={setItemsPerPage}
                    />
            )}
        </div>
    );
};
