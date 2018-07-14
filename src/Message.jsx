import React, { Component } from 'react';

export default class Message extends Component {
  render() {

    const { type, username, content, color } = this.props;

    let showMessages = '';

    const myUser = <font color={color}>{username}</font>;

    // We log new notifications if we have it
    if (type === 'postNotification' ) {
      showMessages = <div className='message'>
      <span className='message-system'>{content}</span></div>
    } else {
      // we show the messages of the chat
      showMessages = <div className="message">
      <span className="message-username">{myUser}</span>
      <span className="message-content">{content}</span>
      </div>
    }

    return (<div>{showMessages}</div>);

  }

}