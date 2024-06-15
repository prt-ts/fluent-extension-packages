import {
  useDocumentDimensions,
  useGetElementDimensions,
} from './useDocumentDimensions';

const DefaultHightOffset = 160;
const DefaultMinHeight = 100;
const DefaultMaxHeight = 9999;
const DefaultHeightUnit = 'px';
export function useGetTableHeight(
  heightOffset: number = DefaultHightOffset,
  minHeight: number = DefaultMinHeight,
  maxHeight: number = DefaultMaxHeight,
  unit: string = DefaultHeightUnit
): string {
  const { height = 650 + heightOffset } = useDocumentDimensions();
  const tableHeight = Math.min(height - heightOffset, maxHeight);
  return `${Math.max(tableHeight, minHeight)}${unit}`;
}

export function useGetDocumentHeight(
  element: HTMLElement | null,
  heightOffset: number = DefaultHightOffset,
  minHeight: number = DefaultMinHeight,
  maxHeight: number = DefaultMaxHeight,
  unit: string = DefaultHeightUnit
): string {
  const { height = 650 + heightOffset } = useGetElementDimensions(element);
  const documentHeight = Math.min(height - heightOffset, maxHeight);
  return `${Math.max(documentHeight, minHeight)}${unit}`;
}
