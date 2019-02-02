import React from "react";
import { Task } from "./App";
import _ from "lodash";

interface AppDataState {
  root: Task;
}

interface AppDataActions {
  addTask(task: string): void;
}

export const DataContext = React.createContext<AppDataState & AppDataActions>({
  addTask: () => {
    return;
  },
  root: { title: "Dummy" }
});

export class DataContextProvider extends React.Component<{}, AppDataState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      root: {
        title: "TEst",
        children: [
          {
            title: "Test child"
          }
        ]
      }
    };

    this.addTask = this.addTask.bind(this);
  }

  addTask(title: string) {
    const tasks = _.cloneDeep(this.state.root);

    if (tasks.children === undefined) {
      tasks.children = [];
    }

    tasks.children.push({ title });

    this.setState({ root: tasks });
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          root: this.state.root,
          addTask: this.addTask
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
