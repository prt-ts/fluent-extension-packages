
/* eslint-disable @typescript-eslint/no-explicit-any */
export function tryGetObjectValue(fieldName: string | undefined, item: any) {
    if (!fieldName)
        return item;

    let prop = "";
    const props = fieldName.split('.');

    let i = 0;
    while (i < props.length - 1) {
        prop = props[i];

        const candidate = item?.[prop];
        if (candidate !== undefined) {
            item = candidate;
        } else {
            break;
        }
        i++;
    }

    return item[props[i]];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const tryGetListValue = (fieldName: string, items: any[] | never[] | undefined): any[] | never[] | undefined => {
    if (!fieldName)
        return items;

    return items?.map(item => tryGetObjectValue(fieldName, item))
}
