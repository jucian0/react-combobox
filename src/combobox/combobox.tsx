import React from "react";
import { ComboboxProps } from "./types";
import styles from "./styles.module.css";
import { ComboboxProvider, useComboboxState } from "./context";
import { Options } from "./options";
import { filterOptionByLabel } from "./utils";

function Fieldset(props: ComboboxProps) {
  const fieldsetRef = React.useRef<HTMLFieldSetElement>(null);
  const { state, setState } = useComboboxState();
  const { label, id = React.useId() } = props;

  function handleToggleOptions() {
    setState({ isOpened: !state.isOpened });
  }

  /**
   *
   * @param event React.ChangeEvent<HTMLInputElement>
   * Handle input change and filter options
   *
   */
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState({ inputValue: event.target.value });

    const filteredOptions = filterOptionByLabel(
      props.options ?? [],
      event.target.value
    );

    if (filteredOptions.length === 0) {
      if (props.asyncOptions) {
        props.asyncOptions(event.target.value).then((options) => {
          if (options.length === 0) {
            setState({ filteredOptions });
          } else {
            setState({ filteredOptions: options, options, isOpened: true });
          }
        });
      } else {
        setState({ filteredOptions: state.options });
      }
      setState({ isOpened: false });
    } else {
      setState({ isOpened: true, filteredOptions });
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (fieldsetRef.current?.contains(e.target as Node)) {
      return;
    }
    setState({ isOpened: false });
    document.removeEventListener("mousedown", handleClickOutside);
  }

  function handleArrowUpArowDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      const focusedIndex =
        state.focusedIndex < state.filteredOptions.length - 1
          ? state.focusedIndex + 1
          : state.focusedIndex;

      setState({ focusedIndex });
    }

    if (event.key === "ArrowUp") {
      const focusedIndex = state.focusedIndex > 0 ? state.focusedIndex - 1 : 0;
      setState({ focusedIndex });
    }

    if (event.key === "Escape") {
      setState({ isOpened: false });
    }
  }

  React.useEffect(() => {
    if (state.isOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    if (!state.isOpened) {
      setState({ filteredOptions: state.options });
    }
  }, [state.isOpened]);

  return (
    <fieldset
      className={styles.fieldset}
      ref={fieldsetRef}
      onKeyDown={handleArrowUpArowDown}
    >
      <label htmlFor={id}>{label}</label>
      <div className={styles.display}>
        <input
          className={styles.input}
          type="text"
          id={id}
          onChange={handleInputChange}
          value={state.inputValue}
          role="combobox"
          aria-expanded={state.isOpened}
          aria-autocomplete="list"
          aria-activedescendant={state.value}
          disabled={props.disabled}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          autoComplete="off"
          aria-haspopup="listbox"
          aria-controls="container-listbox"
        />
        <button
          tabIndex={-1}
          className={styles.arrow}
          data-opened={state.isOpened}
          onClick={handleToggleOptions}
        >
          ▲
        </button>
      </div>
      <Options>{props.children?.(state.filteredOptions)}</Options>
    </fieldset>
  );
}

export function Combobox(props: ComboboxProps) {
  return (
    <ComboboxProvider {...props}>
      <Fieldset {...props} />
    </ComboboxProvider>
  );
}
