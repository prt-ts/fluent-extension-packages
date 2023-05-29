import * as React from "react";
import { tryGetObjectValue } from "../components";
import { IColumn, IGroup } from "../types";

function getLeafGroupKey(key: string, separator: string): string {
  let leafKey = key;
  if (key.indexOf(separator) !== -1) {
    const arrKeys = key.split(separator);
    leafKey = arrKeys[arrKeys.length - 1];
  }
  return leafKey;
}

function getGroups<TItem extends { id: string | number }>(
  groupedItems: TItem[],
  field: string,
  isExpanded: boolean,
  parentGroup?: IGroup,
  columns?: IColumn<TItem>[]
): IGroup[] {
  const separator = "-";
  const groups = groupedItems.reduce(
    (current: IGroup[], item: TItem, index: number) => {
      const currentGroup = current[current.length - 1];
      const itemColumnValue = tryGetObjectValue(field, item) ?? "";

      if (
        !currentGroup ||
        getLeafGroupKey(currentGroup.key, separator) !== itemColumnValue
      ) {
        const col = columns?.find(c => c.columnId == field);
        current.push({
          key:
            (parentGroup ? parentGroup.key + separator : "") + itemColumnValue,
          name: `${itemColumnValue}`,
          renderHeaderCell: col?.renderHeaderCell(),
          startIndex: parentGroup ? parentGroup.startIndex + index : index,
          count: 1,
          level: parentGroup ? (parentGroup.level ? parentGroup.level + 1 : 1) : 0,
          isCollapsed: !isExpanded,
        });
      } else {
        currentGroup.count++;
      }
      return current;
    },
    [] as IGroup[]
  );

  return groups;
}

export function groupItems<TItem extends { id: string | number }>(
  sortedItems: TItem[],
  fields: string[],
  isExpanded: boolean,
  parentGroup?: IGroup,
  existingGroups?: IGroup[],
  columns?: IColumn<TItem>[]
): IGroup[] {
  if (fields.length) {
    //first calculate top level group
    const itemNeedGrouping = parentGroup ? [...sortedItems]?.splice(parentGroup.startIndex, parentGroup.count) : [...sortedItems];
    const groups: IGroup[] = getGroups(
      itemNeedGrouping,
      fields?.[0],
      isExpanded,
      parentGroup,
      columns
    )?.map(newGroup => {
      const existingGroup = existingGroups?.filter(x => x.key == newGroup.key)?.[0];
      return {
        ...newGroup,
        isCollapsed: existingGroup ? existingGroup.isCollapsed : newGroup.isCollapsed
      }
    });

    if (fields.length > 1) {
      for (const group of groups) {
        const existingGroup = existingGroups?.filter(x => x.key == group.key)?.[0];

        group.children = groupItems(
          [...sortedItems],
          [...fields]?.splice(1),
          isExpanded,
          group,
          existingGroup?.children,
          columns
        );
      }
    }
 
    return groups;
  }

  return [];
}

export function useTableGrouping<TItem extends NonNullable<{ id: string | number }>>(defaultGroupedColumns: string[], isGroupDefaultExpanded: boolean) {

  const [groupedColumns, setGroupedColumns] = React.useState<string[]>(defaultGroupedColumns);
  const [groups, setGroups] = React.useState<IGroup[]>([]);

  const calculateGroups = React.useCallback((allGroupedColumns: string[], items: TItem[], columns: IColumn<TItem>[]): IGroup[] => {

    if (allGroupedColumns?.length == 0) {
      //setGroups([])
    }

    const g = groupItems(items, allGroupedColumns, isGroupDefaultExpanded, undefined, groups, columns);
    //setGroups([...g])
    return [...g];

  }, [groups, isGroupDefaultExpanded]);

  const resetGroupColumns = React.useCallback((): void => setGroupedColumns([]), []);
  const toggleColumnGroup = React.useCallback((newColumnId: string, retainExisting = false): void => {
    setGroupedColumns((existing) => {
      const otherColumns = existing?.filter(e => !e?.includes(newColumnId))

      return retainExisting ? [newColumnId, ...otherColumns] : [newColumnId]
    });
  }, [groupedColumns]);

  const isColumnGrouped = React.useCallback((columnId: string) => groupedColumns?.some(sc => sc?.includes(columnId)), [groupedColumns]);

  /**
   * toggle group expand and collapse
   */
  const toggleExpand = React.useCallback((checkGroups: IGroup[], current: IGroup) => {

    const newGroup = checkGroups?.map((group) => {
      if (current?.key == group?.key) {
        return {
          ...group,
          isCollapsed: !group.isCollapsed,
        };
      }

      if (!group?.isCollapsed && group?.children?.length) {
        group.children = toggleExpand(group.children, current);
      }

      return group;
    });

    return newGroup;

  }, [])
  const toggleGroupExpand = React.useCallback((currentGroup: IGroup) => {

    const newGroup = toggleExpand(groups, currentGroup); 
    setGroups([...newGroup])

  }, [groups])

  const isAllCollapsedHandler = React.useCallback((allGroups: IGroup[]): boolean => {
    return allGroups?.every(g => g.isCollapsed);
  }, [])

  const isAllCollapsed = React.useMemo((): boolean => {
    return isAllCollapsedHandler(groups);
  }, [groups])

  const toggleAllGroupExpandHandler = React.useCallback((groups: IGroup[] | undefined, isCollapse: boolean): IGroup[] => {
    
    if (!groups) return [];

    const newGroup = [...groups]?.map(g => {
      const newChildren = (g && g.children && g.children?.length > 0)
        ? toggleAllGroupExpandHandler(g.children, isCollapse)
        : []
      return {
        ...g,
        isCollapsed: isCollapse,
        children: newChildren
      }
    })

    return newGroup;
  }, [])

  const toggleAllGroupExpand = React.useCallback((isAllCollapsed: boolean) => { 
    const newGroup = toggleAllGroupExpandHandler(groups, !isAllCollapsed);
    setGroups([...newGroup])

  }, [groups])


  return {
    groupedColumns,
    groups,
    setGroups,

    isAllCollapsed,

    calculateGroups,
    resetGroupColumns,
    toggleColumnGroup,
    isColumnGrouped,

    toggleGroupExpand,
    toggleAllGroupExpand
  } as const;
}