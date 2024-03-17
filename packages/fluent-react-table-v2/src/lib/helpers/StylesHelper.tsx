import { tokens } from "@fluentui/react-components"
import { Column, RowData } from "@tanstack/react-table"
import { CSSProperties } from "react"

export const getCommonPinningStyles = <TItem extends RowData>(column: Column<TItem, unknown>, isHeader: boolean, isSelected = false): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  const styles: CSSProperties = {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? isHeader ? 99 : 1 : 0,

  }

  if(isSelected){
    styles["backgroundColor"] = tokens.colorBrandBackground2
  }
  else if (isPinned && isHeader) {
    styles["backgroundColor"] = tokens.colorNeutralStrokeSubtle
  }
  else if (isPinned && !isHeader){
    styles["backgroundColor"] = tokens.colorNeutralBackground1Hover
  }  

  return styles;
}