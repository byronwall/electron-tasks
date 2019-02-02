import { Button, ButtonGroup } from "@blueprintjs/core";
import React from "react";

import { Task } from "./model";
import { DataContext } from "./DataContextProvider";

export interface TaskRowProps {
  item: Task;
}

export class TaskRow extends React.Component<TaskRowProps> {
  render() {
    return (
      <div>
        <DataContext.Consumer>
          {value => (
            <ButtonGroup>
              <Button
                small
                icon="tick"
                onClick={() => value.completeTask(this.props.item.id)}
              />
              <Button
                small
                intent="danger"
                icon="trash"
                onClick={() => value.removeTaskId(this.props.item.id)}
              />
              <Button small icon="comment" />
              <Button small icon="remove-column-right" />
              <Button small icon="move" />
            </ButtonGroup>
          )}
        </DataContext.Consumer>
        <span>{this.props.item.title}</span>
        <span>{" | "}</span>
        <span>{this.props.item.id}</span>

        {this.props.item.children !== undefined &&
          this.props.item.children
            .filter(c => !c.isComplete)
            .map(child => <TaskRow item={child} />)}
      </div>
    );
  }
}
