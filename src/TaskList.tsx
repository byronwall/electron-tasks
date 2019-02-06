import { HTMLTable } from "@blueprintjs/core";
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
          {ctx => (
            <React.Fragment>
              <HTMLTable bordered striped condensed>
                <thead>
                  <th>actions</th>
                  <th>title</th>
                  <th>id</th>
                </thead>
                <tbody>
                  <TaskRow item={ctx.root} depth={0} />
                </tbody>
              </HTMLTable>
            </React.Fragment>
          )}
        </DataContext.Consumer>
      </div>
    );
  }
}
