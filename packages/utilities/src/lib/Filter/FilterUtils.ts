import { tryGetObjectValue } from "../Object";

export const onlyUnique = <T extends object>(value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
}

export function filterItemsByTerm<TITem extends object>(filedKeys: (keyof TITem)[], items: TITem[], searchTerm: string | number | Date) {
    if (searchTerm) {
        const filteredItems = items?.filter(function (item: TITem) {
            return filedKeys?.some(function (k: keyof TITem) {
                const fieldValue = tryGetObjectValue<TITem>(k, item) ?? '';
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
