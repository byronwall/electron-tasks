import React from "react";

interface EditOrDisplayProps {
  value: string;
  defaultIsEditing?: boolean;
  depth: number;

  didUpdate(newText: string): void;
  saveWithEnter(newText: string): void;
  cancelUpdate(): void;
  indentRight(): void;
  indentLeft(): void;
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

    if (keyDownEvent.key === "ArrowRight" && keyDownEvent.altKey) {
      console.log("alt right indent");
      this.props.indentRight();
    }

    if (keyDownEvent.key === "ArrowLeft" && keyDownEvent.altKey) {
      console.log("alt left indent");
      this.props.indentLeft();
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

  handleBlur() {
    // prevent save when showing overlay

    this.acceptEdit(false);
  }

  activateEditor() {
    if (this.state.isEditing) {
      return;
    }
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
      <>
        <input
          type="text"
          ref={ref => (this.inputRef = ref)}
          value={this.state.editValue}
          onChange={handleStringChange(editValue =>
            this.setState({ editValue })
          )}
          onKeyDown={keyDownEvent => this.testKeyDown(keyDownEvent)}
          onBlur={() => this.handleBlur()}
          style={{
            width: 300
          }}
        />
      </>
    );
  }

  renderDisplay() {
    return <div>{this.props.children}</div>;
  }

  render() {
    const content =
      this.state.isEditing || this.props.defaultIsEditing
        ? this.renderEditor()
        : this.renderDisplay();

    return (
      <td onClick={() => this.activateEditor()}>
        <div
          style={{
            paddingLeft: 10 * this.props.depth
          }}
        >
          {content}
        </div>
      </td>
    );
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
