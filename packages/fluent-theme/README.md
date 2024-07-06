# ThemeService

The ThemeService is a utility service designed to manage and apply themes across the application. It provides a set of methods to dynamically change the theme based on user preferences or system settings. The service is particularly useful for applications that support dark mode or need to switch themes dynamically.

## Usage

To use the ThemeService, you first need to import it into your component or service where you intend to manage themes.

```tsx
import { ThemeService } from '@prt-ts/fluent-theme';
```

Once imported, you can access its methods to get or set the theme. The primary method available is `getTheme`, which retrieves the theme based on the provided criteria.

## Methods

### getTheme

`getTheme(primaryColor: string, isInverted?: boolean, scale?: number, config?: ThemeConfig): Promise<Theme>`

- Retrieves the theme based on the provided primary color. The method returns a promise that resolves to the theme object. This allows for asynchronous theme loading, which can be useful when themes are fetched from an external source or require some processing.

#### Parameters

The `getTheme` function is designed to dynamically generate or retrieve a theme based on the provided parameters. It returns a Promise that resolves to a Theme object. Here's a breakdown of its parameters:

1.  `primaryColor`: string

    - **Description**: This parameter specifies the primary color of the theme. The primary color is typically used as the main color for UI elements such as buttons, links, and active states. It should be provided as a string, usually in a color code format (e.g., HEX, RGB).
    - **Required**: Yes

2.  `isInverted`?: boolean

    - **Description**: This optional parameter indicates whether the theme should be inverted. An inverted theme usually means swapping background and foreground colors to achieve a high contrast, often used for dark mode themes.
    - **Required**: No
    - **Default Value**: If not provided, the function might default to false, implying a standard (non-inverted) theme.

3.  scale?: number

    - **Description**: This optional parameter allows for scaling the size of UI components within the theme. It could be used to increase or decrease the size of text, buttons, and other elements based on a scaling factor. This is useful for accessibility purposes or to adapt the UI to different screen sizes.
    - **Required**: No
    - **Default Value**: If not specified, the function might use a default scale factor (e.g., 1), which means no scaling is applied.

4.  config?: ThemeConfig

    - **Description**: This optional parameter allows for further customization of the theme through a ThemeConfig object. The ThemeConfig object could include additional settings such as font family, secondary colors, border styles, or any other design tokens relevant to the theme.
    - **Required**: No
    - **Default Value**: If not provided, the function might use a set of default configurations or the base theme settings.

## Returns

A promise that resolves to a `Theme` object. The `Theme` object contains all the necessary information and styles to apply the theme to the application.

## Example

Below is an example of how to use the `getTheme` method within a React component to dynamically set the application's theme based on a user-selected color scheme.

```tsx
import React, { useEffect, useState } from 'react';
import { ThemeService } from '@prt-ts/fluent-theme';

const { getTheme } = ThemeService();
export function useAppTheme() {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    getTheme('#00AFED').then((theme) => {
      setTheme(theme);
    });
  }, []);
  return { theme };
}
```

In this example, `useAppTheme` is a custom hook that uses the `getTheme` method to asynchronously fetch and apply a theme based on the color code `#00AFED`.

## Conclusion

The ThemeService is a powerful utility for managing themes in a web application using fluent design system. It provides flexibility and ease of use for developers to dynamically change themes based on user preferences or other criteria.
