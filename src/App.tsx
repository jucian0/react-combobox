import React from "react";
import { Combobox, Option } from "./combobox";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
  { label: "Option 5", value: "5", disabled: true },
];

function SyncExample() {
  return (
    <Combobox
      label="Combobox sync"
      options={options}
      onChange={(e) => console.log(e)}
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

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

function getTodos(query = "") {
  return fetch(`https://jsonplaceholder.typicode.com/todos?title_like=${query}`)
    .then((response) => response.json())
    .then((json) =>
      json.map((todo: Todo) => ({
        label: todo.title,
        value: todo.id,
        args: todo,
      }))
    );
}

function AsyncExample() {
  const [state, setState] = React.useState("");
  return (
    <Combobox
      label="Combobox async"
      onChange={setState}
      value={state}
      asyncOptions={getTodos}
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
