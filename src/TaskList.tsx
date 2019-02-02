import React from "react";

import { DataContext } from "./DataContextProvider";
import { TaskRow } from "./TaskRow";
import { Button } from "@blueprintjs/core";

export class TaskList extends React.Component {
  render() {
    return (
      <div>
        <h1>task list (click)</h1>
        <div>project row</div>

        <DataContext.Consumer>
          {task => (
            <React.Fragment>
              <Button text="add new" onClick={() => task.addTask("test")} />
              <TaskRow item={task.root} />
            </React.Fragment>
          )}
        </DataContext.Consumer>
      </div>
    );
  }
}
