import React from "react";
import { GlobalHotKeys } from "react-hotkeys";

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
              <TaskRow item={ctx.root} />
              <GlobalHotKeys
                keyMap={{ ADD_TASK: "a" }}
                handlers={{
                  ADD_TASK: () => {
                    ctx.addTask("from global");
                  }
                }}
              />
            </React.Fragment>
          )}
        </DataContext.Consumer>
      </div>
    );
  }
}
