import * as React from "react";

import { DataContextProvider } from "./DataContextProvider";
import { Nav } from "./Nav";
import { TaskList } from "./TaskList";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <DataContextProvider>
          <Nav />
          <TaskList />
          <KeyboardModal />
        </DataContextProvider>
      </div>
    );
  }
}

export class KeyboardModal extends React.Component {
  render() {
    return <div>keyboard modal</div>;
  }
}
