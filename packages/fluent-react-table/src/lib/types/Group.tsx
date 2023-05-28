import { ReactNode } from "react";

export type IGroup = {
    /**
    * Unique identifier for the group.
    */
    key: string;
    /**
     * Display name for the group, rendered on the header.
     */
    name: string;

    renderHeaderCell: ReactNode

    /**
     * Start index for the group within the given items.
     */
    startIndex: number;
    /**
     * How many items should be rendered within the group.
     */
    count: number;
    /**
     * Nested groups, if any.
     */
    children?: IGroup[];
    /**
     * Number indicating the level of nested groups.
     */
    level?: number;
   
    /**
     * If all the items in the group are collapsed.
     */
    isCollapsed?: boolean;
    /**
     * If the items within the group are summarized or showing all.
     */
    isShowingAll?: boolean; 
}