export function extract<T>(properties: Record<keyof T, true>) {
  return function <TActual extends T>(value: TActual): T {
    const result = {} as T;
    for (const property of Object.keys(properties) as Array<keyof T>) {
      result[property] = value[property];
    }
    return result;
  };
}
