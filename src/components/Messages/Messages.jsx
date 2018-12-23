import React from "react"
import MessageHeader from "./MessageHeader.jsx"
import MessageForm from "./MessageForm.jsx"
import { Segment, Comment } from "semantic-ui-react"
import "./message.css"

class Messages extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MessageHeader />

        <Segment className="messages">
          <Comment.Group />
        </Segment>

        <MessageForm />
      </React.Fragment>
    )
  }
}

export default Messages
