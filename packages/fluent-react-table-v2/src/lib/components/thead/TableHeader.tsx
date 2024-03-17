import { HeaderGroup, RowData, Table } from '@tanstack/react-table';
import { TableProps } from '../../types';
import { useTableHeaderStyles } from './useTableHeaderStyles';
import { HeaderRow } from './HeaderRow';

type HeaderRowProps<TItem extends RowData> = {
    table: Table<TItem>;
    rowSelectionMode?: TableProps<TItem>['rowSelectionMode'];
    headerGroups: HeaderGroup<TItem>[], 
}

export function TableHeader<TItem extends RowData>(props: HeaderRowProps<TItem>) {
    const styles = useTableHeaderStyles(); 
    const { table, headerGroups, rowSelectionMode } = props;

    return (
        <thead className={styles.tHead} style={{zIndex: 99}}>
            {headerGroups?.map((headerGroup) => (
                <HeaderRow
                    key={headerGroup.id}
                    table={table}
                    rowSelectionMode={rowSelectionMode}
                    headerGroup={headerGroup}
                    headerGroupsLength={headerGroups.length}
                />
            ))}
        </thead>
    );
}