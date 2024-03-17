
export function tryGetObjectValue<TItem extends object>(fieldName: keyof TItem, item: TItem) {
    if (!fieldName)
        return item;

    let prop : keyof TItem;
    const props = String(fieldName).split('.');

    let i = 0;
    while (i < props.length - 1) {
        prop = props[i] as keyof TItem;

        const candidate = item?.[prop];
        if (candidate !== undefined) {
            item = candidate as TItem;
        } else {
            break;
        }
        i++;
    }

    return item[props[i] as keyof TItem];
}

export const tryGetListValue = <TItem extends object>(fieldName: keyof TItem, items: TItem[] | never[] | undefined) => {
    if (!fieldName)
        return items;

    return items?.map(item => tryGetObjectValue(fieldName, item))
}
