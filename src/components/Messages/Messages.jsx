import React from "react"
import firebase from "../../firebase"
import MessageHeader from "./MessageHeader.jsx"
import MessageForm from "./MessageForm.jsx"
import Message from "./Message.jsx"
import { Segment, Comment } from "semantic-ui-react"
import "./message.css"

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    numUniqueUsers: ""
  }

  componentDidMount() {
    const { user, channel } = this.state
    if (user && channel) {
      this.addListeners(channel.id)
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId)
  }

  addMessageListener = channelId => {
    let loadedMessages = []
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val())
      this.setState({ messages: loadedMessages, messageLoading: false })
    })
    this.countUniqueUsers(loadedMessages)
  }

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ))

  displaChannelName = channel => (channel ? `#${channel.name}` : "")

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name)
      }
      return acc
    }, [])
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`
    this.setState({ numUniqueUsers })
  }

  render() {
    const { messagesRef, messages, channel, user, numUniqueUsers } = this.state
    return (
      <React.Fragment>
        <MessageHeader
          channelName={this.displaChannelName(channel)}
          numUniqueUsers={numUniqueUsers}
        />

        <Segment className="messages">
          <Comment.Group>{this.displayMessages(messages)}</Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    )
  }
}

export default Messages
