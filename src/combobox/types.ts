export interface ComboboxProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "onChange" | "children"
  > {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: OptionType[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  asyncOptions?: (value: string) => Promise<OptionType[]>;
  children?: (options: OptionType[]) => React.ReactNode[];
}

export type OptionType = {
  label: string;
  value: string;
  disabled?: boolean;
  args?: any;
};

export type ComboboxContextStateType = {
  value: string;
  options: OptionType[];
  filteredOptions: OptionType[];
  inputValue: string;
  isOpened: boolean;
  focusedIndex: number;
};

export type ComboboxContextType = {
  state: ComboboxContextStateType;
  setState: React.Dispatch<Partial<ComboboxContextStateType>>;
};

export interface ComboboxProviderProps extends Omit<ComboboxProps, "children"> {
  children: React.ReactNode;
}
