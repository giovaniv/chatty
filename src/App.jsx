import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.clientConnection;
    this.state = {
      currentUser: { name: 'Bob' },
      messages : [ ]
    }
    // we bind the functions
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
    this.handleBroadCast = this.handleBroadCast.bind(this);
    this.onBlurAtNewUser = this.onBlurAtNewUser.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
  }

  // when new users change usernames in chat
  handleNewUser(evt) {
    const currentUser = { name: JSON.parse(evt.data).username };
    this.setState({ currentUser: currentUser });
  }

  onBlurAtNewUser(prevUser, currentUser, messageType) {
    const myMessage = `${prevUser} changed their name to ${currentUser}`;
    const newMessage = {
      type : messageType,
      id : '',
      username : currentUser,
      content : myMessage
    }
    this.clientConnection.send(JSON.stringify(newMessage));
    this.clientConnection.addEventListener('message',this.handleNewUser);
  }

  // when the user changed
  onNewUser(currentUser) {
    const newUser = { name: currentUser };
    this.setState({ currentUser: newUser });
  }

  // when new client messages is comming
  handleBroadCast(evt) {
    const messages = this.state.messages;
    const newMessage = JSON.parse(evt.data);
    messages.push(newMessage);
    this.setState({ messages });
  }

  // when current client send a new message
  onNewMessage(messageType, message) {
    const newMessage = {
      type : messageType,
      id : '',
      username : this.state.currentUser.name,
      content : message
    }
    this.clientConnection.send(JSON.stringify(newMessage));
    this.clientConnection.addEventListener('message',this.handleBroadCast);
  }

  componentDidMount() {
    // We try to open a Websocket connection
    const myHostName = 'ws://' + window.location.hostname + ':3001';
    this.clientConnection = new WebSocket(myHostName);
  }

  render() {
    const myCurrentUser = this.state.currentUser.name;
    return (
      <div>
        <NavBar />
        <MessageList messages = { this.state.messages } />
        <ChatBar currentUser = { myCurrentUser } onBlurAtNewUser = { this.onBlurAtNewUser } onNewUser = { this.onNewUser } onNewMessage = { this.onNewMessage } />
      </div>
    );
  }
}
export default App;
