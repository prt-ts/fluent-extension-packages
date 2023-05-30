import {
    SearchRegular,
    SearchFilled,
    MoreVerticalRegular,
    MoreVerticalFilled,

    CodeTextOff16Filled, 
    CodeTextOff16Regular,

    ChevronRightRegular, 
    ChevronRightFilled, 

    ChevronDownRegular, 
    ChevronDownFilled, 

    ColumnEditRegular, 
    ColumnEditFilled,

    DragFilled, 
    DragRegular,

    bundleIcon
} from "@fluentui/react-icons"


export const SearchIcon = bundleIcon(SearchFilled, SearchRegular);
export const VerticalMoreIcon = bundleIcon(MoreVerticalFilled, MoreVerticalRegular);

export const ClearFilterIcon = bundleIcon(CodeTextOff16Filled, CodeTextOff16Regular);
export const ToggleColumnIcon = bundleIcon(ColumnEditFilled, ColumnEditRegular);

export const  GroupCollapsedIcon = bundleIcon(ChevronRightFilled, ChevronRightRegular);
export const  GroupExpandedIcon = bundleIcon(ChevronDownRegular, ChevronDownFilled);

export const DragIcon = bundleIcon(DragFilled, DragRegular);