import * as React from "react";
import { IGroup } from "../../types";
import { Body1Stronger, Button, TableCell, TableRow } from "@fluentui/react-components"; 
import { GroupCollapsedIcon, GroupExpandedIcon } from "../Icons";

export const GroupRenderer = <TItem extends NonNullable<{ id: string | number }>,>(
    { items, group, colSpan, onItemRender, onSelectionRender, toggleGroupExpand, headerRowClassName }: React.PropsWithChildren<{
        items: TItem[],
        group: IGroup,
        colSpan: number,
        onItemRender: (items: TItem[]) => JSX.Element,
        onSelectionRender: (items: TItem[]) => JSX.Element,
        toggleGroupExpand: (currentGroup: IGroup) => void,
        headerRowClassName?: string
    }>) => {
    const padding = React.useMemo(() => group.level ? group.level * 20 : 0, [group]);

    return <>
        <TableRow className={headerRowClassName}>
            {onSelectionRender && onSelectionRender([...items].splice(group.startIndex, group.count))} 
            <TableCell colSpan={colSpan + 1} style={{ paddingLeft: padding + "px" }}>
                <Button
                    aria-label='Open Column Settings'
                    size='small'
                    appearance="transparent"
                    iconPosition={"before"}
                    icon={group.isCollapsed ? <GroupCollapsedIcon /> : <GroupExpandedIcon />}
                    onClick={() => toggleGroupExpand(group)}
                >
                    <Body1Stronger>{group.renderHeaderCell} :{` ${group.name}`}</Body1Stronger>
                </Button>
            </TableCell>
        </TableRow>
        {!group.isCollapsed && group?.children && group?.children?.length > 0 ?
            group?.children?.map((gChildren, i) => (
                <React.Fragment key={i}>
                    <GroupRenderer key={i}
                        items={items}
                        group={gChildren}
                        colSpan={colSpan}
                        onItemRender={onItemRender}
                        onSelectionRender={onSelectionRender}
                        toggleGroupExpand={toggleGroupExpand} />
                </React.Fragment>))
            :
            <>
                {group.isCollapsed ? <></> : onItemRender([...items].splice(group.startIndex, group.count))}
            </>
        }
    </>
}