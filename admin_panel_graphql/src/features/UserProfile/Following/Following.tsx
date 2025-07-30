import styles from "@/features/UserProfile/UploadedFoto/uploadedFoto.module.scss";
import {Sortable} from "@/common/components/Table/Table";
import {FollowingColumns, sortTypes, usePagination} from "@/common/utils/utils";
import {PaginationController} from "@/common/components/Pagination/PaginationController";
import {useParams} from "next/navigation";
import {useQuery} from "@apollo/client";
import {GET_FOLLOWING} from "@/apollo/queries/following";

export const Following = () => {

    const params = useParams()
    const userId = parseInt(params.userId as string, 10);

    const {
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginationVariables
    } = usePagination();


    const {data, loading} = useQuery(GET_FOLLOWING, {
        variables: {
            userId: userId,
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

    if(loading){
        return <div>Loading following...</div>;
    }

    return (
        <div>
            <div>
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
                    <div className={styles.noData}>
                        This user does not have following
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

