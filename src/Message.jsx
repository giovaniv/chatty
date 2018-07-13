import React, { Component } from 'react';

export default class Message extends Component {
  render() {

    const { type, username, content } = this.props;

    let showMessages = '';

    // We log new notifications if we have it
    if (type === 'postNotification' ) {
      showMessages = <div className='notification'>
      <span className='notification-content'>{content}</span></div>
    } else {
      // we show the messages of the chat
      showMessages = <div className="message">
      <span className="message-username">{username}</span>
      <span className="message-content">{content}</span>
      </div>
    }

    return (<div>{showMessages}</div>);

  }

}