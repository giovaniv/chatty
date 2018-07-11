import React, { Component } from 'react';

export default class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      content: ''
    }
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    let currentUser = evt.target.value;
    if (!currentUser) {
      currentUser = 'Anonymous';
    }
    this.props.onChangeUsername(currentUser);
  }

  onKeyPress(evt) {
    if (evt.key === 'Enter') {

      let currentUser = this.state.username;
      let newMessage = evt.target.value;

      if (!newMessage) {
        evt.target.value = '';
      } else {
        this.props.onNewMessage(currentUser, newMessage);
        evt.target.value = '';
      }

    }
  }

  render() {
    const { currentUser } = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name='myUser' placeholder="Your Name (Optional)" onChange = { this.onChange } defaultValue={ currentUser } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress = { this.onKeyPress } />
      </footer>
    )
  }
}