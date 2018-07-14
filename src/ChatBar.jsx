import React, { Component } from 'react';

export default class ChatBar extends Component {

  constructor(props) {

    super(props);

    this.state = {
      type: '',
      username: this.props.currentUser.name,
      content: ''
    }
    this.changedUser = false;   // to check if the user was changed
    
    // bind of each function
    this.onMessageKeyPress = this.onMessageKeyPress.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onUserBlur = this.onUserBlur.bind(this);
  }

  // When the user change the username
  onUserChange(evt) {
    let currentUser = evt.target.value;
    if (!currentUser) {
      currentUser = 'Anonymous';
    }
    this.props.onNewUser(currentUser);
    this.changedUser = true;
  }

  // When the user change the focus of the user field
  // and we know that he decided the new username
  onUserBlur(evt) {
    const prevUser = this.state.username;
    const currentUser = evt.target.value;
    if (prevUser !== currentUser) {
      let messageType = 'postNotification';
      this.changedUser = true;
      this.setState({ username: currentUser });
      this.props.onBlurAtNewUser(prevUser, currentUser, messageType);
    }
  }

  // when the user hits enter in the message
  onMessageKeyPress(evt) {
    if (evt.key === 'Enter') {
      let myUser;
      const newMessage = evt.target.value;
      const messageType = 'incomingMessage';
      const myColor = this.props.currentUser.color;
      this.changedUser = false;
      if (this.state.username !== this.props.currentUser.name) {
        myUser = this.state.username;
      }
      if (!newMessage) {
        evt.target.value = '';
      } else {
        this.props.onNewMessage(messageType, newMessage, myUser, myColor);
        evt.target.value = '';
      }
    }
  }

  render() {
    const { currentUser } = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name='myUser' placeholder="Your Name (Optional)" onChange = { this.onUserChange } onBlur = { this.onUserBlur } defaultValue={ currentUser.name } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress = { this.onMessageKeyPress } />
      </footer>
    )
  }
}