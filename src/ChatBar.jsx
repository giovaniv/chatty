import React, { Component } from 'react';

export default class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      content: ''
    }
    // bind of each function
    this.onMessageKeyPress = this.onMessageKeyPress.bind(this);
    this.onUserKeyPress = this.onUserKeyPress.bind(this);
  }

  // When the user change the username
  onUserKeyPress(evt) {
    let currentUser = evt.target.value;
    if (!currentUser) {
      currentUser = 'Anonymous';
    }
    this.props.onNewUser(currentUser);
  }

  // when the user hits enter in the message
  onMessageKeyPress(evt) {
    if (evt.key === 'Enter') {

      let newMessage = evt.target.value;

      if (!newMessage) {
        evt.target.value = '';
      } else {
        this.props.onNewMessage(newMessage);
        evt.target.value = '';
      }

    }
  }

  render() {
    const { currentUser } = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name='myUser' placeholder="Your Name (Optional)" onChange = { this.onUserKeyPress } defaultValue={ currentUser } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress = { this.onMessageKeyPress } />
      </footer>
    )
  }
}