import { Checkbox, useFocusableGroup } from '@fluentui/react-components';
import { Header, HeaderGroup, RowData, Table } from '@tanstack/react-table';
import { HeaderCell } from './HeaderCell';
import { useTableHeaderStyles } from './useTableHeaderStyles';
import { Case, For, Show, Switch } from '@prt-ts/react-control-flow';

type HeaderRowProps<TItem extends RowData> = {
    table: Table<TItem>;
    headerGroup: HeaderGroup<TItem>,
    headerGroupsLength: number;
}

export function HeaderRow<TItem extends RowData>(props: HeaderRowProps<TItem>) {
    const styles = useTableHeaderStyles();

    const { table, headerGroup, headerGroupsLength } = props;
    const { rowSelectionMode, tableSettings } = table.options.meta ?? {};
    const headerCellTabAttributes = useFocusableGroup({ tabBehavior: "limited" });

    const isLeafHeaders = headerGroup.depth === headerGroupsLength - 1;

    return (
        <tr key={headerGroup.id} className={styles.tHeadRow}>
            <Show when={!tableSettings?.enableManualSelection}>
                <Switch when={rowSelectionMode}>
                    <Case value="multiple">
                        <th
                            style={{ width: '1rem' }}
                            aria-label="Select All Row"
                        >
                            <Show when={isLeafHeaders}>
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
                            </Show>
                        </th>
                    </Case>
                    <Case value="single">
                        <th
                            style={{ width: '1rem' }}
                            aria-label="Select All Row Column"
                        >
                            {' '}
                        </th>
                    </Case>
                </Switch>
            </Show>


            <For each={headerGroup.headers}>
                {
                    (header, index) => {
                        return (
                            <HeaderCell
                                key={`${header.id}_${index}`}
                                header={header as unknown as Header<TItem, unknown>}
                                table={table as unknown as Table<TItem>} 
                                tabAttributes={headerCellTabAttributes}
                            />
                        );
                    }
                }
            </For>
        </tr>
    );
}