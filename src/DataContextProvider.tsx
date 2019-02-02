import React from "react";
import { Task } from "./model";
import _ from "lodash";

interface AppDataState {
  root: Task;
}

interface AppDataActions {
  addTask(task: string): void;
  removeTaskId(id: number): void;
}

export const DataContext = React.createContext<AppDataState & AppDataActions>({
  addTask: () => {
    return;
  },
  removeTaskId: () => {
    return;
  },
  root: { title: "Dummy", id: 0 }
});

export class DataContextProvider extends React.Component<{}, AppDataState> {
  static _id: number = 0;
  constructor(props: {}) {
    super(props);

    // TODO: create static helper to create tasks

    this.state = {
      root: {
        title: "TEst",
        children: [
          {
            title: "Test child",
            id: DataContextProvider._id++
          }
        ],
        id: DataContextProvider._id++
      }
    };

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  addTask(title: string) {
    const tasks = _.cloneDeep(this.state.root);

    if (tasks.children === undefined) {
      tasks.children = [];
    }

    tasks.children.push({ title, id: DataContextProvider._id++ });

    this.setState({ root: tasks });
  }

  removeTask(id: number) {
    const tasks = _.cloneDeep(this.state.root);

    if (id === tasks.id) {
      console.log("cannot delete root");
      return;
    }

    function deleteChildIfId(childId: number, task: Task): boolean {
      // check if child matches

      if (task.children === undefined) {
        return false;
      }

      const index = task.children.findIndex(item => item.id === childId);
      // not found check the children
      if (index === -1) {
        return task.children.some(item => deleteChildIfId(childId, item));
      }

      // found.. delete the item
      // TODO: avoid extra loop
      task.children = task.children.filter(item => item.id !== childId);
      return true;
    }

    const didDelete = deleteChildIfId(id, tasks);

    if (didDelete) {
      this.setState({ root: tasks });
    }
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          root: this.state.root,
          addTask: this.addTask,
          removeTaskId: this.removeTask
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
