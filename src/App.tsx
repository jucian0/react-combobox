import { Combobox, Option } from "./combobox";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
  { label: "Option 5", value: "5", disabled: true },
  { label: "Option 6", value: "6" },
  { label: "Option 7", value: "7" },
  { label: "Option 8", value: "8" },
  { label: "Option 9", value: "9" },
  { label: "Option 10", value: "10" },
  { label: "Option 11", value: "11" },
  { label: "Option 12", value: "12" },
  { label: "Option 13", value: "13" },
  { label: "Option 14", value: "14" },
  { label: "Option 15", value: "15" },
  { label: "Option 16", value: "16" },
];

function SyncExample() {
  return (
    <Combobox label="Combobox sync" options={options} value="8">
      {(opts) =>
        opts.map((option) => (
          <Option key={option.value} {...option}>
            {option.label}
          </Option>
        ))
      }
    </Combobox>
  );
}

function AsyncExample() {
  return (
    <Combobox
      label="Combobox async"
      asyncOptions={async (e) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              [
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
                { label: "Option 4", value: "4" },
                { label: "Option 5", value: "5", disabled: true },
              ].filter((option) => option.label.toLowerCase().includes(e))
            );
          }, 1000);
        });
      }}
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
}

function App() {
  return (
    <div className="content">
      <SyncExample />
      <AsyncExample />
    </div>
  );
}

export default App;
