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
      <>
        <tr>
          <DataContext.Consumer>
            {ctx => (
              <React.Fragment>
                <td>
                  <ButtonGroup>
                    <Button
                      small
                      icon="tick"
                      onClick={() => ctx.completeTask(this.props.item.id)}
                    />
                    <Button
                      small
                      icon="trash"
                      onClick={() => ctx.removeTaskId(this.props.item.id)}
                    />
                    <Button small icon="comment" />
                    <Button small icon="remove-column-right" />
                    <Button small icon="move" />
                  </ButtonGroup>
                </td>
                <td>
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
                      indentRight={() =>
                        ctx.indentTaskRight(this.props.item.id)
                      }
                      indentLeft={() => ctx.indentTaskLeft(this.props.item.id)}
                    />
                  </span>
                </td>
              </React.Fragment>
            )}
          </DataContext.Consumer>
          <td>{this.props.item.id}</td>
        </tr>
        {this.props.item.children !== undefined &&
          this.props.item.children
            .filter(c => !c.isComplete)
            .map(child => (
              <TaskRow item={child} depth={this.props.depth + 1} />
            ))}
      </>
    );
  }
}
