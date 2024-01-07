import * as React from "react";
import type { ReactNode } from "react";

type ForProps<TItem> = {
    each: TItem[] | undefined | null;
    children: (item: TItem, index: number) => ReactNode;
    emptyState?: JSX.Element | string | null;
}

export const For = <TItem extends object>(props: ForProps<TItem>): JSX.Element | null => {
    const { each = [], children, emptyState = null } = props;

    const shouldLoop = React.useMemo(() => each && Array.isArray(each) && each.length > 0, [each]);
    if (!shouldLoop) {
        return emptyState as JSX.Element || null;
    }

    return (
        <>
            {(each || []).map((item, index) => children(item, index))}
        </>
    );
};