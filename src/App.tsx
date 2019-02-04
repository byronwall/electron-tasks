import * as React from "react";
import { GlobalHotKeys } from "react-hotkeys";

import { DataContext, DataContextProvider } from "./DataContextProvider";
import { Nav } from "./Nav";
import { TaskList } from "./TaskList";

export default class App extends React.Component {
  render() {
    return (
      <DataContextProvider>
        <DataContext.Consumer>
          {ctx => (
            <>
              <div>
                <Nav />
                <TaskList />
                <KeyboardModal />
              </div>

              <GlobalHotKeys
                keyMap={{ ADD_TASK: "a" }}
                handlers={{
                  ADD_TASK: evt => {
                    if (evt !== undefined) {
                      evt.preventDefault();
                      evt.stopPropagation();
                    }
                    ctx.addTask("from global");
                  }
                }}
              />
            </>
          )}
        </DataContext.Consumer>
      </DataContextProvider>
    );
  }
}

export class KeyboardModal extends React.Component {
  render() {
    return <div>keyboard modal</div>;
  }
}
