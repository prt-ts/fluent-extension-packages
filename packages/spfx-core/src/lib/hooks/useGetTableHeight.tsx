import { useDocumentDimensions } from "./useDocumentDimensions";

const DefaultHightOffset = 160;
export function useGetTableHeight(
  heightOffset: number = DefaultHightOffset,
  minHeight: number = 100,
  maxHeight: number = 9999
): string {
  const { height = 650 + heightOffset } = useDocumentDimensions();
  const tableHeight = Math.min(height - heightOffset, maxHeight);
  return `${Math.max(tableHeight, minHeight)}px`;
}
