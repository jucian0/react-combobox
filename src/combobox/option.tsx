import React from "react";
import { useComboboxState } from "./context";
import styles from "./styles.module.css";

interface OptionProps {
  label?: string;
  value: string;
  disabled?: boolean;
}

export function Option(props: React.PropsWithChildren<OptionProps>) {
  const { setState, state } = useComboboxState();
  const computedLabel = props.label ?? props.children?.toString();
  const ref = React.useRef<HTMLLIElement>(null);

  const isSelected = state.value === props.value;
  const isFocused =
    state.focusedIndex ===
    state.filteredOptions.findIndex((option) => option.value === props.value);

  function changeState(value: string) {
    setState({
      isOpened: false,
      value,
      inputValue: computedLabel,
    });
  }
  function handleClick() {
    changeState(props.value);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      return changeState(props.value);
    }
  }

  React.useEffect(() => {
    if (ref.current && isFocused && state.isOpened) {
      ref.current.focus();

      ref.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [ref, isFocused, state.isOpened]);

  return (
    <li
      ref={ref}
      role="option"
      tabIndex={0}
      onClick={handleClick}
      key={props.value}
      className={styles.options_item}
      onKeyDown={handleKeyDown}
      aria-selected={isSelected}
      aria-disabled={props.disabled}
      data-focused={isFocused}
      id={props.value}
    >
      {computedLabel}
    </li>
  );
}
