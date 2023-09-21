import { tryGetObjectValue } from "../Object";

export const onlyUnique = <T>(value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
}

export function filterItemsByTerm<TITem>(filedKeys: (string | number)[], items: TITem[], searchTerm: string | number | Date) {
    if (searchTerm) {
        const filteredItems = items?.filter(function (item: TITem) {
            return filedKeys?.some(function (k: string | number) {
                const fieldValue = tryGetObjectValue(k as string, item)
                return (
                    fieldValue
                        ?.toString()
                        ?.toLowerCase()
                        ?.indexOf(`${searchTerm}`?.toLocaleLowerCase()) > -1
                );
            });
        });

        // return shallow copy of array
        return filteredItems?.splice(0);
    }

    return items;
}
