import React from "react";

import { DataContext } from "./DataContextProvider";
import { TaskRow } from "./TaskRow";
import { Button } from "@blueprintjs/core";

import { GlobalHotKeys } from "react-hotkeys";

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
              <GlobalHotKeys
                keyMap={{ ADD_TASK: "a" }}
                handlers={{
                  ADD_TASK: () => {
                    console.log("shift ?");
                    task.addTask("from global");
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
