import React from "react";
import { InputGroup } from "@blueprintjs/core";

interface EditOrDisplayProps {
  value: string;

  didUpdate(newText: string): void;
}
interface EditOrDisplayState {
  isEditing: boolean;
  editValue: string;
}

export class EditOrDisplay extends React.Component<
  EditOrDisplayProps,
  EditOrDisplayState
> {
  inputRef: HTMLInputElement | null;

  constructor(props: EditOrDisplayProps) {
    super(props);

    this.inputRef = null;

    this.state = {
      editValue: props.value,
      isEditing: false
    };
  }

  testKeyDown(keyDownEvent: React.KeyboardEvent<any>): void {
    // accept edit
    if (keyDownEvent.key === "Enter") {
      this.acceptEdit();
      return;
    }

    // cancel edit
    if (keyDownEvent.key === "Escape") {
      this.setState({ isEditing: false, editValue: this.props.value });
      return;
    }
  }

  private acceptEdit() {
    this.setState({ isEditing: false }, () => {
      this.props.didUpdate(this.state.editValue);
    });
  }

  activateEditor() {
    this.setState({ isEditing: true }, () => {
      if (this.inputRef === null) {
        return;
      }
      this.inputRef.focus();
    });
  }

  renderEditor() {
    return (
      <InputGroup
        inputRef={ref => (this.inputRef = ref)}
        value={this.state.editValue}
        onChange={handleStringChange(editValue => this.setState({ editValue }))}
        onKeyDown={keyDownEvent => this.testKeyDown(keyDownEvent)}
        onBlur={() => this.acceptEdit()}
      />
    );
  }

  renderDisplay() {
    return (
      <span onClick={() => this.activateEditor()}>{this.props.value}</span>
    );
  }

  render() {
    return this.state.isEditing ? this.renderEditor() : this.renderDisplay();
  }
}

export function handleStringChange(handler: (value: string) => void) {
  return (event: React.FormEvent<HTMLElement>) =>
    handler((event.target as HTMLInputElement).value);
}
