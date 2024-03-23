/* eslint-disable  */
import { getSP } from "../pnp";

export type OptionType = {
  value: string;
  label: string;
};

export const ChoiceFieldService = () => {
  (async () => { })();

  const getChoiceFieldOptions = async (
    listName: string,
    fieldName: string
  ): Promise<OptionType[]> => {
    return new Promise<OptionType[]>(async (resolve, reject) => {
      try {
        const sp = await getSP();
        const field = await sp.web.lists
          .getByTitle(listName)
          .fields.getByTitle(fieldName)
          .select("Choices")();
        const choices = field.Choices;
        const options = (choices || []).map((choice) => {
          return {
            value: choice,
            label: choice,
          };
        });
        resolve(options);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getChoiceListOptions = async (
    listName: string,
    config: {
      valueField: string;
      labelField: string;
      additionalFields?: string[];
      expandListColumns?: string[];
      filterContext?: string;
    }
  ): Promise<OptionType[]> => {
    return new Promise<OptionType[]>(async (resolve, reject) => {
      try {
        const sp = await getSP();
        const listItems = await sp.web.lists
          .getByTitle(listName)
          .items.filter(config.filterContext || "")
          .expand(...(config.additionalFields || []))
          .select([config.valueField, config.labelField, ...(config.expandListColumns || [])]?.join(", "))();

        const options = listItems.map((choice) => {
          return {
            value: choice[config.valueField],
            label: choice[config.labelField],

            meta: {
              ...choice
            }
          };
        });
        resolve(options);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getChoiceFieldOptions,
    getChoiceListOptions,
  } as const;
};
