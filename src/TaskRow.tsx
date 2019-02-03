import { Button, ButtonGroup } from "@blueprintjs/core";
import React from "react";

import { Task } from "./model";
import { DataContext } from "./DataContextProvider";
import { EditOrDisplay } from "./EditOrDisplay";

export interface TaskRowProps {
  item: Task;
}

interface TaskRowState {
  isEditing: boolean;
}

export class TaskRow extends React.Component<TaskRowProps, TaskRowState> {
  constructor(props: TaskRowProps) {
    super(props);

    this.state = {
      isEditing: false
    };
  }
  render() {
    return (
      <div>
        <DataContext.Consumer>
          {value => (
            <React.Fragment>
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
              <EditOrDisplay
                value={this.props.item.title}
                didUpdate={newValu =>
                  value.changeTaskProps(this.props.item.id, { title: newValu })
                }
              />
            </React.Fragment>
          )}
        </DataContext.Consumer>

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
