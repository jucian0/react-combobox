import React from "react";
import { useComboboxState } from "./context";
import styles from "./styles.module.css";

export function Options({ children }: React.PropsWithChildren<any>) {
  const { state } = useComboboxState();

  return (
    <div className={styles.options_container} aria-hidden={!state.isOpened}>
      <ul id="container-listbox" role="listbox" className={styles.options_list}>
        {children}
      </ul>
    </div>
  );
}
