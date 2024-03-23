/* eslint-disable */
/**
 * debounceAsync(func, [wait=0], [options={}])
 *
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading edge of the timeout.
 * @param {cancelObj} [options.cancelObj='canceled'] Specify the error object to be rejected.
 * @returns {Function} Returns the new debounced function.
 */
export function debounceAsync<T, TFuncParams extends any[]>(
  callback: (...args: TFuncParams) => Promise<T>,
  wait = 0,
  { leading = false, cancelObj = 'canceled' } = {}
) {
  let timerId, latestResolve, shouldCancel;

  return function (...args: TFuncParams) {
    try {
      if (!latestResolve) {
        // The first call since last invocation.
        return new Promise<T>((resolve, reject) => {
          latestResolve = resolve;
          if (leading) {
            invokeAtLeading.apply(this, [args, resolve, reject]);
          } else {
            timerId = setTimeout(
              invokeAtTrailing.bind(this, args, resolve, reject),
              wait
            );
          }
        });
      }

      shouldCancel = true;
      return new Promise<T>((resolve, reject) => {
        latestResolve = resolve;
        timerId = setTimeout(
          invokeAtTrailing.bind(this, args, resolve, reject),
          wait
        );
      });
    } catch (e) {
      console.error(e);
      return;
    }
  };

  function invokeAtLeading(args, resolve, reject) {
    callback.apply(this, args).then(resolve).catch(reject);
    shouldCancel = false;
  }

  function invokeAtTrailing(args, resolve, reject) {
    if (shouldCancel && resolve !== latestResolve) {
      reject(cancelObj);
    } else {
      callback.apply(this, args).then(resolve).catch(reject);
      shouldCancel = false;
      clearTimeout(timerId);
      timerId = latestResolve = null;
    }
  }
}
