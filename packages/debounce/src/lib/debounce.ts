/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: NodeJS.Timeout | null = null;

  const debouncedFn = (...args: Parameters<F>): ReturnType<F> | undefined => {
    let result: ReturnType<F> | undefined;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      result = func(...args);
    }, waitFor);
    return result;
  };

  return debouncedFn;
};