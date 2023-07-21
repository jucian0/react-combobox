import React from "react";
import {
  ComboboxContextStateType,
  ComboboxContextType,
  ComboboxProviderProps,
} from "./types";
import { findOptionByValue } from "./utils";

export const ComboboxContext = React.createContext({} as ComboboxContextType);

export function comboboxReducer(
  state: ComboboxContextStateType,
  action: Partial<ComboboxContextStateType>
) {
  return {
    ...state,
    ...action,
  };
}

export function ComboboxProvider(
  props: React.PropsWithChildren<ComboboxProviderProps>
) {
  const initialInputValue = findOptionByValue(
    props.options ?? [],
    props.value ?? ""
  );

  const [state, setState] = React.useReducer(comboboxReducer, {
    options: props.options ?? [],
    filteredOptions: props.options ?? [],
    value: props.value ?? "",
    inputValue: initialInputValue?.label ?? "",
    isOpened: false,
    focusedIndex: -1,
  });

  const previousValue = React.useRef(state.value);
  React.useEffect(() => {
    if (previousValue.current !== state.value) {
      previousValue.current = state.value;
      props.onChange?.(state.value);
    }
  }, [state.value]);

  return (
    <ComboboxContext.Provider value={{ state, setState }}>
      {props.children}
    </ComboboxContext.Provider>
  );
}

export function useComboboxState() {
  return React.useContext(ComboboxContext);
}
