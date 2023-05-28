import * as React from "react";
import { IGroup } from "../../types";
import { Subtitle2Stronger, TableCell, TableRow } from "@fluentui/react-components";

export const GroupRenderer = <TItem extends NonNullable<{ id: string | number }>,>({ items, group, colSpan, onItemRender, headerRowClassName }: React.PropsWithChildren<{
    items: TItem[],
    group: IGroup,
    colSpan: number,
    onItemRender: (items: TItem[]) => JSX.Element,
    headerRowClassName?: string
}>) => {
    const padding = React.useMemo(() => group.level ? group.level * 20 : 0, [group]);

    return <>
        <TableRow className={headerRowClassName}>
            <TableCell colSpan={colSpan} style={{ paddingLeft: padding + "px" }} className={headerRowClassName}>
                <Subtitle2Stronger>{group.renderHeaderCell} : {group.name}</Subtitle2Stronger>
            </TableCell>
        </TableRow>
        {group?.children && group?.children?.length > 0 ?
            group?.children?.map((gChildren, i) => (
                <React.Fragment key={i}>
                    {gChildren.isCollapsed ? <></> : <GroupRenderer key={i} items={items} group={gChildren} colSpan={colSpan} onItemRender={onItemRender} />}
                </React.Fragment>))
            :
            <>
                {group.isCollapsed ? <></> : onItemRender([...items].splice(group.startIndex, group.count))}
            </>
        }
    </>
}