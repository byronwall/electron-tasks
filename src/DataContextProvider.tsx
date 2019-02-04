import _ from "lodash";
import React from "react";

import { Task } from "./model";

interface AppDataState {
  root: Task;
}

interface AppDataActions {
  addTask(task: string): void;
  removeTaskId(id: number): void;
  completeTask(id: number): void;

  changeTaskProps(id: number, newProps: Partial<Task>): void;

  saveTaskAndCreateNew(id: number, newProps: Partial<Task>): void;

  // TODO: finish out operations: complete, move to proj, update information, etc.
}

const dummy = () => {
  return;
};

export type DataContext = AppDataState & AppDataActions;

export const DataContext = React.createContext<DataContext>({
  addTask: dummy,
  removeTaskId: dummy,
  completeTask: dummy,
  changeTaskProps: dummy,
  saveTaskAndCreateNew: dummy,
  // TODO: add indent left and indent right
  // TODO: add ability to move task up and down
  root: { title: "Dummy", id: 0, isComplete: false, isNewTask: false }
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
            id: DataContextProvider._id++,
            isComplete: false,
            isNewTask: false
          }
        ],
        id: DataContextProvider._id++,
        isComplete: false,
        isNewTask: false
      }
    };

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.saveTaskAndCreateNew = this.saveTaskAndCreateNew.bind(this);
  }

  addTask(title: string) {
    // TODO: this needs to consider the sort order to put in the right spot
    const tasks = _.cloneDeep(this.state.root);

    if (tasks.children === undefined) {
      tasks.children = [];
    }

    tasks.children.push(this.createNewTask(title));

    this.setState({ root: tasks });
  }

  private createNewTask(title: string): Task {
    return {
      title,
      id: DataContextProvider._id++,
      isComplete: false,
      isNewTask: true
    };
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

  completeTask(id: number) {
    const tasks = _.cloneDeep(this.state.root);

    const taskToEdit = this.findChildOrRoot(tasks, c => c.id === id);

    if (taskToEdit === undefined) {
      return;
    }
    taskToEdit.isComplete = true;

    this.setState({ root: tasks });
  }

  editTask(id: number, newProps: Partial<Task>) {
    const tasks = _.cloneDeep(this.state.root);

    const taskToEdit = this.findChildOrRoot(tasks, c => c.id === id);

    if (taskToEdit === undefined) {
      return;
    }

    Object.assign(taskToEdit, newProps);

    this.setState({ root: tasks });
  }

  saveTaskAndCreateNew(id: number, newProps: Partial<Task>) {
    // do the edit / save
    const tasks = _.cloneDeep(this.state.root);

    const taskToEdit = this.findChildOrRoot(tasks, c => c.id === id);

    if (taskToEdit === undefined) {
      return;
    }

    Object.assign(taskToEdit, newProps);

    // find the parent of that task, add a new task
    const parent = this.findParentOfFilter(tasks, c => c.id === id);

    console.log("found parent", parent);

    if (parent !== undefined) {
      parent.children!.push(this.createNewTask("child?"));
    }

    this.setState({ root: tasks });
  }

  extractChildrenPlusRoot(task: Task) {
    // return all children from root
    const children = [task];
    const toSearch = [task];

    while (toSearch.length > 0) {
      const curTask = toSearch.pop()!;

      const childrenToSearch = curTask.children || [];

      for (const child of childrenToSearch) {
        children.push(child);
        toSearch.push(child);
      }
    }

    return children;
  }

  findParentOfFilter(task: Task, filter: (item: Task) => boolean) {
    // search through root or its children to find an item that meets filter

    const toSearch = [task];

    while (toSearch.length > 0) {
      const curTask = toSearch.pop()!;

      if (curTask.children === undefined) {
        continue;
      }

      if (curTask.children.some(filter)) {
        return curTask;
      }

      const childrenToSearch = curTask.children || [];

      for (const child of childrenToSearch) {
        toSearch.push(child);
      }
    }

    return undefined;
  }

  findChildOrRoot(task: Task, filter: (item: Task) => boolean) {
    // search through root or its children to find an item that meets filter
    const children = [task];
    const toSearch = [task];

    while (toSearch.length > 0) {
      const curTask = toSearch.pop()!;

      if (filter(curTask)) {
        return curTask;
      }

      const childrenToSearch = curTask.children || [];

      for (const child of childrenToSearch) {
        children.push(child);
        toSearch.push(child);
      }
    }

    return undefined;
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          root: this.state.root,
          addTask: this.addTask,
          removeTaskId: this.removeTask,
          completeTask: this.completeTask,
          changeTaskProps: this.editTask,
          saveTaskAndCreateNew: this.saveTaskAndCreateNew
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
