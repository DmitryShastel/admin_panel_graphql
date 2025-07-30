import {Sortable} from "@/common/components/Table/Table";
import {paymentsColumns, sortTypes, usePagination} from "@/common/utils/utils";
import {PaginationController} from "@/common/components/Pagination/PaginationController";
import {GET_PAYMENTS} from "@/apollo/queries/payments";
import {useQuery} from "@apollo/client";
import {useParams} from "next/navigation";
import React, {useState} from "react";
import styles from "./../UploadedFoto/uploadedFoto.module.scss"


export const Payments = () => {
    const params = useParams()
    const userId = parseInt(params.userId as string, 10);
    const {
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginationVariables
    } = usePagination();
    const {data, loading} = useQuery(GET_PAYMENTS,
        {
            variables: {
                userId: userId,
                ...paginationVariables
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

    if (loading) {
        return <div>Loading payments...</div>;
    }


    return (
        <div>
            <div>
                {tableData.length > 0 ? (
                    <Sortable
                        columns={paymentsColumns}
                        data={tableData}
                        callbackOpen={() => {
                        }}
                        sortTypes={sortTypes}
                        showActionButton={false}
                    />
                ) : (
                    <div className={styles.noData}>
                        This user does not have payments
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
