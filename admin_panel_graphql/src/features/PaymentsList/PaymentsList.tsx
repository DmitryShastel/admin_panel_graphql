'use client'
import {SearchInput} from "@/common/components/SearchInput/Search";
import {Sortable} from "@/common/components/Table/Table";
import {paymentsListColumns, sortTypes, usePagination} from "@/common/utils/utils";
import styles from "./paymentsList.module.scss";
import {PaginationController} from "@/common/components/Pagination/PaginationController";
import {GET_PAYMENTS_LIST} from "@/apollo/queries/paymentsList";
import {useQuery} from "@apollo/client";
import {useState} from "react";
import Image from 'next/image';
import personRemoveOutline from '@/assets/svg/personRemoveOutline.svg';

export const PaymentsList = () => {
    const {
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginationVariables
    } = usePagination();

    const [searchTerm, setSearchTerm] = useState('');
    const {data, loading} = useQuery(GET_PAYMENTS_LIST, {variables: {...paginationVariables}});
    const allItems = data?.getPayments?.items || [];

    const filteredItems = allItems.filter(item =>
        item.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tableData = filteredItems.map(payment => ({
        userName: (
            <div className={styles.userCell}>
                <Image
                    src={payment.avatars?.[0]?.url || personRemoveOutline}
                    width={24}
                    height={24}
                    alt="User avatar"
                    className={styles.avatar}
                />
                <span>{payment.userName}</span>
            </div>
        ),
        createdAt: payment.createdAt,
        amount: payment.amount,
        type: payment.type,
        paymentMethod: payment.paymentMethod
    }));

    const totalCount = data?.getPayments?.totalCount || 0;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className={styles.container}>
            <SearchInput value={searchTerm} callBack={handleSearchChange}/>

            <div className={styles.tableWrapper}>
                {loading ? (
                    <p className={styles.message}>Loading...</p>
                ) : allItems.length > 0 ? (
                    <>
                        <div className={styles.tableContainer}>
                            <Sortable
                                columns={paymentsListColumns}
                                data={filteredItems.length > 0 ? tableData : []}
                                sortTypes={sortTypes}
                                callbackOpen={() => {}}
                                showActionButton={false}
                            />
                        </div>
                        {filteredItems.length === 0 && (
                            <p className={styles.message}>No payments found matching your search</p>
                        )}
                    </>
                ) : (
                    <p className={styles.message}>No data available</p>
                )}
            </div>

            {filteredItems.length > 0 && (
                <div className={styles.pagination}>
                    <PaginationController
                        totalItems={totalCount}
                        onItemsPerPageChange={setItemsPerPage}
                        onPageChange={setCurrentPage}
                        defaultItemsPerPage={itemsPerPage}
                    />
                </div>
            )}
        </div>
    );
};