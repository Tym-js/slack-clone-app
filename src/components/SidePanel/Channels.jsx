import React from "react"
import firebase from "../../firebase"
import { setCurrentChannel } from "../../actions"
import { connect } from "react-redux"
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react"

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetail: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false,
    firstLoad: true,
    activeChannel: ""
  }

  componentDidMount = () => {
    this.addListeners()
  }

  componentWillUnmount = () => {
    this.removeListeners()
  }

  addListeners = () => {
    let loadedChannels = []
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val())
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel())
    })
  }

  removeListeners = () => {
    this.state.channelsRef.off()
  }

  setFirstChannel = () => {
    const { firstLoad, channels } = this.state
    const firstChannel = this.state.channels[0]
    if (firstLoad && channels.length > 0) {
      this.props.setCurrentChannel(firstChannel)
      this.setActiveChannel(firstChannel)
    }
    this.setState({ firstLoad: false })
  }

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id })
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  handleSubmit = event => {
    const { channelsRef, channelName, channelDetail, user } = this.state
    const key = channelsRef.push().key
    const newChannel = {
      id: key,
      name: channelName,
      detail: channelDetail,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    }
    event.preventDefault()
    if (this.isFormValid(this.state)) {
      channelsRef
        .child(key)
        .set(newChannel)
        .then(() => {
          this.setState({ channelName: "", channelDetail: "" })
          this.closeModal()
          console.log("channel added!")
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  isFormValid = ({ channelName, channelDetail }) => channelName && channelDetail

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name="channel.name"
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ))

  changeChannel = channel => {
    this.props.setCurrentChannel(channel)
    this.setActiveChannel(channel)
  }

  openModal = () => this.setState({ modal: true })
  closeModal = () => this.setState({ modal: false })

  render() {
    const { channels, modal } = this.state
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>
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
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
})

export default connect(
  mapStateToProps,
  { setCurrentChannel }
)(Channels)
