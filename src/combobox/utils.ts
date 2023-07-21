import { OptionType } from "./types";

export function findOptionByValue(options: OptionType[], value: string) {
  return options.find((option) => option.value === value);
}

export function filterOptionByLabel(options: OptionType[], label: string) {
  return options.filter((option) =>
    option.label.toLowerCase().includes(label.toLowerCase())
  );
}
