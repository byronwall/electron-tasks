import React from "react";
import { HotKeys } from "react-hotkeys";

import { DataContext } from "./DataContextProvider";
import { TaskRow } from "./TaskRow";

export class TaskList extends React.Component {
  render() {
    return (
      <div>
        <h1>task list (click)</h1>
        <div>project row</div>

        <DataContext.Consumer>
          {ctx => (
            <React.Fragment>
              <TaskRow item={ctx.root} depth={0} />
            </React.Fragment>
          )}
        </DataContext.Consumer>
      </div>
    );
  }
}
