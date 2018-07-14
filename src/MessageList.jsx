import React, { Component } from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {

    const myMessages = this.props.messages.map((message) => {
      return(
        <Message
          key = { message.id }
          type = { message.type }
          username = { message.username }
          content = { message.content }
          color = { message.color }
        />
      );
    });
    return (
      <main className="messages">
        { myMessages }
      </main>
    )
  }
}