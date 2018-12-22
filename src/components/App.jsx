import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel.jsx";
import SidePanel from "./SidePanel/SidePanel.jsx";
import Messages from "./Messages/Messages.jsx";
import MetaPanel from "./MetaPanel/MetaPanel.jsx";

class App extends React.Component {
  render() {
    return (
      <Grid columns="equal" className="app">
        <ColorPanel />
        <SidePanel />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages />
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
