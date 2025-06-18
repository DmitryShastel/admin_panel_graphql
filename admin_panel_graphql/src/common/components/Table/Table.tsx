'use client'
import {BiSortAlt2, BiSortDown, BiSortUp} from 'react-icons/bi'
import {Column, SortByFn, useSortBy, useTable} from 'react-table'

type User = {
    id: 1,
    firstName: 'Germaine',
    lastName: 'Ritchie',
    age: 48,
    email: 'Loy73@hotmail.com',
    phone: '231.577.0194 x983',
    address: {
        city: 'Dallas',
        street: '8906 Lelia Parks'
    },
    job: {
        position: 'Lead Branding Facilitator',
        company: 'Torphy - Klein'
    },
    visits: 54,
    progress: 7,
    status: 'relationship'
}
const data = [
    {
        id: 1,
        firstName: 'Alice',
        lastName: 'Smith',
        age: 30,
        email: 'alice.smith@example.com',
        phone: '123-456-7890',
        address: {
            city: 'New York',
            street: '123 Main Street'
        },
        job: {
            position: 'Software Engineer',
            company: 'Tech Company'
        },
        visits: 10,
        progress: 80,
        status: 'relationship'
    },
    {
        id: 2,
        firstName: 'Bob',
        lastName: 'Johnson',
        age: 35,
        email: 'bob.johnson@example.com',
        phone: '987-654-3210',
        address: {
            city: 'San Francisco',
            street: '456 Elm Street'
        },
        job: {
            position: 'Product Manager',
            company: 'Startup Inc'
        },
        visits: 15,
        progress: 70,
        status: 'single'
    },
    {
        id: 3,
        firstName: 'Charlie',
        lastName: 'Brown',
        age: 25,
        email: 'charlie.brown@example.com',
        phone: '456-789-0123',
        address: {
            city: 'Los Angeles',
            street: '789 Oak Avenue'
        },
        job: {
            position: 'Designer',
            company: 'Design Studio'
        },
        visits: 20,
        progress: 90,
        status: 'complicated'
    }
];

// определения колонок
export const columns: Column<User>[] = [
    {
        Header: 'ID',
        // user['id']
        accessor: 'id',
        // отключаем сортировку
        disableSortBy: true
    },
    {
        Header: 'First Name',
        accessor: 'firstName',
        // определяем тип сортировки
        sortType: 'string'
    },
    {
        Header: 'Last Name',
        accessor: 'lastName',
        sortType: 'string'
    },
    {
        Header: 'Age',
        accessor: 'age',
        sortType: 'number'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    },
    {
        Header: 'Address',
        // user['address'].city, user['address'].street
        accessor: ({address}) => `${address.city}, ${address.street}`
    },
    {
        Header: 'Company',
        accessor: ({job}) => `${job.position} in ${job.company}`
    }
]

// типы сортировок
export const sortTypes: Record<string, SortByFn<User>> = {
    // перезаписывает встроенный тип `string`
    string: (rowA, rowB, columnId, desc) => {
        const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
            string,
            string
        ]

        return a.localeCompare(b, 'en')
    }
}

export default function Sortable() {
    const {
        // эти штуки являются обязательными
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data, sortTypes}, useSortBy)

    return (
        <>
            <h1>Sortable Table</h1>
            <div className='table-wrapper'>
                <table {...getTableProps()}>
                    <thead>
                    {headerGroups.map((hG) => (
                        <tr {...hG.getHeaderGroupProps()}>
                            {hG.headers.map((col) => (
                                <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                                    {col.render('Header')}{' '}
                                    {col.canSort && (
                                        <span>
                        {col.isSorted ? (
                            col.isSortedDesc ? (
                                <BiSortUp/>
                            ) : (
                                <BiSortDown/>
                            )
                        ) : (
                            <BiSortAlt2/>
                        )}
                      </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)

                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}