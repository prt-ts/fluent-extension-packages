import { Table } from '@prt-ts/fluent-react-table';
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
} from "@fluentui/react-components";
import {
    FontIncrease24Regular,
    FontDecrease24Regular,
    TextFont24Regular,
    MoreHorizontal24Filled,
} from "@fluentui/react-icons";
import { Subtitle2Stronger } from '@fluentui/react-components';
import * as React from "react";
import { Item, items } from './app';

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useTableStyles = makeStyles({
 
    evenRow: {
        backgroundColor: tokens.colorPaletteRedBackground3,
        ":hover": {
            backgroundColor: tokens.colorBrandBackground2,
        }
    },
 
});


export function TableExample() {
    const [gridItems, setGridItems] = React.useState<Item[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const styles = useTableStyles();

    React.useEffect(() => { 
        const timeout = setTimeout(() => {
            setGridItems(items);
            setIsLoading(false);
        }, 3000); 

        return () => clearTimeout(timeout)
    }, [])

    return (<div>
        <Table
            items={gridItems}
            isLoading={isLoading}
            gridTitle={<Subtitle2Stronger>Example Table</Subtitle2Stronger>}
            size='small'
            selectionMode='multiple'
            defaultSortedColumnIds={['lastUpdated.label']}
            defaultGroupColumnIds={["file.label", "author.label", "author.status"]}
            isPageOnGroup={false}
            // getRowClasses={(item, index) => item.id == 3 ? styles.evenRow : ""}
            columns={[
                {
                    columnId: "file.label",
                    renderHeaderCell: () => <>File</>,

                    renderCell: (item: Item) => <>{item.file.icon} {item.file.label}</>,

                    sizeOptions: {
                        defaultWidth: 300
                    },
                     appearance: "primary",
                    renderActions: (items) => <Button appearance='transparent' size='small'>Test Action</Button> 
                },
                {
                    columnId: "author.label",
                    renderHeaderCell: () => <>Author</>,
                    renderSecondary: (item) => item.author.status
                },
                {
                    columnId: "author.status",
                    renderHeaderCell: () => <>Author Status</>,
                    renderSecondary: (item) => item.author.status,
                    hideInDefaultView: true
                },
                {
                    columnId: "lastUpdated.label",
                    renderHeaderCell: () => <>Last Updated</>
                },
                {
                    columnId: "lastUpdate.icon",
                    renderHeaderCell: () => <>Last Updated</>,
                    renderCell: (item)=> item.lastUpdate.icon
                },
                {
                    columnId: "lastUpdated.timestamp",
                    renderHeaderCell: () => <>Last Timestamp</>
                },                
                {
                    columnId: "lastUpdate.label",
                    renderHeaderCell: () => <>Note</>,
                    renderMedia: (item: Item) => item.lastUpdate.icon,

                    sizeOptions : {
                        defaultWidth : 100
                    }
                }
            ]}
            
            onGetGridActionMenu={(selectedItems) => {
                console.log("selectedItems", selectedItems)
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
                        <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
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
                    </Toolbar>)
            }}
        />


    </div>)
}