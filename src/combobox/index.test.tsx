import { describe, it, expect, vitest } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Combobox, Option } from "./";

const mockedOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
  { label: "Option 5", value: "5", disabled: true },
  { label: "Option 6", value: "6" },
];

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
    const combobox = getByLabelText("Combobox");
    expect(combobox).toHaveProperty("value", "Option 1");
  });

  it("should render with corret disabled", () => {
    const { getByLabelText } = render(
      <Combobox label="Combobox" value="1" disabled />
    );
    const combobox = getByLabelText("Combobox");
    expect(combobox).toHaveProperty("disabled", true);
  });

  it("should render with corret readOnly", () => {
    const { getByLabelText } = render(
      <Combobox label="Combobox" value="1" readOnly />
    );
    const combobox = getByLabelText("Combobox");
    expect(combobox).toHaveProperty("readOnly", true);
  });

  it("should render with corret placeholder", () => {
    const { getByLabelText } = render(
      <Combobox label="Combobox" value="1" placeholder="Placeholder" />
    );
    const combobox = getByLabelText("Combobox");
    expect(combobox).toHaveProperty("placeholder", "Placeholder");
  });

  it("should render with corret options", () => {
    const { getByRole } = render(
      <Combobox label="Combobox" value="1" options={mockedOptions}>
        {(opts) =>
          opts.map((option) => (
            <Option key={option.value} {...option}>
              {option.label}
            </Option>
          ))
        }
      </Combobox>
    );
    const combobox = getByRole("button");
    fireEvent.click(combobox);

    const options = getByRole("listbox");
    expect(options).toBeTruthy();

    const optionsItems = options.querySelectorAll("li");
    expect(optionsItems).toHaveLength(mockedOptions.length);
  });
});

describe("Combobox sync tests", () => {
  // using to simulate scroll by ArrowDown and ArrowUp
  window.HTMLElement.prototype.scrollIntoView = function () {};

  it("should call onchange callback whennever an option is selected", () => {
    const callback = vitest.fn();
    const { getByLabelText, getByTestId } = render(
      <Combobox label="Combobox" onChange={callback} options={mockedOptions}>
        {(opts) =>
          opts.map((option) => (
            <Option key={option.value} {...option}>
              {option.label}
            </Option>
          ))
        }
      </Combobox>
    );

    const combobox = getByLabelText("Combobox");
    fireEvent.click(combobox);

    const option2 = getByTestId("2");

    fireEvent.click(option2);
    expect(getByLabelText("Combobox")).toHaveProperty("value", "Option 2");

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call callback when option is disabled", () => {
    const callback = vitest.fn();
    const { getByLabelText, getByTestId } = render(
      <Combobox
        label="Combobox"
        onChange={callback}
        options={mockedOptions}
        disabled
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

    const combobox = getByLabelText("Combobox");
    fireEvent.click(combobox);
    const disabledOption = mockedOptions.find((option) => option.disabled);
    const disabledElement = getByTestId(disabledOption!.value);
    fireEvent.click(disabledElement);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

describe("Combobox async tests", () => {
  it("should call onchange callback whennever an option is selected", async () => {
    const callback = vitest.fn();
    const asyncOptions = vitest
      .fn()
      .mockResolvedValue(Promise.resolve(mockedOptions));
    const { getByLabelText, getByTestId } = render(
      <Combobox
        label="Combobox"
        onChange={callback}
        asyncOptions={asyncOptions}
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

    const combobox = getByLabelText("Combobox");
    fireEvent.change(combobox, { target: { value: "1" } });

    expect(asyncOptions).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      const option2 = getByTestId("2");
      fireEvent.click(option2);
      expect(getByLabelText("Combobox")).toHaveProperty("value", "Option 2");

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it("should not call twice onchange callback when an option already exists in the cache", async () => {
    const callback = vitest.fn();
    const asyncOptions = vitest
      .fn()
      .mockResolvedValue(Promise.resolve(mockedOptions));
    const { getByLabelText, getByTestId } = render(
      <Combobox
        label="Combobox"
        onChange={callback}
        asyncOptions={asyncOptions}
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

    const combobox = getByLabelText("Combobox");
    fireEvent.change(combobox, { target: { value: "o" } });
    fireEvent.blur(combobox);

    await waitFor(() => {
      const option2 = getByTestId("2");
      fireEvent.click(option2);
      fireEvent.change(combobox, { target: { value: "option 1" } });
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
