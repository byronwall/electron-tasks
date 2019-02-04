import { Button, ButtonGroup } from "@blueprintjs/core";
import React from "react";

import { DataContext } from "./DataContextProvider";
import { EditOrDisplay } from "./EditOrDisplay";
import { Task } from "./model";

export interface TaskRowProps {
  item: Task;
  depth: number;
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
          {ctx => (
            <React.Fragment>
              <ButtonGroup>
                <Button
                  small
                  icon="tick"
                  onClick={() => ctx.completeTask(this.props.item.id)}
                />
                <Button
                  small
                  intent="danger"
                  icon="trash"
                  onClick={() => ctx.removeTaskId(this.props.item.id)}
                />
                <Button small icon="comment" />
                <Button small icon="remove-column-right" />
                <Button small icon="move" />
              </ButtonGroup>
              <span
                style={{
                  paddingLeft: 10 * this.props.depth
                }}
              >
                <EditOrDisplay
                  value={this.props.item.title}
                  didUpdate={newValu =>
                    ctx.changeTaskProps(this.props.item.id, {
                      title: newValu,
                      isNewTask: false
                    })
                  }
                  saveWithEnter={newValu =>
                    ctx.saveTaskAndCreateNew(this.props.item.id, {
                      title: newValu,
                      isNewTask: false
                    })
                  }
                  defaultIsEditing={this.props.item.isNewTask}
                  cancelUpdate={() =>
                    ctx.changeTaskProps(this.props.item.id, {
                      isNewTask: false
                    })
                  }
                />
              </span>
            </React.Fragment>
          )}
        </DataContext.Consumer>

        <span>{" | "}</span>
        <span>{this.props.item.id}</span>

        {this.props.item.children !== undefined &&
          this.props.item.children
            .filter(c => !c.isComplete)
            .map(child => (
              <TaskRow item={child} depth={this.props.depth + 1} />
            ))}
      </div>
    );
  }
}
