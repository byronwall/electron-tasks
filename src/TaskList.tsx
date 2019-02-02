import React from "react";

import { DataContext } from "./DataContextProvider";
import { TaskRow } from "./TaskRow";

export class TaskList extends React.Component {
  render() {
    return (
      <div>
        <h1>task list (click)</h1>
        <div>project row</div>

        <DataContext.Consumer>
          {task => <TaskRow item={task.root} />}
        </DataContext.Consumer>
      </div>
    );
  }
}
