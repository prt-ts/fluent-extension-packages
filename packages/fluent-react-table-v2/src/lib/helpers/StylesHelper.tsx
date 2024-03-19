import { tokens } from "@fluentui/react-components"
import { Column, RowData } from "@tanstack/react-table"
import { CSSProperties } from "react"

export const getHeaderCellPinningStyles = <TItem extends RowData>(column: Column<TItem, unknown>, isDragging: boolean, additionalStyles : CSSProperties): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')

  const styles: CSSProperties = {
    width : column.getSize(),
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isDragging? 0.8: (isPinned ? 0.95 : 1),
    position: isPinned ? 'sticky' : 'relative',
    
    zIndex: isDragging ? 10 : (isPinned ? 9 : 1),
    backgroundColor: tokens.colorNeutralCardBackgroundSelected,
    whiteSpace: 'wrap',
    ...additionalStyles
  }
  return styles;
}

export const getBodyCellPinningStyles = <TItem extends RowData>(column: Column<TItem, unknown>, isDragging: boolean, additionalStyles : CSSProperties): CSSProperties => {
  const isPinned = column.getIsPinned(); 
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')

  const styles: CSSProperties = {
    width: column.getSize(),
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    
    opacity: isDragging ? 0.85: (isPinned ? 0.95 : 1),
    zIndex: isDragging? 2 : (isPinned ? 1 : 0),
    ...additionalStyles
  }
  return styles;
}