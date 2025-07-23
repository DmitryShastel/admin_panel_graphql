// import styles from "./payments.module.scss"
import {Sortable} from "@/common/components/Table/Table";
import {FollowersColumns, FollowingColumns, sortTypes} from "@/common/utils/utils";
import {PaginationController} from "@/common/components/Pagination/PaginationController";
import {GET_PAYMENTS} from "@/apollo/payments";
import {useQuery} from "@apollo/client";
import {useParams} from "next/navigation";
import React, {useState} from "react";
import styles from "./../UploadedFoto/uploadedFoto.module.scss"


export const Payments = () => {
    const params = useParams()
    const userId = parseInt(params.userId as string, 10);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const {data} = useQuery(GET_PAYMENTS,
        {
            variables: {
                userId: userId,
                pageNumber: currentPage,
                pageSize: itemsPerPage
            }
        })
    const tableData = data?.getPaymentsByUser?.items?.map(payment => ({
        dateOfPayment: payment.dateOfPayment,
        endDate: payment.endDate,
        amount: payment.payments[0]?.amount || payment.price,
        type: payment.type,
        paymentType: payment.paymentType,
        currency: payment.payments[0]?.currency || 'USD'
    })) || [];

    const totalCount = data?.getPaymentsByUser?.totalCount || 0;


    return (
        // <div className={styles.container}>
        <div>
            {/*<div className={styles.table}>*/}
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
                    // <div className={styles.noFollowers}>
                    <div>
                        This user does not have following
                    </div>
                )}
            </div>
            {tableData.length > 0 && (
                // <div className={styles.pagination}>
                    <PaginationController
                        totalItems={totalCount}
                        defaultItemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={setItemsPerPage}
                    />
                // </div>
            )}
        </div>
    );
};
