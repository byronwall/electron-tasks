import {
  Button,
  ControlGroup,
  InputGroup,
  Menu,
  Popover,
  Position
} from "@blueprintjs/core";
import React from "react";

export class NavSearchArea extends React.Component {
  render() {
    return (
      <ControlGroup vertical={false}>
        <InputGroup placeholder="Search tasks..." />
        <Button icon="double-chevron-up" intent="primary" active />
        <Button icon="double-chevron-down" intent="primary" />
        <Popover content={<Menu>list of tags</Menu>} position={Position.BOTTOM}>
          <Button rightIcon="caret-down" text="#" />
        </Popover>
        <Popover
          content={<Menu>list of status</Menu>}
          position={Position.BOTTOM}
        >
          <Button rightIcon="caret-down" text="@" />
        </Popover>
        <Popover
          content={<Menu>list of milestones</Menu>}
          position={Position.BOTTOM}
        >
          <Button rightIcon="caret-down" text="!" />
        </Popover>
        <Button icon="cross" intent="danger" />
      </ControlGroup>
    );
  }
}
