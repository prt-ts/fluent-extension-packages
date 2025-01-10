# Debounce Async

The `debounceAsync` function is designed to manage the execution of an asynchronous function, ensuring that it is not called more frequently than a specified interval. This is particularly useful in scenarios where a function might be triggered often, but you wish to limit the actual number of executions to avoid performance issues or excessive API calls.

## Overview

debounceAsync takes an asynchronous callback function and returns a new debounced version of the callback. This debounced function delays the execution of the callback until after a specified wait time has elapsed since the last time the debounced function was invoked. If the debounced function is invoked again before the wait time has elapsed, the previous invocation is canceled, and the timer is reset.

## Parameters

- `callback: (...args: TFuncParams) => Promise<T>`
  - The asynchronous function to debounce. It must return a Promise.
- wait: number = 0
  - The number of milliseconds to delay the function call. Defaults to 0.
  - options: Object = {}
    - An optional options object to customize the behavior of the debounced function.
    - `leading: boolean = false`
      - When true, the callback is invoked on the leading edge of the timeout instead of the trailing edge. Defaults to false.
    - `cancelObj: any = 'canceled'`
      - Specifies the error object to be rejected if the debounced function is canceled before execution.

## Returns

- Function
  - Returns a new debounced version of the provided asynchronous function. This function returns a Promise that resolves with the result of the callback function, or rejects with the specified cancelObj if the invocation is canceled before execution.

## Usage

The `debounceAsync` function is particularly useful in scenarios such as search inputs where you might want to wait for the user to stop typing before making an API call to fetch search results. By using `debounceAsync`, you can ensure that the API call is made only after a certain period of inactivity, rather than on every keystroke.

## Example

```ts
async function fetchSearchResults(query: string): Promise<any> {
  // Simulate an API call
  return new Promise((resolve) => setTimeout(() => resolve(`Results for ${query}`), 500));
}

const debouncedFetch = debounceAsync(fetchSearchResults, 300);

// Usage
debouncedFetch('hello').then(console.log).catch(console.error);
```

In this example, `fetchSearchResults` is an asynchronous function that fetches search results. The `debounceAsync` function is used to create a debounced version of `fetchSearchResults` with a 300ms delay. This means that if `debouncedFetch` is called multiple times within 300ms, only the last call will actually invoke `fetchSearchResults`.

## Conclusion

The `debounceAsync` function is a powerful tool for optimizing the performance of applications, especially in scenarios involving user input or other high-frequency events. By delaying execution until a period of inactivity, it helps to reduce unnecessary work and can significantly improve the user experience.
