import { FilterRegular } from "@fluentui/react-icons";
import { FilterFilled } from "@fluentui/react-icons";
import {
  SearchRegular,
  SearchFilled,
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
  bundleIcon,
  GroupFilled,
  GroupRegular,
  SaveFilled,
  SaveRegular,
  TableSimpleCheckmarkRegular,
  TableSimpleCheckmarkFilled,
} from "@fluentui/react-icons";

export const SaveIcon = bundleIcon(SaveFilled, SaveRegular);

export const ChangeViewIcon = bundleIcon(
  TableSimpleCheckmarkFilled,
  TableSimpleCheckmarkRegular
);

export const SearchIcon = bundleIcon(SearchFilled, SearchRegular);
export const VerticalMoreIcon = bundleIcon(FilterFilled, FilterRegular);

export const ClearFilterIcon = bundleIcon(
  CodeTextOff16Filled,
  CodeTextOff16Regular
);
export const ToggleSelectColumnIcon = bundleIcon(
  ColumnEditFilled,
  ColumnEditRegular
);
export const ToggleGroupColumnIcon = bundleIcon(GroupFilled, GroupRegular);

export const GroupCollapsedIcon = bundleIcon(
  ChevronRightFilled,
  ChevronRightRegular
);
export const GroupExpandedIcon = bundleIcon(
  ChevronDownRegular,
  ChevronDownFilled
);

export const DragIcon = bundleIcon(DragFilled, DragRegular);
