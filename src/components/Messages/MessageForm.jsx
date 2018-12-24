import React from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";

import FileModal from "./FileModal.jsx";

class MessageForm extends React.Component {
  state = {
    message: "",
    messagesRef: firebase.database().ref("messages"),
    currentChannel: this.props.currentChannel,
    currentUser: this.props.currentUser,
    loading: false,
    errors: [],
    modal: false
  };

  openModal = () => {
    this.setState({ modal: true });
  };
  closeModal = () => {
    this.setState({ modal: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { message, messagesRef } = this.state;

    if (message) {
      messagesRef
        .child(this.state.currentChannel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "" });
          console.log("add message");
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      });
    }
  };

  createMessage = () => {
    const newMessage = {
      content: this.state.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.props.currentUser.uid,
        name: this.props.currentUser.displayName,
        avatar: this.props.currentUser.photoURL
      }
    };
    return newMessage;
  };

  render() {
    const { errors, message, loading, modal } = this.state;

    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          value={message}
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          placeholder="Write your message"
          onChange={this.handleChange}
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            disabled={loading}
            onClick={this.handleSubmit}
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
            onClick={this.openModal}
          />
          <FileModal modal={modal} closeModal={this.closeModal} />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
