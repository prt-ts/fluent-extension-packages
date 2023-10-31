import { Column, Table } from '@prt-ts/fluent-react-table';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Button,
  Text,
} from '@fluentui/react-components';
import {
  TextFont24Regular,
  MoreHorizontal24Filled,
  FontIncrease24Regular,
  FontDecrease24Regular,
} from '@fluentui/react-icons';
import { Subtitle2Stronger } from '@fluentui/react-components';
import * as React from 'react';

import { makeStyles, tokens } from '@fluentui/react-components';
import { Item, items } from './data';
import { TableRefType } from 'packages/fluent-react-table/src/lib/types';

export const useTableStyles = makeStyles({
  evenRow: {
    backgroundColor: tokens.colorPaletteRedBackground3,
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2,
    },
  },
});

const GridTitle = () => {
  return (
    <div>
      <Subtitle2Stronger>Example Table</Subtitle2Stronger>
      { " | "}
      <Text size={200}>This is some more example subtext</Text>
    </div>
  );
}

export function TableExample() {
  const [gridItems, setGridItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const styles = useTableStyles();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setGridItems(items);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  const tableRef = React.useRef<TableRefType<Item>>(null);

  const changePageNumber = (pageNumber: number) => {
    tableRef.current?.setCurrentPage(pageNumber - 1);
  }

  const setFilterValue = (filter: string) => {
    tableRef.current?.setGlobalFilter(filter);
  }

  const setDefaultView = () => {
    const viewName = localStorage.getItem('table1_LastUsedView');
    console.log(viewName);
    tableRef.current?.applyTableView(viewName);
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      // setDefaultView();
    }, 100);

    return () => clearTimeout(timeout);
  }, [])

  const [showDeleteBtn, setShowDeleteBtn] = React.useState<boolean>(false);

  return (
    <div> 
      <Button onClick={() => alert(JSON.stringify(tableRef.current.getTableState()))}>getTableState</Button>
      <Button onClick={() => changePageNumber(101)}>Change Page Number</Button>
      <Button onClick={() => setFilterValue("filter value")}>SetFilterValue</Button>
      <Button onClick={() => tableRef.current.setPageSize(50)}>setPageSize(50)</Button>
      <Button onClick={() => setDefaultView()}>Set Last used View</Button>
      <Button onClick={() => setShowDeleteBtn(!showDeleteBtn)}>Toggle Delete Button</Button>
      <Table 
        ref={tableRef}
        tableName="table1"
        items={gridItems}
        isLoading={isLoading}
        gridTitle={<GridTitle />}
        size="small"
        selectionMode="multiple"
        defaultSortedColumnIds={['lastUpdated.label']}
        // defaultGroupColumnIds={['file.label', 'author.label']}
        isPageOnGroup={false}
        isGroupDefaultExpanded={true}
        // getRowClasses={(item, index) => (item.id == 3 ? styles.evenRow : '')}
        onGetGridActionMenu={(selectedItems) => (
          <GridActions selectedItems={selectedItems as Item[]} showDeleteBtn = {showDeleteBtn}/>
        )}
        defaultPageSize={20}
        maxTableHeight={650}
        noItemPage={<>Hello there is no item in the grid</>}
      >
        <Column<Item>
          key="actions"
          columnId="actions"
          header={<>Actions</>}
          appearance="primary"
          renderCell={(item) => (
            <>
              <Button appearance="primary" size="small">
                Test Action 
              </Button>
              {
                showDeleteBtn && (
                  <Button
                    appearance="primary"
                    size="small"
                    onClick={() => console.log("delete")}>
                    Delete</Button>)
              }
            </>
          )}
          disableSorting={true}
          disableGrouping={true}
        />
        <Column<Item>
          key="action"
          columnId="file.label"
          header={<>File Label</>}
          appearance="primary"
          renderActions={(items) => (
            <Button appearance="transparent" size="small">
              Test Action
            </Button>
          )} 
          disableSorting={true}
          disableGrouping={true}
        />
        <Column<Item>
          key='author.icon'
          columnId="author.label"
          header={'Author Label'} 
          disableSorting={true}
        />
        <Column<Item> key='author.status' columnId="author.status" header={<>Author Status</>} />
        <Column<Item> key="lastUpdated.label" columnId="lastUpdated.label" header={<>Last Updated</>} />
        <Column<Item> key="lastUpdate.icon" columnId="lastUpdate.icon" header={<>Last Update Icon</>} />
        <Column<Item>
          key="lastUpdated.timestamp"
          columnId="lastUpdated.timestamp"
          header={<>Last Timestamp</>}
          renderCell={(item) => new Date(item.lastUpdated.timestamp)?.toLocaleTimeString() ?? `` }
          hideInDefaultView={true}
        />
        <Column<Item>
          key="lastUpdate.label"
          columnId="lastUpdate.label"
          header={<>Last Update Label</>} 
          hideInDefaultView={true}
        />
      </Table>
    </div>
  );
}

export const GridActions: React.FC<{ selectedItems: Item[], showDeleteBtn: boolean }> = ({
  selectedItems,
  showDeleteBtn
}) => {
  return (
    <Toolbar aria-label="Default">
      {selectedItems.length > 0 && ("Selected " + selectedItems.length + " items")}
      {showDeleteBtn && <ToolbarButton
        aria-label="Increase Font Size"
        appearance="primary"
        icon={<FontIncrease24Regular />}
      />}
      <ToolbarButton
        aria-label="Increase Font Size"
        appearance="primary"
        icon={<FontIncrease24Regular />}
      />
      <ToolbarButton
        aria-label="Decrease Font Size"
        icon={<FontDecrease24Regular />}
      />
      <ToolbarButton
        aria-label="Reset Font Size"
        icon={<TextFont24Regular />}
      />
      <ToolbarDivider />
      <Menu>
        <MenuTrigger>
          <ToolbarButton aria-label="More" icon={<MoreHorizontal24Filled />} />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </Toolbar>
  );
};
