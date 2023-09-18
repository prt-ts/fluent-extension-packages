/* eslint-disable */
import { BrandVariants, Theme, createDarkTheme, createLightTheme } from "@fluentui/react-components";
import { CustomAttributes, BrantTokenOptions } from "./Types";
import { hexColorsFromPalette, hex_to_LCH } from "./helpers/paletters";
import { Palette } from "./helpers/types";

const PIXELS_TO_REM = 0.0625;

export const ThemeService = () => {
  (async () => {})();

  async function getTheme(primaryColor: string, isInverted: boolean = false, scale : number = 1): Promise<Theme> {
    return new Promise<Theme>(async (resolve, reject) => {
      try {
        console.log(primaryColor, isInverted, scale)
        const brandVariants = createCustomTheme({
          keyColor: primaryColor,
          hueTorsion: 0,
          vibrancy: 0,
        });
        const baseTheme: Theme = isInverted ? createDarkTheme(brandVariants) : createLightTheme(brandVariants);
        resolve(getThemeConvertedToREMScale(baseTheme, scale));
      } catch (error) {
        reject(error);
      }
    });
  }

  const convertPixesToREM = (pixels: number, scale: number) => (PIXELS_TO_REM * pixels * scale) + "rem";
  const getThemeConvertedToREMScale = (theme: Theme, scale : number) : Theme => {
    const convertedTheme : Theme = { ...theme };

    Object.keys(theme).forEach((key) => {
      const value = `${convertedTheme[key]}`;
      if (value?.includes("px") && !isNaN(Number(value.replace("px", "")))) {
        convertedTheme[key] = convertPixesToREM(
          Number(convertedTheme[key].replace("px", "")), scale
        );
      }
    });
    return convertedTheme;
  };

  const createCustomTheme = ({
    hueTorsion,
    keyColor,
    vibrancy,
  }: CustomAttributes): BrandVariants => {
    return getBrandTokensFromPalette(keyColor, {
      hueTorsion,
      darkCp: vibrancy,
      lightCp: vibrancy,
    });
  };

  const getBrandTokensFromPalette = (
    keyColor: string,
    options: BrantTokenOptions = {}
  ) => {
    const { darkCp = 2 / 3, lightCp = 1 / 3, hueTorsion = 0 } = options;
    const brandPalette: Palette = {
      keyColor: hex_to_LCH(keyColor),
      darkCp,
      lightCp,
      hueTorsion,
    };
    const hexColors = hexColorsFromPalette(keyColor, brandPalette, 16, 1);
    return hexColors.reduce((acc: Record<string, string>, hexColor, h) => {
      acc[`${(h + 1) * 10}`] = hexColor;
      return acc;
    }, {}) as BrandVariants;
  };

  return {
    getTheme,
  };
};
