import { Button, ButtonGroup, Tag } from "@blueprintjs/core";
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

                <EditOrDisplay
                  value={this.props.item.title}
                  didUpdate={newValue =>
                    ctx.changeTaskProps(this.props.item.id, {
                      title: newValue,
                      isNewTask: false
                    })
                  }
                  saveWithEnter={newValue =>
                    ctx.saveTaskAndCreateNew(this.props.item.id, {
                      title: newValue,
                      isNewTask: false
                    })
                  }
                  defaultIsEditing={this.props.item.isNewTask}
                  cancelUpdate={() =>
                    ctx.changeTaskProps(this.props.item.id, {
                      isNewTask: false
                    })
                  }
                  indentRight={() => ctx.indentTaskRight(this.props.item.id)}
                  indentLeft={() => ctx.indentTaskLeft(this.props.item.id)}
                  depth={this.props.depth}
                >
                  {this.props.item.title}
                  {this.props.item.tags.map((tag, index) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </EditOrDisplay>
              </React.Fragment>
            )}
          </DataContext.Consumer>
          <td>{this.props.item.id}</td>
          <td>{this.props.item.tags.join(",")}</td>
        </tr>
        {this.props.item.children !== undefined &&
          this.props.item.children
            .filter(c => !c.isComplete)
            .map(child => (
              <TaskRow
                key={child.id}
                item={child}
                depth={this.props.depth + 1}
              />
            ))}
      </>
    );
  }
}
