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
        accessor: 'profile.link',
    },
    {
        Header: 'User name',
        accessor: 'user.name',
    },
    {
        Header: 'Subscription Date',
        accessor: 'subscription.type',
    },
]

export const sortTypes = {
    string: (rowA, rowB, columnId, desc) => {
        const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [string, string];
        return a.localeCompare(b, 'en');
    }
};