import { Checkbox } from '@fluentui/react-components';
import { Header, HeaderGroup, RowData, Table } from '@tanstack/react-table';
import { TableProps } from '../../types';
import { HeaderCell } from './HeaderCell';
import { useTableHeaderStyles } from './useTableHeaderStyles';

type HeaderRowProps<TItem extends RowData> = {
    table: Table<TItem>;
    rowSelectionMode?: TableProps<TItem>['rowSelectionMode'];
    headerGroup: HeaderGroup<TItem>,
    headerGroupsLength: number;
}

export function HeaderRow<TItem extends RowData>(props: HeaderRowProps<TItem>) {
    const styles = useTableHeaderStyles();

    const { table, headerGroup, rowSelectionMode, headerGroupsLength } = props;

    return (
        <tr key={headerGroup.id} className={styles.tHeadRow}>
            {rowSelectionMode === 'multiple' && (
                <th
                    style={{ width: '1rem' }}
                    aria-label="Select All Row Column"
                >
                    {headerGroup.depth === headerGroupsLength - 1 && (
                        <Checkbox
                            checked={
                                table.getIsSomeRowsSelected()
                                    ? 'mixed'
                                    : table.getIsAllRowsSelected()
                            }
                            onChange={table.getToggleAllRowsSelectedHandler()}
                            aria-label="Select All Rows"
                            title={'Select All Rows'}
                        />
                    )}
                </th>
            )}
            {rowSelectionMode === 'single' && (
                <th
                    style={{ width: '1rem' }}
                    aria-label="Select All Row Column"
                >
                    {' '}
                </th>
            )}
            {headerGroup.headers.map((header) => {
                return (
                    <HeaderCell
                        key={header.id}
                        header={header as unknown as Header<TItem, unknown>}
                        table={table as unknown as Table<TItem>}
                        hideMenu={headerGroup.depth !== headerGroupsLength - 1}
                        headerDepth={headerGroup.depth}
                        totalNumberOfHeaderDepth={headerGroupsLength - 1}
                    />
                );
            })}
        </tr>
    );
}