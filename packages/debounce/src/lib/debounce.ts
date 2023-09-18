export const debounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number
) => {
  const timeout = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
