import * as React from "react";
import { IGroup } from "../../types";
import { Caption1Stronger, TableCell, TableRow } from "@fluentui/react-components";

export const GroupRenderer = <TItem extends NonNullable<{ id: string | number }>,>({ items, group, colSpan, onItemRender }: React.PropsWithChildren<{
    items: TItem[],
    group: IGroup,
    colSpan: number,
    onItemRender: (items: TItem[]) => JSX.Element
}>) => {
    const padding = React.useMemo(() => group.level ? group.level * 20 : 0, [group]);

    return <>
        {group?.children && group?.children?.length > 0 ?
            group?.children?.map((gChildren, i) => (
                <React.Fragment key={i}>
                    <TableRow>
                        <TableCell colSpan={colSpan} style={{ paddingLeft: padding + "px" }}>
                            <Caption1Stronger>{group.renderHeaderCell} : {group.name}</Caption1Stronger>
                        </TableCell>
                    </TableRow>
                    <GroupRenderer key={i} items={items} group={gChildren} colSpan={colSpan} onItemRender={onItemRender} />
                </React.Fragment>))
            :
            <>
                <TableRow>
                    <TableCell colSpan={colSpan} style={{ paddingLeft: padding + "px" }}>
                        <Caption1Stronger>{group.renderHeaderCell} : {group.name}</Caption1Stronger>
                    </TableCell>
                </TableRow>
                {!group.isCollapsed ? <></> : onItemRender([...items].splice(group.startIndex, group.count))}
            </>
        }
    </>
}