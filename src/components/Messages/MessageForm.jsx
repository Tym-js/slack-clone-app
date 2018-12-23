import React from "react"
import { Segment, Button, Input } from "semantic-ui-react"
import "./message.css"

class MessageForm extends React.Component {
  render() {
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            icon="edit"
            content="Add Reply"
            labelPosition="left"
          />
          <Button
            color="teal"
            icon="cloud upload"
            content="Upload Media"
            labelPosition="right"
          />
        </Button.Group>
      </Segment>
    )
  }
}

export default MessageForm
