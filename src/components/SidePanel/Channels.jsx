import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetail: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    const { channelsRef, channelName, channelDetail, user } = this.state;
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      detail: channelDetail,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
          this.setState({ channelName: "", channelDetail: "" });
          this.closeModal();
          console.log("channel added!");
        });
    }
  };

  isFormValid = ({ channelName, channelDetail }) =>
    channelName && channelDetail;

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Add a Channel</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Input
                    fluid
                    label="Name of Channel"
                    name="channelName"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    fluid
                    label="About the Channel"
                    name="channelDetail"
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" inverted onClick={this.handleSubmit}>
                <Icon name="checkmark" /> Add
              </Button>
              <Button color="red" inverted>
                <Icon name="remove" onClick={this.closeModal} /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Menu.Menu>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Channels);
