'use client'
import {BiSortAlt2, BiSortDown, BiSortUp} from 'react-icons/bi';
import {Column, SortByFn, useSortBy, useTable} from 'react-table';
import Image from 'next/image';
import styles from './table.module.scss'
import moreHorizontalOutline from "@/assets/svg/moreHorizontalOutline.svg";
import block from "@/assets/svg/block.svg";

type DefaultColumn = {
    id: string,
    Header: string,
    accessor: string | ((row: any) => any),
    sortType?: string,
}

type Props<Data extends object> = {
    columns: Column<Data>[],
    data: Data[],
    sortTypes: Record<string, SortByFn<Data>>,
    callbackOpen: (userId: string, event: React.MouseEvent) => void
    showActionButton?: boolean
}

export const Sortable = <Data extends {
    id: string,
    userBan?: {
        reason: string,
        createdAt: string
    } | null
}>({
       columns,
       data,
       sortTypes,
       callbackOpen,
       showActionButton = true
   }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data, sortTypes}, useSortBy);


    return (
        <div className={styles.tableWrapper}>
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
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell, index) => (
                                <td {...cell.getCellProps()}>
                                    {index === 0 && row.original.userBan && (
                                        <Image
                                            src={block}
                                            width={16}
                                            height={16}
                                            alt="Banned"
                                            title={`Banned for: ${row.original.userBan.reason}`}
                                            style={{marginRight: '8px'}}
                                        />
                                    )}
                                    {index === row.cells.length - 1 && showActionButton ? (
                                        <>
                                            {cell.render('Cell')}
                                            <button onClick={(e) => callbackOpen(row.original.id, e)}>
                                                <Image src={moreHorizontalOutline} width={24} height={24} alt=""/>
                                            </button>
                                        </>
                                    ) : cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};