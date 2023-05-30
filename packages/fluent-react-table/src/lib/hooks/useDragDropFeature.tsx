import * as React from "react";

export function useDragDropFeature<TItem>(items: TItem[], onOrderChange: (items: TItem[]) => void) {

    const dragItemRef = React.useRef<number | null>(null);
    const dragOverItemRef = React.useRef<number | null>(null);

    const dragStart = (_: React.DragEvent, position: number) => dragItemRef.current = position;
    const dragEnter = (_: React.DragEvent, position: number) => dragOverItemRef.current = position;

    const drop = (_: React.DragEvent) => {
        const copyListItems = [...items];
        const dragItemContent = copyListItems[dragItemRef.current!];
        copyListItems.splice(dragItemRef.current!, 1);
        copyListItems.splice(dragOverItemRef.current!, 0, dragItemContent);
        dragItemRef.current = null;
        dragOverItemRef.current = null;
        onOrderChange(copyListItems);
    };

    return {
        dragStart,
        dragEnter,
        drop
    } as const;
}