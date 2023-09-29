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

  return (
    <div>
      <Table
        tableName="table1"
        items={gridItems}
        isLoading={isLoading}
        gridTitle={<GridTitle />}
        size="small"
        selectionMode="multiple"
        defaultSortedColumnIds={['lastUpdated.label']}
        // defaultGroupColumnIds={['file.label', 'author.label']}
        isPageOnGroup={true}
        isGroupDefaultExpanded={true}
        // getRowClasses={(item, index) => (item.id == 3 ? styles.evenRow : '')}
        onGetGridActionMenu={(selectedItems) => (
          <GridActions selectedItems={selectedItems} />
        )}
        defaultPageSize={100}
      >
        <Column
          columnId="file.label"
          header={<>File Label</>}
          appearance="primary"
          renderActions={(items) => (
            <Button appearance="transparent" size="small">
              Test Action
            </Button>
          )}
          sizeOptions={{
            defaultWidth: 400,
            minWidth: 400,
          }}
        />
        <Column
          columnId="author.label"
          header={'Author Label'}
          sizeOptions={{
            defaultWidth: 400,
            minWidth: 400,
          }}
        />
        <Column columnId="author.status" header={<>Author Status</>} />
        <Column columnId="lastUpdated.label" header={<>Last Updated</>} />
        <Column columnId="lastUpdate.icon" header={<>Last Update Icon</>} />
        <Column
          columnId="lastUpdated.timestamp"
          header={<>Last Timestamp</>}
          renderCell={(item) => new Date(item.lastUpdated.timestamp)?.toLocaleTimeString() ?? `` }
        />
        <Column
          columnId="lastUpdate.label"
          header={<>Last Update Label</>}
          sizeOptions={{
            defaultWidth: 1000,
            minWidth: 900,
          }}
        />
      </Table>
    </div>
  );
}

export const GridActions: React.FC<{ selectedItems: Item[] }> = ({
  selectedItems,
}) => {
  return (
    <Toolbar aria-label="Default">
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
