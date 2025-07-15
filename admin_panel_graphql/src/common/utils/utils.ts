export const columns = [
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

export const sortTypes = {
    string: (rowA, rowB, columnId, desc) => {
        const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [string, string];
        return a.localeCompare(b, 'en');
    }
};