import {useState} from "react";

export const uploadedPhotosColumns = [
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

export const paymentsColumns = [
    {
        Header: 'Date of Payment',
        accessor: 'dateOfPayment',
        Cell: ({ value }) => new Date(value).toLocaleDateString() // Форматирование даты
    },
    {
        Header: 'End Date',
        accessor: 'endDate',
        Cell: ({ value }) => new Date(value).toLocaleDateString()
    },
    {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ row }) => `${row.original.amount} ${row.original.currency}` // Сумма с валютой
    },
    {
        Header: 'Subscription Type',
        accessor: 'type'
    },
    {
        Header: 'Payment Type',
        accessor: 'paymentType'
    }
];

export const FollowersColumns = [
    {
        Header: 'User ID',
        accessor: 'id',
    },
    {
        Header: 'Profile link',
        accessor: 'firstName',
    },
    {
        Header: 'User name',
        accessor: 'userName',
    },
    {
        Header: 'Subscription Date',
        accessor: 'subscriptionDate',
    },
]

export const FollowingColumns = [
    {
        Header: 'User ID',
        accessor: 'id',
    },
    {
        Header: 'Profile link',
        accessor: 'firstName',
    },
    {
        Header: 'User name',
        accessor: 'userName',
    },
    {
        Header: 'Subscription Date',
        accessor: 'subscriptionDate',
    },
]

export const sortTypes = {
    string: (rowA, rowB, columnId, desc) => {
        const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [string, string];
        return a.localeCompare(b, 'en');
    }
};

export const usePagination = (initialPage = 1, initialItemsPerPage = 8) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    return {
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginationVariables: {
            pageNumber: currentPage,
            pageSize: itemsPerPage
        }
    };
};