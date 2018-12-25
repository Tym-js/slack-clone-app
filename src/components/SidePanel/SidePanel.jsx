import React from "react"
import { Menu } from "semantic-ui-react"
import "./sidepanel.css"

import UserPanel from "./UserPanel.jsx"
import Channels from "./Channels.jsx"
import DirectMessages from "./DirectMessages.jsx"

class SidePanel extends React.Component {
  render() {
    const { currentUser } = this.props
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2em" }}
      >
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <DirectMessages />
      </Menu>
    )
  }
}

export default SidePanel
