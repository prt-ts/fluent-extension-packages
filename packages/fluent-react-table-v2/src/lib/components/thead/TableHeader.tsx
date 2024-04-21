import { HeaderGroup, RowData, Table } from '@tanstack/react-table';
import { TableProps } from '../../types';
import { useTableHeaderStyles } from './useTableHeaderStyles';
import { HeaderRow } from './HeaderRow';
import { useFocusableGroup } from '@fluentui/react-components';

type HeaderRowProps<TItem extends RowData> = {
    table: Table<TItem>;
    rowSelectionMode?: TableProps<TItem>['rowSelectionMode'];
    headerGroups: HeaderGroup<TItem>[], 
}

export function TableHeader<TItem extends RowData>(props: HeaderRowProps<TItem>) {
    const styles = useTableHeaderStyles(); 
    const { table, headerGroups } = props;
    const focusAttribute = useFocusableGroup({ tabBehavior: "limited-trap-focus" });


    return (
        <thead className={styles.tHead} style={{zIndex: 99}} {...focusAttribute} tabIndex={0}>
            {headerGroups?.map((headerGroup) => (
                <HeaderRow
                    key={headerGroup.id}
                    table={table} 
                    headerGroup={headerGroup}
                    headerGroupsLength={headerGroups.length}
                />
            ))}
        </thead>
    );
}