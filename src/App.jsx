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
  }

  // when the user changed
  onNewUser(currentUser) {
    const user = { name: currentUser };
    this.setState({ currentUser: user });
  }

  // when new client messages is comming
  handleBroadCast(evt) {
    const messages = this.state.messages;
    const newMessage = JSON.parse(evt.data);
    messages.push(newMessage);
    this.setState({ messages });
  }

  // when current client send a new message
  onNewMessage(message) {
    const newMessage = {
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
    return (
      <div>
        <NavBar />
        <MessageList messages = { this.state.messages } />
        <ChatBar currentUser = { this.state.currentUser.name } onNewUser = { this.onNewUser } onNewMessage = { this.onNewMessage } />
      </div>
    );
  }
}
export default App;
