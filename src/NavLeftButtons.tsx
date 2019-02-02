import { Button } from "@blueprintjs/core";
import React from "react";

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
