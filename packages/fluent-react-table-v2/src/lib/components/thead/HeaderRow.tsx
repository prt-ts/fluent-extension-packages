import { Checkbox, useFocusableGroup } from '@fluentui/react-components';
import { Header, HeaderGroup, RowData, Table } from '@tanstack/react-table';
import { TableProps } from '../../types';
import { HeaderCell } from './HeaderCell';
import { useTableHeaderStyles } from './useTableHeaderStyles';
import { For, Show } from '@prt-ts/react-control-flow';

type HeaderRowProps<TItem extends RowData> = {
    table: Table<TItem>;
    rowSelectionMode?: TableProps<TItem>['rowSelectionMode'];
    headerGroup: HeaderGroup<TItem>,
    headerGroupsLength: number;
}

export function HeaderRow<TItem extends RowData>(props: HeaderRowProps<TItem>) {
    const styles = useTableHeaderStyles();

    const { table, headerGroup, rowSelectionMode, headerGroupsLength } = props;
    const headerCellTabAttributes = useFocusableGroup({ tabBehavior: "limited" });

    return (
        <tr key={headerGroup.id} className={styles.tHeadRow}>
            <Show when={rowSelectionMode === 'multiple'}>
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
            </Show>
            <Show when={rowSelectionMode === 'single'}>
                <th
                    style={{ width: '1rem' }}
                    aria-label="Select All Row Column"  
                >
                    {' '}
                </th>
            </Show>
            <For each={headerGroup.headers}>
                {
                    (header, index) => {
                        return (
                            <HeaderCell
                                key={`${header.id}_${index}`}
                                header={header as unknown as Header<TItem, unknown>}
                                table={table as unknown as Table<TItem>}
                                hideMenu={headerGroup.depth !== headerGroupsLength - 1}
                                headerDepth={headerGroup.depth}
                                totalNumberOfHeaderDepth={headerGroupsLength - 1}
                                tabAttributes={headerCellTabAttributes}
                            />
                        );
                    }
                }
            </For> 
        </tr>
    );
}