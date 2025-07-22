import styles from "@/features/UserProfile/Followers/followers.module.scss";
import {Sortable} from "@/common/components/Table/Table";
import {FollowersColumns, paymentsColumns, sortTypes} from "@/common/utils/utils";
import {PaginationController} from "@/common/components/Pagination/PaginationController";
import {useParams} from "next/navigation";
import {GET_FOLLOWERS} from "@/apollo/followers";
import {useQuery} from "@apollo/client";
import {useState} from "react";

export const Followers = () => {

    const params = useParams()
    const userId = parseInt(params.userId as string, 10);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const {data} = useQuery(GET_FOLLOWERS,
        {
            variables: {
                userId: userId,
                pageNumber: currentPage,
                pageSize: itemsPerPage
            }
        })

    const tableData = data?.getFollowers?.items.map(follower => ({
        id: follower.id,
        userId: follower.userId,
        profileLink: `/profile/${follower.userId}`,
        userName: follower.userName || `${follower.firstName} ${follower.lastName}`,
        subscriptionDate: new Date(follower.createdAt).toLocaleDateString()
    })) || [];

    const totalCount = data?.getFollowers?.totalCount || 0;

    return (
        <div className={styles.container}>
            <div className={styles.table}>
                {tableData.length > 0 ? (
                    <Sortable
                        columns={FollowersColumns}
                        data={tableData}
                        callbackOpen={() => {}}
                        sortTypes={sortTypes}
                        showActionButton={false}
                    />
                ) : (
                    <div className={styles.noFollowers}>
                        This user does not have followers
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
