import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Combobox, Option } from "./";

describe("Combobox properties tests", () => {
  it("should render with corret label", () => {
    const { getByLabelText } = render(<Combobox label="Combobox" />);
    expect(getByLabelText("Combobox")).toBeTruthy();
  });

  it("should render with corret value", () => {
    const { getByLabelText } = render(
      <Combobox
        label="Combobox"
        value="1"
        options={[{ label: "Option 1", value: "1" }]}
      />
    );
    const checkbox = getByLabelText("Combobox");
    expect(checkbox).toHaveProperty("value", "Option 1");
  });

  it("should render with corret disabled", () => {
    const { getByLabelText } = render(
      <Combobox label="Combobox" value="1" disabled />
    );
    const checkbox = getByLabelText("Combobox");
    expect(checkbox).toHaveProperty("disabled", true);
  });

  it("should render with corret readOnly", () => {
    const { getByLabelText } = render(
      <Combobox label="Combobox" value="1" readOnly />
    );
    const checkbox = getByLabelText("Combobox");
    expect(checkbox).toHaveProperty("readOnly", true);
  });

  it("should render with corret placeholder", () => {
    const { getByLabelText } = render(
      <Combobox label="Combobox" value="1" placeholder="Placeholder" />
    );
    const checkbox = getByLabelText("Combobox");
    expect(checkbox).toHaveProperty("placeholder", "Placeholder");
  });

  it("should render with corret options", () => {
    const { getByRole } = render(
      <Combobox
        label="Combobox"
        value="1"
        options={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
          { label: "Option 3", value: "3" },
          { label: "Option 4", value: "4" },
        ]}
      >
        {(opts) =>
          opts.map((option) => (
            <Option key={option.value} {...option}>
              {option.label}
            </Option>
          ))
        }
      </Combobox>
    );
    const checkbox = getByRole("button");
    fireEvent.click(checkbox);

    const options = getByRole("listbox");
    expect(options).toBeTruthy();

    const optionsItems = options.querySelectorAll("li");
    expect(optionsItems).toHaveLength(4);
  });
});
