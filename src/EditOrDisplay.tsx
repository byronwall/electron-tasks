import React from "react";
import { InputGroup } from "@blueprintjs/core";

interface EditOrDisplayProps {
  value: string;
  defaultIsEditing?: boolean;

  didUpdate(newText: string): void;
  saveWithEnter(newText: string): void;
  cancelUpdate(): void;
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

    console.log(keyDownEvent, keyDownEvent.key, keyDownEvent.altKey);

    if (keyDownEvent.key === "Enter") {
      this.acceptEdit(true);
      return;
    }

    // cancel edit
    if (keyDownEvent.key === "Escape") {
      this.setState({ isEditing: false, editValue: this.props.value }, () => {
        this.props.cancelUpdate();
      });
      return;
    }
  }

  private acceptEdit(didSaveOnEnterKey: boolean) {
    this.setState({ isEditing: false }, () => {
      if (didSaveOnEnterKey) {
        console.log("save w/ enter edit");
        this.props.saveWithEnter(this.state.editValue);
      } else {
        this.props.didUpdate(this.state.editValue);
      }
    });
  }

  activateEditor() {
    this.setState({ isEditing: true }, () => {
      this.focusEditor();
    });
  }

  private focusEditor() {
    if (this.inputRef === null) {
      return;
    }
    this.inputRef.focus();
  }

  renderEditor() {
    return (
      <input
        type="text"
        ref={ref => (this.inputRef = ref)}
        value={this.state.editValue}
        onChange={handleStringChange(editValue => this.setState({ editValue }))}
        onKeyDown={keyDownEvent => this.testKeyDown(keyDownEvent)}
        onBlur={() => this.acceptEdit(false)}
        style={{
          width: 300
        }}
      />
    );
  }

  renderDisplay() {
    return (
      <span onClick={() => this.activateEditor()}>{this.props.value}</span>
    );
  }

  render() {
    return this.state.isEditing || this.props.defaultIsEditing
      ? this.renderEditor()
      : this.renderDisplay();
  }

  componentDidMount() {
    if (this.props.defaultIsEditing) {
      this.focusEditor();
    }
  }
  componentDidUpdate() {
    if (this.props.defaultIsEditing) {
      this.focusEditor();
    }
  }
}

export function handleStringChange(handler: (value: string) => void) {
  return (event: React.FormEvent<HTMLElement>) =>
    handler((event.target as HTMLInputElement).value);
}
