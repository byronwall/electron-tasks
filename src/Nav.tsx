import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup
} from "@blueprintjs/core";
import React from "react";

import { NavLeftButtons } from "./NavLeftButtons";
import { NavSearchArea } from "./NavSearchArea";

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
