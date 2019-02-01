import {
  Alignment,
  Button,
  ButtonGroup,
  ControlGroup,
  InputGroup,
  Menu,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  Popover,
  Position
} from "@blueprintjs/core";
import * as React from "react";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <TaskList />
        <KeyboardModal />
      </div>
    );
  }
}

export class Nav extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <NavLeftButtons />

            <NavbarDivider />

            <NavSearchArea />
          </NavbarGroup>
        </Navbar>
      </div>
    );
  }
}

export class NavLeftButtons extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Button icon="menu" />
        <Button icon="cog" />
        <Button icon="sort" />
      </React.Fragment>
    );
  }
}

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

interface Task {
  title: string;
  children?: Task[];
}

export class TaskList extends React.Component {
  render() {
    const task: Task = {
      title: "Project",
      children: [{ title: "Do one" }, { title: "Do another" }]
    };
    return (
      <div>
        <h1>task list</h1>

        <TaskRow item={task} />

        <div>more tasks</div>
      </div>
    );
  }
}

interface TaskRowProps {
  item: Task;
}
export class TaskRow extends React.Component<TaskRowProps> {
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button small icon="tick" />
          <Button small intent="danger" icon="trash" />
          <Button small icon="comment" />
          <Button small icon="remove-column-right" />
          <Button small icon="move" />
        </ButtonGroup>
        <span>{this.props.item.title}</span>

        {this.props.item.children !== undefined &&
          this.props.item.children.map(child => <TaskRow item={child} />)}
      </div>
    );
  }
}

export class KeyboardModal extends React.Component {
  render() {
    return <div>keyboard modal</div>;
  }
}
